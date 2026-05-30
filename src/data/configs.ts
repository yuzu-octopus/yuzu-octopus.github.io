export type ConfigLanguage = 'json' | 'jsonc' | 'toml' | 'ini' | 'yaml' | 'sh' | 'nu';

export interface Config {
  id: string;
  name: string;
  description: string;
  screenshot: string;
  sourceUrl: string;
  rawUrl: string;
  language: ConfigLanguage;
}

export const configs: Config[] = [
  {
    id: 'fastfetch',
    name: 'Fastfetch',
    description: 'System info display with custom Dracula theming and categorized modules',
    screenshot: '/screenshots/fastfetch.png',
    sourceUrl: 'https://github.com/yuzu-octopus/.config/blob/main/fastfetch/config.jsonc',
    rawUrl: 'https://raw.githubusercontent.com/yuzu-octopus/.config/main/fastfetch/config.jsonc',
    language: 'json',
  },
  {
    id: 'starship',
    name: 'Starship',
    description: 'Cross-shell prompt with Dracula palette and directory substitutions',
    screenshot: '/screenshots/starship.png',
    sourceUrl: 'https://github.com/yuzu-octopus/.config/blob/main/starship.toml',
    rawUrl: 'https://raw.githubusercontent.com/yuzu-octopus/.config/main/starship.toml',
    language: 'toml',
  },
  {
    id: 'ghostty',
    name: 'Ghostty',
    description: 'GPU-accelerated terminal with Dracula theme, transparency, and Nerd Font',
    screenshot: '/screenshots/ghostty.gif',
    sourceUrl: 'https://github.com/yuzu-octopus/.config/blob/main/ghostty/config',
    rawUrl: 'https://raw.githubusercontent.com/yuzu-octopus/.config/main/ghostty/config',
    language: 'ini',
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    description: 'AI coding assistant with plugin ecosystem and MCP server integrations',
    screenshot: '/screenshots/opencode.png',
    sourceUrl: 'https://github.com/yuzu-octopus/.config/blob/main/opencode/opencode.jsonc',
    rawUrl: 'https://raw.githubusercontent.com/yuzu-octopus/.config/main/opencode/opencode.jsonc',
    language: 'json',
  },
  {
    id: 'nushell-env',
    name: 'Nushell Environment',
    description:
      "Nushell's environment configuration: editor, PATH, color settings, and LS_COLORS via vivid Dracula",
    screenshot: '/screenshots/nushell-env.png',
    sourceUrl: 'https://github.com/yuzu-octopus/.config/blob/main/nushell/env.nu',
    rawUrl: 'https://raw.githubusercontent.com/yuzu-octopus/.config/main/nushell/env.nu',
    language: 'nu',
  },
  {
    id: 'nushell-config',
    name: 'Nushell Config',
    description:
      'Shell aliases, configuration flags, history settings, fuzzy completions, and starship prompt integration',
    screenshot: '/screenshots/nushell-config.png',
    sourceUrl: 'https://github.com/yuzu-octopus/.config/blob/main/nushell/config.nu',
    rawUrl: 'https://raw.githubusercontent.com/yuzu-octopus/.config/main/nushell/config.nu',
    language: 'nu',
  },
  {
    id: 'code-runner',
    name: 'Code Runner',
    description:
      'Polyglot file runner with Dracula-themed output — detects file extensions and runs with the appropriate interpreter (Python, JS/TS, Go, Rust, C/C++, Java, Shell, Nushell, Ruby, Perl, Lua, Swift)',
    screenshot: '/screenshots/code-runner.gif',
    sourceUrl: 'https://github.com/yuzu-octopus/.config/blob/main/scripts/code_runner.zsh',
    rawUrl: 'https://raw.githubusercontent.com/yuzu-octopus/.config/main/scripts/code_runner.zsh',
    language: 'sh',
  },
];
