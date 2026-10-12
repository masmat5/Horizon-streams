import { useState, useEffect } from 'react';
import { openWhatsApp, WA_MESSAGES } from '../lib/whatsapp';

// Mock high-converting data mimicking real local sales activity
const notificationData = [
  // --- PAKISTAN LOCAL ---
  { name: 'Ali from Lahore', action: 'purchased 3-Months Opplex Sub', time: '2 mins ago', icon: '🍿' },
  { name: 'Zain from Karachi', action: 'activated Free 2-Hour Trial', time: '5 mins ago', icon: '⚡' },
  { name: 'Kamran from Islamabad', action: 'renewed 1-Year StarShare Plan', time: '12 mins ago', icon: '👑' },
  { name: 'Fahad from Faisalabad', action: 'purchased 1-Month B1G 4K Line', time: '18 mins ago', icon: '🔷' },
  { name: 'Umer from Rawalpindi', action: 'activated Free 2-Hour Trial', time: '24 mins ago', icon: '⚡' },
  { name: 'Bilal from Multan', action: 'purchased 6-Months MegaOTT Pack', time: '32 mins ago', icon: '🚀' },
  { name: 'Asif from Peshawar', action: 'activated Free 2-Hour Trial', time: '1 min ago', icon: '⚡' },
  { name: 'Hamza from Gujranwala', action: 'purchased 1-Year Premium Plan', time: '4 mins ago', icon: '👑' },
  { name: 'Sana from Sialkot', action: 'renewed 3-Months Server 2 Pack', time: '7 mins ago', icon: '🍿' },
  { name: 'Tariq from Quetta', action: 'purchased 6-Months 4K Access', time: '9 mins ago', icon: '🚀' },
  { name: 'Yasir from Hyderabad', action: 'activated Free 2-Hour Trial', time: '11 mins ago', icon: '⚡' },
  { name: 'Noman from Sargodha', action: 'purchased 1-Month Starter Line', time: '14 mins ago', icon: '🔷' },
  { name: 'Waqas from Bahawalpur', action: 'renewed 1-Year VIP Access', time: '16 mins ago', icon: '👑' },
  { name: 'Farhan from Sukkur', action: 'activated Free 2-Hour Trial', time: '20 mins ago', icon: '⚡' },
  { name: 'Adeel from Jhelum', action: 'purchased 3-Months Premium Pack', time: '22 mins ago', icon: '🍿' },
  { name: 'Saad from Sheikhupura', action: 'purchased 1-Year Multi-Device Sub', time: '25 mins ago', icon: '🚀' },
  { name: 'Raza from Larkana', action: 'activated Free 2-Hour Trial', time: '28 mins ago', icon: '⚡' },
  { name: 'Zeeshan from Mirpur', action: 'renewed 6-Months 4K Ultra Pack', time: '31 mins ago', icon: '👑' },
  { name: 'Arsalan from Sahiwal', action: 'purchased 1-Month Server 1 Line', time: '35 mins ago', icon: '🔷' },
  { name: 'Haris from Abbottabad', action: 'activated Free 2-Hour Trial', time: '39 mins ago', icon: '⚡' },

  // --- UNITED KINGDOM (UK) ---
  { name: 'James from London', action: 'purchased 1-Year Ultra 4K Package', time: '3 mins ago', icon: '👑' },
  { name: 'Oliver from Manchester', action: 'activated Free 2-Hour Trial', time: '6 mins ago', icon: '⚡' },
  { name: 'Harry from Birmingham', action: 'renewed 6-Months Premium Stream', time: '10 mins ago', icon: '🚀' },
  { name: 'George from Leeds', action: 'purchased 3-Months Multi-Line', time: '15 mins ago', icon: '🍿' },
  { name: 'Jack from Glasgow', action: 'activated Free 2-Hour Trial', time: '19 mins ago', icon: '⚡' },
  { name: 'Noah from Liverpool', action: 'purchased 1-Month Base Plan', time: '23 mins ago', icon: '🔷' },
  { name: 'Charlie from Sheffield', action: 'renewed 1-Year VIP Access', time: '27 mins ago', icon: '👑' },
  { name: 'Jacob from Edinburgh', action: 'purchased 6-Months 4K Pass', time: '33 mins ago', icon: '🚀' },
  { name: 'Alfie from Bristol', action: 'activated Free 2-Hour Trial', time: '38 mins ago', icon: '⚡' },
  { name: 'Thomas from Leicester', action: 'purchased 3-Months Opplex Sub', time: '42 mins ago', icon: '🍿' },
  { name: 'Mohammed from Bradford', action: 'renewed 1-Year Server 3 Line', time: '46 mins ago', icon: '👑' },
  { name: 'Leo from Coventry', action: 'activated Free 2-Hour Trial', time: '50 mins ago', icon: '⚡' },
  { name: 'Oscar from Nottingham', action: 'purchased 1-Month Light Pack', time: '54 mins ago', icon: '🔷' },
  { name: 'Archie from Newcastle', action: 'purchased 6-Months Mega Pack', time: '58 mins ago', icon: '🚀' },
  { name: 'Henry from Southampton', action: 'activated Free 2-Hour Trial', time: '1 hour ago', icon: '⚡' },

  // --- UNITED STATES (USA) ---
  { name: 'Liam from New York', action: 'purchased 1-Year Elite Sub', time: '2 mins ago', icon: '👑' },
  { name: 'Noah from Los Angeles', action: 'activated Free 2-Hour Trial', time: '4 mins ago', icon: '⚡' },
  { name: 'William from Chicago', action: 'renewed 6-Months 4K Line', time: '8 mins ago', icon: '🚀' },
  { name: 'Lucas from Houston', action: 'purchased 3-Months Premium Pack', time: '13 mins ago', icon: '🍿' },
  { name: 'Benjamin from Phoenix', action: 'activated Free 2-Hour Trial', time: '17 mins ago', icon: '⚡' },
  { name: 'Elijah from Philadelphia', action: 'purchased 1-Month Starter Line', time: '21 mins ago', icon: '🔷' },
  { name: 'Oliver from San Antonio', action: 'renewed 1-Year Server 1 Stream', time: '26 mins ago', icon: '👑' },
  { name: 'Daniel from San Diego', action: 'purchased 6-Months Ultra Pass', time: '30 mins ago', icon: '🚀' },
  { name: 'Matthew from Dallas', action: 'activated Free 2-Hour Trial', time: '34 mins ago', icon: '⚡' },
  { name: 'Alexander from San Jose', action: 'purchased 3-Months Multi-Room', time: '40 mins ago', icon: '🍿' },
  { name: 'Michael from Austin', action: 'renewed 1-Year Diamond Plan', time: '45 mins ago', icon: '👑' },
  { name: 'Ethan from Jacksonville', action: 'activated Free 2-Hour Trial', time: '49 mins ago', icon: '⚡' },
  { name: 'David from Fort Worth', action: 'purchased 1-Month Base Line', time: '53 mins ago', icon: '🔷' },
  { name: 'Joseph from Columbus', action: 'purchased 6-Months Premium Link', time: '57 mins ago', icon: '🚀' },
  { name: 'Jackson from Charlotte', action: 'activated Free 2-Hour Trial', time: '1 hour ago', icon: '⚡' },

  // --- UNITED ARAB EMIRATES & GULF (UAE/KSA/OMAN) ---
  { name: 'Zayd from Dubai', action: 'purchased 1-Year VIP StarShare', time: '3 mins ago', icon: '👑' },
  { name: 'Omar from Abu Dhabi', action: 'activated Free 2-Hour Trial', time: '7 mins ago', icon: '⚡' },
  { name: 'Youssef from Riyadh', action: 'renewed 6-Months MegaOTT Pack', time: '11 mins ago', icon: '🚀' },
  { name: 'Mustafa from Jeddah', action: 'purchased 3-Months 4K Access', time: '14 mins ago', icon: '🍿' },
  { name: 'Kareem from Sharjah', action: 'activated Free 2-Hour Trial', time: '18 mins ago', icon: '⚡' },
  { name: 'Ahmad from Muscat', action: 'purchased 1-Month Server 2 Line', time: '22 mins ago', icon: '🔷' },
  { name: 'Tarek from Doha', action: 'renewed 1-Year Full Package', time: '29 mins ago', icon: '👑' },
  { name: 'Faisal from Manama', action: 'purchased 6-Months Premium Slot', time: '36 mins ago', icon: '🚀' },
  { name: 'Hamdan from Ajman', action: 'activated Free 2-Hour Trial', time: '41 mins ago', icon: '⚡' },
  { name: 'Idris from Al Ain', action: 'purchased 3-Months Express Pack', time: '47 mins ago', icon: '🍿' },
  { name: 'Sultan from Dammam', action: 'renewed 1-Year Platinum Sub', time: '51 mins ago', icon: '👑' },
  { name: 'Bilal from Kuwait City', action: 'activated Free 2-Hour Trial', time: '56 mins ago', icon: '⚡' },
  { name: 'Sami from Salalah', action: 'purchased 1-Month Basic Pack', time: '1 hour ago', icon: '🔷' },
  { name: 'Rami from Medina', action: 'purchased 6-Months Super Stream', time: '1 hour ago', icon: '🚀' },
  { name: 'Waleed from Mecca', action: 'activated Free 2-Hour Trial', time: '1 hour ago', icon: '⚡' },

  // --- EUROPE (GERMANY/FRANCE/SPAIN/ITALY) ---
  { name: 'Lucas from Berlin', action: 'purchased 1-Year Global Stream', time: '5 mins ago', icon: '👑' },
  { name: 'Maximilian from Munich', action: 'activated Free 2-Hour Trial', time: '9 mins ago', icon: '⚡' },
  { name: 'Hugo from Paris', action: 'renewed 6-Months Ultra Premium', time: '13 mins ago', icon: '🚀' },
  { name: 'Louis from Lyon', action: 'purchased 3-Months Opplex Pack', time: '17 mins ago', icon: '🍿' },
  { name: 'Mateo from Madrid', action: 'activated Free 2-Hour Trial', time: '21 mins ago', icon: '⚡' },
  { name: 'Leo from Barcelona', action: 'purchased 1-Month Basic Line', time: '26 mins ago', icon: '🔷' },
  { name: 'Francesco from Rome', action: 'renewed 1-Year VIP Server', time: '32 mins ago', icon: '👑' },
  { name: 'Alessandro from Milan', action: 'purchased 6-Months Premium Link', time: '37 mins ago', icon: '🚀' },
  { name: 'Milan from Amsterdam', action: 'activated Free 2-Hour Trial', time: '43 mins ago', icon: '⚡' },
  { name: 'Daan from Rotterdam', action: 'purchased 3-Months Multi-Room', time: '48 mins ago', icon: '🍿' },
  { name: 'Arthur from Brussels', action: 'renewed 1-Year Diamond Pass', time: '52 mins ago', icon: '👑' },
  { name: 'Gabriel from Frankfurt', action: 'activated Free 2-Hour Trial', time: '55 mins ago', icon: '⚡' },
  { name: 'Jonas from Hamburg', action: 'purchased 1-Month Starter Stream', time: '59 mins ago', icon: '🔷' },
  { name: 'Enzo from Marseille', action: 'purchased 6-Months Ultra HD Pass', time: '1 hour ago', icon: '🚀' },
  { name: 'Diego from Valencia', action: 'activated Free 2-Hour Trial', time: '1 hour ago', icon: '⚡' },

  // --- CANADA & AUSTRALIA ---
  { name: 'Benjamin from Toronto', action: 'purchased 1-Year Premium Access', time: '4 mins ago', icon: '👑' },
  { name: 'Lucas from Vancouver', action: 'activated Free 2-Hour Trial', time: '8 mins ago', icon: '⚡' },
  { name: 'Oliver from Montreal', action: 'renewed 6-Months StarShare Sub', time: '12 mins ago', icon: '🚀' },
  { name: 'Ethan from Calgary', action: 'purchased 3-Months 4K Package', time: '16 mins ago', icon: '🍿' },
  { name: 'William from Ottawa', action: 'activated Free 2-Hour Trial', time: '20 mins ago', icon: '⚡' },
  { name: 'Alexander from Sydney', action: 'purchased 1-Month Basic Pass', time: '25 mins ago', icon: '🔷' },
  { name: 'Jack from Melbourne', action: 'renewed 1-Year VIP Multi-Line', time: '31 mins ago', icon: '👑' },
  { name: 'Noah from Brisbane', action: 'purchased 6-Months High-Speed Slot', time: '34 mins ago', icon: '🚀' },
  { name: 'Thomas from Perth', action: 'activated Free 2-Hour Trial', time: '38 mins ago', icon: '⚡' },
  { name: 'James from Adelaide', action: 'purchased 3-Months Server 1 Sub', time: '44 mins ago', icon: '🍿' },
  { name: 'Ryan from Edmonton', action: 'renewed 1-Year Mega Pack', time: '48 mins ago', icon: '👑' },
  { name: 'Logan from Winnipeg', action: 'activated Free 2-Hour Trial', time: '52 mins ago', icon: '⚡' },
  { name: 'Chloe from Halifax', action: 'purchased 1-Month Starter Pack', time: '56 mins ago', icon: '🔷' },
  { name: 'Mia from Gold Coast', action: 'purchased 6-Months Premium Link', time: '1 hour ago', icon: '🚀' },
  { name: 'Aria from Hobart', action: 'activated Free 2-Hour Trial', time: '1 hour ago', icon: '⚡' }
];

