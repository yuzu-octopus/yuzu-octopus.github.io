# yuzu-octopus.github.io — Agent Guide

## Quick start

```sh
bun install
bun run dev        # vite dev server
bun run build      # tsc -b && vite build → docs/
bun run lint       # eslint
```

Package manager is Bun. Lockfile is `bun.lock`.

## Build & deploy

- Build output goes to `docs/` (`vite.config.ts`). This dir is in `.gitignore`.
- Deploy via GitHub Actions on push to `main`. Pages source must be "GitHub Actions" in repo settings.
- Local preview: `bun run preview` after build.
- TypeScript uses project references (`tsconfig.json` → `tsconfig.app.json` + `tsconfig.node.json`), so build runs `tsc -b`, not plain `tsc`.
- `bun run lint` (eslint) does NOT ignore `docs/` — only `dist/` is in the ignore config. Build output gets lint-checked.

## Architecture

- Single-page app, no routing — anchor nav (`#hero`, `#about`, `#configs`, `#workspace`).
- Sections: `src/components/Hero.tsx`, `About.tsx`, `ConfigsGallery.tsx`, `Workspace.tsx`.
- Data: `src/data/configs.ts` (config cards), `src/data/tools.ts` (workspace tools).
- Theme: Dracula palette in `src/theme/dracula.ts`. Components import `draculaColors` directly (bypass MUI theme tokens).
- Sidebar responsive: permanent drawer on desktop, temporary overlay + hamburger on mobile.
- Nushell `.nu` configs mapped to `bash` in `src/components/ConfigCard.tsx` language map.
- Config source repo: `https://github.com/yuzu-octopus/.config`
- Font: `JetBrainsMono Nerd Font` loaded via `@font-face` from CDN in `index.html`.
- `opencode.json` does not exist — AGENTS.md is the sole agent instruction file.

## Screenshots

- Stored in `public/screenshots/`, all 3683×2016.
- Captured via `scripts/capture-screenshots.py` (VHS 4K terminal capture + PIL post-processing).
- Two Nushell config cards (`nushell-env`, `nushell-config`) reference missing screenshots — will show "Screenshot unavailable" fallback.
- Ghostty GIF resize uses `gifsicle` (manual step, not in capture script).

## Git

- Large screenshots (447MB repo history). `.gitattributes` has LFS-ready patterns but `git lfs` is not installed.
- Font family throughout: `JetBrainsMono Nerd Font` (loaded via `@font-face` in `index.html`).

## Known gaps (not yet fixed)

- No SEO meta tags or social preview.
- No error boundary — any render crash blanks the page.
- No code splitting — all sections load eagerly.
- Config code snippets inlined in `configs.ts` (710 lines) — not lazy-loaded.
- No test framework configured.
