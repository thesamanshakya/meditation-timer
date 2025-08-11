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
                    content: 'width=device-width, initial-scale=1'
                },
                {
                    name: 'description',
                    content:
                        'Hamro Meditation Timer - a simple and lightweight tool for meditation created by Saman with ❤'
                }
            ],
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
        }
    },
    modules: ['@nuxtjs/google-fonts'],
    googleFonts: {
        families: {
            Inter: [300, 400, 500, 600, 700]
        },
        display: 'swap'
    },

    postcss: {
        plugins: {
            '@tailwindcss/postcss': {},
            autoprefixer: {}
        }
    }
});
