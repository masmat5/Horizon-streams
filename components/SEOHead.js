import Head from 'next/head';

export const SITE_URL = 'https://horizonstreamiptv.com';
export const SITE_NAME = 'HorizonStream IPTV';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/**
 * Global + per-page SEO component.
 * Usage on a page:
 *   <SEOHead
 *     title="Custom Page Title | HorizonStream IPTV"
 *     description="..."
 *     keywords="..."
 *     canonical={`${SITE_URL}/reseller`}
 *     structuredData={mySchemaObjectOrArray}
 *   />
 */
export default function SEOHead({
  title = 'Best IPTV Subscription 2026 | 4K IPTV & Free Trial',
  description = 'Best IPTV subscription with 10,000+ live channels, movies & sports in 4K on Firestick, Smart TV & Android. 21 servers, free trial, from £10/month.',
  keywords = 'best IPTV, best IPTV subscription, best IPTV service 2026, IPTV subscription, buy IPTV, premium IPTV, cheap IPTV, IPTV free trial, IPTV 4K, 4K IPTV subscription, IPTV UK, IPTV USA, IPTV Pakistan, IPTV Canada, IPTV Firestick, IPTV Smart TV, IPTV Smarters Pro, TiviMate IPTV, M3U IPTV, Xtream Codes IPTV, IPTV reseller panel, live sports IPTV, cricket IPTV, StarShare IPTV, Opplex IPTV, B1G IPTV, HorizonStream IPTV',
  canonical = SITE_URL,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noindex = false,
  structuredData = null,
}) {
  const jsonLd = Array.isArray(structuredData) ? structuredData : structuredData ? [structuredData] : [];

  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="description" name="description" content={description} />
      <meta key="keywords" name="keywords" content={keywords} />
      <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />
      <meta key="robots" name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <meta key="author" name="author" content={SITE_NAME} />
      <meta key="theme-color" name="theme-color" content="#0f8a7a" />
      <link key="canonical" rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta key="og:type" property="og:type" content={ogType} />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:description" property="og:description" content={description} />
      <meta key="og:url" property="og:url" content={canonical} />
      <meta key="og:site_name" property="og:site_name" content={SITE_NAME} />
      <meta key="og:image" property="og:image" content={ogImage} />
      <meta key="og:image:width" property="og:image:width" content="1200" />
      <meta key="og:image:height" property="og:image:height" content="630" />
      <meta key="og:locale" property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="twitter:description" name="twitter:description" content={description} />
      <meta key="twitter:image" name="twitter:image" content={ogImage} />

      {jsonLd.map((schema, i) => (
        <script
          key={`ld-${schema['@type'] || 'schema'}-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
}