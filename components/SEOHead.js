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
  title = 'Best IPTV Subscription 2026 | Premium 4K IPTV Service - HorizonStream IPTV',
  description = 'Premium IPTV subscription with 10,000+ live channels, 4K/8K Ultra HD movies & live sports. StarShare, Opplex, B1G and 15+ premium servers. Start your free 2-hour trial on WhatsApp — instant activation, zero buffering.',
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
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <meta name="author" content={SITE_NAME} />
      <meta name="theme-color" content="#7c3aed" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
}