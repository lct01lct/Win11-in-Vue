import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';

const config = loadEnv('development', './');

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: config.VITE_PROT,
  },
  resolve: {
    alias: {
      '@': getPath('src'),
      view: getPath('src/view'),
      store: getPath('src/store'),
      comp: getPath('src/component'),
      style: getPath('src/assets/style'),
    },
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
    }),
  ],
});

function getPath(pathName = '') {
  return path.resolve(__dirname, pathName);
}
