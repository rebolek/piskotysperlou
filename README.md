# piskotysperlou.cz

Static one-page site (HTML + CSS + vanilla JS, no build step).

    python3 -m http.server 8000

Notes:
- Fonts (Inter, latin + latin-ext) are self-hosted in `fonts/`; no third-party requests.
- Banner images are WebP, max 1280 px on the long side.
- Configurator text lives in `data-*` attributes on the `.config-btn` buttons in `index.html`.
- Canonical/OG/sitemap URLs assume `https://piskotysperlou.cz/`.
