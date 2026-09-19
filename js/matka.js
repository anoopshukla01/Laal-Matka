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
import { saveAsset, getSyncAssets } from './storage.js';

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
  const modal               = document.getElementById('matka-page-modal');
  const modalBackdrop       = document.getElementById('modal-backdrop');
  const modalCloseBtn       = document.getElementById('modal-close-btn');
  const modalBadge          = document.getElementById('modal-folio-badge');
  const modalTitle          = document.getElementById('modal-folio-title');
  const modalDesc           = document.getElementById('modal-folio-desc');
  const modalPagePills      = document.getElementById('modal-page-nav-pills');
  const modalPageImg        = document.getElementById('modal-menu-page-img');
  const modalUploadPageNum  = document.getElementById('modal-upload-page-num');
  const modalFileInput      = document.getElementById('modal-page-file-input');
  const modalDropzone       = document.getElementById('modal-page-dropzone');
  const modalZoomBtn        = document.getElementById('modal-zoom-btn');
  const modalPrevPageBtn    = document.getElementById('modal-prev-page-btn');
  const modalNextPageBtn    = document.getElementById('modal-next-page-btn');
  const modalPageCounter    = document.getElementById('modal-page-counter');
  const modalToMenuBtn      = document.getElementById('modal-to-menu-btn');

  // Lightbox Elements
  const zoomLightbox        = document.getElementById('menu-zoom-lightbox');
  const zoomLightboxImg     = document.getElementById('menu-zoom-img');
  const zoomLightboxClose   = document.getElementById('menu-zoom-close');

  if (!matkaSection || !stage || !trigger) return;

  let revealedCount = 0; // Starts with 0 revealed, draws on tap
  let activeModalCategoryIndex = 0;
  let isAnimating = false;

  const totalPages = cards.length; // 9 cards

  /**
   * Helper: Get current active image for page index
   */
  function getPageImageSrc(pageIndex) {
    const slotKey = `menu-${pageIndex + 1}`;
    const syncAssets = getSyncAssets();
    if (syncAssets[slotKey]?.dataUrl) {
      return syncAssets[slotKey].dataUrl;
    }
    return DEFAULT_MENU_PAGE_IMAGES[pageIndex] || 'images/menu-page-1.jpg';
  }

  /**
   * Render Page Pills (01 to 09)
   */
  function renderPagePills() {
    if (!modalPagePills) return;
    modalPagePills.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = `modal-page-pill ${i === activeModalCategoryIndex ? 'is-active' : ''}`;
      pill.setAttribute('data-page-index', i);
      const numStr = i + 1 < 10 ? `0${i + 1}` : `${i + 1}`;
      pill.textContent = numStr;
      pill.title = `Switch to Page ${numStr}: ${MENU_CATEGORIES[i]?.name || ''}`;
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        updateModalPage(i);
      });
      modalPagePills.appendChild(pill);
    }
  }

  /**
   * Update Modal View to Specified Category Index
   */
  function updateModalPage(catIndex) {
    if (catIndex < 0) catIndex = totalPages - 1;
    if (catIndex >= totalPages) catIndex = 0;
    activeModalCategoryIndex = catIndex;

    const cat = MENU_CATEGORIES[catIndex];
    if (!cat) return;

    const pageNum = catIndex + 1 < 10 ? `0${catIndex + 1}` : `${catIndex + 1}`;
    if (modalBadge) modalBadge.textContent = `PAGE ${pageNum} • ${cat.name.toUpperCase()}`;
    if (modalTitle) modalTitle.textContent = cat.name;
    if (modalDesc) modalDesc.textContent = cat.desc;
    if (modalUploadPageNum) modalUploadPageNum.textContent = pageNum;
    if (modalPageCounter) modalPageCounter.textContent = `Page ${catIndex + 1} of ${totalPages}`;

    const imgSrc = getPageImageSrc(catIndex);
    if (modalPageImg) {
      modalPageImg.src = imgSrc;
      modalPageImg.alt = `${cat.name} — Menu Page ${pageNum}`;
    }

    // Update Pills Active State
    modalPagePills?.querySelectorAll('.modal-page-pill').forEach((pill, idx) => {
      pill.classList.toggle('is-active', idx === catIndex);
    });
  }

  /**
   * Handle File Upload (FileReader + saveAsset sync)
   */
  async function handlePageFileUpload(file) {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please choose a valid image file (JPG, PNG, WEBP).');
      return;
    }
    const slotKey = `menu-${activeModalCategoryIndex + 1}`;
    const reader = new FileReader();

    reader.onload = async (e) => {
      const dataUrl = e.target.result;
      try {
        // Immediate local preview in modal
        if (modalPageImg) modalPageImg.src = dataUrl;

        // Immediate update on homepage card
        const cardDishImg = document.getElementById(`menu-dish-img-${activeModalCategoryIndex + 1}`);
        if (cardDishImg) cardDishImg.src = dataUrl;

        // Persist to IndexedDB and LocalStorage
        await saveAsset(slotKey, dataUrl, {
          fileName: file.name,
          fileSize: file.size,
          fit: 'contain'
        });

        // Visual feedback
        if (modalUploadPageNum) {
          const originalText = modalUploadPageNum.textContent;
          modalUploadPageNum.textContent = '✓ Saved!';
          setTimeout(() => {
            modalUploadPageNum.textContent = originalText;
          }, 1800);
        }
      } catch (err) {
        console.error('Failed to save menu page image:', err);
      }
    };
    reader.readAsDataURL(file);
  }

  // File input change handler
  modalFileInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handlePageFileUpload(file);
      modalFileInput.value = '';
    }
  });

  // Drag and drop handlers on modalDropzone
  if (modalDropzone) {
    ['dragenter', 'dragover'].forEach(evt => {
      modalDropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        modalDropzone.classList.add('is-dragover');
      });
    });

    ['dragleave', 'drop'].forEach(evt => {
      modalDropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        modalDropzone.classList.remove('is-dragover');
      });
    });

    modalDropzone.addEventListener('drop', (e) => {
      const file = e.dataTransfer?.files?.[0];
      if (file) {
        handlePageFileUpload(file);
      }
    });
  }

  // Navigation Prev / Next
  modalPrevPageBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateModalPage(activeModalCategoryIndex - 1);
  });

  modalNextPageBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateModalPage(activeModalCategoryIndex + 1);
  });

  // Fullscreen Zoom Lightbox
  function openZoomLightbox() {
    if (!zoomLightbox || !modalPageImg) return;
    if (zoomLightboxImg) {
      zoomLightboxImg.src = modalPageImg.src;
      zoomLightboxImg.alt = modalPageImg.alt;
    }
    if (typeof zoomLightbox.showModal === 'function') {
      try {
        zoomLightbox.showModal();
      } catch (_) {
        zoomLightbox.setAttribute('open', '');
      }
    } else {
      zoomLightbox.setAttribute('open', '');
    }
  }

  function closeZoomLightbox() {
    if (!zoomLightbox) return;
    if (typeof zoomLightbox.close === 'function') {
      try {
        zoomLightbox.close();
      } catch (_) {
        zoomLightbox.removeAttribute('open');
      }
    } else {
      zoomLightbox.removeAttribute('open');
    }
  }

  modalZoomBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    openZoomLightbox();
  });

  zoomLightboxClose?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeZoomLightbox();
  });

  zoomLightbox?.addEventListener('click', (e) => {
    if (e.target === zoomLightbox) {
      closeZoomLightbox();
    }
  });

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
      if (cueText) cueText.textContent = 'EXPLORE ANY COURSE';
      stage.classList.add('has-drawn');
      stage.setAttribute('data-state', 'complete');
    }
  }

  /**
   * Emergence animation for a single card.
   */
  function revealNextCard() {
    if (revealedCount >= totalPages || isAnimating) return;
    isAnimating = true;

    cards.forEach(c => c.classList.remove('is-newest'));

    const cardToReveal = cards[revealedCount];
    if (!cardToReveal) {
      isAnimating = false;
      return;
    }

    cardToReveal.classList.add('is-drawn', 'is-newest');
    revealedCount++;
    updateStatusUI();

    triggerSteamBurst();

    trigger.classList.add('is-tapped');
    setTimeout(() => {
      trigger.classList.remove('is-tapped');
      isAnimating = false;
    }, 450);
  }

  /**
   * Steam burst effect triggered when a card emerges from the pot
   */
  function triggerSteamBurst() {
    if (!steamContainer) return;
    steamContainer.classList.remove('surge');
    void steamContainer.offsetWidth; // Force reflow
    steamContainer.classList.add('surge');
    setTimeout(() => {
      steamContainer.classList.remove('surge');
    }, 1200);
  }

  // Click & Touch listener on the handcrafted Matka
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    revealNextCard();
  });

  // Accessible keyboard controls (Enter or Space to draw)
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      revealNextCard();
    }
  });

  // Reveal All shortcut action
  revealAllBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    cards.forEach(c => c.classList.add('is-drawn'));
    revealedCount = totalPages;
    updateStatusUI();
    triggerSteamBurst();
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
    if (!modal) return;
    renderPagePills();
    updateModalPage(catIndex);
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

  // Bind Card Click -> Expand Page Modal
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
    if (e.key === 'Escape') {
      if (zoomLightbox?.hasAttribute('open')) {
        closeZoomLightbox();
      } else if (modal?.classList.contains('is-open')) {
        closePageModal();
      }
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
