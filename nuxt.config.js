export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Target: https://go.nuxtjs.dev/config-target
    // target: 'static',
    loadingIndicator: {
        name: 'three-bounce',
        color: '#FFF',
        background: '#1E75FF'
    },

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Hamro Meditation Timer',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content:
                    'Hamro Meditation Timer - a simple and lightweight tool for meditation created by Saman with &hearts;'
            },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['@/assets/css/tailwind.css'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~plugins/vuelidate.js',
        { src: '~/plugins/vue-toast-notification.js', mode: 'client' }
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: ['@nuxtjs/tailwindcss', '@nuxt/postcss8', '@nuxtjs/svg'],

    svg: {
        vueSvgLoader: {
            // vue-svg-loader options
        },
        svgSpriteLoader: {
            // svg-sprite-loader options
        },
        fileLoader: {
            // file-loader options
        }
    },

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/style-resources',
        '@nuxtjs/pwa',
        // '@nuxtjs/onesignal',
        // '@nuxtjs/auth-next',
        '@nuxtjs/google-fonts',
        '@nuxtjs/google-analytics',
        // [
        //     '@nuxtjs/firebase',
        //     {
        //         config: {
        //             apiKey: 'AIzaSyA9ltzcTBAzNDxYFTK_pjuxyGMwzHaZflA',
        //             authDomain: 'meditation-timer-82fdf.firebaseapp.com',
        //             projectId: 'meditation-timer-82fdf',
        //             storageBucket: 'meditation-timer-82fdf.appspot.com',
        //             messagingSenderId: '126206087439',
        //             appId: '1:126206087439:web:e23b5a9d6b1568b4d1ee7a',
        //             measurementId: 'G-2G68W6SHKX'
        //         },
        //         services: {
        //             auth: true,
        //             database: true
        //         }
        //     }
        // ]
    ],
    googleAnalytics: {
        id: 'G-BQ59PQT3H5'
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
            theme_color: '#1E75FF'
        },
        workbox: {
            preCaching: [
                '/',
                '/favicon.ico',
                '/icon.png'
            ],
            runtimeCaching: [
                {
                    urlPattern: /^.*\.(mp3)$/i,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'audio-cache',
                        cacheableResponse: {
                            statuses: [0, 200]
                        },
                        expiration: {
                            maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                            maxEntries: 30,
                            purgeOnQuotaError: true
                        }
                    }
                },
                {
                    urlPattern: '/media/bell/.*',
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'bell-sounds',
                        cacheableResponse: {
                            statuses: [0, 200]
                        },
                        expiration: {
                            maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                            purgeOnQuotaError: true
                        }
                    }
                },
                {
                    urlPattern: '/media/instructions/.*',
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'meditation-instructions',
                        cacheableResponse: {
                            statuses: [0, 200]
                        },
                        expiration: {
                            maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                            purgeOnQuotaError: true
                        }
                    }
                },
                {
                    urlPattern: '/media/sounds/.*',
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'background-sounds',
                        cacheableResponse: {
                            statuses: [0, 200]
                        },
                        expiration: {
                            maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                            purgeOnQuotaError: true
                        }
                    }
                }
            ],
            skipWaiting: true,
            clientsClaim: true
        }
    },

    googleFonts: {
        families: {
            Roboto: [100, 300, 400, 700],
            'Roboto Condensed': [300, 400],
            'Inter': [100, 200, 300, 400, 500]
        },
        display: 'swap'
    },

    // oneSignal: {
    //     init: {
    //         appId: '7ac2a33b-4358-4eed-b29e-b034636d18b1',
    //         allowLocalhostAsSecureOrigin: true,
    //         welcomeNotification: {
    //             disable: true
    //         }
    //     }
    // },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        // loaders: {
        //     sass: {
        //         implementation: require('sass')
        //     },
        //     scss: {
        //         implementation: require('sass')
        //     }
        // },
        postcss: {
            plugins: {
                tailwindcss: {},
                autoprefixer: {}
            }
        }
    }
};
