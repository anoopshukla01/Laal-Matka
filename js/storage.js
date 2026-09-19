/**
 * LAAL MATKA — storage.js
 * High-capacity IndexedDB wrapper for storing uploaded custom images
 * and syncing them with the live website across sessions.
 */

const DB_PRIMARY = 'LaalMatkaAssetsDB';
const DB_FALLBACK = 'laal_matka_assets';
const DB_VERSION = 1;
const STORE_NAME = 'assets';
const LS_KEY = 'laal_matka_assets_v1';

// BroadcastChannel for instant cross-tab sync
let syncChannel = null;
try {
  if (typeof BroadcastChannel !== 'undefined') {
    syncChannel = new BroadcastChannel('laal_matka_asset_sync');
  }
} catch (_) {}

/**
 * Synchronous read from localStorage for zero-latency initial render
 */
export function getSyncAssets() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (_) {
    return {};
  }
}

function openDatabase(dbName, keyPath = 'slot', timeoutMs = 1200) {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      return reject(new Error('IndexedDB not supported'));
    }

    let isSettled = false;
    const timer = setTimeout(() => {
      if (!isSettled) {
        isSettled = true;
        reject(new Error(`IndexedDB open timeout (${timeoutMs}ms) for ${dbName}`));
      }
    }, timeoutMs);

    let request;
    try {
      request = indexedDB.open(dbName, DB_VERSION);
    } catch (err) {
      clearTimeout(timer);
      isSettled = true;
      return reject(err);
    }

    request.onblocked = () => {
      clearTimeout(timer);
      if (!isSettled) {
        isSettled = true;
        console.warn(`[storage] IndexedDB open blocked for ${dbName}`);
        reject(new Error(`IndexedDB blocked for ${dbName}`));
      }
    };

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath });
      }
    };

    request.onsuccess = (e) => {
      clearTimeout(timer);
      if (!isSettled) {
        isSettled = true;
        const db = e.target.result;
        db.onversionchange = () => {
          try { db.close(); } catch (_) {}
        };
        resolve(db);
      }
    };

    request.onerror = (e) => {
      clearTimeout(timer);
      if (!isSettled) {
        isSettled = true;
        reject(e.target.error || new Error('IndexedDB open error'));
      }
    };
  });
}

/**
 * Save an asset (dataUrl) for a specific slot into both DBs and localStorage
 */
export async function saveAsset(slot, dataUrl, meta = {}) {
  const item = {
    slot,
    id: slot,
    dataUrl,
    fileName: meta.fileName || 'custom-image.png',
    fileSize: meta.fileSize || 0,
    fit: meta.fit || 'cover',
    updatedAt: new Date().toISOString()
  };

  // 1. Primary IndexedDB ('slot' keyPath)
  try {
    const db1 = await openDatabase(DB_PRIMARY, 'slot');
    await new Promise((res, rej) => {
      const tx = db1.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(item);
      req.onsuccess = () => res();
      req.onerror = () => rej(req.error);
    });
  } catch (err) {
    console.warn('[storage] DB_PRIMARY save warning:', err);
  }

  // 2. Fallback IndexedDB ('id' keyPath)
  try {
    const db2 = await openDatabase(DB_FALLBACK, 'id');
    await new Promise((res, rej) => {
      const tx = db2.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(item);
      req.onsuccess = () => res();
      req.onerror = () => rej(req.error);
    });
  } catch (_) {}

  // 3. LocalStorage backup
  try {
    const raw = localStorage.getItem(LS_KEY);
    const map = raw ? JSON.parse(raw) : {};
    map[slot] = item;
    localStorage.setItem(LS_KEY, JSON.stringify(map));
  } catch (_) {}

  // 4. Notify live tabs
  try {
    syncChannel?.postMessage({ type: 'asset-updated', slot, item });
  } catch (_) {}

  return item;
}

/**
 * Get an asset by slot ID
 */
