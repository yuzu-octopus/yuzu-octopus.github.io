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
];
