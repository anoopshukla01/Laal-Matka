/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║         LAAL MATKA — CONTENT CONFIGURATION                   ║
 * ║  All editable content lives here. Swap text, paths, and      ║
 * ║  contact details WITHOUT touching any HTML/CSS/layout code.  ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

// ─────────────────────────────────────────────
// CAFÉ IDENTITY
// ─────────────────────────────────────────────
export const CAFE_NAME = "LAAL MATKA";
export const CAFE_SUBTITLE = "RESTAURANT • GORAKHPUR";
export const TAGLINE = "VEG & NON-VEG DELIGHTS. SERVED WITH SOUL.";
export const GREETING = "Khamma Ghani!";
export const CLOSING_LINE = "PADHARO MHARE GHAR.";

// ─────────────────────────────────────────────
// CONTACT & LOCATION
// ─────────────────────────────────────────────
export const ADDRESS = "Rail Vihar Colony Phase 3rd, Taramandal, Gorakhpur, Uttar Pradesh 273017";
export const PHONE = "+91 98765 43210";
export const EMAIL = "hello@laalmatka.in";
export const WHATSAPP_URL = "https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20reserve%20a%20table%20at%20Laal%20Matka%20Gorakhpur";
export const RESERVATION_ACTION = "https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20reserve%20a%20table%20at%20Laal%20Matka%20Gorakhpur";
export const DIRECTIONS_URL = "https://maps.google.com/?q=Laal+Matka+Restaurant+Taramandal+Gorakhpur";

export const MAP_EMBED_URL = "https://maps.google.com/maps?q=Laal+Matka+Restaurant+Rail+Vihar+Colony+Taramandal+Gorakhpur+273017&t=&z=15&ie=UTF8&iwloc=&output=embed";

// ─────────────────────────────────────────────
// SOCIAL LINKS
// ─────────────────────────────────────────────
export const INSTAGRAM_URL = "https://instagram.com/laal.matka";
export const FACEBOOK_URL = "https://facebook.com/laalmatka";
export const TWITTER_URL = "https://twitter.com/laalmatka";

// ─────────────────────────────────────────────
// OPENING HOURS
// ─────────────────────────────────────────────
export const HOURS = {
  "Monday – Sunday": "11:00 AM – 11:00 PM",
};

