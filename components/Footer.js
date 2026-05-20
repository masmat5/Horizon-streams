import { openWhatsApp, WA_MESSAGES } from '../lib/whatsapp';

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="logo">Horizon Streams<span>IPTV</span></div>
              <p className="brand-desc">
                Premium IPTV streaming service with access to StarShare, Opplex, and B1G servers.
                Thousands of channels, movies, and shows at your fingertips.
              </p>
              <button
                className="btn-wa"
                onClick={() => openWhatsApp(WA_MESSAGES.general)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                +92 344 6855083
              </button>
            </div>

            <div className="footer-links">
              <div className="links-col">
                <h4>Servers</h4>
                <button onClick={() => openWhatsApp(WA_MESSAGES.starShare)}>StarShare</button>
                <button onClick={() => openWhatsApp(WA_MESSAGES.opplex)}>Opplex</button>
                <button onClick={() => openWhatsApp(WA_MESSAGES.b1g)}>B1G 4K</button>
              </div>
              <div className="links-col">
                <h4>Plans</h4>
                <button onClick={() => openWhatsApp('Hello Horizon Streams IPTV! I want the 1 Month plan.')}>1 Month</button>
                <button onClick={() => openWhatsApp('Hello Horizon Streams IPTV! I want the 3 Month plan.')}>3 Months</button>
                <button onClick={() => openWhatsApp('Hello Horizon Streams IPTV! I want the 1 Year plan.')}>1 Year</button>
              </div>
              <div className="links-col">
                <h4>Support</h4>
                <button onClick={() => openWhatsApp(WA_MESSAGES.freeTrial)}>Free Trial</button>
                <button onClick={() => openWhatsApp(WA_MESSAGES.resellerPanel)}>Reseller Panel</button>
                <button onClick={() => openWhatsApp(WA_MESSAGES.contactUs)}>Contact Us</button>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Horizon Streams IPTV. All rights reserved.</p>
            <p className="footer-sub">Opplex · StarShare · B1G</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          padding: 4rem 2rem 2rem;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        .footer-top {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4rem;
          margin-bottom: 3rem;
        }
        .logo {
          font-family: var(--font-display);
          font-size: 32px;
          letter-spacing: 2px;
          margin-bottom: 1rem;
        }
        .logo span { color: var(--accent); }
        .brand-desc {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.8;
          font-weight: 300;
          margin-bottom: 1.5rem;
          max-width: 360px;
        }
        .btn-wa {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--wa-green);
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          padding: 10px 20px;
          border-radius: 4px;
          font-family: var(--font-body);
          transition: background 0.2s;
        }
        .btn-wa:hover { background: var(--wa-green-dark); }
        .footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .links-col {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .links-col h4 {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 500;
          margin-bottom: 0.25rem;
        }
        .links-col button {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 14px;
          font-family: var(--font-body);
          cursor: pointer;
          text-align: left;
          padding: 0;
          font-weight: 300;
          transition: color 0.2s;
        }
        .links-col button:hover { color: #fff; }
        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .footer-bottom p {
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 300;
        }
        .footer-sub { letter-spacing: 1px; }
        @media (max-width: 768px) {
          .footer-top { grid-template-columns: 1fr; gap: 2.5rem; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </>
  );
}
