import { openWhatsApp, WA_MESSAGES } from '../lib/whatsapp';

export default function FloatingWA() {
  return (
    <>
      <button
        className="float-btn"
        onClick={() => openWhatsApp(WA_MESSAGES.general)}
        aria-label="Chat on WhatsApp"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.118 1.531 5.845L.057 23.57a.5.5 0 0 0 .612.612l5.725-1.474A11.951 11.951 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.951 9.951 0 0 1-5.076-1.384l-.363-.215-3.76.968.988-3.614-.236-.376A9.952 9.952 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
        <span className="float-label">Chat with us</span>
        <span className="pulse" />
      </button>

      <style jsx>{`
        .float-btn {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 999;
          background: var(--wa-green);
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 14px 22px 14px 18px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 24px rgba(37, 211, 102, 0.35);
          transition: transform 0.2s, box-shadow 0.2s;
          position: fixed;
        }
        .float-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(37, 211, 102, 0.45);
        }
        .float-label {
          white-space: nowrap;
        }
        .pulse {
          position: absolute;
          top: -3px;
          right: -3px;
          width: 12px;
          height: 12px;
          background: #fff;
          border-radius: 50%;
          animation: pulseAnim 2s ease-in-out infinite;
        }
        @keyframes pulseAnim {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.4; }
          100% { transform: scale(1); opacity: 1; }
        }
        @media (max-width: 480px) {
          .float-btn { bottom: 16px; right: 16px; padding: 14px; border-radius: 50%; }
          .float-label { display: none; }
        }
      `}</style>
    </>
  );
}
