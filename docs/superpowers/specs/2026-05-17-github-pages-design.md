# GitHub Pages Portfolio - Design Spec

## Overview
Personal portfolio site hosted on GitHub Pages showcasing configs, workspace setup, and developer identity. Built with React + TypeScript + Material UI, themed with Dracula colors.

## Sections (in order)
1. **Hero** - Avatar + Bio intro
2. **About Me** - Bio section
3. **Configs Gallery** - Screenshot cards with expandable source code
4. **Workspace** - Tool cards with descriptions

## Layout
- Fixed sidebar navigation (left)
- Scrollable content area (right)
- Single page with anchor-based navigation

## Visual Design
- **Theme:** Dracula color palette throughout
- **Font:** JetBrains Mono (embedded via @font-face or Google Fonts)
- **Framework:** Material UI components styled with Dracula theme

## Section Details

### Hero
- Profile avatar (circular)
- Name: "yuzu"
- Short tagline
- GitHub link CTA

### About Me
- Bio text
- Personal info

### Configs Gallery
- Screenshot preview cards for each config (Fastfetch, Starship, Ghostty, OpenCode)
- Click to expand and reveal full config source code
- Syntax highlighting: Dracula theme
- Code font: JetBrains Mono

### Workspace
- Tool cards (Ghostty, OpenCode, Python, JavaScript, Nushell, Bun, etc.)
- Each card shows tool name and description
- Grid layout

## Tech Stack
- React + TypeScript
- Material UI (MUI)
- Dracula theme for MUI
- JetBrains Mono font
- GitHub Pages deployment

## File Structure
```
src/
  components/
    Sidebar.tsx
    Hero.tsx
    About.tsx
    ConfigsGallery.tsx
    ConfigCard.tsx
    Workspace.tsx
    ToolCard.tsx
  theme/
    dracula.ts
  App.tsx
  main.tsx
```
