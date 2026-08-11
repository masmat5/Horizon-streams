const SITE_URL = 'https://horizonstreamiptv.com';

function generateSiteMap(postSlugs) {
  const staticPages = [
    { path: '/', changefreq: 'daily', priority: '1.0' },
    { path: '/reseller', changefreq: 'weekly', priority: '0.8' },
    { path: '/free_trial', changefreq: 'weekly', priority: '0.8' },
    { path: '/latest-news', changefreq: 'daily', priority: '0.7' },
  ];
  const postPages = postSlugs.map((slug) => ({
    path: `/latest-news/${slug}`,
    changefreq: 'monthly',
    priority: '0.6',
  }));
  const allPages = [...staticPages, ...postPages];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (p) => `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
}

function SiteMap() {
  // getServerSideProps handles the response; this component never renders.
  return null;
}

export async function getServerSideProps({ res }) {
  const { posts } = await import('./latest-news/index');
  const sitemap = generateSiteMap(posts.map((p) => p.slug));

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default SiteMap;