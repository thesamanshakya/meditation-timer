<template>
    <div id="wrapper" class="overflow-hidden relative w-full h-full bg-black">
        <div
            id="nav-container"
            class="fixed h-screen w-full pointer-events-none z-10"
            :class="{ active: navActive }"
        >
            <div
                class="menu-button relative flex items-center flex-col z-10 appearance-none border-0 bg-transparent rounded-none w-8 cursor-pointer pointer-events-auto mt-6 ml-6"
                @click="navActive = !navActive"
            >
                <span
                    v-for="index in 3"
                    :key="index"
                    class="i-bar block w-full h-1 bg-white"
                ></span>
            </div>
            <div
                class="nav-content mt-16 absolute top-0 left-0 pointer-events-none opacity-0 px-6 py-3 bg-black -z-10 w-full text-center md:text-left md:w-[90%] md:max-w-[250px]"
            >
                <ul class="nav m-0 p-0 list-none">
                    <li class="mb-4">
                        <a
                            href="http://m.me/100666278588914"
                            target="_blank"
                            rel="nofollow noopener"
                            class="text-xl block pb-3 hover:text-white hover:pl-1"
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
                <span class="text-sm block"
                    >App created by<i class="block font-normal"
                        ><a class="underline" href="https://saman.com.np"
                            >Saman Shakya</a
                        >
                        with &hearts;</i
                    ><i>May all beings be happy! &#128522;</i></span
                >
            </div>
        </div>
        <div
            class="w1 flex items-center justify-center pb-2"
            :class="{ running: isRunning }"
        >
            <div class="text-center flex-1">
                <SvgIcons />
                <div
                    class="text-sm static top-1/2 right-8 mb-8 z-10 md:-mt-32 md:absolute md:text-lg"
                >
                    <strong class="font-normal mb-3 hidden md:block"
                        >Start/End Bell</strong
                    >
                    <ul
                        class="bell-sound flex whitespace-no-wrap justify-center m-0 p-0 rounded-md md:border-2 md:border-white md:block"
                    >
                        <li
                            v-for="(bell, index) in presetsList.bellSound.list"
                            :key="index"
                            :class="{
                                active: presetsList.bellSound.list[index]
                                    .statusActive
                            }"
                        >
                            <a
                                @click="selectBellList(index)"
                                class="px-1 py-4 cursor-pointer block md:px-3 md:py-5"
                                >{{ bell.name }}</a
                            >
                        </li>
                    </ul>
                </div>
                <div class="controls">
                    <ul
                        class="presets m-0 p-0 list-none flex justify-center flex-wrap leading-none pb-8"
                    >
                        <li
                            v-for="(preset, index) in presetsList.time"
                            :key="index"
                            class="mb-3 relative mx-2 md:mb-4"
                            :class="{
                                active: presetsList.time[index].statusActive
                            }"
                        >
                            <a
                                @click="selectTimeList(index)"
                                class="px-5 py-5 cursor-pointer block text-center border-2 border-white rounded-full md:px-8 md:pt-7 hover:text-gray-300"
                            >
                                {{
                                    preset.time >= 60
                                        ? preset.time / 60
                                        : preset.time
                                }}
                                <span class="block pt-[10%]">{{
                                    preset.time >= 60 ? 'hour' : 'mins'
                                }}</span>
                            </a>
                            <i
                                class="add-btn text-xs -left-2 -right-2 -bottom-5 p-2 border-2 border-white rounded-full bg-black whitespace-no-wrap hidden not-italic absolute z-10 cursor-pointer select-none md:text-base md:p-3 md:left-0 md:right-0 md:-bottom-5 hover:text-gray-300"
                                @click="addExtraDuration(preset.addTime)"
                                >Add +{{ preset.addTime }} mins</i
                            >
                        </li>
                    </ul>
                </div>
                <div
                    class="interval mt-3 flex items-center justify-center mb-6 md:mt-4"
                >
                    <input
                        type="checkbox"
                        id="switch"
                        @change="toggleIntervalBell"
                        class="h-0 w-0 invisible"
                    />
                    <label
                        for="switch"
                        class="cursor-pointer w-10 h-5 block relative bg-transparent -indent-[9999px] rounded-[100px] border-2 border-white md:w-12 md:h-6"
                    ></label>
                    <span class="interval-text text-sm ml-4 md:text-lg md:ml-5">
                        Interval Bell
                        <span
                            >is currently
                            {{ presetsList.intervalBell ? 'ON' : 'OFF' }}
                        </span>
                    </span>
                </div>

                <span
                    class="timer animate__pulse complete"
                    v-if="completeAction"
                    >COMPLETED!</span
                >
                <span class="timer block leading-none mb-8" v-else>
                    {{
                        isRunning
                            ? timeParser(tickerInMins)
                            : timeParser(presetsList.totalDurationInMins)
                    }}
                </span>

                <div class="custom-playing text-center p-9 pt-0" id="c-playing">
                    <div class="inline-block align-top relative pl-8">
                        <div class="absolute left-0 top-0 pr-3">
                            <div class="icon speaker">
                                <div class="left-8 top-6"></div>
                            </div>
                            <div
                                class="w-12 h-12 overflow-hidden absolute left-full rotate-180 scale-75"
                            >
                                <div
                                    class="second absolute border-4 border-white rounded-full w-6 h-6 top-9 left-6"
                                ></div>
                                <div
                                    class="third absolute border-4 border-white rounded-full w-10 h-10 top-6 left-6"
                                ></div>
                            </div>
                        </div>
                        <i
                            id="custom-audio-text"
                            class="text-left inline-block align-middle text-lg leading-7 not-italic ml-5 md:ml-8"
                            >Goenka Satipattana Sutta Chanting Day 5.mp3</i
                        >
                    </div>
                </div>

                <button
                    class="btn-action bg-transparent text-white border-0"
                    type="button"
                    @click="toggleTimer"
                    v-if="!completeAction"
                >
                    <svg class="icon icon-play-button" v-if="!isRunning">
                        <use xlink:href="#icon-play-button"></use>
                    </svg>
                    <svg class="icon icon-stop-button" v-else>
                        <use xlink:href="#icon-stop-button"></use>
                    </svg>
                </button>
            </div>
            <span
                class="text-base text-center absolute pointer-events-none cursor-default max-w-4xl inset-3 top-auto mx-auto md:text-lg"
            >
                "{{ quote.quote }}" -
                <span class="block md:inline">{{ quote.author }}</span>
            </span>
            <span class="absolute flex items-center right-6 top-6">
                <Battery />
                <Settings :presetsList="presetsList" />
            </span>
        </div>
        <span
            class="install hidden fixed bg-indigo-600 rounded-none text-sm leading-6 p-5 pr-[165px] text-white md:text-base md:rounded top-0 right-0 left-0 r-0 z-[9999px] md:w-[430px] md:pr-[140px] md:pl-6"
            >Get this free app. It won't take up space on your device.
            <a
                href="javscript:void(0)"
                class="btn-install text-sm font-normal px-4 py-5 leading-none absolute right-6 top-5 border-2 border-white rounded text-white md:font-bold md:top-5 md:right-5 md:px-3 md:text-base hover:bg-transparent hover:text-white"
                id="install-add"
                >Install App</a
            ></span
        >
    </div>
