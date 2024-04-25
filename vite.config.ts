import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'favicon/apple-touch-icon.png'],
      manifest: {
        name: 'Morning Routine Helper',
        short_name: 'Routine',
        description: 'A simple tool to help keep your mornings on track.',
        start_url: '/routine',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'favicon/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'favicon/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'favicon/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'favicon/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
