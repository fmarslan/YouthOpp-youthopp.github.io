# Contributor scoring

YouthOpp recognizes public contributions without treating activity as a measure of talent, personal worth or employability.

## How the score is calculated

One point is awarded for each attributable authored non-merge commit in the default-branch history of fmarslan/YouthOpp-.github, fmarslan/YouthOpp-youthopp.github.io and fmarslan/YouthOpp-data-pipeline. Inherited upstream commits remain part of each fork’s history. Identical commit hashes are counted once across all three repositories. Merge commits, bot authors, the historical automated dataset-update message and messages beginning `Open AI agent:` are excluded. AI-generated delivery commits therefore do not inflate a person's score; they are excluded rather than displayed in a separate ranking.

GitHub's public commit-author mapping identifies profiles. GitHub noreply addresses can identify a login when API mapping is unavailable. Other identities are not guessed from display names or private email addresses. The page reports unresolved commits and partial collection; the score includes only evidence the collector can attribute.

## Limits

Commit count does not reflect effort, code quality, reviews, mentoring, research, design or all non-code work. Squashed work appears as one commit. Pull requests, issues and reviews are not scored in this version. A missing profile does not mean someone did not contribute. The collector uses full Git history, while API author mapping is limited to 100 pages per repository and marks incomplete requests as partial.

Each production build attempts a fresh collection; PR validation skips live history collection. Partial repository or author-mapping failures are published with warnings and unresolved counts. If every repository history fetch fails, the collector preserves the existing local file and exits with an error; the production workflow stops rather than silently deploying an old ranking. The previous successful Pages deployment remains available. Offline builds may use a local snapshot, and the contributor page shows its original collection timestamp.

## Public data and correction

Only public GitHub login, profile/avatar URL, repository attribution and counted activity are shown. Names default to the public login. Private email addresses are not published. To request a correction, open a GitHub issue; explain the public evidence that should be reviewed.

## Reproduce

Run `node scripts/contributors.mjs` to produce `data/contributors.json`, then `npm run build`. Run `node --test tests/contributors.test.mjs` for the scoring checks.
