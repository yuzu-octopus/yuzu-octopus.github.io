# Plan 005: Compress 16MB ghostty GIF

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` (unless a reviewer dispatched you and told you they
> maintain the index).
>
> **Drift check (run first)**: `git diff --stat 26cad63..HEAD -- public/screenshots/ghostty.gif`
> If ghostty.gif changed since this plan was written, check its size with
> `ls -lh public/screenshots/ghostty.gif`; if it's already <2MB, this plan
> is already done.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: perf
- **Planned at**: commit `26cad63`, 2026-06-22

## Why this matters

`ghostty.gif` is 16MB — larger than all JavaScript bundles combined (632KB +
365KB). It's loaded inline in the Ghostty config card on every page visit.
On mobile connections, this single asset dominates page load time.

## Current state

```
$ ls -lh public/screenshots/ghostty.gif
16M public/screenshots/ghostty.gif
```

The GIF is a terminal demo animation at 3683×2016 pixels with many frames.

## Commands you will need

| Purpose       | Command                    | Expected on success |
|---------------|----------------------------|---------------------|
| Check size    | `ls -lh public/screenshots/ghostty.gif` | <2MB after compression |
| Install deps  | see step 1                 | exit 0              |
| Build         | `bun run build`            | exit 0              |

## Suggested executor toolkit

- `gifsicle` — CLI GIF optimizer (`brew install gifsicle`) for macOS
  or `apt install gifsicle` on Linux. The repo's AGENTS.md mentions
  gifsicle as the tool used for Ghostty GIF resize.

## Scope

**In scope**:
- `public/screenshots/ghostty.gif` — compress in place

**Out of scope**:
- Any other screenshot file
- Converting the GIF to a video format (WebM/MP4) — that would require
  HTML changes to support `<video>` tags and poster frames. Only do this
  if the user explicitly asks.

## Steps

### Step 1: Install gifsicle (if not already installed)

```bash
which gifsicle || brew install gifsicle
```

**Verify**: `gifsicle --version` → prints version info

### Step 2: Create a backup of the original

```bash
cp public/screenshots/ghostty.gif public/screenshots/ghostty-original.gif
```

**Verify**: `ls -lh public/screenshots/ghostty-original.gif` → 16MB

### Step 3: Optimize with gifsicle

Try aggressive optimization with color reduction:

```bash
gifsicle --optimize=3 --colors 256 --lossy=80 \
  -O3 --careful \
  -i public/screenshots/ghostty.gif \
  -o public/screenshots/ghostty.gif
```

Flags explained:
- `--optimize=3` — maximum optimization level
- `--colors 256` — reduce color palette to 256 (still fine for terminal output)
- `--lossy=80` — accept some quality loss (terminal text is high-contrast,
  this won't be noticeable)
- `--careful` — don't alter frame disposal

**Verify**: `ls -lh public/screenshots/ghostty.gif` → should be significantly
smaller (target: <2MB). If >3MB, try a second pass with `--lossy=90`.

### Step 4: Verify visual quality

Open the compressed GIF in a browser to check:
```bash
open public/screenshots/ghostty.gif   # macOS
```
The terminal text should still be readable. The GIF is displayed at
`width: 100%; height: auto;` inside a card, so minor artifacts are
not visible.

### Step 5: Clean up backup

```bash
rm public/screenshots/ghostty-original.gif
```

**Verify**: `ls public/screenshots/ghostty-original.gif` → file not found

### Step 6: Rebuild and verify

```bash
bun run build
```

**Verify**: Build succeeds and the compressed GIF is copied to `docs/`.

## Test plan

- Visual: open the site, scroll to the Ghostty config card, verify the
  animation still looks acceptable
- Size: verify the GIF is under 2MB (preferably under 1MB)

## Done criteria

- [ ] `ls -lh public/screenshots/ghostty.gif` — file is <2MB
- [ ] The GIF plays correctly in a browser
- [ ] `bun run build` exits 0
- [ ] No files outside the in-scope list are modified

## STOP conditions

- gifsicle cannot be installed — report back; alternative tools exist
  (ImageMagick `convert`, ffmpeg palettegen) but the plan assumes gifsicle
- The compressed GIF is visually broken (corrupted frames, wrong colors) —
  restore from backup and try less aggressive settings
- The original file is smaller than 3MB already — this plan is already
  partially done; skip to verification

## Maintenance notes

If the screenshot capture script (`scripts/capture-screenshots.py`) is
re-run, the GIF will be regenerated at full size. Consider adding a
post-processing step to the capture script that runs gifsicle
automatically after capture.