// ─────────────────────────────────────────────
// ASSETS — Image Paths + Dimensions
// ─────────────────────────────────────────────
export const ASSETS = {
  logo: {
    path: null,
    label: "LOGO — SVG preferred, min 200×60px. Or PNG with transparent BG.",
    alt: "Laal Matka logo",
  },
  heroCharacter: {
    path: null,
    label: "HERO CHARACTER ILLUSTRATION — 600×900px PNG (transparent BG). Rajasthani man, pagdi, moustache.",
    alt: "Rajasthani character — Laal Matka mascot",
    w: 600, h: 900,
  },
  matkaIllustration: {
    path: null,
    label: "MATKA CLAY POT ILLUSTRATION — 800×1000px PNG (transparent BG). Warm lighting, soft shadow.",
    alt: "Traditional clay matka pot",
    w: 800, h: 1000,
  },
  closingCharacter: {
    path: "images/closing-character.jpg",
    label: "CLOSING CHARACTER — 600×900px PNG. Same character, hands folded in Namaste/greeting pose.",
    alt: "Rajasthani character with folded hands",
    w: 600, h: 900,
  },
  artToTable: [
    { stage: "ART", path: "images/real-att-art.jpg", label: "ART STAGE — Miniature Painting & Heritage Wall Art", w: 800, h: 600 },
    { stage: "CRAFT", path: "images/real-att-craft.jpg", label: "CRAFT STAGE — Master Potter Shaping Earthen Clay", w: 800, h: 600 },
    { stage: "FIRE", path: "images/real-att-fire.jpg", label: "FIRE STAGE — Slow Kiln Baking & Woodfire Tandoor", w: 800, h: 600 },
    { stage: "FLAVOUR", path: "images/real-att-flavour.jpg", label: "FLAVOUR STAGE — Stone-Ground Mathania Chillies & Spices", w: 800, h: 600 },
    { stage: "TABLE", path: "images/real-att-table.jpg", label: "TABLE STAGE — Feast Plated on Royal Dining Table", w: 800, h: 600 },
  ],
  experience: [
    { slot: "experience-1", path: "images/real-experience-1.jpg", label: "CAFÉ EXTERIOR — 800×600px", w: 800, h: 600 },
    { slot: "experience-2", path: "images/real-experience-2.jpg", label: "CAFÉ INTERIOR — 800×600px", w: 800, h: 600 },
    { slot: "experience-3", path: "images/real-experience-3.jpg", label: "SEATING AREA — 800×600px", w: 800, h: 600 },
    { slot: "experience-4", path: "images/real-experience-4.jpg", label: "SIGNATURE FOOD — 800×600px", w: 800, h: 600 },
    { slot: "experience-5", path: "images/real-experience-5.jpg", label: "DRINKS / CHAI — 800×600px", w: 800, h: 600 },
    { slot: "experience-6", path: "images/real-experience-6.jpg", label: "PEOPLE / AMBIENCE — 800×600px", w: 800, h: 600 },
  ],
  gallery: [
    { slot: "gallery-1", path: "images/real-gallery-1.jpg", label: "Folk Art Detail — Miniature Painting Mural", w: 800, h: 1000 },
    { slot: "gallery-2", path: "images/real-gallery-2.jpg", label: "Courtyard Dining & Haveli Architecture", w: 1200, h: 800 },
    { slot: "gallery-3", path: "images/real-gallery-3.jpg", label: "Master Potter Shaping Desert Matka", w: 600, h: 600 },
    { slot: "gallery-4", path: "images/real-gallery-4.jpg", label: "Dal Baati Churma Royal Feast", w: 800, h: 1000 },
    { slot: "gallery-5", path: "images/real-experience-5.jpg", label: "Signature Saffron Matka Chai Poured in Kulhad", w: 1200, h: 800 },
    { slot: "gallery-6", path: "images/real-gallery-6.jpg", label: "Loaded Shahi Raj Kachori", w: 600, h: 600 },
    { slot: "gallery-7", path: "images/real-gallery-7.jpg", label: "Woodfire Kiln & Clay Baking", w: 800, h: 1000 },
    { slot: "gallery-8", path: "images/real-gallery-8.jpg", label: "Simmering Mathania Laal Maas", w: 1200, h: 800 },
    { slot: "gallery-9", path: "images/real-gallery-9.jpg", label: "Royal Ghevar with Rabri & Rose Petals", w: 600, h: 600 },
  ],
  dishes: {
    0: {
      0: { path: "images/dal-baati.jpg", label: "Dal Baati Churma" },
      1: { path: "images/laal-maas.jpg", label: "Laal Maas" },
      2: { path: "images/gatte-ki-sabzi.jpg", label: "Gatte ki Sabzi" },
      3: { path: "images/ker-sangri.jpg", label: "Ker Sangri" },
      4: { path: "images/laal-maas.jpg", label: "Safed Maas" }
    },
    1: {
      0: { path: "images/matka-chai.jpg", label: "Laal Matka Chai" },
      1: { path: "images/crop_matka-chai.jpg", label: "Kashmiri Kahwa" },
      2: { path: "images/crop_matka-chai.jpg", label: "Rose Shikanji" }
    },
    2: {
      0: { path: "images/artisan-coffee.jpg", label: "Single-Origin Filter Coffee" },
      1: { path: "images/crop_artisan-coffee.jpg", label: "Cardamom Latte" },
      2: { path: "images/artisan-coffee.jpg", label: "Cold Brew" }
    },
    3: {
      0: { path: "images/raj-kachori.jpg", label: "Loaded Shahi Raj Kachori" },
      1: { path: "images/pyaaz-kachori.jpg", label: "Jodhpuri Pyaaz Kachori" },
      2: { path: "images/raj-kachori.jpg", label: "Mirchi Vada" }
    },
    4: {
      0: { path: "images/laal-maas.jpg", label: "Laal Maas" },
      1: { path: "images/crop_laal-maas.jpg", label: "Mohan Maas" },
      2: { path: "images/laal-maas.jpg", label: "Junglee Maas" },
      3: { path: "images/crop_laal-maas.jpg", label: "Paneer Butter Masala" },
      4: { path: "images/crop_dal-baati.jpg", label: "Missi Roti" }
    },
    5: {
      0: { path: "images/royal-dessert.jpg", label: "Ghevar" },
      1: { path: "images/crop_royal-dessert.jpg", label: "Malpua" },
      2: { path: "images/royal-dessert.jpg", label: "Matka Kulfi" }
    }
  }
};

