import { useState } from 'react';
import Link from 'next/link';
import { openWhatsApp, WA_MESSAGES } from '../lib/whatsapp';
import { free_trial } from './free_trial';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav className="navbar">
        <div className="nav-inner">
          <Link href="/" className="logo">HorizonStream<span>IPTV</span></Link>
          <div className="nav-links desktop">
            <Link href="/#servers" className="nav-link">Servers</Link>
            <Link href="/#plans" className="nav-link">Plans</Link>
            <Link href="/latest-news" className="nav-link">Latest News</Link>
            <Link href="/reseller" className="nav-link">Reseller</Link>
          </div>
          <div className="nav-actions desktop">
            <button onClick={() => free_trial()} className="btn-trial">Free Trial</button>
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span className={menuOpen ? 'open' : ''} /><span className={menuOpen ? 'open' : ''} /><span className={menuOpen ? 'open' : ''} />
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            <Link href="/#servers" className="mobile-link" onClick={() => setMenuOpen(false)}>Servers</Link>
            <Link href="/#plans" className="mobile-link" onClick={() => setMenuOpen(false)}>Plans</Link>
            <Link href="/latest-news" className="mobile-link" onClick={() => setMenuOpen(false)}>Latest News</Link>
            <Link href="/reseller" className="mobile-link" onClick={() => setMenuOpen(false)}>Reseller Panel</Link>
            <button onClick={() => { openWhatsApp(WA_MESSAGES.freeTrial); setMenuOpen(false); }} className="mobile-cta">🎬 Start Free Trial</button>
          </div>
        )}
      </nav>
      <style jsx>{`
        .navbar { position:sticky;top:0;z-index:100;background:rgba(6,6,15,0.93);backdrop-filter:blur(16px);border-bottom:1px solid var(--border); }
        .nav-inner { max-width:1200px;margin:0 auto;padding:0.9rem 2rem;display:flex;align-items:center;gap:2rem; }
        .logo { font-family:var(--font-display);font-size:22px;font-weight:800;color:#fff;flex-shrink:0;letter-spacing:1px; }
        .logo span { color:var(--accent); }
        .nav-links.desktop { display:flex;align-items:center;gap:1.75rem;flex:1; }
        .nav-link { font-size:14px;color:var(--text-secondary);font-weight:400;letter-spacing:0.3px;transition:color 0.2s;white-space:nowrap; }
        .nav-link:hover { color:var(--text-primary); }
        .nav-actions.desktop { display:flex;align-items:center; }
        .btn-trial { background:var(--gradient);color:#fff;font-size:13px;font-weight:600;padding:9px 22px;border-radius:50px;transition:opacity 0.2s,transform 0.2s;white-space:nowrap; }
        .btn-trial:hover { opacity:0.85;transform:translateY(-1px); }
        .hamburger { display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:4px;margin-left:auto; }
        .hamburger span { display:block;width:22px;height:2px;background:#fff;transition:all 0.3s;border-radius:2px; }
        .hamburger span.open:nth-child(1){transform:translateY(7px) rotate(45deg);}
        .hamburger span.open:nth-child(2){opacity:0;}
        .hamburger span.open:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
        .mobile-menu { display:flex;flex-direction:column;padding:1rem 2rem 1.5rem;gap:0.25rem;border-top:1px solid var(--border); }
        .mobile-link { font-size:15px;color:var(--text-secondary);padding:0.65rem 0;border-bottom:1px solid var(--border);transition:color 0.2s; }
        .mobile-link:hover { color:#fff; }
        .mobile-cta { margin-top:0.75rem;background:var(--gradient);color:#fff;font-size:15px;font-weight:600;padding:12px;border-radius:8px;font-family:var(--font-body);border:none;cursor:pointer; }
        @media(max-width:768px){ .nav-links.desktop,.nav-actions.desktop{display:none;} .hamburger{display:flex;} }
      `}</style>
    </>
  );
}
