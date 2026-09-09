import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // Declare CSS layer order so theme overrides beat component base styles.
    {
      name: 'astryx-css-layer-order',
      transformIndexHtml() {
        return [
          {
            tag: 'style',
            children:
              '@layer reset, priority1, priority2, priority3, priority4, priority5, priority6, priority7, priority8, priority9, astryx-theme;',
            injectTo: 'head-prepend',
          },
        ];
      },
    },
    react(),
  ],
  base: '/',
  build: {
    outDir: 'docs',
  },
})
