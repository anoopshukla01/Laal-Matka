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
    { stage: "ART", path: "images/story-art.jpg", label: "ART STAGE — Miniature Painting & Heritage Wall Art", w: 800, h: 600 },
    { stage: "CRAFT", path: "images/potter-craft.jpg", label: "CRAFT STAGE — Master Potter Shaping Earthen Clay", w: 800, h: 600 },
    { stage: "FIRE", path: "images/woodfire-kiln.jpg", label: "FIRE STAGE — Slow Kiln Baking & Woodfire Tandoor", w: 800, h: 600 },
    { stage: "FLAVOUR", path: "images/laal-maas.jpg", label: "FLAVOUR STAGE — Stone-Ground Mathania Chillies & Spices", w: 800, h: 600 },
    { stage: "TABLE", path: "images/dal-baati.jpg", label: "TABLE STAGE — Feast Plated on Royal Dining Table", w: 800, h: 600 },
  ],
  experience: [
    { slot: "experience-1", path: "images/haveli-courtyard.jpg", label: "CAFÉ EXTERIOR — 800×600px", w: 800, h: 600 },
    { slot: "experience-2", path: "images/story-art.jpg", label: "CAFÉ INTERIOR — 800×600px", w: 800, h: 600 },
    { slot: "experience-3", path: "images/woodfire-kiln.jpg", label: "SEATING AREA — 800×600px", w: 800, h: 600 },
    { slot: "experience-4", path: "images/dal-baati.jpg", label: "SIGNATURE FOOD — 800×600px", w: 800, h: 600 },
    { slot: "experience-5", path: "images/matka-chai.jpg", label: "DRINKS / CHAI — 800×600px", w: 800, h: 600 },
    { slot: "experience-6", path: "images/royal-dessert.jpg", label: "PEOPLE / AMBIENCE — 800×600px", w: 800, h: 600 },
  ],
  gallery: [
    { slot: "gallery-1", path: "images/story-art.jpg", label: "Folk Art Detail — Miniature Painting Mural", w: 800, h: 1000 },
    { slot: "gallery-2", path: "images/haveli-courtyard.jpg", label: "Courtyard Dining & Haveli Architecture", w: 1200, h: 800 },
    { slot: "gallery-3", path: "images/potter-craft.jpg", label: "Master Potter Shaping Desert Matka", w: 600, h: 600 },
    { slot: "gallery-4", path: "images/dal-baati.jpg", label: "Dal Baati Churma Royal Feast", w: 800, h: 1000 },
    { slot: "gallery-5", path: "images/matka-chai.jpg", label: "Signature Saffron Matka Chai Poured in Kulhad", w: 1200, h: 800 },
    { slot: "gallery-6", path: "images/raj-kachori.jpg", label: "Loaded Shahi Raj Kachori", w: 600, h: 600 },
    { slot: "gallery-7", path: "images/woodfire-kiln.jpg", label: "Woodfire Kiln & Clay Baking", w: 800, h: 1000 },
    { slot: "gallery-8", path: "images/laal-maas.jpg", label: "Simmering Mathania Laal Maas", w: 1200, h: 800 },
    { slot: "gallery-9", path: "images/royal-dessert.jpg", label: "Royal Ghevar with Rabri & Rose Petals", w: 600, h: 600 },
  ],
  dishes: {
    0: {
      0: { path: "images/dal-baati.jpg", label: "Dal Baati Churma" },
      1: { path: "images/laal-maas.jpg", label: "Laal Maas" },
      2: { path: "images/crop_dal-baati.jpg", label: "Gatte ki Sabzi" },
      3: { path: "images/story-art.jpg", label: "Ker Sangri" },
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
      0: { path: "images/raj-kachori.jpg", label: "Raj Kachori" },
      1: { path: "images/crop_raj-kachori.jpg", label: "Dahi Bada" },
      2: { path: "images/pyaaz-kachori.jpg", label: "Mirchi Vada" },
      3: { path: "images/crop_raj-kachori.jpg", label: "Samosa Chaat" }
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
    name: "Rajasthani Specials",
    desc: "Authentic flavours from the land of kings",
    items: [
      { name: "Dal Baati Churma", desc: "Slow-baked wheat baati with spiced lentils and crumbled churma — the soul of Rajasthani cuisine.", price: "₹320", veg: true, tags: ["Heritage Recipe", "Wheat", "Lentils"] },
      { name: "Laal Maas", desc: "Slow-cooked mutton in a fiery Mathania chilli gravy. Bold, earthy, unapologetically Rajasthani.", price: "₹490", veg: false, tags: ["Mathania Chilli", "Mutton", "Slow-Cooked"] },
      { name: "Gatte ki Sabzi", desc: "Gram-flour dumplings simmered in a tangy yoghurt and spice gravy. Simple. Perfect.", price: "₹240", veg: true, tags: ["Gram Flour", "Yoghurt", "Saffron"] },
      { name: "Ker Sangri", desc: "Wild desert berries and beans tossed with dried spices. A flavour found nowhere else on earth.", price: "₹280", veg: true, tags: ["Desert Berry", "Seasonal", "Wild Harvest"] },
      { name: "Safed Maas", desc: "Mutton cooked in a rich white cashew-cream gravy — the Maharaja's banquet dish.", price: "₹520", veg: false, tags: ["Cashew", "Cream", "Royal Recipe"] },
    ],
  },
  {
    name: "Matka Chai & Drinks",
    desc: "Tradition in every sip.",
    items: [
      { name: "Laal Matka Chai", desc: "Our signature chai — brewed slow in a clay matka with whole spices, milk, and a hint of saffron.", price: "₹80", veg: true, tags: ["Saffron", "Clay Matka", "Masala"] },
      { name: "Kashmiri Kahwa", desc: "Green tea with saffron, cardamom, cinnamon, and crushed almonds. A hug in a cup.", price: "₹120", veg: true, tags: ["Saffron", "Green Tea", "Almonds"] },
      { name: "Rose Shikanji", desc: "Fresh lime, rose syrup, black salt, and a whisper of cumin. Rajasthan in a glass.", price: "₹90", veg: true, tags: ["Rose", "Lime", "Black Salt"] },
      { name: "Thandai", desc: "Chilled milk with almonds, fennel, rose petals, and traditional spices. Festive, cooling, divine.", price: "₹110", veg: true, tags: ["Almonds", "Rose Petals", "Fennel"] },
    ],
  },
  {
    name: "Artisan Coffee",
    desc: "Royal brews, modern moments.",
    items: [
      { name: "Filter Coffee", desc: "South Indian filter coffee meets Rajasthani hospitality. Strong, dark, perfectly sweet.", price: "₹100", veg: true, tags: ["Single Origin", "Dark Roast"] },
      { name: "Cardamom Latte", desc: "Espresso with steamed milk and freshly ground green cardamom. A subtle, aromatic awakening.", price: "₹160", veg: true, tags: ["Cardamom", "Espresso", "Steamed Milk"] },
      { name: "Cold Brew", desc: "18-hour slow-steeped cold brew. Clean, smooth, naturally sweet. No shortcuts.", price: "₹180", veg: true, tags: ["18-Hour Steep", "No Sugar Added"] },
    ],
  },
  {
    name: "Chaat & Small Plates",
    desc: "Bold bites. Rajasthani twists.",
    items: [
      { name: "Pyaaz Kachori", desc: "Flaky fried pastry stuffed with spiced onion — the quintessential Jaipur breakfast.", price: "₹120", veg: true, tags: ["Street Classic", "Onion", "Crispy"] },
      { name: "Mirchi Bada", desc: "Large green chilli dipped in spiced gram-flour batter and deep-fried. Handle with care.", price: "₹100", veg: true, tags: ["Green Chilli", "Spicy", "Street Food"] },
      { name: "Dahi Bhalle", desc: "Soft lentil fritters bathed in chilled yoghurt, tamarind chutney, and mint.", price: "₹140", veg: true, tags: ["Tamarind", "Yoghurt", "Cooling"] },
      { name: "Raj Kachori", desc: "A giant crispy bowl filled with yoghurt, sprouts, chutneys, sev — a full meal in one bite.", price: "₹160", veg: true, tags: ["Sprouts", "Chutneys", "Signature"] },
    ],
  },
  {
    name: "Main Course",
    desc: "Hearty meals. Royal heritage.",
    items: [
      { name: "Paneer Laal Maas", desc: "Cottage cheese cubes in a rich, red Mathania chilli gravy. Vegetarian heat at its finest.", price: "₹320", veg: true, tags: ["Mathania Chilli", "Paneer", "Spicy"] },
      { name: "Murgh Jodhpuri", desc: "Chicken cooked with whole spices, dried mango powder, and cream. Jodhpur in every mouthful.", price: "₹420", veg: false, tags: ["Dried Mango", "Whole Spices", "Cream"] },
      { name: "Bajra Khichdi", desc: "Pearl millet porridge with sesame oil and ghee. Humble, nourishing, deeply Rajasthani.", price: "₹200", veg: true, tags: ["Pearl Millet", "Ghee", "Heritage"] },
      { name: "Missi Roti", desc: "Gram flour flatbread with carom seeds and fresh fenugreek. Baked in the tandoor.", price: "₹60", veg: true, tags: ["Gram Flour", "Fenugreek", "Tandoor"] },
    ],
  },
  {
    name: "Royal Desserts",
    desc: "Sweet traditions. Timeless joy.",
    items: [
      { name: "Ghevar", desc: "Honeycomb-lattice sweet soaked in rose syrup and topped with rabri. Rajasthan's most iconic dessert.", price: "₹180", veg: true, tags: ["Rose Syrup", "Rabri", "Festival Sweet"] },
      { name: "Malpua", desc: "Crispy-edged, soft-centred pancakes in cardamom syrup. Served warm with chilled rabri.", price: "₹160", veg: true, tags: ["Cardamom", "Rabri", "Warm"] },
      { name: "Matka Kulfi", desc: "Slow-frozen pistachio and saffron kulfi served in a miniature clay matka.", price: "₹140", veg: true, tags: ["Pistachio", "Saffron", "Clay Matka"] },
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
  { label: "Upload Images", href: "uploader.html" },
];

