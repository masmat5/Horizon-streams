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
  title = 'HorizonStream IPTV - Best IPTV Subscription 2026 | 10,000+ Live Channels',
  description = 'Premium IPTV subscription with 10,000+ live channels, 4K/8K Ultra HD movies & live sports. StarShare, Opplex, B1G and 15+ premium servers. Start your free 2-hour trial on WhatsApp — instant activation, zero buffering.',
  keywords = 'IPTV subscription, buy IPTV, best IPTV service 2026, IPTV free trial, StarShare IPTV, Opplex IPTV, B1G 4K IPTV, IPTV reseller panel, 4K IPTV subscription, live sports IPTV, Firestick IPTV, Smart TV IPTV, cheap IPTV service',
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