/**
 * LAAL MATKA — uploader.js
 * Asset Studio logic: handles drag-and-drop, bulk uploads,
 * smart auto-assignment to slots, IndexedDB persistence, and live site sync.
 */

import { saveAsset, getAsset, getAllAssets, removeAsset, clearAllAssets } from './storage.js';

// All image slots defined across the website
export const SLOTS_METADATA = [
  // ── 1. Hero & Mascots ──────────────────────────────────────────
  {
    id: 'hero-matka',
    section: 'hero',
    sectionName: 'Hero & Mascots',
    name: 'Hero Clay Matka Pot',
    desc: 'Traditional clay pot with warm lighting and soft shadow.',
    specs: '800×1000px • Transparent PNG • Portrait/Square',
    fitDefault: 'contain',
    defaultImage: 'images/potter-craft.jpg',
    keywords: ['matka', 'pot', 'clay', 'pitcher', 'handi', 'mitti']
  },
  {
    id: 'closing-character',
    section: 'hero',
    sectionName: 'Hero & Mascots',
    name: 'Closing Namaste Character',
    desc: 'Rajasthani mascot with hands folded in traditional greeting pose.',
    specs: '600×900px • Transparent PNG • Portrait',
    fitDefault: 'contain',
    defaultImage: 'images/closing-character.jpg',
    keywords: ['namaste', 'closing', 'greeting', 'pranam', 'folded']
  },

  // ── 2. Our Story ───────────────────────────────────────────────
  {
    id: 'story-illustration',
    section: 'story',
    sectionName: 'Our Story',
    name: 'Heritage Courtyard Mural',
    desc: 'Rajasthani miniature artwork / hand-painted courtyard mural.',
    specs: '600×800px • 3:4 Portrait',
    fitDefault: 'cover',
    defaultImage: 'images/real-story-illustration.jpg',
    keywords: ['story', 'mural', 'painting', 'heritage', 'miniature', 'art', 'jaipur']
  },

  // ── 3. From Art to Table ───────────────────────────────────────
  {
    id: 'att-art',
    section: 'art-to-table',
    sectionName: 'From Art to Table',
    name: 'Stage 1: Folk Art (Art)',
    desc: 'Intricate Rajasthani miniature painting, patterns, and pigments.',
    specs: '800×600px • 4:3 Landscape',
    fitDefault: 'cover',
    defaultImage: 'images/real-att-art.jpg',
    keywords: ['stage1', 'art', 'miniature', 'painting', 'fresco', 'brush', 'color']
  },
  {
    id: 'att-craft',
    section: 'art-to-table',
    sectionName: 'From Art to Table',
    name: 'Stage 2: Potter Wheel (Craft)',
    desc: "Master potter's hands spinning and shaping raw terracotta clay.",
    specs: '800×600px • 4:3 Landscape',
    fitDefault: 'cover',
    defaultImage: 'images/real-att-craft.jpg',
    keywords: ['stage2', 'craft', 'potter', 'wheel', 'hands', 'clay', 'shaping']
  },
  {
    id: 'att-fire',
    section: 'art-to-table',
    sectionName: 'From Art to Table',
    name: 'Stage 3: Kiln & Hearth (Fire)',
    desc: 'Glowing woodfire kiln, tandoor coals, and baking flames.',
    specs: '800×600px • 4:3 Landscape',
    fitDefault: 'cover',
    defaultImage: 'images/real-att-fire.jpg',
    keywords: ['stage3', 'fire', 'kiln', 'flame', 'tandoor', 'baking', 'coal', 'ember']
  },
  {
    id: 'att-flavour',
    section: 'art-to-table',
    sectionName: 'From Art to Table',
    name: 'Stage 4: Spices & Mathania Chilli (Flavour)',
    desc: 'Vibrant whole Mathania chillies, saffron, cloves, and ground masala.',
    specs: '800×600px • 4:3 Landscape',
    fitDefault: 'cover',
    defaultImage: 'images/real-att-flavour.jpg',
    keywords: ['stage4', 'flavour', 'flavor', 'spice', 'chilli', 'masala', 'saffron', 'ingredients']
  },
  {
    id: 'att-table',
    section: 'art-to-table',
    sectionName: 'From Art to Table',
    name: 'Stage 5: Rustic Plating (Table)',
    desc: 'Steaming royal feast served on rustic brass thali or earthenware.',
    specs: '800×600px • 4:3 Landscape',
    fitDefault: 'cover',
    defaultImage: 'images/real-att-table.jpg',
    keywords: ['stage5', 'table', 'thali', 'feast', 'plated', 'served', 'meal', 'dalbaati']
  },

  // ── 4. Matka Menu Courses (6 Emerging Dishes) ──────────────────
  {
    id: 'menu-1',
    section: 'menu',
    sectionName: 'Matka Menu Courses',
    name: 'Course 01: Rajasthani Specials (Dal Baati)',
    desc: 'Golden crisp baatis, panchmel dal, churma and royal curries.',
    specs: '800×600px • 4:3 or Card',
    fitDefault: 'cover',
    defaultImage: 'images/dal-baati.jpg',
    keywords: ['dalbaati', 'dal-baati', 'baati', 'churma', 'specials', 'course1', 'menu1', 'menu-1']
  },
  {
    id: 'menu-2',
    section: 'menu',
    sectionName: 'Matka Menu Courses',
    name: 'Course 02: Matka Chai & Drinks',
    desc: 'Terracotta kulhad saffron tea, kahwa, shikanji and thandai.',
    specs: '800×600px • 4:3 or Card',
    fitDefault: 'cover',
    defaultImage: 'images/matka-chai.jpg',
    keywords: ['chai', 'matka-chai', 'kulhad', 'tea', 'kahwa', 'shikanji', 'thandai', 'course2', 'menu2', 'menu-2']
  },
  {
    id: 'menu-3',
    section: 'menu',
    sectionName: 'Matka Menu Courses',
    name: 'Course 03: Artisan Coffee',
    desc: 'Single-origin filter coffee, cardamom latte and slow cold brew.',
    specs: '800×600px • 4:3 or Card',
    fitDefault: 'cover',
    defaultImage: 'images/artisan-coffee.jpg',
    keywords: ['coffee', 'artisan-coffee', 'latte', 'espresso', 'coldbrew', 'course3', 'menu3', 'menu-3']
  },
  {
    id: 'menu-4',
    section: 'menu',
    sectionName: 'Matka Menu Courses',
    name: 'Course 04: Chaat & Small Plates',
    desc: 'Crispy Raj Kachori loaded with dahi, chutneys, sprouts and sev.',
    specs: '800×600px • 4:3 or Card',
    fitDefault: 'cover',
    defaultImage: 'images/raj-kachori.jpg',
    keywords: ['chaat', 'raj-kachori', 'pyaaz-kachori', 'kachori', 'bada', 'course4', 'menu4', 'menu-4']
  },
  {
    id: 'menu-5',
    section: 'menu',
    sectionName: 'Matka Menu Courses',
    name: 'Course 05: Main Course (Laal Maas)',
    desc: 'Handi simmering Mathania red chilli curries and heritage recipes.',
    specs: '800×600px • 4:3 or Card',
    fitDefault: 'cover',
    defaultImage: 'images/laal-maas.jpg',
    keywords: ['laalmaas', 'laal-maas', 'curry', 'mutton', 'paneer', 'main', 'course5', 'menu5', 'menu-5']
  },
  {
    id: 'menu-6',
    section: 'menu',
    sectionName: 'Matka Menu Courses',
    name: 'Course 06: Royal Desserts (Ghevar)',
    desc: 'Honeycomb Ghevar drenched in rabri, rose petals and dry fruits.',
    specs: '800×600px • 4:3 or Card',
    fitDefault: 'cover',
    defaultImage: 'images/royal-dessert.jpg',
    keywords: ['dessert', 'desserts', 'royal-dessert', 'ghevar', 'rabri', 'malpua', 'kulfi', 'sweet', 'course6', 'menu6', 'menu-6']
  },

  // ── 4. Haveli Café Experience ──────────────────────────────────
  {
    id: 'experience-1',
    section: 'experience',
    sectionName: 'Café Experience',
    name: 'Experience 1: Haveli Facade (Exterior)',
    desc: 'Exterior courtyard view, ornate jharokhas, and welcoming entrance.',
    specs: '800×600px (or 16:9) • Landscape',
    fitDefault: 'cover',
    defaultImage: 'images/real-experience-1.jpg',
    keywords: ['exterior', 'facade', 'gate', 'entrance', 'building', 'courtyard', 'outside']
  },
  {
    id: 'experience-2',
    section: 'experience',
    sectionName: 'Café Experience',
    name: 'Experience 2: Courtyard & Fountain (Interior)',
    desc: 'Heritage courtyard with center fountain and heritage archways.',
    specs: '800×600px • 4:3 Landscape',
    fitDefault: 'cover',
    defaultImage: 'images/real-experience-2.jpg',
    keywords: ['interior', 'courtyard', 'fountain', 'archway', 'haveli']
  },
  {
    id: 'experience-3',
    section: 'experience',
    sectionName: 'Café Experience',
    name: 'Experience 3: Baithak Seating & Wall Frescoes',
    desc: 'Low baithak seating with colourful bolsters and vintage lanterns.',
    specs: '800×600px • 4:3 Landscape',
    fitDefault: 'cover',
    defaultImage: 'images/real-experience-3.jpg',
    keywords: ['seating', 'baithak', 'cushions', 'fresco', 'decor', 'table']
  },
  {
    id: 'experience-4',
    section: 'experience',
    sectionName: 'Café Experience',
    name: 'Experience 4: Woodfire Tandoor / Signature Dish',
    desc: 'Chef cooking over open fire, hot baati fresh out of coals.',
    specs: '800×600px • 4:3 Landscape',
    fitDefault: 'cover',
    defaultImage: 'images/real-experience-4.jpg',
    keywords: ['tandoor', 'cooking', 'chef', 'signature', 'food', 'hot']
  },
  {
    id: 'experience-5',
    section: 'experience',
    sectionName: 'Café Experience',
    name: 'Experience 5: Clay Kulhad Chai Ceremony',
    desc: 'Clay matka chai brewed with cardamom and saffron.',
    specs: '800×600px • 4:3 Landscape',
    fitDefault: 'cover',
    defaultImage: 'images/real-experience-5.jpg',
    keywords: ['chai', 'tea', 'kulhad', 'matka-chai', 'drinks', 'beverage']
  },
  {
    id: 'experience-6',
    section: 'experience',
    sectionName: 'Café Experience',
    name: 'Experience 6: Evening Lantern Ambience',
    desc: 'Nighttime twilight glow, flickering fanoos lanterns, and happy diners.',
    specs: '800×600px • 4:3 Landscape',
    fitDefault: 'cover',
    defaultImage: 'images/real-experience-6.jpg',
    keywords: ['evening', 'lantern', 'night', 'ambience', 'people', 'guests', 'glow']
  },

  // ── 6. Folk Art Gallery ────────────────────────────────────────
  {
    id: 'gallery-1',
    section: 'gallery',
    sectionName: 'Folk Gallery',
    name: 'Gallery 1: Folk Art Detail',
    desc: 'Close-up of intricate hand-painted Rajasthani art patterns.',
    specs: '800×1000px • Portrait',
    fitDefault: 'cover',
    defaultImage: 'images/real-gallery-1.jpg',
    keywords: ['gal1', 'pattern', 'detail', 'mural', 'mandana', 'folk']
  },
  {
    id: 'gallery-2',
    section: 'gallery',
    sectionName: 'Folk Gallery',
    name: 'Gallery 2: Café Interior Wide',
    desc: 'Wide panoramic view of dining hall with arched corridors.',
    specs: '1200×800px • Wide Landscape',
    fitDefault: 'cover',
    defaultImage: 'images/real-gallery-2.jpg',
    keywords: ['gal2', 'wide', 'interior', 'dining', 'hall', 'room']
  },
  {
    id: 'gallery-3',
    section: 'gallery',
    sectionName: 'Folk Gallery',
    name: 'Gallery 3: Pottery & Matka Macro',
    desc: 'Artistic close-up of clay pots and earthenware textures.',
    specs: '600×600px • Square',
    fitDefault: 'cover',
    defaultImage: 'images/real-gallery-3.jpg',
    keywords: ['gal3', 'pottery', 'macro', 'texture', 'earthenware']
  },
  {
    id: 'gallery-4',
    section: 'gallery',
    sectionName: 'Folk Gallery',
    name: 'Gallery 4: Royal Thali Plating',
    desc: 'Overhead royal Rajasthani thali spread with katoris.',
    specs: '800×1000px • Portrait',
    fitDefault: 'cover',
    defaultImage: 'images/real-gallery-4.jpg',
    keywords: ['gal4', 'thali', 'plating', 'dish', 'laalmaas', 'dalbaati']
  },
  {
    id: 'gallery-5',
    section: 'gallery',
    sectionName: 'Folk Gallery',
    name: 'Gallery 5: Chai Poured from Height',
    desc: 'Chai pouring ceremony into traditional terracotta cups.',
    specs: '1200×800px • Landscape',
    fitDefault: 'cover',
    defaultImage: 'images/real-experience-5.jpg',
    keywords: ['gal5', 'pour', 'cutting', 'tea', 'steam', 'action']
  },
  {
    id: 'gallery-6',
    section: 'gallery',
    sectionName: 'Folk Gallery',
    name: 'Gallery 6: Jharokha & Haveli Décor',
    desc: 'Traditional carved wooden window overlooking courtyard.',
    specs: '600×600px • Square',
    fitDefault: 'cover',
    defaultImage: 'images/real-gallery-6.jpg',
    keywords: ['gal6', 'jharokha', 'window', 'carving', 'woodwork']
  },
  {
    id: 'gallery-7',
    section: 'gallery',
    sectionName: 'Folk Gallery',
    name: 'Gallery 7: Mathania Spice Market',
    desc: 'Baskets of red chillies and fragrant whole spices.',
    specs: '800×1000px • Portrait',
    fitDefault: 'cover',
    defaultImage: 'images/real-gallery-7.jpg',
    keywords: ['gal7', 'bazaar', 'market', 'spices', 'chillies', 'red']
  },
  {
    id: 'gallery-8',
    section: 'gallery',
    sectionName: 'Folk Gallery',
    name: 'Gallery 8: Rooftop Evening Seating',
    desc: 'Rooftop view of Jaipur illuminated at sunset.',
    specs: '1200×800px • Landscape',
    fitDefault: 'cover',
    defaultImage: 'images/real-gallery-8.jpg',
    keywords: ['gal8', 'rooftop', 'sunset', 'view', 'skyline', 'evening']
  },
  {
    id: 'gallery-9',
    section: 'gallery',
    sectionName: 'Folk Gallery',
    name: 'Gallery 9: Ambient Night Candlelight',
    desc: 'Warm candle and lantern reflections on clay pottery.',
    specs: '600×600px • Square',
    fitDefault: 'cover',
    defaultImage: 'images/real-gallery-9.jpg',
    keywords: ['gal9', 'night', 'candle', 'lantern', 'atmosphere', 'shadows']
  }
];

