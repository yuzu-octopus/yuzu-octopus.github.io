# Plan 010: Optimize 632KB MUI vendor chunk

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` (unless a reviewer dispatched you and told you they
> maintain the index).
>
> **Drift check (run first)**: `git diff --stat 26cad63..HEAD -- package.json src/`
> If package.json or source files changed since this plan was written,
> compare the current state before proceeding.

## Status

- **Priority**: P3
- **Effort**: M
- **Risk**: MED
- **Depends on**: none
- **Category**: perf
- **Planned at**: commit `26cad63`, 2026-06-22

## Why this matters

The main vendor chunk `esm-CdQuA2LT.js` is 632KB (229KB gzipped). Vite
warns about chunks larger than 500KB. For a simple portfolio with 5
sections, this is heavy. The primary contributor is MUI's `@mui/material`
and `@mui/icons-material`. Reducing this improves load time, especially
on mobile connections.

Note: This is a known tradeoff with MUI. The gain from optimization
is limited unless `@mui/icons-material` is replaced entirely.

## Current state

Build output (from `bun run build`):
```
docs/assets/esm-CdQuA2LT.js           632.19 kB │ gzip: 229.27 kB
docs/assets/index-B9ZNRv1G.js         365.34 kB │ gzip: 116.55 kB
```

The `esm-*` file is the MUI ESM bundle containing all MUI components
and icons used across the app.

Components currently importing from MUI (from `src/` analysis):
- `Sidebar.tsx`: Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Divider, Box, Avatar, Typography, Link, IconButton,
  useMediaQuery + icons: Menu, Home, Person, Code, DesktopMac,
  LibraryBooks, GitHub
- `App.tsx`: ThemeProvider, CssBaseline, useMediaQuery
- `Hero.tsx`: Avatar, Typography, Button, Container + GitHubIcon
- `About.tsx`: Container, Typography, Paper
- `ConfigsGallery.tsx`: Container, Typography, Grid
- `ConfigCard.tsx`: Card, CardContent, CardActions, Typography, Button,
  Collapse, Box + ExpandMore, OpenInNew icons
- `Workspace.tsx`: Box, Container, Typography, Grid
- `ToolCard.tsx`: Card, CardContent, Typography, Box, IconButton + OpenInNew
- `Projects.tsx`: Container, Typography, Card, CardContent, Button, Box,
  Chip + OpenInNew
- `SectionHeading.tsx`: Typography

## Suggested executor toolkit

- Use `vite-plugin-inspect` to visualize the bundle composition before
  making changes — run `bun add -D vite-plugin-inspect` then check
  `http://localhost:5173/__inspect/` in dev mode.

## Scope

**In scope**:
- `package.json` — add tools/plugins as needed
- `vite.config.ts` — add manual chunk configuration
- `src/` files — optional: convert icon imports to individual imports

**Out of scope**:
- Replacing MUI with a lighter component library (that's a full rewrite)
- Tree-shaking MUI internals through babel plugins (MUI 9 should handle
  this via ESM)

## Steps

### Step 1: Analyze the bundle

Install `vite-plugin-inspect` and add it to the Vite config to understand
what's in the 632KB chunk:

```bash
bun add -D vite-plugin-inspect
```

Add to `vite.config.ts`:
```ts
import Inspect from 'vite-plugin-inspect';
// in plugins array:
plugins: [react(), Inspect()],
```

**Verify**: `bun run dev` → visit `http://localhost:5173/__inspect/` →
the inspect UI loads showing module graph.

### Step 2: Option A — Manual chunk splitting (lowest risk)

Add Rollup chunk splitting to `vite.config.ts`:

```ts
build: {
  outDir: 'docs',
  rollupOptions: {
    output: {
      manualChunks: {
        'mui-icons': ['@mui/icons-material'],
        'mui-core': ['@mui/material', '@mui/system'],
      },
    },
  },
},
```

This separates `@mui/icons-material` from `@mui/material` so they can
be cached independently. Icons change less often than the core library.

**Verify**: `bun run build` → check if the warning disappears and chunk
sizes are more balanced.

### Step 3: Option B — Replace icon imports with direct SVG imports (higher risk, more effective)

The icons used are:
- `@mui/icons-material/Menu`
- `@mui/icons-material/Home`
- `@mui/icons-material/Person`
- `@mui/icons-material/Code`
- `@mui/icons-material/DesktopMac`
- `@mui/icons-material/LibraryBooks`
- `@mui/icons-material/GitHub`
- `@mui/icons-material/ExpandMore`
- `@mui/icons-material/OpenInNew`

MUI 9 supports tree-shakable icon imports via ESM. Verify that existing
imports like `import MenuIcon from '@mui/icons-material/Menu'` are
already fully tree-shaken. If not, switch to:

```tsx
import MenuIcon from '@mui/icons-material/esm/Menu';
```

Or replace MUI icons entirely with inline SVGs (under 1KB each):

**Verify**: After optimization, `bun run build` → check the chunk sizes

### Step 4: Verify everything works

```bash
bun run build
```

**Verify**: Build exits 0. The chunk size warning may still appear if MUI
itself is unavoidably large — that's acceptable. The goal is improvement,
not elimination.

## Test plan

- `bun run dev` — visually verify all sections render correctly
- `bun run build` — verify no errors
- Check each component that uses icons — buttons, nav items, expand/collapse
  should all display correctly

## Done criteria

- [ ] `bun run build` exits 0
- [ ] `bun run lint` exits 0
- [ ] The MUI vendor chunk is smaller than the original 632KB (any reduction
      is progress)
- [ ] `bun run dev` — all icons render correctly, no console errors
- [ ] No files outside the in-scope list are modified

## STOP conditions

- Adding `vite-plugin-inspect` causes build failures — remove it and
  proceed with just the manual chunk splitting
- Chunk splitting causes runtime errors (e.g., "MUI component not found") —
  revert the change and try Option B instead
- Replacing MUI icons with inline SVGs causes visual regressions —
  revert and report

## Maintenance notes

MUI chunk size is a known and accepted cost of using MUI. The 229KB
gzipped size is already reasonable for a full-featured component library.
This plan is P3 because the performance gain is marginal relative to the
effort. The real fix would be switching to a lighter alternative, which
is out of scope.

If @mui/icons-material is ever replaced with a smaller icon set (e.g.,
Heroicons, Lucide), revisit this plan to remove the MUI icon dependency
entirely.
