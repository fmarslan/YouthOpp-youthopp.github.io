# Operations

## Collection and publication

Collection runs on pushes to the default branch, every six hours and manual dispatch in `fmarslan/YouthOpp-data-pipeline`. Website builds run on main-branch pushes, every six hours, manual dispatch and pull requests in `fmarslan/YouthOpp-youthopp.github.io`. Apply concurrency so overlapping publication cannot race. Validate adapter fixtures and the normalized catalog before publishing. Failed collection must retain prior healthy source state; failed site builds leave the last successful Pages deployment available.

Release assets hold durable normalized snapshots: `catalog-<run_id>-<run_attempt>` publishes `catalog.json`, `collection-report.json` and `manifest.json`, while `catalog-latest` holds the latest successful assets and manifest pointer. The collector restores its previous state from `catalog-latest`. The manifest records the immutable release tag, asset SHA-256 digests and byte sizes. Actions artifacts are short-lived diagnostics and must not be the only copy of usable data. A compact checked-in baseline can support the first deployment or explicit offline development; its timestamps must remain truthful. Keep raw samples small and useful for tests. Do not commit growing full article bodies or daily raw archives indefinitely.

Production website builds first capture `manifest.json` from `catalog-latest` in `fmarslan/YouthOpp-data-pipeline`, then retrieve `catalog.json` from its immutable `catalog-<run_id>-<run_attempt>` release and verify its SHA-256 digest and byte size before building all routes against that one snapshot. This uses the standard workflow token rather than a cross-repository personal access token. Missing or malformed manifests, download failures and integrity mismatches fail the build; production never silently falls back to unchecked data. Website and collector schedules are independent: a website build may consume the previous successful immutable release if collection has not finished yet. The `DATA_REPOSITORY` repository variable can override the dataset repository. PR builds skip release downloads and live contributor collection, exercising deterministic tests and an honest empty state when no local catalog exists. Production requires a catalog; a failed download or build prevents deployment and leaves the prior Pages deployment available. Deployments target only `fmarslan/YouthOpp-youthopp.github.io` on main. Publish the pipeline catalog before the first production website build. Deployment and data publication have separate permissions.

## Site and documentation

Generate category, host-country, source and opportunity routes. Use 30-record pages and ordinary navigation. Docs cover mission, architecture, adapter contract, source research, operations, contributor scoring, privacy and contribution workflow. English navigation and explanations coexist with original-language opportunity excerpts.

## Owner configuration

Google and Bing verification identifiers and analytics configuration are optional. Empty identifiers produce no placeholder verification metadata or tracking requests. Account verification and search-console submission are owner tasks. Configured analytics requires an accurate privacy statement and applicable consent behavior. No personal information is required to browse opportunities.

## Health

Record collection attempt time, last success, source error class and record count independently. A website generation timestamp cannot substitute for per-source health. Surface stale sources and unknown deadlines. Keep error logs free of credentials and full source article bodies.

## Reproduction and rollback

Document exact install, fixture test, collection and website build commands in each repository README. Dependency locks make builds reproducible. A prior dataset version and prior website code revision enable rollback; never overwrite history to disguise errors. The pipeline automatically retains the newest 30 published versioned catalog releases plus the current run and latest pointer; unrelated releases, drafts and prereleases are excluded. See [Catalog operations](/docs/pipeline-operations/) for verification and rollback details.

## Implementation status

This document defines the intended architecture. Feature status must be established by the checked-in workflows and passing integration tests; planned release publication, health metadata or analytics consent must not be described as completed if implementation differs.

## Verified production baseline — 5 October 2026

The [producer run 37270813364](https://github.com/fmarslan/YouthOpp-data-pipeline/actions/runs/37270813364) passed 41 tests, prior-state recovery, collection, immutable/latest publication and retention. [Release catalog-37270813364-1](https://github.com/fmarslan/YouthOpp-data-pipeline/releases/tag/catalog-37270813364-1), published at 06:07:29 UTC, contains 36 retained records from six healthy integrations. The current collection returned 34 records; two earlier Opportunities for Youth records were retained. These are source-health and indexed-record counts, not counts of open applications.

| Integration | Retained records |
|---|---:|
| Opportunities for Youth | 12 |
| Opportunity Desk | 10 |
| Scholarships Corner | 10 |
| Czech Fulbright programme metadata | 2 |
| NASA programme metadata | 1 |
| Portugal Fulbright programme metadata | 1 |

The catalog asset is 320,360 bytes with SHA-256 `8e3c9d2e689513eaa8b28ccaf25f596443a19eb3d61625fcfdc4ee895d8460ad`. The catalog, collection report and manifest were independently checked against the immutable release. The research register contains 110 entries; the runtime registry contains 111, including the unmatched Opportunities for Youth runtime source. Six working integrations do not meet the target of three to five reviewed sources per USA/EU country.

The Portugal record, “Bolsa Fulbright para Mestrado,” indexes the original programme title and link only. It is a scholarship programme overview with empty prose and unknown application availability, deadline, destination and eligible countries. Original publication is absent and stays null; the observed modification date is not publication. `PT` identifies the publisher, not applicant eligibility or programme destination. Czech and NASA programme/institutional records also remain information listings rather than inferred open youth calls. See [the scoped access review](/docs/access-review-2026-10-05/) for acquisition limits; Portugal RSS and permission-required IKY ingestion remain disabled.

Actual scheduled operation is separately evidenced by the successful producer [schedule run 37269037131](https://github.com/fmarslan/YouthOpp-data-pipeline/actions/runs/37269037131) and website [schedule run 37269677990](https://github.com/fmarslan/YouthOpp-youthopp.github.io/actions/runs/37269677990). Their creation times were 05:43:24 and 05:52:10 UTC respectively. A configured cron alone is not this evidence.

The subsequent website [run 37270828588](https://github.com/fmarslan/YouthOpp-youthopp.github.io/actions/runs/37270828588) passed build and Pages deployment, but captured the previous 35-record `catalog-37270179595-1` snapshot while the new producer release was still publishing. That deployment does not establish consumption of the 36-record release. For the next production build, verify its download log names `catalog-37270813364-1` or a newer integrity-checked release, then independently check hosted catalog and source-health pages.

Public Pages acceptance remains unresolved: the [project URL](https://fmarslan.github.io/YouthOpp-youthopp.github.io/) inherits a redirect to `fmarslan.com/YouthOpp-youthopp.github.io/`; prior direct checks returned 404, while restricted-network 403 probes were inconclusive. Resolving owner-controlled custom-domain routing is separate from a successful deploy. The [owner-private test Site](https://youthopp-test.fmarslan.chatgpt.site) supports review but does not establish public availability. Optional search verification and analytics remain disabled without owner-controlled identifiers.
