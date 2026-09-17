import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * 5 Real Menu Categories & Signature Dishes from Laal Matka
 */
export const DEFAULT_MENU_PAGES = [
  {
    id: 'starters',
    stageNumber: '01',
    category: 'Chaat & Starters',
    hindiTag: 'शुरुआत',
    subtitle: 'Crisp, spicy street-side heritage',
    colorAccent: 'hsl(38, 95%, 52%)',
    items: [
      { name: 'Pyaaz Kachori', price: '₹120', veg: true, desc: 'Flaky fried pastry stuffed with spiced onion — quintessential Jaipur.' },
      { name: 'Mirchi Bada', price: '₹100', veg: true, desc: 'Large Jodhpur green chilli dipped in gram-flour batter.' },
      { name: 'Raj Kachori', price: '₹160', veg: true, desc: 'Crisp bowl loaded with chilled yoghurt, sprouts, tamarind & sev.' },
    ]
  },
  {
    id: 'specials',
    stageNumber: '02',
    category: 'Rajasthani Specials',
    hindiTag: 'शाही स्वाद',
    subtitle: 'Authentic flavours from the land of kings',
    colorAccent: 'hsl(6, 92%, 64%)',
    items: [
      { name: 'Dal Baati Churma', price: '₹320', veg: true, desc: 'Slow-baked wheat baati with spiced panchmel dal and churma.' },
      { name: 'Laal Maas', price: '₹490', veg: false, desc: 'Slow-cooked mutton in fiery Mathania red chilli gravy.' },
      { name: 'Ker Sangri', price: '₹280', veg: true, desc: 'Wild desert berries and beans tossed with sun-dried spices.' },
    ]
  },
  {
    id: 'mains',
    stageNumber: '03',
    category: 'Main Course & Tandoor',
    hindiTag: 'मुख्य भोजन',
    subtitle: 'Slow-simmered over woodfire hearths',
    colorAccent: 'hsl(24, 92%, 48%)',
    items: [
      { name: 'Paneer Laal Maas', price: '₹320', veg: true, desc: 'Cottage cheese in rich Mathania red gravy.' },
      { name: 'Murgh Jodhpuri', price: '₹420', veg: false, desc: 'Chicken with whole roasted spices and dried mango.' },
      { name: 'Bajra Khichdi & Missi Roti', price: '₹200', veg: true, desc: 'Pearl millet with pure desi ghee & gram-flour flatbread.' },
    ]
  },
  {
    id: 'chai',
    stageNumber: '04',
    category: 'Matka Chai & Drinks',
    hindiTag: 'कुल्हड़ चाय',
    subtitle: 'Brewed slow in baked desert earth',
    colorAccent: 'hsl(175, 80%, 42%)',
    items: [
      { name: 'Signature Laal Matka Chai', price: '₹80', veg: true, desc: 'Simmered in clay with green cardamom, saffron & cloves.' },
      { name: 'Kashmiri Kahwa', price: '₹120', veg: true, desc: 'Green tea steeped with saffron strands and crushed almonds.' },
      { name: 'Rose Shikanji / Thandai', price: '₹110', veg: true, desc: 'Chilled milk with crushed fennel, rose petals & dry fruits.' },
    ]
  },
  {
    id: 'desserts',
    stageNumber: '05',
    category: 'Desserts & Sweets',
    hindiTag: 'मिष्ठान',
    subtitle: 'Sweet endings from royal palaces',
    colorAccent: 'hsl(42, 96%, 54%)',
    items: [
      { name: 'Jaipuri Ghevar', price: '₹180', veg: true, desc: 'Honeycomb sweet soaked in saffron syrup, topped with rabri.' },
      { name: 'Warm Malpua with Rabri', price: '₹160', veg: true, desc: 'Crispy-edged pancakes bathed in cardamom syrup.' },
      { name: 'Matka Kulfi', price: '₹140', veg: true, desc: 'Slow-frozen pistachio & saffron kulfi in miniature clay pot.' },
    ]
  }
];

