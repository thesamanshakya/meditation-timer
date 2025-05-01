<template>
    <div id="wrapper"
        class="overflow-hidden relative w-full h-full bg-gradient-to-b from-black to-[rgba(20,20,35,0.95)] transition-all duration-1000">
        <div v-if="!isRunning && !navActive" id="nav-container"
            class="fixed z-[9999] menu-button flex items-center flex-col appearance-none border-0 bg-transparent rounded-none w-[30px] cursor-pointer pointer-events-auto mt-5 ml-6"
            :class="{ active: navActive }" @click="navActive = !navActive">
            <span v-for="index in 3" :key="index"
                class="i-bar block w-full h-[3px] bg-white transition-all duration-300 mt-[5px]" :class="{
                    'rotate-45 translate-y-[8px]': navActive && index === 1,
                    'opacity-0': navActive && index === 2,
                    '-rotate-45 -translate-y-[8px]': navActive && index === 3
                }"></span>
        </div>
        <Transition name="drawer-left">
            <div v-if="navActive" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                @click.self="navActive = false">
                <div
                    class="drawer-left fixed top-0 left-0 bottom-0 w-full max-w-xs sm:max-w-sm bg-gradient-to-b from-[#1c1c2e] to-[#0f172a] shadow-2xl overflow-y-auto pb-10 transform transition-all duration-300 ease-in-out z-50 border-r border-white/5">
                    <div class="p-5 border-b border-white/10 flex items-center justify-between">
                        <h2 class="text-base uppercase font-medium tracking-wider">Hamro Meditation Timer</h2>
                        <button @click="navActive = false" class="text-white/60 hover:text-white transition-colors p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="p-5">
                        <ul class="nav m-0 p-0 list-none space-y-4 text-base">
                            <li v-for="(list, index) in menuList" :key="index">
                                <a :href="list.url" target="_blank" rel="nofollow noopener"
                                    class="flex items-center py-2.5 px-4 rounded-lg text-lg border border-white/10 text-white/80 font-light tracking-wide hover:bg-white/10 hover:text-white transition-all">
                                    {{ list.linkText }}
                                </a>
                            </li>
                        </ul>
                        <div class="mt-5 pt-7 border-t border-white/10 text-white/70">
                            <p class="mb-3 tracking-wide uppercase text-sm">App created by</p>
                            <p class="font-normal mt-1">
                                <a class="text-white underline hover:text-white/80 transition-colors"
                                    href="https://saman.com.np">Saman Shakya</a>
                                <span class="inline-block ml-2">with <span
                                        class="text-red-500 text-2xl inline-block align-top -mt-1.5 ml-1">&hearts;</span></span>
                            </p>
                            <p class="italic text-base font-light text-white/60">May all beings be happy!
                                <span class="not-italic ml-1 text-xl">&#128522;</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
        <div class="w1 flex items-center justify-center pb-2" :class="{ running: isRunning }">
            <div class="text-center flex-1">
                <SvgIcons />
                <div class="text-base top-1/2 right-8 mb-6 z-10 md:-mt-32 md:absolute md:text-lg md:min-[130px]">
                    <strong class="font-medium mb-5 hidden md:block">Start/End Bell</strong>
                    <ul
                        class="bell-sound flex whitespace-no-wrap justify-center m-0 p-0 rounded-md md:block overflow-hidden">
                        <li v-for="(bell, index) in presetsList.bellSound.list" :key="index" class="mb-2" :class="{
                            active: presetsList.bellSound.list[index]
                                .statusActive
                        }">
                            <a @click="selectBellList(index)"
                                class="py-2 px-4 cursor-pointer block md:px-3 md:py-2 hover:bg-grayRGBA rounded-full transition-all hover:shadow-sm">{{
                                    bell.name }}</a>
                        </li>
                    </ul>
                </div>
                <div class="controls" v-if="!isRunning">
                    <ul
                        class="presets m-0 p-0 list-none flex justify-center leading-none pb-7 text-[5.5vw] md:text-[4vh]">
                        <li v-for="(preset, index) in presetsList.time" :key="index"
                            class="mb-3 relative mx-2.5 md:mb-4 md:mx-4" :class="{
                                active: presetsList.time[index].statusActive
                            }">
                            <a @click="selectTimeList(index)"
                                class="selection-timer px-6 py-6 pt-5 cursor-pointer block text-center border-[3px] border-white rounded-full md:p-9 md:pt-8 hover:bg-grayRGBA transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] backdrop-blur-sm">
                                {{
                                    preset.time >= 60
                                        ? preset.time / 60
                                        : preset.time
                                }}
                                <span class="block pt-[10%]">{{
                                    preset.time >= 60 ? 'hour' : 'mins'
                                    }}</span>
                            </a>
                            <i class="add-btn text-sm -left-2 -right-2 -bottom-5 p-2 border-2 border-white rounded-full bg-black whitespace-no-wrap hidden not-italic absolute cursor-pointer select-none md:text-base md:px-2.5 md:left-0 md:right-0 md:-bottom-5 hover:bg-grayRGBA hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all"
                                @click="addExtraDuration(preset.addTime)">Add +{{ preset.addTime }} mins</i>
                        </li>
                    </ul>
                </div>
                <div class="interval mt-3 flex items-center justify-center mb-6 md:mt-4">
                    <input type="checkbox" id="interval-switch" :checked="presetsList.intervalBell"
                        @change="toggleIntervalBell" class="h-0 w-0 invisible" />
                    <label for="interval-switch"
                        class="cursor-pointer block relative bg-transparent -indent-[9999px] rounded-[100px] border-2 border-white w-12 h-6 after:absolute after:w-4 after:h-4 after:left-[2px] after:content-[''] after:top-[2px] after:bg-white after:rounded-[90px] after:transition-all after:duration-300 hover:after:shadow-[0_0_5px_rgba(255,255,255,0.7)]"
                        v-if="!isRunning"></label>
                    <span class="interval-text text-base ml-4 md:text-lg md:ml-5">
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
                    class="timer complete font-medium text-[9vw] leading-[12vw] md:text-[10vh] animate-pulse drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                    v-if="completeAction">COMPLETED!</span>
                <span class="timer-display block leading-none mb-5 text-[25vw] md:text-[25vh]" v-else>
                    {{
                        isRunning
                            ? timeParser(tickerInMins)
                            : timeParser(presetsList.totalDurationInMins)
                    }}
                </span>

                <div class="custom-playing text-center p-9 pt-0" v-if="
                    (presetsList.guidedInstruction.statusActive ||
                        presetsList.backgroundSound.statusActive) &&
                    !completeAction
                ">
                    <div class="inline-block align-top relative pl-8">
                        <div class="absolute left-0 -top-[3px] pr-3 scale-50 md:scale-75">
                            <div
                                class="icon speaker w-0 h-0 bg-transparent border-y-[15px] border-r-[20px] border-r-white border-y-transparent relative before:content-[''] before:absolute before:-top-[5px] before:left-0 before:w-5 before:h-[10px] before:bg-white">
                            </div>
                            <div class="w-[50px] h-[50px] overflow-hidden rotate-[135deg] absolute left-full -top-[10px]"
                                :class="{ 'animate-pulse': isRunning }">
                                <div
                                    class="border-[5px] border-white rounded-[50%] w-[25px] h-[25px] top-[35px] left-[35px] absolute">
                                </div>
                                <div
                                    class="border-[5px] border-white rounded-[50%] w-[40px] h-[40px] top-[25px] left-[25px] absolute">
                                </div>
                            </div>
                        </div>
                        <i id="custom-audio-text"
                            class="text-left capitalize inline-block align-middle text-base not-italic ml-3 max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap md:ml-5 md:max-w-none">{{
                                getAudioTitle }}</i>
                    </div>
                </div>

                <button
                    class="btn-action bg-transparent text-[24vw] md:text-[18vh] text-white border-0 transition-all duration-300 ease-in-out focus:outline-none focus:border-none hover:scale-105 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] outline-none active:scale-95"
                    type="button" @click="toggleTimer" v-if="!completeAction">
                    <svg class="icon icon-play-button" v-if="!isRunning">
                        <use xlink:href="#icon-play-button"></use>
                    </svg>
                    <svg class="icon icon-stop-button" v-else>
                        <use xlink:href="#icon-stop-button"></use>
                    </svg>
                </button>
            </div>
            <span
                class="text-base text-center absolute pointer-events-none cursor-default inset-3 top-auto mx-auto md:text-lg animate-fadeIn opacity-80"
                v-if="!isRunning">
                "{{ quote.quote }}"
                <span class="block md:inline italic font-light">- {{ quote.author }}</span>
            </span>
            <span class="absolute flex items-center right-6 top-6" v-if="!navActive">
                <Battery />
                <Statistics />
                <Settings :presetsList="presetsList" v-show="!isRunning" />
                <!-- <UserDropdown
                    class="ml-6"
                    v-if="!isRunning && !$nuxt.isOffline"
                /> -->
            </span>
        </div>
        <!-- <span
            class="install hidden fixed bg-indigo-600 rounded-none text-sm leading-6 p-5 pr-[165px] text-white md:text-base md:rounded top-0 right-0 left-0 r-0 z-[9999px] md:text-base md:rounded top-0 right-0 left-0 r-0 z-[9999px] md:w-[430px] md:pr-[140px] md:pl-6"
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
import Statistics from '~/components/Statistics.vue';

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
                    linkText: 'Join meditation!',
                    url: 'https://www.facebook.com/profile.php?id=61565128987107'
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
                    activePath: '/media/instructions/anapana/english-1.mp3',
                    audio: null,
                    languageTitle: null,
                    languageActive: 0,
                    customAudioFileName: null,
                    language: [
                        {
                            language: 'english (Goenka)',
                            url: '/media/instructions/anapana/english-1.mp3',
                            statusActive: true
                        },
                        {
                            language: 'english',
                            url: '/media/instructions/anapana/english-2.mp3'
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

                // Save meditation session data
                const meditationData = JSON.parse(localStorage.getItem('meditationData') || '[]');
                meditationData.push({
                    date: new Date().toISOString(),
                    duration: this.presetsList.totalDurationInMins
                });
                localStorage.setItem('meditationData', JSON.stringify(meditationData));
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
            this.presetsList.bellSound.audio.addEventListener('error', (e) => {
                console.error('Error loading bell sound:', e);
                // Try to use cached version if available
                this.tryFallbackAudio(this.presetsList.bellSound.activePath);
            });

            // Add event for mobile browsers that might need interaction
            this.presetsList.bellSound.audio.addEventListener('canplaythrough', () => {
                const playPromise = this.presetsList.bellSound.audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.warn('Bell sound playback was prevented:', error);
                    });
                }
            });

            // Try to play immediately
            const playPromise = this.presetsList.bellSound.audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn('Bell sound playback was prevented:', error);
                });
            }
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

            this.presetsList.guidedInstruction.audio.addEventListener('error', (e) => {
                console.error('Error loading guided instruction:', e);
                // Try to use cached version if available
                this.tryFallbackAudio(this.presetsList.guidedInstruction.activePath);
            });

            // Add event for mobile browsers that might need interaction
            this.presetsList.guidedInstruction.audio.addEventListener('canplaythrough', () => {
                const playPromise = this.presetsList.guidedInstruction.audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.warn('Guided audio playback was prevented:', error);
                    });
                }
            });

            // Try to play immediately
            const playPromise = this.presetsList.guidedInstruction.audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn('Guided audio playback was prevented:', error);
                });
            }
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

            this.presetsList.backgroundSound.audio.addEventListener('error', (e) => {
                console.error('Error loading background sound:', e);
                // Try to use cached version if available
                this.tryFallbackAudio(this.presetsList.backgroundSound.activePath);
            });

            // Add event for mobile browsers that might need interaction
            this.presetsList.backgroundSound.audio.addEventListener('canplaythrough', () => {
                const playPromise = this.presetsList.backgroundSound.audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.warn('Background sound playback was prevented:', error);
                    });
                }
            });

            // Try to play immediately
            const playPromise = this.presetsList.backgroundSound.audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn('Background sound playback was prevented:', error);
                });
            }
        },
        stopBackgroundSound() {
            if (!!this.presetsList.backgroundSound.audio) {
                this.presetsList.backgroundSound.audio.pause();
                this.presetsList.backgroundSound.audio.currentTime = 0;
                this.presetsList.backgroundSound.audio = null;
            }
        },
        // Add new method to handle fallback for offline scenarios
        tryFallbackAudio(audioPath) {
            // Check if we have the audio in cache and try to use it
            if ('caches' in window) {
                caches.match(audioPath).then(response => {
                    if (response) {
                        return response.blob();
                    }
                    return null;
                }).then(blob => {
                    if (blob) {
                        // We have a cached version, use it
                        const objectURL = URL.createObjectURL(blob);
                        const audio = new Audio(objectURL);
                        audio.play().catch(err => {
                            console.warn('Fallback audio playback failed:', err);
                        });
                    } else {
                        console.error('No cached version available for', audioPath);
                    }
                }).catch(err => {
                    console.error('Error trying to use cached audio:', err);
                });
            }
        },
        preloadAudio() {
            // Preload common audio files to ensure they're available offline
            const audioFiles = [
                // Bell sounds
                ...this.presetsList.bellSound.list.map(item => item.url),
                // Background sounds
                ...this.presetsList.backgroundSound.sound.map(item => item.url),
                // Guided instructions 
                ...this.presetsList.guidedInstruction.language
                    .filter(item => item.url) // Filter out null urls (custom uploads)
                    .map(item => item.url)
            ];

            // Create audio elements for preloading
            audioFiles.forEach(audioPath => {
                if (!audioPath) return;

                const audio = new Audio();

                // Add a load event listener to handle success
                audio.addEventListener('canplaythrough', () => {
                    console.log(`Preloaded audio: ${audioPath}`);
                }, { once: true });

                // Add error handling
                audio.addEventListener('error', () => {
                    console.warn(`Failed to preload audio: ${audioPath}`);
                }, { once: true });

                // Set the source and begin loading
                audio.src = audioPath;
                audio.preload = 'auto';
                audio.load();
            });
        },
        initAudioContext() {
            // Create a silent audio context to unlock audio on iOS and some mobile browsers
            const unlockAudio = () => {
                // Create an audio context if available
                if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
                    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                    const audioCtx = new AudioContextClass();

                    // Create a silent buffer and play it
                    const buffer = audioCtx.createBuffer(1, 1, 22050);
                    const source = audioCtx.createBufferSource();
                    source.buffer = buffer;
                    source.connect(audioCtx.destination);

                    // Play the silent sound (this will be blocked until user interaction)
                    if (source.start) {
                        source.start(0);
                    } else {
                        source.noteOn(0);
                    }

                    // Resume the audio context if needed
                    if (audioCtx.state === 'suspended') {
                        audioCtx.resume();
                    }
                }

                // Also create a silent audio element and play it
                const silentAudio = new Audio();
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
            this.preloadAudio();
        },
        destroyed() {
            this.stopBgQuoteChange();
        },
        components: {
            SvgIcons,
            NoSleep,
            Statistics
        }
    }
}
</script>

