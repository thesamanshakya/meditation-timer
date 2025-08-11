<template>
  <div
    id="wrapper"
    class="overflow-hidden relative w-full h-full bg-gradient-to-b from-black to-[rgba(20,20,35,0.95)] transition-all duration-1000"
  >
    <div
      v-if="!isRunning && !navActive"
      id="nav-container"
      class="fixed z-20 menu-button flex items-center justify-center appearance-none border-0 bg-transparent rounded-none w-[40px] h-[40px] cursor-pointer pointer-events-auto mt-3 ml-4"
      :class="{ active: navActive }"
      @click="navActive = !navActive"
    >
      <svg
        class="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 12H21"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="transition-all duration-300"
          :class="{
            'translate-y-1.5 rotate-45': navActive,
            'translate-y-0': !navActive,
          }"
        />
        <path
          d="M3 6H21"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="transition-all duration-300"
          :class="{
            'opacity-0': navActive,
            'opacity-100': !navActive,
          }"
        />
        <path
          d="M3 18H21"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="transition-all duration-300"
          :class="{
            '-translate-y-1.5 -rotate-45': navActive,
            'translate-y-0': !navActive,
          }"
        />
      </svg>
    </div>
    <Transition name="drawer-left">
      <div
        v-if="navActive"
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        @click.self="navActive = false"
      >
        <div
          class="drawer-left fixed top-0 left-0 bottom-0 w-full max-w-xs sm:max-w-sm bg-gradient-to-b from-[#1c1c2e] to-[#0f172a] shadow-2xl overflow-y-auto pb-10 transform transition-all duration-300 ease-in-out z-50 border-r border-white/5"
        >
          <div
            class="p-5 border-b border-white/10 flex items-center justify-between"
          >
            <h2 class="text-base uppercase font-medium tracking-wider">
              Hamro Meditation Timer
            </h2>
            <button
              @click="navActive = false"
              class="text-white/60 hover:text-white transition-colors p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="p-5">
            <ul class="nav m-0 p-0 list-none space-y-4 text-base">
              <li v-for="(list, index) in menuList" :key="index">
                <a
                  :href="list.url"
                  target="_blank"
                  rel="nofollow noopener"
                  class="flex items-center py-2.5 px-4 rounded-lg text-lg border border-white/10 text-white/80 font-light tracking-wide hover:bg-white/10 hover:text-white transition-all hover:shadow-lg group"
                >
                  <span
                    class="icon-container flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-all"
                  >
                    <svg
                      v-if="list.icon === 'message'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                      ></path>
                    </svg>
                    <svg
                      v-if="list.icon === 'community'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                      ></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <svg
                      v-if="list.icon === 'coffee'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                      <path
                        d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"
                      ></path>
                      <line x1="6" y1="1" x2="6" y2="4"></line>
                      <line x1="10" y1="1" x2="10" y2="4"></line>
                      <line x1="14" y1="1" x2="14" y2="4"></line>
                    </svg>
                  </span>
                  {{ list.linkText }}
                </a>
              </li>
            </ul>
            <div class="mt-5 pt-7 border-t border-white/10 text-white/70">
              <p class="mb-3 tracking-wide uppercase text-sm">App created by</p>
              <p class="font-normal mt-1">
                <a
                  class="text-white underline hover:text-white/80 transition-colors"
                  href="https://saman.com.np"
                  >Saman Shakya</a
                >
                <span class="inline-block ml-1"
                  >with
                  <span
                    class="text-red-500 text-2xl inline-block align-top -mt-1.5 ml-1"
                    >&hearts;</span
                  ></span
                >
              </p>
              <p class="italic text-base font-light text-white/60">
                May all beings be happy!
                <span class="not-italic ml-1 text-xl">&#128522;</span>
              </p>
              <div class="mt-6">
                <button
                  @click="resetCache"
                  class="px-4 py-2 border border-red-500 text-red-500 text-sm rounded-lg transition-colors"
                >
                  Reset App Cache
                </button>
              </div>
            </div>
          </div>
        </div>
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
                active: presetsList.bellSound.list[index].statusActive,
              }"
            >
              <a
                @click="selectBellList(index)"
                class="py-2 px-4 cursor-pointer block md:px-3 md:py-2 hover:bg-grayRGBA rounded-full transition-all hover:shadow-sm"
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
                active: presetsList.time[index].statusActive,
              }"
            >
              <a
                @click="selectTimeList(index)"
                class="selection-timer px-6 py-6 pt-5 cursor-pointer block text-center border-[3px] border-white rounded-full md:p-9 md:pt-8 hover:bg-grayRGBA transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] backdrop-blur-sm"
              >
                {{ preset.time >= 60 ? preset.time / 60 : preset.time }}
                <span class="block pt-[10%]">{{
                  preset.time >= 60 ? 'hour' : 'mins'
                }}</span>
              </a>
              <i
                class="add-btn text-sm -left-2 -right-2 -bottom-5 p-2 border-2 border-white rounded-full bg-black whitespace-no-wrap hidden not-italic absolute cursor-pointer select-none md:text-base md:px-2.5 md:left-0 md:right-0 md:-bottom-5 hover:bg-grayRGBA hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all"
                @click="addExtraDuration(preset.addTime)"
                >Add +{{ preset.addTime }} mins</i
              >
            </li>
          </ul>
        </div>

        <span
          class="timer complete font-medium text-[9vw] leading-[12vw] md:text-[10vh] animate-pulse drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
          v-if="completeAction"
          >COMPLETED!</span
        >
        <span
          class="timer-display block leading-none mb-5 text-[25vw] md:text-[25vh]"
          :class="{ 'text-yellow-300': isPostSession }"
          v-else
        >
          {{
            isRunning
              ? timeParser(Math.abs(tickerInMins))
              : timeParser(presetsList.totalDurationInMins)
          }}
        </span>

        <!-- Post-session indicator -->
        <div v-if="isRunning && isPostSession" class="text-center mb-4">
          <div
            class="text-sm text-yellow-300 bg-yellow-500/20 px-3 py-1 rounded-full backdrop-blur-sm animate-pulse"
          >
            Waiting for ending bell...
          </div>
        </div>

        <!-- Bell Status Indicators -->
        <div
          class="bell-status text-center mb-4"
          v-if="
            !completeAction &&
            (presetsList.intervalBell || presetsList.endingBell.enabled)
          "
        >
          <div class="flex flex-col items-center gap-1">
            <div
              v-if="presetsList.intervalBell"
              class="text-sm text-white/70 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm"
            >
              Interval bell at
              {{ Math.floor(presetsList.totalDurationInMins / 2) }} mins
            </div>
            <div
              v-if="presetsList.endingBell.enabled"
              class="text-sm text-white/70 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm"
            >
              Ending bell {{ presetsList.endingBell.timeInMins }} mins after
              session
            </div>
          </div>
        </div>

        <div
          class="custom-playing text-center p-9 pt-0"
          v-if="
            (presetsList.guidedInstruction.statusActive ||
              presetsList.backgroundSound.statusActive) &&
            !completeAction
          "
        >
          <div class="inline-block align-top relative pl-8">
            <div class="absolute left-0 -top-[3px] pr-3 scale-50 md:scale-75">
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
          class="btn-action -mt-7 md:-mt-12 bg-transparent text-[24vw] md:text-[18vh] text-white border-0 transition-all duration-300 ease-in-out focus:outline-none focus:border-none hover:scale-105 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] outline-none active:scale-95"
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
        class="text-base text-center absolute pointer-events-none cursor-default inset-3 top-auto mx-auto md:text-lg animate-fadeIn opacity-80"
        v-if="!isRunning"
      >
        "{{ quote.quote }}"
        <span class="block md:inline italic font-light"
          >- {{ quote.author }}</span
        >
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
    <!-- Facebook Community Banner -->
    <Transition name="fade">
      <div
        v-if="showFacebookBanner"
        class="fixed bottom-4 left-0 right-0 mx-auto w-11/12 max-w-xs bg-blue-600/90 text-white p-2 rounded-lg shadow-lg backdrop-blur-sm z-50 animate-slideUp"
      >
        <div class="flex items-center justify-between w-full text-sm">
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1.5 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
              ></path>
            </svg>
            <span>Be a part of our community!</span>
          </div>
          <a
            href="https://www.facebook.com/groups/1664234698303384"
            target="_blank"
            rel="nofollow noopener"
            class="bg-white text-blue-600 px-2 py-0.5 rounded text-xs font-medium hover:bg-blue-100 transition-colors ml-2"
          >
            Join Now
          </a>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';
