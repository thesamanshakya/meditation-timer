<template>
    <div class="app">
        <SvgIcons />
        <div class="sound-wrapper">
            <strong class="title">Start/End Bell</strong>
            <ul class="bell-sound">
                <li
                    v-for="(bell, index) in $store.state.presetsList.bellSound"
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
                        {{ preset.time >= 60 ? preset.time / 60 : preset.time }}
                        <span>{{ preset.time >= 60 ? 'hour' : 'mins' }}</span>
                    </a>
                    <i
                        class="add-btn"
                        @click="
                            $store.commit('ADD_EXTRA_DURATION', preset.addTime)
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
            {{ timeParser($store.state.presetsList.totalDurationInMins) }}
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
</template>

<script>
import SvgIcons from '~/assets/fonts/symbol-defs.svg?inline';
import NoSleep from 'nosleep.js';

export default {
    data() {
        return {
            noSleep: new NoSleep(),
            isRunning: false
        };
    },
    created() {},
    methods: {
        toggleTimer() {
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
        timeParser(totalDurationInMins) {
            const durationInSeconds = totalDurationInMins * 60;
            let parsedTime = new Date(durationInSeconds * 1000).toISOString();
            durationInSeconds / 60 < 60
                ? (parsedTime = parsedTime.substr(14, 5))
                : (parsedTime = parsedTime.substr(11, 8));
            this.$forceUpdate();
            return parsedTime;
        }
        // setDisplayArea(hours, minutes, seconds) {
        //     if (hours > 0) {
        //         this.$refs.timerElem.innerText =
        //             hours + ':' + minutes + ':' + seconds;
        //     } else {
        //         displayArea.innerText = minutes + ':' + seconds;
        //     }
        // }
    },
    components: {
        SvgIcons,
        NoSleep
    },
    mounted() {
        // this.timeParser(12000);
        // console.log(this.$store.state.presets.bell);
        // this.noSleep.enable();
        // console.log(this.$store.state.presets);
    }
};
</script>

<style lang="scss" scoped>
</style>