let stagedFiles = [];
let currentFilter = 'all';

async function bootstrapUploader() {
  renderSlotCards();
  setupBulkDropzone();
  setupFilterTabs();
  setupHeaderActions();
  await loadSavedAssets();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapUploader);
} else {
  bootstrapUploader();
}

/**
 * Renders all slot cards into the grid
 */
function renderSlotCards() {
  const container = document.getElementById('slots-container');
  if (!container) return;

  // Group by sections
  const sections = [
    { key: 'hero', name: '🌟 Section 1: Hero & Mascots' },
    { key: 'story', name: '📜 Section 2: Our Story' },
    { key: 'art-to-table', name: '🎨 Section 3: From Art to Table' },
    { key: 'menu', name: '🍽️ Section 4: Matka Menu Courses (6 Dishes)' },
    { key: 'experience', name: '🏛️ Section 5: Haveli Café Experience' },
    { key: 'gallery', name: '🖼️ Section 6: The Folk Art Gallery' }
  ];

  container.innerHTML = sections.map(sec => {
    const slots = SLOTS_METADATA.filter(s => s.section === sec.key);
    const visibleSlots = currentFilter === 'all' || currentFilter === sec.key ? slots : [];

    if (!visibleSlots.length) return '';

    const cardsHtml = visibleSlots.map(slot => `
      <article class="slot-card" id="slot-card-${slot.id}" data-slot-id="${slot.id}" data-section="${slot.section}">
        <div class="slot-header">
          <div class="slot-title-wrap">
            <span class="slot-badge-id">${slot.id}</span>
            <h3 class="slot-name">${slot.name}</h3>
          </div>
          <span class="slot-status-pill status-pill">Empty</span>
        </div>

        <p class="slot-desc" style="font-size: 0.76rem; color: hsla(40,42%,96%,0.7); line-height: 1.4;">${slot.desc}</p>
        
        <div class="slot-specs">
          <span>📐 ${slot.specs}</span>
        </div>

        <div class="slot-preview-frame" data-slot-id="${slot.id}">
          <img class="slot-preview-img" alt="${slot.name}" />
          <div class="slot-placeholder-view">
            <span class="icon">📁</span>
            <span>Drop image here or click to browse</span>
          </div>
          <input type="file" class="slot-input-file" accept="image/*" data-slot-id="${slot.id}" />
        </div>

        <div class="slot-actions">
          <div class="slot-fit-toggle">
            <label>Fit:</label>
            <select class="fit-select" data-slot-id="${slot.id}">
              <option value="cover" ${slot.fitDefault === 'cover' ? 'selected' : ''}>Cover (Crop)</option>
              <option value="contain" ${slot.fitDefault === 'contain' ? 'selected' : ''}>Contain (Full)</option>
            </select>
          </div>

          <div class="slot-btns">
            <button class="btn-slot-action btn-replace" data-slot-id="${slot.id}">Upload</button>
            <button class="btn-slot-action btn-slot-danger btn-remove" data-slot-id="${slot.id}" style="display:none;">Remove</button>
          </div>
        </div>
      </article>
    `).join('');

    return `
      <section class="section-group" id="sec-group-${sec.key}">
        <div class="section-group-header">
          <h2 class="section-group-title">${sec.name}</h2>
          <span class="section-group-count">${slots.length} Slots</span>
        </div>
        <div class="slots-grid">
          ${cardsHtml}
        </div>
      </section>
    `;
  }).join('');

  attachSlotEventListeners();
}

