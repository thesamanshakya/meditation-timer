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
              {{ $t('app.title') }}
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
                    <svg
                      v-if="list.icon === 'star'"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 
                               3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 
                               0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61
                               -.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.084-.729.084-.729
                               1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.304 3.492.997
                               .108-.776.418-1.304.762-1.604-2.665-.3-5.467-1.332-5.467-5.93
                               0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23
                               .957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404
                               2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176
                               .77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.922
                               .43.37.823 1.102.823 2.222 0 1.606-.014 2.896-.014 3.286
                               0 .319.216.694.825.576C20.565 22.092 24 17.592 24 12.297
                               c0-6.627-5.373-12-12-12"
                      />
                    </svg>
                  </span>
                  {{ list.linkText }}
                </a>
              </li>
            </ul>
            <div class="mt-5 pt-7 border-t border-white/10 text-white/70">
              <p class="mb-3 tracking-wide uppercase text-sm">
                {{ $t('app.createdBy') }}
              </p>
              <p class="font-normal mt-1">
                <a
                  class="text-white underline hover:text-white/80 transition-colors"
                  href="https://saman.com.np"
                  >Saman Shakya</a
                >
                <span class="inline-block ml-1"
                  >{{ $t('app.with') }}
                  <span
                    class="text-red-500 text-2xl inline-block align-top -mt-1.5 ml-1"
                    >&hearts;</span
                  ></span
                >
              </p>
              <p class="italic text-base font-light text-white/60">
                {{ $t('app.mayAllBeingsBeHappy') }}
                <span class="not-italic ml-1 text-xl">&#128522;</span>
              </p>
              <div class="mt-6">
                <button
                  @click="resetCache"
                  class="px-4 py-2 border border-red-500 text-red-500 text-sm rounded-lg transition-colors"
                >
                  {{ $t('app.refreshApp') }}
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
          <strong class="font-medium mb-5 hidden md:block">{{
            $t('timer.startEndBell')
          }}</strong>
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
                class="py-2 px-3 text-[13px] cursor-pointer block md:px-3 md:py-2 hover:bg-grayRGBA rounded-full transition-all hover:shadow-sm"
                >{{ $t(`bellSounds.${bell.name}`) }}</a
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
                class="selection-timer px-6 py-6 pt-5 min-w-[100px] cursor-pointer block text-center border-[3px] border-white rounded-full md:p-9 md:pt-8 hover:bg-grayRGBA transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] backdrop-blur-sm"
              >
                {{ preset.time >= 60 ? preset.time / 60 : preset.time }}
                <span class="block pt-[10%]">{{
                  preset.time >= 60 ? $t('timer.hour') : $t('timer.mins')
                }}</span>
              </a>
              <i
                class="add-btn text-sm -left-2.5 -right-2.5 -bottom-5 p-2 border-2 border-white rounded-full bg-black whitespace-no-wrap hidden not-italic absolute cursor-pointer select-none md:text-base md:px-2.5 md:left-0 md:right-0 md:-bottom-5 hover:bg-grayRGBA hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all"
                @click="addExtraDuration(preset.addTime)"
                >{{ $t('timer.add', { time: preset.addTime }) }}</i
              >
            </li>
          </ul>
        </div>

        <span
          class="timer complete font-medium text-[9vw] leading-[12vw] md:text-[10vh] animate-pulse drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
          v-if="completeAction"
          >{{ $t('timer.completed') }}</span
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
            {{ $t('timer.waitingForEndingBell') }}
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
              {{ $t('timer.intervalBellAt') }}
              {{ Math.floor(presetsList.totalDurationInMins / 2) }}
              {{ $t('timer.mins') }}
            </div>
            <div
              v-if="presetsList.endingBell.enabled"
              class="text-sm text-white/70 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm"
            >
              {{
                $t('timer.endingBell', {
                  time: presetsList.endingBell.timeInMins,
                })
              }}
              {{ $t('timer.session') }}
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
        <Statistics v-if="!isRunning" />
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
            <span>{{ $t('community.bePartOfCommunity') }}</span>
          </div>
          <a
            href="https://www.facebook.com/groups/1664234698303384"
            target="_blank"
            rel="nofollow noopener"
            class="bg-white text-blue-600 px-2 py-0.5 rounded text-xs font-medium hover:bg-blue-100 transition-colors ml-2"
          >
            {{ $t('community.joinNow') }}
          </a>
        </div>
      </div>
    </Transition>

    <!-- Rating Popup -->
    <RatingPopup
      :show="showRatingPopup"
      :session-duration="presetsList.totalDurationInMins"
      @close="showRatingPopup = false"
      @rating-submitted="onRatingSubmitted"
    />
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
} from 'vue';
import { useHead, useRoute, useNuxtApp, useI18n } from '#imports';
import NoSleep from 'nosleep.js';

