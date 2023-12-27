import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Указываем точку входа
    rollupOptions: {
      input: {
        main: 'src/main.tsx',
      },
    },
  },
  base: '/',
  publicDir: './public', // указывает на вашу папку public
});
