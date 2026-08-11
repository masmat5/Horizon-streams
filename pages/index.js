import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Servers from '../components/Servers';
import Features from '../components/Features';
import Plans from '../components/Plans';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import FloatingWA from '../components/FloatingWA';
import SEOHead, { SITE_URL } from '../components/SEOHead';

const serverListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'HorizonStream IPTV Premium Servers',
  itemListElement: [
    'StarShare', '5G Live', 'Opplex', 'B1G', 'Dream8K', 'GeoTV Server',
  ].map((name, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `${name} IPTV Server`,
  })),
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'IPTV Subscription Service',
  provider: { '@type': 'Organization', name: 'HorizonStream IPTV' },
  areaServed: 'Worldwide',
  description: 'Premium IPTV subscriptions with 10,000+ live channels, 4K/8K Ultra HD streaming, and multiple server options including StarShare, Opplex, and B1G.',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'GBP',
    lowPrice: '10',
    highPrice: '80',
    offerCount: '4',
  },
};

export default function Home() {
  return (
    <>
      <SEOHead
        title="HorizonStream IPTV - Best IPTV Subscription & Reseller Panel 2026"
        description="Get instant access to 10,000+ live channels, 4K/8K Ultra HD movies & sports with HorizonStream IPTV. Reliable StarShare, Opplex & B1G servers, free 2-hour trial, and instant WhatsApp activation."
        keywords="IPTV subscription, buy IPTV, best IPTV service, StarShare IPTV, Opplex IPTV, B1G 4K IPTV, IPTV reseller panel, free IPTV trial, 4K IPTV, IPTV for Firestick, IPTV for Smart TV"
        canonical={SITE_URL}
        structuredData={[serverListSchema, serviceSchema]}
      />
      <Navbar />
      <main>
        <Hero />
        <Servers />
        <Features />
        <Plans />
        <FAQ />
      </main>
      <Footer />
      <FloatingWA />
    </>
  );
}