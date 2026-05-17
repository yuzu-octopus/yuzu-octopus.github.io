# GitHub Pages Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a personal portfolio site with React + TypeScript + Material UI, Dracula theme, fixed sidebar nav, and sections for hero, about, configs gallery, and workspace.

**Architecture:** Single-page React app with Material UI components, custom Dracula theme provider, fixed sidebar navigation with anchor links, and expandable config cards with syntax-highlighted code. Deployed to GitHub Pages via Vite.

**Tech Stack:** React 18, TypeScript, Vite, Material UI (MUI), JetBrains Mono font, Dracula color palette

---

## File Structure

```
GitHub_Page/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── public/
│   └── favicon.svg
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── theme/
│   │   └── dracula.ts
│   ├── data/
│   │   ├── configs.ts
│   │   └── tools.ts
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── ConfigsGallery.tsx
│   │   ├── ConfigCard.tsx
│   │   ├── Workspace.tsx
│   │   └── ToolCard.tsx
│   └── styles/
│       └── global.css
└── docs/
    └── superpowers/
        ├── specs/2026-05-17-github-pages-design.md
        └── plans/2026-05-17-github-pages-plan.md
```

---

### Task 1: Scaffold Vite + React + TypeScript Project

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/styles/global.css`

- [ ] **Step 1: Initialize project with Vite**

Run in `/Users/yuzu/Documents/Projects/GitHub_Page`:

```bash
bun create vite@latest . --template react-ts
```

If prompted to overwrite files, allow it. This creates the base Vite + React + TypeScript structure.

- [ ] **Step 2: Install Material UI dependencies**

```bash
bun add @mui/material @emotion/react @emotion/styled @mui/icons-material
```

- [ ] **Step 3: Update index.html with JetBrains Mono font**

Edit `index.html` to add Google Fonts link for JetBrains Mono in the `<head>`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>yuzu — Developer Portfolio</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Create global CSS**

Create `src/styles/global.css`:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'JetBrains Mono', monospace;
  background-color: #282a36;
  color: #f8f8f2;
}

code {
  font-family: 'JetBrains Mono', monospace;
}
```

- [ ] **Step 5: Update App.tsx with basic structure**

Replace `src/App.tsx` content:

```tsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import { draculaTheme } from './theme/dracula';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ConfigsGallery } from './components/ConfigsGallery';
import { Workspace } from './components/Workspace';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider theme={draculaTheme}>
      <CssBaseline />
      <Sidebar />
      <main style={{ marginLeft: '240px' }}>
        <Hero />
        <About />
        <ConfigsGallery />
        <Workspace />
      </main>
    </ThemeProvider>
  );
}

export default App;
```

- [ ] **Step 6: Verify project builds**

```bash
bun run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: scaffold vite react-ts project with mui"
```

---

### Task 2: Create Dracula Theme

**Files:**
- Create: `src/theme/dracula.ts`

- [ ] **Step 1: Create Dracula theme configuration**

Create `src/theme/dracula.ts`:

```ts
import { createTheme } from '@mui/material/styles';

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

export const draculaTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: draculaColors.background,
      paper: draculaColors.currentLine,
    },
    primary: {
      main: draculaColors.purple,
    },
    secondary: {
      main: draculaColors.pink,
    },
    text: {
      primary: draculaColors.foreground,
      secondary: draculaColors.comment,
    },
  },
  typography: {
    fontFamily: "'JetBrains Mono', monospace",
    h1: {
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 700,
    },
    h3: {
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 700,
    },
    body1: {
      fontFamily: "'JetBrains Mono', monospace",
    },
    body2: {
      fontFamily: "'JetBrains Mono', monospace",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: draculaColors.background,
          color: draculaColors.foreground,
        },
        '::-webkit-scrollbar': {
          width: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: draculaColors.background,
        },
        '::-webkit-scrollbar-thumb': {
          background: draculaColors.currentLine,
          borderRadius: '4px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: draculaColors.comment,
        },
      },
    },
  },
});
```

- [ ] **Step 2: Verify build**

```bash
bun run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/theme/dracula.ts
git commit -m "feat: add dracula theme configuration"
```

---

### Task 3: Create Data Files

