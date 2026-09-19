/**
 * LAAL MATKA — asset-injector.js
 * Reads uploaded custom images from IndexedDB / LocalStorage and injects them
 * seamlessly across all sections of the live website, with full slot aliasing,
 * non-destructive DOM updates, and live BroadcastChannel sync.
 */

import { getAllAssets, getSyncAssets, removeAsset, getContentOverrides } from './storage.js';

// Comprehensive slot alias mappings so varying names resolve cleanly without collisions
export const ALIAS_MAP = {
  // Hero & Mascots
  'hero-matka': ['hero-matka', 'matka-pot', 'clay-matka', 'matka', 'main-matka'],
  'closing-character': ['closing-character', 'namaste-character', 'mascot-closing', 'closing-mascot'],

  // Story Mural
  'story-illustration': ['story-illustration', 'story-art', 'heritage-mural', 'story'],

  // From Art to Table Stages
  'att-art': ['att-art', 'att-1', 'stage-1', 'art-stage'],
  'att-craft': ['att-craft', 'att-2', 'stage-2', 'craft-stage'],
  'att-fire': ['att-fire', 'att-3', 'stage-3', 'fire-stage'],
  'att-flavour': ['att-flavour', 'att-4', 'stage-4', 'flavour-stage'],
  'att-table': ['att-table', 'att-5', 'stage-5', 'table-stage'],

  // Matka Emerging Menu Course Cards
  'menu-1': ['menu-1', 'veg-starters', 'starter', 'starters', 'menu-dish-1', 'course-1'],
  'menu-2': ['menu-2', 'non-veg-starters', 'tandoori', 'chicken-tikka', 'menu-dish-2', 'course-2'],
  'menu-3': ['menu-3', 'veg-main-course', 'daal-makhani', 'paneer', 'menu-dish-3', 'course-3'],
  'menu-4': ['menu-4', 'mushroom-specials', 'mushroom', 'menu-dish-4', 'course-4'],
  'menu-5': ['menu-5', 'chicken-main-course', 'butter-chicken', 'menu-dish-5', 'course-5'],
  'menu-6': ['menu-6', 'mutton-main-course', 'mutton', 'laal-maas', 'menu-dish-6', 'course-6'],
  'menu-7': ['menu-7', 'anda-curry', 'egg-curry', 'menu-dish-7', 'course-7'],
  'menu-8': ['menu-8', 'dum-biryani', 'biryani', 'menu-dish-8', 'course-8'],
  'menu-9': ['menu-9', 'shakes-coffee-desserts', 'shakes', 'desserts', 'coffee', 'menu-dish-9', 'course-9'],

  // Haveli Café Experience
  'experience-1': ['experience-1', 'exp-1', 'cafe-exterior', 'exterior'],
  'experience-2': ['experience-2', 'exp-2', 'cafe-interior', 'interior'],
  'experience-3': ['experience-3', 'exp-3', 'seating-area', 'baithak'],
  'experience-4': ['experience-4', 'exp-4', 'signature-food', 'tandoor'],
  'experience-5': ['experience-5', 'exp-5', 'drinks-chai', 'chai-ceremony'],
  'experience-6': ['experience-6', 'exp-6', 'ambience', 'evening-ambience'],

  // Folk Gallery
  'gallery-1': ['gallery-1', 'gal-1'],
  'gallery-2': ['gallery-2', 'gal-2'],
  'gallery-3': ['gallery-3', 'gal-3'],
  'gallery-4': ['gallery-4', 'gal-4'],
  'gallery-5': ['gallery-5', 'gal-5'],
  'gallery-6': ['gallery-6', 'gal-6'],
  'gallery-7': ['gallery-7', 'gal-7'],
  'gallery-8': ['gallery-8', 'gal-8'],
  'gallery-9': ['gallery-9', 'gal-9']
};

/**
 * Finds matching saved asset for a slot key by checking exact match & aliases
 */
export function findAssetForSlot(slotKey, assets) {
  if (!slotKey || !assets) return null;

  // 1. Direct match
  if (assets[slotKey]) return assets[slotKey];

  // 2. Canonical or alias lookup
  for (const [canonicalKey, aliases] of Object.entries(ALIAS_MAP)) {
    if (canonicalKey === slotKey || aliases.includes(slotKey)) {
      if (assets[canonicalKey]) return assets[canonicalKey];
      for (const alias of aliases) {
        if (assets[alias]) return assets[alias];
      }
    }
  }

  // 3. Reverse lookup
  for (const [assetSlot, assetItem] of Object.entries(assets)) {
    const assetAliases = ALIAS_MAP[assetSlot];
    if (assetAliases && (assetAliases.includes(slotKey) || assetSlot === slotKey)) {
      return assetItem;
    }
  }

  return null;
}

