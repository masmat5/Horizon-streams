<<<<<<< HEAD
# Samar IPTV — Next.js Website

A premium IPTV landing page built with Next.js. All CTAs (Free Trial, Contact Us, Plan buttons, Server cards) open WhatsApp with pre-filled messages.

## WhatsApp Number
`+92 344 6855083` — configured in `lib/whatsapp.js`

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production
```bash
npm run build
npm run start
```

---

## Project Structure

```
samar-iptv/
├── pages/
│   ├── _app.js          # App wrapper + global CSS
│   ├── _document.js     # HTML head, fonts, meta tags
│   └── index.js         # Main page
├── components/
│   ├── Navbar.js        # Sticky top navigation
│   ├── Hero.js          # Hero section with Free Trial button
│   ├── Servers.js       # StarShare / Opplex / B1G cards
│   ├── Features.js      # Why Samar IPTV section
│   ├── Plans.js         # Pricing plans (1mo, 3mo, 6mo, 1yr)
│   ├── FAQ.js           # Accordion FAQ
│   ├── Footer.js        # Footer with links
│   └── FloatingWA.js    # Fixed WhatsApp floating button
├── lib/
│   └── whatsapp.js      # WhatsApp number + all message templates
├── styles/
│   └── globals.css      # Global CSS variables and base styles
├── public/
│   └── favicon.ico      # Add your favicon here
├── next.config.js
└── package.json
```

---

## Customization

### Change WhatsApp number
Edit `lib/whatsapp.js`:
```js
const PHONE = '923446855083'; // replace with your number (no + or spaces)
```

### Change prices
Edit `components/Plans.js` — update the `plans` array.

### Change server names / descriptions
Edit `components/Servers.js` — update the `servers` array.

### Change colors
Edit `styles/globals.css` — update the CSS variables in `:root`:
```css
--accent: #e50914;       /* Red accent color */
--wa-green: #25D366;     /* WhatsApp green */
--bg-primary: #080810;   /* Main background */
```

---

## Deployment

### Deploy to Vercel (recommended — free)
1. Push this project to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repo
4. Click Deploy — done!

### Deploy to Netlify
```bash
npm run build
# Upload the .next folder to Netlify
```

---

## Tech Stack
- **Next.js 14** — React framework with SSR/SSG
- **CSS Modules (styled-jsx)** — Scoped component styles
- **Google Fonts** — Bebas Neue + Outfit
- **WhatsApp API** — `wa.me` deep links with pre-filled messages
=======
# Horizon-streams
This repositery created for an Iptv website created in reactjs
>>>>>>> 0e10bddbe73d97fab96386a8dd20707825d4fa8f