// State
const navActive = ref(false);
const showFacebookBanner = ref(false);
const showRatingPopup = ref(false);
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

const { t, locale } = useI18n();

// Reactive reference for current quotes
const currentQuotes = ref([]);

// Load quotes based on current locale
async function loadQuotes() {
  try {
    const currentLocale = locale.value || 'en';
    let quotesModule;

    switch (currentLocale) {
      case 'hi':
        quotesModule = await import('~/assets/data/quotes-hi.js');
        break;
      case 'ne':
        quotesModule = await import('~/assets/data/quotes-ne.js');
        break;
      default:
        quotesModule = await import('~/assets/data/quotes-en.js');
        break;
    }

    currentQuotes.value = quotesModule.quotes || [];
  } catch (error) {
    console.error('Error loading quotes:', error);
    // Fallback quotes if loading fails
    currentQuotes.value = [
      {
        quote:
          'Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.',
        author: 'The Buddha',
      },
    ];
  }
}

const menuList = computed(() => [
  {
    linkText: t('navigation.whatIsMeditation'),
    url: 'https://anapansati.saman.com.np',
    icon: 'community',
  },
  {
    linkText: t('navigation.messageUs'),
    url: 'http://m.me/61565128987107',
    icon: 'message',
  },
  {
    linkText: t('navigation.joinCommunity'),
    url: 'https://www.facebook.com/groups/1664234698303384',
    icon: 'community',
  },
  {
    linkText: t('navigation.starOnGithub'),
    url: 'https://github.com/thesamanshakya/meditation-timer',
    icon: 'star',
  },
]);

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
        language: 'englishGoenka',
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
        soundTitle: 'forestWithBirds',
        url: '/media/sounds/nature/forest-with-birds.mp3',
        statusActive: true,
      },
      {
        soundTitle: 'waterInStream',
        url: '/media/sounds/nature/water-in-stream.mp3',
      },
      {
        soundTitle: 'riverWithBirds',
        url: '/media/sounds/nature/birds-with-river.mp3',
      },
      { soundTitle: 'birds', url: '/media/sounds/nature/birds.mp3' },
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
        name: 'gong1',
        url: '/media/bell/gong-1.mp3',
        statusActive: true,
      },
      { name: 'gong2', url: '/media/bell/gong-2.mp3' },
      { name: 'gong3', url: '/media/bell/gong-3.mp3' },
      { name: 'gong4', url: '/media/bell/gong-4.mp3' },
      { name: 'snGoenka', url: '/media/bell/sn-goenka.mp3' },
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
  const quotesArray = currentQuotes.value;

  if (quotesArray && quotesArray.length > 0) {
    return quotesArray[Math.floor(Math.random() * quotesArray.length)];
  } else {
    // Fallback quote if no quotes are available
    return {
      quote:
        'Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.',
      author: 'The Buddha',
    };
  }
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
        playBellSound();
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
        stopTimer(false, true); // Pass true to indicate ending bell is playing
      }
    }
  }, 1000);
  localStorage.setItem('presetsList', JSON.stringify(presetsList));
}