import { useHead, useRoute, useNuxtApp } from '#imports';
import { quotes } from '~/assets/data/quotes.js';
import NoSleep from 'nosleep.js';

// State
const navActive = ref(false);
const showFacebookBanner = ref(false);
const colorTheme = ['purple', 'red', 'blue', 'pink', 'green'];
const quote = ref('');
const tickerInMins = ref(null);
const isRunning = ref(false);
const completeAction = ref(false);
const isPostSession = ref(false);
const noSleep = new NoSleep();
const intervalIds = reactive({
  bgQuoteChange: null,
  timer: null,
  fbTimeout: null,
  endingBell: null,
});

const menuList = [
  {
    linkText: 'Message us',
    url: 'http://m.me/61565128987107',
    icon: 'message',
  },
  {
    linkText: 'Join our community',
    url: 'https://anapansati.saman.com.np',
    icon: 'community',
  },
];

const presetsList = reactive({
  totalDurationInMins: 10,
  intervalBell: false,
  endingBell: {
    enabled: false,
    timeInMins: 7,
  },
  guidedInstruction: {
    statusActive: false,
    activePath: '/media/instructions/anapana/english-1.mp3',
    audio: null,
    languageTitle: null,
    languageActive: 0,
    customAudioFileName: null,
    customAudioId: null,
    language: [
      {
        language: 'english (Goenka)',
        url: '/media/instructions/anapana/english-1.mp3',
        statusActive: true,
      },
      {
        language: 'english',
        url: '/media/instructions/anapana/english-2.mp3',
      },
      { language: 'hindi', url: '/media/instructions/anapana/hindi.mp3' },
      {
        language: 'nepali',
        url: '/media/instructions/anapana/nepali.mp3',
      },
      { language: 'custom', url: null },
    ],
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
        statusActive: true,
      },
      {
        soundTitle: 'Water in Stream',
        url: '/media/sounds/nature/water-in-stream.mp3',
      },
      {
        soundTitle: 'River with Birds',
        url: '/media/sounds/nature/birds-with-river.mp3',
      },
      { soundTitle: 'Birds', url: '/media/sounds/nature/birds.mp3' },
    ],
  },
  time: [
    { time: 10, addTime: 5, statusActive: true },
    { time: 30, addTime: 15 },
    { time: 60, addTime: 30 },
  ],
  bellSound: {
    activePath: '/media/bell/gong-1.mp3',
    audio: null,
    list: [
      {
        name: 'Gong 1',
        url: '/media/bell/gong-1.mp3',
        statusActive: true,
      },
      { name: 'Gong 2', url: '/media/bell/gong-2.mp3' },
      { name: 'Gong 3', url: '/media/bell/gong-3.mp3' },
      { name: 'Gong 4', url: '/media/bell/gong-4.mp3' },
    ],
  },
});

