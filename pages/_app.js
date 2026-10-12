import '../styles/globals.css';
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';

// Self-hosted at build time: no request to Google on page load, no layout shift (size-adjusted fallbacks)
const body = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], display: 'swap' });
const display = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['500', '600', '700', '800'], display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap' });
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
      <style jsx global>{`
        html:root {
          --font-display: ${display.style.fontFamily};
          --font-body: ${body.style.fontFamily};
          --font-mono: ${mono.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}