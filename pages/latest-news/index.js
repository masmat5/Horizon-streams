import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FloatingWA from '../../components/FloatingWA';

export const posts = [
  { id: 1, slug: 'best-iptv-apps-2025', category: 'Streaming Tips', title: 'Best IPTV Apps to Use With HorizonStream IPTV in 2025', date: 'May 18, 2025', author: 'HorizonStream IPTV Team', excerpt: 'Looking for the best app to stream your HorizonStream IPTV subscription? We tested dozens of players and picked the top 5 that work flawlessly on Android, iOS, and Smart TV.', image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=70' },
  { id: 2, slug: 'opplex-new-channels-added', category: 'Server Update', title: 'Opplex Server — 500+ New Channels Added This Month', date: 'May 10, 2025', author: 'HorizonStream IPTV Team', excerpt: 'We are excited to announce that the Opplex server has been updated with over 500 new channels including premium sports, international news, and regional content from South Asia.', image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&q=70' },
  { id: 3, slug: 'how-to-setup-iptv-smart-tv', category: 'How To', title: 'How to Set Up IPTV on Your Smart TV — Step by Step', date: 'April 28, 2025', author: 'HorizonStream IPTV Team', excerpt: 'Setting up IPTV on a Smart TV is easier than you think. In this guide we walk you through every step — from installing the right app to entering your HorizonStream IPTV credentials.', image: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&q=70' },
  { id: 4, slug: 'starshare-4k-sports-update', category: 'Server Update', title: 'StarShare Now Streaming 4K Sports Channels', date: 'April 15, 2025', author: 'HorizonStream IPTV Team', excerpt: 'The StarShare server has been upgraded with 4K sports streaming for major leagues. Enjoy crystal-clear football, cricket, and basketball without any buffering.', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=70' },
  { id: 5, slug: 'b1g-server-uptime-record', category: 'News', title: 'B1G Server Achieves 99.9% Uptime Record in 2025', date: 'March 30, 2025', author: 'HorizonStream IPTV Team', excerpt: 'Our B1G 4K server maintained a 99.9% uptime throughout the first quarter of 2025. We continue to invest in infrastructure to ensure the best possible streaming experience.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=70' },
];

const catColor = { 'Streaming Tips': '#7c3aed', 'Server Update': '#06b6d4', 'How To': '#f59e0b', 'News': '#4ade80' };

export default function LatestNews() {
  return (
    <>
      <Head>
        <title>Latest News – HorizonStream IPTV</title>
        <meta name="description" content="Get the latest news and updates from HorizonStream IPTV — server updates, streaming tips, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />

      {/* Hero */}
      <div className="news-hero">
        <div className="news-hero-bg" />
        <div className="news-hero-overlay" />
        <div className="news-hero-content">
          <nav className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Latest News</span></nav>
          <h1>Latest <span className="gradient-text">News</span></h1>
          <p>Get the latest news and updates from HorizonStream IPTV</p>
        </div>
      </div>

      <div className="news-layout">
        {/* Posts */}
        <main className="posts-col">
          {posts.map((post) => (
            <article key={post.id} className="post-card">
              {post.image && (
                <div className="post-img-wrap">
                  <img src={post.image} alt={post.title} className="post-img" loading="lazy" />
                  <span className="post-cat" style={{ background: catColor[post.category] || '#7c3aed' }}>{post.category}</span>
                </div>
              )}
              <div className="post-body">
                <h2 className="post-title"><Link href={`/latest-news/${post.slug}`}>{post.title}</Link></h2>
                <div className="post-meta">
                  <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>{post.author}</span>
                  <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>{post.date}</span>
                </div>
                <p className="post-excerpt">{post.excerpt}</p>
                <Link href={`/latest-news/${post.slug}`} className="read-more">Continue Reading →</Link>
              </div>
            </article>
          ))}
        </main>

        {/* Sidebar */}
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
              {posts.slice(0, 4).map((p) => (
                <li key={p.id}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg><Link href={`/latest-news/${p.slug}`}>{p.title}</Link></li>
              ))}
            </ul>
          </div>
          <div className="widget">
            <h3 className="widget-title">Categories</h3>
            <ul className="cat-list">
              {Object.entries(catColor).map(([cat, color]) => (
                <li key={cat}><span className="cat-dot" style={{ background: color }} />{cat}</li>
              ))}
            </ul>
          </div>
          <div className="widget">
            <h3 className="widget-title">Archives</h3>
            <ul className="recent-list">
              {['May 2025', 'April 2025', 'March 2025', 'February 2025'].map((m) => (
                <li key={m}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg><span>{m}</span></li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <Footer />
      <FloatingWA />

      <style jsx>{`
        .news-hero { position:relative;height:240px;display:flex;align-items:center;overflow:hidden; }
        .news-hero-bg { position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=60') center/cover no-repeat;filter:brightness(0.25); }
        .news-hero-overlay { position:absolute;inset:0;background:linear-gradient(135deg,rgba(124,58,237,0.3) 0%,rgba(6,182,212,0.15) 100%); }
        .news-hero-content { position:relative;z-index:2;padding:0 2rem;max-width:1200px;margin:0 auto;width:100%; }
        .breadcrumb { display:flex;align-items:center;gap:8px;font-size:13px;color:rgba(255,255,255,0.45);margin-bottom:0.75rem; }
        .breadcrumb a { color:rgba(255,255,255,0.45);transition:color 0.2s; }
        .breadcrumb a:hover { color:#fff; }
        .breadcrumb span:last-child { color:rgba(255,255,255,0.8); }
        .news-hero-content h1 { font-family:var(--font-display);font-size:clamp(36px,5vw,56px);font-weight:800;letter-spacing:-1px;margin-bottom:0.25rem; }
        .gradient-text { background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .news-hero-content p { color:rgba(255,255,255,0.5);font-size:15px;font-weight:300; }
        .news-layout { max-width:1200px;margin:0 auto;padding:3rem 2rem 4rem;display:grid;grid-template-columns:1fr 290px;gap:3rem;align-items:start; }
        /* Post cards */
        .post-card { background:var(--bg-card);border:1px solid var(--border);border-radius:14px;overflow:hidden;margin-bottom:1.75rem;transition:border-color 0.2s; }
        .post-card:hover { border-color:var(--border-hover); }
        .post-img-wrap { position:relative;height:260px;overflow:hidden; }
        .post-img { width:100%;height:100%;object-fit:cover;transition:transform 0.4s; }
        .post-card:hover .post-img { transform:scale(1.03); }
        .post-cat { position:absolute;bottom:12px;left:16px;color:#fff;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:4px 10px;border-radius:4px; }
        .post-body { padding:1.5rem; }
        .post-title { font-size:20px;font-weight:700;line-height:1.4;margin-bottom:0.75rem; }
        .post-title a { color:#fff;transition:color 0.2s; }
        .post-title a:hover { color:var(--accent-2); }
        .post-meta { display:flex;gap:1.25rem;margin-bottom:0.75rem;flex-wrap:wrap; }
        .post-meta span { display:flex;align-items:center;gap:5px;font-size:12px;color:var(--text-muted); }
        .post-excerpt { font-size:14px;color:var(--text-secondary);line-height:1.8;font-weight:300;margin-bottom:1.25rem; }
        .read-more { display:inline-block;background:var(--accent);color:#fff;font-size:13px;font-weight:600;padding:8px 18px;border-radius:6px;transition:opacity 0.2s; }
        .read-more:hover { opacity:0.85; }
        /* Sidebar */
        .sidebar { display:flex;flex-direction:column;gap:1.5rem; }
        .widget { background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:1.25rem; }
        .widget-title { font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#fff;margin-bottom:1rem;padding-bottom:0.6rem;border-bottom:1px solid var(--border); }
        .search-box { display:flex;border:1px solid var(--border);border-radius:6px;overflow:hidden; }
        .search-input { flex:1;background:transparent;border:none;outline:none;padding:9px 12px;font-size:13px;color:#fff;font-family:var(--font-body); }
        .search-input::placeholder { color:var(--text-muted); }
        .search-btn { background:var(--accent);border:none;padding:9px 12px;color:#fff;cursor:pointer;display:flex;align-items:center;transition:opacity 0.2s; }
        .search-btn:hover { opacity:0.85; }
        .recent-list { list-style:none;display:flex;flex-direction:column;gap:0.65rem; }
        .recent-list li { display:flex;align-items:flex-start;gap:7px;font-size:13px;color:var(--text-secondary);line-height:1.5; }
        .recent-list li svg { color:var(--accent);flex-shrink:0;margin-top:3px; }
        .recent-list a { color:var(--text-secondary);transition:color 0.2s; }
        .recent-list a:hover { color:#fff; }
        .cat-list { list-style:none;display:flex;flex-direction:column;gap:0.65rem; }
        .cat-list li { display:flex;align-items:center;gap:8px;font-size:13px;color:var(--text-secondary); }
        .cat-dot { width:8px;height:8px;border-radius:50%;flex-shrink:0; }
        @media(max-width:900px){ .news-layout{grid-template-columns:1fr;} .sidebar{display:none;} }
        @media(max-width:480px){ .post-img-wrap{height:200px;} }
      `}</style>
    </>
  );
}
