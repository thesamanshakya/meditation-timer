<template>
    <div
        id="wrapper"
        class="overflow-hidden relative w-full h-full bg-black transition-all duration-1000"
    >
        <div
            v-if="!isRunning"
            id="nav-container"
            class="fixed z-[9999] menu-button flex items-center flex-col appearance-none border-0 bg-transparent rounded-none w-[30px] cursor-pointer pointer-events-auto mt-5 ml-6"
            :class="{ active: navActive }"
            @click="navActive = !navActive"
        >
            <span
                v-for="index in 3"
                :key="index"
                class="i-bar block w-full h-[3px] bg-white transition-all mt-[5px]"
            ></span>
        </div>
        <Transition name="fade">
            <div
                v-if="navActive"
                class="fixed h-screen z-10 nav-content mt-16 top-0 left-0 px-6 py-3 bg-black w-full text-center md:text-left md:w-[90%] md:max-w-[250px]"
            >
                <ul class="nav m-0 p-0 list-none">
                    <li
                        class="mb-4"
                        v-for="(list, index) in menuList"
                        :key="index"
                    >
                        <a
                            :href="list.url"
                            target="_blank"
                            rel="nofollow noopener"
                            class="text-xl block pb-3 hover:text-white hover:pl-1 transition-all"
                            >{{ list.linkText }}</a
                        >
                    </li>
                </ul>
                <span class="text-base block"
                    >App created by<i class="block font-normal not-italic"
                        ><a class="underline" href="https://saman.com.np"
                            >Saman Shakya</a
                        >
                        with &hearts;</i
                    ><i class="not-italic"
                        >May all beings be happy! &#128522;</i
                    ></span
                >
            </div>
        </Transition>
        <div
            class="w1 flex items-center justify-center pb-2"
            :class="{ running: isRunning }"
        >
            <div class="text-center flex-1">
                <SvgIcons />
                <div
                    class="text-base top-1/2 right-8 mb-6 z-10 md:-mt-32 md:absolute md:text-lg md:min-[130px]"
                >
                    <strong class="font-medium mb-5 hidden md:block"
                        >Start/End Bell</strong
                    >
                    <ul
                        class="bell-sound flex whitespace-no-wrap justify-center m-0 p-0 rounded-md md:block overflow-hidden"
                    >
                        <li
                            v-for="(bell, index) in presetsList.bellSound.list"
                            :key="index"
                            class="mb-2"
                            :class="{
                                active: presetsList.bellSound.list[index]
                                    .statusActive
                            }"
                        >
                            <a
                                @click="selectBellList(index)"
                                class="py-2 px-4 cursor-pointer block md:px-3 md:py-2 hover:bg-grayRGBA rounded-full"
                                >{{ bell.name }}</a
                            >
                        </li>
                    </ul>
                </div>
                <div class="controls" v-if="!isRunning">
                    <ul
                        class="presets m-0 p-0 list-none flex justify-center leading-none pb-7 text-[5.5vw] md:text-[4vh]"
                    >
                        <li
                            v-for="(preset, index) in presetsList.time"
                            :key="index"
                            class="mb-3 relative mx-2.5 md:mb-4 md:mx-4"
                            :class="{
                                active: presetsList.time[index].statusActive
                            }"
                        >
                            <a
                                @click="selectTimeList(index)"
                                class="px-6 py-6 pt-5 cursor-pointer block text-center border-[3px] border-white rounded-full md:p-9 md:pt-8 hover:bg-grayRGBA transition-all"
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
                                class="add-btn text-sm -left-2 -right-2 -bottom-5 p-2 border-2 border-white rounded-full bg-black whitespace-no-wrap hidden not-italic absolute cursor-pointer select-none md:text-base md:px-2.5 md:left-0 md:right-0 md:-bottom-5 hover:bg-grayRGBA"
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
                        id="interval-switch"
                        :checked="presetsList.intervalBell"
                        @change="toggleIntervalBell"
                        class="h-0 w-0 invisible"
                    />
                    <label
                        for="interval-switch"
                        class="cursor-pointer block relative bg-transparent -indent-[9999px] rounded-[100px] border-2 border-white w-12 h-6 after:absolute after:w-4 after:h-4 after:left-[2px] after:content-[''] after:top-[2px] after:bg-white after:rounded-[90px] after:transition-all"
                        v-if="!isRunning"
                    ></label>
                    <span
                        class="interval-text text-base ml-4 md:text-lg md:ml-5"
                    >
                        Interval Bell
                        {{
                            presetsList.intervalBell
                                ? 'at ' +
                                  Math.floor(
                                      presetsList.totalDurationInMins / 2
                                  ) +
                                  ' mins'
                                : 'is currently OFF'
                        }}
                    </span>
                </div>
                <span
                    class="timer complete font-medium text-[9vw] leading-[12vw] md:text-[10vh] animate-pulse"
                    v-if="completeAction"
                    >COMPLETED!</span
                >
                <span
                    class="timer block leading-none mb-5 text-[21vw] md:text-[25vh]"
                    v-else
                >
                    {{
                        isRunning
                            ? timeParser(tickerInMins)
                            : timeParser(presetsList.totalDurationInMins)
                    }}
                </span>

                <div
                    class="custom-playing text-center p-9 pt-0"
                    v-if="
                        (presetsList.guidedInstruction.statusActive ||
                            presetsList.backgroundSound.statusActive) &&
                        !completeAction
                    "
                >
                    <div class="inline-block align-top relative pl-8">
                        <div
                            class="absolute left-0 -top-[3px] pr-3 scale-50 md:scale-75"
                        >
                            <div
                                class="icon speaker w-0 h-0 bg-transparent border-y-[15px] border-r-[20px] border-r-white border-y-transparent relative before:content-[''] before:absolute before:-top-[5px] before:left-0 before:w-5 before:h-[10px] before:bg-white"
                            ></div>
                            <div
                                class="w-[50px] h-[50px] overflow-hidden rotate-[135deg] absolute left-full -top-[10px]"
                                :class="{ 'animate-pulse': isRunning }"
                            >
                                <div
                                    class="border-[5px] border-white rounded-[50%] w-[25px] h-[25px] top-[35px] left-[35px] absolute"
                                ></div>
                                <div
                                    class="border-[5px] border-white rounded-[50%] w-[40px] h-[40px] top-[25px] left-[25px] absolute"
                                ></div>
                            </div>
                        </div>
                        <i
                            id="custom-audio-text"
                            class="text-left capitalize inline-block align-middle text-base not-italic ml-3 max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap md:ml-5 md:max-w-none"
                            >{{ getAudioTitle }}</i
                        >
                    </div>
                </div>

                <button
                    class="btn-action bg-transparent text-[24vw] md:text-[18vh] text-white border-0 transition-all focus:outline-none focus:border-none hover:scale-105 outline-none"
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
                class="text-base text-center absolute pointer-events-none cursor-default inset-3 top-auto mx-auto md:text-lg"
                v-if="!isRunning"
            >
                "{{ quote.quote }}"
                <span class="block md:inline">- {{ quote.author }}</span>
            </span>
            <span
                class="absolute flex items-center right-6 top-6"
                v-if="!navActive"
            >
                <Battery />
                <Settings :presetsList="presetsList" v-show="!isRunning" />
                <!-- <UserDropdown
                    class="ml-6"
                    v-if="!isRunning && !$nuxt.isOffline"
                /> -->
            </span>
        </div>
        <!-- <span
            class="install hidden fixed bg-indigo-600 rounded-none text-sm leading-6 p-5 pr-[165px] text-white md:text-base md:rounded top-0 right-0 left-0 r-0 z-[9999px] md:w-[430px] md:pr-[140px] md:pl-6"
            >Get this free app. It won't take up space on your device.
            <a
                href="javscript:void(0)"
                class="btn-install text-sm font-normal px-4 py-5 leading-none absolute right-6 top-5 border-2 border-white rounded text-white md:font-bold md:top-5 md:right-5 md:px-3 md:text-base hover:bg-transparent hover:text-white"
                id="install-add"
                >Install App</a
            ></span
        > -->
    </div>