// Head (OG)
const route = useRoute();
useHead({
  meta: [
    { property: 'og:title', content: 'Hamro Meditation Timer' },
    {
      property: 'og:url',
      content: 'https://timer.saman.conm.np' + route.path,
    },
    {
      property: 'og:description',
      content:
        'Hamro Meditation Timer - a simple and lightweight tool for meditation created by Saman with ❤',
    },
    { property: 'og:image', content: '/images/og-image.jpg' },
  ],
});

// Methods
function toggleTimer() {
  if (!isRunning.value) {
    startTimer();
    playAudio();
  } else {
    stopTimer(true);
    stopAudio();
  }
}

function timeParser(time) {
  const durationInSeconds = time * 60;
  let parsedTime = new Date(durationInSeconds * 1000).toISOString();
  parsedTime =
    durationInSeconds / 60 < 60
      ? parsedTime.substr(14, 5)
      : parsedTime.substr(11, 8);
  return parsedTime;
}

function getQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function setBodyBgColor() {
  const bodyElem = document.body;
  bodyElem.removeAttribute('class');
  bodyElem.classList.add(
    colorTheme[Math.floor(Math.random() * colorTheme.length)]
  );
}

function startBgQuoteChange() {
  intervalIds.bgQuoteChange = setInterval(() => {
    setBodyBgColor();
    quote.value = getQuote();
  }, 7000);
}

function setBgQuoteChange() {
  setBodyBgColor();
  quote.value = getQuote();
  startBgQuoteChange();
}

function stopBgQuoteChange() {
  if (intervalIds.bgQuoteChange) clearInterval(intervalIds.bgQuoteChange);
  document.body.removeAttribute('class');
}

