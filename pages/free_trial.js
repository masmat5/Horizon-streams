import { useState, useEffect, useRef } from 'react';
import { openWhatsApp, WA_MESSAGES } from '../lib/whatsapp';
import SEOHead, { SITE_URL } from '../components/SEOHead';

const freeTrialSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Free Trial', item: `${SITE_URL}/free_trial` },
  ],
};

const LIVE_CHANNELS = [
  { name: "Geo News", id: "1oJqX8-Gklo" },
  { name: "India Today", id: "sYZtOFzM78M" },
  { name: "GBNews", id: "QliL4CGc7iY" },
  { name: "Oneindia News", id: "vkOALDnyShI" },
  { name: "Sky News", id: "u03OWmaMopg" }
];

export default function FreeTrialPage() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [apiReady, setApiReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef(null);

  // Load official YouTube Iframe Player API asynchronously
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      
      window.onYouTubeIframeAPIReady = () => {
        setApiReady(true);
      };
    } else {
      setApiReady(true);
    }
  }, []);

  // Re-initialize player nodes whenever array index transitions occur
  useEffect(() => {
    if (!apiReady) return;

    if (playerRef.current && typeof playerRef.current.destroy === 'function') {
      try {
        playerRef.current.destroy();
      } catch (e) {
        console.error(e);
      }
    }

    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';

    playerRef.current = new window.YT.Player('youtube-embedded-stream', {
      videoId: LIVE_CHANNELS[currentTrack].id,
      playerVars: {
        autoplay: 1,
        mute: isMuted ? 1 : 0,
        controls: 0,
        rel: 0,
        showinfo: 0,
        modestbranding: 1,
        iv_load_policy: 3,
        playsinline: 1,
        fs: 0,
        origin: currentOrigin
      },
      events: {
        onReady: (event) => {
          event.target.playVideo();
          if (!isMuted) {
            event.target.unMute();
            event.target.setVolume(100);
          } else {
            event.target.mute();
          }
        },
        onStateChange: (event) => {
          // Jab video ENDED (0) ho jaye, toh free trial par shift nahi karna, direct WhatsApp order trigger hoga
          if (event.data === window.YT.PlayerState.ENDED) {
            redirectToWhatsAppPurchase();
          }
        },
        onError: (event) => {
          console.log("Stream node interrupted.");
        }
      }
    });

    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.error(e);
        }
      }
    };
  }, [currentTrack, apiReady]);

  // Direct Purchase Redirect Helper
  const redirectToWhatsAppPurchase = () => {
    // Agar WA_MESSAGES.buyPackage ya similar predefined text hai toh use karein, otherwise customizable template text pass kiya hai
    if (WA_MESSAGES && WA_MESSAGES.buyPackage) {
      openWhatsApp(WA_MESSAGES.buyPackage);
    } else {
      openWhatsApp("Hi, I checked your live stream benchmark. I want to buy a Premium IPTV Package. Please share the pricing details.");
    }
  };

  const toggleSound = () => {
    if (playerRef.current && typeof playerRef.current.unMute === 'function') {
      if (isMuted) {
        playerRef.current.unMute();
        playerRef.current.setVolume(100);
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } else {
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <SEOHead
        title="Free IPTV Trial — Watch Live Streaming Speed Test | HorizonStream IPTV"
        description="Try HorizonStream IPTV free before you subscribe. Watch a live streaming speed benchmark, verify zero-buffer 4K performance, then get instant premium access via WhatsApp."
        keywords="free IPTV trial, IPTV trial 2026, test IPTV streaming, IPTV speed test, no buffering IPTV, HorizonStream free trial"
        canonical={`${SITE_URL}/free_trial`}
        structuredData={freeTrialSchema}
      />

      <div className="trial-page-wrapper">
        <div className="trial-container">
          
          <div className="trial-header">
            <span className="live-pill">● LIVE SERVER BENCHMARK</span>
            <h1>Test Our Streaming Speed <span className="gradient-text">Live Below</span></h1>
            <p>Don't trust words, verify the performance yourself. Below is a real-time sample player running on our premium localized nodes with zero compression lag.</p>
          </div>

          <div className="channel-switch-bar">
            {LIVE_CHANNELS.map((channel, index) => (
              <button 
                key={channel.id} 
                className={`channel-nav-btn ${currentTrack === index ? 'active-node' : ''}`}
                onClick={() => setCurrentTrack(index)}
              >
                <span className="pulse-indicator"></span>
                {channel.name}
              </button>
            ))}
          </div>

          <div className="player-grid">
            
            <div className="video-player-container">
              <div className="player-top-bar">
                <div className="stream-info">
                  <span className="green-dot"></span>
                  <span className="channel-title">Stream Node: {LIVE_CHANNELS[currentTrack].name} (Premium 4K)</span>
                </div>
                <div className="stream-stats">Bitrate: 14.2 Mbps • Delay: 0.1s</div>
              </div>
              
              <div className="video-viewport">
                
                <div className="iframe-wrapper">
                  <div id="youtube-embedded-stream"></div>
                </div>
                
                <div className="player-controls-overlay">
                  <button className="sound-toggle-btn" onClick={toggleSound}>
                    {isMuted ? '🔇 Tap to Unmute' : '🔊 Mute Sound'}
                  </button>
                  <div className="control-btn-mock resolution-tag">Ultra HD 4K (Live)</div>
                </div>
              </div>
            </div>

            {/* Updated Action Deck focusing on Premium Packages instead of Free Trial */}
            <div className="action-deck">
              <h3>Get Instant Premium Access</h3>
              <p>Satisfied with the performance? Order your premium dedicated subscription lineup today and unlock over 21,000+ global channels with absolute stable connections.</p>
              
              <div className="trial-perks">
                <div className="perk-item">✓ 21,000+ Premium Live Channels (4K/HD)</div>
                <div className="perk-item">✓ Huge VOD Library (Latest Movies & Series)</div>
                <div className="perk-item">✓ Anti-Freeze & No-Buffer Server Technology</div>
                <div className="perk-item">✓ 24/7 Dedicated WhatsApp Support Setup</div>
              </div>

              <button className="cta-trial-btn" onClick={redirectToWhatsAppPurchase}>
                ⚡ Order Premium Package via WhatsApp
              </button>
              <span className="subtext-alert">🕒 Setup Delivery Time: Under 5 Minutes via WhatsApp</span>
            </div>

          </div>

        </div>
      </div>

      <style jsx>{`
        .trial-page-wrapper { background: #03030b; color: #fff; min-height: 100vh; padding: 4rem 2rem 6rem; font-family: var(--font-body); }
        .trial-container { max-width: 1200px; margin: 0 auto; }
        
        .trial-header { text-align: center; margin-bottom: 2.5rem; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }
        .live-pill { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #ef4444; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 50px; letter-spacing: 1px; }
        .trial-header h1 { font-family: var(--font-display); font-size: clamp(28px, 4vw, 46px); font-weight: 800; letter-spacing: -1px; }
        .gradient-text { background: var(--gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .trial-header p { color: var(--text-secondary); max-width: 650px; font-size: 15px; line-height: 1.7; font-weight: 300; }

        .channel-switch-bar { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.5rem; width: 100%; justify-content: flex-start; }
        .channel-nav-btn { background: #0b0b14; border: 1px solid var(--border); color: var(--text-secondary); font-family: var(--font-body); font-size: 13px; font-weight: 500; padding: 10px 18px; border-radius: 8px; cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); display: flex; align-items: center; gap: 8px; }
        .channel-nav-btn:hover { background: rgba(255, 255, 255, 0.03); color: #fff; border-color: rgba(255,255,255,0.2); }
        .active-node { background: rgba(124, 58, 237, 0.1) !important; border-color: #7c3aed !important; color: #fff !important; font-weight: 600; box-shadow: 0 4px 20px rgba(124, 58, 237, 0.15); }
        
        .pulse-indicator { width: 6px; height: 6px; background: transparent; border-radius: 50%; display: inline-block; }
        .active-node .pulse-indicator { background: #a78bfa; box-shadow: 0 0 8px #a78bfa; animation: blink 1.2s infinite; }

        .player-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: 2rem; align-items: start; }
        
        .video-player-container { background: #0b0b14; border: 1px solid var(--border); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.6); }
        .player-top-bar { background: rgba(255,255,255,0.02); padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); font-size: 12px; color: var(--text-muted); }
        .stream-info { display: flex; align-items: center; gap: 8px; }
        .green-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; display: inline-block; animation: blink 1.5s infinite; }
        .channel-title { color: #fff; font-weight: 500; }
        
        .video-viewport { position: relative; width: 100%; aspect-ratio: 16 / 9; background: #000; overflow: hidden; display: flex; align-items: center; }
        
        .iframe-wrapper { width: 100%; height: 100%; position: relative; pointer-events: none; }
        .iframe-wrapper :global(iframe) { width: 100% !important; height: 100% !important; position: absolute; top:0; left:0; object-fit: cover; transform: scale(1.35); }
        
        .player-controls-overlay { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.2), transparent); padding: 20px; display: flex; justify-content: space-between; align-items: center; z-index: 10; }
        
        .sound-toggle-btn { background: #7c3aed; border: none; color: #fff; font-size: 12px; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: background 0.2s, transform 0.2s; box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3); }
        .sound-toggle-btn:hover { background: #6d28d9; transform: scale(1.02); }
        
        .control-btn-mock { background: rgba(255,255,255,0.1); backdrop-filter: blur(4px); font-size: 11px; padding: 6px 12px; border-radius: 6px; font-weight: 500; }
        .resolution-tag { border: 1px solid rgba(255,255,255,0.15); color: #4ade80; }

        .action-deck { background: var(--bg-card); border: 1px solid var(--border); padding: 2.5rem 2rem; border-radius: 16px; display: flex; flex-direction: column; gap: 1.25rem; }
        .action-deck h3 { font-family: var(--font-display); font-size: 24px; font-weight: 700; }
        .action-deck p { color: var(--text-secondary); font-size: 14px; line-height: 1.6; font-weight: 300; }
        
        .trial-perks { display: flex; flex-direction: column; gap: 0.6rem; margin: 0.5rem 0; }
        .perk-item { font-size: 13.5px; color: #4ade80; font-weight: 500; }
        
        .cta-trial-btn { background: var(--wa-green); border: 1px solid var(--wa-green); color: #fff; font-family: var(--font-body); font-weight: 600; font-size: 15px; padding: 14px; border-radius: 8px; cursor: pointer; transition: all 0.2s; text-align: center; margin-top: 0.5rem; }
        .cta-trial-btn:hover { background: var(--wa-green-dark); border-color: var(--wa-green-dark); transform: translateY(-1px); }
        .subtext-alert { text-align: center; font-size: 12px; color: var(--text-muted); }

        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

        @media (max-width: 968px) {
          .player-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .trial-page-wrapper { padding: 3rem 1.25rem; }
          .channel-switch-bar { justify-content: flex-start; gap: 0.5rem; }
          .channel-nav-btn { padding: 8px 14px; font-size: 12px; }
        }
      `}</style>
    </>
  );
}