<template>
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
                        <a @click="selectBellList(index)">{{ bell.name }}</a>
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

            <span class="timer animate__pulse complete" v-if="completeAction"
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
</template>

<script>
import { quotes } from '~/assets/data/quotes.js';
import SvgIcons from '~/assets/fonts/symbol-defs.svg?inline';
import NoSleep from 'nosleep.js';

export default {
    data() {
        return {
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
                            url: '/media/instructions/anapana/custom.mp3'
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
                    bellSoundAudio: null,
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
                        },
                        {
                            name: 'S.N Goenka',
                            url: '/media/bell/sn-goenka.mp3'
                        }
                    ]
                }
            }
        };
    },
    created() {},
    methods: {
        toggleTimer() {
            if (!this.isRunning) {
                this.startTimer();
                this.playBellSound();
            } else {
                this.stopTimer(true); //manually stopped timer by clicking = true
                this.stopBellSound();
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
            }, 100);
        },
        stopTimer(manualStop = false) {
            this.isRunning = false;
            this.setBgQuoteChange();
            this.noSleep.disable();
            if (!manualStop) {
                //if user manually stops the timer by clicking, do not show the "Meditation commpleted" text
                this.completeAction = true;
                setTimeout(() => {
                    this.completeAction = false;
                }, 5000);
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
        // playSound(sound) {
        //     if (sound) {
        //         var audio = new Audio(sound);
        //         audio.play();
        //     }
        // },
        playBellSound() {
            this.presetsList.bellSound.bellSoundAudio = new Audio(
                this.presetsList.bellSound.activePath
            );
            this.presetsList.bellSound.bellSoundAudio.play();
        },
        stopBellSound() {
            this.presetsList.bellSound.bellSoundAudio.pause();
            this.presetsList.bellSound.bellSoundAudio.currentTime = 0;
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

<style lang="scss" scoped>
</style>