/**
 * Attaches direct events to slot cards
 */
function attachSlotEventListeners() {
  // Direct file input change
  document.querySelectorAll('.slot-input-file').forEach(input => {
    input.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const slotId = input.dataset.slotId;
      await processAndAssignFile(file, slotId);
      input.value = '';
    });
  });

  // Clicking on slot preview frame opens file selector
  document.querySelectorAll('.slot-preview-frame').forEach(frame => {
    const slotId = frame.dataset.slotId;
    const input = frame.querySelector('.slot-input-file');

    frame.addEventListener('click', (e) => {
      if (e.target !== input) {
        input?.click();
      }
    });

    // Drag-and-drop on individual slot card!
    ['dragenter', 'dragover'].forEach(eventName => {
      frame.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        frame.classList.add('drag-over');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      frame.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        frame.classList.remove('drag-over');
      }, false);
    });

    frame.addEventListener('drop', async (e) => {
      const dt = e.dataTransfer;
      const files = Array.from(dt.files || []).filter(f => f.type.startsWith('image/'));
      if (files.length) {
        await processAndAssignFile(files[0], slotId);
        const meta = SLOTS_METADATA.find(s => s.id === slotId);
        showToast(`✨ Image assigned to ${meta ? meta.name : slotId}!`);
      }
    });
  });

  // Fit selector change
  document.querySelectorAll('.fit-select').forEach(sel => {
    sel.addEventListener('change', async (e) => {
      const slotId = sel.dataset.slotId;
      const fit = sel.value;
      const existing = await getAsset(slotId);
      if (existing) {
        existing.fit = fit;
        await saveAsset(slotId, existing.dataUrl, existing);
        updateCardUI(slotId, existing);
        showToast(`Updated fit mode to "${fit}" for ${slotId}`);
      }
    });
  });

  // Remove button
  document.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const slotId = btn.dataset.slotId;
      await removeAsset(slotId);
      updateCardUI(slotId, null);
      showToast(`Removed custom image from ${slotId}`);
      updateActiveCount();
    });
  });

  // Replace button triggers file input
  document.querySelectorAll('.btn-replace').forEach(btn => {
    btn.addEventListener('click', () => {
      const slotId = btn.dataset.slotId;
      const card = document.getElementById(`slot-card-${slotId}`);
      card?.querySelector('.slot-input-file')?.click();
    });
  });
}

