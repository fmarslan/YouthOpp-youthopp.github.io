# YouthOpp website

An English-language static opportunity catalog for nonprofit public benefit. Source summaries preserve original language. Built using AI agents under human maintainer direction.

## Run

Node.js 22 or newer; no dependencies or paid backend.

```sh
npm test
CATALOG_PATH=../data-pipeline/dist/catalog.json CONTRIBUTORS_PATH=../data-pipeline/dist/contributors.json npm run build
python3 -m http.server 8080 --directory dist
```

Output: `dist/`. Without catalog data development builds show an honest empty state. Production requires the pipeline catalog and contributor snapshot from the same integrity-verified immutable release. The website does not collect source data or contributor history. Tests use temporary explicit fixtures, never published as real listings.

Configure `site.config.json` for canonical domain, webmaster verification and optional consent-gated analytics. Documentation in `docs/*.md` is published at `/docs/`. Build-time pagination keeps catalog data out of browser downloads.

Original project repositories: [YouthOpp/youthopp.github.io](https://github.com/YouthOpp/youthopp.github.io), [YouthOpp/data-pipeline](https://github.com/YouthOpp/data-pipeline), and [YouthOpp/.github](https://github.com/YouthOpp/.github). Deployment settings use the authorised operational repository copies.
