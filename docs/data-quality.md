# Data quality and freshness

YouthOpp is a discovery index, not the authoritative application service. Always confirm current eligibility, deadlines and application instructions with the original publisher. A successfully downloaded feed is not certification of its opportunities.

## What the RSS adapter currently knows

The implemented RSS adapter retains the item title, original URL, feed URL, publication date when parseable, a plain-text excerpt of up to 600 characters and source tags. Language comes from the reviewed source manifest. Categories are derived conservatively from feed tags; unmatched records remain `other`.

The RSS adapter currently leaves deadline, location, destination countries and eligible countries unknown. It does not extract or guess these from titles. Therefore missing country catalogs or unknown deadlines reflect real metadata gaps rather than universal eligibility. Training, competition and grant categories may require richer reviewed adapters before reliable classification.

## Validation and identity

Records require stable IDs, original URLs, source identifiers and observation timestamps. Validation rejects unsafe URL schemes, embedded credentials, invalid dates, malformed country codes, unsupported categories, duplicate IDs within an adapter batch and non-plain or oversized summaries. IDs derive from the source and item URL. Different publishers mentioning the same programme may still have separate records; cross-publisher semantic deduplication is not implemented.

## Collection failures

The scheduled workflow restores the prior successful release before collecting. A failed source preserves its previous records and success timestamps, records a new attempt timestamp and exposes an error. Source errors do not pretend a new successful check occurred. If all enabled sources fail, the pipeline fails instead of publishing a replacement catalog.

The first collection has no previous state. Retention also depends on restoring prior state correctly; a local run without `PREVIOUS_CATALOG` cannot retain an earlier snapshot. Disabled sources are removed from the active output. Records disappearing from a feed remain retained while their source is enabled; absent items are not automatically declared closed.

## Status and publication

Known deadlines produce `open` or `expired` status; a missing deadline produces `unknown`. `open` means the supplied deadline has not passed, not that eligibility or availability was independently verified. Snapshot generation time differs from a source's last successful check.

Versioned release assets preserve published snapshots; the latest release pointer feeds the static site build. A site build failure should leave the last successful deployment available. Source-directory research evidence, integration status and content freshness are distinct facts and must not be conflated.