function stopTimer(manualStop = false, endingBellPlaying = false) {
  isRunning.value = false;
  isPostSession.value = false;
  setBgQuoteChange();
  noSleep.disable();

  if (!manualStop) {
    completeAction.value = true;
    setTimeout(() => {
      completeAction.value = false;
      // Show rating popup after completion animation
      showRatingPopup.value = true;
    }, 3000);

    // Only stop audio and save data if this is a natural completion
    if (!isPostSession.value) {
      // Don't stop bell sound if ending bell is currently playing
      if (endingBellPlaying) {
        // Stop other audio but not bell sound
        if (presetsList.guidedInstruction.statusActive) {
          stopGuidedAudio();
        } else if (presetsList.backgroundSound.statusActive) {
          stopBackgroundSound();
        }
      } else {
        stopAudio();
      }
    }

    const meditationData = JSON.parse(
      localStorage.getItem('meditationData') || '[]'
    );
    meditationData.push({
      id: Date.now(),
      date: new Date().toISOString(),
      duration: presetsList.totalDurationInMins,
    });
    localStorage.setItem('meditationData', JSON.stringify(meditationData));
  } else {
    // Manual stop - stop everything including bell sound
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
    // Stop any existing bell sound first, but with a small delay to prevent race conditions
    if (presetsList.bellSound.audio) {
      stopBellSound();
      // Small delay to ensure the previous audio is fully stopped
      setTimeout(() => {
        createAndPlayBellSound();
      }, 10);
    } else {
      createAndPlayBellSound();
    }
  } catch (error) {
    console.error('Error in playBellSound:', error);
  }
}

function createAndPlayBellSound() {
  try {
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
    console.error('Error in createAndPlayBellSound:', error);
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

// Rating handler
function onRatingSubmitted(ratingData) {
  console.log('Rating submitted:', ratingData);
  // Rating is already stored in localStorage by the RatingPopup component
}

// Cache reset
function resetCache() {
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
          // Show success message and close sidebar
          alert('App refreshed successfully!');
          navActive.value = false; // Close the sidebar
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
    });
  } else {
    alert('Service Worker is not supported in this browser');
  }
}

// Computed
const getAudioTitle = computed(() => {
  let title = null;
  const guidedInstruction = presetsList.guidedInstruction;
  const backgroundSound = presetsList.backgroundSound;
  if (guidedInstruction.statusActive) {
    const languageKey =
      guidedInstruction.languageTitle || guidedInstruction.language[0].language;
    title =
      t(`guidedMeditation.${languageKey}`) +
      ' ' +
      t('guidedMeditation.guidedMeditationText');
  } else if (backgroundSound.statusActive) {
    const soundKey =
      backgroundSound.soundTitle || backgroundSound.sound[0].soundTitle;
    title = t(`backgroundSounds.${soundKey}`);
  }
  return title;
});

// Data migration function to ensure bell names are in correct format
function migrateBellSoundData() {
  const correctBellList = [
    {
      name: 'gong1',
      url: '/media/bell/gong-1.mp3',
      statusActive: true,
    },
    { name: 'gong2', url: '/media/bell/gong-2.mp3' },
    { name: 'gong3', url: '/media/bell/gong-3.mp3' },
    { name: 'gong4', url: '/media/bell/gong-4.mp3' },
    { name: 'snGoenka', url: '/media/bell/sn-goenka.mp3' },
  ];

  // Check if bell names need migration
  const needsMigration = presetsList.bellSound.list.some(
    (bell) => !correctBellList.find((correct) => correct.name === bell.name)
  );

  if (needsMigration) {
    // Find currently active bell index
    const activeIndex = presetsList.bellSound.list.findIndex(
      (bell) => bell.statusActive
    );

    // Reset to correct bell list
    presetsList.bellSound.list = correctBellList;

    // Restore active state if valid index
    if (activeIndex >= 0 && activeIndex < correctBellList.length) {
      presetsList.bellSound.list.forEach((bell, i) => {
        bell.statusActive = i === activeIndex;
      });
      presetsList.bellSound.activePath = correctBellList[activeIndex].url;
    }
  }
}