/**
 * Sets up the Top Bulk Dropzone
 */
function setupBulkDropzone() {
  const dropzone = document.getElementById('bulk-dropzone');
  const fileInput = document.getElementById('bulk-file-input');
  if (!dropzone || !fileInput) return;

  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.add('drag-over');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.remove('drag-over');
    }, false);
  });

  dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = Array.from(dt.files || []).filter(f => f.type.startsWith('image/'));
    if (files.length) handleBulkFiles(files);
  });

  fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files || []).filter(f => f.type.startsWith('image/'));
    if (files.length) handleBulkFiles(files);
  });
}

/**
 * Handles bulk dropped images, runs auto-matching, and displays staging UI
 */
function handleBulkFiles(files) {
  const defaultPhotoSlots = SLOTS_METADATA.filter(s => s.section === 'menu' || s.section === 'art-to-table' || s.section === 'gallery' || s.section === 'experience');

  stagedFiles = files.map((file, i) => {
    const suggestedSlot = findBestMatchSlot(file.name);
    const fallbackSlot = defaultPhotoSlots[i % defaultPhotoSlots.length]?.id || 'experience-1';
    return {
      id: `staged-${Date.now()}-${i}`,
      file,
      targetSlot: suggestedSlot || fallbackSlot,
      previewUrl: URL.createObjectURL(file)
    };
  });

  renderStagedUploads();
}

