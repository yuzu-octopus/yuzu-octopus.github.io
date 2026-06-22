# Plan 003: Deduplicate `draculaColors` constants

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` (unless a reviewer dispatched you and told you they
> maintain the index).
>
> **Drift check (run first)**: `git diff --stat 26cad63..HEAD -- src/theme/`
> If `dracula.ts` or `draculaSyntax.ts` changed since this plan was written,
> compare the "Current state" excerpts against the live code before proceeding;
> on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P3
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: tech-debt
- **Planned at**: commit `26cad63`, 2026-06-22

## Why this matters

The Dracula color palette is defined twice — once in `src/theme/dracula.ts`
(used by MUI theme + components) and once in `src/theme/draculaSyntax.ts`
(used by the syntax highlighter theme). Any palette change must be made in
both files, and they can drift apart.

## Current state

`src/theme/dracula.ts:3-15`:
```ts
export const draculaColors = {
  background: '#282a36',
  currentLine: '#44475a',
  foreground: '#f8f8f2',
  comment: '#6272a4',
  cyan: '#8be9fd',
  green: '#50fa7b',
  orange: '#ffb86c',
  pink: '#ff79c0',
  purple: '#bd93f9',
  red: '#ff5555',
  yellow: '#f1fa8c',
};
```

`src/theme/draculaSyntax.ts:7-18` — identical values, but defined as a
`const` with a different type annotation (`Record<string, string>`).

Note: the `pink` value differs subtly — `dracula.ts` uses `#ff79c0` while
`draculaSyntax.ts` uses `#ff79c6`. The spec value is `#ff79c6`. This plan
should reconcile to the spec value.

## Commands you will need

| Purpose   | Command              | Expected on success |
|-----------|----------------------|---------------------|
| Build     | `bun run build`      | exit 0              |
| Lint      | `bun run lint`       | exit 0              |

## Scope

**In scope**:
- `src/theme/draculaSyntax.ts` — change to import colors from `dracula.ts`

**Out of scope**:
- `src/theme/dracula.ts` — keep as the single source of truth
- Any component that imports `draculaColors` from `draculaSyntax.ts` —
  no component imports from there; only `ConfigCard.tsx` imports from
  `dracula.ts`, and `draculaSyntax.ts` is only imported by `ConfigCard.tsx`
  for `draculaSyntaxTheme`.

## Steps

### Step 1: Fix the `pink` value in `dracula.ts`

Current: `pink: '#ff79c0'`
Spec:    `pink: '#ff79c6'`

Change `src/theme/dracula.ts` line 11:
```
-  pink: '#ff79c0',
+  pink: '#ff79c6',
```

**Verify**: `grep "pink:" src/theme/dracula.ts` → `#ff79c6`

### Step 2: Import `draculaColors` in `draculaSyntax.ts`

Replace the standalone `draculaColors` definition in `src/theme/draculaSyntax.ts`
(lines 7-19, the entire `export const draculaColors = { ... };` block) with
an import from `dracula.ts`:

```ts
import { draculaColors } from './dracula';
```

Remove the duplicated `draculaColors` object entirely from this file.

**Verify**:
- `grep "background:" src/theme/draculaSyntax.ts` → should only find
  references inside the theme object, not a `export const draculaColors`
- `grep "export const draculaColors" src/theme/draculaSyntax.ts` → no match

### Step 3: Remove unused import in `ConfigCard.tsx`

`src/components/ConfigCard.tsx` line 19 imports `draculaColors` from
`../theme/dracula`. This import is still needed (used for styling in the
component). **No change needed here** — just verify the import works.

**Verify**: `bun run build` + `bun run lint` both exit 0

## Test plan

- Visual: open `localhost:5173`, verify all sections render with correct
  Dracula colors
- Color-specific: the `pink` change from `#ff79c0` to `#ff79c6` is
  imperceptible visually but correct per the Dracula spec

## Done criteria

- [ ] `bun run build` exits 0
- [ ] `bun run lint` exits 0
- [ ] `grep "export const draculaColors" src/theme/draculaSyntax.ts` → no match
- [ ] `grep "pink:" src/theme/dracula.ts` → `#ff79c6`
- [ ] No files outside the in-scope list are modified

## STOP conditions

- `draculaSyntax.ts` doesn't define `draculaColors` as a top-level
  export — the code has already been refactored; stop and report.
- Importing from `./dracula` creates a circular dependency — if so, stop
  and report (it should not, since `dracula.ts` doesn't import from
  `draculaSyntax.ts`).

## Maintenance notes

Any future palette changes only need to touch `src/theme/dracula.ts`.
`draculaSyntax.ts` is now a consumer, not a co-owner, of the palette.
