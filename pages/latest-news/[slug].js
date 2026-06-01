import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FloatingWA from '../../components/FloatingWA';
import { posts } from './index';

const fullContent = {
  'best-iptv-apps-2025': `<p>Choosing the right IPTV player app can make or break your streaming experience. We tested over a dozen apps and narrowed it down to the top 5 that work best with your HorizonStream IPTV subscription.</p><h3>1. TiviMate (Android / Fire Stick)</h3><p>TiviMate is our top recommendation for Android users. It has a clean interface, supports multiple playlists, Electronic Program Guide (EPG), and catch-up TV. The premium version is worth every rupee.</p><h3>2. IPTV Smarters Pro</h3><p>Available on Android, iOS, and Smart TVs, IPTV Smarters Pro supports M3U playlists and Xtream Codes. It is easy to set up and works great with all three HorizonStream IPTV servers.</p><h3>3. GSE Smart IPTV (iOS)</h3><p>The best option for iPhone and iPad users. GSE Smart IPTV supports M3U, JSON, and Xtream Codes APIs. It also has parental controls and a built-in EPG viewer.</p><h3>4. VLC Media Player</h3><p>VLC is a free and open-source option available on all platforms. While it lacks advanced features like EPG, it is reliable and supports almost every stream format.</p><h3>5. Smart IPTV (Samsung and LG Smart TVs)</h3><p>If you have a Samsung or LG Smart TV, Smart IPTV is the go-to app. Simply load your M3U link and you are ready to stream directly on your big screen.</p><p>Contact us on WhatsApp and we will help you set up any of these apps with your HorizonStream IPTV subscription in minutes.</p>`,
  'opplex-new-channels-added': `<p>We are thrilled to announce a major update to the Opplex server. Over 500 new channels have been added this month, bringing our total Opplex channel count to over 3,000.</p><h3>What Is New?</h3><p>The new additions include premium sports channels covering international football, cricket leagues, and Formula 1. We have also added more regional Pakistani and Indian channels, plus a wide range of kids entertainment.</p><h3>Improved VOD Library</h3><p>The Opplex VOD library has also been refreshed with hundreds of new Bollywood, Hollywood, and Turkish drama titles. All content is available in HD quality.</p><p>Existing subscribers will see the new channels automatically in their channel list. If you have not subscribed yet, contact us on WhatsApp to get started.</p>`,
  'how-to-setup-iptv-smart-tv': `<p>Setting up IPTV on your Smart TV is straightforward. Follow these steps to start watching HorizonStream IPTV on your big screen today.</p><h3>Step 1: Install an IPTV App</h3><p>Go to your TV's app store and search for "Smart IPTV" (Samsung/LG) or "IPTV Smarters" (Android TV). Install the app.</p><h3>Step 2: Contact Us on WhatsApp</h3><p>Send us a message on WhatsApp at +92 344 6855083. Tell us which server you want and which plan you are interested in.</p><h3>Step 3: Receive Your Credentials</h3><p>Once you subscribe, we will send you your M3U link or Xtream Codes login details via WhatsApp within minutes.</p><h3>Step 4: Enter Your Details in the App</h3><p>Open the IPTV app on your Smart TV and enter the credentials we sent you. Your channels will load automatically.</p><h3>Step 5: Enjoy!</h3><p>That is it — you are now ready to watch thousands of channels in HD and 4K quality on your Smart TV.</p>`,
  'starshare-4k-sports-update': `<p>Big news for sports fans! The StarShare server has been upgraded to support 4K Ultra HD streaming for major sports channels.</p><h3>Which Sports Are Available in 4K?</h3><p>You can now watch international football matches, PSL cricket, NBA basketball, and UFC events in stunning 4K quality — all through the StarShare server.</p><h3>What Do I Need?</h3><p>To enjoy 4K streams you will need a 4K-capable device and a stable internet connection of at least 25 Mbps. A fibre or fast 4G/5G connection is recommended.</p><p>All existing StarShare subscribers have automatic access to the new 4K channels. Contact us on WhatsApp if you have any questions about your subscription.</p>`,
  'b1g-server-uptime-record': `<p>We are proud to share that our B1G 4K server maintained a 99.9% uptime record throughout Q1 2025. This is a testament to our ongoing investment in premium server infrastructure.</p><h3>What Does 99.9% Uptime Mean?</h3><p>It means the server was available and streaming for 99.9% of the time — less than 9 hours of downtime across the entire year. Most standard IPTV providers average around 95-97% uptime.</p><h3>Our Commitment</h3><p>We continuously monitor all three servers 24 hours a day. Our technical team responds to any issues within minutes to ensure your streaming is never interrupted for long.</p><p>Thank you to all our subscribers for your continued trust. If you are not yet subscribed to B1G, contact us on WhatsApp to add it to your plan.</p>`,
};

export async function getStaticPaths() {
  return { paths: posts.map((p) => ({ params: { slug: p.slug } })), fallback: false };
}
export async function getStaticProps({ params }) {
  const post = posts.find((p) => p.slug === params.slug) || null;
  return { props: { post } };
}

