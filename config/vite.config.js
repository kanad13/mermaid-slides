/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'offline' ? './' : '/',
  root: fileURLToPath(new URL('..', import.meta.url)),
  css: {
    postcss: './config/postcss.config.js'
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          // React and core dependencies
          'react-vendor': ['react', 'react-dom'],
          // Lucide icons
          'icons': ['lucide-react'],
          // Mermaid will be dynamically imported and automatically chunked
        }
      }
    },
    // Increase chunk size warning limit to reduce noise for Mermaid chunks
    chunkSizeWarningLimit: 600
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.test.{ts,tsx}',
        'src/**/__tests__/**',
        'src/test/**',
        'src/types/**'
      ],
      reporter: ['text', 'json-summary'],
      reportsDirectory: 'coverage',
      thresholds: {
        statements: 46.81,
        branches: 75.24,
        functions: 46.15,
        lines: 46.81
      }
    }
  }
}))
