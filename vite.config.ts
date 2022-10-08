import react from '@vitejs/plugin-react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@features': path.resolve(__dirname, './src/features'),
      '@infrastructure': path.resolve(__dirname, './src/infrastructure'),
      '@screens': path.resolve(__dirname, './src/screens'),
      '@ui-library': path.resolve(__dirname, './src/ui-library'),
    },
  },
});