</template>

<script>
import { quotes } from '~/assets/data/quotes.js';
import SvgIcons from '~/assets/fonts/symbol-defs.svg?inline';
import NoSleep from 'nosleep.js';

export default {
    middleware: ['fireAuth'],
    data() {
        return {
            pageLoading: true,
            navActive: false,
            colorTheme: ['purple', 'red', 'blue', 'pink', 'green'],
            quotes: quotes,
            quote: '',
            noSleep: new NoSleep(),
            intervalFuncs: {
                bgQuoteChange: null,
                timer: null
            },
            tickerInMins: null,
            isRunning: false,
            completeAction: false,

            presetsList: {
                totalDurationInMins: 10,
                intervalBell: false,
                guidedInstruction: {
                    statusActive: false,
                    activePath: '/media/instructions/anapana/english.mp3',
                    audio: null,
                    language: [
                        {
                            language: 'english',
                            url: '/media/instructions/anapana/english.mp3',
                            statusActive: true
                        },
                        {
                            language: 'hindi',
                            url: '/media/instructions/anapana/hindi.mp3'
                        },
                        {
                            language: 'nepali',
                            url: '/media/instructions/anapana/nepali.mp3'
                        },
                        {
                            language: 'custom',
                            url: null
                        }
                    ]
                },
                time: [
                    {
                        time: 10,
                        addTime: 5,
                        statusActive: true
                    },
                    {
                        time: 30,
                        addTime: 15
                    },
                    {
                        time: 60,
                        addTime: 30
                    }
                ],
                bellSound: {
                    activePath: '/media/bell/gong-1.mp3',
                    audio: null,
                    list: [
                        {
                            name: 'Gong 1',
                            url: '/media/bell/gong-1.mp3',
                            statusActive: true
                        },
                        {
                            name: 'Gong 2',
                            url: '/media/bell/gong-2.mp3'
                        },
                        {
                            name: 'Gong 3',
                            url: '/media/bell/gong-3.mp3'
                        }
                        // {
                        //     name: 'S.N Goenka',
                        //     url: '/media/bell/sn-goenka.mp3'
                        // }
                    ]
                }
            }
        };
    },
    head() {
        let fullUrl = 'https://timer.saman.conm.np' + this.$route.path;
        return {
            meta: [
                {
                    hid: 'og:title',
                    property: 'og:title',
                    content: 'Hamro Meditation Timer'
                },
                {
                    hid: 'og:url',
                    property: 'og:url',
                    content: fullUrl
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content:
                        'Hamro Meditation Timer - a simple and lightweight tool for meditation created by Saman with &hearts;'
                },
                {
                    hid: 'og:image',
                    property: 'og:image',
                    content: '/images/og-image.jpg'
                }
            ]
        };
    },
    methods: {
        toggleTimer() {
            if (!this.isRunning) {
                this.startTimer();
                this.playAudio();
            } else {
                this.stopTimer(true); //manually stopped timer by clicking = true
                this.stopAudio();
            }
        },
        timeParser(time) {
            const durationInSeconds = time * 60;
            let parsedTime = new Date(durationInSeconds * 1000).toISOString();
            durationInSeconds / 60 < 60
                ? (parsedTime = parsedTime.substr(14, 5))
                : (parsedTime = parsedTime.substr(11, 8));
            // this.$forceUpdate();
            return parsedTime;
        },
        getQuote() {
            return this.quotes[Math.floor(Math.random() * this.quotes.length)];
        },
        setBodyBgColor() {
            const bodyElem = document.body;
            bodyElem.removeAttribute('class');
            bodyElem.classList.add(
                this.colorTheme[
                    Math.floor(Math.random() * this.colorTheme.length)
                ]
            );
        },
        setBgQuoteChange() {
            this.setBodyBgColor();
            this.quote = this.getQuote();
            this.startBgQuoteChange();
        },
        startBgQuoteChange() {
            this.intervalFuncs.bgQuoteChange = setInterval(() => {
                this.setBodyBgColor();
                this.quote = this.getQuote();
            }, 7000);
        },
        stopBgQuoteChange() {
            clearInterval(this.intervalFuncs.bgQuoteChange);
            document.body.removeAttribute('class');
        },
        startTimer() {
            this.isRunning = true;
            this.stopBgQuoteChange();
            this.noSleep.enable();
            let tickerInSeconds = this.presetsList.totalDurationInMins * 60;
            this.tickerInMins = tickerInSeconds / 60;
            const tempTicker = tickerInSeconds;
            this.intervalFuncs.timer = setInterval(() => {
                // interval bell
                if (
                    this.presetsList.intervalBell &&
                    tickerInSeconds === tempTicker / 2
                ) {
                    this.stopBellSound();
                    this.playBellSound();
                }
                if (tickerInSeconds >= 0) {
                    tickerInSeconds--;
                    this.tickerInMins = tickerInSeconds / 60;
                } else {
                    this.stopTimer();
                }
            }, 1000);
        },
        stopTimer(manualStop = false) {
            this.isRunning = false;
            this.setBgQuoteChange();
            this.noSleep.disable();
            if (!manualStop) {
                //if the timer completes on its own without manual stop

                this.completeAction = true; //if user manually stops the timer by clicking, do not show the "Meditation commpleted" text
                setTimeout(() => {
                    this.completeAction = false;
                }, 5000);
                this.stopAudio();
                this.playBellSound(); //always play ending sound bell after timer completes
            }
            clearInterval(this.intervalFuncs.timer);
            this.tickerInMins = this.presetsList.totalDurationInMins;
        },

        //app timer presets actions
        selectTimeList(index) {
            this.presetsList.time.forEach((elm, index) => {
                if (elm.hasOwnProperty('statusActive')) delete elm.statusActive;
            });
            this.presetsList.time[index].statusActive = true;
            this.presetsList.totalDurationInMins =
                this.presetsList.time[index].time;
            this.$forceUpdate();
        },
        selectBellList(index) {
            this.presetsList.bellSound.list.forEach((elm, index) => {
                if (elm.hasOwnProperty('statusActive')) delete elm.statusActive;
            });
            this.presetsList.bellSound.list[index].statusActive = true;
            this.presetsList.bellSound.activePath =
                this.presetsList.bellSound.list[index].url;
            this.$forceUpdate();
        },
        toggleIntervalBell() {
            this.presetsList.intervalBell = !this.presetsList.intervalBell;
        },
        addExtraDuration(extraTime) {
            this.presetsList.totalDurationInMins += extraTime;
        },

        // audio related
        playAudio() {
            if (this.presetsList.guidedInstruction.statusActive) {
                this.stopGuidedAudio();
                this.playGuidedAudio();
            } else {
                this.stopBellSound();
                this.playBellSound();
            }
        },
        stopAudio() {
            if (this.presetsList.guidedInstruction.statusActive) {
                this.stopGuidedAudio();
            }
            this.stopBellSound();
        },
        playBellSound() {
            this.presetsList.bellSound.audio = new Audio(
                this.presetsList.bellSound.activePath
            );
            this.presetsList.bellSound.audio.play();
        },
        stopBellSound() {
            if (!!this.presetsList.bellSound.audio) {
                this.presetsList.bellSound.audio.pause();
                this.presetsList.bellSound.audio.currentTime = 0;
            }
        },
        playGuidedAudio() {
            this.presetsList.guidedInstruction.audio = new Audio(
                this.presetsList.guidedInstruction.activePath
            );
            this.presetsList.guidedInstruction.audio.play();
        },
        stopGuidedAudio() {
            if (!!this.presetsList.guidedInstruction.audio) {
                this.presetsList.guidedInstruction.audio.pause();
                this.presetsList.guidedInstruction.audio.currentTime = 0;
            }
        }
    },
    mounted() {
        this.setBgQuoteChange();
    },
    destroyed() {
        this.stopBgQuoteChange();
    },
    components: {
        SvgIcons,
        NoSleep
    }
};
</script>

