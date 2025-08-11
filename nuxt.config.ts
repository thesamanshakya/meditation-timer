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
    manifest: {
      short_name: 'Hamro Meditation Timer',
      name: 'Hamro Meditation Timer',
      description: 'Made by Saman with ❤',
      lang: 'en',
      useWebmanifestExtension: false,
      start_url: '/?source=pwa',
      background_color: '#1E75FF',
      display: 'fullscreen',
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
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      additionalManifestEntries: [
        '/',
        '/favicon.ico',
        '/icon.png',
        '/icon-48x48.png',
        '/icon-72x72.png',
        '/icon-96x96.png',
        '/icon-144x144.png',
        '/icon-192x192.png',
        '/apple-touch-icon.png',
        '/media/bell/gong-1.mp3',
        '/media/bell/gong-2.mp3',
        '/media/bell/gong-3.mp3',
        '/media/bell/gong-4.mp3',
        '/media/sounds/nature/forest-with-birds.mp3',
        '/media/instructions/anapana/english-1.mp3',
        '/media/instructions/anapana/english-2.mp3',
        '/media/instructions/anapana/hindi.mp3',
        '/media/instructions/anapana/nepali.mp3',
        '/media/sounds/nature/forest-with-birds.mp3',
        '/media/sounds/nature/water-in-stream.mp3',
        '/media/sounds/nature/birds-with-river.mp3',
        '/media/sounds/nature/birds.mp3',
      ],
      runtimeCaching: [
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
