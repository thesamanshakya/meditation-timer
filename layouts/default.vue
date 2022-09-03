<template>
    <div id="wrapper">
        <div id="nav-container" :class="{ active: navActive }">
            <div class="menu-button" @click="navActive = !navActive">
                <span class="i-bar"></span>
                <span class="i-bar"></span>
                <span class="i-bar"></span>
            </div>
            <div class="nav-content">
                <ul class="nav">
                    <li>
                        <a
                            href="http://m.me/100666278588914"
                            target="_blank"
                            rel="nofollow noopener"
                            >Contact Developer</a
                        >
                    </li>
                    <li>
                        <a
                            href="http://m.me/100666278588914"
                            target="_blank"
                            rel="nofollow noopener"
                            >Report a bug</a
                        >
                    </li>
                    <li>
                        <a
                            href="http://m.me/anapansati"
                            target="_blank"
                            rel="nofollow noopener"
                            >Join meditation!</a
                        >
                    </li>
                    <li>
                        <a
                            href="https://buymeacoffee.com/samanshakya"
                            target="_blank"
                            rel="nofollow noopener"
                            >Buy me a Coffee!</a
                        >
                    </li>
                </ul>
                <span class="by"
                    >App created by<i
                        ><a href="https://saman.com.np">Saman Shakya</a> with
                        &hearts;</i
                    ><i>May all beings be happy! &#128522;</i></span
                >
            </div>
        </div>
        <div class="w1">
            <Nuxt />
            <span class="quotes">
                "{{ quote.quote }}" - <span>{{ quote.author }}</span>
            </span>
            <span class="top-right">
                <Battery />
                <Settings />
            </span>
            <audio id="custom-audio-elem">
                Your browser does not support the audio format.
            </audio>
        </div>
        <span class="install"
            >Get this free app. It won't take up space on your device.
            <a href="javscript:void(0)" class="btn-install" id="install-add"
                >Install App</a
            ></span
        >
    </div>
</template>

<script>
import { quotes } from '~/assets/data/data.js';
export default {
    data() {
        return {
            colorTheme: ['purple', 'red', 'blue', 'pink', 'green'],
            navActive: false,
            quotes: quotes,
            quote: ''
        };
    },
    methods: {
        setBodyBgColor() {
            const bodyElem = document.body;
            bodyElem.removeAttribute('class');
            bodyElem.classList.add(
                this.colorTheme[
                    Math.floor(Math.random() * this.colorTheme.length)
                ]
            );
        },
        getQuote() {
            return this.quotes[Math.floor(Math.random() * this.quotes.length)];
        }
    },
    mounted() {
        this.setBodyBgColor();
        this.quote = this.getQuote();
        setInterval(() => {
            this.setBodyBgColor();
            this.quote = this.getQuote();
        }, 7000);
    },
    destroyed() {
        document.body.removeAttribute('class');
    }
};
</script>

<style lang="scss" scoped>
</style>