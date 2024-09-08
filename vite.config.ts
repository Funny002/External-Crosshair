import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  cacheDir: resolve(__dirname, '.cache'),
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1024,
    outDir: resolve(__dirname, './build/web'),
  },
  server: {
    port: 8420,
  },
  resolve: {
    alias: {
      '@views': resolve(__dirname, './src/views'),
      '@utils': resolve(__dirname, './src/utils'),
      '@layouts': resolve(__dirname, './src/layouts'),
      '@components': resolve(__dirname, './src/components'),
    },
  },
});
