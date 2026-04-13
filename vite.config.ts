import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/papero/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'Papero',
        short_name: 'Papero',
        description: 'Papero esta preparando una nueva experiencia de compra.',
        theme_color: '#f4f8f1',
        background_color: '#f4f8f1',
        display: 'standalone',
        start_url: '/papero/',
        scope: '/papero/',
        icons: [
          {
            src: '/papero/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
});
