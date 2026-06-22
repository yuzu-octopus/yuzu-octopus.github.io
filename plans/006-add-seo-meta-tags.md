# Plan 006: Add SEO / social preview meta tags to `index.html`

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` (unless a reviewer dispatched you and told you they
> maintain the index).
>
> **Drift check (run first)**: `git diff --stat 26cad63..HEAD -- index.html`
> If `index.html` changed since this plan was written, compare the `<head>`
> section against the "Current state" excerpts before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: docs
- **Planned at**: commit `26cad63`, 2026-06-22

## Why this matters

The portfolio has no SEO or social preview meta tags. When the URL is
shared on social media (Twitter/X, LinkedIn, Discord, Slack), it shows
a bare URL with no preview card. Adding Open Graph and Twitter Card
tags makes shared links display a title, description, and image.

## Current state

`index.html` `<head>` section (lines 3-7):
```html
<meta charset="UTF-8" />
<link rel="icon" type="image/png" href="/favicon.png" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>yuzu — Developer Portfolio</title>
```

No `<meta name="description">`, no `og:*`, no `twitter:*` tags.

## Commands you will need

| Purpose    | Command                    | Expected on success |
|------------|----------------------------|---------------------|
| Build      | `bun run build`            | exit 0              |
| Verify     | `grep -c "og:title" docs/index.html` | 1 (tag present in build output) |

## Scope

**In scope**:
- `index.html` — add meta tags in `<head>`
- A social preview image (optional — create/open a 1200×630 PNG at
  `public/social-preview.png` if desired, or skip if no image is ready)

**Out of scope**:
- Dynamic SEO (this is a static SPA, all meta is hardcoded)
- Structured data / JSON-LD (overkill for a portfolio)

## Steps

### Step 1: Add standard meta tags

Add the following tags to `<head>` in `index.html`, after the existing
`<meta name="viewport">` line and before `<title>`:

```html
<meta name="description" content="Solo developer who loves CTFs and configuring everything. Developer portfolio featuring configs, tools, and projects." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://yuzu-octopus.github.io" />
<meta property="og:title" content="yuzu — Developer Portfolio" />
<meta property="og:description" content="Solo developer who loves CTFs and configuring everything." />
<meta property="og:image" content="https://yuzu-octopus.github.io/favicon.png" />
<meta property="twitter:card" content="summary" />
<meta property="twitter:title" content="yuzu — Developer Portfolio" />
<meta property="twitter:description" content="Solo developer who loves CTFs and configuring everything." />
<meta property="twitter:image" content="https://yuzu-octopus.github.io/favicon.png" />
```

Note: Uses the existing favicon as the social preview image. This is better
than nothing. For a proper social preview, you'd want a 1200×630 PNG, but
that's out of scope for this plan.

**Verify**: `grep -c "og:title" index.html` → 1

### Step 2: Build and check

```bash
bun run build
grep -c "og:title" docs/index.html
```

**Verify**: Build exits 0, grep shows 1 (tag was copied to the output)

## Test plan

- Open `docs/index.html` and verify all meta tags are present
- Test with the [Open Graph Debugger](https://opengraph.dev/) or
  [Twitter Card Validator](https://cards-dev.twitter.com/validator)
  after deployment (live URL required)

## Done criteria

- [ ] `grep "og:title" index.html` shows the tag
- [ ] `grep "twitter:card" index.html` shows the tag
- [ ] `grep "name=\"description\"" index.html` shows the tag
- [ ] `bun run build` exits 0
- [ ] No files outside the in-scope list are modified

## STOP conditions

- The site URL is not `https://yuzu-octopus.github.io` — verify and
  update `og:url` accordingly
- The favicon path changed — update `og:image` to match the actual path

## Maintenance notes

When a proper social preview image (1200×630 PNG) is created later,
update the `og:image` and `twitter:image` URLs. The `og:description`
should be kept in sync with the site tagline if it changes.
