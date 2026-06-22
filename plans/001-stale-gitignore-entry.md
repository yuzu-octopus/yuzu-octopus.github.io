# Plan 001: Remove stale `bun.lockb` entry from `.gitignore`

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` (unless a reviewer dispatched you and told you they
> maintain the index).
>
> **Drift check (run first)**: `git diff --stat 26cad63..HEAD -- .gitignore`
> If `.gitignore` changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P3
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: tech-debt
- **Planned at**: commit `26cad63`, 2026-06-22

## Why this matters

Clean up a dead config entry. Modern Bun (as used in this repo) writes
`bun.lock`, not `bun.lockb`. The stale pattern has no effect but causes
confusion when reading the gitignore.

## Current state

`.gitignore` line 38:
```
bun.lockb
```

The repo uses `bun.lock` (tracked in git):
```
$ git ls-files bun.lock
bun.lock
```

## Commands you will need

| Purpose   | Command                  | Expected on success |
|-----------|--------------------------|---------------------|
| Verify    | `grep bun.lockb .gitignore` | no output (entry removed) |

## Scope

**In scope**:
- `.gitignore`

**Out of scope** (do NOT touch):
- Any other gitignore entries
- `bun.lock` — this file is correctly tracked and must stay

## Steps

### Step 1: Remove the stale entry

In `.gitignore`, delete the line containing `bun.lockb`.

**Verify**: `grep -n "bun.lockb" .gitignore` → exits 1 (no match)

## Test plan

No functional change — just verify the entry is gone and the lockfile is still tracked:
- `git ls-files bun.lock` → still prints `bun.lock`
- `bun install` → still works

## Done criteria

- [ ] `grep -c "bun.lockb" .gitignore` exits 1 (no match)
- [ ] `git ls-files bun.lock` prints `bun.lock` (still tracked)
- [ ] `bun install` exits 0

## STOP conditions

- `.gitignore` line 38 does not contain `bun.lockb` — the file has drifted.
  Check the full gitignore for any other stale Bun entries.

## Maintenance notes

Bun's lockfile name has been stable at `bun.lock` since Bun 1.2. No future
interaction expected.
