import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  ssr: false,
  css: ['~/assets/css/tailwind.css'],
  components: [{ path: '~/components', pathPrefix: false }],
  app: {
    head: {
      title: 'Hamro Meditation Timer',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'description',
          content:
            'Hamro Meditation Timer - a simple and lightweight tool for meditation created by Saman with ❤',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  modules: ['@nuxtjs/google-fonts', '@vite-pwa/nuxt', 'nuxt-gtag'],
  googleFonts: {
    families: {
      Inter: [300, 400, 500, 600, 700],
    },
    display: 'swap',
  },

  gtag: {
    id: 'G-BQ59PQT3H5',
  },

  pwa: {
    registerType: 'autoUpdate',
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico,mp3}'],
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB limit
    },
    client: {
      installPrompt: true,
    },
    manifest: {
      name: 'Hamro Meditation Timer',
      short_name: 'Meditation Timer',
      description:
        'A beautiful, feature-rich meditation timer with guided instructions, ambient sounds, and comprehensive statistics tracking',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/',
      icons: [
        {
          src: 'icon.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: 'favicon.ico',
          sizes: '64x64 32x32 24x24 16x16',
          type: 'image/x-icon',
        },
      ],
    },
  },

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },
});
