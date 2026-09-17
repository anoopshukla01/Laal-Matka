/**
 * LAAL MATKA — nav.js
 * Handles: transparent→solid nav transition, mobile hamburger, active section
 */

export function initNav() {
  const nav       = document.getElementById('site-nav');
  const hamburger = document.getElementById('nav-hamburger');
  const body      = document.body;

  if (!nav) return;

  // ── Scroll: transparent → solid ────────────────────────────
  const onScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on init

  // ── Mobile hamburger ────────────────────────────────────────
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      nav.classList.toggle('nav-mobile-open', isOpen);
      body.style.overflow = isOpen ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }

  // Close mobile menu on nav link click
  nav.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      nav.classList.remove('nav-mobile-open');
      body.style.overflow = '';
      hamburger?.setAttribute('aria-expanded', 'false');
    });
  });

  // ── Active section highlighting ─────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = nav.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const isActive = href === `#${id}` || (id === 'matka' && href === '#menu');
            link.classList.toggle('active', isActive);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => sectionObserver.observe(s));
}
