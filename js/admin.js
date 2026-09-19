/**
 * LAAL MATKA — admin.js
 * Comprehensive Administrative CMS Suite Controller
 */

import {
  CAFE_NAME,
  CAFE_SUBTITLE,
  TAGLINE,
  GREETING,
  CLOSING_LINE,
  ADDRESS,
  PHONE,
  EMAIL,
  WHATSAPP_URL,
  DIRECTIONS_URL,
  MAP_EMBED_URL,
  HOURS,
  MENU_CATEGORIES,
  ASSETS,
  REVIEWS
} from '../content.js';

import {
  saveAsset,
  getAllAssets,
  removeAsset,
  clearAllAssets,
  getContentOverrides,
  saveContentOverride,
  saveAllContentOverrides,
  clearAllContentOverrides,
  exportFullSiteBackup,
  importFullSiteBackup
} from './storage.js';

import { ALIAS_MAP, findAssetForSlot } from './asset-injector.js';

// Default Passcode Key in LocalStorage
const LS_ADMIN_PASS_KEY = 'laal_matka_admin_pass';
const DEFAULT_PASSCODE = 'laalmatka2026';
const SS_LOGGED_IN_KEY = 'laal_matka_admin_logged_in';

const DEFAULT_MENU_PAGE_IMAGES = [
  'images/menu-page-1.jpg',
  'images/menu-page-4.jpg',
  'images/menu-page-3.jpg',
  'images/menu-page-3.jpg',
  'images/menu-page-4.jpg',
  'images/menu-page-1.jpg',
  'images/menu-page-1.jpg',
  'images/menu-page-4.jpg',
  'images/menu-page-2.jpg'
];

let currentAssets = {};
let currentOverrides = {};

/* ── DOM Elements ─────────────────────────────────────────────── */
const loginOverlay    = document.getElementById('admin-login-overlay');
const loginForm       = document.getElementById('admin-login-form');
const passInput       = document.getElementById('admin-pass-input');
const togglePassBtn   = document.getElementById('btn-toggle-pass');
const loginFeedback   = document.getElementById('admin-login-feedback');
const logoutBtn       = document.getElementById('btn-logout');
const exportBackupBtn = document.getElementById('btn-export-backup');
const importBackupInp = document.getElementById('admin-backup-file-input');
const factoryResetBtn = document.getElementById('btn-factory-reset');
const changePassForm  = document.getElementById('form-change-pass');

/* ── 1. Authentication System ─────────────────────────────────── */
function getStoredPasscode() {
  return localStorage.getItem(LS_ADMIN_PASS_KEY) || DEFAULT_PASSCODE;
}

function checkAuthSession() {
  const isLoggedIn = sessionStorage.getItem(SS_LOGGED_IN_KEY) === 'true';
  if (isLoggedIn) {
    loginOverlay?.classList.add('is-hidden');
  } else {
    loginOverlay?.classList.remove('is-hidden');
  }
}

loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const enteredPass = passInput?.value || '';
  const correctPass = getStoredPasscode();

  if (enteredPass === correctPass) {
    sessionStorage.setItem(SS_LOGGED_IN_KEY, 'true');
    loginFeedback.textContent = '';
    loginOverlay?.classList.add('is-hidden');
    showToast('Welcome to Laal Matka Admin Studio!');
  } else {
    loginFeedback.textContent = 'Incorrect passcode. Please try again.';
    passInput.select();
  }
});

togglePassBtn?.addEventListener('click', () => {
  if (passInput) {
    const isPass = passInput.type === 'password';
    passInput.type = isPass ? 'text' : 'password';
    togglePassBtn.textContent = isPass ? '🔒' : '👁️';
  }
});

logoutBtn?.addEventListener('click', () => {
  sessionStorage.removeItem(SS_LOGGED_IN_KEY);
  checkAuthSession();
  showToast('Logged out successfully.');
});

changePassForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const newPass = document.getElementById('input-new-pass')?.value;
  const confirmPass = document.getElementById('input-confirm-pass')?.value;

  if (!newPass || newPass.length < 6) {
    showToast('Passcode must be at least 6 characters long.');
    return;
  }
  if (newPass !== confirmPass) {
    showToast('Passcodes do not match.');
    return;
  }

  localStorage.setItem(LS_ADMIN_PASS_KEY, newPass);
  changePassForm.reset();
  showToast('✓ Admin passcode updated successfully!');
});

