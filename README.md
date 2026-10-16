# piskotysperlou.cz

Static one-page site (HTML + CSS + vanilla JS, no build step).

    python3 -m http.server 8000

Notes:
- Fonts (Inter, latin + latin-ext) are self-hosted in `fonts/`; no third-party requests.
- Banner images are WebP, max 1280 px on the long side.
- Configurator text lives in `data-*` attributes on the `.config-btn` buttons in `index.html`.
- Canonical/OG/sitemap URLs assume `https://piskotysperlou.cz/`.
- `img/og.jpg` (1200×630, blurred-fill of the Metal banner) is the social-preview image; regenerate it if the banner changes.
- The newsletter form is intentionally a stub: it shows a "just a joke" message and stores nothing.