<style lang="scss">
body {
    margin: 0;
    color: $base-text-color;
    font: #{$base-font-size}/#{$base-line-height} $base-font-family;
    min-width: $base-min-width;
    overflow-y: scroll;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: none;
}
img {
    border: 0;
    border-style: none;
    vertical-align: top;
}
a {
    text-decoration: none;
    color: $base-link-color;
    &:focus {
        outline: none;
        box-shadow: none;
    }
}
button::-moz-focus-inner,
input::-moz-focus-inner {
    border: 0;
    padding: 0;
}
* {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
}
button,
html input[type='button'],
input[type='reset'],
input[type='submit'] {
    -webkit-appearance: button;
    cursor: pointer;
    *overflow: visible;
}

input[type='submit']:hover,
button:hover {
    cursor: pointer;
}
*,
*:before,
*:after {
    box-sizing: border-box;
}
html,
body,
.w1,
#__layout,
#__nuxt {
    height: 100%;
}
body {
    transition: background-color 0.25s ease;
}
@-webkit-keyframes pulse {
    0% {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
    }

    50% {
        -webkit-transform: scale3d(1.05, 1.05, 1.05);
        transform: scale3d(1.05, 1.05, 1.05);
    }

    to {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
    }
}

@keyframes pulse {
    0% {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
    }

    50% {
        -webkit-transform: scale3d(1.05, 1.05, 1.05);
        transform: scale3d(1.05, 1.05, 1.05);
    }

    to {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
    }
}

