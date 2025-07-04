/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  base: './',
  root: fileURLToPath(new URL('..', import.meta.url)),
  css: {
    postcss: './config/postcss.config.js'
  },
  build: {
    outDir: 'extension/dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        app: './extension-template.html'
      },
      output: {
        // Generate a single HTML file with all assets inlined
        inlineDynamicImports: true,
        entryFileNames: 'mermaid-slides.js',
        chunkFileNames: 'chunk-[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    },
    // Inline all assets for self-contained build
    assetsInlineLimit: 100000000, // 100MB - inline everything
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 2000
  }
})