**Files:**
- Create: `src/data/configs.ts`, `src/data/tools.ts`

- [ ] **Step 1: Create configs data file**

Create `src/data/configs.ts`:

```ts
export interface Config {
  id: string;
  name: string;
  description: string;
  screenshot: string;
  sourceUrl: string;
  code: string;
  language: string;
}

export const configs: Config[] = [
  {
    id: 'fastfetch',
    name: 'Fastfetch',
    description: 'System info tool with Dracula theme',
    screenshot: '/screenshots/fastfetch.png',
    sourceUrl: 'https://github.com/yuzu-octopus/.config/blob/main/fastfetch/config.json',
    language: 'json',
    code: `{
  "$schema": "https://github.com/fastfetch-cli/fastfetch/raw/dev/doc/json_schema.json",
  "logo": {
    "source": "~/.config/fastfetch/logo.png",
    "padding": {
      "top": 2,
      "bottom": 2,
      "left": 2,
      "right": 2
    }
  },
  "display": {
    "separator": "  ",
    "colors": {
      "color1": "purple",
      "color2": "pink",
      "color3": "cyan"
    }
  },
  "modules": [
    "title",
    "separator",
    "os",
    "host",
    "kernel",
    "uptime",
    "packages",
    "shell",
    "display",
    "de",
    "wm",
    "wmtheme",
    "theme",
    "icons",
    "terminal",
    "terminalfont",
    "cpu",
    "gpu",
    "memory",
    "disk"
  ]
}`,
  },
  {
    id: 'starship',
    name: 'Starship',
    description: 'Cross-shell prompt with custom Dracula config',
    screenshot: '/screenshots/starship.png',
    sourceUrl: 'https://github.com/yuzu-octopus/.config/blob/main/starship.toml',
    language: 'toml',
    code: `# ~/.config/starship.toml

format = """
$character"""

[character]
success_symbol = "[❯](purple)"
error_symbol = "[❯](red)"

[directory]
style = "bold cyan"

[git_branch]
style = "bold purple"

[git_status]
style = "bold yellow"

[package]
style = "bold green"

[python]
style = "bold blue"

[nodejs]
style = "bold green"

[bun]
style = "bold cyan"
`,
  },
  {
    id: 'ghostty',
    name: 'Ghostty',
    description: 'GPU-accelerated terminal emulator config',
    screenshot: '/screenshots/ghostty.png',
    sourceUrl: 'https://github.com/yuzu-octopus/.config/blob/main/ghostty/config',
    language: 'ini',
    code: `# ~/.config/ghostty/config

# Font
font-family = "JetBrains Mono"
font-size = 14
font-thickness = 0.5

# Theme
theme = "dracula"

# Window
window-padding-x = 10
window-padding-y = 10
window-padding-balance = true

# Cursor
cursor-style = block
cursor-style-invert = true

# Shell
command = nu
`,
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    description: 'AI coding assistant configuration',
    screenshot: '/screenshots/opencode.png',
    sourceUrl: 'https://github.com/yuzu-octopus/.config/blob/main/opencode/opencode.json',
    language: 'json',
    code: `{
  "$schema": "https://opencode.ai/schema.json",
  "theme": "dracula",
  "model": {
    "provider": "openai",
    "name": "gpt-4"
  },
  "keys": {
    "quit": "ctrl-c",
    "submit": "enter"
  }
}`,
  },
];
```

- [ ] **Step 2: Create tools data file**

Create `src/data/tools.ts`:

