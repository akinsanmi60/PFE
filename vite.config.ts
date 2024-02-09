/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPath from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import { InlineConfig } from 'vitest';

// https://vitejs.dev/config/

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}
export default defineConfig({
  plugins: [react(), svgr(), tsconfigPath()],
  build: {
    cssCodeSplit: true,
    minify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
      },
    },
  },
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect): */
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTest.ts',
  },
} as VitestConfigExport);
