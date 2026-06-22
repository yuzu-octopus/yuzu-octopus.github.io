import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'docs',
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('@mui/icons-material')) return 'mui-icons';
          if (id.includes('@mui/material') || id.includes('@mui/system')) return 'mui-core';
          if (id.includes('@emotion')) return 'mui-core';
        },
      },
    },
  },
})
