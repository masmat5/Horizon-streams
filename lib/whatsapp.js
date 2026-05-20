const PHONE = '923167029185'; // 923167029185 with country code

export const openWhatsApp = (message) => {
  const text = message || 'Hello Horizon Streams IPTV! I would like to know more about your service.';
  const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const WA_MESSAGES = {
  freeTrial: 'Hello Horizon Streams IPTV! I want to start a FREE TRIAL please. 🎬',
  contactUs: 'Hello Horizon Streams IPTV! I would like to contact you.',
  starShare: 'Hello Horizon Streams IPTV! I am interested in the StarShare server. Please tell me more.',
  opplex: 'Hello Horizon Streams IPTV! I am interested in the Opplex server. Please tell me more.',
  b1g: 'Hello Horizon Streams IPTV! I am interested in the B1G 4K server. Please tell me more.',
  resellerPanel: 'Hello Horizon Streams IPTV! I want to become a reseller. Please share details.',
  choosePlan: 'Hello Horizon Streams IPTV! I want to choose a subscription plan.',
  general: 'Hello Horizon Streams IPTV! I would like to know more about your IPTV service.',
};
