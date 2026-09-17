/**
 * LAAL MATKA — matka-menu-reveal.js
 * Ultra-lightweight, zero-dependency "Matka → Menu Reveal" state machine.
 * Optimized for instant responsiveness and low-end mobile phones.
 */

export function initMatkaMenuReveal() {
  const widget = document.getElementById('matka-reveal-widget');
  if (!widget) return;

  const matkaTrigger = document.getElementById('mrw-matka-trigger');
  const statusLabel = document.getElementById('mrw-status-label');
  const replayBtn = document.getElementById('mrw-replay-btn');
  const cards = widget.querySelectorAll('.mrw-card');

  let state = 'idle'; // 'idle' | 'clicked' | 'steaming' | 'revealing' | 'settled'
  let timerIds = [];

  // 1. Lightweight Capability Check for Low-End Hardware
  const isLowEnd =
    (typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
    (typeof navigator !== 'undefined' && navigator.deviceMemory && navigator.deviceMemory <= 4) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isLowEnd) {
    widget.classList.add('mode-low-end');
  }

  function clearAllTimers() {
    timerIds.forEach(clearTimeout);
    timerIds = [];
  }

  function setState(newState) {
    state = newState;
    widget.setAttribute('data-state', newState);

    if (statusLabel) {
      switch (newState) {
        case 'idle':
          statusLabel.textContent = 'Tap Matka to Reveal Menu';
          break;
        case 'clicked':
          statusLabel.textContent = 'Awakening Hearth...';
          break;
        case 'steaming':
          statusLabel.textContent = 'Brewing Aromas & Steam...';
          break;
        case 'revealing':
          statusLabel.textContent = 'Emerging Menu Pages...';
          break;
        case 'settled':
          statusLabel.textContent = 'Menu Ready • Select a Course';
          break;
      }
    }
  }

  /**
   * Synchronous Frame-1 Click / Touch Handler
   */
  function handleTrigger(e) {
    if (state !== 'idle') return;
    e?.preventDefault();
    e?.stopPropagation();

    clearAllTimers();

    // Instant Synchronous Visual Feedback (No Artificial Delay)
    setState('clicked');
    widget.classList.add('is-clicked');

    // If reduced motion is requested, immediately transition to settled
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      widget.classList.add('is-revealed');
      setState('settled');
      return;
    }

    // Step 2: Start Steam at ~120ms
    const tSteam = setTimeout(() => {
      setState('steaming');
      widget.classList.add('is-steaming');
    }, 120);
    timerIds.push(tSteam);

    // Step 3: Trigger Page Emergence at ~280ms
    const tReveal = setTimeout(() => {
      setState('revealing');
      widget.classList.add('is-revealed');
    }, 280);
    timerIds.push(tReveal);

    // Step 4: Settle State at ~1100ms (Capped Sequence Length)
    const tSettle = setTimeout(() => {
      setState('settled');
    }, 1100);
    timerIds.push(tSettle);
  }

  // Bind both click and touchend for instant touch reaction
  matkaTrigger?.addEventListener('click', handleTrigger);
  matkaTrigger?.addEventListener('touchend', handleTrigger, { passive: false });

  // Replay / Reset action
  replayBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    clearAllTimers();
    widget.classList.remove('is-clicked', 'is-steaming', 'is-revealed');
    cards.forEach(c => c.classList.remove('is-active'));
    setState('idle');
  });

  // Card interactive selection in settled state
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (state !== 'settled') return;
      e.stopPropagation();
      const isActive = card.classList.contains('is-active');
      cards.forEach(c => c.classList.remove('is-active'));
      if (!isActive) card.classList.add('is-active');
    });
  });
}