// ─────────────────────────────────────────────
// MENU DATA
// ─────────────────────────────────────────────
export const MENU_CATEGORIES = [
  {
    name: "Veg Starters",
    desc: "Crisp pakauras, tender tikkas & clay-fired kebabs",
    items: [
      { name: "Hara Bhara Kabab", desc: "Spinach, green peas & fresh herbs shallow-fried with subtle spices.", price: "Half ₹179 (4pc) • Full ₹299 (8pc)", veg: true, tags: ["4pc / 8pc", "Spinach", "Tandoor"] },
      { name: "Veg Mix Pakauda", desc: "Crispy seasonal vegetable fritters spiced with ajwain and chaat masala.", price: "₹159", veg: true, tags: ["Crispy", "Street Classic", "Ajwain"] },
      { name: "Paneer Pakauda", desc: "Golden spiced batter-fried cottage cheese slabs served with mint chutney.", price: "₹229", veg: true, tags: ["Fresh Paneer", "Crispy", "Golden"] },
      { name: "Onion Pakauda", desc: "Thin-sliced crispy golden onion fritters with roasted coriander & green chilli.", price: "₹149", veg: true, tags: ["Crunchy", "Onion", "Tea-Time Classic"] },
      { name: "Mushroom Kabab", desc: "Char-roasted whole button mushrooms marinated in aromatic tandoori masala.", price: "Half ₹149 (4pc) • Full ₹249 (8pc)", veg: true, tags: ["4pc / 8pc", "Button Mushroom", "Clay Oven"] },
      { name: "Dahi Kabab", desc: "Silky melt-in-mouth hung yoghurt patties with a crisp golden exterior.", price: "Half ₹199 (4pc) • Full ₹329 (8pc)", veg: true, tags: ["4pc / 8pc", "Hung Curd", "Chef Special"] },
      { name: "Paneer Tikka", desc: "Charcoal oven grilled paneer cubes marinated in mustard oil & Kashmiri chilli.", price: "Half ₹209 (4pc) • Full ₹349 (8pc)", veg: true, tags: ["4pc / 8pc", "Tandoor Grilled", "Mustard Oil"] },
      { name: "Paneer Malai Tikka", desc: "Creamy, velvety cottage cheese infused with cardamom and rich cheese marinade.", price: "Half ₹229 (4pc) • Full ₹379 (8pc)", veg: true, tags: ["4pc / 8pc", "Malai Cream", "Mild & Silky"] },
    ],
  },
  {
    name: "Non-Veg Starters",
    desc: "Charcoal tandoor tikkas & royal succulent kebabs",
    items: [
      { name: "Tandoori Chicken", desc: "Classic bone-in chicken marinated in spiced yoghurt, charred in clay tandoor.", price: "Half ₹369 (4pc) • Full ₹699 (8pc)", veg: false, tags: ["4pc / 8pc", "Clay Tandoor", "Signature"] },
      { name: "Chicken Tikka", desc: "Tender boneless chicken chunks infused with mustard oil, fenugreek & red spices.", price: "Half ₹209 (4pc) • Full ₹349 (8pc)", veg: false, tags: ["4pc / 8pc", "Smoky Charcoal", "Spiced"] },
      { name: "Chicken Malai Tikka", desc: "Silky chicken cubes enveloped in rich cream, cashew paste, and green cardamom.", price: "Half ₹239 (4pc) • Full ₹399 (8pc)", veg: false, tags: ["4pc / 8pc", "Cashew Cream", "Cardamom"] },
      { name: "Chicken Glafi", desc: "Succulent minced chicken skewers enveloped in colorful bell peppers & herbs.", price: "Half ₹239 (4pc) • Full ₹399 (8pc)", veg: false, tags: ["4pc / 8pc", "Bell Peppers", "Skewered"] },
      { name: "Chicken Seekh Kabab", desc: "Spiced hand-minced chicken skewers flame-grilled over burning embers.", price: "Half ₹239 (4pc) • Full ₹399 (8pc)", veg: false, tags: ["4pc / 8pc", "Mince Kebab", "Charcoal Grill"] },
      { name: "Chicken Glowti Kabab", desc: "Royal Awadhi style melt-in-mouth chicken galouti infused with fragrant potli spices.", price: "Half ₹359 (4pc) • Full ₹599 (8pc)", veg: false, tags: ["4pc / 8pc", "Galouti Style", "Royal Awadh"] },
      { name: "Chicken Afghani Tikka", desc: "Mild, smoky chicken roasted in crushed black pepper, cashew paste and butter.", price: "Half ₹239 • Full ₹399", veg: false, tags: ["Black Pepper", "Butter Glaze", "Creamy"] },
    ],
  },
  {
    name: "Veg Main Course",
    desc: "Rich paneer delights, royal gravies & slow-cooked lentils",
    items: [
      { name: "Daal Tadka", desc: "Yellow lentils tempered with desi ghee, cumin, garlic, and dry red chillies.", price: "Half ₹159 • Full ₹269", veg: true, tags: ["Desi Ghee", "Garlic Tadka", "Comfort"] },
      { name: "Daal Fry", desc: "Traditional homestyle spiced lentil preparation tossed with onion and ripe tomatoes.", price: "Half ₹149 • Full ₹249", veg: true, tags: ["Homestyle", "Slow Cooked"] },
      { name: "Daal Makhani", desc: "Black urad lentils slow-simmered overnight with white butter, cream & tomato purée.", price: "Half ₹239 • Full ₹399", veg: true, tags: ["Overnight Simmer", "White Butter", "Velvety"] },
      { name: "Mix Veg", desc: "Assortment of fresh farm vegetables cooked in aromatic semi-dry masala.", price: "Half ₹149 • Full ₹249", veg: true, tags: ["Farm Fresh", "Seasonal Masala"] },
      { name: "Chola Masala", desc: "Tender chickpeas simmered in authentic rustic Punjabi style onion-tomato gravy.", price: "Half ₹169 • Full ₹279", veg: true, tags: ["Spiced Chickpeas", "Hearty"] },
      { name: "Shahi Paneer", desc: "Fresh cottage cheese cubes simmered in a royal saffron, cashew and sweet cream gravy.", price: "Half ₹239 (4pc) • Full ₹399 (8pc)", veg: true, tags: ["4pc / 8pc", "Cashew Gravy", "Shahi"] },
      { name: "Paneer Butter Masala", desc: "Paneer in a velvety smooth makhani tomato sauce enriched with butter & kasuri methi.", price: "Half ₹209 (4pc) • Full ₹349 (8pc)", veg: true, tags: ["4pc / 8pc", "Makhani", "Rich Butter"] },
      { name: "Kadhai Paneer", desc: "Paneer tossed with crunchy capsicum, onions, and freshly ground kadhai coriander spices.", price: "Half ₹209 (4pc) • Full ₹349 (8pc)", veg: true, tags: ["4pc / 8pc", "Kadhai Spices", "Bell Pepper"] },
      { name: "Matar Paneer", desc: "Tender green peas and soft cottage cheese cubes in traditional homestyle spiced gravy.", price: "Half ₹209 (4pc) • Full ₹339 (8pc)", veg: true, tags: ["4pc / 8pc", "Green Peas", "Classic"] },
      { name: "Paneer Do Pyaza", desc: "Paneer prepared with twice the onions, caramelized and diced in rich roasted spices.", price: "Half ₹209 (4pc) • Full ₹349 (8pc)", veg: true, tags: ["4pc / 8pc", "Caramelized Onion", "Rich"] },
      { name: "Handi Paneer", desc: "Simmered in an earthen handi with fragrant whole spices, bay leaves and cream.", price: "Half ₹219 (4pc) • Full ₹359 (8pc)", veg: true, tags: ["4pc / 8pc", "Earthen Handi", "Aromatic"] },
      { name: "Kaju Masala", desc: "Whole golden roasted cashews simmered in a decadent onion-cashew royal gravy.", price: "Half ₹299 (4pc) • Full ₹399 (8pc)", veg: true, tags: ["4pc / 8pc", "Roasted Cashew", "Royal Banquet"] },
      { name: "Paneer Lababdar", desc: "Cottage cheese cooked in creamy tomato gravy with grated paneer and coriander seeds.", price: "Half ₹239 (4pc) • Full ₹399 (8pc)", veg: true, tags: ["4pc / 8pc", "Grated Paneer", "Lababdar"] },
      { name: "Paneer Masala", desc: "Classic robust spiced cottage cheese curry with north-Indian countryside flavours.", price: "Half ₹209 (4pc) • Full ₹349 (8pc)", veg: true, tags: ["4pc / 8pc", "Country Spices", "Flavorful"] },
      { name: "Laal Matka Paneer Special Masala", desc: "Our house signature paneer prepared with secret earthen pot clay-roasted spices.", price: "Half ₹269 (4pc) • Full ₹449 (8pc)", veg: true, tags: ["4pc / 8pc", "House Special", "Clay Pot Simmer"] },
      { name: "Malai Kofta", desc: "Delicate paneer and potato dumplings in a luscious sweet-tangy cream and cashew gravy.", price: "Half ₹219 (4pc) • Full ₹359 (8pc)", veg: true, tags: ["4pc / 8pc", "Melt-in-Mouth", "Cashew Cream"] },
      { name: "Veg Kofta", desc: "Spiced garden vegetable dumplings simmered in rich heritage masala gravy.", price: "Half ₹209 (4pc) • Full ₹349 (8pc)", veg: true, tags: ["4pc / 8pc", "Spiced Kofta", "Heritage Gravy"] },
      { name: "Tomato Cheese", desc: "Tangy roasted tomatoes cooked with melted cheese, desi butter and fresh herbs.", price: "Half ₹219 (4pc) • Full ₹359 (8pc)", veg: true, tags: ["4pc / 8pc", "Melted Cheese", "Tangy Tomato"] },
    ],
  },
  {
    name: "Mushroom Specials",
    desc: "Earthy, tender button mushrooms in signature gravies",
    items: [
      { name: "Mushroom Do Pyaza", desc: "Button mushrooms tossed with caramelized pearl onions in richly spiced masala.", price: "Half ₹209 • Full ₹349", veg: true, tags: ["Button Mushroom", "Dual Onions", "Semi-Dry"] },
      { name: "Mushroom Masala", desc: "Fresh button mushrooms cooked in a spicy, aromatic onion-tomato reduction.", price: "Half ₹219 • Full ₹369", veg: true, tags: ["Aromatic Gravy", "Farm Fresh"] },
      { name: "Kadhai Mushroom", desc: "Mushrooms and crisp bell peppers tossed with freshly crushed coriander kadhai spices.", price: "Half ₹209 • Full ₹339", veg: true, tags: ["Coarse Spices", "Bell Peppers"] },
      { name: "Mushroom Matar Masala", desc: "Plump button mushrooms and tender green peas simmered in a comforting spiced gravy.", price: "Half ₹209 • Full ₹339", veg: true, tags: ["Green Peas", "Homestyle Comfort"] },
      { name: "Laal Matka Special Mushroom Masala", desc: "Chef's secret earthenware clay-simmered mushroom preparation with royal spices.", price: "Half ₹229 • Full ₹379", veg: true, tags: ["Chef Signature", "Clay Matka", "Spicy"] },
    ],
  },
  {
    name: "Chicken Main Course",
    desc: "Handi simmered, tawa roasted & velvety curries",
    items: [
      { name: "Kadhai Chicken", desc: "Bone-in chicken cooked in iron wok with freshly pounded coriander seeds and bell peppers.", price: "Half ₹239 (2pc) • Full ₹399 (4pc)", veg: false, tags: ["2pc / 4pc", "Wok Tossed", "Kadhai Masala"] },
      { name: "Chicken Do Pyaza", desc: "Succulent chicken braised with caramelized onions, green cardamoms and whole aromatics.", price: "Half ₹239 (2pc) • Full ₹399 (4pc)", veg: false, tags: ["2pc / 4pc", "Caramelized Onion", "Aromatic"] },
      { name: "Butter Chicken", desc: "Charred tandoori chicken simmered in satin smooth butter-tomato gravy with kasuri methi.", price: "Half ₹249 (2pc) • Full ₹419 (4pc)", veg: false, tags: ["2pc / 4pc", "Velvet Makhani", "Tandoori Chicken"] },
      { name: "Tawa Chicken", desc: "Street-style pan-roasted chicken tossed with spicy ginger-garlic juliennes and green chillies.", price: "Half ₹239 (2pc) • Full ₹399 (4pc)", veg: false, tags: ["2pc / 4pc", "Pan Roasted", "Ginger Garlic"] },
      { name: "Chicken Masala", desc: "Traditional countryside chicken curry rich in whole roasted spices and thick onion gravy.", price: "Half ₹239 (2pc) • Full ₹399 (4pc)", veg: false, tags: ["2pc / 4pc", "Country Style", "Hearty"] },
      { name: "Chicken Tikka Masala", desc: "Smoky grilled tandoori tikka pieces folded into a rich, spicy onion-tomato gravy.", price: "Half ₹249 (2pc) • Full ₹419 (4pc)", veg: false, tags: ["2pc / 4pc", "Charcoal Tikka", "Spiced Gravy"] },
      { name: "Handi Chicken", desc: "Slow-cooked inside a sealed clay handi for deep rustic flavor and fall-apart tenderness.", price: "Half ₹239 (2pc) • Full ₹439 (4pc)", veg: false, tags: ["2pc / 4pc", "Clay Handi", "Slow Cooked"] },
      { name: "Bhuna Chicken Masala", desc: "Pan-roasted chicken tossed in intensely caramelized, concentrated brown onion gravy.", price: "Half ₹239 (2pc) • Full ₹399 (4pc)", veg: false, tags: ["2pc / 4pc", "Bhuna Masala", "Dark Caramelized"] },
      { name: "Laal Matka Special Chicken Masala", desc: "Our signature house chicken recipe slow-simmered in red earthenware clay pot.", price: "Half ₹269 (2pc) • Full ₹449 (4pc)", veg: false, tags: ["2pc / 4pc", "House Crown", "Clay Simmered"] },
    ],
  },
  {
    name: "Mutton Main Course",
    desc: "Tender goat meat slow-braised in royal spices & earthen pots",
    items: [
      { name: "Mutton Curry", desc: "Traditional slow-cooked mutton curry with fragrant cloves, black cardamom and whole spices.", price: "Half ₹269 (2pc) • Full ₹449 (4pc)", veg: false, tags: ["2pc / 4pc", "Slow Cooked", "Fragrant Gravy"] },
      { name: "Bhuna Goshta", desc: "Tender goat meat pan-roasted until coated in rich, dark caramelized onion and garlic masala.", price: "Half ₹269 (2pc) • Full ₹449 (4pc)", veg: false, tags: ["2pc / 4pc", "Bhuna Gosht", "Roasted Masala"] },
      { name: "Mutton Rogan Josh", desc: "Kashmiri delicacy infused with authentic rattan jot, ground fennel, and warming spices.", price: "Half ₹269 (2pc) • Full ₹449 (4pc)", veg: false, tags: ["2pc / 4pc", "Kashmiri Fennel", "Royal Heritage"] },
      { name: "Kadhai Mutton", desc: "Succulent goat meat tossed with crisp capsicum, onions and coarse kadhai spices.", price: "Half ₹269 (2pc) • Full ₹449 (4pc)", veg: false, tags: ["2pc / 4pc", "Crushed Spices", "Kadhai Wok"] },
      { name: "Pahadi Mutton", desc: "Mountain-style rustic mutton simmered with mint, fresh coriander, and wild forest spices.", price: "Half ₹269 (2pc) • Full ₹449 (4pc)", veg: false, tags: ["2pc / 4pc", "Pahadi Herb", "Rustic Flavor"] },
      { name: "Laal Matka Special Mutton", desc: "The supreme speciality of Laal Matka — slow cooked in clay pots over embers for 6 hours.", price: "Half ₹299 (2pc) • Full ₹499 (4pc)", veg: false, tags: ["2pc / 4pc", "House Signature", "6-Hour Clay Stew"] },
    ],
  },
  {
    name: "Anda Curry",
    desc: "Country eggs simmered in rich gravy & skillet delights",
    items: [
      { name: "Anda Curry", desc: "Golden pan-fried boiled eggs immersed in a spiced onion-tomato homestyle gravy.", price: "Half ₹149 (2pc) • Full ₹249 (4pc)", veg: false, tags: ["2pc / 4pc", "Golden Eggs", "Homestyle Gravy"] },
      { name: "Anda Do Pyaza", desc: "Eggs simmered with double caramelized onions, whole dry chillies and rich spices.", price: "Half ₹159 (2pc) • Full ₹259 (4pc)", veg: false, tags: ["2pc / 4pc", "Caramelized Onions", "Hearty"] },
      { name: "Egg Omlet", desc: "Fluffy country-style Indian masala omelette whisked with onions, green chillies & fresh coriander.", price: "Half ₹99 (2pc) • Full ₹149 (8pc)", veg: false, tags: ["2pc / 8pc", "Skillet Cooked", "Masala Whisked"] },
      { name: "Egg Bhurji", desc: "Scrambled eggs tossed with cumin, chopped onions, ripe tomatoes and desi butter.", price: "Half ₹99 (2pc) • Full ₹149 (8pc)", veg: false, tags: ["2pc / 8pc", "Desi Butter", "Street Style"] },
    ],
  },
  {
    name: "Dum Biryani",
    desc: "Fragrant long-grain basmati dum-cooked with saffron & kewra",
    items: [
      { name: "Veg Biryani", desc: "Aged basmati rice layered with garden vegetables, mint, caramelized onions and saffron milk.", price: "Half ₹119 • Full ₹199", veg: true, tags: ["Basmati Rice", "Mint & Saffron", "Dum Pukht"] },
      { name: "Egg Biryani", desc: "Golden spiced eggs layered with fragrant basmati, fried onions and royal biryani spices.", price: "Half ₹149 (2pc) • Full ₹249 (4pc)", veg: false, tags: ["2pc / 4pc", "Spiced Eggs", "Aromatic Rice"] },
      { name: "Chicken Biryani", desc: "Dum-cooked chicken marinated in yoghurt, brown onions and saffron basmati in sealed handi.", price: "Half ₹249 (2pc) • Full ₹449 (4pc)", veg: false, tags: ["2pc / 4pc", "Handi Dum", "Saffron Chicken"] },
      { name: "Mutton Biryani", desc: "Slow-cooked tender goat meat infused with kewra, saffron and whole spices sealed with dough.", price: "Half ₹279 (2pc) • Full ₹499 (4pc)", veg: false, tags: ["2pc / 4pc", "Royal Mutton", "Sealed Clay Dum"] },
    ],
  },
  {
    name: "Shakes, Coffee & Desserts",
    desc: "Chilled milkshakes, artisan coffees & royal desserts",
    items: [
      { name: "Special Fruit Punch", desc: "Chef's signature blended fruit shake with assorted dried fruits and seasonal berries.", price: "₹199", veg: true, tags: ["Signature Shake", "Rich Dry Fruits"] },
      { name: "Butterscotch Shake", desc: "Thick creamy shake infused with crunchy butterscotch praline and caramel.", price: "₹179", veg: true, tags: ["Thick Shake", "Butterscotch"] },
      { name: "Pine Apple Shake", desc: "Tropical sweet pineapple shake blended with chilled creamy milk.", price: "₹179", veg: true, tags: ["Pineapple", "Chilled"] },
      { name: "Banana Shake", desc: "Wholesome fresh banana shake rich in nutrients and honey sweetness.", price: "₹179", veg: true, tags: ["Fresh Banana", "Thick & Creamy"] },
      { name: "Chocolate Shake", desc: "Decadent Dutch cocoa shake blended thick with chocolate fudge drizzle.", price: "₹169", veg: true, tags: ["Rich Cocoa", "Choco Fudge"] },
      { name: "Black Current Shake", desc: "Zesty and sweet blackcurrant shake with vibrant purple berry notes.", price: "₹159", veg: true, tags: ["Blackcurrant", "Berry"] },
      { name: "Oreo Shake", desc: "Classic crushed Oreo biscuit cookies whipped with chilled vanilla ice milk.", price: "₹159", veg: true, tags: ["Oreo Cookies", "Creamy"] },
      { name: "Strawberry Shake", desc: "Sweet, fragrant strawberry thick shake topped with berry coulis.", price: "₹159", veg: true, tags: ["Strawberry", "Fruity"] },
      { name: "Vanilla Shake", desc: "Smooth, timeless pure vanilla bean milkshake served super chilled.", price: "₹159", veg: true, tags: ["Vanilla Bean", "Smooth"] },
      { name: "Kit-Kat Shake", desc: "Crunchy Kit-Kat chocolate wafers crushed and blended into rich milk shake.", price: "₹159", veg: true, tags: ["Kit-Kat", "Choco Crunch"] },
      { name: "Mango Shake", desc: "Golden Alfonso mango pulp blended into a rich, luscious royal treat.", price: "₹159", veg: true, tags: ["Alfonso Mango", "Tropical"] },
      { name: "Special Cold Coffee", desc: "Our house cold coffee blended extra thick with dark espresso and ice cream.", price: "₹169", veg: true, tags: ["Special Brew", "Espresso", "Ice Cream"] },
      { name: "Cold Coffee", desc: "Chilled whipped coffee with creamy milk and a dusting of cocoa.", price: "₹149", veg: true, tags: ["Chilled Brew", "Classic"] },
      { name: "Hot Coffee", desc: "Steaming freshly brewed artisan roasted coffee with frothy milk.", price: "₹69", veg: true, tags: ["Fresh Brew", "Steaming Froth"] },
      { name: "Black Coffee", desc: "Intense, clean black coffee shot without milk. Pure caffeine awakening.", price: "₹49", veg: true, tags: ["Zero Sugar", "Dark Roast"] },
      { name: "Hot Tea", desc: "Traditional spiced Indian tea simmered with ginger, cardamom, and whole milk.", price: "₹39", veg: true, tags: ["Desi Chai", "Ginger Cardamom"] },
      { name: "Gulab Jamun", desc: "Warm golden khoya dumplings soaked in rose and cardamom sugar syrup.", price: "₹69 (2pc)", veg: true, tags: ["2pc", "Warm Khoya", "Rose Syrup"] },
      { name: "Shahi Tukda", desc: "Crisp ghee-fried bread soaked in cardamom saffron syrup and coated with rabri.", price: "₹69 (2pc)", veg: true, tags: ["2pc", "Royal Mughlai", "Rabri Glaze"] },
      { name: "Gajar Halwa", desc: "Winter red carrots slow-roasted in pure desi ghee, khoya and crunchy almonds.", price: "₹89 (100gm)", veg: true, tags: ["100gm", "Desi Ghee", "Winter Special"] },
      { name: "Rasmalai", desc: "Spongy cottage cheese discs steeped in saffron cardamom thickened milk.", price: "₹69 (1pc)", veg: true, tags: ["1pc", "Saffron Rabri", "Pistachio"] },
    ],
  },
];

