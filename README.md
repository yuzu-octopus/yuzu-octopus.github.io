# yuzu — Developer Portfolio

Personal portfolio site showcasing my development environment, configs, and tools.

🌐 **Live:** [yuzu-octopus.github.io](https://yuzu-octopus.github.io)

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool
- **Material UI** — component library
- **Dracula Theme** — color palette throughout
- **JetBrains Mono Nerd Font** — typography (powerline symbols + dev icons)
- **react-syntax-highlighter** — code highlighting

## Features

- **Fixed sidebar navigation** with avatar, nav links, and footer watermark
- **Rounded favicon** — circular profile picture in browser tab
- **Syntax-highlighted config previews** — expandable cards with Dracula theme
- **Responsive grid layouts** — adapts from mobile to desktop

## Sections

- **Hero** — Introduction with profile avatar and GitHub link
- **About** — Bio and background
- **Configs** — Expandable config cards (Fastfetch, Starship, Ghostty, OpenCode) with syntax-highlighted source
- **Workspace** — Tools and languages I use daily

## Local Development

```bash
bun install
bun run dev
```

## Build

```bash
bun run build
```

Build output goes to `docs/` for GitHub Pages deployment.

## Deployment

Deployed to GitHub Pages via GitHub Actions on every push to `main`.
The `docs/` directory is served as the site root.

## Config Files

My dotfiles are maintained in a separate repo: [yuzu-octopus/.config](https://github.com/yuzu-octopus/.config)
