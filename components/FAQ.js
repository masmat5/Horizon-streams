import { useState } from 'react';
import { openWhatsApp, WA_MESSAGES } from '../lib/whatsapp';

const faqs = [
  {
    q: 'How do I get a free trial?',
    a: 'Tap the "Free Trial" button anywhere on the page. It opens WhatsApp directly with our team. We will activate your 1-day free trial within minutes.',
  },
  {
    q: 'Which devices are supported?',
    a: 'Horizon Streams IPTV works on all devices — Android phones & tablets, iPhones, Smart TVs, Amazon Fire Stick, MAG boxes, Windows PCs, and Macs. Any device with an IPTV player app is supported.',
  },
  {
    q: 'How do I make payment?',
    a: 'All payments are handled through WhatsApp. We accept EasyPaisa, JazzCash, and bank transfer. Contact us and we will guide you step by step.',
  },
  {
    q: 'What is the difference between StarShare, Opplex, and B1G?',
    a: 'These are three different IPTV servers with different channel lists and content libraries. StarShare focuses on sports and international channels, Opplex offers a huge VOD and live TV catalog, and B1G provides 4K Ultra HD quality streams.',
  },
  {
    q: 'Can I become a reseller?',
    a: 'Yes! We have a reseller panel available with competitive pricing. Contact us on WhatsApp and we will share full reseller details.',
  },
  {
    q: 'Is there a buffering or freezing issue?',
    a: 'Our servers are optimized for stable, buffer-free streaming. If you ever face any issues, our support team is available 24/7 on WhatsApp to resolve them immediately.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <>
      <section className="faq-section" id="faq">
        <div className="container">
          <div className="faq-layout">
            <div className="faq-left">
              <span className="section-tag">FAQ</span>
              <h2 className="section-title">Got <span className="accent">Questions?</span></h2>
              <p className="section-sub">
                Can not find your answer here? We are always available on WhatsApp.
              </p>
              <button
                className="btn-wa"
                onClick={() => openWhatsApp(WA_MESSAGES.contactUs)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                Ask on WhatsApp
              </button>
            </div>

            <div className="faq-right">
              {faqs.map((item, i) => (
                <div
                  key={i}
                  className={`faq-item${open === i ? ' open' : ''}`}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <div className="faq-question">
                    <span>{item.q}</span>
                    <svg
                      className="chevron"
                      width="16" height="16" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2"
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                  {open === i && (
                    <p className="faq-answer">{item.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .faq-section {
          padding: 5rem 2rem;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        .faq-layout {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          align-items: start;
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
          font-size: clamp(36px, 4vw, 52px);
          letter-spacing: 2px;
          margin-bottom: 1rem;
        }
        .accent { color: var(--accent); }
        .section-sub {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.7;
          font-weight: 300;
          margin-bottom: 2rem;
        }
        .btn-wa {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--wa-green);
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          padding: 11px 24px;
          border-radius: 4px;
          transition: background 0.2s;
          font-family: var(--font-body);
        }
        .btn-wa:hover { background: var(--wa-green-dark); }
        .faq-item {
          border-bottom: 1px solid var(--border);
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .faq-item:first-child { border-top: 1px solid var(--border); }
        .faq-item.open { border-color: var(--border-hover); }
        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 0;
          font-size: 15px;
          color: var(--text-secondary);
          gap: 1rem;
          transition: color 0.2s;
        }
        .faq-item.open .faq-question {
          color: #fff;
        }
        .chevron {
          flex-shrink: 0;
          transition: transform 0.25s;
          color: var(--text-muted);
        }
        .faq-item.open .chevron {
          transform: rotate(180deg);
          color: var(--accent);
        }
        .faq-answer {
          padding: 0 0 1.25rem;
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.8;
          font-weight: 300;
        }
        @media (max-width: 768px) {
          .faq-layout {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
      `}</style>
    </>
  );
}
