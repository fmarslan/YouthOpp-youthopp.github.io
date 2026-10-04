# YouthOpp website

An English-language static opportunity catalog for nonprofit public benefit. Source summaries preserve original language. Built using AI agents under human maintainer direction.

## Run

Node.js 22 or newer; no dependencies or paid backend.

```sh
npm test
CATALOG_PATH=../data-pipeline/dist/catalog.json npm run build
python3 -m http.server 8080 --directory dist
```

Output: `dist/`. Without catalog data development builds show an honest empty state. Production requires catalog data. Tests use temporary explicit fixtures, never published as real listings.

Configure `site.config.json` for canonical domain, webmaster verification and optional consent-gated analytics. Documentation in `docs/*.md` is published at `/docs/`. Build-time pagination keeps catalog data out of browser downloads.