/**
 * Keyword match algorithm to find the most suitable slot for an image
 */
function findBestMatchSlot(fileName) {
  const cleanName = fileName.toLowerCase().replace(/[^a-z0-9]/g, ' ');
  
  for (const slot of SLOTS_METADATA) {
    if (cleanName.includes(slot.id)) return slot.id;
    for (const kw of slot.keywords) {
      if (cleanName.includes(kw)) return slot.id;
    }
  }
  return null;
}

/**
 * Renders the review list of dropped files
 */
function renderStagedUploads() {
  const wrap = document.getElementById('staged-uploads-wrap');
  const list = document.getElementById('staged-list');
  const countEl = document.getElementById('staged-count');

  if (!wrap || !list) return;

  if (!stagedFiles.length) {
    wrap.classList.remove('is-active');
    return;
  }

  wrap.classList.add('is-active');
  if (countEl) countEl.textContent = `${stagedFiles.length} Images Ready to Assign`;

  list.innerHTML = stagedFiles.map((st, idx) => `
    <div class="staged-item">
      <img src="${st.previewUrl}" class="staged-thumb" alt="${st.file.name}" />
      <div class="staged-meta">
        <div class="staged-filename" title="${st.file.name}">${st.file.name}</div>
        <select class="staged-select" data-index="${idx}">
          ${SLOTS_METADATA.map(s => `
            <option value="${s.id}" ${s.id === st.targetSlot ? 'selected' : ''}>
              ${s.name} (${s.id})
            </option>
          `).join('')}
        </select>
      </div>
      <button class="staged-remove" data-index="${idx}" title="Remove">✕</button>
    </div>
  `).join('');

  // Dropdown slot change
  list.querySelectorAll('.staged-select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      stagedFiles[idx].targetSlot = e.target.value;
    });
  });

  // Staged item remove
  list.querySelectorAll('.staged-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      stagedFiles.splice(idx, 1);
      renderStagedUploads();
    });
  });

  // Apply all button
  const applyBtn = document.getElementById('btn-apply-staged');
  if (applyBtn) {
    applyBtn.onclick = async () => {
      applyBtn.disabled = true;
      applyBtn.textContent = 'Saving Images...';

      for (const item of stagedFiles) {
        await processAndAssignFile(item.file, item.targetSlot);
      }

      showToast(`✨ Successfully assigned ${stagedFiles.length} images to the website!`);
      stagedFiles = [];
      renderStagedUploads();
      applyBtn.disabled = false;
      applyBtn.textContent = '⚡ Apply & Place All Images';
    };
  }
}

