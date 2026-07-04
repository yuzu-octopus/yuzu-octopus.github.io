# Fix Plan — Design Cohesion with ProjectSite

**Reviewed:** 2026-07-04
**Compared:** `github_page` (React+Vite+MUI) vs `ProjectSite` (Jinja2 template)
**Live sites:** yuzu-octopus.github.io vs yuzu-octopus.github.io/ProjectSite/

---

## Shared DNA (already aligned)

Both use the same Dracula palette, JetBrains Mono, 240px sidebar, purple accent headings with bottom border, 900px mobile breakpoint, and identical section structure (hero → features → code → stack). The visual family is clear.

---

## Design Drift — Issues to Fix

### 1. Muted color mismatch (HIGH impact)

| | ProjectSite | github_page |
|---|---|---|
| Muted/comment | `#8ca0d7` (light blue) | `#6272a4` (original Dracula) |

ProjectSite intentionally lightened the muted color for better readability on `#282a36` background. github_page still uses the stock Dracula `#6272a4` which is noticeably darker.

**Fix:** Update `draculaColors.comment` in `src/theme/dracula.ts`:
```ts
comment: '#8ca0d7',  // was '#6272a4'
```

---

### 2. No light theme (MEDIUM impact)

ProjectSite has a full Alucard light theme toggle with `data-theme="light"` and localStorage persistence. github_page is dark-only.

**Fix (optional, larger scope):**
- Add `data-theme` attribute to `<html>`
- Create light Dracula palette (Alucard) matching ProjectSite's values
- Add theme toggle button (fixed top-right, same as ProjectSite)
- Persist choice in localStorage
- Update MUI theme dynamically on toggle

ProjectSite light values for reference:
```css
--bg: #FFFBEB; --panel: #E2DECA; --fg: #1F1F1F; --muted: #6C664B;
--purple: #644AC9; --pink: #A3144D; --cyan: #0891C2; --green: #14710A;
```

---

### 3. Card background mismatch (LOW impact)

| | ProjectSite | github_page |
|---|---|---|
| Card bg | `var(--panel)` = `#44475a` | `draculaColors.background` = `#282a36` |

ProjectSite cards sit on the panel color (lighter), creating depth against the page background. github_page ToolCard uses the page background color, making cards blend in.

**Fix:** In `ToolCard.tsx`, change `backgroundColor`:
```tsx
backgroundColor: draculaColors.currentLine,  // was background
```

---

### 4. Card border-radius (LOW impact)

| | ProjectSite | github_page |
|---|---|---|
| Border radius | `8px` (explicit) | MUI default (`4px`) |

**Fix:** Add `borderRadius: '8px'` to Card sx prop in `ToolCard.tsx` and any other card components.

---

### 5. Button hover behavior (LOW impact)

| | ProjectSite | github_page |
|---|---|---|
| Primary hover | Transparent bg + purple border (outline) | Pink background |

ProjectSite's primary button transitions from filled purple to hollow outline on hover. github_page switches to pink fill.

**Fix:** Match ProjectSite's hover in Hero.tsx Button:
```tsx
'&:hover': {
  backgroundColor: 'transparent',
  color: draculaColors.purple,
  border: `1px solid ${draculaColors.purple}`,
},
```

---

### 6. Font family naming (LOW impact)

| | ProjectSite | github_page |
|---|---|---|
| Font | `'JetBrains Mono', monospace` | `'JetBrainsMono Nerd Font', 'JetBrains Mono', monospace` |

github_page uses the Nerd Font variant (powerline symbols + dev icons). This is intentional for icon support — keep it. No change needed, just noting the difference is deliberate.

---

### 7. Missing `border-radius` on sidebar (LOW impact)

ProjectSite sidebar links have `border-radius: 8px` with `margin: 2px 8px`. MUI's `ListItemButton` uses its own default radius.

**Fix:** Add `borderRadius: '8px'` and `mx: 1` to `ListItemButton` sx in Sidebar.tsx.

---

## Priority Order

1. **Muted color** — one-line change, biggest visual impact
2. **Card background** — one-line change, cards stop blending into page
3. **Card border-radius** — small consistency fix
4. **Button hover** — matches ProjectSite's interaction pattern
5. **Sidebar border-radius** — polish
6. **Light theme** — larger feature, optional

---

## Files to modify

| File | Changes |
|------|---------|
| `src/theme/dracula.ts` | `comment: '#8ca0d7'` |
| `src/components/ToolCard.tsx` | `backgroundColor: currentLine`, `borderRadius: '8px'` |
| `src/components/Hero.tsx` | Button hover → outline style |
| `src/components/Sidebar.tsx` | `borderRadius: '8px'` on nav items |
