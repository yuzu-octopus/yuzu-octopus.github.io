export interface Project {
  id: string;
  name: string;
  description: string;
  features: string[];
  language: string;
  githubUrl: string;
}

export const projects: Project[] = [
  {
    id: 'rsawebtool',
    name: 'RsaWebTool',
    description:
      'A browser-based RSA cryptanalysis toolkit with 40+ attacks — Fermat, Wiener, ROCA, batch-GCD and more — runnable singly or chained against any modulus.',
    features: [
      '40+ attacks',
      'Attack chaining',
      'SageCell',
      'CTF-ready',
    ],
    language: 'TypeScript',
    githubUrl: 'https://github.com/yuzu-octopus/RsaWebTool',
  },
  {
    id: 'projectsite',
    name: 'ProjectSite',
    description:
      'Generates Dracula-themed GitHub Pages showcase sites from TOML data and a Jinja2 template — self-contained HTML with sidebar navigation and responsive layout.',
    features: [
      'TOML-driven',
      'Dracula theme',
      'Batch generation',
      'CI/CD',
    ],
    language: 'Python',
    githubUrl: 'https://github.com/yuzu-octopus/ProjectSite',
  },
  {
    id: 'glimpse',
    name: 'Glimpse',
    description:
      'Self-hosted glance-inspired dashboard — YAML-configured widgets with all external data fetched server-side, so API keys never reach the browser.',
    features: [
      '39 widget types',
      '48 theme presets',
      'Server-side fetching',
      'PWA',
    ],
    language: 'TypeScript',
    githubUrl: 'https://github.com/yuzu-octopus/glimpse',
  },
  {
    id: 'astryx-dracula',
    name: 'Astryx Dracula',
    description:
      'Pure Dracula brand kit for Astryx React sites — frozen palette, syntax theme, and chart colors as prebuilt CSS with zero runtime cost.',
    features: [
      'Dark-only tokens',
      'Syntax theme',
      'Prebuilt CSS',
    ],
    language: 'CSS',
    githubUrl: 'https://github.com/yuzu-octopus/astryx-dracula',
  },
];
