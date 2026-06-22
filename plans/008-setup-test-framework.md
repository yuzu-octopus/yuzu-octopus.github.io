# Plan 008: Set up Vitest test framework with smoke tests

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` (unless a reviewer dispatched you and told you they
> maintain the index).
>
> **Drift check (run first)**: `git diff --stat 26cad63..HEAD -- package.json tsconfig.app.json src/`
> If package.json or source files changed since this plan was written,
> compare the current state before proceeding.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW
- **Depends on**: plan 007 (strict mode) — recommended but not required
- **Category**: dx
- **Planned at**: commit `26cad63`, 2026-06-22

## Why this matters

The repository has zero test infrastructure. Any refactor, dependency
upgrade, or new feature is verified only by manual browsing. A minimal
test setup (Vitest + React Testing Library) with basic smoke tests
provides a regression safety net for the core rendering paths.

## Current state

- `package.json` — no test dependencies, no `"test"` script
- No test files anywhere in `src/`
- Build and lint pass but provide no runtime coverage

## Commands you will need

| Purpose        | Command                      | Expected on success |
|----------------|------------------------------|---------------------|
| Install        | `bun add -D vitest @testing-library/react @testing-library/jest-dom jsdom` | exit 0 |
| Run tests      | `bun test`                   | exit 0, tests pass  |
| Build          | `bun run build`              | exit 0              |
| Lint           | `bun run lint`               | exit 0              |

## Scope

**In scope**:
- `package.json` — add test script, add dev dependencies
- `tsconfig.app.json` — add vitest types
- `src/App.test.tsx` — create (smoke test)
- Optional: `src/components/*.test.tsx` — create for ConfigCard/Hero/etc.

**Out of scope**:
- Full test coverage of all components (smoke tests only)
- E2E or integration tests
- Snapshot testing (high maintenance, low value for portfolio)

## Git workflow

- Branch: `advisor/008-test-framework`
- Commit per step; message style: `feat: add Vitest test framework with smoke tests`

## Steps

### Step 1: Install test dependencies

```bash
bun add -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

**Verify**: `grep "vitest" package.json` → shows vitest in devDependencies

### Step 2: Add test script and vitest config to package.json

Add to `package.json` `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

**Verify**: `grep '"test"' package.json` → shows both scripts

### Step 3: Configure vitest in vite.config.ts

Add vitest config to `vite.config.ts`:

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'docs',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
})
```

**Verify**: `grep "test" vite.config.ts` shows test config block

### Step 4: Create test setup file

Create `src/test-setup.ts`:
```ts
import '@testing-library/jest-dom/vitest';
```

**Verify**: `ls src/test-setup.ts` → file exists

### Step 5: Create a smoke test for App rendering

Create `src/App.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the hero section', () => {
    render(<App />);
    expect(screen.getByText("Hi, I'm yuzu")).toBeInTheDocument();
  });

  it('renders the sidebar navigation', () => {
    render(<App />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Configs')).toBeInTheDocument();
    expect(screen.getByText('Workspace')).toBeInTheDocument();
  });

  it('renders section headings', () => {
    render(<App />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText('Configs')).toBeInTheDocument();
    expect(screen.getByText('Workspace')).toBeInTheDocument();
  });
});
```

Note: The lazy-loaded sections use `Suspense` with `fallback={null}`. The
tests above should still find the text because lazy components load
immediately in test environments (no async boundary in jsdom). If the
text isn't found, wrap assertions in `waitFor`:
```ts
import { waitFor } from '@testing-library/react';
// ...
await waitFor(() => {
  expect(screen.getByText('About Me')).toBeInTheDocument();
});
```

**Verify**: File created at `src/App.test.tsx`

### Step 6: Run the tests

```bash
bun test
```

**Verify**: Tests pass (exit 0, shows "3 passed" or similar)

If tests fail due to missing MUI theme provider, wrap in `ThemeProvider`:
— The `App` component already includes `<ThemeProvider>` internally, so this
  should not be needed. If the error mentions `useMediaQuery` or MUI theme,
  use `render(<App />)` directly (it includes its own wrapping).

### Step 7: Final verification

```bash
bun run build && bun run lint && bun test
```

**Verify**: All three exit 0.

## Test plan

This plan IS the test setup. The test file itself serves as the smoke
test suite. Future plans should add tests alongside their code changes.

## Done criteria

- [ ] `grep "vitest" package.json` — vitest and testing-library in devDeps
- [ ] `grep "test" package.json | grep vitest` — `"test": "vitest run"` script exists
- [ ] `vite.config.ts` has `test` config block with `jsdom` environment
- [ ] `src/test-setup.ts` exists
- [ ] `src/App.test.tsx` exists with at least 3 smoke tests
- [ ] `bun test` exits 0
- [ ] `bun run build` exits 0
- [ ] `bun run lint` exits 0

## STOP conditions

- Adding vitest+testing-library deps creates dependency conflicts — try
  older versions of @testing-library/react (v14/v15) and vitest (v1/v2)
- Tests pass but with "Module not found" errors for CSS imports — if needed,
  add `"test": { "css": true }` to vitest config

## Maintenance notes

- Test runner command is `bun test` (Vitest via Bun).
- Add `describe`/`it`/`expect` from `vitest` — no globals needed (the config
  has `globals: true` for convenience but explicit imports are preferred).
- When testing components that render code blocks (ConfigCard), the
  `react-syntax-highlighter` lazy import may need special handling;
  mock it in the test file if it causes issues.
