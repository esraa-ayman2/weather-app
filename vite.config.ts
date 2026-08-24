import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(() => {
  return {
    plugins: [
      angular({
        tsconfig: path.resolve(__dirname, 'tsconfig.app.json'),
        jit: true,
      }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
      mainFields: ['module'],
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
