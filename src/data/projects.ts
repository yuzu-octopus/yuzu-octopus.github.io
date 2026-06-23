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
      'A browser-based RSA cryptanalysis toolkit. Deploy one attack at a time — or chain them — against your chosen modulus. Fermat, Pollard p-1, Williams p+1, ROCA, batch-GCD, Dixon, Wiener, Boneh-Durfee, Hastad\'s broadcast, related-message (Franklin-Reiter / Coppersmith), chosen-plaintext LSB oracle, and more.',
    features: [
      '40+ attacks',
      'Multi-attack orchestration',
      'SageCell integration',
      'CTF-oriented UI',
    ],
    language: 'TypeScript',
    githubUrl: 'https://github.com/yuzu-octopus/RsaWebTool',
  },
  {
    id: 'projectsite',
    name: 'ProjectSite',
    description:
      'Generates self-contained GitHub Pages HTML for project showcase pages from TOML data and a Jinja2 template. Dracula-themed template with sidebar navigation and responsive layout — the same engine that powers all project landing pages.',
    features: [
      'TOML-driven pages',
      'Dracula-themed template',
      'Batch generation support',
      'CI/CD integration',
    ],
    language: 'Python',
    githubUrl: 'https://github.com/yuzu-octopus/ProjectSite',
  },
  {
    id: 'tradingbot',
    name: 'TradingBot',
    description:
      'Multi-stock ML trading bot using a decoder-only Transformer with causal masking and cross-stock self-attention. Takes OHLCV + technical indicators across four lookback windows and outputs per-stock buy/sell confidence scores. Trained on the entire S&P 500 universe.',
    features: [
      '478K-parameter Transformer',
      'S&P 500 universe (503 stocks)',
      'Multiple loss functions',
      'Sharpe-optimized thresholds',
    ],
    language: 'Python',
    githubUrl: 'https://github.com/yuzu-octopus/TradingBot',
  },
  {
    id: 'ctf-llm',
    name: 'CTF-LLM',
    description:
      'Fine-tunes open-source LLMs (Gemma 4, Qwen 3.5) to solve CTF challenges and competitive programming problems using QLoRA on Google Colab free tier. A complete pipeline: scrape writeups from GitHub, combine with curated datasets, train with Unsloth, and evaluate against a 210-question benchmark.',
    features: [
      'QLoRA fine-tuning on free Colab',
      '210-question CTF benchmark',
      'PWN, REV, web, crypto coverage',
      'GGUF export for local inference',
    ],
    language: 'Python',
    githubUrl: 'https://github.com/yuzu-octopus/CTF-LLM',
  },
];
