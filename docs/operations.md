# Operations

## Collection and publication

Use scheduled and manual Actions on trusted branches. Apply concurrency so overlapping publication cannot race. Validate adapter fixtures and the normalized catalog before publishing. Failed collection must retain prior healthy source state; failed site builds leave the last successful Pages deployment available.

Release assets are the intended durable normalized snapshot, with immutable timestamped versions and integrity metadata. Actions artifacts are short-lived diagnostics and must not be the only copy of usable data. A compact checked-in baseline can support the first deployment or explicit offline development; its timestamps must remain truthful. Keep raw samples small and useful for tests. Do not commit growing full article bodies or daily raw archives indefinitely.

The website retrieves a public dataset without a cross-repository personal access token and builds all routes against the same snapshot. Deployment and data publication are separate permissions. The upstream release repository can be configured so forks can test independently. Publishing PR branches is not required for correctness.

## Site and documentation

Generate category, host-country, source and opportunity routes. Use 30-record pages and ordinary navigation. Docs cover mission, architecture, adapter contract, source research, operations, contributor scoring, privacy and contribution workflow. English navigation and explanations coexist with original-language opportunity excerpts.

## Owner configuration

Google and Bing verification identifiers and analytics configuration are optional. Empty identifiers produce no placeholder verification metadata or tracking requests. Account verification and search-console submission are owner tasks. Configured analytics requires an accurate privacy statement and applicable consent behavior. No personal information is required to browse opportunities.

## Health

Record collection attempt time, last success, source error class and record count independently. A website generation timestamp cannot substitute for per-source health. Surface stale sources and unknown deadlines. Keep error logs free of credentials and full source article bodies.

## Reproduction and rollback

Document exact install, fixture test, collection and website build commands in each repository README. Dependency locks make builds reproducible. A prior dataset version and prior website code revision enable rollback; never overwrite history to disguise errors. Release retention policy should keep a recent known-good snapshot and explain storage limits.

## Implementation status

This document defines the intended architecture. Feature status must be established by the checked-in workflows and passing integration tests; planned release publication, health metadata or analytics consent must not be described as completed if implementation differs.
