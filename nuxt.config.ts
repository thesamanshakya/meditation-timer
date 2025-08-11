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
        { name: 'theme-color', content: '#1E75FF' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        {
          name: 'apple-mobile-web-app-title',
          content: 'Hamro Meditation Timer',
        },
        { name: 'msapplication-TileColor', content: '#1E75FF' },
        { name: 'msapplication-config', content: '/browserconfig.xml' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '48x48',
          href: '/icon-48x48.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '72x72',
          href: '/icon-72x72.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '96x96',
          href: '/icon-96x96.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '144x144',
          href: '/icon-144x144.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          href: '/icon-192x192.png',
        },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/icon.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' },
      ],
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
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icon.png'],
    manifest: {
      short_name: 'Hamro Meditation Timer',
      name: 'Hamro Meditation Timer',
      description: 'Made by Saman with ❤',
      lang: 'en',
      start_url: '/',
      background_color: '#1E75FF',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      theme_color: '#1E75FF',
      icons: [
        {
          src: '/icon-48x48.png',
          sizes: '48x48',
          type: 'image/png',
        },
        {
          src: '/icon-72x72.png',
          sizes: '72x72',
          type: 'image/png',
        },
        {
          src: '/icon-96x96.png',
          sizes: '96x96',
          type: 'image/png',
        },
        {
          src: '/icon-144x144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2}'],
      cleanupOutdatedCaches: true,
      additionalManifestEntries: [
        { url: '/', revision: null },
        { url: '/favicon.ico', revision: null },
        { url: '/icon.png', revision: null },
        { url: '/icon-48x48.png', revision: null },
        { url: '/icon-72x72.png', revision: null },
        { url: '/icon-96x96.png', revision: null },
        { url: '/icon-144x144.png', revision: null },
        { url: '/icon-192x192.png', revision: null },
        { url: '/apple-touch-icon.png', revision: null },
        { url: '/media/bell/gong-1.mp3', revision: null },
        { url: '/media/bell/gong-2.mp3', revision: null },
        { url: '/media/bell/gong-3.mp3', revision: null },
        { url: '/media/bell/gong-4.mp3', revision: null },
        { url: '/media/sounds/nature/forest-with-birds.mp3', revision: null },
        { url: '/media/instructions/anapana/english-1.mp3', revision: null },
        { url: '/media/instructions/anapana/english-2.mp3', revision: null },
        { url: '/media/instructions/anapana/hindi.mp3', revision: null },
        { url: '/media/instructions/anapana/nepali.mp3', revision: null },
        { url: '/media/sounds/nature/water-in-stream.mp3', revision: null },
        { url: '/media/sounds/nature/birds-with-river.mp3', revision: null },
        { url: '/media/sounds/nature/birds.mp3', revision: null },
      ],
      navigateFallback: '/',
      runtimeCaching: [
        {
          urlPattern: ({ request }) => request.destination === 'document',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pages',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
            },
          },
        },
        {
          urlPattern: /^.*\.(mp3)$/i,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'audio-cache',
            cacheableResponse: {
              statuses: [0, 200],
            },
            fetchOptions: {
              mode: 'no-cors',
            },
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              maxEntries: 30,
              purgeOnQuotaError: true,
            },
          },
        },
        {
          urlPattern: '/media/bell/.*',
          handler: 'CacheFirst',
          options: {
            cacheName: 'bell-sounds',
            cacheableResponse: {
              statuses: [0, 200],
            },
            fetchOptions: {
              mode: 'no-cors',
            },
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              purgeOnQuotaError: true,
            },
          },
        },
        {
          urlPattern: '/media/instructions/.*',
          handler: 'CacheFirst',
          options: {
            cacheName: 'meditation-instructions',
            cacheableResponse: {
              statuses: [0, 200],
            },
            fetchOptions: {
              mode: 'no-cors',
            },
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              purgeOnQuotaError: true,
            },
          },
        },
        {
          urlPattern: '/media/sounds/.*',
          handler: 'CacheFirst',
          options: {
            cacheName: 'background-sounds',
            cacheableResponse: {
              statuses: [0, 200],
            },
            fetchOptions: {
              mode: 'no-cors',
            },
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              purgeOnQuotaError: true,
            },
          },
        },
      ],
      skipWaiting: true,
      clientsClaim: true,
    },
  },

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },
});
