import { openWhatsApp, WA_MESSAGES } from '../lib/whatsapp';

export default function Hero() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <p className="hero-eyebrow">The Greatest</p>
          <h1 className="hero-title">
            All In One<br />
            <span className="accent">Place</span>
          </h1>
          <p className="hero-sub">Watch unlimited movies, TV shows, and much more</p>

          <div className="hero-actions">
            <button
              className="btn-free-trial"
              onClick={() => openWhatsApp(WA_MESSAGES.freeTrial)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              </svg>
              Free Trial
            </button>
            <span className="arrow-label">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              Start your 1 day free trial
            </span>
          </div>
        </div>

        {/* Decorative TV/device mockup */}
        <div className="hero-visual">
          <div className="tv-frame">
            <div className="tv-screen">
              <div className="screen-content">
                <div className="play-icon">▶</div>
                <div className="channel-bar">
                  <span className="live-dot" />
                  LIVE • HD
                </div>
              </div>
            </div>
            <div className="tv-stand" />
          </div>
        </div>

        {/* Decorative lines */}
        <div className="deco-lines">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="deco-line" style={{ animationDelay: `${i * 0.3}s` }} />
          ))}
        </div>
      </section>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 88vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 4rem 2rem;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 70% 50%, rgba(229,9,20,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 20% 80%, rgba(229,9,20,0.05) 0%, transparent 60%);
          pointer-events: none;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        .hero-eyebrow {
          font-family: var(--font-display);
          font-size: clamp(18px, 3vw, 26px);
          letter-spacing: 6px;
          color: var(--accent);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(72px, 12vw, 140px);
          line-height: 0.9;
          letter-spacing: 3px;
          color: #fff;
          margin-bottom: 1.5rem;
        }
        .accent { color: var(--accent); }
        .hero-sub {
          font-size: clamp(15px, 2vw, 18px);
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
          font-weight: 300;
          letter-spacing: 0.5px;
        }
        .hero-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .btn-free-trial {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--wa-green);
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          padding: 14px 32px;
          border-radius: 4px;
          letter-spacing: 0.5px;
          transition: background 0.2s, transform 0.2s;
        }
        .btn-free-trial:hover {
          background: var(--wa-green-dark);
          transform: translateY(-1px);
        }
        .arrow-label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 300;
          letter-spacing: 0.5px;
        }

        /* TV Visual */
        .hero-visual {
          position: absolute;
          right: 5%;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
          opacity: 0.18;
          pointer-events: none;
        }
        .tv-frame {
          width: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .tv-screen {
          width: 100%;
          aspect-ratio: 16/10;
          background: #111;
          border: 3px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .screen-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .play-icon {
          font-size: 48px;
          color: var(--accent);
        }
        .channel-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #fff;
          background: rgba(229,9,20,0.6);
          padding: 4px 12px;
          border-radius: 2px;
        }
        .live-dot {
          width: 7px;
          height: 7px;
          background: #fff;
          border-radius: 50%;
          animation: pulse 1.5s ease-in-out infinite;
        }
        .tv-stand {
          width: 40px;
          height: 20px;
          background: rgba(255,255,255,0.15);
          clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
          margin-top: 2px;
        }

        /* Deco lines */
        .deco-lines {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 200px;
          display: flex;
          gap: 18px;
          padding: 0 20px;
          pointer-events: none;
          z-index: 0;
        }
        .deco-line {
          flex: 1;
          background: linear-gradient(to bottom, transparent, rgba(229,9,20,0.15), transparent);
          animation: linePulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes linePulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @media (max-width: 768px) {
          .hero-visual { display: none; }
          .deco-lines { display: none; }
          .hero { min-height: 70vh; }
        }
      `}</style>
    </>
  );
}