export default function FloatingWA() {
  const [currentNotification, setCurrentNotification] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const FIRST_DELAY = 3 * 1000;       // a new visitor sees the first popup 3 seconds after landing
    const GAP = 15 * 60 * 1000;         // after that, never more often than once per 15 minutes
    const VISIBLE_FOR = 8 * 1000;       // each popup stays on screen for 8 seconds
    const KEY = 'hs_proof_last';        // when the last popup was shown (survives page changes and reloads)
    let showTimer;
    let hideTimer;

    const readLast = () => {
      try { return Number(window.localStorage.getItem(KEY)) || 0; } catch { return 0; }
    };
    const writeLast = (t) => {
      try { window.localStorage.setItem(KEY, String(t)); } catch { /* private mode: fall back to per-page timing */ }
    };

    const popup = () => {
      showRandomNotification();
      writeLast(Date.now());
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setIsVisible(false), VISIBLE_FOR);
      schedule(GAP);
    };

    // wait until 15 minutes have passed since the last popup (closing it early does not reset the clock)
    const schedule = (delay) => {
      clearTimeout(showTimer);
      showTimer = setTimeout(popup, delay);
    };

    const last = readLast();
    const waited = Date.now() - last;
    schedule(last && waited < GAP ? GAP - waited : FIRST_DELAY);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const showRandomNotification = () => {
    const randomIndex = Math.floor(Math.random() * notificationData.length);
    setCurrentNotification(notificationData[randomIndex]);
    setIsVisible(true);
  };

  return (
    <>
      {/* NEW: Floating Trust & Social Proof Popup Element */}
      {currentNotification && (
        <div className={`social-proof-toast ${isVisible ? 'slice-in' : 'slice-out'}`}>
          <div className="toast-icon">{currentNotification.icon}</div>
          <div className="toast-body">
            <p className="toast-text">
              <strong>{currentNotification.name}</strong> {currentNotification.action}
            </p>
            <span className="toast-time">🟢 Verified • {currentNotification.time}</span>
          </div>
          <button className="toast-close" onClick={() => setIsVisible(false)}>×</button>
        </div>
      )}

      {/* Existing Floating WhatsApp Access Trigger */}
      <button className="float-btn" onClick={() => openWhatsApp(WA_MESSAGES.general)} aria-label="Chat on WhatsApp">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.118 1.531 5.845L.057 23.57a.5.5 0 0 0 .612.612l5.725-1.474A11.951 11.951 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.951 9.951 0 0 1-5.076-1.384l-.363-.215-3.76.968.988-3.614-.236-.376A9.952 9.952 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
        <span className="label">Chat with us</span>
        <span className="pulse" aria-hidden="true" />
      </button>

      <style jsx>{`
        .float-btn { position:fixed;bottom:28px;right:28px;z-index:999;background:var(--wa-green);color:#fff;border:none;border-radius:50px;padding:13px 20px 13px 16px;display:flex;align-items:center;gap:10px;font-family:var(--font-body);font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 4px 24px rgba(37,211,102,0.4);transition:transform 0.2s,box-shadow 0.2s; }
        .float-btn:hover { transform:translateY(-2px);box-shadow:0 8px 32px rgba(37,211,102,0.5); }
        .label { white-space:nowrap; }
        .pulse { position:absolute;top:-3px;right:-3px;width:12px;height:12px;background:#fff;border-radius:50%;animation:p 2.5s ease-in-out infinite; }
        
        /* NEW: Social Proof Toast Container Styles */
        .social-proof-toast { position: fixed; bottom: 28px; left: 28px; z-index: 999; display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.92); border: 1px solid rgba(21,32,30,0.06); backdrop-filter: blur(12px); padding: 12px 18px 12px 14px; border-radius: 12px; max-width: 320px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .toast-icon { font-size: 20px; background: rgba(21,32,30,0.06); padding: 6px; border-radius: 8px; flex-shrink: 0; }
        .toast-body { display: flex; flex-direction: column; gap: 2px; }
        .toast-text { color:var(--ink); font-size: 13px; margin: 0; font-family: var(--font-body); line-height: 1.4; font-weight: 300; }
        .toast-text strong { font-weight: 600; color: #0b6e62; }
        .toast-time { font-size: 11px; color: var(--text-muted); font-weight: 400; display: flex; align-items: center; gap: 4px; }
        .toast-close { background: none; border: none; color: var(--text-muted); font-size: 16px; cursor: pointer; position: absolute; top: 6px; right: 8px; line-height: 1; padding: 2px; }
        .toast-close:hover { color:var(--ink); }

        /* Animation States */
        .slice-in { transform: translateX(0); opacity: 1; pointer-events: auto; }
        .slice-out { transform: translateX(-40px); opacity: 0; pointer-events: none; }

        @keyframes p{0%{transform:scale(1);opacity:1}50%{transform:scale(1.6);opacity:0.3}100%{transform:scale(1);opacity:1}}
        
        @media(max-width:480px){ 
          .float-btn{bottom:16px;right:16px;padding:14px;border-radius:50%;} 
          .label{display:none;} 
          /* Reposition popup on mobile so it doesn't overlap screen content centrally */
          .social-proof-toast { bottom: auto; top: 16px; left: 16px; right: 16px; max-width: none; width: calc(100% - 32px); }
          .slice-out { transform: translateY(-20px); opacity: 0; }
        }
      `}</style>
    </>
  );
}