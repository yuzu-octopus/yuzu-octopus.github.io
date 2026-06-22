# Plan 011: Improve mobile UX

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` (unless a reviewer dispatched you and told you they
> maintain the initiative).
>
> **Drift check (run first)**: `git diff --stat 26cad63..HEAD -- src/components/`
> If any component changed since this plan was written, compare the
> current code against the excerpts below before proceeding.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: frontend
- **Planned at**: commit `26cad63`, 2026-06-22

## Why this matters

The site is functional on mobile but has rough edges:
- Hero title `h1` at 3rem (48px) uses most of the screen width on mobile
- Code blocks have `maxHeight: 400` — on a ~667px viewport (iPhone SE),
  that's 60%+ of the screen, forcing the user to scroll inside a small
  box rather than the natural page flow
- Section `min-height: 100vh` on 4 sections means relentless full-viewport
  blocks on small screens (each section ← scroll → each section)
- No dedicated mobile typography scale

## Current state

**Hero title** (`Hero.tsx:29`):
```tsx
<Typography variant="h1" sx={{ fontSize: '3rem', mb: 1, color: draculaColors.purple }}>
  Hi, I'm yuzu
</Typography>
```

**Section full-height** (each section — e.g., `Hero.tsx:11`, `About.tsx:10`,
`ConfigsGallery.tsx:12`, `Workspace.tsx:16`):
```tsx
style={{ minHeight: '100vh', ... }}
```

**Code block max-height** (`ConfigCard.tsx:93`):
```tsx
sx={{ borderRadius: 1, overflow: 'auto', maxHeight: 400, ... }}
```

**Responsive breakpoint**: The sidebar uses `useMediaQuery('(min-width:900px)')`
to switch between permanent and temporary drawer — this is correct and should
stay unchanged.

## Commands you will need

| Purpose    | Command              | Expected on success |
|------------|----------------------|---------------------|
| Build      | `bun run build`      | exit 0              |
| Lint       | `bun run lint`       | exit 0              |
| Dev        | `bun run dev`        | local server starts |

## Scope

**In scope**:
- `src/components/Hero.tsx` — responsive font size for h1
- `src/components/Hero.tsx` — reduce min-height on mobile
- `src/components/About.tsx` — reduce min-height on mobile
- `src/components/ConfigsGallery.tsx` — reduce min-height on mobile
- `src/components/Workspace.tsx` — reduce min-height on mobile
- `src/components/ConfigCard.tsx` — responsive code block max-height

**Out of scope**:
- Sidebar behavior (already responsive, correct)
- Font loading or font size in data/tools components
- Adding a full-image modal for screenshots
- Changing the grid layout

## Steps

### Step 1: Add a responsive hook or use existing pattern

The app already imports `useMediaQuery` from MUI in `App.tsx` and
`Sidebar.tsx`. Use the same pattern in components that need responsive
values.

Note: Rather than adding `useMediaQuery` to every component, use
responsive MUI `sx` values (breakpoint syntax) where possible, and
inline `useMediaQuery` only where MUI sx can't express the change.

### Step 2: Responsive hero title

In `Hero.tsx`, change the h1 font size to be smaller on mobile:

```tsx
<Typography
  variant="h1"
  sx={{
    fontSize: { xs: '2rem', sm: '3rem' },
    mb: 1,
    color: draculaColors.purple,
  }}
>
  Hi, I'm yuzu
</Typography>
```

Also reduce the avatar size on mobile:
```tsx
<Avatar
  src={SITE.avatarUrl}
  sx={{
    width: { xs: 100, sm: 150 },
    height: { xs: 100, sm: 150 },
    margin: '0 auto',
    mb: 3,
    border: `4px solid ${draculaColors.purple}`,
  }}