.animate__pulse {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: pulse;
    animation-name: pulse;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
}

$themeColours: (
    'purple': #af049a,
    'red': #af1616,
    'blue': #0048b3,
    'pink': #c50052,
    'green': #00863c
);
@each $themeColour, $i in $themeColours {
    body {
        &.#{$themeColour} {
            #wrapper,
            .add-btn,
            .nav-content,
            .s-dd,
            .interval input:checked + label:after {
                background: $i;
            }
            .battery > span {
                border-color: $i;
            }
        }
    }
}
.second {
    animation: fadeInOut 1s infinite 0.2s;
}
.third {
    animation: fadeInOut 1s infinite 0.4s;
}
@-webkit-keyframes fadeInOut {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@keyframes fadeInOut {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
.icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    stroke-width: 0;
    stroke: currentColor;
    fill: currentColor;
}
.speaker {
    width: 0;
    height: 0;
    background: none;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-right: 20px solid #fff;
    position: relative;
    &:before {
        content: '';
        position: absolute;
        top: -5px;
        left: 0;
        width: 20px;
        height: 10px;
        background: #fff;
    }
}
#wrapper {
    transition: all 750ms ease;
}
.running {
    .controls,
    .settings,
    .quotes,
    .interval > label {
        display: none;
    }
    .bell-sound {
        li {
            display: none;
            &.active {
                display: block;
            }
            a {
                pointer-events: none;
                cursor: default;
            }
        }
    }
}
.custom-playing,
input[type='file'] {
    display: none;
}
.c-checkbox {
    display: block;
    position: relative;
    padding: 2px 0 0 35px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
        &:checked {
            ~ .checkmark {
                background: #fff;
                &:after {
                    display: block;
                    border-color: #000;
                }
            }
        }
    }
    .checkmark {
        &:after {
            left: 8px;
            top: 4px;
            width: 5px;
            height: 11px;
            border: solid #fff;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }
    }
    &.radio {
        .checkmark {
            border-radius: 50%;
        }
    }
}
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 24px;
    width: 24px;
    border-radius: 5px;
    border: 2px solid #fff;
    &:after {
        content: '';
        position: absolute;
        display: none;
    }
}
.timer {
    font-size: 25vh;
    &.complete {
        font-size: 10vh;
    }
}
.interval {
    label {
        &:after {
            content: '';
            position: absolute;
            top: 2px;
            left: 2px;
            width: 16px;
            height: 16px;
            background: #fff;
            border-radius: 90px;
            transition: 0.1s;
        }
    }
    input:checked {
        + label {
            background: #fff;
            border-color: transparent;
            &:after {
                left: calc(100% - 2px);
                transform: translateX(-100%);
                background: #fff;
            }
        }
    }

    label:active:after {
        width: 30px;
    }
}
.btn-action {
    font-size: 18vh;
    transition: all 0.25s ease;
    &:focus,
    &:active {
        border: none;
        outline: none;
    }
    &:hover {
        transform: scale(1.07);
    }
}

