export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Target: https://go.nuxtjs.dev/config-target
    // target: 'static',

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
    css: [
        '~/assets/scss/_variables.scss',
        '~/assets/scss/_markup-mixins.scss',
        '~/assets/scss/style.scss'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // Simple usage
        '@nuxtjs/svg'
        // '@nuxtjs/vuetify',
        // // With options
        // [
        //     '@nuxtjs/vuetify',
        //     {
        //         /* module options */
        //     }
        // ]
    ],

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
    modules: ['@nuxtjs/style-resources', '@nuxtjs/pwa'],

    pwa: {
        manifest: {
            short_name: 'Hamro Meditation Timer',
            name: 'Hamro Meditation Timer',
            description: 'Made by Saman with ❤',
            lang: 'en',
            useWebmanifestExtension: false,
            start_url: '/?source=pwa',
            background_color: '#000',
            display: 'fullscreen',
            orientation: 'portrait',
            scope: '/',
            theme_color: '#000'
            // shortcuts: [
            //     {
            //         name: 'Hamro Meditation Timer',
            //         short_name: 'Hamro Meditation Timer',
            //         description: 'Made by Saman with ❤',
            //         url: '/app?source=pwa',
            //         icons: [
            //             {
            //                 src: '/favicon/192x192.png',
            //                 sizes: '192x192'
            //             }
            //         ]
            //     }
            // ]
        }
    },

    styleResources: {
        scss: [
            './assets/scss/_variables.scss',
            './assets/scss/_breakpoint.scss',
            './assets/scss/_markup-mixins.scss'
        ]
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        loaders: {
            sass: {
                implementation: require('sass')
            },
            scss: {
                implementation: require('sass')
            }
        }
    }
};
