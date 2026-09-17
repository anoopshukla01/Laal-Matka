/**
 * LAAL MATKA — menu.js
 * Renders menu from content.js data
 * + manages category tab switching.
 */

import { MENU_CATEGORIES, ASSETS } from '../content.js';

export function initMenu() {
  const tabsContainer    = document.getElementById('menu-tabs');
  const contentContainer = document.getElementById('menu-content');

  if (!tabsContainer || !contentContainer) return;

  // ── Render tabs ──────────────────────────────────────────────
  tabsContainer.innerHTML = MENU_CATEGORIES.map((cat, i) => `
    <button
      class="menu-tab ${i === 0 ? 'active' : ''}"
      data-index="${i}"
      id="menu-tab-${i}"
      aria-selected="${i === 0}"
      role="tab"
      aria-controls="menu-panel-${i}"
    >
      ${cat.name}
    </button>
  `).join('');

  // ── Render menu panels ────────────────────────────────────────
  contentContainer.innerHTML = MENU_CATEGORIES.map((cat, catIdx) => `
    <div
      class="menu-category ${catIdx === 0 ? 'active' : ''}"
      id="menu-panel-${catIdx}"
      role="tabpanel"
      aria-labelledby="menu-tab-${catIdx}"
    >
      <div class="category-header">
        <h3 class="category-name">${cat.name}</h3>
        <p class="category-desc">${cat.desc}</p>
      </div>

      <div class="menu-items">
        ${cat.items.map((item, itemIdx) => {
          // Resolve dish image asset
          const assetKey  = `${cat.name.toLowerCase().replace(/\s+/g, '-')}-${itemIdx}`;
          const dishAsset = ASSETS.dishes?.[catIdx]?.[itemIdx];
          const imgSrc    = dishAsset?.path;
          const imgLabel  = dishAsset?.label || `DISH IMAGE — ${item.name} — 300×300px`;

          const imgMarkup = imgSrc
            ? `<img src="${imgSrc}" alt="${item.name}" loading="lazy" width="120" height="120" data-slot="${assetKey}">`
            : `<div class="img-placeholder" data-slot="${assetKey}">
                 <span class="slot-label">${imgLabel}</span>
               </div>`;

          const tagsMarkup = (item.tags || []).map(tag =>
            `<span class="dish-tag">${tag}</span>`
          ).join('');

          return `
            <article class="menu-item" data-item="${item.name}">
              <div class="dish-img-wrap" data-slot="${assetKey}">
                ${imgMarkup}
              </div>
              <div class="dish-details">
                <div class="dish-top">
                  <span class="veg-dot ${item.veg ? 'veg' : 'nonveg'}" title="${item.veg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
                  <h4 class="dish-name">${item.name}</h4>
                  <span class="dish-price">${item.price}</span>
                </div>
                <p class="dish-desc">${item.desc}</p>
                <div class="dish-tags">${tagsMarkup}</div>
              </div>
            </article>
          `;
        }).join('')}
      </div>
    </div>
  `).join('');

  // ── Tab switching ─────────────────────────────────────────────
  tabsContainer.addEventListener('click', (e) => {
    const tab = e.target.closest('.menu-tab');
    if (!tab) return;

    const idx = parseInt(tab.dataset.index, 10);

    // Update tab active states
    tabsContainer.querySelectorAll('.menu-tab').forEach((t, i) => {
      t.classList.toggle('active', i === idx);
      t.setAttribute('aria-selected', i === idx);
    });

    // Update panel visibility with a brief fade
    contentContainer.querySelectorAll('.menu-category').forEach((panel, i) => {
      if (i === idx) {
        panel.style.animation = 'fadeIn 0.3s ease both';
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
        panel.style.animation = '';
      }
    });
  });
}