// ─────────────────────────────────────────────
// OUR STORY COPY
// ─────────────────────────────────────────────
export const STORY = {
  headline_laal: "LAAL.",
  headline_matka: "MATKA.",
  laal_meaning: "Laal is red — but not just a colour. It is the vermilion of a bride's maang. The marigold fire of a village festival. The warmth of a clay hearth at dusk. In Rajasthan, laal means life itself: vivid, unapologetic, full of energy.",
  matka_meaning: "Matka is earth — shaped by a craftsman's hands, hardened by fire, filled with water, tea, or dal. It is the vessel that holds things together. The pot that every grandmother had. The symbol of honest craft, patient tradition, and generous hospitality.",
  combined: "Together, they are us. A café that doesn't pretend to be anything it isn't. We cook the way our grandmothers did — with time, with spice, with love. We serve it in spaces that feel like home. Come as you are. Leave full.",
};

// ─────────────────────────────────────────────
// ART TO TABLE COPY
// ─────────────────────────────────────────────
export const ART_TO_TABLE = {
  headline: "FROM ART TO TABLE",
  subtitle: "Five acts. One philosophy.",
  stages: [
    { stage: "ART", copy: "Every dish begins as a painting in the mind — a memory of colour, texture, and flavour passed down across generations." },
    { stage: "CRAFT", copy: "The clay is shaped by hand. The dough is kneaded with intent. The spice blends are ground fresh, never from a jar." },
    { stage: "FIRE", copy: "The tandoor breathes. The tawa sings. The slow simmer transforms raw earth into something transcendent." },
    { stage: "FLAVOUR", copy: "Mathania chilli. Wild ker berries. Desert saffron. Ingredients that carry the memory of the land they came from." },
    { stage: "TABLE", copy: "Set with care, served with warmth. Your table is not just a seat — it's a seat at the family table." },
  ],
};