/**
 * Optimizes an uploaded image: scales down ultra-large photos to max 1600px
 * and compresses to compact WebP/JPEG to prevent storage quota exhaustion.
 */
async function optimizeImage(file, maxDimension = 1600, quality = 0.88) {
  return new Promise((resolve) => {
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        } else if (file.size < 500 * 1024) {
          // File is already lightweight, keep original
          return resolve(e.target.result);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const outputFormat = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        resolve(canvas.toDataURL(outputFormat, quality));
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}

/**
 * Reads a File object, compresses it, and saves to IndexedDB & LocalStorage
 */
async function processAndAssignFile(file, slotId) {
  try {
    const dataUrl = await optimizeImage(file);
    if (!dataUrl) return null;

    const slotMeta = SLOTS_METADATA.find(s => s.id === slotId);
    const card = document.getElementById(`slot-card-${slotId}`);
    const fit = card?.querySelector('.fit-select')?.value || slotMeta?.fitDefault || 'cover';

    const savedItem = await saveAsset(slotId, dataUrl, {
      fileName: file.name,
      fileSize: file.size,
      fit
    });

    updateCardUI(slotId, savedItem);
    updateActiveCount();
    return savedItem;
  } catch (err) {
    console.error(`Failed to assign file to ${slotId}:`, err);
    showToast(`⚠️ Error uploading image: ${err.message}`);
    return null;
  }
}

/**
 * Updates an individual card's preview and status
 */
function updateCardUI(slotId, asset) {
  const card = document.getElementById(`slot-card-${slotId}`);
  if (!card) return;

  const previewImg = card.querySelector('.slot-preview-img');
  const statusPill = card.querySelector('.status-pill');
  const removeBtn = card.querySelector('.btn-remove');
  const replaceBtn = card.querySelector('.btn-replace');
  const fitSelect = card.querySelector('.fit-select');
  const slotMeta = SLOTS_METADATA.find(s => s.id === slotId);

  if (asset && asset.dataUrl) {
    card.classList.add('has-image');
    card.classList.remove('has-default-image');
    if (previewImg) {
      previewImg.src = asset.dataUrl;
      previewImg.style.objectFit = asset.fit || 'cover';
      previewImg.style.display = 'block';
    }
    if (statusPill) {
      statusPill.textContent = 'Custom Uploaded';
      statusPill.style.background = 'hsla(142, 70%, 45%, 0.2)';
      statusPill.style.color = '#86EFAC';
      statusPill.style.borderColor = 'hsla(142, 70%, 45%, 0.5)';
    }
    if (removeBtn) removeBtn.style.display = 'inline-block';
    if (replaceBtn) replaceBtn.textContent = 'Replace';
    if (fitSelect && asset.fit) fitSelect.value = asset.fit;
  } else if (slotMeta && slotMeta.defaultImage) {
    card.classList.add('has-image', 'has-default-image');
    if (previewImg) {
      previewImg.src = slotMeta.defaultImage;
      previewImg.style.objectFit = slotMeta.fitDefault || 'cover';
      previewImg.style.display = 'block';
    }
    if (statusPill) {
      statusPill.textContent = 'Live Default';
      statusPill.style.background = 'hsla(38, 92%, 50%, 0.15)';
      statusPill.style.color = '#FDE68A';
      statusPill.style.borderColor = 'hsla(38, 92%, 50%, 0.35)';
    }
    if (removeBtn) removeBtn.style.display = 'none';
    if (replaceBtn) replaceBtn.textContent = 'Replace';
  } else {
    card.classList.remove('has-image', 'has-default-image');
    if (previewImg) {
      previewImg.removeAttribute('src');
      previewImg.style.display = 'none';
    }
    if (statusPill) {
      statusPill.textContent = 'Empty';
      statusPill.style.background = '';
      statusPill.style.color = '';
      statusPill.style.borderColor = '';
    }
    if (removeBtn) removeBtn.style.display = 'none';
    if (replaceBtn) replaceBtn.textContent = 'Upload';
  }
}

/**
 * Loads all saved assets from IndexedDB into the UI
 */
async function loadSavedAssets() {
  const assets = await getAllAssets();
  SLOTS_METADATA.forEach(slot => {
    updateCardUI(slot.id, assets[slot.id]);
  });
  updateActiveCount();
}

/**
 * Updates the active custom assets count in the header
 */
async function updateActiveCount() {
  const assets = await getAllAssets();
  const count = Object.keys(assets).length;
  const countBadge = document.getElementById('active-assets-badge');
  if (countBadge) {
    countBadge.textContent = `${count} / ${SLOTS_METADATA.length} Assigned`;
  }
}

/**
 * Filter tab logic
 */
function setupFilterTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.dataset.filter;
      renderSlotCards();
      loadSavedAssets();
    });
  });
}

/**
 * Header action buttons
 */
function setupHeaderActions() {
  // Reset all
  const resetBtn = document.getElementById('btn-reset-all');
  if (resetBtn) {
    resetBtn.addEventListener('click', async () => {
      if (confirm('Are you sure you want to clear all custom uploaded images and revert to placeholders?')) {
        await clearAllAssets();
        SLOTS_METADATA.forEach(s => updateCardUI(s.id, null));
        updateActiveCount();
        showToast('All custom images have been reset.');
      }
    });
  }

  // Export JSON manifest
  const exportBtn = document.getElementById('btn-export-manifest');
  if (exportBtn) {
    exportBtn.addEventListener('click', async () => {
      const assets = await getAllAssets();
      const exportData = {
        exportedAt: new Date().toISOString(),
        totalImages: Object.keys(assets).length,
        slots: assets
      };
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `laal-matka-assets-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Asset manifest downloaded!');
    });
  }
}

/**
 * Toast notifications
 */
function showToast(msg) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✦</span> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
