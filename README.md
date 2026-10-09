# HorizonStream IPTV — Next.js Website + Blog Admin

IPTV marketing site (Next.js 14) with a Node.js + MySQL backend. The blog (`/latest-news`) is managed from a private admin panel at `/admin` — add, edit, schedule and delete posts without touching code. Every CTA (Free Trial, Plans, Servers, Reseller) opens WhatsApp with a pre-filled message. Live at `https://horizonstreamiptv.com`.

WhatsApp number: `+92 316 7029185` (`lib/whatsapp.js`).

---

## Run locally

1. Create an empty MySQL database (e.g. `horizonstream`). Tables are created automatically on first request.
2. Copy `.env.example` to `.env.local` and fill it in.
3. Make the admin password hash and paste it into `ADMIN_PASSWORD_HASH`:
   ```bash
   npm run admin:hash -- "your long password"
   ```
4. Generate `SESSION_SECRET`:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
5. Install, import the 9 starter posts (optional), run:
   ```bash
   npm install
   npm run seed
   npm run dev      # http://localhost:3000   (admin: /admin)
   ```
   No shell on the server? Log in to `/admin` with an empty posts list and press **Import the 9 starter posts** instead.

---

## Admin panel (`/admin`)

- Login: one admin (`ADMIN_EMAIL` + password). 5 wrong tries per IP locks login for 15 minutes.
- **New post / Edit / Delete**, **Save draft**, and **schedule** (pick a future date — it appears on the blog automatically at that time).
- Editor has HTML buttons (H2, H3, bold, lists, link, quote), image upload (JPG/PNG/WEBP/GIF, max 5 MB) and a preview.
- Post HTML is sanitised on save (scripts and event handlers are stripped).
- Posts are served server-side with SEO tags, JSON-LD (BlogPosting) and appear in `/sitemap.xml` automatically. `/admin` and `/api` are `noindex` / disallowed in `robots.txt`.

---

## Deploy on Hostinger (Node.js)

Needs a Hostinger plan with **Node.js Web App** support (Business / Cloud hosting or VPS).

1. hPanel → **Databases → MySQL Databases**: create a database + user. Note the name, user, password (host is normally `localhost`).
2. hPanel → **Websites → Add Website → Node.js Apps**: import the GitHub repo `masmat5/Horizon-streams` (branch `main`). Framework: Next.js, Node 20, build command `npm run build`, start command `npm start`.
3. In the app's **Environment variables**, set everything from `.env.example`: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`, `SITE_URL=https://horizonstreamiptv.com`.
4. Deploy, open `https://horizonstreamiptv.com/admin`, log in, press **Import the 9 starter posts**.
5. Uploaded images are written to `./uploads` next to the app. If a redeploy wipes that folder, set `UPLOAD_DIR` to a folder outside the app directory (e.g. `/home/<user>/hs-uploads`).

> The site is no longer a static export, so it cannot be hosted as plain HTML files — it must run as a Node.js app.

---

## Structure

```
pages/
  index.js, free_trial.js, reseller.js     public pages
  latest-news/index.js, [slug].js          blog (server-rendered from MySQL)
  sitemap.xml.js                           dynamic sitemap
  admin/                                   login, post list, post editor
  api/admin/                               login, logout, posts CRUD, upload, seed
  api/uploads/[name].js                    serves uploaded images (/uploads/:name)
lib/  db.js  posts.js  auth.js  sanitize.js  blogConfig.js  whatsapp.js
scripts/  seed.js  hash-password.js  seed-posts.json
components/  Navbar, Hero, Servers, Features, Plans, FAQ, Footer, FloatingWA, SEOHead, AdminBar
```

## Customise

- WhatsApp number: `PHONE` in `lib/whatsapp.js`. Prices: `components/Plans.js`. Servers (21): `components/Servers.js`. Colors: `styles/globals.css`.
- Blog categories: `CATEGORIES` in `lib/posts.js` and colors in `lib/blogConfig.js`.
- Still missing in `public/`: `og-image.jpg` (1200x630), `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`.
