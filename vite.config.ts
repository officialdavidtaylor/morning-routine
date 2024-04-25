import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      base: '/routine',
      manifest: {
        name: 'Morning Routine Helper',
        short_name: 'Routine',
        description: 'A simple tool to help keep your mornings on track.',
        theme_color: '#ffffff',
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