// Data migration function to ensure background sound titles are in correct format
function migrateBackgroundSoundData() {
  const correctSoundList = [
    {
      soundTitle: 'forestWithBirds',
      url: '/media/sounds/nature/forest-with-birds.mp3',
      statusActive: true,
    },
    {
      soundTitle: 'waterInStream',
      url: '/media/sounds/nature/water-in-stream.mp3',
    },
    {
      soundTitle: 'riverWithBirds',
      url: '/media/sounds/nature/birds-with-river.mp3',
    },
    { soundTitle: 'birds', url: '/media/sounds/nature/birds.mp3' },
  ];

  // Mapping from translated titles back to keys (for migration)
  const titleKeyMap = {
    'Forest with Birds': 'forestWithBirds',
    'Water in Stream': 'waterInStream',
    'River with Birds': 'riverWithBirds',
    Birds: 'birds',
    // Add other language mappings if needed
    'पक्षियों के साथ जंगल': 'forestWithBirds',
    'नदी में पानी': 'waterInStream',
    'पक्षियों के साथ नदी': 'riverWithBirds',
    पक्षी: 'birds',
    'चराहरूसहित जङ्गल': 'forestWithBirds',
    'खोलामा पानी': 'waterInStream',
    'चराहरूसहित नदी': 'riverWithBirds',
    चराहरू: 'birds',
  };

  // Check if background sound titles need migration
  const needsMigration = presetsList.backgroundSound.sound.some(
    (sound) =>
      !correctSoundList.find(
        (correct) => correct.soundTitle === sound.soundTitle
      )
  );

  if (needsMigration) {
    // Find currently active sound index
    const activeIndex = presetsList.backgroundSound.sound.findIndex(
      (sound) => sound.statusActive
    );

    // Migrate each sound title if it's a translated value
    presetsList.backgroundSound.sound.forEach((sound, index) => {
      if (titleKeyMap[sound.soundTitle]) {
        sound.soundTitle = titleKeyMap[sound.soundTitle];
      }
    });

    // If no sound is marked as active, reset to correct structure
    if (
      activeIndex === -1 ||
      !presetsList.backgroundSound.sound[activeIndex] ||
      !correctSoundList.find(
        (correct) =>
          correct.soundTitle ===
          presetsList.backgroundSound.sound[activeIndex].soundTitle
      )
    ) {
      presetsList.backgroundSound.sound = correctSoundList;
      presetsList.backgroundSound.soundTitle = correctSoundList[0].soundTitle;
      presetsList.backgroundSound.activePath = correctSoundList[0].url;
    } else {
      // Update the main soundTitle if it was also translated
      const activeSound = presetsList.backgroundSound.sound[activeIndex];
      if (titleKeyMap[presetsList.backgroundSound.soundTitle]) {
        presetsList.backgroundSound.soundTitle =
          titleKeyMap[presetsList.backgroundSound.soundTitle];
      }
      // Ensure it matches the active sound's title
      presetsList.backgroundSound.soundTitle = activeSound.soundTitle;
    }
  }
}

// Init
onMounted(async () => {
  // Load quotes first
  await loadQuotes();

  const localData = localStorage.getItem('presetsList');
  if (localData !== null) {
    const parsed = JSON.parse(localData);
    Object.assign(presetsList, parsed);

    // Migrate bell sound data if needed
    migrateBellSoundData();

    // Migrate background sound data if needed
    migrateBackgroundSoundData();

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

// Watch for locale changes to reload quotes
watch(locale, async () => {
  await loadQuotes();
  // Update current quote if not running
  if (!isRunning.value) {
    quote.value = getQuote();
  }
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
