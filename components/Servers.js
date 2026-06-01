import { openWhatsApp, WA_MESSAGES } from '../lib/whatsapp';

const servers = [
  { name: 'StarShare', tag: 'Sports & Global', desc: 'Premium sports, international news, and global entertainment from around the world in HD quality.', waMsg: WA_MESSAGES.starShare, color: '#f59e0b', icon: '⭐' },
  { name: '5G Live', tag: 'Ultra Low Latency', desc: 'Blazing fast buffer-free live streaming optimized for high-speed internet connections.', waMsg: WA_MESSAGES.fiveGLive, color: '#10b981', icon: '⚡' },
  { name: 'Opplex', tag: 'Entertainment Hub', desc: 'Thousands of VOD titles, full TV seasons, Bollywood, Hollywood, and kids content.', waMsg: WA_MESSAGES.opplex, color: '#7c3aed', icon: '🎬' },
  { name: 'B1G', tag: '4K Ultra HD', desc: 'Crystal-clear 4K Ultra HD streams for the ultimate cinematic experience at home.', waMsg: WA_MESSAGES.b1g, color: '#06b6d4', icon: '🔷' },
  { name: 'Dream8K', tag: 'Next-Gen Quality', desc: 'Future-proof 8K resolution support with raw, uncompressed bitrate streaming.', waMsg: WA_MESSAGES.dream8k, color: '#ec4899', icon: '🔮' },
  { name: 'GeoTV Server', tag: 'Regional Premium', desc: 'Dedicated high-bandwidth pathways for flawless local, premium news, and regional entertainment.', waMsg: WA_MESSAGES.geotv, color: '#3b82f6', icon: '🌍' },
  { name: 'MegaOTT', tag: 'Massive Library', desc: 'Huge collection of global channels and updated movie catalogs daily.', waMsg: WA_MESSAGES.megaott, color: '#ef4444', icon: '🚀' },
  { name: 'ExtraOTT', tag: 'Extended VIP', desc: 'Exclusive access to premium backup sources, premium feeds, and rare networks.', waMsg: WA_MESSAGES.extraott, color: '#84cc16', icon: '💎' },
  { name: 'Sansat', tag: 'Smooth Streaming', desc: 'Highly optimized compression algorithms for seamless streaming even on low speeds.', waMsg: WA_MESSAGES.sansat, color: '#a855f7', icon: '📡' },
  { name: 'Casper', tag: 'Ghost Speed', desc: 'Lightweight and hyper-fast connection servers designed for older devices.', waMsg: WA_MESSAGES.casper, color: '#6366f1', icon: '👻' },
  { name: 'DH Plus', tag: 'Premium Access', desc: 'Digital Hybrid technology featuring elite packages and zero downtime.', waMsg: WA_MESSAGES.dhPlus, color: '#f43f5e', icon: '👑' },
  { name: 'DoomTV', tag: 'Action & Live', desc: 'High frame-rate streaming dedicated to intense live broadcasts and continuous feeds.', waMsg: WA_MESSAGES.doomtv, color: '#ea580c', icon: '🔥' },
  { name: 'Dino', tag: 'Classic Stable', desc: 'Time-tested legacy servers offering unmatched stability and consistent uptimes.', waMsg: WA_MESSAGES.dino, color: '#14b8a6', icon: '🦖' },
  { name: 'CrystalOtt', tag: 'Pure Clarity', desc: 'Impeccable pixel-perfect delivery for high-end audio and video systems.', waMsg: WA_MESSAGES.crystalOtt, color: '#22d3ee', icon: '❄️' },
  { name: 'Cobra', tag: 'Striking Speeds', desc: 'Aggressive content routing ensures instant channel switching with no delay.', waMsg: WA_MESSAGES.cobra, color: '#22c55e', icon: '🐍' }
];

export default function Servers() {
  return (
    <>
      <section className="servers-section" id="servers">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Our Servers</p>
            <h2 className="section-title">Premium <span className="gradient-text">Servers Network</span></h2>
            <p className="section-sub">All premium servers are integrated smoothly. Each specializes in optimized content layouts for the absolute best experience.</p>
          </div>
          <div className="servers-grid">
            {servers.map((s) => (
              <div 
                key={s.name} 
                className="server-card" 
                onClick={() => openWhatsApp(s.waMsg)} 
                role="button" 
                tabIndex={0} 
                onKeyDown={(e) => e.key === 'Enter' && openWhatsApp(s.waMsg)}
              >
                <div className="card-glow" style={{ background: `radial-gradient(circle at top left, ${s.color}20, transparent 70%)` }} />
                <div className="card-top">
                  <span className="server-icon">{s.icon}</span>
                  <span className="server-tag" style={{ color: s.color, borderColor: `${s.color}55`, background: `${s.color}12` }}>{s.tag}</span>
                </div>
                <h3 className="server-name">{s.name}</h3>
                <p className="server-desc">{s.desc}</p>
                <div className="card-cta">
                  <span>Subscribe via WhatsApp</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <style jsx>{`
        .servers-section { padding:5rem 2rem;background:var(--bg-secondary);border-top:1px solid var(--border);border-bottom:1px solid var(--border); }
        .container { max-width:1200px;margin:0 auto; }
        .section-header { margin-bottom:3rem; }
        .section-tag { font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--accent-2);margin-bottom:0.75rem;font-weight:600; }
        .section-title { font-family:var(--font-display);font-size:clamp(32px,5vw,52px);font-weight:800;letter-spacing:-1px;margin-bottom:0.75rem; }
        .gradient-text { background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .section-sub { color:var(--text-secondary);font-size:15px;font-weight:300;max-width:500px;line-height:1.7; }
        .servers-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem; }
        .server-card { position:relative;background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:2rem;cursor:pointer;overflow:hidden;display:flex;flex-direction:column;gap:0.75rem;transition:border-color 0.25s,transform 0.2s,box-shadow 0.25s; }
        .server-card:hover { border-color:var(--border-hover);transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,0.3); }
        .card-glow { position:absolute;inset:0;pointer-events:none;transition:opacity 0.3s;opacity:0.6; }
        .server-card:hover .card-glow { opacity:1; }
        .card-top { display:flex;align-items:center;justify-content:space-between; }
        .server-icon { font-size:26px; }
        .server-tag { font-size:11px;letter-spacing:1.5px;text-transform:uppercase;padding:3px 10px;border-radius:4px;border:1px solid;font-weight:600; }
        .server-name { font-family:var(--font-display);font-size:34px;font-weight:800;letter-spacing:-0.5px; }
        .server-desc { color:var(--text-secondary);font-size:14px;line-height:1.7;font-weight:300;flex:1; }
        .card-cta { display:inline-flex;align-items:center;gap:6px;font-size:13px;color:var(--wa-green);font-weight:600;margin-top:0.5rem;padding-top:1rem;border-top:1px solid var(--border);transition:gap 0.2s; }
        .server-card:hover .card-cta { gap:10px; }
      `}</style>
    </>
  );
}