function startTimer() {
  isRunning.value = true;
  isPostSession.value = false;
  stopBgQuoteChange();
  noSleep.enable();
  let tickerInSeconds = presetsList.totalDurationInMins * 60;
  tickerInMins.value = tickerInSeconds / 60;
  const tempTicker = tickerInSeconds;
  let postSessionSeconds = 0;

  intervalIds.timer = setInterval(() => {
    // Check for interval bell (at halfway point)
    if (presetsList.intervalBell && tickerInSeconds === tempTicker / 2) {
      playBellSound();
    }

    if (tickerInSeconds > 0) {
      tickerInSeconds--;
      tickerInMins.value = tickerInSeconds / 60;
    } else if (tickerInSeconds === 0) {
      // Main session ended
      tickerInSeconds--;
      tickerInMins.value = 0;
      stopAudio();
      playBellSound();

      // Check if ending bell is enabled
      if (presetsList.endingBell.enabled) {
        isPostSession.value = true;
        completeAction.value = false;
      } else {
        stopTimer();
        return;
      }
    } else if (isPostSession.value) {
      // Post-session countdown to ending bell
      postSessionSeconds++;
      const remainingEndingBellTime =
        presetsList.endingBell.timeInMins * 60 - postSessionSeconds;
      tickerInMins.value = -remainingEndingBellTime / 60; // Negative to show countdown

      if (postSessionSeconds >= presetsList.endingBell.timeInMins * 60) {
        // Time for ending bell
        playBellSound();
        stopTimer();
      }
    }
  }, 1000);
  localStorage.setItem('presetsList', JSON.stringify(presetsList));
}

function stopTimer(manualStop = false) {
  isRunning.value = false;
  isPostSession.value = false;
  setBgQuoteChange();
  noSleep.disable();

  if (!manualStop) {
    completeAction.value = true;
    setTimeout(() => {
      completeAction.value = false;
    }, 5000);

    // Only stop audio and save data if this is a natural completion
    if (!isPostSession.value) {
      stopAudio();
    }

    const meditationData = JSON.parse(
      localStorage.getItem('meditationData') || '[]'
    );
    meditationData.push({
      date: new Date().toISOString(),
      duration: presetsList.totalDurationInMins,
    });
    localStorage.setItem('meditationData', JSON.stringify(meditationData));
  } else {
    // Manual stop - stop everything
    stopAudio();
  }

  if (intervalIds.timer) clearInterval(intervalIds.timer);
  if (intervalIds.endingBell) {
    clearTimeout(intervalIds.endingBell);
    intervalIds.endingBell = null;
  }
  tickerInMins.value = presetsList.totalDurationInMins;
}

function selectTimeList(index) {
  presetsList.time.forEach((item, i) => {
    item.statusActive = i === index;
  });
  presetsList.totalDurationInMins = presetsList.time[index].time;
  // Validate ending bell time after preset change
  if (presetsList.endingBell.enabled) {
    validateEndingBellTime();
  }
}

function selectBellList(index) {
  presetsList.bellSound.list.forEach((item, i) => {
    item.statusActive = i === index;
  });
  presetsList.bellSound.activePath = presetsList.bellSound.list[index].url;
}

function validateEndingBellTime() {
  // Ensure ending bell time is valid (between 1 and total duration - 1)
  if (presetsList.endingBell.timeInMins < 1) {
    presetsList.endingBell.timeInMins = 1;
  } else if (
    presetsList.endingBell.timeInMins >= presetsList.totalDurationInMins
  ) {
    presetsList.endingBell.timeInMins = Math.max(
      1,
      presetsList.totalDurationInMins - 1
    );
  }
}

function addExtraDuration(extraTime) {
  presetsList.totalDurationInMins += extraTime;
  // Validate ending bell time after duration change
  if (presetsList.endingBell.enabled) {
    validateEndingBellTime();
  }
}

// Audio
function playAudio() {
  if (presetsList.guidedInstruction.statusActive) {
    stopGuidedAudio();
    playGuidedAudio();
  } else if (presetsList.backgroundSound.statusActive) {
    stopBackgroundSound();
    playBackgroundSound();
  } else {
    // Just play the bell sound - no need to stop it first since playBellSound() handles this
    playBellSound();
  }
}

function stopAudio() {
  if (presetsList.guidedInstruction.statusActive) {
    stopGuidedAudio();
  } else if (presetsList.backgroundSound.statusActive) {
    stopBackgroundSound();
  }
  stopBellSound();
}

