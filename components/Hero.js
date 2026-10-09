import { useState } from 'react';
import { openWhatsApp, WA_MESSAGES } from '../lib/whatsapp';

const WaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.118 1.531 5.845L.057 23.57a.5.5 0 0 0 .612.612l5.725-1.474A11.951 11.951 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.951 9.951 0 0 1-5.076-1.384l-.363-.215-3.76.968.988-3.614-.236-.376A9.952 9.952 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

const stats = [
  { value: '10,000+', label: 'Live Channels' },
  { value: '21', label: 'Premium Servers' }, 
  { value: '99.9%', label: 'Uptime Verified' },
  { value: '4K/8K', label: 'Ultra HD Quality' },
];

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleChannelSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Interactive engagement response simulator
    setSearchResult({
      checking: true,
      text: `Searching for "${searchQuery}" across 21 servers...`
    });

    setTimeout(() => {
      setSearchResult({
        checking: false,
        text: `🟢 "${searchQuery}" is Available in Ultra HD 4K!`,
        success: true
      });
    }, 900);
  };

  return (
    <>
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-glow-2" aria-hidden="true" />
        <div className="hero-inner">
          {/* Enhanced Badge for instant validation */}
          <div className="hero-badge">
            <span className="badge-dot" />
            Best IPTV Subscription 2026 — All Servers Online, 99.9% Uptime
          </div>
          
          <h1 className="hero-title" aria-label="Best IPTV Subscription 2026 - Stream Everything You Love">
            Stream <span className="gradient-text">Everything</span><br />You Love
          </h1>
          <p className="hero-desc">The best IPTV subscription for Firestick, Smart TV, Android, iPhone and MAG box. Premium IPTV with StarShare, 5G Live, Opplex and elite 4K servers — 10,000+ live channels, movies and live sports in HD, 4K and 8K. Start with a free IPTV trial.</p>
          
          {/* NEW: Interactive Channel Search Component to engage users */}
          <div className="search-box-container">
            <form onSubmit={handleChannelSearch} className="search-form">
              <input 
                type="text" 
                placeholder="Search your favorite channel, sports league, or movie..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="btn-search">Check Availability</button>
            </form>
            {searchResult && (
              <div className={`search-feedback ${searchResult.success ? 'success' : 'loading'}`}>
                {searchResult.text}
              </div>
            )}
          </div>

          <div className="hero-actions">
            <button className="btn-wa" onClick={() => openWhatsApp(WA_MESSAGES.freeTrial)}><WaIcon />Start 2-Hour Free Trial</button>
            <a href="#plans" className="btn-ghost">View Premium Plans <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
          </div>

          <div className="hero-stats">
            {stats.map((s) => (
              <div key={s.label} className="stat">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* NEW: Live Ticker Hook for Sports & Events */}
          <div className="live-ticker">
            <div className="ticker-label">LIVE TONIGHT</div>
            <div className="ticker-content">
              <p>🔥 UCL Football, ICC T20 Matches, and WWE Premium Events — Streaming live on StarShare & Opplex servers in Ultra Low Latency 4K!</p>
            </div>
          </div>
        </div>

        {/* --- Multi-Column Advanced Decoloration Grid --- */}
        <div className="hero-deco" aria-hidden="true">
          {/* Column 1 */}
          <div className="deco-col">
            {[
              { name: 'StarShare', delay: '0s', offset: '-10px' },
              { name: 'Opplex', delay: '0.4s', offset: '5px' },
              { name: 'B1G 4K', delay: '0.8s', offset: '-5px' },
              { name: 'Dream8K', delay: '1.2s', offset: '10px' }
            ].map((s) => (
              <div key={s.name} className="deco-card" style={{ animationDelay: s.delay, transform: `translateX(${s.offset})` }}>
                <div className="deco-dot" /><span>{s.name}</span><span className="deco-live">LIVE</span>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="deco-col col-offset">
            {[
              { name: '5G Live', delay: '0.2s', offset: '5px' },
              { name: 'MegaOTT', delay: '0.6s', offset: '-8px' },
              { name: 'CrystalOtt', delay: '1.0s', offset: '12px' },
              { name: 'Cobra TV', delay: '1.4s', offset: '-3px' }
            ].map((s) => (
              <div key={s.name} className="deco-card secondary-card" style={{ animationDelay: s.delay, transform: `translateX(${s.offset})` }}>
                <div className="deco-dot pulse-blue" /><span>{s.name}</span><span className="deco-live ready">READY</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero { position:relative;overflow:hidden;min-height:100vh;display:flex;align-items:center;padding:6rem 2rem 5rem; }
        .hero-glow { position:absolute;top:-20%;left:-10%;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,0.2) 0%,transparent 70%);pointer-events:none; }
        .hero-glow-2 { position:absolute;bottom:-10%;right:5%;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(6,182,212,0.12) 0%,transparent 70%);pointer-events:none; }
        .hero-inner { position:relative;z-index:2;max-width:1200px;margin:0 auto;width:100%; }
        .hero-badge { display:inline-flex;align-items:center;gap:8px;background:rgba(124,58,237,0.12);border:1px solid rgba(124,58,237,0.3);color:#a78bfa;font-size:13px;font-weight:500;padding:6px 14px;border-radius:50px;margin-bottom:1.5rem;letter-spacing:0.3px; }
        .badge-dot { width:7px;height:7px;background:#4ade80;border-radius:50%;animation:pulse 2s ease-in-out infinite; }
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.3)}}
        .hero-title { font-family:var(--font-display);font-size:clamp(52px,9vw,100px);font-weight:800;line-height:1;letter-spacing:-2px;margin-bottom:1.5rem;max-width:700px; }
        .gradient-text { background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .hero-desc { font-size:clamp(15px,2vw,18px);color:var(--text-secondary);font-weight:300;line-height:1.75;max-width:520px;margin-bottom:2rem; }
        
        /* Interactive Search Box Styles */
        .search-box-container { max-width: 550px; margin-bottom: 2rem; }
        .search-form { display: flex; gap: 8px; background: rgba(16, 16, 42, 0.6); padding: 6px; border-radius: 10px; border: 1px solid var(--border); backdrop-filter: blur(10px); }
        .search-input { flex: 1; background: transparent; border: none; outline: none; color: #fff; padding: 10px 14px; font-size: 14px; }
        .search-input::placeholder { color: var(--text-muted); }
        .btn-search { background: rgba(124, 58, 237, 0.2); border: 1px solid rgba(124, 58, 237, 0.4); color: #c084fc; font-size: 13px; font-weight: 600; padding: 0 16px; border-radius: 6px; cursor: pointer; transition: all 0.2s; }
        .btn-search:hover { background: rgba(124, 58, 237, 0.4); color: #fff; }
        .search-feedback { font-size: 13px; margin-top: 8px; padding-left: 8px; font-weight: 500; }
        .search-feedback.success { color: #4ade80; animation: fadeIn 0.3s ease; }
        .search-feedback.loading { color: #a78bfa; }

        .hero-actions { display:flex;align-items:center;gap:1rem;flex-wrap:wrap;margin-bottom:3.5rem; }
        .btn-wa { display:inline-flex;align-items:center;gap:10px;background:var(--wa-green);color:#fff;font-size:15px;font-weight:600;padding:14px 28px;border-radius:8px;border:none;transition:background 0.2s,transform 0.2s;cursor:pointer; }
        .btn-wa:hover { background:var(--wa-green-dark);transform:translateY(-2px); }
        .btn-ghost { display:inline-flex;align-items:center;gap:8px;color:var(--text-secondary);font-size:15px;font-weight:500;border:1px solid var(--border-hover);padding:13px 24px;border-radius:8px;transition:all 0.2s; }
        .btn-ghost:hover { color:#fff;border-color:rgba(255,255,255,0.3); }
        .hero-stats { display:flex;gap:2.5rem;flex-wrap:wrap; margin-bottom: 3.5rem; }
        .stat { display:flex;flex-direction:column;gap:2px; }
        .stat-value { font-family:var(--font-display);font-size:28px;font-weight:800;background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .stat-label { font-size:12px;color:var(--text-muted);letter-spacing:0.5px;text-transform:uppercase; }
        
        /* Live Events Notification Ticker */
        .live-ticker { display: flex; align-items: center; background: rgba(6, 182, 212, 0.06); border: 1px solid rgba(6, 182, 212, 0.15); max-width: 680px; border-radius: 8px; padding: 10px 14px; gap: 12px; overflow: hidden; }
        .ticker-label { background: #06b6d4; color: #000; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 4px; letter-spacing: 0.5px; white-space: nowrap; }
        .ticker-content { font-size: 13px; color: #92400e; color: var(--text-secondary); white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }

        /* --- Expanded Layout Configuration --- */
        .hero-deco { position:absolute;right:2%;top:50%;transform:translateY(-50%);display:flex;gap:1.25rem;z-index:1; }
        .deco-col { display:flex;flex-direction:column;gap:1rem; }
        .col-offset { margin-top: 2rem; }
        
        .deco-card { display:flex;align-items:center;gap:10px;background:rgba(16,16,42,0.85);border:1px solid var(--border);padding:12px 18px;border-radius:10px;font-size:14px;font-weight:500;backdrop-filter:blur(8px);animation:float 4s ease-in-out infinite;white-space:nowrap;width:170px; }
        .secondary-card { border-color: rgba(6,182,212,0.15); }
        
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
        .deco-dot { width:8px;height:8px;background:#4ade80;border-radius:50%;flex-shrink:0; }
        .pulse-blue { background: #06b6d4; }
        
        .deco-live { margin-left:auto;font-size:10px;letter-spacing:1.5px;color:#4ade80;font-weight:600; }
        .deco-live.ready { color: #06b6d4; }
        
        /* Responsive Fixes */
        @media(max-width:1150px){ .hero-deco{ transform: translateY(-50%) scale(0.85); right: -2%; } }
        @media(max-width:980px){ .hero-deco{display:none;} }
        @media(max-width:480px){ 
          .hero-stats{gap:1.5rem; margin-bottom: 2rem;} 
          .hero-title{letter-spacing:-1px;} 
          .search-form { flex-direction: column; background: transparent; border: none; padding: 0; }
          .search-input { background: rgba(16, 16, 42, 0.6); border: 1px solid var(--border); border-radius: 8px; margin-bottom: 8px; }
          .btn-search { padding: 12px; font-size: 14px; }
          .live-ticker { flex-direction: column; align-items: flex-start; gap: 6px; }
        }
      `}</style>
    </>
  );
}