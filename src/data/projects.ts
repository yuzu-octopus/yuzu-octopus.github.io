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
    id: 'tradingbot',
    name: 'TradingBot',
    description:
      'ML trading bot scoring per-stock buy/sell confidence across the S&P 500 with a decoder-only Transformer using causal masking and cross-stock self-attention over OHLCV plus technical indicators.',
    features: [
      '478K Transformer',
      'S&P 500',
      'Multi-loss',
      'Sharpe-tuned',
    ],
    language: 'Python',
    githubUrl: 'https://github.com/yuzu-octopus/TradingBot',
  },
  {
    id: 'ctf-llm',
    name: 'CTF-LLM',
    description:
      'Fine-tunes open-source LLMs (Gemma 4, Qwen 3.5) with QLoRA on free Colab to solve CTF and competitive-programming problems — scraping GitHub writeups, training with Unsloth, and evaluating on a 210-question benchmark.',
    features: [
      'QLoRA on free Colab',
      '210-question benchmark',
      'PWN/REV/web/crypto',
      'GGUF export',
    ],
    language: 'Python',
    githubUrl: 'https://github.com/yuzu-octopus/CTF-LLM',
  },
];
