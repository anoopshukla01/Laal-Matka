/**
 * LAAL MATKA — gallery.js
 * Asymmetric gallery grid with native <dialog> lightbox.
 * - Opens images in fullscreen with prev/next navigation
 * - Keyboard: Escape=close, ArrowLeft/Right=navigate
 */

import { ASSETS } from '../content.js';

let currentIndex = 0;
let galleryItems = [];

export function initGallery() {
  const grid     = document.getElementById('gallery-grid');
  const lightbox = document.getElementById('gallery-lightbox');
  const lbImg    = document.getElementById('lightbox-img');
  const lbClose  = document.getElementById('lightbox-close');
  const lbPrev   = document.getElementById('lightbox-prev');
  const lbNext   = document.getElementById('lightbox-next');
  const lbCounter= document.getElementById('lightbox-counter');

  if (!grid || !lightbox) return;

  // ── Render gallery items ──────────────────────────────────────
  galleryItems = ASSETS.gallery;

  grid.innerHTML = galleryItems.map((item, i) => {
    const imgMarkup = item.path
      ? `<img src="${item.path}" alt="${item.label}" data-slot="${item.slot}" loading="lazy">`
      : `<div class="img-placeholder" data-slot="${item.slot}">
           <span class="slot-label">${item.label}</span>
         </div>`;

    return `
      <div
        class="gallery-item"
        data-index="${i}"
        data-slot="${item.slot}"
        role="button"
        tabindex="0"
        aria-label="Open image ${i + 1}: ${item.label}"
      >
        ${imgMarkup}
        <div class="gallery-item-overlay">
          <span>View Image</span>
        </div>
      </div>
    `;
  }).join('');

  // ── Click / keyboard open ─────────────────────────────────────
  grid.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    openLightbox(parseInt(item.dataset.index, 10));
  });

  grid.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const item = e.target.closest('.gallery-item');
      if (item) {
        e.preventDefault();
        openLightbox(parseInt(item.dataset.index, 10));
      }
    }
  });

  // ── Lightbox controls ─────────────────────────────────────────
  lbClose?.addEventListener('click', closeLightbox);
  lbPrev?.addEventListener('click', () => navigate(-1));
  lbNext?.addEventListener('click', () => navigate(1));

  // Close on backdrop click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.open) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   navigate(-1);
    if (e.key === 'ArrowRight')  navigate(1);
  });

  function openLightbox(index) {
    currentIndex = index;
    updateLightboxImage();
    lightbox.showModal();
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.close();
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + galleryItems.length) % galleryItems.length;
    updateLightboxImage();
  }

  function updateLightboxImage() {
    const item = galleryItems[currentIndex];
    if (!item) return;

    // Check if the corresponding grid image has been replaced with a custom upload
    const renderedGridImg = grid.querySelector(`.gallery-item[data-index="${currentIndex}"] img`);
    const activeSrc = (renderedGridImg && renderedGridImg.src) ? renderedGridImg.src : item.path;

    if (lbImg) {
      if (activeSrc) {
        lbImg.src = activeSrc;
        lbImg.alt = item.label;
        lbImg.style.display = 'block';
        const existing = lightbox.querySelector('.lightbox-placeholder');
        if (existing) existing.remove();
      } else {
        // Show placeholder in lightbox
        lbImg.style.display = 'none';
        const existing = lightbox.querySelector('.lightbox-placeholder');
        if (!existing) {
          const ph = document.createElement('div');
          ph.className = 'img-placeholder lightbox-placeholder';
          ph.style.cssText = 'width:600px;max-width:90vw;height:400px;border-color:#6B6B6B;background:#2a2a2a;color:#888;font-size:0.7rem;';
          ph.innerHTML = `<span class="slot-label">${item.label}</span>`;
          lbImg.insertAdjacentElement('afterend', ph);
        } else {
          existing.querySelector('.slot-label').textContent = item.label;
        }
      }
    }

    if (lbCounter) {
      lbCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
    }

    // Re-trigger scale-in animation
    lbImg?.getAnimations().forEach(a => a.cancel());
    lbImg?.getAnimations().forEach(a => a.play());
  }
}
