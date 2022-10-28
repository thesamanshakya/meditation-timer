/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}'
    ],
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px'
        },
        extend: {
            fontFamily: {
                Roboto: ['"Roboto"']
            },
            colors: {
                primary: '#1E75FF',
                primaryDark: '#0465ff',
                green: '#0E8738',
                grayRGBA: 'rgba(255,255,255,0.25)'
            }
        }
    }
};
