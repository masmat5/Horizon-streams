import '../styles/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import SEOHead, { SITE_URL, SITE_NAME } from '../components/SEOHead';

// Sitewide Organization + WebSite structured data (rendered on every page,
// page-level SEOHead calls override title/description/canonical/etc.)
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: 'Premium IPTV subscription service offering 10,000+ live channels, 4K/8K Ultra HD streaming, and instant WhatsApp-based activation.',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+92-316-7029185',
    contactType: 'customer service',
    areaServed: 'Worldwide',
    availableLanguage: ['English', 'Urdu'],
  },
  sameAs: [],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/latest-news?s={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <SEOHead structuredData={[organizationSchema, websiteSchema]} />
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  );
}