/**
 * LAAL MATKA — character.js
 * Manages the Rajasthani character illustration:
 * - Hero idle breathing animation (CSS-driven)
 * - Section-triggered gesture reactions via IntersectionObserver
 * - Greeting "Khamma Ghani!" reveal
 */

// Map of section IDs → CSS gesture classes applied to the character wrapper
const GESTURES = {
  'menu':       'gesture-point-right',
  'story':      'gesture-bow',
  'experience': 'gesture-open-arms',
  'gallery':    'gesture-look',
  'visit':      'gesture-namaste',
};

export function initCharacter() {
  const character = document.getElementById('hero-character-wrap');
  if (!character) return;

  // ── Gesture observer ─────────────────────────────────────────
  const targets = document.querySelectorAll('section[id]');
  let activeGestureTimeout = null;

  const gestureObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const sectionId = entry.target.id;
        const gesture   = GESTURES[sectionId];

        if (!gesture) return;

        // Clear previous gesture classes
        Object.values(GESTURES).forEach(cls => character.classList.remove(cls));

        // Apply new gesture with a short delay for natural feel
        if (activeGestureTimeout) clearTimeout(activeGestureTimeout);
        activeGestureTimeout = setTimeout(() => {
          character.classList.add(gesture);

          // Remove gesture class after animation completes
          setTimeout(() => {
            character.classList.remove(gesture);
          }, 2000);
        }, 300);
      });
    },
    { threshold: 0.5 }
  );

  targets.forEach(t => gestureObserver.observe(t));

  // ── Hero character reveal ─────────────────────────────────────
  // Character SVG is loaded; ensure idle animation starts after reveal
  const heroCharWrap = document.querySelector('.character-svg-wrap');
  if (heroCharWrap) {
    // Breathing is CSS-driven; just ensure the class is present
    heroCharWrap.classList.add('character-idle');
  }
}

/**
 * Stagger-reveal the hero brand name letters.
 * Called after DOM ready.
 */
export function animateBrandName() {
  const nameEl = document.querySelector('.hero-brand-name');
  if (!nameEl) return;

  // Already split in HTML via data-letters — just trigger visibility
  const letters = nameEl.querySelectorAll('.letter');

  letters.forEach((letter, i) => {
    setTimeout(() => {
      letter.classList.add('visible');
    }, 800 + i * 80); // stagger: 80ms per letter, starting after 800ms
  });
}
