const PHONE = '923167029185';

export const openWhatsApp = (message) => {
  const text = message || 'Hello HorizonStream IPTV! I would like to know more about your service.';
  const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const WA_MESSAGES = {
  // Existing Global Messages
  freeTrial:     'Hello HorizonStream IPTV! I want to start a FREE TRIAL please. 🎬',
  contactUs:     'Hello HorizonStream IPTV! I would like to contact you.',
  resellerPanel: 'Hello HorizonStream IPTV! I want to become a reseller. Please share the reseller panel details.',
  choosePlan:    'Hello HorizonStream IPTV! I want to choose a subscription plan.',
  general:       'Hello HorizonStream IPTV! I would like to know more about your IPTV service.',

  // --- Servers WhatsApp Messages ---
  starShare:     'Hello HorizonStream IPTV! I am interested in the StarShare server. Please tell me more. ⭐',
  fiveGLive:     'Hello HorizonStream IPTV! I am interested in the 5G Live server. Please tell me more. ⚡',
  opplex:        'Hello HorizonStream IPTV! I am interested in the Opplex server. Please tell me more. 🎬',
  b1g:           'Hello HorizonStream IPTV! I am interested in the B1G 4K server. Please tell me more. 🔷',
  dream8k:       'Hello HorizonStream IPTV! I am interested in the Dream8K server. Please tell me more. 🔮',
  geotv:         'Hello HorizonStream IPTV! I am interested in the GeoTV Server. Please tell me more. 🌍',
  megaott:       'Hello HorizonStream IPTV! I am interested in the MegaOTT server. Please tell me more. 🚀',
  extraott:      'Hello HorizonStream IPTV! I am interested in the ExtraOTT server. Please tell me more. 💎',
  sansat:        'Hello HorizonStream IPTV! I am interested in the Sansat server. Please tell me more. 📡',
  casper:        'Hello HorizonStream IPTV! I am interested in the Casper server. Please tell me more. 👻',
  dhPlus:        'Hello HorizonStream IPTV! I am interested in the DH Plus server. Please tell me more. 👑',
  doomtv:        'Hello HorizonStream IPTV! I am interested in the DoomTV server. Please tell me more. 🔥',
  dino:          'Hello HorizonStream IPTV! I am interested in the Dino server. Please tell me more. 🦖',
  crystalOtt:    'Hello HorizonStream IPTV! I am interested in the CrystalOtt server. Please tell me more. ❄️',
  cobra: 'Hello HorizonStream IPTV! I am interested in the Cobra server. Please tell me more. 🐍',
  
  // --- NEWLY ADDED SERVERS ---
  strong4k:      'Hello HorizonStream IPTV! I am interested in the Strong4K server. Please tell me more. 💪',
  goldenOtt:     'Hello HorizonStream IPTV! I am interested in the Golden OTT server. Please tell me more. 🏆',
  smart4k:       'Hello HorizonStream IPTV! I am interested in the Smart4K server. Please tell me more. 🧠',
  glotv:         'Hello HorizonStream IPTV! I am interested in the GloTV server. Please tell me more. 🌐',
  spice4k:       'Hello HorizonStream IPTV! I am interested in the Spice4K server. Please tell me more. 🌶️',
  trex:          'Hello HorizonStream IPTV! I am interested in the Trex server. Please tell me more. 🦖'
};