.bell-sound {
    li {
        &.active {
            a {
                background: #fff;
                color: #000;
            }
        }
    }
}
.presets {
    font-size: 4vh;
    li {
        &.active {
            a {
                background: #fff;
                color: #000;
                transform: scale(1.1);
            }
            .add-btn {
                display: block;
            }
        }
    }
}
#nav-container {
    &.active {
        .i-bar:nth-of-type(1) {
            transform: translate3d(0, 8px, 0) rotate(45deg);
        }
        .i-bar:nth-of-type(2) {
            opacity: 0;
        }
        .i-bar:nth-of-type(3) {
            transform: translate3d(0, -8px, 0) rotate(-45deg);
        }
        .nav-content {
            opacity: 1;
            z-index: 999;
            outline: none;
            pointer-events: auto;
        }
    }
}
.menu-button {
    touch-action: manipulation;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    &:focus {
        outline: none;
    }
}
.i-bar {
    transition: 0.3s;
}
.i-bar + .i-bar {
    margin-top: 5px;
}
.btn-custom {
    border: 2px solid #fff;
    border-radius: 30px;
    font-size: 14px;
    line-height: 1;
    color: #fff;
    background: none;
    outline: none;
    display: block;
    padding: 12px 17px;
    cursor: pointer;
    text-align: center;
    margin-bottom: -7px;
    &:hover {
        background: #fff;
        color: #000;
    }
}
.nav-content {
    height: calc(100% - 70px);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    transition: opacity 0.25s ease;
}
.nav {
    li {
        a {
            transition: all 0.25s ease;
        }
    }
}
@media only screen and (max-width: 767px) {
    .bell-sound {
        li {
            &.active {
                a {
                    border-radius: 50px;
                    pointer-events: none;
                    cursor: default;
                }
            }
        }
    }
    .timer {
        font-size: 21vw;
        &.complete {
            font-size: 9vw;
            line-height: 12vw;
        }
    }
    .btn-action {
        font-size: 24vw;
    }
    .presets {
        font-size: 5.5vw;
    }
    .interval {
        label {
            &:after {
                width: 12px;
                height: 12px;
                left: 2px;
            }
        }
    }
}
</style>
