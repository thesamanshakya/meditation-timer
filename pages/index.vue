<template>
    <div class="app">
        <SvgIcons />
        <div class="sound-wrapper">
            <strong class="title">Start/End Bell</strong>
            <ul class="bell-sound">
                <li v-for="(bell, index) in presetsList.bellSound" :key="index">
                    <a>{{ bell.name }}</a>
                </li>
            </ul>
        </div>
        <div class="controls">
            <ul class="presets">
                <li
                    v-for="(preset, index) in presetsList.time"
                    :key="index"
                    :class="{ active: presetsList.time[index].statusActive }"
                >
                    <a @click="updateP(index)">
                        {{ preset.time >= 60 ? preset.time / 60 : preset.time }}
                        <span>{{ preset.time >= 60 ? 'hour' : 'mins' }}</span>
                    </a>
                    <i class="add-btn">Add +{{ preset.addTime }} mins</i>
                </li>
                <!-- <li>
                    <a href="javascript:void(0)" data-time="30"
                        >30<span>mins</span></a
                    >
                    <i class="add-btn" data-extra="15">Add +15 mins</i>
                </li>
                <li>
                    <a href="javascript:void(0)" data-time="60"
                        >1<span>hour</span></a
                    >
                    <i class="add-btn" data-extra="30">Add +30 mins</i>
                </li> -->
            </ul>
        </div>
        <div class="interval">
            <input type="checkbox" id="switch" /><label
                for="switch"
                id="interval-label"
            ></label>
            <span class="interval-text"
                >Interval Bell <span id="int-bell">is currently OFF</span></span
            >
        </div>
        <span class="timer">{{ timeParser(totalDurationInMins) }}</span>
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

        <button class="btn-action" type="button" @click="startTimer">
            <svg class="icon icon-play-button">
                <use xlink:href="#icon-play-button"></use>
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
            totalDurationInMins: this.$store.state.presets.durationInMins,
            presetsList: this.$store.state.presetsList
        };
    },
    created() {},
    methods: {
        startTimer() {
            // this.$store.commit('updatePresets');
            // console.log(this.$store.state.presets.bell);
        },
        updateP(index) {
            this.$store.commit('updatePresets', index);
        },
        timeParser(durationInMins) {
            const durationInSeconds = durationInMins * 60;
            let parsedTime = new Date(durationInSeconds * 1000).toISOString();
            durationInSeconds / 60 < 60
                ? (parsedTime = parsedTime.substr(14, 5))
                : (parsedTime = parsedTime.substr(11, 8));
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
    computed: {
        formatTimer() {
            // let durationInMins = this.$store.state.presets.duration;
            // let durationInSeconds = durationInMins * 60;
            // console.log(durationInSeconds);
            // return this.timeParser(durationInSeconds);
            // console.log(this.timeParser(durationInMins * 60));
            // let h = parseInt(durationInMins / 60 / 60);
            // let m = parseInt(durationInMins / 60);
            // let s = parseInt(durationInMins % 60);
            // h = this.clock.hours > 0 ? this.clock.hours + ':' : '';
            // m =
            //     this.clock.minutes >= 60
            //         ? parseInt(this.clock.minutes % 60)
            //         : this.clock.minutes;
            // m = m < 10 ? '0' + m : m;
            // s =
            //     this.clock.seconds < 10
            //         ? '0' + this.clock.seconds
            //         : this.clock.seconds;
            // return h + m + ':' + s;
        }
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