/**
 * Safely applies an asset to any DOM element (IMG or container) without wiping other children
 */
export function applyAssetToElement(el, item) {
  if (!el || !item || !item.dataUrl) return;

  const fit = item.fit || 'cover';

  // Case 1: Target element is an <img>
  if (el.tagName === 'IMG') {
    el.src = item.dataUrl;
    el.style.objectFit = fit;
    el.classList.add('has-custom-image');
    return;
  }

  // Case 2: Target is Hero Matka Pot (#main-matka-trigger)
  if (el.id === 'main-matka-trigger' || el.classList.contains('matka-illustration')) {
    const svg = el.querySelector('svg');
    if (svg) svg.style.display = 'none';
    let customImg = el.querySelector('.custom-matka-img');
    if (!customImg) {
      customImg = document.createElement('img');
      customImg.className = 'custom-matka-img';
      customImg.style.cssText = 'width: 100%; max-width: 440px; height: auto; max-height: 420px; object-fit: contain; display: block; margin: 0 auto; filter: drop-shadow(0 15px 35px rgba(0,0,0,0.5));';
      el.appendChild(customImg);
    }
    customImg.src = item.dataUrl;
    customImg.style.objectFit = fit;
    el.classList.add('has-custom-image');
    return;
  }

  // Case 3: Target is Closing Character Mascot with SVG
  if (el.classList.contains('closing-character-inner')) {
    const svg = el.querySelector('svg');
    if (svg) svg.style.display = 'none';

    let customImg = el.querySelector('.custom-closing-img');
    if (!customImg) {
      customImg = document.createElement('img');
      customImg.className = 'custom-closing-img';
      customImg.style.cssText = 'max-width: 320px; height: 440px; object-fit: contain; display: block; margin: 0 auto; filter: drop-shadow(0 15px 30px rgba(0,0,0,0.6)); border-radius: 16px;';
      el.appendChild(customImg);
    }
    customImg.src = item.dataUrl;
    customImg.style.objectFit = fit;
    el.classList.add('has-custom-image');
    return;
  }

  // Case 4: Container already holds a child <img> (e.g. .card-image-wrap, .story-illus-frame, .experience-photo)
  const childImg = el.querySelector('img:not(.custom-mascot-img)');
  if (childImg) {
    childImg.src = item.dataUrl;
    childImg.style.objectFit = fit;
    childImg.classList.add('has-custom-image');
    el.classList.add('has-custom-image');
    return;
  }

  // Case 5: Container holds an .img-placeholder (e.g., in gallery or menu before image is loaded)
  const placeholder = el.querySelector('.img-placeholder');
  if (placeholder) {
    const img = document.createElement('img');
    img.src = item.dataUrl;
    img.alt = el.getAttribute('data-slot') || 'Custom Asset';
    img.loading = 'lazy';
    img.className = `custom-injected-img ${fit === 'contain' ? 'object-contain' : 'object-cover'}`;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = fit;
    img.style.display = 'block';

    placeholder.replaceWith(img);
    el.classList.add('has-custom-image');
    return;
  }

  // Case 6: Target itself is an .img-placeholder
  if (el.classList.contains('img-placeholder')) {
    const img = document.createElement('img');
    img.src = item.dataUrl;
    img.alt = el.getAttribute('data-slot') || 'Custom Asset';
    img.loading = 'lazy';
    img.className = `custom-injected-img ${fit === 'contain' ? 'object-contain' : 'object-cover'}`;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = fit;
    img.style.display = 'block';

    el.replaceWith(img);
    return;
  }

  // Case 7: Fallback safe append without wiping siblings
  const img = document.createElement('img');
  img.src = item.dataUrl;
  img.alt = el.getAttribute('data-slot') || 'Custom Asset';
  img.loading = 'lazy';
  img.className = `custom-injected-img ${fit === 'contain' ? 'object-contain' : 'object-cover'}`;
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = fit;
  img.style.display = 'block';

  el.appendChild(img);
  el.classList.add('has-custom-image');
}

/**
 * Directly applies a single asset to all matching elements on the page (Instant)
 */