</template>

<script>
import { quotes } from '~/assets/data/quotes.js';
import SvgIcons from '~/assets/fonts/symbol-defs.svg?inline';
import NoSleep from 'nosleep.js';

export default {
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
            menuList: [
                {
                    linkText: 'Contact Developer',
                    url: 'http://m.me/100666278588914'
                },
                {
                    linkText: 'Report a bug',
                    url: 'http://m.me/100666278588914'
                },
                {
                    linkText: 'Join meditation!',
                    url: 'http://m.me/anapansati'
                },
                {
                    linkText: 'Buy me a Coffee!',
                    url: 'https://buymeacoffee.com/samanshakya'
                }
            ],
            presetsList: {
                totalDurationInMins: 10,
                intervalBell: false,
                guidedInstruction: {
                    statusActive: false,
                    activePath: '/media/instructions/anapana/english.mp3',
                    audio: null,
                    languageTitle: null,
                    languageActive: 0,
                    customAudioFileName: null,
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
                backgroundSound: {
                    statusActive: false,
                    activePath: '/media/sounds/nature/forest-with-birds.mp3',
                    audio: null,
                    soundTitle: null,
                    soundActive: 0,
                    sound: [
                        {
                            soundTitle: 'Forest with Birds',
                            url: '/media/sounds/nature/forest-with-birds.mp3',
                            statusActive: true
                        },
                        {
                            soundTitle: 'Water in Stream',
                            url: '/media/sounds/nature/water-in-stream.mp3'
                        },
                        {
                            soundTitle: 'River with Birds',
                            url: '/media/sounds/nature/birds-with-river.mp3'
                        },
                        {
                            soundTitle: 'Birds',
                            url: '/media/sounds/nature/birds.mp3'
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
                        },
                        {
                            name: 'Gong 4',
                            url: '/media/bell/gong-4.mp3'
                        }
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
            localStorage.setItem(
                'presetsList',
                JSON.stringify(this.presetsList)
            );
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
            let time = this.presetsList.time;
            time.forEach((elm, index) => {
                if (elm.hasOwnProperty('statusActive')) delete elm.statusActive;
            });
            time[index].statusActive = true;
            this.presetsList.totalDurationInMins = time[index].time;
            this.$forceUpdate();
        },
        selectBellList(index) {
            let bellSound = this.presetsList.bellSound;
            bellSound.list.forEach((elm, index) => {
                if (elm.hasOwnProperty('statusActive')) delete elm.statusActive;
            });
            bellSound.list[index].statusActive = true;
            bellSound.activePath = bellSound.list[index].url;
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
            } else if (this.presetsList.backgroundSound.statusActive) {
                this.stopBackgroundSound();
                this.playBackgroundSound();
            } else {
                this.stopBellSound();
                this.playBellSound();
            }
        },
        stopAudio() {
            if (this.presetsList.guidedInstruction.statusActive) {
                this.stopGuidedAudio();
            } else if (this.presetsList.backgroundSound.statusActive) {
                this.stopBackgroundSound();
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
                this.presetsList.bellSound.audio = null;
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
                this.presetsList.guidedInstruction.audio = null;
            }
        },
        playBackgroundSound() {
            this.presetsList.backgroundSound.audio = new Audio(
                this.presetsList.backgroundSound.activePath
            );
            this.presetsList.backgroundSound.audio.loop = true;
            this.presetsList.backgroundSound.audio.play();
        },
        stopBackgroundSound() {
            if (!!this.presetsList.backgroundSound.audio) {
                this.presetsList.backgroundSound.audio.pause();
                this.presetsList.backgroundSound.audio.currentTime = 0;
                this.presetsList.backgroundSound.audio = null;
            }
        }
    },
    created() {
        let localData = localStorage.getItem('presetsList');
        if (localData !== null) {
            this.presetsList = JSON.parse(localData);
        }
    },
    computed: {
        getAudioTitle() {
            let title = null;
            let guidedInstruction = this.presetsList.guidedInstruction;
            let backgroundSound = this.presetsList.backgroundSound;
            if (guidedInstruction.statusActive) {
                title = !!guidedInstruction.languageTitle
                    ? guidedInstruction.languageTitle
                    : guidedInstruction.language[0].language;
                title += ' Guided Meditation';
            } else if (backgroundSound.statusActive) {
                title = !!backgroundSound.soundTitle
                    ? backgroundSound.soundTitle
                    : backgroundSound.sound[0].soundTitle;
            }
            return title;
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
</style>