/* ── 2. Sidebar Tab Navigation ────────────────────────────────── */
function setupTabs() {
  const tabs = document.querySelectorAll('.admin-tab-btn');
  const panels = document.querySelectorAll('.admin-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      panels.forEach(p => p.classList.remove('is-active'));

      tab.classList.add('is-active');
      const targetId = tab.dataset.target;
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('is-active');
      }
    });
  });
}

/* ── 3. Populate Forms with Site Data & Overrides ─────────────── */
async function loadAndPopulateData() {
  currentAssets = await getAllAssets();
  currentOverrides = getContentOverrides();

  // Populate Hero Texts
  const greetingInp = document.getElementById('input-hero-greeting');
  if (greetingInp) greetingInp.value = currentOverrides.greeting || GREETING;

  const subtitleInp = document.getElementById('input-hero-subtitle');
  if (subtitleInp) subtitleInp.value = currentOverrides.subtitle || CAFE_SUBTITLE;

  const taglineInp = document.getElementById('input-hero-tagline');
  if (taglineInp) taglineInp.value = currentOverrides.tagline || TAGLINE;

  const closingInp = document.getElementById('input-closing-line');
  if (closingInp) closingInp.value = currentOverrides.closing_line || CLOSING_LINE;

  // Closing Mascot Photo
  const closingThumb = document.getElementById('thumb-closing-character');
  if (closingThumb) {
    const custom = findAssetForSlot('closing-character', currentAssets);
    closingThumb.src = custom?.dataUrl || 'images/closing-character.jpg';
  }

  // Populate Story Texts
  const storyTitleInp = document.getElementById('input-story-title');
  if (storyTitleInp) storyTitleInp.value = currentOverrides.story_title || 'A Legacy Shaped by Earth, Fire & Time.';

  const storyLeadInp = document.getElementById('input-story-lead');
  if (storyLeadInp) storyLeadInp.value = currentOverrides.story_lead || 'In an era of rushed kitchens, we returned to the roots. Laal Matka was born from a singular passion: bringing the sacred art of earthen clay pot cooking to Gorakhpur.';

  const storyQuoteInp = document.getElementById('input-story-quote');
  if (storyQuoteInp) storyQuoteInp.value = currentOverrides.story_quote || 'Clay breathes. Iron cooks. Fire gives soul.';

  // Populate Contact Details
  const addrInp = document.getElementById('input-address');
  if (addrInp) addrInp.value = currentOverrides.address || ADDRESS;

  const phoneInp = document.getElementById('input-phone');
  if (phoneInp) phoneInp.value = currentOverrides.phone || PHONE;

  const emailInp = document.getElementById('input-email');
  if (emailInp) emailInp.value = currentOverrides.email || EMAIL;

  const waInp = document.getElementById('input-whatsapp');
  if (waInp) waInp.value = currentOverrides.whatsapp || WHATSAPP_URL;

  const hoursInp = document.getElementById('input-hours');
  if (hoursInp) hoursInp.value = currentOverrides.hours || (HOURS['Monday – Sunday'] || '11:00 AM – 11:00 PM');

  const dirInp = document.getElementById('input-directions-url');
  if (dirInp) dirInp.value = currentOverrides.directions_url || DIRECTIONS_URL;

  const mapInp = document.getElementById('input-map-embed-url');
  if (mapInp) mapInp.value = currentOverrides.map_embed_url || MAP_EMBED_URL;

  // Render Grid Panels
  renderMenuGrid();
  renderCraftGrid();
  renderExperienceGrid();
  renderGalleryGrid();
  renderReviewsList();
}

/* ── 4. Render Menu Pages Grid (01 to 09) ─────────────────────── */
function renderMenuGrid() {
  const container = document.getElementById('menu-cards-grid');
  if (!container) return;

  container.innerHTML = MENU_CATEGORIES.map((cat, i) => {
    const slotKey = `menu-${i + 1}`;
    const pageNum = i + 1 < 10 ? `0${i + 1}` : `${i + 1}`;
    const customAsset = currentAssets[slotKey]?.dataUrl;
    const defaultImg = DEFAULT_MENU_PAGE_IMAGES[i] || 'images/menu-page-1.jpg';
    const activeImg = customAsset || defaultImg;

    return `
      <div class="admin-card" data-slot="${slotKey}">
        <div class="admin-card-header">
          <h3 class="admin-card-title">Page ${pageNum}: ${cat.name}</h3>
          <span class="admin-card-badge">${customAsset ? '✓ Custom Uploaded' : 'Default Scan'}</span>
        </div>
        <div class="admin-card-body">
          <div class="admin-thumb-box js-asset-dropzone" data-slot="${slotKey}" title="Click or drop image to replace Page ${pageNum} menu sheet">
            <img src="${activeImg}" alt="${cat.name} Menu Page" class="admin-thumb-img" id="thumb-${slotKey}" />
            <div class="admin-thumb-overlay">
              <span class="admin-thumb-icon">📥</span>
              <span class="admin-thumb-text">Click / Drop New Scan</span>
            </div>
            <input type="file" accept="image/*" class="js-card-file-input" style="display: none;" />
          </div>

          <div class="admin-field">
            <label>Category Title</label>
            <input type="text" class="admin-input js-menu-title-input" data-index="${i}" value="${cat.name}" />
          </div>

          <div class="admin-field">
            <label>Tagline / Description</label>
            <input type="text" class="admin-input js-menu-desc-input" data-index="${i}" value="${cat.desc}" />
          </div>
        </div>
      </div>
    `;
  }).join('');

  attachDropzoneEvents(container);
}