function playBellSound() {
  try {
    // Stop any existing bell sound first
    stopBellSound();

    presetsList.bellSound.audio = new Audio(presetsList.bellSound.activePath);

    // Add error handling for audio loading
    presetsList.bellSound.audio.addEventListener('error', (e) => {
      console.error('Error loading bell sound:', e);
    });

    // Play the audio with error handling
    const playPromise = presetsList.bellSound.audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('Bell sound played successfully');
        })
        .catch((error) => {
          console.error('Error playing bell sound:', error);
          // Try to play again after a short delay
          setTimeout(() => {
            if (presetsList.bellSound.audio) {
              presetsList.bellSound.audio
                .play()
                .catch((e) => console.error('Retry failed:', e));
            }
          }, 100);
        });
    }
  } catch (error) {
    console.error('Error in playBellSound:', error);
  }
}

function stopBellSound() {
  try {
    if (presetsList.bellSound.audio) {
      // Check if it's a valid Audio object
      if (presetsList.bellSound.audio instanceof Audio) {
        presetsList.bellSound.audio.pause();
        presetsList.bellSound.audio.currentTime = 0;
      }
    }
  } catch (error) {
    console.error('Error stopping bell sound:', error);
  } finally {
    // Always reset to null to prevent future errors
    presetsList.bellSound.audio = null;
  }
}

function playGuidedAudio() {
  if (
    presetsList.guidedInstruction.customAudioId &&
    !presetsList.guidedInstruction.activePath &&
    presetsList.guidedInstruction.languageActive ===
      presetsList.guidedInstruction.language.length - 1
  ) {
    loadCustomAudioFile(() => {
      presetsList.guidedInstruction.audio = new Audio(
        presetsList.guidedInstruction.activePath
      );
      presetsList.guidedInstruction.audio.play();
    });
  } else {
    presetsList.guidedInstruction.audio = new Audio(
      presetsList.guidedInstruction.activePath
    );
    presetsList.guidedInstruction.audio.play();
  }
}

function stopGuidedAudio() {
  if (presetsList.guidedInstruction.audio) {
    presetsList.guidedInstruction.audio.pause();
    presetsList.guidedInstruction.audio.currentTime = 0;
    presetsList.guidedInstruction.audio = null;
  }
}

function playBackgroundSound() {
  presetsList.backgroundSound.audio = new Audio(
    presetsList.backgroundSound.activePath
  );
  presetsList.backgroundSound.audio.loop = true;
  presetsList.backgroundSound.audio.play();
}

function stopBackgroundSound() {
  if (presetsList.backgroundSound.audio) {
    presetsList.backgroundSound.audio.pause();
    presetsList.backgroundSound.audio.currentTime = 0;
    presetsList.backgroundSound.audio = null;
  }
}

function loadCustomAudioFile(callback) {
  if (!presetsList.guidedInstruction.customAudioId) {
    if (callback) callback();
    return;
  }
  const audioId = presetsList.guidedInstruction.customAudioId;
  const request = indexedDB.open('MeditationTimerAudio', 1);
  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains('audioFiles')) {
      db.createObjectStore('audioFiles', { keyPath: 'id' });
    }
  };
  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(['audioFiles'], 'readonly');
    const store = transaction.objectStore('audioFiles');
    const getRequest = store.get(audioId);
    getRequest.onsuccess = (e) => {
      if (e.target.result) {
        const { file } = e.target.result;
        const blobUrl = URL.createObjectURL(file);
        presetsList.guidedInstruction.activePath = blobUrl;
        if (callback) callback();
      } else {
        console.error('Custom audio file not found in IndexedDB');
        const customIndex = presetsList.guidedInstruction.language.length - 1;
        presetsList.guidedInstruction.activePath =
          presetsList.guidedInstruction.language[customIndex].url;
        if (callback) callback();
      }
    };
    getRequest.onerror = (e) => {
      console.error('Error loading custom audio file:', e.target.error);
      if (callback) callback();
    };
  };
  request.onerror = (e) => {
    console.error('IndexedDB error:', e.target.error);
    if (callback) callback();
  };
}

