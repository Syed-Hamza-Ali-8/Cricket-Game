import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensures the build directory matches Vercel's expectations
  },
  server: {
    open: true, // Opens the app in the browser on localhost
  },
});
