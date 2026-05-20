import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content="Horizon Streams IPTV – Premium streaming service with StarShare, Opplex, and B1G servers. Watch thousands of channels in HD & 4K. Get your free trial on WhatsApp today." />
        <meta name="keywords" content="IPTV Pakistan, Horizon Streams IPTV, Opplex, StarShare, B1G, IPTV subscription, 4K streaming" />
        <meta property="og:title" content="Horizon Streams IPTV – Premium Streaming Service" />
        <meta property="og:description" content="Watch unlimited movies, TV shows, and live channels with Horizon Streams IPTV. Free trial available." />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
