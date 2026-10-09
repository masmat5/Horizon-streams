import Head from 'next/head';
import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ErrorPage({ code, title, text }) {
  return (
    <>
      <Head>
        <title>{`${title} | HorizonStream IPTV`}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Navbar />
      <main className="err-wrap">
        <p className="err-code">{code}</p>
        <h1 className="err-title">{title}</h1>
        <p className="err-text">{text}</p>
        <div className="err-actions">
          <Link href="/" className="err-btn">Go to homepage</Link>
          <Link href="/latest-news" className="err-btn ghost">Read our blog</Link>
          <Link href="/free_trial" className="err-btn ghost">Free trial</Link>
        </div>
      </main>
      <Footer />
      <style jsx>{`
        .err-wrap { min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:6rem 1.5rem 4rem; }
        .err-code { font-family:var(--font-display);font-size:clamp(72px,16vw,150px);font-weight:800;line-height:1;background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .err-title { font-size:clamp(22px,4vw,32px);margin:0.5rem 0; }
        .err-text { color:var(--text-secondary);max-width:460px;line-height:1.7;margin-bottom:1.75rem; }
        .err-actions { display:flex;gap:12px;flex-wrap:wrap;justify-content:center; }
        .err-wrap :global(.err-btn) { background:var(--accent);color:#fff;font-weight:600;font-size:14px;padding:11px 22px;border-radius:8px; }
        .err-wrap :global(.err-btn.ghost) { background:transparent;border:1px solid var(--border);color:var(--text-secondary); }
        .err-wrap :global(.err-btn.ghost:hover) { color:#fff;border-color:var(--border-hover); }
      `}</style>
    </>
  );
}
