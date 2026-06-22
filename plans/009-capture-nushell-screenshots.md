# Plan 009: Capture missing Nushell config screenshots

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` (unless a reviewer dispatched you and told you they
> maintain the index).
>
> **Drift check (run first)**: `git diff --stat 26cad63..HEAD -- src/data/configs.ts public/screenshots/`
> Check if the missing screenshots exist with `ls public/screenshots/nushell-*`.
> If both exist, this plan is already complete.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: content
- **Planned at**: commit `26cad63`, 2026-06-22

## Why this matters

Two Nushell config cards (`nushell-env`, `nushell-config`) display
"Screenshot unavailable" because the referenced PNGs don't exist in
`public/screenshots/`. This makes the Configs section look incomplete.

## Current state

`src/data/configs.ts` references:
```ts
screenshot: '/screenshots/nushell-env.png',     // line 55 - MISSING
screenshot: '/screenshots/nushell-config.png',  // line 65 - MISSING
```

Directory listing confirms neither file exists:
```
$ ls public/screenshots/nushell-*
ls: public/screenshots/nushell-*: No such file or directory
```

The existing screenshots are all 3683×2016 pixels. The project has a
capture script at `scripts/capture-screenshots.py` that uses VHS
(terminal recording) + PIL (post-processing). The AGENTS.md mentions
"Two Nushell config cards reference missing screenshots — will show
'Screenshot unavailable' fallback."

## Commands you will need

| Purpose            | Command                                      | Expected on success |
|--------------------|----------------------------------------------|---------------------|
| Capture screenshots| `python3 scripts/capture-screenshots.py ...` | PNGs created        |
| Verify size        | `file public/screenshots/nushell-env.png`    | 3683×2016           |
| Build              | `bun run build`                              | exit 0              |

## Scope

**In scope**:
- `public/screenshots/nushell-env.png` — create
- `public/screenshots/nushell-config.png` — create

**Out of scope**:
- Any changes to the capture script
- Any changes to configs.ts (the references already exist)

## Steps

### Step 1: Read the existing capture script

```bash
cat scripts/capture-screenshots.py
```

Understand the approach: it uses VHS (terminal GIF/PNG capture) and PIL
for post-processing (cropping, padding, resizing to 3683×2016).

### Step 2: Create VHS tape files for the two missing screenshots

Model after the existing VHS tape files in the repo (check
`.vhs-test-exec/` or `.vhs-test-hide/` for existing tape files).
If no tape files exist in the repo, create them manually:

**`nushell-env.tape`**:
```vhs
Output public/screenshots/nushell-env.png
Set Width 3683
Set Height 2016
Type "cat ~/.config/nushell/env.nu" Enter
Sleep 1s
```

**`nushell-config.tape`**:
```vhs
Output public/screenshots/nushell-config.png
Set Width 3683
Set Height 2016
Type "cat ~/.config/nushell/env.nu" Enter
Sleep 1s
```

If the existing capture script uses a different approach (e.g., running
Nushell directly), follow that approach instead.

### Step 3: Run the capture

```bash
# If using VHS directly:
vhs nushell-env.tape
vhs nushell-config.tape

# Or if using the Python script:
python3 scripts/capture-screenshots.py
```

**Verify**: `ls -lh public/screenshots/nushell-env.png public/screenshots/nushell-config.png`
→ both files exist

### Step 4: Verify dimensions match existing screenshots

```bash
file public/screenshots/nushell-env.png
file public/screenshots/nushell-config.png
```

**Verify**: Both are 3683×2016 pixels (matching the other screenshots).
If they differ, run the PIL post-processing steps from
`scripts/capture-screenshots.py` to resize/pad them to the correct
dimensions.

### Step 5: Rebuild and verify

```bash
bun run build
```

**Verify**: Build exits 0. The Nushell config cards now show screenshots
instead of "Screenshot unavailable."

## Test plan

- Open the site, expand both Nushell config cards — each should show a
  screenshot of the terminal output
- Verify the screenshots are visually consistent with the existing ones
  (same dimensions, same styling)

## Done criteria

- [ ] `ls public/screenshots/nushell-env.png` — file exists
- [ ] `ls public/screenshots/nushell-config.png` — file exists
- [ ] Both are 3683×2016 pixels (`file` command shows correct dimensions)
- [ ] `bun run build` exits 0
- [ ] No files outside the in-scope list are modified

## STOP conditions

- VHS is not installed (`which vhs` fails) — the capture script needs it.
  Install with `brew install vhs` (macOS) or `go install github.com/charmbracelet/vhs@latest`.
- Nushell is not installed (`which nu` fails) — the capture needs nushell.
  Install with `brew install nushell` (macOS).
- The capture script doesn't work on the current machine (e.g., missing
  display, missing fonts) — report back; use a manual approach instead:
  take a terminal screenshot, crop/resize with ImageMagick or similar.
- Screenshot dimensions don't match 3683×2016 — use ImageMagick to resize:
  `convert input.png -resize 3683x2016! output.png`

## Maintenance notes

If the capture script is updated in the future, these two screenshots
should be regenerated as well. They follow the same process as the
existing fastfetch, starship, opencode, and code-runner screenshots.
