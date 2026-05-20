import { useState } from 'react';
import { openWhatsApp, WA_MESSAGES } from '../lib/whatsapp';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="nav-inner">
          <a href="/" className="logo">
            Horizon Streams<span>IPTV</span>
          </a>

          <div className="nav-links desktop">
            <button onClick={() => openWhatsApp(WA_MESSAGES.resellerPanel)} className="nav-link">
              Reseller Panel
            </button>
            <a href="#faq" className="nav-link">Latest News</a>
          </div>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={menuOpen ? 'open' : ''} />
            <span className={menuOpen ? 'open' : ''} />
            <span className={menuOpen ? 'open' : ''} />
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            <button onClick={() => { openWhatsApp(WA_MESSAGES.resellerPanel); setMenuOpen(false); }} className="mobile-link">
              Reseller Panel
            </button>
            <a href="#faq" className="mobile-link" onClick={() => setMenuOpen(false)}>Latest News</a>
            <button onClick={() => { openWhatsApp(WA_MESSAGES.contactUs); setMenuOpen(false); }} className="mobile-link wa">
              WhatsApp Us
            </button>
          </div>
        )}
      </nav>

      <style jsx>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(8, 8, 16, 0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }
        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          font-family: var(--font-display);
          font-size: 28px;
          letter-spacing: 2px;
          color: #fff;
        }
        .logo span {
          color: var(--accent);
        }
        .nav-links.desktop {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav-link {
          font-size: 14px;
          color: var(--text-secondary);
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-body);
          transition: color 0.2s;
          letter-spacing: 0.5px;
        }
        .nav-link:hover {
          color: #fff;
        }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: #fff;
          transition: all 0.3s;
        }
        .hamburger span.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger span.open:nth-child(2) { opacity: 0; }
        .hamburger span.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .mobile-menu {
          display: flex;
          flex-direction: column;
          padding: 1rem 2rem 1.5rem;
          gap: 0.5rem;
          border-top: 1px solid var(--border);
        }
        .mobile-link {
          font-size: 15px;
          color: var(--text-secondary);
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-body);
          text-align: left;
          padding: 0.6rem 0;
          border-bottom: 1px solid var(--border);
          transition: color 0.2s;
        }
        .mobile-link:hover { color: #fff; }
        .mobile-link.wa {
          color: var(--wa-green);
          border-bottom: none;
          margin-top: 0.25rem;
        }
        @media (max-width: 640px) {
          .nav-links.desktop { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>
    </>
  );
}
