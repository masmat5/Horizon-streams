import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWA from '../components/FloatingWA';
import { openWhatsApp } from '../lib/whatsapp';

const benefits = [
  { icon: '💰', title: 'High Profit Margins', desc: 'Buy credits at wholesale rates and sell at your own pricing. Earn up to 40% profit on every sale.' },
  { icon: '📊', title: 'Reseller Panel', desc: 'Full access to a dedicated reseller dashboard to manage all your customers in one place.' },
  { icon: '⚡', title: 'Instant Activation', desc: 'Activate new customer subscriptions instantly through your panel — no delays, no waiting.' },
  { icon: '🌍', title: 'All 3 Servers', desc: 'Resell access to StarShare, Opplex, and B1G. Offer your customers the best possible choice.' },
  { icon: '🎧', title: '24/7 Support', desc: 'We are always available on WhatsApp to help you and your customers with any issues.' },
  { icon: '📱', title: 'Setup Assistance', desc: 'We help you set up your first customers and guide you through the panel step by step.' },
];

const packages = [
  { name: 'Starter', credits: '10 Credits', price: 'PKR 6,500', perCredit: 'PKR 650 / credit', features: ['10 customer activations', 'All 3 servers', 'Panel access', 'WhatsApp support'], featured: false, waMsg: 'Hello HorizonStream IPTV! I want the Starter Reseller Package (10 Credits) for PKR 6,500.' },
  { name: 'Growth', credits: '25 Credits', price: 'PKR 14,500', perCredit: 'PKR 580 / credit', features: ['25 customer activations', 'All 3 servers', 'Panel access', 'Priority support', 'Save PKR 1,750'], featured: true, waMsg: 'Hello HorizonStream IPTV! I want the Growth Reseller Package (25 Credits) for PKR 14,500.' },
  { name: 'Pro', credits: '50 Credits', price: 'PKR 25,000', perCredit: 'PKR 500 / credit', features: ['50 customer activations', 'All 3 servers', 'Panel access', 'Priority support', 'Best margin'], featured: false, waMsg: 'Hello HorizonStream IPTV! I want the Pro Reseller Package (50 Credits) for PKR 25,000.' },
];

const steps = [
  { step: '01', title: 'Contact Us on WhatsApp', desc: 'Send us a message expressing your interest in becoming a reseller. We will reply within minutes.' },
  { step: '02', title: 'Choose Your Package', desc: 'Select a reseller credit package based on your expected monthly sales volume.' },
  { step: '03', title: 'Get Panel Access', desc: 'After payment, we will create your reseller account and send you panel login details immediately.' },
  { step: '04', title: 'Start Selling', desc: 'Add customers, activate subscriptions, and earn profit. We handle all the technical support.' },
];

const Check = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>);
const WaIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>);

