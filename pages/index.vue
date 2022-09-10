<template>
    <div class="w1" :class="{ running: isRunning }">
        <div class="app">
            <SvgIcons />
            <div class="sound-wrapper">
                <strong class="title">Start/End Bell</strong>
                <ul class="bell-sound">
                    <li
                        v-for="(bell, index) in $store.state.presetsList
                            .bellSound"
                        :key="index"
                        :class="{
                            active: $store.state.presetsList.bellSound[index]
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
                        v-for="(preset, index) in $store.state.presetsList.time"
                        :key="index"
                        :class="{
                            active: $store.state.presetsList.time[index]
                                .statusActive
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
                            @click="
                                $store.commit(
                                    'ADD_EXTRA_DURATION',
                                    preset.addTime
                                )
                            "
                            >Add +{{ preset.addTime }} mins</i
                        >
                    </li>
                </ul>
            </div>
            <div class="interval">
                <input
                    type="checkbox"
                    id="switch"
                    @change="$store.commit('TOGGLE_INTERVAL_BELL')"
                />
                <label for="switch"></label>
                <span class="interval-text">
                    Interval Bell
                    <span>is currently OFF</span>
                </span>
            </div>
            <span class="timer">
                {{ timeParser(totalDurationInMins) }}
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

            <button class="btn-action" type="button" @click="toggleTimer">
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
            <Settings />
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
            isRunning: false,
            totalDurationInMins:
                this.$store.state.presetsList.totalDurationInMins,
            bgQuoteChangeInterval: null,
            timerInterval: null
        };
    },
    created() {},
    methods: {
        toggleTimer() {
            if (!this.isRunning) {
                //start timer
                this.stopBgQuoteChange();
                this.noSleep.enable();
            } else {
                //stop timer
                this.setBgQuoteChange();
                this.noSleep.disable();
            }
            this.isRunning = !this.isRunning;
        },
        selectTimeList(index) {
            this.$store.commit('SELECT_TIME_LIST', index);
            this.$forceUpdate();
            this.$store.commit(
                'SELECT_TOTAL_DURATION',
                this.$store.state.presetsList.time[index].time
            );
        },
        selectBellList(index) {
            this.$store.commit('SELECT_BELL_LIST', index);
            this.$forceUpdate();
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
            this.bgQuoteChangeInterval = setInterval(() => {
                this.setBodyBgColor();
                this.quote = this.getQuote();
            }, 7000);
        },
        stopBgQuoteChange() {
            clearInterval(this.bgQuoteChangeInterval);
            document.body.removeAttribute('class');
        },
        startTimer() {
            timerInterval = setTimeout(() => {}, 1000);
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