export function applyDirectAsset(slot, item) {
  if (!slot || !item || !item.dataUrl) return;

  const aliases = ALIAS_MAP[slot] || [slot];
  const allKeys = Array.from(new Set([slot, ...aliases]));

  allKeys.forEach((key) => {
    document.querySelectorAll(`[data-slot="${key}"]`).forEach((el) => {
      applyAssetToElement(el, item);
    });
  });

  // Direct specific hooks
  for (let i = 1; i <= 9; i++) {
    if (allKeys.includes(`menu-${i}`)) {
      const cardImg = document.getElementById(`menu-dish-img-${i}`);
      if (cardImg) applyAssetToElement(cardImg, item);
    }
  }
  for (let i = 1; i <= 6; i++) {
    if (allKeys.includes(`experience-${i}`)) {
      const expEl = document.querySelector(`.experience-photo[data-slot="experience-${i}"]`);
      if (expEl) applyAssetToElement(expEl, item);
    }
  }

  for (let i = 1; i <= 9; i++) {
    if (allKeys.includes(`gallery-${i}`)) {
      const galItem = document.querySelector(`.gallery-item[data-slot="gallery-${i}"]`);
      if (galItem) applyAssetToElement(galItem, item);
    }
  }

  ['art', 'craft', 'fire', 'flavour', 'table'].forEach((st) => {
    if (allKeys.includes(`att-${st}`)) {
      const stageEl = document.querySelector(`.att-stage-img[data-slot="att-${st}"]`);
      if (stageEl) applyAssetToElement(stageEl, item);
    }
  });

  if (allKeys.includes('hero-matka')) {
    const matkaEl = document.getElementById('main-matka-trigger');
    if (matkaEl) applyAssetToElement(matkaEl, item);
  }

  if (allKeys.includes('closing-character')) {
    const closingEl = document.querySelector('.closing-character-inner[data-slot="closing-character"]') || document.querySelector('.closing-character-inner');
    if (closingEl) applyAssetToElement(closingEl, item);
  }
}

/**
 * Synchronously injects all assets currently stored in localStorage (0 latency)
 */
export function immediateSyncInject() {
  const syncMap = getSyncAssets();
  const keys = Object.keys(syncMap);
  if (!keys.length) return;
  keys.forEach((k) => {
    if (syncMap[k]) applyDirectAsset(k, syncMap[k]);
  });
}

/**
 * Main injection routine: executes on page load and on live broadcast updates
 */
export async function injectCustomAssets() {
  // First do immediate sync from localStorage
  immediateSyncInject();

  try {
    const assets = await getAllAssets();
    const assetKeys = Object.keys(assets);
    if (!assetKeys.length) return;

    console.log(`[Laal Matka] Injecting ${assetKeys.length} custom uploaded assets into website...`);

    // 1. Process all [data-slot] elements in DOM
    const slotElements = document.querySelectorAll('[data-slot]');
    slotElements.forEach((el) => {
      const slot = el.getAttribute('data-slot');
      const item = findAssetForSlot(slot, assets);
      if (item) {
        applyAssetToElement(el, item);
      }
    });

    // 2. Direct bindings for 9 Menu Emerging Cards by ID
    for (let i = 1; i <= 9; i++) {
      const cardImg = document.getElementById(`menu-dish-img-${i}`);
      if (cardImg) {
        const item = findAssetForSlot(`menu-${i}`, assets);
        if (item) applyAssetToElement(cardImg, item);
      }
    }

    // 3. Direct bindings for 6 Haveli Experience photos
    for (let i = 1; i <= 6; i++) {
      const expContainer = document.querySelector(`.experience-photo[data-slot="experience-${i}"]`);
      if (expContainer) {
        const item = findAssetForSlot(`experience-${i}`, assets);
        if (item) applyAssetToElement(expContainer, item);
      }
    }

    // 4. Direct bindings for 9 Gallery Items
    for (let i = 1; i <= 9; i++) {
      const galItem = document.querySelector(`.gallery-item[data-slot="gallery-${i}"]`);
      if (galItem) {
        const item = findAssetForSlot(`gallery-${i}`, assets);
        if (item) applyAssetToElement(galItem, item);
      }
    }

    // 5. Direct bindings for 5 Art to Table Stages
    ['art', 'craft', 'fire', 'flavour', 'table'].forEach((st) => {
      const stageEl = document.querySelector(`.att-stage-img[data-slot="att-${st}"]`);
      if (stageEl) {
        const item = findAssetForSlot(`att-${st}`, assets);
        if (item) applyAssetToElement(stageEl, item);
      }
    });

    // 6. Direct binding for Closing Namaste Mascot
    const closingEl = document.querySelector('.closing-character-inner[data-slot="closing-character"]') || document.querySelector('.closing-character-inner');
    if (closingEl) {
      const item = findAssetForSlot('closing-character', assets);
      if (item) applyAssetToElement(closingEl, item);
    }

    // 7. Direct binding for Hero Matka Pot
    const matkaTrigger = document.getElementById('main-matka-trigger');
    if (matkaTrigger) {
      const item = findAssetForSlot('hero-matka', assets);
      if (item) applyAssetToElement(matkaTrigger, item);
    }

    // 8. Clean up obsolete slots if any
    if (assets['hero-character']) {
      try {
        await removeAsset('hero-character');
        delete assets['hero-character'];
      } catch (_) {}
    }

    if (assets['logo']) {
      try {
        await removeAsset('logo');
        delete assets['logo'];
      } catch (_) {}
    }

  } catch (err) {
    console.warn('[Laal Matka] Could not load custom assets from storage:', err);
  }
}

