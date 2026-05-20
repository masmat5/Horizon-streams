import { openWhatsApp } from '../lib/whatsapp';

const plans = [
  {
    duration: '1 Month',
    price: 'PKR 800',
    per: '/mo',
    features: ['All 3 Servers', 'HD & 4K Quality', 'All Devices', '24/7 Support'],
    featured: false,
    waMsg: 'Hello Horizon Streams IPTV! I want to order the 1 Month plan for PKR 800 please. 📺',
  },
  {
    duration: '3 Months',
    price: 'PKR 2,100',
    per: '/3mo',
    features: ['All 3 Servers', 'HD & 4K Quality', 'All Devices', '24/7 Priority Support', 'Save PKR 300'],
    featured: true,
    waMsg: 'Hello Horizon Streams IPTV! I want to order the 3 Month plan for PKR 2,100 please. 📺',
  },
  {
    duration: '6 Months',
    price: 'PKR 3,800',
    per: '/6mo',
    features: ['All 3 Servers', 'HD & 4K Quality', 'All Devices', '24/7 Priority Support', 'Best Value'],
    featured: false,
    waMsg: 'Hello Horizon Streams IPTV! I want to order the 6 Month plan for PKR 3,800 please. 📺',
  },
  {
    duration: '1 Year',
    price: 'PKR 7,000',
    per: '/yr',
    features: ['All 3 Servers', 'HD & 4K Quality', 'All Devices', '24/7 Priority Support', 'Reseller Access'],
    featured: false,
    waMsg: 'Hello Horizon Streams IPTV! I want to order the 1 Year plan for PKR 7,000 please. 📺',
  },
];

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
  </svg>
);

export default function Plans() {
  return (
    <>
      <section className="plans-section" id="plans">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Pricing</span>
            <h2 className="section-title">Simple <span className="accent">Plans</span></h2>
            <p className="section-sub">All plans include full access to all three servers. Order instantly on WhatsApp.</p>
          </div>

          <div className="plans-grid">
            {plans.map((plan) => (
              <div key={plan.duration} className={`plan-card${plan.featured ? ' featured' : ''}`}>
                {plan.featured && <div className="featured-badge">Most Popular</div>}
                <div className="plan-header">
                  <h3 className="plan-duration">{plan.duration}</h3>
                  <div className="plan-price">
                    {plan.price}
                    <span className="plan-per">{plan.per}</span>
                  </div>
                </div>
                <ul className="plan-features">
                  {plan.features.map((f) => (
                    <li key={f}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`plan-btn${plan.featured ? ' featured-btn' : ''}`}
                  onClick={() => openWhatsApp(plan.waMsg)}
                >
                  <WhatsAppIcon />
                  Order on WhatsApp
                </button>
              </div>
            ))}
          </div>

          <p className="plans-note">
            Need a custom plan? <button className="inline-wa" onClick={() => openWhatsApp('Hello Horizon Streams IPTV! I need a custom subscription plan.')}>Message us on WhatsApp</button>
          </p>
        </div>
      </section>

      <style jsx>{`
        .plans-section {
          padding: 5rem 2rem;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .section-header {
          margin-bottom: 3rem;
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
          font-size: clamp(36px, 5vw, 56px);
          letter-spacing: 2px;
          margin-bottom: 0.75rem;
        }
        .accent { color: var(--accent); }
        .section-sub {
          color: var(--text-secondary);
          font-size: 15px;
          font-weight: 300;
          max-width: 480px;
          line-height: 1.7;
        }
        .plans-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          align-items: start;
        }
        .plan-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          position: relative;
          transition: border-color 0.25s, transform 0.2s;
        }
        .plan-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-2px);
        }
        .plan-card.featured {
          border-color: var(--accent);
          background: linear-gradient(145deg, #16101a, var(--bg-card));
        }
        .featured-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent);
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 4px 14px;
          border-radius: 2px;
          white-space: nowrap;
        }
        .plan-header {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .plan-duration {
          font-size: 13px;
          color: var(--text-secondary);
          letter-spacing: 1px;
          text-transform: uppercase;
          font-weight: 400;
        }
        .plan-price {
          font-family: var(--font-display);
          font-size: 36px;
          letter-spacing: 1px;
          color: #fff;
          display: flex;
          align-items: baseline;
          gap: 4px;
        }
        .plan-per {
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--text-muted);
          font-weight: 300;
        }
        .plan-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          flex: 1;
        }
        .plan-features li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: var(--text-secondary);
          font-weight: 300;
        }
        .plan-features li svg {
          color: var(--wa-green);
          flex-shrink: 0;
        }
        .plan-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 12px;
          background: transparent;
          border: 1px solid var(--border-hover);
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          border-radius: 4px;
          transition: all 0.2s;
          letter-spacing: 0.3px;
        }
        .plan-btn:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.3);
        }
        .plan-btn.featured-btn {
          background: var(--wa-green);
          border-color: var(--wa-green);
          color: #fff;
        }
        .plan-btn.featured-btn:hover {
          background: var(--wa-green-dark);
          border-color: var(--wa-green-dark);
        }
        .plans-note {
          margin-top: 2rem;
          text-align: center;
          color: var(--text-muted);
          font-size: 14px;
        }
        .inline-wa {
          background: none;
          border: none;
          color: var(--wa-green);
          font-size: 14px;
          font-family: var(--font-body);
          cursor: pointer;
          font-weight: 500;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
      `}</style>
    </>
  );
}
