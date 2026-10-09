import Link from 'next/link';

// basePath like "/latest-news"; extra = other query params to keep (e.g. { s: 'iptv' })
export function pageHref(basePath, page, extra = {}) {
  const params = new URLSearchParams();
  Object.entries(extra).forEach(([k, v]) => { if (v) params.set(k, v); });
  if (page > 1) params.set('page', String(page));
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export default function Pagination({ basePath, page, totalPages, extra = {} }) {
  if (totalPages <= 1) return null;
  const nums = [];
  for (let n = Math.max(1, page - 2); n <= Math.min(totalPages, page + 2); n += 1) nums.push(n);
  return (
    <nav className="pager" aria-label="Pagination">
      {page > 1 && <Link href={pageHref(basePath, page - 1, extra)} rel="prev">← Newer</Link>}
      {nums.map((n) => (n === page
        ? <span key={n} className="cur" aria-current="page">{n}</span>
        : <Link key={n} href={pageHref(basePath, n, extra)}>{n}</Link>))}
      {page < totalPages && <Link href={pageHref(basePath, page + 1, extra)} rel="next">Older →</Link>}
      <style jsx>{`
        .pager { display:flex;gap:8px;justify-content:center;align-items:center;flex-wrap:wrap;margin:1rem 0 0; }
        .pager :global(a), .cur { min-width:38px;padding:8px 12px;text-align:center;border-radius:8px;border:1px solid var(--border);font-size:13px;color:var(--text-secondary); }
        .pager :global(a:hover) { color:var(--ink);border-color:var(--border-hover); }
        .cur { background:var(--accent);border-color:var(--accent);color:#fff;font-weight:600; }
      `}</style>
    </nav>
  );
}
