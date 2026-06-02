import { openWhatsApp } from '../lib/whatsapp';

const plans = [
  { duration: '1 Month', price: '$ 299', per: '/mo', features: ['All 3 Servers', 'HD & 4K Quality', 'All Devices', '24/7 Support'], featured: false, waMsg: 'Hello HorizonStream IPTV! I want to order the 1 Month plan for PKR 800. 📺' },
  { duration: '3 Months', price: '$ 1,099', per: '/3mo', features: ['All 3 Servers', 'HD & 4K Quality', 'All Devices', 'Priority Support', 'Save PKR 300'], featured: true, waMsg: 'Hello HorizonStream IPTV! I want to order the 3 Month plan for PKR 2,100. 📺' },
  { duration: '6 Months', price: '$ 2,299', per: '/6mo', features: ['All 3 Servers', 'HD & 4K Quality', 'All Devices', 'Priority Support', 'Best Value'], featured: false, waMsg: 'Hello HorizonStream IPTV! I want to order the 6 Month plan for PKR 3,800. 📺' },
  { duration: '1 Year', price: '$ 3,999', per: '/yr', features: ['All 3 Servers', 'HD & 4K Quality', 'All Devices', 'Priority Support', 'Reseller Access'], featured: false, waMsg: 'Hello HorizonStream IPTV! I want to order the 1 Year plan for PKR 7,000. 📺' },
];

const WaIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>);
const Check = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>);

export default function Plans() {
  return (
    <>
      <section className="plans-section" id="plans">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Pricing</p>
            <h2 className="section-title">Simple, Transparent <span className="gradient-text">Plans</span></h2>
            <p className="section-sub">All plans include access to all three servers. Order instantly on WhatsApp — no forms, no waiting.</p>
          </div>
          <div className="plans-grid">
            {plans.map((plan) => (
              <div key={plan.duration} className={`plan-card${plan.featured ? ' featured' : ''}`}>
                {plan.featured && <div className="featured-badge">⚡ Most Popular</div>}
                <div className="plan-header">
                  <p className="plan-duration">{plan.duration}</p>
                  <div className="plan-price">{plan.price}<span className="plan-per">{plan.per}</span></div>
                </div>
                <ul className="plan-features">
                  {plan.features.map((f) => (<li key={f}><Check />{f}</li>))}
                </ul>
                <button className={`plan-btn${plan.featured ? ' featured-btn' : ''}`} onClick={() => openWhatsApp(plan.waMsg)}>
                  <WaIcon />Order on WhatsApp
                </button>
              </div>
            ))}
          </div>
          <p className="plans-note">Need a custom plan? <button className="inline-link" onClick={() => openWhatsApp('Hello HorizonStream IPTV! I need a custom subscription plan.')}>Message us on WhatsApp</button></p>
        </div>
      </section>
      <style jsx>{`
        .plans-section { padding:5rem 2rem;background:var(--bg-secondary);border-top:1px solid var(--border);border-bottom:1px solid var(--border); }
        .container { max-width:1200px;margin:0 auto; }
        .section-header { margin-bottom:3rem; }
        .section-tag { font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--accent-2);margin-bottom:0.75rem;font-weight:600; }
        .section-title { font-family:var(--font-display);font-size:clamp(32px,5vw,52px);font-weight:800;letter-spacing:-1px;margin-bottom:0.75rem; }
        .gradient-text { background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .section-sub { color:var(--text-secondary);font-size:15px;font-weight:300;max-width:500px;line-height:1.7; }
        .plans-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:1.5rem;align-items:start; }
        .plan-card { background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:1.75rem;display:flex;flex-direction:column;gap:1.25rem;position:relative;transition:border-color 0.2s,transform 0.2s; }
        .plan-card:hover { border-color:var(--border-hover);transform:translateY(-2px); }
        .plan-card.featured { border:2px solid var(--accent);background:linear-gradient(145deg,rgba(124,58,237,0.08),var(--bg-card)); }
        .featured-badge { position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:var(--gradient);color:#fff;font-size:11px;font-weight:700;padding:4px 14px;border-radius:50px;white-space:nowrap; }
        .plan-header { display:flex;flex-direction:column;gap:0.2rem; }
        .plan-duration { font-size:12px;color:var(--text-muted);letter-spacing:1px;text-transform:uppercase; }
        .plan-price { font-family:var(--font-display);font-size:34px;font-weight:800;color:#fff;display:flex;align-items:baseline;gap:4px; }
        .plan-per { font-family:var(--font-body);font-size:13px;color:var(--text-muted);font-weight:300; }
        .plan-features { list-style:none;display:flex;flex-direction:column;gap:0.6rem;flex:1; }
        .plan-features li { display:flex;align-items:center;gap:8px;font-size:14px;color:var(--text-secondary);font-weight:300; }
        .plan-features li :global(svg) { color:var(--accent-2);flex-shrink:0; }
        .plan-btn { display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:12px;background:transparent;border:1px solid var(--border-hover);color:#fff;font-size:14px;font-weight:500;border-radius:8px;font-family:var(--font-body);transition:all 0.2s;cursor:pointer; }
        .plan-btn:hover { background:rgba(255,255,255,0.06); }
        .plan-btn.featured-btn { background:var(--wa-green);border-color:var(--wa-green); }
        .plan-btn.featured-btn:hover { background:var(--wa-green-dark);border-color:var(--wa-green-dark); }
        .plans-note { margin-top:2rem;text-align:center;color:var(--text-muted);font-size:14px; }
        .inline-link { background:none;border:none;color:var(--accent-2);font-size:14px;font-family:var(--font-body);cursor:pointer;font-weight:500;text-decoration:underline;text-underline-offset:3px; }
      `}</style>
    </>
  );
}
