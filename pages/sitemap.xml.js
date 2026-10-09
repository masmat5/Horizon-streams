import { listSlugs } from '../lib/posts';

const SITE_URL = process.env.SITE_URL || 'https://horizonstreamiptv.com';

const STATIC_PAGES = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/free_trial', changefreq: 'weekly', priority: '0.9' },
  { path: '/reseller', changefreq: 'weekly', priority: '0.8' },
  { path: '/latest-news', changefreq: 'daily', priority: '0.7' },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

export async function getServerSideProps({ res }) {
  let posts = [];
  try {
    posts = await listSlugs();
  } catch (err) {
    console.error('[sitemap] database error, serving static pages only:', err.message);
  }
  const urls = [
    ...STATIC_PAGES.map((p) => ({ ...p, lastmod: null })),
    ...posts.map((p) => ({ path: `/latest-news/${p.slug}`, changefreq: 'monthly', priority: '0.6', lastmod: p.updatedAt })),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${esc(SITE_URL + u.path)}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
  res.write(xml);
  res.end();
  return { props: {} };
}

export default function SiteMap() {
  return null;
}
