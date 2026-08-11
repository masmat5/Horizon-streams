import { useState } from 'react';
import Head from 'next/head';
import { openWhatsApp, WA_MESSAGES } from '../lib/whatsapp';

const faqs = [
  { q: 'How do I get a free IPTV trial?', a: 'Tap the "Free Trial" button anywhere on our website. It opens direct WhatsApp chat with our support team. We activate your free 2-hour trial within minutes.' },
  { q: 'Which devices support HorizonStream IPTV?', a: 'HorizonStream IPTV works on all devices including Android TV, Smart TVs, Amazon Firestick, iPhones, iPads, Windows PC, Mac, MAG boxes, and Enigma devices.' },
  { q: 'How do I make a payment for my subscription?', a: 'All payments are processed securely via WhatsApp. We accept EasyPaisa, JazzCash, Bank Transfer, and international payment options.' },
  { q: 'What is the difference between StarShare, Opplex, and B1G servers?', a: 'StarShare specializes in live sports and global channels, Opplex offers a massive VOD movie/series library, and B1G provides uncompressed 4K Ultra HD streams.' },
  { q: 'How do I become an IPTV reseller?', a: 'We offer an instant IPTV Reseller Panel with high margins and sub-panel management. Contact our sales team on WhatsApp for pricing and panel activation.' },
  { q: 'Is there any buffering or freezing during live sports?', a: 'Our anti-freeze technology and load-balanced servers guarantee 99.9% uptime with buffer-free streaming across all internet connections.' },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  // Schema.org FAQ Data for Rich Results
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <section className="faq-section" id="faq">
        <div className="container">
          <div className="faq-layout">
            <div className="faq-left">
              <p className="section-tag">Frequently Asked Questions</p>
              <h2 className="section-title">Got <span className="gradient-text">Questions?</span></h2>
              <p className="section-sub">Need assistance before ordering? Our technical support team is available 24/7 on WhatsApp.</p>
              <button className="btn-wa" onClick={() => openWhatsApp(WA_MESSAGES.contactUs)}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                Ask Support on WhatsApp
              </button>
            </div>
            <div className="faq-right">
              {faqs.map((item, i) => (
                <div key={i} className={`faq-item${open === i ? ' open' : ''}`} onClick={() => setOpen(open === i ? null : i)}>
                  <div className="faq-question">
                    <h3 style={{margin: 0, font: 'inherit', color: 'inherit'}}>{item.q}</h3>
                    <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                  {open === i && <p className="faq-answer">{item.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <style jsx>{`
        .faq-section { padding:5rem 2rem;background:var(--bg-primary); }
        .container { max-width:1200px;margin:0 auto; }
        .faq-layout { display:grid;grid-template-columns:1fr 2fr;gap:4rem;align-items:start; }
        .section-tag { font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--accent-2);margin-bottom:0.75rem;font-weight:600; }
        .section-title { font-family:var(--font-display);font-size:clamp(32px,4vw,48px);font-weight:800;letter-spacing:-1px;margin-bottom:1rem; }
        .gradient-text { background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .section-sub { color:var(--text-secondary);font-size:14px;line-height:1.7;font-weight:300;margin-bottom:2rem; }
        .btn-wa { display:inline-flex;align-items:center;gap:8px;background:var(--wa-green);color:#fff;font-size:14px;font-weight:500;padding:11px 22px;border-radius:8px;font-family:var(--font-body);transition:background 0.2s;border:none;cursor:pointer; }
        .btn-wa:hover { background:var(--wa-green-dark); }
        .faq-item { border-bottom:1px solid var(--border);cursor:pointer; }
        .faq-item:first-child { border-top:1px solid var(--border); }
        .faq-question { display:flex;justify-content:space-between;align-items:center;padding:1.25rem 0;font-size:15px;color:var(--text-secondary);gap:1rem;transition:color 0.2s; }
        .faq-item.open .faq-question { color:#fff; }
        .chevron { flex-shrink:0;transition:transform 0.25s;color:var(--text-muted); }
        .faq-item.open .chevron { transform:rotate(180deg);color:var(--accent); }
        .faq-answer { padding:0 0 1.25rem;font-size:14px;color:var(--text-secondary);line-height:1.8;font-weight:300; }
        @media(max-width:768px){ .faq-layout{grid-template-columns:1fr;gap:2.5rem;} }
      `}</style>
    </>
  );
}