export default function Reseller() {
  return (
    <>
      <Head>
        <title>Reseller Panel – HorizonStream IPTV</title>
        <meta name="description" content="Become a HorizonStream IPTV reseller. High profit margins, full reseller panel, instant activations, and all 3 premium servers." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />

      {/* Hero */}
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="container">
          <nav className="breadcrumb" aria-label="breadcrumb">
            <Link href="/">Home</Link><span>/</span><span>Reseller Panel</span>
          </nav>
          <div className="hero-badge"><span>💼</span>Reseller Programme</div>
          <h1 className="hero-title">Start Your Own<br /><span className="gradient-text">IPTV Business</span></h1>
          <p className="hero-desc">Become a HorizonStream IPTV reseller and earn consistent income. Get your own reseller panel, wholesale pricing, and full technical support — all through WhatsApp.</p>
          <button className="btn-wa" onClick={() => openWhatsApp('Hello HorizonStream IPTV! I am interested in becoming a reseller. Please share reseller panel details.')}>
            <WaIcon />Become a Reseller
          </button>
        </div>
      </section>

      {/* Benefits */}
      <section className="section bg-alt">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Why Resell With Us</p>
            <h2 className="section-title">Everything You Need to <span className="gradient-text">Succeed</span></h2>
          </div>
          <div className="benefits-grid">
            {benefits.map((b) => (
              <div key={b.title} className="benefit-card">
                <span className="benefit-icon">{b.icon}</span>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Reseller Packages</p>
            <h2 className="section-title">Choose Your <span className="gradient-text">Package</span></h2>
            <p className="section-sub">Each credit = 1 month subscription for 1 customer. More credits = better margin per sale.</p>
          </div>
          <div className="packages-grid">
            {packages.map((pkg) => (
              <div key={pkg.name} className={`pkg-card${pkg.featured ? ' featured' : ''}`}>
                {pkg.featured && <div className="featured-badge">⚡ Best Value</div>}
                <div className="pkg-header">
                  <h3 className="pkg-name">{pkg.name}</h3>
                  <p className="pkg-credits">{pkg.credits}</p>
                  <p className="pkg-price">{pkg.price}</p>
                  <p className="pkg-per">{pkg.perCredit}</p>
                </div>
                <ul className="pkg-features">{pkg.features.map((f) => <li key={f}><Check />{f}</li>)}</ul>
                <button className={`pkg-btn${pkg.featured ? ' featured-btn' : ''}`} onClick={() => openWhatsApp(pkg.waMsg)}>
                  <WaIcon />Get This Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section bg-alt">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">How It Works</p>
            <h2 className="section-title">Get Started in <span className="gradient-text">4 Steps</span></h2>
          </div>
          <div className="steps-grid">
            {steps.map((s) => (
              <div key={s.step} className="step-card">
                <span className="step-num">{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-wrap">
        <div className="container">
          <div className="cta-box">
            <div className="cta-glow" aria-hidden="true" />
            <h2 className="cta-title">Ready to Start Earning?</h2>
            <p className="cta-desc">Contact us on WhatsApp right now and we will have your reseller panel ready within the hour.</p>
            <button className="btn-wa" onClick={() => openWhatsApp('Hello HorizonStream IPTV! I want to start as a reseller. Please guide me.')}>
              <WaIcon />Contact Us on WhatsApp
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWA />

      <style jsx>{`
        .container { max-width:1200px;margin:0 auto;padding:0 2rem; }
        .section { padding:5rem 0; }
        .bg-alt { background:var(--bg-secondary);border-top:1px solid var(--border);border-bottom:1px solid var(--border); }
        .section-header { margin-bottom:3rem; }
        .section-tag { font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--accent-2);margin-bottom:0.75rem;font-weight:600; }
        .section-title { font-family:var(--font-display);font-size:clamp(30px,4vw,48px);font-weight:800;letter-spacing:-1px;margin-bottom:0.75rem; }
        .section-sub { color:var(--text-secondary);font-size:15px;font-weight:300;max-width:480px;line-height:1.7; }
        .gradient-text { background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        /* Hero */
        .hero { position:relative;overflow:hidden;padding:5rem 0 4rem; }
        .hero-glow { position:absolute;top:-20%;right:-5%;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,0.18) 0%,transparent 70%);pointer-events:none; }
        .breadcrumb { display:flex;align-items:center;gap:8px;font-size:13px;color:var(--text-muted);margin-bottom:1.5rem;flex-wrap:wrap; }
        .breadcrumb a { color:var(--text-muted);transition:color 0.2s; }
        .breadcrumb a:hover { color:#fff; }
        .breadcrumb span:last-child { color:var(--text-secondary); }
        .hero-badge { display:inline-flex;align-items:center;gap:8px;background:var(--accent-soft);border:1px solid rgba(124,58,237,0.3);color:#a78bfa;font-size:13px;font-weight:500;padding:6px 14px;border-radius:50px;margin-bottom:1.5rem; }
        .hero-title { font-family:var(--font-display);font-size:clamp(44px,7vw,80px);font-weight:800;line-height:1;letter-spacing:-2px;margin-bottom:1.5rem; }
        .hero-desc { color:var(--text-secondary);font-size:17px;font-weight:300;line-height:1.75;max-width:540px;margin-bottom:2.5rem; }
        .btn-wa { display:inline-flex;align-items:center;gap:10px;background:var(--wa-green);color:#fff;font-size:15px;font-weight:600;padding:14px 28px;border-radius:8px;border:none;font-family:var(--font-body);transition:background 0.2s,transform 0.2s;cursor:pointer; }
        .btn-wa:hover { background:var(--wa-green-dark);transform:translateY(-2px); }
        /* Benefits */
        .benefits-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.5rem; }
        .benefit-card { background:var(--bg-card);border:1px solid var(--border);border-radius:14px;padding:1.75rem;transition:border-color 0.2s,transform 0.2s; }
        .benefit-card:hover { border-color:var(--border-hover);transform:translateY(-2px); }
        .benefit-icon { font-size:28px;display:block;margin-bottom:1rem; }
        .benefit-card h3 { font-size:16px;font-weight:600;margin-bottom:0.5rem; }
        .benefit-card p { font-size:14px;color:var(--text-secondary);line-height:1.7;font-weight:300; }
        /* Packages */
        .packages-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.5rem;align-items:start; }
        .pkg-card { background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:1.75rem;display:flex;flex-direction:column;gap:1.25rem;position:relative;transition:border-color 0.2s,transform 0.2s; }
        .pkg-card:hover { border-color:var(--border-hover);transform:translateY(-2px); }
        .pkg-card.featured { border:2px solid var(--accent);background:linear-gradient(145deg,rgba(124,58,237,0.08),var(--bg-card)); }
        .featured-badge { position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:var(--gradient);color:#fff;font-size:11px;font-weight:700;padding:4px 14px;border-radius:50px;white-space:nowrap; }
        .pkg-header { display:flex;flex-direction:column;gap:0.2rem; }
        .pkg-name { font-size:12px;color:var(--text-muted);letter-spacing:1px;text-transform:uppercase; }
        .pkg-credits { font-family:var(--font-display);font-size:28px;font-weight:800; }
        .pkg-price { font-size:22px;font-weight:700;color:var(--accent-2); }
        .pkg-per { font-size:12px;color:var(--text-muted); }
        .pkg-features { list-style:none;display:flex;flex-direction:column;gap:0.6rem;flex:1; }
        .pkg-features li { display:flex;align-items:center;gap:8px;font-size:14px;color:var(--text-secondary);font-weight:300; }
        .pkg-features li :global(svg) { color:var(--accent-2);flex-shrink:0; }
        .pkg-btn { display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:12px;background:transparent;border:1px solid var(--border-hover);color:#fff;font-size:14px;font-weight:500;border-radius:8px;font-family:var(--font-body);cursor:pointer;transition:all 0.2s; }
        .pkg-btn:hover { background:rgba(255,255,255,0.06); }
        .pkg-btn.featured-btn { background:var(--wa-green);border-color:var(--wa-green); }
        .pkg-btn.featured-btn:hover { background:var(--wa-green-dark); }
        /* Steps */
        .steps-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:2rem; }
        .step-card { display:flex;flex-direction:column;gap:0.75rem; }
        .step-num { font-family:var(--font-display);font-size:48px;font-weight:800;line-height:1;background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .step-card h3 { font-size:16px;font-weight:600; }
        .step-card p { font-size:14px;color:var(--text-secondary);line-height:1.7;font-weight:300; }
        /* CTA */
        .cta-wrap { padding:5rem 0; }
        .cta-box { position:relative;overflow:hidden;background:var(--bg-card);border:1px solid var(--border);border-radius:20px;padding:4rem 3rem;text-align:center; }
        .cta-glow { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:500px;height:300px;border-radius:50%;background:radial-gradient(ellipse,rgba(124,58,237,0.15) 0%,transparent 70%);pointer-events:none; }
        .cta-title { font-family:var(--font-display);font-size:clamp(28px,4vw,44px);font-weight:800;letter-spacing:-1px;margin-bottom:1rem;position:relative; }
        .cta-desc { color:var(--text-secondary);font-size:16px;font-weight:300;line-height:1.7;max-width:480px;margin:0 auto 2rem;position:relative; }
        .cta-box .btn-wa { position:relative;margin:0 auto; }
        @media(max-width:640px){ .cta-box{padding:3rem 1.5rem;} }
      `}</style>
    </>
  );
}