/* ── 5. Render Craft Stages (5 Stages) ────────────────────────── */
function renderCraftGrid() {
  const container = document.getElementById('craft-cards-grid');
  if (!container) return;

  const stages = [
    { slot: 'att-art', name: 'Stage 1: Art', defaultImg: 'images/real-att-art.jpg', desc: 'Miniature painting & folk mural craft.' },
    { slot: 'att-craft', name: 'Stage 2: Craft', defaultImg: 'images/real-att-craft.jpg', desc: 'Master potter shaping desert clay.' },
    { slot: 'att-fire', name: 'Stage 3: Fire', defaultImg: 'images/real-att-fire.jpg', desc: 'Kiln baking & slow woodfire embers.' },
    { slot: 'att-flavour', name: 'Stage 4: Flavour', defaultImg: 'images/real-att-flavour.jpg', desc: 'Stone-ground Mathania spices & gravy.' },
    { slot: 'att-table', name: 'Stage 5: Table', defaultImg: 'images/real-att-table.jpg', desc: 'Royal feast served in traditional handi.' }
  ];

  container.innerHTML = stages.map(stg => {
    const customAsset = currentAssets[stg.slot]?.dataUrl;
    const activeImg = customAsset || stg.defaultImg;

    return `
      <div class="admin-card" data-slot="${stg.slot}">
        <div class="admin-card-header">
          <h3 class="admin-card-title">${stg.name}</h3>
          <span class="admin-card-badge">${customAsset ? '✓ Custom' : 'Default'}</span>
        </div>
        <div class="admin-card-body">
          <div class="admin-thumb-box js-asset-dropzone" data-slot="${stg.slot}" title="Click or drop photo to replace">
            <img src="${activeImg}" alt="${stg.name}" class="admin-thumb-img" id="thumb-${stg.slot}" />
            <div class="admin-thumb-overlay">
              <span class="admin-thumb-icon">📷</span>
              <span class="admin-thumb-text">Replace Photo</span>
            </div>
            <input type="file" accept="image/*" class="js-card-file-input" style="display: none;" />
          </div>
          <p class="admin-panel-desc">${stg.desc}</p>
        </div>
      </div>
    `;
  }).join('');

  attachDropzoneEvents(container);
}

/* ── 6. Render Experience Grid (6 Spots) ──────────────────────── */
function renderExperienceGrid() {
  const container = document.getElementById('experience-cards-grid');
  if (!container) return;

  const spots = [
    { slot: 'experience-1', title: '01. Haveli Facade (Exterior)', defaultImg: 'images/real-experience-1.jpg' },
    { slot: 'experience-2', title: '02. Central Courtyard & Fountain', defaultImg: 'images/real-experience-2.jpg' },
    { slot: 'experience-3', title: '03. Baithak Seating & Frescoes', defaultImg: 'images/real-experience-3.jpg' },
    { slot: 'experience-4', title: '04. Woodfire Tandoor / Signature Dish', defaultImg: 'images/real-experience-4.jpg' },
    { slot: 'experience-5', title: '05. Saffron Matka Chai Ceremony', defaultImg: 'images/real-experience-5.jpg' },
    { slot: 'experience-6', title: '06. Warm Folk Ambience & Guests', defaultImg: 'images/real-experience-6.jpg' }
  ];

  container.innerHTML = spots.map(sp => {
    const customAsset = currentAssets[sp.slot]?.dataUrl;
    const activeImg = customAsset || sp.defaultImg;

    return `
      <div class="admin-card" data-slot="${sp.slot}">
        <div class="admin-card-header">
          <h3 class="admin-card-title">${sp.title}</h3>
          <span class="admin-card-badge">${customAsset ? '✓ Custom' : 'Default'}</span>
        </div>
        <div class="admin-card-body">
          <div class="admin-thumb-box js-asset-dropzone" data-slot="${sp.slot}" title="Click or drop photo to replace">
            <img src="${activeImg}" alt="${sp.title}" class="admin-thumb-img" id="thumb-${sp.slot}" />
            <div class="admin-thumb-overlay">
              <span class="admin-thumb-icon">📷</span>
              <span class="admin-thumb-text">Replace Photo</span>
            </div>
            <input type="file" accept="image/*" class="js-card-file-input" style="display: none;" />
          </div>
        </div>
      </div>
    `;
  }).join('');

  attachDropzoneEvents(container);
}

