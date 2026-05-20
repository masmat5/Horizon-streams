const features = [
  { icon: '📡', title: 'Stable Servers', desc: '99.9% uptime guaranteed across all three servers. No buffering, no interruptions.' },
  { icon: '🎯', title: '10,000+ Channels', desc: 'Local, international, sports, movies, news, and kids content — all in one place.' },
  { icon: '📱', title: 'All Devices', desc: 'Works on Smart TV, Android, iOS, Windows, and any IPTV-compatible device.' },
  { icon: '⚡', title: 'Instant Activation', desc: 'Order on WhatsApp and get activated within minutes. No waiting, no forms.' },
  { icon: '🔒', title: 'Secure & Private', desc: 'Your subscription is private and managed securely through direct WhatsApp communication.' },
  { icon: '🎬', title: '4K Quality', desc: 'Ultra HD streams on compatible channels through our B1G server for crystal-clear picture.' },
];

export default function Features() {
  return (
    <>
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why Horizon Streams IPTV</span>
            <h2 className="section-title">Everything You <span className="accent">Need</span></h2>
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
        .features-section {
          padding: 5rem 2rem;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .container { max-width: 1200px; margin: 0 auto; }
        .section-header { margin-bottom: 3rem; }
        .section-tag {
          display: inline-block;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.75rem;
          font-weight: 500;
        }
        .section-title {
          font-family: var(--font-display);
          font-size: clamp(36px, 5vw, 56px);
          letter-spacing: 2px;
        }
        .accent { color: var(--accent); }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        .feature-item {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
        }
        .feature-icon {
          font-size: 28px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .feature-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 0.4rem;
          letter-spacing: 0.3px;
        }
        .feature-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
          font-weight: 300;
        }
      `}</style>
    </>
  );
}
