# Basic App Website

A minimal single-page app that runs locally without any build tools.

## What's inside
- `index.html` – the app shell
- `assets/style.css` – modern, clean styling (dark/light)
- `assets/app.js` – tiny hash router + form validation
- `assets/logo.svg`, `assets/favicon.svg` – icons

## Run it
1. Unzip the archive.
2. Open `index.html` in your browser.
   - Tip: On macOS, right‑click and choose “Open With → Chrome/Safari.”
   - Tip: On Windows, double‑click or drag into a browser window.
3. (Optional) Use a local server for nicer URLs:
   - Python: `python -m http.server 8080`
   - Node: `npx serve`

## Customize
- Change colors in `:root` CSS variables.
- Add routes by editing the `views` object in `assets/app.js`.
- Hook up the Contact form to a backend endpoint if you have one.

## Deploy
Upload the folder contents to any static host (GitHub Pages, Netlify, Vercel static, Cloudflare Pages, S3, etc.).