// Facebook banner
function showFacebookBannerWithTimeout() {
  const bannerShown = localStorage.getItem('facebookBannerShown');
  if (!bannerShown) {
    setTimeout(() => {
      showFacebookBanner.value = true;
      localStorage.setItem('facebookBannerShown', 'true');
      intervalIds.fbTimeout = setTimeout(() => {
        closeFacebookBanner();
      }, 10000);
    }, 5000);
  }
}

function closeFacebookBanner() {
  showFacebookBanner.value = false;
  if (intervalIds.fbTimeout) clearTimeout(intervalIds.fbTimeout);
}

// Cache reset
function resetCache() {
  const { $toast } = useNuxtApp();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister();
      }
      caches
        .keys()
        .then((cacheNames) =>
          Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)))
        )
        .then(() => {
          $toast.success('Cache cleared successfully! Reloading page...');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
    });
  } else {
    $toast.error('Service Worker is not supported in this browser');
  }
}

// Computed
const getAudioTitle = computed(() => {
  let title = null;
  const guidedInstruction = presetsList.guidedInstruction;
  const backgroundSound = presetsList.backgroundSound;
  if (guidedInstruction.statusActive) {
    title =
      guidedInstruction.languageTitle || guidedInstruction.language[0].language;
    title += ' Guided Meditation';
  } else if (backgroundSound.statusActive) {
    title = backgroundSound.soundTitle || backgroundSound.sound[0].soundTitle;
  }
  return title;
});

// Init
onMounted(() => {
  const localData = localStorage.getItem('presetsList');
  if (localData !== null) {
    const parsed = JSON.parse(localData);
    Object.assign(presetsList, parsed);
    if (
      presetsList.guidedInstruction.customAudioId &&
      presetsList.guidedInstruction.languageActive ===
        presetsList.guidedInstruction.language.length - 1
    ) {
      loadCustomAudioFile();
    }
  }
  setBgQuoteChange();
  showFacebookBannerWithTimeout();
});

onBeforeUnmount(() => {
  stopBgQuoteChange();
  if (intervalIds.fbTimeout) clearTimeout(intervalIds.fbTimeout);
  if (intervalIds.endingBell) clearTimeout(intervalIds.endingBell);
});
</script>

<style scoped>
/* Facebook banner animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@keyframes slideUp {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slideUp {
  animation: slideUp 0.5s ease-out forwards;
}
</style>

<style>
/* Base transition for smooth background changes */
#wrapper,
.add-btn,
.nav-content,
.s-dd,
.battery > span {
  transition: background 2s ease-in-out, border-color 2s ease-in-out;
}

/* Theme backgrounds (was SCSS map/loop) */
body.purple #wrapper,
body.purple .add-btn,
body.purple .nav-content,
body.purple .s-dd {
  background: linear-gradient(135deg, #9d00e7 0%, #7928ca 100%);
}
body.purple .battery > span {
  border-color: linear-gradient(135deg, #9d00e7 0%, #7928ca 100%);
}

body.red #wrapper,
body.red .add-btn,
body.red .nav-content,
body.red .s-dd {
  background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
}
body.red .battery > span {
  border-color: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
}

body.blue #wrapper,
body.blue .add-btn,
body.blue .nav-content,
body.blue .s-dd {
  background: linear-gradient(135deg, #12c2e9 0%, #0062b3 100%);
}
body.blue .battery > span {
  border-color: linear-gradient(135deg, #12c2e9 0%, #0062b3 100%);
}

body.pink #wrapper,
body.pink .add-btn,
body.pink .nav-content,
body.pink .s-dd {
  background: linear-gradient(135deg, #f953c6 0%, #b91d73 100%);
}
body.pink .battery > span {
  border-color: linear-gradient(135deg, #f953c6 0%, #b91d73 100%);
}

body.green #wrapper,
body.green .add-btn,
body.green .nav-content,
body.green .s-dd {
  background: linear-gradient(135deg, #43e97b 0%, #00863c 100%);
}
body.green .battery > span {
  border-color: linear-gradient(135deg, #43e97b 0%, #00863c 100%);
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
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Helvetica, Arial, sans-serif;
  font-weight: 200;
  letter-spacing: -0.05em;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

.timer-display {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  letter-spacing: -0.07em;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.15);
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.8) 100%
  );
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

/* Left drawer animation */
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

/* Burger animation (expanded from SCSS nesting) */
#nav-container.active .i-bar:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
#nav-container.active .i-bar:nth-child(2) {
  opacity: 0;
}
#nav-container.active .i-bar:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}
</style>
