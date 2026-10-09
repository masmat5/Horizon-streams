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
        title="Best IPTV Subscription 2026 | Premium 4K IPTV, Free Trial & Reseller Panel"
        description="Looking for the best IPTV subscription? HorizonStream IPTV gives you 10,000+ live channels, movies & sports in 4K/8K on Firestick, Smart TV, Android & iPhone. 21 premium servers, free IPTV trial, from £10/month. Instant activation on WhatsApp."
        keywords="best IPTV, best IPTV subscription, best IPTV service 2026, IPTV subscription, buy IPTV, premium IPTV, cheap IPTV, IPTV free trial, IPTV 4K, 4K IPTV subscription, IPTV UK, IPTV USA, IPTV Pakistan, IPTV Canada, IPTV Firestick, IPTV Smart TV, IPTV Smarters Pro, TiviMate IPTV, M3U IPTV, Xtream Codes IPTV, IPTV reseller panel, live sports IPTV, cricket IPTV, StarShare IPTV, Opplex IPTV, B1G IPTV, HorizonStream IPTV"
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