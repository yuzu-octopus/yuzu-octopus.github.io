# Plan 004: Fix `nu`→`bash` language mapping in ConfigCard

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` (unless a reviewer dispatched you and told you they
> maintain the index).
>
> **Drift check (run first)**: `git diff --stat 26cad63..HEAD -- src/components/ConfigCard.tsx`
> If `ConfigCard.tsx` changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P3
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: correctness
- **Planned at**: commit `26cad63`, 2026-06-22

## Why this matters

Two Nushell config cards (`nushell-env` and `nushell-config`) get bash
syntax highlighting because the `languageMap` maps `'nu'` to `'bash'`.
Nushell syntax (pipelines with `|`, `$env`, `def` commands, structured
data) doesn't match bash token patterns, so highlighting is misleading.

Since `react-syntax-highlighter` doesn't include a Nushell Prism language,
the best fix is to fall back to `plaintext` (no highlighting) rather than
incorrect highlighting.

## Current state

`src/components/ConfigCard.tsx:26-34`:
```ts
const languageMap: Record<string, string> = {
  json: 'json',
  jsonc: 'json',
  toml: 'toml',
  ini: 'ini',
  yaml: 'yaml',
  sh: 'bash',
  nu: 'bash',   // ← this is incorrect
};
```

The `code-runner` config has `language: 'sh'` which maps to `'bash'` — that
mapping is correct and should stay.

## Commands you will need

| Purpose   | Command              | Expected on success |
|-----------|----------------------|---------------------|
| Build     | `bun run build`      | exit 0              |
| Lint      | `bun run lint`       | exit 0              |

## Scope

**In scope**:
- `src/components/ConfigCard.tsx` — change `nu: 'bash'` to `nu: 'plaintext'`

**Out of scope**:
- Adding a Nushell Prism language — no supported package exists for this
- The `sh: 'bash'` mapping — this is correct

## Steps

### Step 1: Change the mapping

In `src/components/ConfigCard.tsx`, change:
```
-  nu: 'bash',
+  nu: 'plaintext',
```

**Verify**: `grep "nu:" src/components/ConfigCard.tsx` → `nu: 'plaintext'`

### Step 2: Build and check

```bash
bun run build && bun run lint
```

**Verify**: Both exit 0

## Test plan

- Open the site, expand a Nushell config card — code should display in
  plaintext (no colored tokens) rather than bash-colored tokens.
- Non-Nushell configs (fastfetch, starship, ghostty, opencode, code-runner)
  should be unaffected.

## Done criteria

- [ ] `grep "nu:" src/components/ConfigCard.tsx` shows `'plaintext'`
- [ ] `grep "nu: 'bash'" src/components/ConfigCard.tsx` → no match
- [ ] `bun run build` exits 0
- [ ] `bun run lint` exits 0
- [ ] No files outside the in-scope list are modified

## STOP conditions

- The `languageMap` has been restructured or removed — stop and report
  the current state.
- A Nushell Prism language was added to `react-syntax-highlighter` since
  this plan was written — consider using `'nu'` or the correct language
  key instead.

## Maintenance notes

If `react-syntax-highlighter` ever ships a Nushell Prism language,
update this to `'nu'` (or the correct key) for proper syntax highlighting.
