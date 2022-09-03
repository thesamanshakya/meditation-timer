<template>
    <div class="app">
        <div class="sound-wrapper">
            <strong class="title">Start/End Bell</strong>
            <ul class="bell-sound">
                <li>
                    <a href="javascript:void(0)">Gong 1</a>
                </li>
                <li>
                    <a href="javascript:void(0)">Gong 2</a>
                </li>
                <li>
                    <a href="javascript:void(0)">Gong 3</a>
                </li>
                <li>
                    <a href="javascript:void(0)">S.N Goenka</a>
                </li>
            </ul>
        </div>
        <div class="controls">
            <ul class="presets">
                <li>
                    <a href="javascript:void(0)" data-time="10"
                        >10<span>mins</span></a
                    >
                    <i class="add-btn" data-extra="5">Add +5 mins</i>
                </li>
                <li>
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
                </li>
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
        <span class="timer" id="timer">&nbsp;&nbsp;&nbsp;</span>
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

        <button class="btn-action" type="button" id="btn-action">
            <i class="icon-play-button"></i>
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    created() {
        document.getElementsByTagName('body')[0].classList.add('blue');
    }
};
</script>

<style lang="scss" scoped>
</style>