/**
 * Injects administrative content text overrides across live site
 */
export function injectContentOverrides() {
  const overrides = getContentOverrides();
  if (!overrides || Object.keys(overrides).length === 0) return;

  // Hero Section
  if (overrides.greeting) {
    const el = document.getElementById('hero-greeting');
    if (el) el.textContent = overrides.greeting;
  }
  if (overrides.subtitle) {
    const el = document.querySelector('.hero-subtitle');
    if (el) el.textContent = overrides.subtitle;
  }
  if (overrides.tagline) {
    const el = document.querySelector('.hero-tagline');
    if (el) el.textContent = `"${overrides.tagline.replace(/^"+|"+$/g, '')}"`;
  }

  // Visit / Contact Section
  if (overrides.address) {
    const el = document.getElementById('visit-address');
    if (el) el.textContent = overrides.address;
  }
  if (overrides.phone) {
    const el = document.getElementById('visit-phone');
    if (el) {
      el.textContent = overrides.phone;
      el.href = `tel:${overrides.phone.replace(/[^0-9+]/g, '')}`;
    }
  }
  if (overrides.email) {
    const el = document.getElementById('visit-email');
    if (el) {
      el.textContent = overrides.email;
      el.href = `mailto:${overrides.email.trim()}`;
    }
  }
  if (overrides.whatsapp) {
    document.querySelectorAll('.js-reserve-btn').forEach(btn => {
      btn.href = overrides.whatsapp;
    });
  }
  if (overrides.directions_url) {
    const el = document.getElementById('visit-directions-btn');
    if (el) el.href = overrides.directions_url;
  }
  if (overrides.map_embed_url) {
    const el = document.getElementById('map-iframe');
    if (el) el.src = overrides.map_embed_url;
  }
  if (overrides.hours) {
    const el = document.getElementById('hours-table');
    if (el) {
      el.innerHTML = `
        <div class="hours-row">
          <span class="hours-day">Monday – Sunday</span>
          <span class="hours-time">${overrides.hours}</span>
        </div>
      `;
    }
  }

  // Social Links
  if (overrides.instagram_url) {
    document.querySelectorAll('.js-instagram-link').forEach(a => a.href = overrides.instagram_url);
  }
  if (overrides.facebook_url) {
    document.querySelectorAll('.js-facebook-link').forEach(a => a.href = overrides.facebook_url);
  }

  // Story texts
  if (overrides.story_title) {
    const el = document.querySelector('.story-headline');
    if (el) el.textContent = overrides.story_title;
  }
  if (overrides.story_lead) {
    const el = document.querySelector('.story-lead');
    if (el) el.textContent = overrides.story_lead;
  }
  if (overrides.story_quote) {
    const el = document.querySelector('.story-pullquote blockquote');
    if (el) el.textContent = `"${overrides.story_quote.replace(/^"+|"+$/g, '')}"`;
  }
}

// ── Live Instant Sync Across Tabs ──────────────────────────────────
try {
  if (typeof BroadcastChannel !== 'undefined') {
    const channel = new BroadcastChannel('laal_matka_asset_sync');
    channel.onmessage = (event) => {
      const { type, slot, item } = event.data || {};
      if (type === 'asset-updated' && slot && item) {
        applyDirectAsset(slot, item);
      }
      if (type === 'content-field-updated' || type === 'content-all-updated' || type === 'content-all-cleared') {
        injectContentOverrides();
      }
      injectCustomAssets();
    };
  }

  window.addEventListener('storage', (e) => {
    if (e.key === 'laal_matka_assets_v1') {
      immediateSyncInject();
      injectCustomAssets();
    }
    if (e.key === 'laal_matka_content_overrides_v1') {
      injectContentOverrides();
    }
  });
} catch (_) {}

// Immediate execution
immediateSyncInject();
injectContentOverrides();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    immediateSyncInject();
    injectContentOverrides();
    injectCustomAssets();
  });
} else {
  immediateSyncInject();
  injectContentOverrides();
  injectCustomAssets();
}
