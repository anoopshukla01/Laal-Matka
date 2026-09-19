/**
 * LAAL MATKA — matka.js
 * Handles:
 * 1. Progressive Interactive Tap-to-Draw Matka:
 *    - 1 tap -> Page 1 shoots out of matka with 3D emergence animation & steam surge
 *    - 2 taps -> Page 2 shoots out
 *    - ... up to 6 pages
 * 2. Expandable Menu Folio:
 *    - Clicking ANY page expands it into a full detailed modal with dishes, prices & tags
 * 3. Smooth deep navigation into Section 4 #menu
 * 4. Doorway reveal in Experience section
 */

import { MENU_CATEGORIES } from '../content.js';

export function initMatka() {
  const matkaSection    = document.getElementById('matka');
  const stage           = document.getElementById('main-matka-stage');
  const trigger         = document.getElementById('main-matka-trigger');
  const statusPill      = document.getElementById('main-matka-status');
  const statusText      = statusPill?.querySelector('.status-text');
  const cueText         = document.getElementById('matka-tap-cue-text');
  const steamContainer  = document.getElementById('main-steam-container');
  const cards           = document.querySelectorAll('.matka-course-card');
  const revealAllBtn    = document.getElementById('matka-reveal-all-btn');
  const replayBtn       = document.getElementById('matka-replay-btn');

  // Modal Elements
  const modal           = document.getElementById('matka-page-modal');
  const modalBackdrop   = document.getElementById('modal-backdrop');
  const modalCloseBtn   = document.getElementById('modal-close-btn');
  const modalBadge      = document.getElementById('modal-folio-badge');
  const modalTitle      = document.getElementById('modal-folio-title');
  const modalDesc       = document.getElementById('modal-folio-desc');
  const modalDishes     = document.getElementById('modal-folio-dishes');
  const modalToMenuBtn  = document.getElementById('modal-to-menu-btn');

  if (!matkaSection || !stage || !trigger) return;

  let revealedCount = 0; // Starts with 0 revealed, draws on tap as in original design
  let activeModalCategoryIndex = 0;
  let isAnimating = false;

  const totalPages = cards.length; // 6

  /**
   * Updates status badge & tap cue text
   */
  function updateStatusUI() {
    if (revealedCount === 0) {
      if (statusText) statusText.textContent = `TAP MATKA TO DRAW COURSE 1 (0 / ${totalPages} REVEALED)`;
      if (cueText) cueText.textContent = 'TAP MATKA TO DRAW COURSE 1';
      stage.classList.remove('has-drawn');
      stage.removeAttribute('data-state');
    } else if (revealedCount < totalPages) {
      if (statusText) statusText.textContent = `TAP MATKA FOR COURSE ${revealedCount + 1} • ${revealedCount} OF ${totalPages} REVEALED`;
      if (cueText) cueText.textContent = `TAP MATKA TO DRAW COURSE ${revealedCount + 1}`;
      stage.classList.add('has-drawn');
    } else {
      if (statusText) statusText.textContent = `✨ ALL ${totalPages} COURSES REVEALED • TAP ANY CARD TO EXPAND`;
      if (cueText) cueText.textContent = 'ALL COURSES REVEALED • TAP TO EXPAND';
      stage.classList.add('has-drawn');
      stage.setAttribute('data-state', 'settled');
    }
  }

  // Initial call to set status text
  updateStatusUI();

  /**
   * Draws out the next menu page from the matka
   */
  function drawNextPage() {
    if (revealedCount >= totalPages) {
      // If all are already out, smoothly pulse the cards to invite clicking
      cards.forEach(c => {
        c.style.animation = 'none';
        void c.offsetWidth;
        c.style.animation = 'matkaPageSummon 0.45s ease';
      });
      return;
    }

    // 1. Tactile squash on the matka
    stage.classList.add('is-squashing');
    setTimeout(() => stage.classList.remove('is-squashing'), 200);

    // 2. Surge steam from the mouth
    if (steamContainer) {
      steamContainer.classList.remove('is-surging');
      void steamContainer.offsetWidth; // force reflow
      steamContainer.classList.add('is-surging');
      setTimeout(() => steamContainer.classList.remove('is-surging'), 1600);
    }

    // 3. Mark previous newest card as settled
    cards.forEach(c => c.classList.remove('is-newest'));

    // 4. Reveal current card with 3D emergence
    const targetCard = cards[revealedCount];
    if (targetCard) {
      targetCard.classList.add('is-drawn', 'is-newest');
      // On desktop, keep matka pot in view; on phone, let natural flow prevail
      if (window.innerWidth > 768) {
        trigger.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    revealedCount++;
    updateStatusUI();
  }

  /**
   * Frame-1 Trigger Handler (prevents ghost double-firing on phones)
   */
  let lastTouchTime = 0;
  function handleTrigger(e) {
    if (e) {
      if (e.type === 'touchend') {
        lastTouchTime = Date.now();
      } else if (e.type === 'click') {
        if (Date.now() - lastTouchTime < 600) {
          // Ignore synthetic click right after touchend
          return;
        }
      }
      e.stopPropagation();
    }
    if (isAnimating) return;
    isAnimating = true;
    setTimeout(() => { isAnimating = false; }, 350);

    drawNextPage();
  }

  trigger.addEventListener('click', handleTrigger);
  trigger.addEventListener('touchend', handleTrigger, { passive: true });

  statusPill?.addEventListener('click', handleTrigger);

  // Reveal All Pages shortcut
  revealAllBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    let delay = 0;
    while (revealedCount < totalPages) {
      setTimeout(() => {
        drawNextPage();
      }, delay);
      delay += 160;
    }
  });

  // Replay / Reset action
  replayBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    revealedCount = 0;
    cards.forEach(c => c.classList.remove('is-drawn', 'is-newest', 'is-active'));
    updateStatusUI();
  });

  /**
   * Expand Page Modal Logic
   */
  function openPageModal(catIndex) {
    activeModalCategoryIndex = catIndex;
    const cat = MENU_CATEGORIES[catIndex];
    if (!cat || !modal) return;

    const pageNum = catIndex + 1 < 10 ? `0${catIndex + 1}` : `${catIndex + 1}`;
    if (modalBadge) modalBadge.textContent = `PAGE ${pageNum} • ${cat.name.toUpperCase()}`;
    if (modalTitle) modalTitle.textContent = cat.name;
    if (modalDesc) modalDesc.textContent = cat.desc;

    const renderPrice = (priceStr) => {
      if (!priceStr) return '';
      if (priceStr.includes('•')) {
        const parts = priceStr.split('•').map(p => p.trim());
        return `<div class="modal-price-chips">${parts.map(p => `<span class="price-chip">${p}</span>`).join('')}</div>`;
      }
      return `<span class="modal-dish-price">${priceStr}</span>`;
    };

    // Render full dishes with pricing, descriptions, and tags
    if (modalDishes) {
      modalDishes.innerHTML = (cat.items || []).map(dish => `
        <article class="modal-dish-row">
          <div class="modal-dish-head">
            <div class="modal-dish-name-wrap">
              <span class="dish-veg-tag ${dish.veg ? 'veg' : 'nonveg'}" title="${dish.veg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
              <h4 class="modal-dish-name">${dish.name}</h4>
            </div>
            ${renderPrice(dish.price)}
          </div>
          <p class="modal-dish-desc">${dish.desc}</p>
          <div class="modal-dish-tags">
            ${(dish.tags || []).map(tag => `<span class="modal-dish-tag">${tag}</span>`).join('')}
          </div>
        </article>
      `).join('');
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closePageModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Bind Card Click -> Expand Page
  cards.forEach((card, i) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openPageModal(i);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPageModal(i);
      }
    });
  });

  // Modal Close Listeners
  modalCloseBtn?.addEventListener('click', closePageModal);
  modalBackdrop?.addEventListener('click', closePageModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('is-open')) {
      closePageModal();
    }
  });

  // Modal "Reserve a table for this course" action
  modalToMenuBtn?.addEventListener('click', () => {
    closePageModal();
    const visitSection = document.getElementById('visit');
    if (visitSection) {
      visitSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Initialize UI on load
  updateStatusUI();
}

/**
 * Doorway reveal for the Experience section.
 * Triggers when the doorway wraps scrolls into view.
 */
export function initDoorway() {
  const doorway = document.querySelector('.doorway-wrap');
  if (!doorway) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    doorway.classList.add('door-open');
    return;
  }

  const doorObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            doorway.classList.add('door-open');
          }, 600);
          doorObserver.unobserve(doorway);
        }
      });
    },
    { threshold: 0.4 }
  );

  doorObserver.observe(doorway);
}
