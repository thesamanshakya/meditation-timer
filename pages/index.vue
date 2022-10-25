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
        <div class="w1" :class="{ running: isRunning }">
            <div class="app">
                <SvgIcons />
                <div class="sound-wrapper">
                    <strong class="title">Start/End Bell</strong>
                    <ul class="bell-sound">
                        <li
                            v-for="(bell, index) in presetsList.bellSound.list"
                            :key="index"
                            :class="{
                                active: presetsList.bellSound.list[index]
                                    .statusActive
                            }"
                        >
                            <a @click="selectBellList(index)">{{
                                bell.name
                            }}</a>
                        </li>
                    </ul>
                </div>
                <div class="controls">
                    <ul class="presets">
                        <li
                            v-for="(preset, index) in presetsList.time"
                            :key="index"
                            :class="{
                                active: presetsList.time[index].statusActive
                            }"
                        >
                            <a @click="selectTimeList(index)">
                                {{
                                    preset.time >= 60
                                        ? preset.time / 60
                                        : preset.time
                                }}
                                <span>{{
                                    preset.time >= 60 ? 'hour' : 'mins'
                                }}</span>
                            </a>
                            <i
                                class="add-btn"
                                @click="addExtraDuration(preset.addTime)"
                                >Add +{{ preset.addTime }} mins</i
                            >
                        </li>
                    </ul>
                </div>
                <div class="interval">
                    <input
                        type="checkbox"
                        id="switch"
                        @change="toggleIntervalBell"
                    />
                    <label for="switch"></label>
                    <span class="interval-text">
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
                    >MEDITATION COMPLETED!</span
                >
                <span class="timer" v-else>
                    {{
                        isRunning
                            ? timeParser(tickerInMins)
                            : timeParser(presetsList.totalDurationInMins)
                    }}
                </span>

                <div class="custom-playing" id="c-playing">
                    <div class="cplay-holder">
                        <div class="spk">
                            <div class="icon speaker">
                                <div class="box"></div>
                            </div>
                            <div class="wifi-symbol">
                                <div class="wifi-circle second"></div>
                                <div class="wifi-circle third"></div>
                            </div>
                        </div>
                        <i id="custom-audio-text"
                            >Goenka Satipattana Sutta Chanting Day 5.mp3</i
                        >
                    </div>
                </div>

                <button
                    class="btn-action"
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
            <span class="quotes">
                "{{ quote.quote }}" - <span>{{ quote.author }}</span>
            </span>
            <span class="top-right">
                <Battery />
                <Settings :presetsList="presetsList" />
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
                        }
                        // {
                        //     language: 'nepali',
                        //     url: '/media/instructions/anapana/nepali.mp3'
                        // },
                        // {
                        //     language: 'custom',
                        //     url: '/media/instructions/anapana/custom.mp3'
                        // }
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
            if (this.presetsList.guidedInstruction.statusActive)
                this.stopGuidedAudio();
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
    components: {
        SvgIcons,
        NoSleep
    },
    mounted() {
        this.setBgQuoteChange();
    },
    destroyed() {
        this.stopBgQuoteChange();
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
.box {
    left: 32px;
    top: -25px;
}
.cplay-holder {
    @extend %inline-block;
    position: relative;
    padding-left: 35px;
    > i {
        text-align: left;
        display: inline-block;
        vertical-align: middle;
        margin-left: 30px;
        font-size: 18px;
        line-height: 28px;
        font-style: normal;
    }
}
.custom-playing {
    padding: 0 35px 35px;
    text-align: center;
}
.wifi-symbol {
    width: 50px;
    height: 50px;
    overflow: hidden;
    transform: rotate(135deg);
    position: absolute;
    left: 100%;
    top: -10px;
}
.wifi-circle {
    border: 5px solid #fff;
    border-radius: 50%;
    position: absolute;
}

.second {
    width: 25px;
    height: 25px;
    top: 35px;
    left: 35px;
    animation: fadeInOut 1s infinite 0.2s;
}

.third {
    width: 40px;
    height: 40px;
    top: 25px;
    left: 25px;
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
.spk {
    position: absolute;
    left: 0;
    top: 0;
    padding-right: 13px;
}
.icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    stroke-width: 0;
    stroke: currentColor;
    fill: currentColor;
}
// .icon {
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     margin: auto;
// }
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
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    transition: all 750ms ease;
    background: #000;
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
.app {
    text-align: center;
    flex: 1;
}
.w1 {
    @extend %flexcenter;
    justify-content: center;
    padding-bottom: 10px;
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
    display: block;
    font-size: 25vh;
    line-height: 1;
    margin: 0 0 30px;
    &.complete {
        font-size: 10vh;
    }
}
.interval {
    @extend %flexcenter;
    justify-content: center;
    margin: 15px 0 25px;
    input[type='checkbox'] {
        height: 0;
        width: 0;
        visibility: hidden;
    }

    label {
        cursor: pointer;
        text-indent: -9999px;
        width: 55px;
        height: 27px;
        background: none;
        display: block;
        border-radius: 100px;
        position: relative;
        border: 2px solid #fff;
        &:after {
            content: '';
            position: absolute;
            top: 2px;
            left: 2px;
            width: 21px;
            height: 21px;
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
.interval-text {
    font-size: 18px;
    margin-left: 20px;
}
.btn-action {
    background: none;
    border: none;
    color: #fff;
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
.sound-wrapper {
    position: absolute;
    right: 32px;
    top: 50%;
    margin: -120px 0 0;
    z-index: 1;
    font-size: 18px;
    line-height: 23px;
    .title {
        display: block;
        margin: 0 0 12px;
        font-weight: normal;
    }
}
.bell-sound {
    @extend %listreset;
    border: 2px solid #fff;
    border-radius: 7px;
    li {
        &.active {
            a {
                background: #fff;
                color: #000;
            }
        }
        a {
            cursor: pointer;
            display: block;
            padding: 10px 20px;
        }
    }
}
.presets {
    @extend %listreset;
    @extend %flexonly;
    justify-content: center;
    flex-wrap: wrap;
    font-size: 4vh;
    line-height: 1;
    padding-bottom: 30px;
    li {
        margin: 0 15px;
        position: relative;
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
    a {
        cursor: pointer;
        display: block;
        border: 3px solid #fff;
        border-radius: 50%;
        text-align: center;
        padding: 28px 32px 32px;
        transition: all 0.25s ease;
        &:hover {
            background: rgba(255, 255, 255, 0.25);
        }
    }
    span {
        display: block;
        padding-top: 10%;
    }
}
.top-right {
    position: absolute;
    right: 25px;
    top: 23px;
    @extend %flexcenter;
}

.help {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    border: 1px solid #fff;
    text-align: center;
    font-size: 12px;
    margin: 0 0 0 9px;
}
.quotes {
    font-size: 18px;
    line-height: 30px;
    text-align: center;
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 15px;
    max-width: 900px;
    margin: 0 auto;
    pointer-events: none;
    cursor: default;
}
#nav-container {
    position: fixed;
    height: 100vh;
    width: 100%;
    pointer-events: none;
    z-index: 5;
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
    position: relative;
    @extend %flexcenter;
    flex-direction: column;
    z-index: 1;
    -webkit-appearance: none;
    border: 0;
    background: transparent;
    border-radius: 0;
    width: 30px;
    cursor: pointer;
    pointer-events: auto;
    margin: 25px 0 0 25px;
    touch-action: manipulation;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    &:focus {
        outline: none;
    }
}
.by {
    font-size: 15px;
    line-height: 25px;
    display: block;
    > i {
        font-style: normal;
        display: block;
    }
    a {
        text-decoration: underline;
    }
}
.i-bar {
    display: block;
    width: 100%;
    height: 3px;
    background: #fff;
    transition: 0.3s;
}
.i-bar + .i-bar {
    margin-top: 5px;
}
#current-audio {
    white-space: nowrap;
    overflow: hidden;
    max-width: 130px;
    display: block;
    text-overflow: ellipsis;
    font-size: 13px;
    padding: 7px 0 0;
}
.c-audio {
    padding: 14px 2px 0 35px;
    position: relative;
    &:before {
        width: 23px;
        height: 25px;
        border-top: 1px solid #fff;
        border-right: 1px solid #fff;
        border-radius: 0 5px 0 0;
        content: '';
        position: absolute;
        right: 14px;
        top: -9px;
    }
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
    margin-top: 70px;
    padding: 10px 25px;
    width: 90%;
    max-width: 250px;
    position: absolute;
    top: 0;
    left: 0;
    height: calc(100% - 70px);
    background: #000;
    pointer-events: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    transition: opacity 0.25s ease;
    z-index: -1;
    opacity: 0;
}
.nav {
    @extend %listreset;
    li {
        margin-bottom: 15px;
        a {
            font-size: 20px;
            padding: 0 0 10px;
            display: block;
            transition: color 0.1s;
            transition: all 0.25s ease;
            &:hover {
                color: #fff;
                padding-left: 5px;
            }
        }
    }
}
.add-btn {
    border: 2px solid #fff;
    padding: 10px;
    border-radius: 50px;
    font-size: 16px;
    white-space: nowrap;
    display: block;
    font-style: normal;
    position: absolute;
    z-index: 1;
    left: 0;
    bottom: -20px;
    right: 0;
    background: #000;
    cursor: pointer;
    display: none;
    user-select: none; /* supported by Chrome and Opera */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none;
    &:hover {
        color: #f2f2f2;
    }
}
.install {
    display: none;
    position: fixed;
    right: 20px;
    top: 20px;
    background: #3740ff;
    padding: 20px 165px 20px 25px;
    color: #fff;
    z-index: 9999;
    width: 430px;
    font-size: 17px;
    border-radius: 5px;
}
.btn-install {
    padding: 13px 20px;
    font-size: 16px;
    line-height: 1;
    position: absolute;
    right: 22px;
    top: 21px;
    border-radius: 5px;
    color: #000;
    font-weight: 700;
    border: 2px solid #fff;
    // background: #fff;
    // color: #3740ff;
    color: #fff;
    &:hover {
        // background: darken(#3740ff, 5%);
        background: none;
        color: #fff;
        border-color: #fff;
    }
}
@media only screen and (max-width: 767px) {
    .spk {
        transform: scale(0.7);
        top: 1px;
    }
    .cplay-holder {
        > i {
            margin-left: 20px;
        }
    }
    .install {
        width: auto;
        top: 0;
        right: 0;
        left: 0;
        border-radius: 0;
        font-size: 14px;
        line-height: 23px;
        padding: 20px 140px 20px 20px;
    }
    .btn-install {
        padding: 15px 20px;
        right: 19px;
        top: 19px;
        font-size: 14px;
        font-weight: normal;
    }
}
@media (orientation: portrait) {
    .sound-wrapper {
        font-size: 15px;
        line-height: 23px;
        position: relative;
        margin: 0 0 30px;
        position: static;
        .title {
            display: none;
        }
    }
    .bell-sound {
        display: flex;
        white-space: nowrap;
        justify-content: center;
        border: none;
        li {
            &.active {
                a {
                    border-radius: 50px;
                    pointer-events: none;
                    cursor: default;
                }
            }
            a {
                padding: 4px 14px;
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
    .nav-content {
        text-align: center;
    }
    .add-btn {
        left: -7px;
        right: -7px;
        padding: 9px 5px;
        font-size: 13px;
    }
    .btn-action {
        font-size: 24vw;
    }
    .nav-content {
        max-width: none;
        width: 100%;
    }
    .presets {
        font-size: 5.5vw;
        > li {
            margin: 0 10px;
        }
        a {
            padding: 20px 22px 22px;
        }
    }
    .quotes {
        font-size: 15px;
        line-height: 24px;
        > span {
            display: block;
        }
    }
    .interval-text {
        font-size: 15px;
        margin-left: 15px;
    }
    .interval {
        margin-top: 10px;
        label {
            width: 42px;
            height: 22px;
            &:after {
                width: 14px;
                height: 14px;
                left: 2px;
            }
        }
    }
}
</style>
