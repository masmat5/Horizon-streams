const features = [
  { icon: '📡', title: 'Stable Servers', desc: '99.9% uptime guaranteed across all 21 premium servers. No buffering, no interruptions.' },
  { icon: '🌍', title: '10,000+ Channels', desc: 'Local, international, sports, movies, news, and kids content — all in one place.' },
  { icon: '📱', title: 'All Devices', desc: 'Works on Smart TV, Android, iOS, Windows, Fire Stick, and any IPTV-compatible device.' },
  { icon: '⚡', title: 'Instant Activation', desc: 'Order on WhatsApp and get activated within minutes. No waiting, no forms.' },
  { icon: '🔒', title: 'Secure & Private', desc: 'Your subscription is managed securely through direct WhatsApp communication.' },
  { icon: '🎬', title: '4K Quality', desc: 'Ultra HD streams on compatible channels through our B1G server for a crystal-clear picture.' },
];

export default function Features() {
  return (
    <>
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Why HorizonStream IPTV</p>
            <h2 className="section-title">Everything You <span className="gradient-text">Need</span></h2>
          </div>
          <div className="features-grid">
            {features.map((f) => (
              <div key={f.title} className="feature-item">
                <span className="feature-icon">{f.icon}</span>
                <div>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <style jsx>{`
        .features-section { padding:5rem 2rem;background:var(--bg-primary); }
        .container { max-width:1200px;margin:0 auto; }
        .section-header { margin-bottom:3rem; }
        .section-tag { font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--accent-2-text);margin-bottom:0.75rem;font-weight:600; }
        .section-title { font-family:var(--font-display);font-size:clamp(32px,5vw,52px);font-weight:800;letter-spacing:-1px; }
        .gradient-text { background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .features-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem; }
        .feature-item { display:flex;gap:1.25rem;align-items:flex-start;background:var(--bg-card);border:1px solid var(--border);border-radius:14px;padding:1.5rem;transition:border-color 0.2s; }
        .feature-item:hover { border-color:var(--border-hover); }
        .feature-icon { font-size:28px;flex-shrink:0;margin-top:2px; }
        .feature-title { font-size:16px;font-weight:600;margin-bottom:0.4rem;letter-spacing:0.2px; }
        .feature-desc { font-size:14px;color:var(--text-secondary);line-height:1.7;font-weight:300; }
      `}</style>
    </>
  );
}
