# Website settings and operations

## Build and deploy

Run `npm test` and `npm run build` with Node.js 22. Set `CATALOG_PATH` to the published JSON catalog; output is `dist/`. Contributor data defaults to `contributors.json` beside `CATALOG_PATH`, or set `CONTRIBUTORS_PATH` explicitly. Production uses `REQUIRE_CATALOG=1` to reject missing catalog, registry or contributor data. Never publish test fixtures.

## Search verification

Configure the canonical URL and Google Search Console or Bing verification tokens in `site.config.json`. Submit the generated sitemap to verified webmaster accounts. Neither registration nor metadata guarantees ranking.

## Analytics

Tracking is off by default. Optional Google analytics is loaded only after an explicit visitor choice when an identifier is configured. Update the privacy policy before enabling tracking.

## Static scalability

Build-time category and destination pagination limits list pages to 30 records. Links work without JavaScript; no complete catalog is downloaded to the browser. Unknown status does not establish that applications remain open.

## Social and AI discovery

The source-controlled logo and social artwork support branding. PNG social preview, Open Graph, Twitter cards, canonical URLs, sitemap, robots.txt and llms.txt support discoverability. Original publishers remain the authority. These features do not guarantee search rank or AI citation.

## Fork deployment

The operational site URL is defined by `site.config.json` and deployment settings. Every internal link and asset receives the project subpath; canonical URLs and the sitemap include it. Contributor history is collected by the pipeline; the website displays the published snapshot.

The website workflow reads the `catalog-latest` manifest from the configured operational data repository for `YouthOpp/data-pipeline`, downloads `catalog.json` and `contributors.json` from the manifest's same immutable versioned release, and verifies both assets’ SHA-256 digests and byte sizes. Override the repository using the `DATA_REPOSITORY` repository variable if needed. Merge the pipeline first and complete its collection workflow before publishing the website.

In the website repository's Settings → Pages, select **GitHub Actions** as the build source. The workflow configures and deploys an already enabled Pages site; the standard Actions token cannot enable Pages on a repository where it has not been configured. Production deployment is restricted to the configured deployment repository's main branch. Pull requests only run tests and a deterministic empty-state documentation build.

## Hosted URL override

Set the website repository Actions variable `SITE_URL` to the confirmed public base URL, including its project path, to override the checked-in default during builds. Canonical URLs, social images, structured data, sitemap entries, AI discovery links and asset/navigation paths all derive from that value. An account-level GitHub Pages custom domain may redirect a project URL to that domain; confirm the actual deployed endpoint before setting it. Changing this variable does not configure or enable GitHub Pages.
