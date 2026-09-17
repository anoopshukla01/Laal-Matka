import { jsx, jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
const DEFAULT_MENU_PAGES = [
  {
    id: "starters",
    stageNumber: "01",
    category: "Chaat & Starters",
    hindiTag: "\u0936\u0941\u0930\u0941\u0906\u0924",
    subtitle: "Crisp, spicy street-side heritage",
    colorAccent: "hsl(38, 95%, 52%)",
    items: [
      { name: "Pyaaz Kachori", price: "\u20B9120", veg: true, desc: "Flaky fried pastry stuffed with spiced onion \u2014 quintessential Jaipur." },
      { name: "Mirchi Bada", price: "\u20B9100", veg: true, desc: "Large Jodhpur green chilli dipped in gram-flour batter." },
      { name: "Raj Kachori", price: "\u20B9160", veg: true, desc: "Crisp bowl loaded with chilled yoghurt, sprouts, tamarind & sev." }
    ]
  },
  {
    id: "specials",
    stageNumber: "02",
    category: "Rajasthani Specials",
    hindiTag: "\u0936\u093E\u0939\u0940 \u0938\u094D\u0935\u093E\u0926",
    subtitle: "Authentic flavours from the land of kings",
    colorAccent: "hsl(6, 92%, 64%)",
    items: [
      { name: "Dal Baati Churma", price: "\u20B9320", veg: true, desc: "Slow-baked wheat baati with spiced panchmel dal and churma." },
      { name: "Laal Maas", price: "\u20B9490", veg: false, desc: "Slow-cooked mutton in fiery Mathania red chilli gravy." },
      { name: "Ker Sangri", price: "\u20B9280", veg: true, desc: "Wild desert berries and beans tossed with sun-dried spices." }
    ]
  },
  {
    id: "mains",
    stageNumber: "03",
    category: "Main Course & Tandoor",
    hindiTag: "\u092E\u0941\u0916\u094D\u092F \u092D\u094B\u091C\u0928",
    subtitle: "Slow-simmered over woodfire hearths",
    colorAccent: "hsl(24, 92%, 48%)",
    items: [
      { name: "Paneer Laal Maas", price: "\u20B9320", veg: true, desc: "Cottage cheese in rich Mathania red gravy." },
      { name: "Murgh Jodhpuri", price: "\u20B9420", veg: false, desc: "Chicken with whole roasted spices and dried mango." },
      { name: "Bajra Khichdi & Missi Roti", price: "\u20B9200", veg: true, desc: "Pearl millet with pure desi ghee & gram-flour flatbread." }
    ]
  },
  {
    id: "chai",
    stageNumber: "04",
    category: "Matka Chai & Drinks",
    hindiTag: "\u0915\u0941\u0932\u094D\u0939\u0921\u093C \u091A\u093E\u092F",
    subtitle: "Brewed slow in baked desert earth",
    colorAccent: "hsl(175, 80%, 42%)",
    items: [
      { name: "Signature Laal Matka Chai", price: "\u20B980", veg: true, desc: "Simmered in clay with green cardamom, saffron & cloves." },
      { name: "Kashmiri Kahwa", price: "\u20B9120", veg: true, desc: "Green tea steeped with saffron strands and crushed almonds." },
      { name: "Rose Shikanji / Thandai", price: "\u20B9110", veg: true, desc: "Chilled milk with crushed fennel, rose petals & dry fruits." }
    ]
  },
  {
    id: "desserts",
    stageNumber: "05",
    category: "Desserts & Sweets",
    hindiTag: "\u092E\u093F\u0937\u094D\u0920\u093E\u0928",
    subtitle: "Sweet endings from royal palaces",
    colorAccent: "hsl(42, 96%, 54%)",
    items: [
      { name: "Jaipuri Ghevar", price: "\u20B9180", veg: true, desc: "Honeycomb sweet soaked in saffron syrup, topped with rabri." },
      { name: "Warm Malpua with Rabri", price: "\u20B9160", veg: true, desc: "Crispy-edged pancakes bathed in cardamom syrup." },
      { name: "Matka Kulfi", price: "\u20B9140", veg: true, desc: "Slow-frozen pistachio & saffron kulfi in miniature clay pot." }
    ]
  }
];
function MatkaMenuReveal({
  menuPages = DEFAULT_MENU_PAGES,
  onStateChange,
  className = ""
}) {
  const [state, setState] = useState("idle");
  const [activePageIndex, setActivePageIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const prefersReducedMotion = useReducedMotion();
  const timeoutsRef = useRef([]);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isMobile = windowWidth <= 640;
  const isTablet = windowWidth > 640 && windowWidth <= 1024;
  const clearAllTimers = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };
  useEffect(() => {
    return () => clearAllTimers();
  }, []);
  useEffect(() => {
    if (onStateChange) onStateChange(state);
  }, [state, onStateChange]);
  const handleMatkaClick = () => {
    if (state !== "idle") return;
    clearAllTimers();
    if (prefersReducedMotion) {
      setState("settled");
      return;
    }
    setState("clicked");
    const tSteam = setTimeout(() => {
      setState("steaming");
    }, 160);
    timeoutsRef.current.push(tSteam);
    const revealDelay = isMobile ? 320 : 500;
    const tReveal = setTimeout(() => {
      setState("revealing");
    }, revealDelay);
    timeoutsRef.current.push(tReveal);
    const settleDelay = isMobile ? 1450 : 2300;
    const tSettle = setTimeout(() => {
      setState("settled");
    }, settleDelay);
    timeoutsRef.current.push(tSettle);
  };
  const handleReset = (e) => {
    e?.stopPropagation();
    clearAllTimers();
    setActivePageIndex(null);
    setState("idle");
  };
  const getPageTargetPosition = (index, total) => {
    if (isMobile) {
      return {
        x: 0,
        y: index * 110 - 160,
        rotate: (index % 2 === 0 ? 1 : -1) * 1.5,
        scale: 1,
        zIndex: 10 + index
      };
    }
    if (isTablet) {
      const angleStep2 = 18;
      const startAngle2 = -((total - 1) * angleStep2) / 2;
      const angle2 = startAngle2 + index * angleStep2;
      const rad2 = angle2 * Math.PI / 180;
      const radius2 = 260;
      return {
        x: Math.sin(rad2) * radius2,
        y: -Math.cos(rad2) * radius2 + 110,
        rotate: angle2 * 0.7,
        scale: 0.94,
        zIndex: 10 + index
      };
    }
    const angleStep = 22;
    const startAngle = -((total - 1) * angleStep) / 2;
    const angle = startAngle + index * angleStep;
    const rad = angle * Math.PI / 180;
    const radius = 340;
    return {
      x: Math.sin(rad) * radius,
      y: -Math.cos(rad) * radius + 130,
      rotate: angle * 0.75,
      scale: 1,
      zIndex: 10 + index
    };
  };
  const getStaggerDelay = (index) => {
    if (prefersReducedMotion) return 0;
    if (isMobile) {
      return index * 0.18;
    }
    return 0.5 + index * 0.3;
  };
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: `matka-menu-reveal-container ${className}`,
      "aria-label": "Interactive Matka Menu Reveal",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "mmr-header-bar", children: [
          /* @__PURE__ */ jsxs("div", { className: "mmr-state-pill", children: [
            /* @__PURE__ */ jsx("span", { className: `mmr-dot ${state}` }),
            /* @__PURE__ */ jsxs("span", { className: "mmr-state-text", children: [
              state === "idle" && "Click Matka to Reveal Menu",
              state === "clicked" && "Awakening Hearth...",
              state === "steaming" && "Brewing Aromas & Steam...",
              state === "revealing" && "Emerging Menu Pages...",
              state === "settled" && "Menu Ready \u2022 Select a Course"
            ] })
          ] }),
          state === "settled" && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleReset,
              className: "mmr-replay-btn",
              title: "Replay Matka Menu Reveal Animation",
              "aria-label": "Replay animation",
              children: "\u21BA Replay Reveal"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mmr-stage", children: [
          (state === "steaming" || state === "revealing" || state === "settled") && !prefersReducedMotion && /* @__PURE__ */ jsxs("div", { className: "mmr-steam-container", "aria-hidden": "true", children: [
            /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "mmr-steam-wisp wisp-1",
                initial: { y: 0, x: -10, scale: 0.7, opacity: 0 },
                animate: {
                  y: [-10, -80, -140],
                  x: [-10, 16, -14, 8],
                  scale: [0.7, 1.3, 1.8],
                  opacity: state === "settled" ? [0, 0.28, 0] : [0, 0.55, 0]
                },
                transition: {
                  duration: 3.2,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.2, 1],
                  times: [0, 0.45, 1],
                  delay: 0
                }
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "mmr-steam-wisp wisp-2",
                initial: { y: 0, x: 10, scale: 0.8, opacity: 0 },
                animate: {
                  y: [-5, -95, -150],
                  x: [10, -18, 12, -8],
                  scale: [0.8, 1.4, 1.9],
                  opacity: state === "settled" ? [0, 0.25, 0] : [0, 0.5, 0]
                },
                transition: {
                  duration: 3.8,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.2, 1],
                  times: [0, 0.5, 1],
                  delay: 0.8
                }
              }
            ),
            !isMobile && /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "mmr-steam-wisp wisp-3",
                initial: { y: 0, x: 0, scale: 0.6, opacity: 0 },
                animate: {
                  y: [-15, -75, -135],
                  x: [0, 12, -15, 6],
                  scale: [0.6, 1.25, 1.7],
                  opacity: state === "settled" ? [0, 0.22, 0] : [0, 0.45, 0]
                },
                transition: {
                  duration: 2.8,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.2, 1],
                  times: [0, 0.4, 1],
                  delay: 1.4
                }
              }
            ),
            !isMobile && !isTablet && /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "mmr-steam-wisp wisp-4",
                initial: { y: 0, x: -5, scale: 0.75, opacity: 0 },
                animate: {
                  y: [-10, -90, -160],
                  x: [-5, -14, 18, -10],
                  scale: [0.75, 1.35, 2],
                  opacity: state === "settled" ? [0, 0.2, 0] : [0, 0.4, 0]
                },
                transition: {
                  duration: 4.2,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.2, 1],
                  times: [0, 0.55, 1],
                  delay: 2
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mmr-pages-wrapper", role: "region", "aria-label": "Dishes Menu", children: /* @__PURE__ */ jsx(AnimatePresence, { children: (state === "revealing" || state === "settled") && menuPages.map((page, index) => {
            const targetPos = getPageTargetPosition(index, menuPages.length);
            const delay = getStaggerDelay(index);
            const isSelected = activePageIndex === index;
            return /* @__PURE__ */ jsxs(
              motion.article,
              {
                className: `mmr-menu-card ${isSelected ? "is-selected" : ""}`,
                onClick: () => setActivePageIndex(isSelected ? null : index),
                initial: prefersReducedMotion ? { opacity: 0, scale: 1, x: targetPos.x, y: targetPos.y } : {
                  opacity: 0,
                  scale: 0.3,
                  x: 0,
                  y: 40,
                  rotate: index % 2 === 0 ? -4 : 4
                },
                animate: {
                  opacity: 1,
                  scale: isSelected ? targetPos.scale * 1.05 : targetPos.scale,
                  x: targetPos.x,
                  y: isSelected ? targetPos.y - 12 : targetPos.y,
                  rotate: isSelected ? 0 : targetPos.rotate,
                  zIndex: isSelected ? 50 : targetPos.zIndex
                },
                exit: { opacity: 0, scale: 0.5, y: 30 },
                transition: prefersReducedMotion ? { duration: 0.35 } : {
                  type: "spring",
                  stiffness: 110,
                  damping: 18,
                  mass: 0.8,
                  delay
                },
                whileHover: state === "settled" && !prefersReducedMotion ? { scale: targetPos.scale * 1.04, zIndex: 40, transition: { duration: 0.2 } } : {},
                tabIndex: 0,
                role: "button",
                "aria-label": `Menu section: ${page.category}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "mmr-card-header", children: [
                    /* @__PURE__ */ jsx("span", { className: "mmr-card-stage", children: page.stageNumber }),
                    /* @__PURE__ */ jsxs("div", { className: "mmr-card-title-wrap", children: [
                      /* @__PURE__ */ jsx("span", { className: "mmr-card-hindi", children: page.hindiTag }),
                      /* @__PURE__ */ jsx("h4", { className: "mmr-card-category", children: page.category })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "mmr-card-subtitle", children: page.subtitle }),
                  /* @__PURE__ */ jsx("ul", { className: "mmr-card-items", children: page.items.map((item, itemIdx) => /* @__PURE__ */ jsxs("li", { className: "mmr-dish-row", children: [
                    /* @__PURE__ */ jsxs("div", { className: "mmr-dish-info", children: [
                      /* @__PURE__ */ jsx("span", { className: `mmr-veg-dot ${item.veg ? "veg" : "nonveg"}` }),
                      /* @__PURE__ */ jsx("span", { className: "mmr-dish-name", children: item.name })
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "mmr-dish-price", children: item.price })
                  ] }, itemIdx)) }),
                  /* @__PURE__ */ jsxs("div", { className: "mmr-card-footer", children: [
                    /* @__PURE__ */ jsx("span", { children: isSelected ? "Tap to minimize" : "Explore dishes" }),
                    /* @__PURE__ */ jsx("span", { children: "\u2726" })
                  ] })
                ]
              },
              page.id
            );
          }) }) }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: `mmr-matka-anchor ${state}`,
              onClick: handleMatkaClick,
              onTouchEnd: (e) => {
                if (state === "idle") {
                  e.preventDefault();
                  handleMatkaClick();
                }
              },
              role: "button",
              tabIndex: 0,
              "aria-label": "Clay Matka Pot. Tap to reveal menu.",
              animate: state === "idle" ? prefersReducedMotion ? {} : {
                scale: [1, 1.018, 1],
                filter: [
                  "drop-shadow(0 15px 35px rgba(224, 105, 67, 0.25))",
                  "drop-shadow(0 20px 48px rgba(245, 166, 35, 0.42))",
                  "drop-shadow(0 15px 35px rgba(224, 105, 67, 0.25))"
                ]
              } : state === "clicked" ? {
                scale: [1, 0.94, 1.02],
                y: [0, 6, 0],
                transition: { duration: 0.18, ease: "easeOut" }
              } : {
                scale: 0.92,
                opacity: state === "settled" ? 0.75 : 0.9,
                transition: { duration: 0.6, ease: "easeOut" }
              },
              transition: state === "idle" ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : void 0,
              whileHover: state === "idle" && !prefersReducedMotion ? { scale: 1.04, transition: { duration: 0.2 } } : {},
              children: [
                /* @__PURE__ */ jsxs(
                  "svg",
                  {
                    viewBox: "0 0 500 450",
                    className: "mmr-matka-svg",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    role: "img",
                    "aria-label": "Traditional Clay Matka with Folk Etchings",
                    children: [
                      /* @__PURE__ */ jsx("ellipse", { cx: "250", cy: "420", rx: "160", ry: "25", fill: "#C45A38", opacity: "0.3", filter: "url(#mmr-pot-blur)" }),
                      /* @__PURE__ */ jsx("ellipse", { cx: "250", cy: "405", rx: "90", ry: "18", fill: "#1C1412", opacity: "0.4" }),
                      /* @__PURE__ */ jsx(
                        "path",
                        {
                          d: "M150 140 C80 190 60 320 150 390 C190 415 310 415 350 390 C440 320 420 190 350 140 C325 125 175 125 150 140 Z",
                          fill: "url(#mmr-clay-grad)"
                        }
                      ),
                      /* @__PURE__ */ jsx("path", { d: "M110 240 Q250 280 390 240", stroke: "#F5ECD7", strokeWidth: "2.5", strokeDasharray: "6 6", opacity: "0.6" }),
                      /* @__PURE__ */ jsx("path", { d: "M100 270 Q250 315 400 270", stroke: "#F5ECD7", strokeWidth: "3", strokeDasharray: "10 6", opacity: "0.7" }),
                      /* @__PURE__ */ jsx("path", { d: "M115 300 Q250 345 385 300", stroke: "#F5ECD7", strokeWidth: "2", strokeDasharray: "4 4", opacity: "0.5" }),
                      /* @__PURE__ */ jsxs("g", { opacity: "0.7", stroke: "#F5ECD7", strokeWidth: "1.8", fill: "none", children: [
                        /* @__PURE__ */ jsx("polygon", { points: "160,255 170,240 180,255" }),
                        /* @__PURE__ */ jsx("polygon", { points: "190,260 200,245 210,260" }),
                        /* @__PURE__ */ jsx("polygon", { points: "220,265 230,250 240,265" }),
                        /* @__PURE__ */ jsx("polygon", { points: "250,266 260,251 270,266" }),
                        /* @__PURE__ */ jsx("polygon", { points: "280,264 290,249 300,264" }),
                        /* @__PURE__ */ jsx("polygon", { points: "310,259 320,244 330,259" }),
                        /* @__PURE__ */ jsx("polygon", { points: "340,253 350,238 360,253" })
                      ] }),
                      /* @__PURE__ */ jsx("path", { d: "M165 145 C160 115 175 100 190 95 L310 95 C325 100 340 115 335 145 Z", fill: "#BF4B28" }),
                      /* @__PURE__ */ jsx("ellipse", { cx: "250", cy: "95", rx: "65", ry: "18", fill: "#A83C1C", stroke: "#E66A45", strokeWidth: "3" }),
                      /* @__PURE__ */ jsx("ellipse", { cx: "250", cy: "95", rx: "52", ry: "12", fill: "#2B120B" }),
                      /* @__PURE__ */ jsx("path", { d: "M110 220 C85 270 95 350 160 385 C115 340 110 270 135 220 Z", fill: "#F38A65", opacity: "0.45" }),
                      /* @__PURE__ */ jsxs("defs", { children: [
                        /* @__PURE__ */ jsxs("linearGradient", { id: "mmr-clay-grad", x1: "120", y1: "130", x2: "380", y2: "410", gradientUnits: "userSpaceOnUse", children: [
                          /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#E06943" }),
                          /* @__PURE__ */ jsx("stop", { offset: "35%", stopColor: "#C4532D" }),
                          /* @__PURE__ */ jsx("stop", { offset: "75%", stopColor: "#9C3A1A" }),
                          /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#6B220C" })
                        ] }),
                        /* @__PURE__ */ jsx("filter", { id: "mmr-pot-blur", children: /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "12" }) })
                      ] })
                    ]
                  }
                ),
                state === "idle" && /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    className: "mmr-tap-cue",
                    animate: { y: [0, -6, 0] },
                    transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "cue-icon", children: "\u{1F446}" }),
                      /* @__PURE__ */ jsx("span", { className: "cue-text", children: "Tap Matka to Open" })
                    ]
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  DEFAULT_MENU_PAGES,
  MatkaMenuReveal as default
};
