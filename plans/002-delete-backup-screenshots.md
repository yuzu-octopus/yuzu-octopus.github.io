# Plan 002: Delete backup screenshots from `public/screenshots/`

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` (unless a reviewer dispatched you and told you they
> maintain the index).
>
> **Drift check (run first)**: `git diff --stat 26cad63..HEAD -- public/screenshots/`
> If any screenshot file changed since this plan was written, list the live
> files with `ls public/screenshots/` before proceeding; if the backup files
> are already gone, this plan is already complete.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: tech-debt
- **Planned at**: commit `26cad63`, 2026-06-22

## Why this matters

Two unreferenced backup PNGs (`fastfetch-backup.png` at 802KB,
`starship-backup.png` at 113KB) are deployed to production as static
assets. They serve no purpose and waste bandwidth on every page load.

## Current state

```
$ ls -lh public/screenshots/
code-runner.gif       65K
fastfetch-backup.png  802K   ← unreferenced, ships to users
fastfetch.png         612K
ghostty.gif            16M
opencode.png          157K
starship-backup.png   113K   ← unreferenced, ships to users
starship.png           95K
```

The app only references files matching config IDs in `src/data/configs.ts`:
`fastfetch.png`, `starship.png`, `ghostty.gif`, `opencode.png`,
`nushell-env.png` (missing), `nushell-config.png` (missing),
`code-runner.gif`.

## Scope

**In scope**:
- `public/screenshots/fastfetch-backup.png` — delete
- `public/screenshots/starship-backup.png` — delete

**Out of scope**:
- Any other screenshot file
- The missing nushell screenshots (covered in plan 009)

## Steps

### Step 1: Delete the backup files

```bash
rm public/screenshots/fastfetch-backup.png public/screenshots/starship-backup.png
```

**Verify**: `ls public/screenshots/*-backup*` → exits non-zero (no matches)

## Test plan

- Verify no page references these files: `grep -r "backup" src/` → no output
- Verify `bun run build` still succeeds and the site renders correctly
- Verify `bun run dev` and quick visual check that fastfetch and starship
  cards still show their screenshots

## Done criteria

- [ ] `ls public/screenshots/*-backup*` returns nothing
- [ ] `grep -r "backup" src/` returns nothing
- [ ] `bun run build` exits 0
- [ ] No files outside the in-scope list are modified

## STOP conditions

- The backup files are already gone — plan already executed; mark DONE.
- A backup file is referenced somewhere in `src/` that was missed in the
  audit — stop and report the reference.

## Maintenance notes

If the screenshot capture script (`scripts/capture-screenshots.py`) creates
backup files again in future runs, update the script or add `*-backup.png`
to `.gitignore`.
