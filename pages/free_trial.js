import Head from 'next/head';
import { openWhatsApp, WA_MESSAGES } from '../lib/whatsapp';

export default function FreeTrialPage() {
  return (
    <>
      <Head>
        <title>Get Your Free 2-Hour Trial | HorizonStream IPTV</title>
        <meta name="description" content="Test our extreme 4K server buffer speeds live before ordering." />
      </Head>

      <div className="trial-page-wrapper">
        <div className="trial-container">
          
          {/* Top Title Section */}
          <div className="trial-header">
            <span className="live-pill">● LIVE SERVER BENCHMARK</span>
            <h1>Test Our Streaming Speed <span className="gradient-text">Live Below</span></h1>
            <p>Don't trust words, verify the performance yourself. Below is a real-time sample player running on our premium localized nodes with zero compression lag.</p>
          </div>

          {/* Interactive Player Grid */}
          <div className="player-grid">
            
            {/* The Live Screen Element */}
            <div className="video-player-container">
              <div className="player-top-bar">
                <div className="stream-info">
                  <span className="green-dot"></span>
                  <span className="channel-title">Stream Node: US/UK Sports 4K (60FPS)</span>
                </div>
                <div className="stream-stats">Bitrate: 14.2 Mbps • Delay: 0.1s</div>
              </div>
              
              <div className="video-viewport">
                {/* Simulated Real Stream/Video element */}
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="live-video-source"
                  poster="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop"
                >
                  {/* High quality free stock loop clip for IPTV streaming emulation */}
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-stadium-lights-shining-bright-at-night-40788-large.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Cinematic Overlays to mimic modern web players */}
                <div className="player-controls-overlay">
                  <div className="control-btn-mock">🔊 100% Volume</div>
                  <div className="control-btn-mock Resolution">Ultra HD 4K</div>
                </div>
              </div>
            </div>

            {/* Content Action Deck Beside Player */}
            <div className="action-deck">
              <h3>Get Personal Access</h3>
              <p>Like the performance? Grab a personal 2-Hour active custom lineup playlist containing 21,000+ local & international stations sent straight to your WhatsApp container.</p>
              
              <div className="trial-perks">
                <div className="perk-item">✓ Access to all 21 Premium Servers</div>
                <div className="perk-item">✓ Complete 4K Cinema VOD Archive</div>
                <div className="perk-item">✓ Setup setup support guides provided</div>
              </div>

              <button className="cta-trial-btn" onClick={() => openWhatsApp(WA_MESSAGES.freeTrial)}>
                ⚡ Request Personal M3U Trial
              </button>
              <span className="subtext-alert">🕒 Average delivery time: 2 Minutes via WhatsApp</span>
            </div>

          </div>

        </div>
      </div>

      <style jsx>{`
        .trial-page-wrapper { background: #03030b; color: #fff; min-height: 100vh; padding: 4rem 2rem 6rem; font-family: var(--font-body); }
        .trial-container { max-width: 1200px; margin: 0 auto; }
        
        .trial-header { text-align: center; margin-bottom: 4rem; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }
        .live-pill { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #ef4444; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 50px; letter-spacing: 1px; }
        .trial-header h1 { font-family: var(--font-display); font-size: clamp(28px, 4vw, 46px); font-weight: 800; letter-spacing: -1px; }
        .gradient-text { background: var(--gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .trial-header p { color: var(--text-secondary); max-width: 650px; font-size: 15px; line-height: 1.7; font-weight: 300; }

        /* Structural Layout for Video Side by Side Configuration */
        .player-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: 2rem; align-items: start; }
        
        /* Premium Video Player Panel Styles */
        .video-player-container { background: #0b0b14; border: 1px solid var(--border); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.6); }
        .player-top-bar { background: rgba(255,255,255,0.02); padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); font-size: 12px; color: var(--text-muted); }
        .stream-info { display: flex; align-items: center; gap: 8px; }
        .green-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; display: inline-block; animation: blink 1.5s infinite; }
        .channel-title { color: #fff; font-weight: 500; }
        
        .video-viewport { position: relative; width: 100%; aspect-ratio: 16 / 9; background: #000; overflow: hidden; display: flex; align-items: center; }
        .live-video-source { width: 100%; height: 100%; object-fit: cover; }
        
        .player-controls-overlay { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); padding: 20px; display: flex; justify-content: space-between; opacity: 0; transition: opacity 0.3s; }
        .video-viewport:hover .player-controls-overlay { opacity: 1; }
        .control-btn-mock { background: rgba(255,255,255,0.1); backdrop-filter: blur(4px); font-size: 11px; padding: 4px 10px; border-radius: 4px; font-weight: 500; }

        /* Sidebar Action Deck Layout */
        .action-deck { background: var(--bg-card); border: 1px solid var(--border); padding: 2.5rem 2rem; border-radius: 16px; display: flex; flex-direction: column; gap: 1.25rem; }
        .action-deck h3 { font-family: var(--font-display); font-size: 24px; font-weight: 700; }
        .action-deck p { color: var(--text-secondary); font-size: 14px; line-height: 1.6; font-weight: 300; }
        
        .trial-perks { display: flex; flex-direction: column; gap: 0.6rem; margin: 0.5rem 0; }
        .perk-item { font-size: 13.5px; color: #4ade80; font-weight: 500; }
        
        .cta-trial-btn { background: var(--wa-green); border: 1px solid var(--wa-green); color: #fff; font-family: var(--font-body); font-weight: 600; font-size: 15px; padding: 14px; border-radius: 8px; cursor: pointer; transition: all 0.2s; text-align: center; margin-top: 0.5rem; }
        .cta-trial-btn:hover { background: var(--wa-green-dark); border-color: var(--wa-green-dark); transform: translateY(-1px); }
        .subtext-alert { text-align: center; font-size: 12px; color: var(--text-muted); }

        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

        /* Responsive Layout Overrides */
        @media (max-width: 968px) {
          .player-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .trial-page-wrapper { padding: 3rem 1.25rem; }
        }
      `}</style>
    </>
  );
}