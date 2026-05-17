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
