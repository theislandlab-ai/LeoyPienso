import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/LeoyPienso/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'Leo y Pienso',
        short_name: 'Leo y Pienso',
        description: 'Mejora la comprensión lectora de tu hijo a través de la metacognición',
        theme_color: '#4F46E5',
        background_color: '#F9FAFB',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/LeoyPienso/',
        icons: [
          { src: '/LeoyPienso/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/LeoyPienso/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,json,svg,png}']
      }
    })
  ]
})