// ─────────────────────────────────────────────
// EXPERIENCE SECTION COPY
// ─────────────────────────────────────────────
export const EXPERIENCE = {
  pre_headline: "STEP THROUGH THE DOOR.",
  headline: "MORE THAN A MEAL.",
  subtext: "A place to gather. A place to experience.\nA little piece of Rajasthan.",
};

// ─────────────────────────────────────────────
// VISIT SECTION COPY
// ─────────────────────────────────────────────
export const VISIT = {
  headline: "PADHARO.",
  subhead: "Come experience Laal Matka at Taramandal, Gorakhpur.",
};

// ─────────────────────────────────────────────
// REVIEWS DATA (REAL GOOGLE REVIEWS)
// ─────────────────────────────────────────────
export const REVIEWS = [
  {
    name: "Shalini Sharma",
    avatar: "SS",
    role: "लोकल गाइड · 97 समीक्षाएं • 898 फ़ोटो",
    isGuide: true,
    rating: 5,
    time: "3 महीने पहले",
    serviceTags: ["बैठकर खाने की सुविधा (Dine-in)", "डिनर", "₹400–600"],
    hindiQuote: "अच्छा खाना, बढ़िया माहौल, मनमोहक परिवेश और सजावट का शानदार नज़ारा। स्टार्टर और डिनर, दोनों में शाकाहारी और मांसाहारी व्यंजन स्वादिष्ट थे, साथ ही वहाँ का माहौल इसे और भी मनमोहक बना देता है।",
    englishQuote: "Good food, great ambiance, captivating surroundings, and wonderful decor. Both vegetarian and non-vegetarian dishes in starters and dinner were delicious, made even better by the pleasant vibe.",
    dishTag: "🌿 Veg & Non-Veg Starters & Dinner"
  },
  {
    name: "Vijay Kumar",
    avatar: "VK",
    role: "2 समीक्षाएं • 1 फ़ोटो",
    isGuide: false,
    rating: 5,
    time: "6 महीने पहले",
    serviceTags: ["बैठकर खाने की सुविधा", "ब्रंच", "₹1,400–1,600"],
    hindiQuote: "लाल मटका मटन स्पेशल और चिकन बिरयानी बहुत ही स्वादिष्ट थे और सभी कर्मचारियों की सेवा भी बहुत अच्छी थी।",
    englishQuote: "Laal Matka Mutton Special and Chicken Biryani were very delicious, and the service from all the staff was also very good.",
    dishTag: "🍲 लाल मटका मटन स्पेशल & चिकन बिरयानी",
    ownerReply: "आपके प्रशंसा भरे शब्दों के लिए धन्यवाद 😊 हमें खुशी है कि आपको स्वाद पसंद आया। आशा है कि जल्द ही आपको फिर से सेवा देने का अवसर मिलेगा 🙏"
  },
  {
    name: "Prasanna Kumar",
    avatar: "PK",
    role: "6 समीक्षाएं",
    isGuide: false,
    rating: 5,
    time: "5 महीने पहले",
    serviceTags: ["लंच (Lunch)", "₹1,800–2,000"],
    hindiQuote: "खाना लाजवाब था! रोशन गुप्ता का आतिथ्य सत्कार लाजवाब है।",
    englishQuote: "The food was fabulous! Roshan Gupta's hospitality was truly outstanding.",
    dishTag: "✨ आतिथ्य सत्कार & लाजवाब खाना"
  },
  {
    name: "Pankaj Rajput",
    avatar: "PR",
    role: "लोकल गाइड · 42 समीक्षाएं • 5 फ़ोटो",
    isGuide: true,
    rating: 5,
    time: "5 महीने पहले",
    serviceTags: ["Google Verified Review"],
    hindiQuote: "बहुत अच्छी सेवा और स्वादिष्ट भोजन।",
    englishQuote: "Very good service and delicious food.",
    dishTag: "🍽️ बहुत अच्छी सेवा & स्वादिष्ट भोजन"
  },
  {
    name: "Amit Kumar Rai",
    avatar: "AR",
    role: "लोकल गाइड · 5 समीक्षाएं • 3 फ़ोटो",
    isGuide: true,
    rating: 5,
    time: "2 महीने पहले",
    serviceTags: ["बैठकर खाने की सुविधा (Dine-in)"],
    hindiQuote: "शानदार माहौल और स्वादिष्ट भोजन।",
    englishQuote: "Splendid ambiance and delicious food.",
    dishTag: "🏮 शानदार माहौल & स्वादिष्ट भोजन"
  },
  {
    name: "Durgesh Pratap Pal",
    avatar: "DP",
    role: "1 समीक्षा",
    isGuide: false,
    rating: 5,
    time: "5 महीने पहले",
    serviceTags: ["Google Verified Review"],
    hindiQuote: "खाना अच्छा है और सेवा भी अच्छी है।",
    englishQuote: "Good food and the service is also very good.",
    dishTag: "⭐ अच्छा खाना & अच्छी सेवा",
    ownerReply: "आपके प्रशंसा भरे शब्दों के लिए धन्यवाद 😊 हमें खुशी है कि आपको स्वाद पसंद आया। आशा है कि जल्द ही आपको फिर से सेवा देने का अवसर मिलेगा 🙏"
  }
];

// ─────────────────────────────────────────────
// NAV LINKS
// ─────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Our Story", href: "#story" },
  { label: "Our Craft", href: "#art-to-table" },
  { label: "Menu", href: "#menu" },
  { label: "Experience", href: "#experience" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit Us", href: "#visit" },
];

