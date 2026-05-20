import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Servers from '../components/Servers';
import Features from '../components/Features';
import Plans from '../components/Plans';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import FloatingWA from '../components/FloatingWA';

export default function Home() {
  return (
    <>
      <Head>
        <title>Horizon Streams IPTV – Premium Streaming Service</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