<style lang="scss">
$themeColours: (
    'purple': linear-gradient(135deg, #9d00e7 0%, #7928ca 100%),
    'red': linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%),
    'blue': linear-gradient(135deg, #12c2e9 0%, #0062b3 100%),
    'pink': linear-gradient(135deg, #f953c6 0%, #b91d73 100%),
    'green': linear-gradient(135deg, #43e97b 0%, #00863c 100%)
);

@each $themeColour, $i in $themeColours {
    body {
        &.#{$themeColour} {

            #wrapper,
            .add-btn,
            .nav-content,
            .s-dd,
            .interval input:checked+label:after {
                background: $i;
            }

            .battery>span {
                border-color: $i;
            }
        }
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 0.8;
    }
}

.animate-fadeIn {
    animation: fadeIn 1.5s ease-in-out;
}

.timer {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-weight: 200;
    letter-spacing: -0.05em;
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

.timer-display {
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    letter-spacing: -0.07em;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.15);
    background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
}

.selection-timer {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    letter-spacing: -0.07em;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.15);
}

span.timer.block {
    font-weight: 100;
}

// Left drawer animation
.drawer-left-enter-active,
.drawer-left-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.drawer-left-enter-from,
.drawer-left-leave-to {
    opacity: 0;
}

.drawer-left-enter-from .drawer-left,
.drawer-left-leave-to .drawer-left {
    transform: translateX(-100%);
}

// Burger animation
#nav-container.active {
    .i-bar {
        &:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }

        &:nth-child(2) {
            opacity: 0;
        }

        &:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    }
}
</style>
