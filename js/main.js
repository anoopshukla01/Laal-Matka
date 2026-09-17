/**
 * LAAL MATKA — main.js
 * Main entry point: initializes all UI modules, scroll observers,
 * Art-to-Table carousel, and dynamic content bindings.
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
  RESERVATION_ACTION,
  DIRECTIONS_URL,
  MAP_EMBED_URL,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  TWITTER_URL,
  HOURS,
  ASSETS,
  STORY,
  ART_TO_TABLE,
  EXPERIENCE,
  VISIT,
  NAV_LINKS
} from '../content.js';

import { initNav } from './nav.js';
import { initCharacter, animateBrandName } from './character.js';
import { initMatka, initDoorway } from './matka.js';
import { initMenu } from './menu.js';
import { initGallery } from './gallery.js';
import { injectCustomAssets } from './asset-injector.js';

async function bootstrap() {
  // ── 1. Populate dynamic content from content.js ─────────────
  populateContent();

  // ── 2. Initialize all interactive modules ────────────────────
  initNav();
  initCharacter();
  animateBrandName();
  initMatka();
  initDoorway();
  initMenu();
  initGallery();
  initArtToTable();
  initScrollReveals();

  // ── 3. Inject any custom uploaded images from uploader ───────
  await injectCustomAssets();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}

/**
 * Hydrates DOM elements with text and links defined in content.js
 */
function populateContent() {
  // Nav links
  const navLinksContainer = document.getElementById('nav-links-list');
  if (navLinksContainer) {
    navLinksContainer.innerHTML = NAV_LINKS.map(link => `
      <li><a href="${link.href}">${link.label}</a></li>
    `).join('');
  }

  // Reservation CTA buttons
  const reserveButtons = document.querySelectorAll('.js-reserve-btn');
  reserveButtons.forEach(btn => {
    btn.setAttribute('href', RESERVATION_ACTION);
    if (RESERVATION_ACTION.startsWith('http')) {
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
    }
  });

  // Directions CTA buttons
  const directionsButtons = document.querySelectorAll('.js-directions-btn');
  directionsButtons.forEach(btn => {
    btn.setAttribute('href', DIRECTIONS_URL);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });

  // Social buttons
  const igLinks = document.querySelectorAll('.js-instagram-link');
  igLinks.forEach(link => { link.href = INSTAGRAM_URL; link.target = '_blank'; });

  const fbLinks = document.querySelectorAll('.js-facebook-link');
  fbLinks.forEach(link => { link.href = FACEBOOK_URL; link.target = '_blank'; });

  const twLinks = document.querySelectorAll('.js-twitter-link');
  twLinks.forEach(link => { link.href = TWITTER_URL; link.target = '_blank'; });

  // Story copy
  const laalMeaningEl = document.getElementById('story-laal-meaning');
  if (laalMeaningEl) laalMeaningEl.textContent = STORY.laal_meaning;

  const matkaMeaningEl = document.getElementById('story-matka-meaning');
  if (matkaMeaningEl) matkaMeaningEl.textContent = STORY.matka_meaning;

  const combinedEl = document.getElementById('story-combined-text');
  if (combinedEl) combinedEl.textContent = STORY.combined;

  // Hours table
  const hoursTable = document.getElementById('hours-table');
  if (hoursTable) {
    hoursTable.innerHTML = Object.entries(HOURS).map(([days, time]) => `
      <span class="hours-day">${days}</span>
      <span class="hours-time">${time}</span>
    `).join('');
  }

  // Address, phone, email text
  const addressEl = document.getElementById('visit-address');
  if (addressEl) addressEl.textContent = ADDRESS;

  const phoneEl = document.getElementById('visit-phone');
  if (phoneEl) {
    phoneEl.textContent = PHONE;
    phoneEl.href = `tel:${PHONE.replace(/\s+/g, '')}`;
  }

  const emailEl = document.getElementById('visit-email');
  if (emailEl) {
    emailEl.textContent = EMAIL;
    emailEl.href = `mailto:${EMAIL}`;
  }

  // Map Iframe src
  const mapIframe = document.getElementById('map-iframe');
  if (mapIframe && MAP_EMBED_URL) {
    mapIframe.src = MAP_EMBED_URL;
  }

  // Closing Namaste Mascot default image from ASSETS
  if (ASSETS.closingCharacter?.path) {
    const closingEl = document.querySelector('.closing-character-inner[data-slot="closing-character"]');
    if (closingEl && !closingEl.classList.contains('has-custom-image')) {
      const svg = closingEl.querySelector('svg');
      if (svg) svg.style.display = 'none';
      let img = closingEl.querySelector('.custom-closing-img');
      if (!img) {
        img = document.createElement('img');
        img.className = 'custom-closing-img';
        img.style.cssText = 'max-width: 320px; height: 440px; object-fit: contain; display: block; margin: 0 auto; filter: drop-shadow(0 15px 30px rgba(0,0,0,0.6)); border-radius: 16px;';
        closingEl.appendChild(img);
      }
      img.src = ASSETS.closingCharacter.path;
      img.alt = ASSETS.closingCharacter.alt || 'Closing Character';
    }
  }
}