export async function getAsset(slot) {
  // Try primary DB
  try {
    const db1 = await openDatabase(DB_PRIMARY, 'slot');
    const res = await new Promise((resolve) => {
      const tx = db1.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(slot);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
    if (res) return res;
  } catch (_) {}

  // Try fallback DB
  try {
    const db2 = await openDatabase(DB_FALLBACK, 'id');
    const res = await new Promise((resolve) => {
      const tx = db2.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(slot);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
    if (res) return res;
  } catch (_) {}

  // Try localStorage
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const map = JSON.parse(raw);
      if (map[slot]) return map[slot];
    }
  } catch (_) {}

  return null;
}

/**
 * Get all saved assets as a combined map: { [slot]: assetObject }
 */
export async function getAllAssets() {
  // 1. Read from localStorage first (synchronous & instant)
  const map = getSyncAssets();

  // Helper with race timeout
  const runWithTimeout = (promise, ms = 800) => {
    return Promise.race([
      promise,
      new Promise((res) => setTimeout(res, ms))
    ]);
  };

  // 2. Read from Fallback DB
  try {
    await runWithTimeout((async () => {
      const db2 = await openDatabase(DB_FALLBACK, 'id', 800);
      await new Promise((resolve) => {
        const tx = db2.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.getAll();
        req.onsuccess = () => {
          (req.result || []).forEach(item => {
            const key = item.slot || item.id;
            if (key && !map[key]) map[key] = item;
          });
          resolve();
        };
        req.onerror = () => resolve();
      });
    })());
  } catch (_) {}

  // 3. Read from Primary DB (takes priority)
  try {
    await runWithTimeout((async () => {
      const db1 = await openDatabase(DB_PRIMARY, 'slot', 800);
      await new Promise((resolve) => {
        const tx = db1.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.getAll();
        req.onsuccess = () => {
          (req.result || []).forEach(item => {
            const key = item.slot || item.id;
            if (key) map[key] = item;
          });
          resolve();
        };
        req.onerror = () => resolve();
      });
    })());
  } catch (_) {}

  return map;
}

/**
 * Remove an asset by slot ID
 */
export async function removeAsset(slot) {
  try {
    const db1 = await openDatabase(DB_PRIMARY, 'slot');
    const tx1 = db1.transaction(STORE_NAME, 'readwrite');
    tx1.objectStore(STORE_NAME).delete(slot);
  } catch (_) {}

  try {
    const db2 = await openDatabase(DB_FALLBACK, 'id');
    const tx2 = db2.transaction(STORE_NAME, 'readwrite');
    tx2.objectStore(STORE_NAME).delete(slot);
  } catch (_) {}

  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const map = JSON.parse(raw);
      delete map[slot];
      localStorage.setItem(LS_KEY, JSON.stringify(map));
    }
  } catch (_) {}

  try {
    syncChannel?.postMessage({ type: 'asset-removed', slot });
  } catch (_) {}

  return true;
}

/**
 * Clear all uploaded assets
 */
export async function clearAllAssets() {
  try {
    const db1 = await openDatabase(DB_PRIMARY, 'slot');
    db1.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).clear();
  } catch (_) {}

  try {
    const db2 = await openDatabase(DB_FALLBACK, 'id');
    db2.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).clear();
  } catch (_) {}

  try {
    localStorage.removeItem(LS_KEY);
  } catch (_) {}

  try {
    syncChannel?.postMessage({ type: 'all-assets-cleared' });
  } catch (_) {}

  return true;
}

// ─────────────────────────────────────────────
// CONTENT TEXT OVERRIDES (CMS)
// ─────────────────────────────────────────────
const LS_CONTENT_KEY = 'laal_matka_content_overrides_v1';

/**
 * Get all content text overrides synchronously
 */
export function getContentOverrides() {
  try {
    const raw = localStorage.getItem(LS_CONTENT_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (_) {
    return {};
  }
}

/**
 * Save a single content override field
 */
export function saveContentOverride(key, value) {
  try {
    const current = getContentOverrides();
    current[key] = value;
    localStorage.setItem(LS_CONTENT_KEY, JSON.stringify(current));
    syncChannel?.postMessage({ type: 'content-field-updated', key, value, all: current });
    return current;
  } catch (err) {
    console.error('[storage] Failed to save content override:', err);
    return null;
  }
}

/**
 * Save all content overrides at once
 */
export function saveAllContentOverrides(map) {
  try {
    localStorage.setItem(LS_CONTENT_KEY, JSON.stringify(map));
    syncChannel?.postMessage({ type: 'content-all-updated', all: map });
    return map;
  } catch (err) {
    console.error('[storage] Failed to save all content overrides:', err);
    return null;
  }
}

/**
 * Clear all content text overrides
 */
export function clearAllContentOverrides() {
  try {
    localStorage.removeItem(LS_CONTENT_KEY);
    syncChannel?.postMessage({ type: 'content-all-cleared' });
    return true;
  } catch (_) {
    return false;
  }
}

/**
 * Export full site backup (Assets + Content Text)
 */
export async function exportFullSiteBackup() {
  const assets = await getAllAssets();
  const content = getContentOverrides();
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    site: 'LAAL MATKA RESTAURANT GORAKHPUR',
    assets,
    content
  };
}

/**
 * Import full site backup
 */
export async function importFullSiteBackup(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid backup data format');
  }

  // Restore content text overrides
  if (data.content && typeof data.content === 'object') {
    saveAllContentOverrides(data.content);
  }

  // Restore assets
  if (data.assets && typeof data.assets === 'object') {
    for (const [slot, item] of Object.entries(data.assets)) {
      if (item && item.dataUrl) {
        await saveAsset(slot, item.dataUrl, {
          fileName: item.fileName || `${slot}.jpg`,
          fileSize: item.fileSize || 0,
          fit: item.fit || 'cover'
        });
      }
    }
  }

  return true;
}