export default function PostPage({ post }) {
  if (!post) return null;
  const catColor = { 'Streaming Tips': '#7c3aed', 'Server Update': '#06b6d4', 'How To': '#f59e0b', 'News': '#4ade80' };
  return (
    <>
      <Head>
        <title>{post.title} – HorizonStream IPTV</title>
        <meta name="description" content={post.excerpt} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />

      {/* Hero */}
      <div className="post-hero">
        {post.image && <div className="post-hero-bg" style={{ backgroundImage: `url(${post.image})` }} />}
        <div className="post-hero-overlay" />
        <div className="post-hero-content">
          <nav className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/latest-news">Latest News</Link><span>/</span><span>{post.category}</span></nav>
          <span className="post-cat" style={{ background: catColor[post.category] || '#7c3aed' }}>{post.category}</span>
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>{post.author}</span>
            <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>{post.date}</span>
          </div>
        </div>
      </div>

      <div className="post-layout">
        <article className="post-content">
          <div className="post-body" dangerouslySetInnerHTML={{ __html: fullContent[post.slug] || `<p>${post.excerpt}</p>` }} />
          <div className="back-link"><Link href="/latest-news">← Back to Latest News</Link></div>
        </article>
        <aside className="sidebar">
          <div className="widget">
            <div className="search-box">
              <input type="text" placeholder="Search..." className="search-input" />
              <button className="search-btn" aria-label="Search"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></button>
            </div>
          </div>
          <div className="widget">
            <h3 className="widget-title">Recent Posts</h3>
            <ul className="recent-list">
              {posts.slice(0, 4).map((p) => (<li key={p.id}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg><Link href={`/latest-news/${p.slug}`}>{p.title}</Link></li>))}
            </ul>
          </div>
          <div className="widget">
            <h3 className="widget-title">Archives</h3>
            <ul className="recent-list">
              {['May 2025', 'April 2025', 'March 2025', 'February 2025'].map((m) => (<li key={m}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg><span>{m}</span></li>))}
            </ul>
          </div>
        </aside>
      </div>

      <Footer />
      <FloatingWA />

      <style jsx>{`
        .post-hero { position:relative;min-height:280px;display:flex;align-items:flex-end;padding-bottom:2.5rem;overflow:hidden; }
        .post-hero-bg { position:absolute;inset:0;background-size:cover;background-position:center; }
        .post-hero-overlay { position:absolute;inset:0;background:linear-gradient(to top,rgba(6,6,15,0.97) 0%,rgba(6,6,15,0.5) 60%,rgba(6,6,15,0.3) 100%); }
        .post-hero-content { position:relative;z-index:2;max-width:1200px;margin:0 auto;width:100%;padding:0 2rem; }
        .breadcrumb { display:flex;align-items:center;gap:8px;font-size:12px;color:rgba(255,255,255,0.35);margin-bottom:0.75rem;flex-wrap:wrap; }
        .breadcrumb a { color:rgba(255,255,255,0.35);transition:color 0.2s; }
        .breadcrumb a:hover { color:#fff; }
        .breadcrumb span:last-child { color:rgba(255,255,255,0.65); }
        .post-cat { display:inline-block;color:#fff;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:3px 10px;border-radius:4px;margin-bottom:0.75rem; }
        .post-hero-content h1 { font-size:clamp(22px,4vw,36px);font-weight:700;line-height:1.3;margin-bottom:0.75rem;max-width:700px; }
        .post-meta { display:flex;gap:1.5rem;flex-wrap:wrap; }
        .post-meta span { display:flex;align-items:center;gap:5px;font-size:12px;color:rgba(255,255,255,0.4); }
        .post-layout { max-width:1200px;margin:0 auto;padding:3rem 2rem 4rem;display:grid;grid-template-columns:1fr 280px;gap:3rem;align-items:start; }
        .post-content { background:var(--bg-card);border:1px solid var(--border);border-radius:14px;padding:2rem; }
        .post-body :global(p) { font-size:15px;color:var(--text-secondary);line-height:1.9;font-weight:300;margin-bottom:1.25rem; }
        .post-body :global(h3) { font-size:18px;font-weight:700;color:#fff;margin:1.75rem 0 0.75rem;padding-left:12px;border-left:3px solid var(--accent); }
        .back-link { margin-top:2rem;padding-top:1.5rem;border-top:1px solid var(--border); }
        .back-link a { font-size:14px;color:var(--accent-2);font-weight:500;transition:opacity 0.2s; }
        .back-link a:hover { opacity:0.75; }
        .sidebar { display:flex;flex-direction:column;gap:1.5rem; }
        .widget { background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:1.25rem; }
        .widget-title { font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#fff;margin-bottom:1rem;padding-bottom:0.6rem;border-bottom:1px solid var(--border); }
        .search-box { display:flex;border:1px solid var(--border);border-radius:6px;overflow:hidden; }
        .search-input { flex:1;background:transparent;border:none;outline:none;padding:9px 12px;font-size:13px;color:#fff;font-family:var(--font-body); }
        .search-input::placeholder { color:var(--text-muted); }
        .search-btn { background:var(--accent);border:none;padding:9px 12px;color:#fff;cursor:pointer;display:flex;align-items:center; }
        .recent-list { list-style:none;display:flex;flex-direction:column;gap:0.65rem; }
        .recent-list li { display:flex;align-items:flex-start;gap:7px;font-size:13px;color:var(--text-secondary);line-height:1.5; }
        .recent-list li svg { color:var(--accent);flex-shrink:0;margin-top:3px; }
        .recent-list a { color:var(--text-secondary);transition:color 0.2s; }
        .recent-list a:hover { color:#fff; }
        @media(max-width:900px){ .post-layout{grid-template-columns:1fr;} .sidebar{display:none;} }
      `}</style>
    </>
  );
}