/**
 * Handles the 5-stage Art-to-Table interactive track & pagination
 */
function initArtToTable() {
  const track = document.getElementById('att-track');
  const dotsContainer = document.getElementById('att-dots');
  const prevBtn = document.getElementById('att-prev');
  const nextBtn = document.getElementById('att-next');

  if (!track || !dotsContainer) return;

  const stages = ART_TO_TABLE.stages;
  const assetItems = ASSETS.artToTable || [];

  // Render stage cards
  track.innerHTML = stages.map((st, i) => {
    const asset = assetItems[i];
    const slotKey = `att-${st.stage.toLowerCase()}`;
    const imgMarkup = asset?.path
      ? `<img src="${asset.path}" alt="${st.stage}" data-slot="${slotKey}" loading="lazy">`
      : `<div class="img-placeholder" data-slot="${slotKey}">
           <span class="slot-label">${asset?.label || `STAGE ${i + 1}: ${st.stage} — 800×600px`}</span>
         </div>`;

    return `
      <article class="att-stage" data-index="${i}">
        <div class="att-stage-img" data-slot="${slotKey}">
          <div class="att-stage-label">
            <span class="att-stage-number">0${i + 1} / 0${stages.length}</span>
            <h3 class="att-stage-name">
              ${st.stage}
            </h3>
          </div>
          ${imgMarkup}
        </div>
        <div class="att-stage-text">
          <p>${st.copy}</p>
        </div>
      </article>
    `;
  }).join('');

  // Render navigation dots
  dotsContainer.innerHTML = stages.map((_, i) => `
    <button class="att-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to stage ${i + 1}"></button>
  `).join('');

  let currentStage = 0;
  const totalStages = stages.length;

  function updateTrack() {
    // Only apply horizontal translate on desktop viewports
    if (window.innerWidth > 768) {
      const stageEl = track.children[currentStage];
      if (stageEl) {
        const offset = stageEl.offsetLeft;
        track.style.transform = `translateX(-${offset}px)`;
      }
    } else {
      track.style.transform = 'none';
    }

    dotsContainer.querySelectorAll('.att-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentStage);
    });
  }

  prevBtn?.addEventListener('click', () => {
    currentStage = (currentStage - 1 + totalStages) % totalStages;
    updateTrack();
  });

  nextBtn?.addEventListener('click', () => {
    currentStage = (currentStage + 1) % totalStages;
    updateTrack();
  });

  dotsContainer.addEventListener('click', (e) => {
    const dot = e.target.closest('.att-dot');
    if (!dot) return;
    currentStage = parseInt(dot.dataset.index, 10);
    updateTrack();
  });

  window.addEventListener('resize', updateTrack, { passive: true });
}

/**
 * Scroll reveal observer for .reveal elements
 */
function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  reveals.forEach(el => revealObserver.observe(el));
}
