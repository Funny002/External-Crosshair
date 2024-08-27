import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: resolve(__dirname, './build/web'),
  },
  server: {
    port: 8420,
  },
  resolve: {
    alias: {
      '@views': resolve(__dirname, './src/views'),
      "@utils": resolve(__dirname, './src/utils'),
      '@components': resolve(__dirname, './src/components'),
    },
  },
});
