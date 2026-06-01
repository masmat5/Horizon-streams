import '../styles/globals.css';
// 1. SpeedInsights ko import karein
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      {/* 2. Component ke bilkul niche is tarah place kar dein */}
      <SpeedInsights />
    </>
  );
}