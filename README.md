# HorizonStream IPTV — Next.js Website

A premium IPTV marketing site built with Next.js 14 (static export). Every CTA (Free Trial, Contact, Plans, Servers, Reseller) opens WhatsApp with a pre-filled message. Live at `https://horizonstreamiptv.com`.

## WhatsApp Number
`+92 316 7029185` — configured in `lib/whatsapp.js`

---

## Quick Start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to /out
```

---

## Project Structure

```
samar-iptv/
├── pages/
│   ├── _app.js            # App wrapper + global CSS
│   ├── _document.js       # HTML head, fonts, icons
│   ├── index.js           # Home (Hero, Servers, Features, Plans, FAQ)
│   ├── free_trial.js      # Free trial page
│   ├── reseller.js        # IPTV reseller panel page
│   └── latest-news/       # Blog (index.js list + [slug].js posts)
├── components/            # Navbar, Hero, Servers, Features, Plans, FAQ, Footer, FloatingWA, SEOHead
├── lib/whatsapp.js        # WhatsApp number + message templates
├── public/                # robots.txt, sitemap.xml, site.webmanifest
└── styles/globals.css     # CSS variables + base styles
```

---

## Customization

- **WhatsApp number:** `PHONE` in `lib/whatsapp.js` (no `+` or spaces).
- **Prices:** `plans` array in `components/Plans.js`.
- **Servers (21):** `servers` array in `components/Servers.js`.
- **Colors:** CSS variables in `styles/globals.css`.
- **Blog posts:** add an entry to `posts` in `pages/latest-news/index.js` and its body to `fullContent` in `pages/latest-news/[slug].js`, then add the URL to `public/sitemap.xml`.

## SEO Notes

- Default title/description/keywords live in `components/SEOHead.js`; each page overrides them.
- `public/sitemap.xml` is static (the site uses `output: 'export'`), so update it when adding pages or posts.
- Still needed in `public/`: `og-image.jpg` (1200x630), `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` — referenced but not present yet.

## Deployment

Push to GitHub and import the repo in Vercel.

## Tech Stack
Next.js 14, React 18, styled-jsx, Google Fonts (Space Grotesk, Syne), WhatsApp `wa.me` deep links.
