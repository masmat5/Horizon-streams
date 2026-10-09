import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FloatingWA from '../../components/FloatingWA';
import SEOHead, { SITE_URL } from '../../components/SEOHead';
import { getPublishedBySlug, listPublished } from '../../lib/posts';
import { CATEGORIES as catColor, formatDate, monthLabel } from '../../lib/blogConfig';

export async function getServerSideProps({ params, res }) {
  const post = await getPublishedBySlug(params.slug);
  if (!post) return { notFound: true };
  const recent = (await listPublished({ limit: 6 })).filter((p) => p.id !== post.id).slice(0, 4);
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
  return { props: { post, recent } };
}

export default function PostPage({ post, recent }) {
  const archives = [...new Set([post, ...recent].map((p) => monthLabel(p.publishedAt)))];
  const postUrl = `${SITE_URL}/latest-news/${post.slug}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Latest News', item: `${SITE_URL}/latest-news` },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image || undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: post.author, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'HorizonStream IPTV',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    articleSection: post.category,
  };

  return (
    <>
      <SEOHead
        title={`${post.title} | HorizonStream IPTV`}
        description={post.excerpt}
        keywords={`${post.category}, IPTV blog, HorizonStream IPTV, ${post.title.toLowerCase()}`}
        canonical={postUrl}
        ogImage={post.image ? (post.image.startsWith('/') ? `${SITE_URL}${post.image}` : post.image) : undefined}
        ogType="article"
        structuredData={[breadcrumbSchema, articleSchema]}
      />
      <Navbar />

      {/* Hero */}
      <div className="post-hero">
        {post.image && (
          <div
            className="post-hero-bg"
            style={{ backgroundImage: `url(${post.image})` }}
            role="img"
            aria-label={post.title}
          />
        )}
        <div className="post-hero-overlay" />
        <div className="post-hero-content">
          <nav className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/latest-news">Latest News</Link><span>/</span><span>{post.category}</span></nav>
          <span className="post-cat" style={{ background: catColor[post.category] || '#7c3aed' }}>{post.category}</span>
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>{post.author}</span>
            <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>{formatDate(post.publishedAt)}</span>
          </div>
        </div>
      </div>

      <div className="post-layout">
        <article className="post-content">
          <div className="post-body" dangerouslySetInnerHTML={{ __html: post.content }} />
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
              {recent.map((p) => (<li key={p.id}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg><Link href={`/latest-news/${p.slug}`}>{p.title}</Link></li>))}
            </ul>
          </div>
          <div className="widget">
            <h3 className="widget-title">Archives</h3>
            <ul className="recent-list">
              {archives.map((m) => (<li key={m}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg><span>{m}</span></li>))}
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
        .post-body :global(h2) { font-size:22px;font-weight:700;color:#fff;margin:2rem 0 0.85rem; }
        .post-body :global(h4) { font-size:16px;font-weight:700;color:#fff;margin:1.25rem 0 0.5rem; }
        .post-body :global(ul), .post-body :global(ol) { margin:0 0 1.25rem 1.4rem;color:var(--text-secondary);line-height:1.9;font-size:15px;font-weight:300; }
        .post-body :global(a) { color:var(--accent-2);text-decoration:underline; }
        .post-body :global(strong) { color:#fff;font-weight:600; }
        .post-body :global(blockquote) { margin:0 0 1.25rem;padding:0.5rem 1rem;border-left:3px solid var(--accent-2);color:var(--text-secondary);font-style:italic; }
        .post-body :global(img) { max-width:100%;height:auto;border-radius:10px;margin:0.5rem 0 1.25rem; }
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