```ts
export interface Tool {
  id: string;
  name: string;
  category: string;
  description: string;
  url?: string;
  icon?: string;
}

export const tools: Tool[] = [
  {
    id: 'ghostty',
    name: 'Ghostty',
    category: 'Terminal',
    description: 'GPU-accelerated terminal emulator',
    url: 'https://ghostty.org',
  },
  {
    id: 'nushell',
    name: 'Nushell',
    category: 'Terminal',
    description: 'Modern shell with structured data pipelines',
    url: 'https://www.nushell.sh',
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    category: 'Editor',
    description: 'AI-powered coding assistant',
    url: 'https://opencode.ai',
  },
  {
    id: 'zed',
    name: 'Zed',
    category: 'Editor',
    description: 'High-performance code editor',
    url: 'https://zed.dev',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Languages',
    description: 'Primary language for scripts and CTF tools',
    url: 'https://python.org',
  },
  {
    id: 'javascript',
    name: 'JavaScript / TypeScript',
    category: 'Languages',
    description: 'Web development and tooling',
    url: 'https://typescriptlang.org',
  },
  {
    id: 'bun',
    name: 'Bun',
    category: 'Languages',
    description: 'Fast JavaScript runtime and package manager',
    url: 'https://bun.sh',
  },
  {
    id: 'uv',
    name: 'uv',
    category: 'Languages',
    description: 'Fast Python package installer',
    url: 'https://github.com/astral-sh/uv',
  },
];
```

- [ ] **Step 3: Verify build**

```bash
bun run build
```

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/data/configs.ts src/data/tools.ts
git commit -m "feat: add config and tool data files"
```

---

### Task 4: Create Sidebar Component

**Files:**
- Create: `src/components/Sidebar.tsx`

- [ ] **Step 1: Create Sidebar component**

Create `src/components/Sidebar.tsx`:

```tsx
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Avatar,
  Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import CodeIcon from '@mui/icons-material/Code';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import GitHubIcon from '@mui/icons-material/GitHub';
import { draculaColors } from '../theme/dracula';

const navItems = [
  { text: 'Home', icon: <HomeIcon />, href: '#hero' },
  { text: 'About', icon: <PersonIcon />, href: '#about' },
  { text: 'Configs', icon: <CodeIcon />, href: '#configs' },
  { text: 'Workspace', icon: <DesktopMacIcon />, href: '#workspace' },
];

const drawerWidth = 240;

export function Sidebar() {
  return (
    <Drawer
      variant="fixed"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: draculaColors.currentLine,
          borderRight: `1px solid ${draculaColors.comment}`,
        },
      }}
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Avatar
          src="https://avatars.githubusercontent.com/u/275212760?v=4"
          sx={{ width: 80, height: 80, margin: '0 auto', mb: 1 }}
        />
        <Typography variant="h6" sx={{ color: draculaColors.purple, fontWeight: 700 }}>
          yuzu
        </Typography>
        <Typography variant="caption" sx={{ color: draculaColors.comment }}>
          solo dev · ctf · configs
        </Typography>
      </Box>
      <Divider sx={{ borderColor: draculaColors.comment }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component="a" href={item.href}>
              <ListItemIcon sx={{ color: draculaColors.foreground }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderColor: draculaColors.comment }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component="a"
            href="https://github.com/yuzu-octopus"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ListItemIcon sx={{ color: draculaColors.foreground }}>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText primary="GitHub" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
bun run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Sidebar.tsx
git commit -m "feat: add sidebar navigation component"
```

---

### Task 5: Create Hero Component

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Create Hero component**

Create `src/components/Hero.tsx`:

```tsx
import { Box, Avatar, Typography, Button, Container } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { draculaColors } from '../theme/dracula';

export function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: draculaColors.background,
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Avatar
          src="https://avatars.githubusercontent.com/u/275212760?v=4"
          sx={{
            width: 150,
            height: 150,
            margin: '0 auto',
            mb: 3,
            border: `4px solid ${draculaColors.purple}`,
          }}
        />
        <Typography variant="h1" sx={{ fontSize: '3rem', mb: 1, color: draculaColors.purple }}>
          Hi, I'm yuzu
        </Typography>
        <Typography
          variant="h5"
          sx={{ mb: 3, color: draculaColors.comment, fontWeight: 400 }}
        >
          Solo developer who loves CTFs and configuring everything.
        </Typography>
        <Button
          variant="contained"
          startIcon={<GitHubIcon />}
          href="https://github.com/yuzu-octopus"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            backgroundColor: draculaColors.purple,
            color: draculaColors.foreground,
            fontFamily: "'JetBrains Mono', monospace",
            '&:hover': {
              backgroundColor: draculaColors.pink,
            },
          }}
        >
          View GitHub
        </Button>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
