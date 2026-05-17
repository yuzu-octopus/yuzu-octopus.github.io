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
