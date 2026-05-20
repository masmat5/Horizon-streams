import { openWhatsApp, WA_MESSAGES } from '../lib/whatsapp';

const servers = [
  {
    name: 'StarShare',
    tag: 'Sports & Global',
    desc: 'Premium sports channels, international news, and entertainment from around the world.',
    waMsg: WA_MESSAGES.starShare,
    icon: '⭐',
  },
  {
    name: 'Opplex',
    tag: 'Entertainment',
    desc: 'Thousands of VOD titles, full TV seasons, movies, and kids content all in one platform.',
    waMsg: WA_MESSAGES.opplex,
    icon: '🎬',
  },
  {
    name: 'B1G',
    tag: '4K Ultra HD',
    desc: 'Crystal-clear 4K streams for the ultimate cinematic experience at home.',
    waMsg: WA_MESSAGES.b1g,
    icon: '🔷',
  },
];

export default function Servers() {
  return (
    <>
      <section className="servers-section" id="servers">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Servers</span>
            <h2 className="section-title">Choose Your <span className="accent">Server</span></h2>
            <p className="section-sub">All servers are available in every subscription plan. Pick based on your preference.</p>
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
                <div className="card-top">
                  <span className="server-icon">{s.icon}</span>
                  <span className="server-tag">{s.tag}</span>
                </div>
                <h3 className="server-name">{s.name}</h3>
                <p className="server-desc">{s.desc}</p>
                <div className="card-footer">
                  <span className="subscribe-link">
                    Subscribe via WhatsApp
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .servers-section {
          padding: 5rem 2rem;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .section-header {
          margin-bottom: 3rem;
        }
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
          margin-bottom: 0.75rem;
        }
        .accent { color: var(--accent); }
        .section-sub {
          color: var(--text-secondary);
          font-size: 15px;
          font-weight: 300;
          max-width: 480px;
          line-height: 1.7;
        }
        .servers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .server-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 2rem;
          cursor: pointer;
          transition: border-color 0.25s, background 0.25s, transform 0.2s;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .server-card:hover {
          border-color: var(--accent);
          background: var(--bg-card-hover);
          transform: translateY(-3px);
        }
        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .server-icon {
          font-size: 24px;
        }
        .server-tag {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--accent);
          background: var(--accent-soft);
          padding: 3px 10px;
          border-radius: 2px;
          font-weight: 500;
        }
        .server-name {
          font-family: var(--font-display);
          font-size: 32px;
          letter-spacing: 2px;
        }
        .server-desc {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.7;
          font-weight: 300;
          flex: 1;
        }
        .card-footer {
          margin-top: 0.5rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
        }
        .subscribe-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--wa-green);
          font-weight: 500;
          transition: gap 0.2s;
        }
        .server-card:hover .subscribe-link {
          gap: 10px;
        }
      `}</style>
    </>
  );
}