/* ── 7. Render Folk Gallery Grid (9 Photos) ───────────────────── */
function renderGalleryGrid() {
  const container = document.getElementById('gallery-cards-grid');
  if (!container) return;

  const galleryItems = [
    { slot: 'gallery-1', title: '01. Miniature Painting Detail', defaultImg: 'images/real-gallery-1.jpg' },
    { slot: 'gallery-2', title: '02. Courtyard Dining & Archways', defaultImg: 'images/real-gallery-2.jpg' },
    { slot: 'gallery-3', title: '03. Potter Shaping Clay Matka', defaultImg: 'images/real-gallery-3.jpg' },
    { slot: 'gallery-4', title: '04. Royal Thali & Dal Baati', defaultImg: 'images/real-gallery-4.jpg' },
    { slot: 'gallery-5', title: '05. Saffron Kulhad Chai', defaultImg: 'images/real-experience-5.jpg' },
    { slot: 'gallery-6', title: '06. Loaded Shahi Raj Kachori', defaultImg: 'images/real-gallery-6.jpg' },
    { slot: 'gallery-7', title: '07. Woodfire Kiln Baking', defaultImg: 'images/real-gallery-7.jpg' },
    { slot: 'gallery-8', title: '08. Mathania Laal Maas Simmering', defaultImg: 'images/real-gallery-8.jpg' },
    { slot: 'gallery-9', title: '09. Royal Mawa Dessert', defaultImg: 'images/real-gallery-9.jpg' }
  ];

  container.innerHTML = galleryItems.map(item => {
    const customAsset = currentAssets[item.slot]?.dataUrl;
    const activeImg = customAsset || item.defaultImg;

    return `
      <div class="admin-card" data-slot="${item.slot}">
        <div class="admin-card-header">
          <h3 class="admin-card-title">${item.title}</h3>
          <span class="admin-card-badge">${customAsset ? '✓ Custom' : 'Default'}</span>
        </div>
        <div class="admin-card-body">
          <div class="admin-thumb-box js-asset-dropzone" data-slot="${item.slot}" title="Click or drop photo to replace">
            <img src="${activeImg}" alt="${item.title}" class="admin-thumb-img" id="thumb-${item.slot}" />
            <div class="admin-thumb-overlay">
              <span class="admin-thumb-icon">📷</span>
              <span class="admin-thumb-text">Replace Photo</span>
            </div>
            <input type="file" accept="image/*" class="js-card-file-input" style="display: none;" />
          </div>
        </div>
      </div>
    `;
  }).join('');

  attachDropzoneEvents(container);
}

/* ── 8. Render Reviews List ───────────────────────────────────── */
function renderReviewsList() {
  const container = document.getElementById('reviews-container');
  if (!container) return;

  const reviewList = currentOverrides.custom_reviews || REVIEWS || [];

  container.innerHTML = reviewList.map((rev, i) => `
    <div class="admin-review-card" data-index="${i}">
      <div class="admin-review-header">
        <strong style="color: var(--admin-text); font-size: 1rem;">${rev.author || 'Customer'}</strong>
        <div class="admin-stars">★★★★★ (${rev.rating || 5}/5)</div>
      </div>
      <p style="font-size: 0.9rem; color: var(--admin-text); font-style: italic;">"${rev.text}"</p>
      ${rev.ownerReply ? `
        <div style="background: rgba(243,156,18,0.08); border-left: 2px solid var(--admin-gold); padding: 0.5rem 0.75rem; border-radius: 4px; font-size: 0.82rem; color: var(--admin-text-dim);">
          <strong style="color: var(--admin-gold);">Owner Reply:</strong> ${rev.ownerReply}
        </div>
      ` : ''}
    </div>
  `).join('');
}