/**
 * MatkaMenuReveal Component
 * State Machine: 'idle' -> 'clicked' -> 'steaming' -> 'revealing' -> 'settled'
 */
export default function MatkaMenuReveal({
  menuPages = DEFAULT_MENU_PAGES,
  onStateChange,
  className = ''
}) {
  const [state, setState] = useState('idle'); // 'idle' | 'clicked' | 'steaming' | 'revealing' | 'settled'
  const [activePageIndex, setActivePageIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const prefersReducedMotion = useReducedMotion();
  const timeoutsRef = useRef([]);

  // Track window resize for responsive layout calculations
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 640;
  const isTablet = windowWidth > 640 && windowWidth <= 1024;

  // Clear timers on unmount
  const clearAllTimers = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  // Notify parent of state changes
  useEffect(() => {
    if (onStateChange) onStateChange(state);
  }, [state, onStateChange]);

  /**
   * State Machine Driver (Driven purely by elapsed time & state transitions)
   */
  const handleMatkaClick = () => {
    if (state !== 'idle') return;

    clearAllTimers();

    // Respect reduced motion: skip staggered choreography, go directly to settled
    if (prefersReducedMotion) {
      setState('settled');
      return;
    }

    // Step 1: Immediately transition to 'clicked' for tactile compress
    setState('clicked');

    // Step 2: Transition to 'steaming' (starts at ~160ms)
    const tSteam = setTimeout(() => {
      setState('steaming');
    }, 160);
    timeoutsRef.current.push(tSteam);

    // Step 3: Transition to 'revealing' (Page 1 emerges at ~500ms, or ~320ms on mobile)
    const revealDelay = isMobile ? 320 : 500;
    const tReveal = setTimeout(() => {
      setState('revealing');
    }, revealDelay);
    timeoutsRef.current.push(tReveal);

    // Step 4: Settle state after all 5 pages have entered (~2250ms desktop, ~1400ms mobile)
    const settleDelay = isMobile ? 1450 : 2300;
    const tSettle = setTimeout(() => {
      setState('settled');
    }, settleDelay);
    timeoutsRef.current.push(tSettle);
  };

  // Reset or Replay the animation
  const handleReset = (e) => {
    e?.stopPropagation();
    clearAllTimers();
    setActivePageIndex(null);
    setState('idle');
  };

  /**
   * Layout coordinates for each page in 'settled' / 'revealing' state
   */
  const getPageTargetPosition = (index, total) => {
    if (isMobile) {
      // Mobile: Vertical stack sequence
      return {
        x: 0,
        y: index * 110 - 160,
        rotate: (index % 2 === 0 ? 1 : -1) * 1.5,
        scale: 1,
        zIndex: 10 + index
      };
    }

    if (isTablet) {
      // Tablet: Moderate arc spread
      const angleStep = 18;
      const startAngle = -((total - 1) * angleStep) / 2;
      const angle = startAngle + index * angleStep;
      const rad = (angle * Math.PI) / 180;
      const radius = 260;

      return {
        x: Math.sin(rad) * radius,
        y: -Math.cos(rad) * radius + 110,
        rotate: angle * 0.7,
        scale: 0.94,
        zIndex: 10 + index
      };
    }

    // Desktop: Fan / Arc Arrangement around the matka
    const angleStep = 22;
    const startAngle = -((total - 1) * angleStep) / 2;
    const angle = startAngle + index * angleStep;
    const rad = (angle * Math.PI) / 180;
    const radius = 340;

    return {
      x: Math.sin(rad) * radius,
      y: -Math.cos(rad) * radius + 130,
      rotate: angle * 0.75,
      scale: 1,
      zIndex: 10 + index
    };
  };

  // Stagger delays per page (ms converted to seconds for Framer Motion)
  const getStaggerDelay = (index) => {
    if (prefersReducedMotion) return 0;
    if (isMobile) {
      // ~60% of desktop timing for mobile
      return (index * 0.18);
    }
    // Desktop bands: Page 1 (0.5s), Page 2 (0.8s), Page 3 (1.1s), Page 4 (1.4s), Page 5 (1.7s)
    return 0.5 + index * 0.3;
  };

  return (
    <section
      className={`matka-menu-reveal-container ${className}`}
      aria-label="Interactive Matka Menu Reveal"
    >
      {/* Header Info / Status Indicator */}
      <div className="mmr-header-bar">
        <div className="mmr-state-pill">
          <span className={`mmr-dot ${state}`} />
          <span className="mmr-state-text">
            {state === 'idle' && 'Click Matka to Reveal Menu'}
            {state === 'clicked' && 'Awakening Hearth...'}
            {state === 'steaming' && 'Brewing Aromas & Steam...'}
            {state === 'revealing' && 'Emerging Menu Pages...'}
            {state === 'settled' && 'Menu Ready • Select a Course'}
          </span>
        </div>

        {state === 'settled' && (
          <button
            onClick={handleReset}
            className="mmr-replay-btn"
            title="Replay Matka Menu Reveal Animation"
            aria-label="Replay animation"
          >
            ↺ Replay Reveal
          </button>
        )}
      </div>

      {/* Main Interactive Stage */}
      <div className="mmr-stage">
        {/* Steam Wisps (starts at 'steaming', persists continuously) */}
        {(state === 'steaming' || state === 'revealing' || state === 'settled') && !prefersReducedMotion && (
          <div className="mmr-steam-container" aria-hidden="true">
            {/* Wisp 1 */}
            <motion.div
              className="mmr-steam-wisp wisp-1"
              initial={{ y: 0, x: -10, scale: 0.7, opacity: 0 }}
              animate={{
                y: [-10, -80, -140],
                x: [-10, 16, -14, 8],
                scale: [0.7, 1.3, 1.8],
                opacity: state === 'settled' ? [0, 0.28, 0] : [0, 0.55, 0]
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: [0.4, 0.0, 0.2, 1],
                times: [0, 0.45, 1],
                delay: 0
              }}
            />

            {/* Wisp 2 */}
            <motion.div
              className="mmr-steam-wisp wisp-2"
              initial={{ y: 0, x: 10, scale: 0.8, opacity: 0 }}
              animate={{
                y: [-5, -95, -150],
                x: [10, -18, 12, -8],
                scale: [0.8, 1.4, 1.9],
                opacity: state === 'settled' ? [0, 0.25, 0] : [0, 0.5, 0]
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: [0.4, 0.0, 0.2, 1],
                times: [0, 0.5, 1],
                delay: 0.8
              }}
            />

            {/* Wisp 3 (Desktop & Tablet) */}
            {!isMobile && (
              <motion.div
                className="mmr-steam-wisp wisp-3"
                initial={{ y: 0, x: 0, scale: 0.6, opacity: 0 }}
                animate={{
                  y: [-15, -75, -135],
                  x: [0, 12, -15, 6],
                  scale: [0.6, 1.25, 1.7],
                  opacity: state === 'settled' ? [0, 0.22, 0] : [0, 0.45, 0]
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: [0.4, 0.0, 0.2, 1],
                  times: [0, 0.4, 1],
                  delay: 1.4
                }}
              />
            )}

            {/* Wisp 4 (Desktop only) */}
            {!isMobile && !isTablet && (
              <motion.div
                className="mmr-steam-wisp wisp-4"
                initial={{ y: 0, x: -5, scale: 0.75, opacity: 0 }}
                animate={{
                  y: [-10, -90, -160],
                  x: [-5, -14, 18, -10],
                  scale: [0.75, 1.35, 2.0],
                  opacity: state === 'settled' ? [0, 0.2, 0] : [0, 0.4, 0]
                }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: [0.4, 0.0, 0.2, 1],
                  times: [0, 0.55, 1],
                  delay: 2.0
                }}
              />
            )}
          </div>
        )}

        {/* 5 Menu Pages (Emerging from Matka mouth) */}
        <div className="mmr-pages-wrapper" role="region" aria-label="Dishes Menu">
          <AnimatePresence>
            {(state === 'revealing' || state === 'settled') &&
              menuPages.map((page, index) => {
                const targetPos = getPageTargetPosition(index, menuPages.length);
                const delay = getStaggerDelay(index);
                const isSelected = activePageIndex === index;

                return (
                  <motion.article
                    key={page.id}
                    className={`mmr-menu-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setActivePageIndex(isSelected ? null : index)}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 0, scale: 1, x: targetPos.x, y: targetPos.y }
                        : {
                            opacity: 0,
                            scale: 0.3,
                            x: 0,
                            y: 40,
                            rotate: (index % 2 === 0 ? -4 : 4),
                          }
                    }
                    animate={{
                      opacity: 1,
                      scale: isSelected ? targetPos.scale * 1.05 : targetPos.scale,
                      x: targetPos.x,
                      y: isSelected ? targetPos.y - 12 : targetPos.y,
                      rotate: isSelected ? 0 : targetPos.rotate,
                      zIndex: isSelected ? 50 : targetPos.zIndex,
                    }}
                    exit={{ opacity: 0, scale: 0.5, y: 30 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.35 }
                        : {
                            type: 'spring',
                            stiffness: 110,
                            damping: 18,
                            mass: 0.8,
                            delay: delay,
                          }
                    }
                    whileHover={
                      state === 'settled' && !prefersReducedMotion
                        ? { scale: targetPos.scale * 1.04, zIndex: 40, transition: { duration: 0.2 } }
                        : {}
                    }
                    tabIndex={0}
                    role="button"
                    aria-label={`Menu section: ${page.category}`}
                  >
                    {/* Card Header */}
                    <div className="mmr-card-header">
                      <span className="mmr-card-stage">{page.stageNumber}</span>
                      <div className="mmr-card-title-wrap">
                        <span className="mmr-card-hindi">{page.hindiTag}</span>
                        <h4 className="mmr-card-category">{page.category}</h4>
                      </div>
                    </div>

                    <p className="mmr-card-subtitle">{page.subtitle}</p>

                    {/* Dish Items List */}
                    <ul className="mmr-card-items">
                      {page.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="mmr-dish-row">
                          <div className="mmr-dish-info">
                            <span className={`mmr-veg-dot ${item.veg ? 'veg' : 'nonveg'}`} />
                            <span className="mmr-dish-name">{item.name}</span>
                          </div>
                          <span className="mmr-dish-price">{item.price}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Footer cue */}
                    <div className="mmr-card-footer">
                      <span>{isSelected ? 'Tap to minimize' : 'Explore dishes'}</span>
                      <span>✦</span>
                    </div>
                  </motion.article>
                );
              })}
          </AnimatePresence>
        </div>

        {/* Central Matka Illustration (The Origin Anchor) */}
        <motion.div
          className={`mmr-matka-anchor ${state}`}
          onClick={handleMatkaClick}
          onTouchEnd={(e) => {
            // Prevent default to prevent ghost clicks on mobile touch
            if (state === 'idle') {
              e.preventDefault();
              handleMatkaClick();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Clay Matka Pot. Tap to reveal menu."
          // Idle breathing motion (scale 1 -> 1.015 -> 1 over 3s)
          animate={
            state === 'idle'
              ? prefersReducedMotion
                ? {}
                : {
                    scale: [1, 1.018, 1],
                    filter: [
                      'drop-shadow(0 15px 35px rgba(224, 105, 67, 0.25))',
                      'drop-shadow(0 20px 48px rgba(245, 166, 35, 0.42))',
                      'drop-shadow(0 15px 35px rgba(224, 105, 67, 0.25))'
                    ]
                  }
              : state === 'clicked'
              ? {
                  scale: [1, 0.94, 1.02],
                  y: [0, 6, 0],
                  transition: { duration: 0.18, ease: 'easeOut' }
                }
              : {
                  scale: 0.92,
                  opacity: state === 'settled' ? 0.75 : 0.9,
                  transition: { duration: 0.6, ease: 'easeOut' }
                }
          }
          transition={
            state === 'idle'
              ? { duration: 3.0, repeat: Infinity, ease: 'easeInOut' }
              : undefined
          }
          whileHover={
            state === 'idle' && !prefersReducedMotion
              ? { scale: 1.04, transition: { duration: 0.2 } }
              : {}
          }
        >
          {/* Matka Handcrafted SVG */}
          <svg
            viewBox="0 0 500 450"
            className="mmr-matka-svg"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Traditional Clay Matka with Folk Etchings"
          >
            {/* Base Glow */}
            <ellipse cx="250" cy="420" rx="160" ry="25" fill="#C45A38" opacity="0.3" filter="url(#mmr-pot-blur)"/>

            {/* Base Shadow */}
            <ellipse cx="250" cy="405" rx="90" ry="18" fill="#1C1412" opacity="0.4"/>

            {/* Clay Body */}
            <path
              d="M150 140 C80 190 60 320 150 390 C190 415 310 415 350 390 C440 320 420 190 350 140 C325 125 175 125 150 140 Z"
              fill="url(#mmr-clay-grad)"
            />

            {/* Folk Etchings */}
            <path d="M110 240 Q250 280 390 240" stroke="#F5ECD7" strokeWidth="2.5" strokeDasharray="6 6" opacity="0.6"/>
            <path d="M100 270 Q250 315 400 270" stroke="#F5ECD7" strokeWidth="3" strokeDasharray="10 6" opacity="0.7"/>
            <path d="M115 300 Q250 345 385 300" stroke="#F5ECD7" strokeWidth="2" strokeDasharray="4 4" opacity="0.5"/>

            {/* Mandana Triangles */}
            <g opacity="0.7" stroke="#F5ECD7" strokeWidth="1.8" fill="none">
              <polygon points="160,255 170,240 180,255"/>
              <polygon points="190,260 200,245 210,260"/>
              <polygon points="220,265 230,250 240,265"/>
              <polygon points="250,266 260,251 270,266"/>
              <polygon points="280,264 290,249 300,264"/>
              <polygon points="310,259 320,244 330,259"/>
              <polygon points="340,253 350,238 360,253"/>
            </g>

            {/* Pot Neck */}
            <path d="M165 145 C160 115 175 100 190 95 L310 95 C325 100 340 115 335 145 Z" fill="#BF4B28"/>

            {/* Pot Rim & Mouth */}
            <ellipse cx="250" cy="95" rx="65" ry="18" fill="#A83C1C" stroke="#E66A45" strokeWidth="3"/>
            <ellipse cx="250" cy="95" rx="52" ry="12" fill="#2B120B"/>

            {/* Clay Highlights */}
            <path d="M110 220 C85 270 95 350 160 385 C115 340 110 270 135 220 Z" fill="#F38A65" opacity="0.45"/>

            <defs>
              <linearGradient id="mmr-clay-grad" x1="120" y1="130" x2="380" y2="410" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E06943"/>
                <stop offset="35%" stopColor="#C4532D"/>
                <stop offset="75%" stopColor="#9C3A1A"/>
                <stop offset="100%" stopColor="#6B220C"/>
              </linearGradient>
              <filter id="mmr-pot-blur">
                <feGaussianBlur stdDeviation="12"/>
              </filter>
            </defs>
          </svg>

          {/* Idle Tap Cue Badge */}
          {state === 'idle' && (
            <motion.div
              className="mmr-tap-cue"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="cue-icon">👆</span>
              <span className="cue-text">Tap Matka to Open</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
