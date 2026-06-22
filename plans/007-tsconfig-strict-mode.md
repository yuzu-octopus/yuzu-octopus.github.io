# Plan 007: Enable strict mode in tsconfig

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` (unless a reviewer dispatched you and told you they
> maintain the index).
>
> **Drift check (run first)**: `git diff --stat 26cad63..HEAD -- tsconfig.app.json tsconfig.node.json src/`
> If tsconfig or source files changed since this plan was written, compare
> the current tsconfig settings and the source excerpts below before
> proceeding.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: MED
- **Depends on**: none
- **Category**: dx
- **Planned at**: commit `26cad63`, 2026-06-22

## Why this matters

TypeScript is running without `strict: true`, which means `strictNullChecks`,
`noImplicitAny`, `strictFunctionTypes`, and other key checks are disabled.
Catch clauses default to `any`, nullable values pass through unchecked, and
common bugs slip past the compiler. Adding strict mode surfaces real issues
that would otherwise reach production.

## Current state

`tsconfig.app.json` (full file):
```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

Notable: `strict: true` is absent. Individual relaxed checks include:
- No `strictNullChecks` — `null`/`undefined` can be assigned to any type
- No `noImplicitAny` — function parameters without types default to `any`
- No `strictFunctionTypes` — function type variance is unchecked
- No `useUnknownInCatchVariables` — `catch (e)` defaults to `any`

## Commands you will need

| Purpose    | Command               | Expected on success |
|------------|-----------------------|---------------------|
| Build      | `bun run build`       | exit 0              |
| Lint       | `bun run lint`        | exit 0              |

## Scope

**In scope**:
- `tsconfig.app.json` — add `"strict": true`

**Out of scope**:
- `tsconfig.node.json` — only covers `vite.config.ts`, which doesn't need
  strict mode changes
- Any functional changes to source code beyond fixing strict-mode errors

## Steps

### Step 1: Add `"strict": true` to tsconfig.app.json

Add the line `"strict": true` to the `compilerOptions` block in
`tsconfig.app.json`. Place it after `"skipLibCheck": true` (line 8).

```json
    "skipLibCheck": true,
    "strict": true,
```

**Verify**: `grep "strict" tsconfig.app.json` → `"strict": true`

### Step 2: Run the build to see errors

```bash
bun run build 2>&1
```

Expected: Several type errors will appear. Fix each one following the
patterns below. Common error categories in this codebase:

**Category A: `catch` clause variables typed as `unknown`**

With `strict: true`, `useUnknownInCatchVariables` is enabled. The
`catch((err: Error)` in `src/hooks/useConfigCode.ts:54` will error
because `err` is `unknown` and can't be accessed as `.message`.

Fix: Change the catch handler:
```ts
.catch((err: unknown) => {
  if (!cancelledRef.current) {
    setError(err instanceof Error ? err.message : String(err));
    setLoading(false);
  }
});
```

**Category B: `null`/`undefined` not assignable**

Check for any `null` or `undefined` returned where a non-nullable type is
expected. With `strictNullChecks`, `null` is not assignable to `string`,
`number`, etc. If any exist, use explicit type unions or optional chaining.

**Verify after each fix**: `bun run build` — keep iterating until it
exits 0 with no errors.

### Step 3: Final verification

```bash
bun run build && bun run lint
```

**Verify**: Both exit 0. If lint has new errors, fix them and rebuild.

## Test plan

No new tests for this plan. After fixing strict-mode errors:
- `bun run build` exits 0 (the strict-mode build is the test)
- `bun run lint` exits 0
- `bun run dev` works and site renders correctly

## Done criteria

- [ ] `grep "strict" tsconfig.app.json` shows `"strict": true`
- [ ] `bun run build` exits 0
- [ ] `bun run lint` exits 0
- [ ] `bun run dev` serves the site without runtime errors
- [ ] No files outside the in-scope list are modified

## STOP conditions

- Adding `"strict": true` produces more than 20 type errors — stop and
  report. This may indicate a larger compatibility issue. (The codebase
  is small, so expecting <10 errors.)
- Any error is in a `.d.ts` file or `node_modules` — skip (those are not
  in the source scope and `skipLibCheck` should handle them).

## Maintenance notes

Once strict mode is enabled, all future code benefits from the stricter
checks. When adding new files, no extra configuration is needed. If a
specific file needs to opt out of strict null checks (rare), use
`/* @ts-nocheck */` at the top of that file only.