/>
```

**Verify**: `grep "xs:" src/components/Hero.tsx` → shows `{ xs: '2rem', sm: '3rem' }`.

### Step 3: Responsive section min-heights

Change `minHeight: '100vh'` to a responsive value in each section:

**Hero.tsx**: `minHeight: { xs: 'auto', md: '100vh' },` and add
`padding: { xs: '4rem 0', md: 0 }` (the section needs padding on mobile
since it's no longer full-screen).

**About.tsx**: Change to:
```tsx
style={{
  minHeight: { xs: 'auto', md: '100vh' },
  display: 'flex',
  alignItems: 'center',
  backgroundColor: draculaColors.currentLine,
  padding: '4rem 0',
}}
```

**ConfigsGallery.tsx**: Change to:
```tsx
style={{
  minHeight: { xs: 'auto', md: '100vh' },
  padding: '4rem 0',
  backgroundColor: draculaColors.background,
}}
```

**Workspace.tsx**: Change to:
```tsx
style={{
  minHeight: { xs: 'auto', md: '100vh' },
  padding: '4rem 0',
  backgroundColor: draculaColors.currentLine,
}}
```

**Verify**: `grep "minHeight" src/components/Hero.tsx src/components/About.tsx src/components/ConfigsGallery.tsx src/components/Workspace.tsx`
→ each shows the responsive pattern.

### Step 4: Responsive code block height

In `ConfigCard.tsx`, change the code block container:

```tsx
sx={{
  borderRadius: 1,
  overflow: 'auto',
  maxHeight: { xs: 250, sm: 400 },
  border: `1px solid ${draculaColors.comment}`,
  '& pre': { ... },
}}
```

This reduces the code block from 400px to 250px on mobile, so it takes
about 1/3 of the viewport instead of 2/3.

**Verify**: `grep "maxHeight" src/components/ConfigCard.tsx` → shows
`{ xs: 250, sm: 400 }`.

### Step 5: Adjust workspace tool card text

In `ToolCard.tsx`, the tool name is `variant="h6"`. On mobile, this may
be too large alongside the description. No change needed — h6 is 1.25rem
(20px), which is fine for mobile.

**Verify**: No change needed to ToolCard.

### Step 6: Build and check

```bash
bun run build && bun run lint
```

**Verify**: Both exit 0.

## Test plan

- Open the site in a mobile viewport (e.g., 375×667 in Chrome DevTools)
  - Hero section should not fill the full screen and should have padding
  - Hero title should be ~2rem (32px) instead of 3rem (48px)
  - Code blocks should be shorter (250px vs 400px)
  - All sections should have proper padding on mobile and not feel cramped
- Open the site at desktop size (1280px+) — everything should look the
  same as before (the responsive changes only affect xs/sm breakpoints)

## Done criteria

- [ ] Hero title is `{ xs: '2rem', sm: '3rem' }` — smaller on mobile
- [ ] Avatar size is `{ xs: 100, sm: 150 }` — smaller on mobile
- [ ] All 4 sections have `minHeight: { xs: 'auto', md: '100vh' }`
- [ ] Code blocks have `maxHeight: { xs: 250, sm: 400 }`
- [ ] `bun run build` exits 0
- [ ] `bun run lint` exits 0
- [ ] `bun run dev` — site renders correctly on both mobile and desktop viewports
- [ ] No desktop-regression (check at 1280px viewport — should look identical to before)

## STOP conditions

- The `sx` responsive syntax (`{ xs: ..., sm: ..., md: ... }`) doesn't
  work in a `style` prop (it only works in MUI's `sx` prop). The section
  changes in Step 3 use JS `style` objects — MUI breakpoints only work
  inside the `sx` prop of MUI components. Fix: wrap section containers
  in MUI `<Box>` or use CSS. Actually, the sections use plain `style={}`
  attributes on native `<section>` elements. To use responsive values,
  wrap in MUI `<Box component="section">` with `sx` prop instead.
  Alternatively, use a `<Box>` and MUI's responsive values:
  ```tsx
  <Box component="section" id="hero" sx={{ minHeight: { xs: 'auto', md: '100vh' }, ... }}>
  ```
- If changing from `<section style={...}>` to `<Box component="section" sx={...}>`
  causes any rendering issue, stop and report.

## Maintenance notes

- The responsive breakpoints follow MUI conventions: xs < 600px, sm ≥ 600px,
  md ≥ 900px.
- Future sections should use `minHeight: { xs: 'auto', md: '100vh' }` for
  consistency.
- The code block max-height of 250px on mobile is an estimate — if users
  report that Nushell config code is too long for 250px, increase to 300.