bun run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: add hero section component"
```

---

### Task 6: Create About Component

**Files:**
- Create: `src/components/About.tsx`

- [ ] **Step 1: Create About component**

Create `src/components/About.tsx`:

```tsx
import { Box, Container, Typography, Paper } from '@mui/material';
import { draculaColors } from '../theme/dracula';

export function About() {
  return (
    <section
      id="about"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: draculaColors.currentLine,
        padding: '4rem 0',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          sx={{ mb: 3, color: draculaColors.purple, borderBottom: `2px solid ${draculaColors.purple}`, pb: 1 }}
        >
          About Me
        </Typography>
        <Paper
          sx={{
            p: 3,
            backgroundColor: draculaColors.background,
            border: `1px solid ${draculaColors.comment}`,
          }}
        >
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            I'm a solo developer passionate about security, CTFs, and crafting the perfect
            development environment. I believe that the tools you use shape how you think,
            which is why I spend time configuring everything from my terminal to my editor.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            When I'm not solving CTF challenges or writing exploit scripts, you'll find me
            tweaking dotfiles, exploring new tools, or building projects with Python and
            JavaScript. I use Ghostty as my terminal, OpenCode as my AI coding assistant,
            and Zed for quick edits.
          </Typography>
        </Paper>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
bun run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/About.tsx
git commit -m "feat: add about section component"
```

---

### Task 7: Create ConfigCard Component

**Files:**
- Create: `src/components/ConfigCard.tsx`

- [ ] **Step 1: Create ConfigCard component with expandable code**

Create `src/components/ConfigCard.tsx`:

```tsx
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Collapse,
  Box,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { draculaColors } from '../theme/dracula';
import type { Config } from '../data/configs';

interface ConfigCardProps {
  config: Config;
}

export function ConfigCard({ config }: ConfigCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundColor: draculaColors.background,
        border: `1px solid ${draculaColors.comment}`,
        color: draculaColors.foreground,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ color: draculaColors.purple, mb: 1 }}>
          {config.name}
        </Typography>
        <Typography variant="body2" sx={{ color: draculaColors.comment, mb: 2 }}>
          {config.description}
        </Typography>
        <Box
          sx={{
            backgroundColor: draculaColors.currentLine,
            borderRadius: 1,
            p: 2,
            mb: 2,
            minHeight: 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px dashed ${draculaColors.comment}`,
          }}
        >
          <Typography variant="caption" sx={{ color: draculaColors.comment }}>
            Screenshot: {config.name}
          </Typography>
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box
            sx={{
              backgroundColor: '#1e1f29',
              borderRadius: 1,
              p: 2,
              overflow: 'auto',
              maxHeight: 400,
              border: `1px solid ${draculaColors.comment}`,
            }}
          >
            <pre
              style={{
                margin: 0,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.8rem',
                lineHeight: 1.5,
                color: draculaColors.foreground,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {config.code}
            </pre>
          </Box>
        </Collapse>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button
          size="small"
          onClick={() => setExpanded(!expanded)}
          sx={{ color: draculaColors.purple }}
        >
          {expanded ? 'Hide Source' : 'View Source'}
          <ExpandMoreIcon
            sx={{
              transform: expanded ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s',
            }}
          />
        </Button>
        <Button
          size="small"
          href={config.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<OpenInNewIcon />}
          sx={{ color: draculaColors.cyan }}
        >
          Full Config
        </Button>
      </CardActions>
    </Card>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
bun run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/ConfigCard.tsx
git commit -m "feat: add config card with expandable source"
```

---

### Task 8: Create ConfigsGallery Component

**Files:**
- Create: `src/components/ConfigsGallery.tsx`

- [ ] **Step 1: Create ConfigsGallery component**

Create `src/components/ConfigsGallery.tsx`:

```tsx
import { Box, Container, Typography, Grid } from '@mui/material';
import { draculaColors } from '../theme/dracula';
import { configs } from '../data/configs';
import { ConfigCard } from './ConfigCard';

export function ConfigsGallery() {
  return (
    <section
      id="configs"
      style={{
        minHeight: '100vh',
        padding: '4rem 0',
        backgroundColor: draculaColors.background,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{ mb: 4, color: draculaColors.purple, borderBottom: `2px solid ${draculaColors.purple}`, pb: 1 }}
        >
          Configs
        </Typography>
        <Grid container spacing={3}>
          {configs.map((config) => (
            <Grid item xs={12} md={6} key={config.id}>
              <ConfigCard config={config} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
bun run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/ConfigsGallery.tsx
git commit -m "feat: add configs gallery component"
```

---

### Task 9: Create ToolCard Component

**Files:**
- Create: `src/components/ToolCard.tsx`

- [ ] **Step 1: Create ToolCard component**

Create `src/components/ToolCard.tsx`:

```tsx
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { draculaColors } from '../theme/dracula';
import type { Tool } from '../data/tools';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Card
      sx={{
        backgroundColor: draculaColors.background,
        border: `1px solid ${draculaColors.comment}`,
        height: '100%',
        transition: 'border-color 0.2s',
        '&:hover': {
          borderColor: draculaColors.purple,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="h6" sx={{ color: draculaColors.cyan, mb: 1 }}>
            {tool.name}
          </Typography>
          {tool.url && (
            <IconButton
              size="small"
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: draculaColors.comment }}
            >
              <OpenInNewIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
        <Typography variant="body2" sx={{ color: draculaColors.comment }}>
          {tool.description}
        </Typography>
        <Box
          sx={{
            mt: 1,
            display: 'inline-block',
            px: 1,
            py: 0.5,
            backgroundColor: draculaColors.currentLine,
            borderRadius: 1,
            fontSize: '0.7rem',
            color: draculaColors.purple,
          }}
        >
          {tool.category}
        </Box>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
bun run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/ToolCard.tsx
git commit -m "feat: add tool card component"
```

---

### Task 10: Create Workspace Component

**Files:**
- Create: `src/components/Workspace.tsx`

- [ ] **Step 1: Create Workspace component**

Create `src/components/Workspace.tsx`:

```tsx
import { Box, Container, Typography, Grid } from '@mui/material';
import { draculaColors } from '../theme/dracula';
import { tools } from '../data/tools';
import { ToolCard } from './ToolCard';

export function Workspace() {
  return (
    <section
      id="workspace"
      style={{
        minHeight: '100vh',
        padding: '4rem 0',
        backgroundColor: draculaColors.currentLine,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{ mb: 4, color: draculaColors.purple, borderBottom: `2px solid ${draculaColors.purple}`, pb: 1 }}
        >
          Workspace
        </Typography>
        <Grid container spacing={2}>
          {tools.map((tool) => (
            <Grid item xs={12} sm={6} md={4} key={tool.id}>
              <ToolCard tool={tool} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
bun run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Workspace.tsx
git commit -m "feat: add workspace section component"
```

---

### Task 11: Add Dev Server and Test Locally

**Files:**
- No new files

- [ ] **Step 1: Start dev server**

```bash
bun run dev
```

Expected: Dev server starts on http://localhost:5173

- [ ] **Step 2: Verify all sections render**

Open http://localhost:5173 and verify:
- Sidebar with avatar, name, nav links, and GitHub link
- Hero section with avatar, name, tagline, and GitHub button
- About section with bio text
- Configs Gallery with 4 expandable config cards
- Workspace section with 8 tool cards
- Smooth scroll navigation works
- Dracula theme colors are applied throughout
- JetBrains Mono font is loaded

- [ ] **Step 3: Stop dev server**

```bash
# Ctrl+C in terminal
```

---

### Task 12: Configure GitHub Pages Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create GitHub Actions workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install
      - run: bun run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Update vite.config.ts for GitHub Pages base path**

Update `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/GitHub_Page/',
})
```

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml vite.config.ts
git commit -m "feat: add github pages deployment workflow"
```

---

### Task 13: Final Verification and Push

**Files:**
- No new files

- [ ] **Step 1: Run final build**

```bash
bun run build
```

Expected: Clean build with no errors or warnings.

- [ ] **Step 2: Push to GitHub**

```bash
git push origin main
```

Expected: Push succeeds, GitHub Actions workflow triggers.

- [ ] **Step 3: Verify deployment**

After GitHub Actions completes, visit:
`https://yuzu-octopus.github.io/GitHub_Page/`

Expected: Site loads with all sections visible and functional.