/* ── 9. Drag & Drop and File Picker Engine ─────────────────────── */
function attachDropzoneEvents(parentEl) {
  const dropzones = parentEl.querySelectorAll('.js-asset-dropzone');

  dropzones.forEach(zone => {
    const slot = zone.dataset.slot;
    const fileInput = zone.querySelector('.js-card-file-input');

    // Click zone triggers file input
    zone.addEventListener('click', () => {
      fileInput?.click();
    });

    fileInput?.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) {
        processUploadedImage(slot, file);
        fileInput.value = '';
      }
    });

    // Drag and Drop
    ['dragenter', 'dragover'].forEach(evt => {
      zone.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        zone.classList.add('is-dragover');
      });
    });

    ['dragleave', 'drop'].forEach(evt => {
      zone.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        zone.classList.remove('is-dragover');
      });
    });

    zone.addEventListener('drop', (e) => {
      const file = e.dataTransfer?.files?.[0];
      if (file) {
        processUploadedImage(slot, file);
      }
    });
  });
}

// Global dropzone binding for standalone single elements (e.g. closing mascot)
attachDropzoneEvents(document);

async function processUploadedImage(slot, file) {
  if (!file || !file.type.startsWith('image/')) {
    showToast('Please select a valid image file (PNG, JPG, WEBP).');
    return;
  }

  const reader = new FileReader();
  reader.onload = async (e) => {
    const dataUrl = e.target.result;
    try {
      // 1. Update thumbnail preview in admin UI
      const thumb = document.getElementById(`thumb-${slot}`);
      if (thumb) thumb.src = dataUrl;

      // 2. Persist to storage (IndexedDB + LocalStorage) and broadcast sync
      await saveAsset(slot, dataUrl, {
        fileName: file.name,
        fileSize: file.size,
        fit: 'cover'
      });

      // Update in-memory state
      currentAssets[slot] = { slot, dataUrl, fileName: file.name };

      showToast(`✓ Image for ${slot} saved & live website synced!`);
    } catch (err) {
      console.error('[admin] Failed to save asset:', err);
      showToast('Error saving image. Check console for details.');
    }
  };
  reader.readAsDataURL(file);
}

/* ── 10. Text Content Save Handlers ───────────────────────────── */
document.querySelectorAll('.js-save-text-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const section = btn.dataset.section;
    const panel = btn.closest('.admin-panel');
    if (!panel) return;

    const inputs = panel.querySelectorAll('[data-key]');
    inputs.forEach(inp => {
      const key = inp.dataset.key;
      const val = inp.value.trim();
      saveContentOverride(key, val);
      currentOverrides[key] = val;
    });

    showToast(`✓ ${section.toUpperCase()} settings saved and live synced!`);
  });
});

/* ── 11. Backup Export and Import Handlers ─────────────────────── */
exportBackupBtn?.addEventListener('click', async () => {
  try {
    const backup = await exportFullSiteBackup();
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `laal-matka-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('📦 Complete website backup downloaded!');
  } catch (err) {
    console.error('Backup export failed:', err);
    showToast('Failed to export backup.');
  }
});

importBackupInp?.addEventListener('change', async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (event) => {
    try {
      const json = JSON.parse(event.target.result);
      if (!confirm('This will restore and overwrite existing images and texts from the backup file. Proceed?')) {
        importBackupInp.value = '';
        return;
      }
      await importFullSiteBackup(json);
      await loadAndPopulateData();
      showToast('✓ Backup restored successfully! Live site updated.');
    } catch (err) {
      console.error('Import failed:', err);
      showToast('Error: Invalid backup file format.');
    }
    importBackupInp.value = '';
  };
  reader.readAsText(file);
});

/* ── 12. Factory Reset Safeguard ──────────────────────────────── */
factoryResetBtn?.addEventListener('click', async () => {
  if (confirm('⚠️ WARNING: This will permanently erase all custom uploaded images and reset all text overrides back to default. Are you sure?')) {
    await clearAllAssets();
    clearAllContentOverrides();
    localStorage.removeItem(LS_ADMIN_PASS_KEY);
    await loadAndPopulateData();
    showToast('All custom content reset to factory defaults.');
  }
});

/* ── 13. Toast Notification Helper ────────────────────────────── */
function showToast(msg) {
  let container = document.getElementById('admin-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'admin-toast-container';
    container.className = 'admin-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'admin-toast';
  toast.innerHTML = `<span>✦</span> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* ── Initialize on Page Load ──────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  checkAuthSession();
  setupTabs();
  loadAndPopulateData();
});
