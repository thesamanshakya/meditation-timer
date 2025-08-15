<template>
  <span class="settings text-2xl leading-none ml-6 cursor-pointer relative">
    <i
      @click="settingsActive = !settingsActive"
      class="inline-block align-top transition-all hover:rotate-45 duration-300"
    >
      <svg class="icon icon-settings">
        <use xlink:href="#icon-settings"></use>
      </svg>
    </i>
    <Transition name="drawer">
      <div
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        v-if="settingsActive"
        @click.self="settingsActive = false"
      >
        <div
          class="drawer fixed top-0 right-0 bottom-0 w-full max-w-xs sm:max-w-sm bg-gradient-to-b from-[#1c1c2e] to-[#0f172a] shadow-2xl overflow-y-auto pb-10 transform transition-all duration-300 ease-in-out z-50 border-l border-white/5"
        >
          <div
            class="p-5 border-b border-white/10 flex items-center justify-between"
          >
            <h2 class="text-xl font-medium tracking-wide">
              {{ $t('settings.title') }}
            </h2>
            <button
              @click="settingsActive = false"
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
            <ul class="m-0 p-0 list-none space-y-8">
              <li>
                <label
                  class="c-checkbox flex items-center gap-3 justify-between w-full"
                >
                  <span class="text-lg font-medium tracking-wide">{{
                    $t('settings.guidedMeditation')
                  }}</span>
                  <div
                    class="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      class="absolute w-6 h-6 opacity-0 cursor-pointer"
                      v-model="guidedMeditationCheck"
                      @change="toggleInstructionAudio"
                    />
                    <span
                      class="absolute w-full h-full transition-all duration-300 ease-in-out bg-white/10 rounded-full shadow-inner"
                    ></span>
                    <span
                      class="absolute left-0 w-6 h-6 transition-all duration-300 transform bg-white rounded-full shadow-lg"
                      :class="{
                        'translate-x-6 bg-[#43e97b]': guidedMeditationCheck,
                      }"
                    ></span>
                  </div>
                </label>
                <div v-if="guidedMeditationCheck" class="mt-5">
                  <div
                    v-for="(instruction, index) in presetsList.guidedInstruction
                      .language"
                    :key="index"
                    class="mb-5"
                  >
                    <label
                      class="flex items-center gap-3 cursor-pointer text-base"
                    >
                      <input
                        type="radio"
                        :value="index"
                        v-model="presetsList.guidedInstruction.languageActive"
                        @change="selectInstructionAudio(index)"
                        class="hidden"
                      />
                      <span
                        class="w-5 h-5 rounded-full border-2 border-white/60 relative transition-all duration-200 flex items-center justify-center"
                        :class="{
                          'border-[#43e97b]':
                            presetsList.guidedInstruction.languageActive ===
                            index,
                        }"
                      >
                        <span
                          class="absolute w-0 h-0 bg-[#43e97b] rounded-full transition-all duration-200"
                          :class="{
                            'w-3 h-3':
                              presetsList.guidedInstruction.languageActive ===
                              index,
                          }"
                        ></span>
                      </span>
                      <span class="font-light tracking-wide"
                        >{{ capitalizeFirstLetter(instruction.language) }}
                        {{ $t('settings.audio') }}</span
                      >
                    </label>
                    <div
                      class="mt-4 ml-7"
                      v-if="
                        customAudioActive &&
                        presetsList.guidedInstruction.language.length ==
                          index + 1
                      "
                    >
                      <div class="flex gap-2">
                        <label
                          for="custom-audio"
                          class="flex-1 border border-white/40 rounded-lg text-sm leading-none bg-white/5 hover:bg-white/15 outline-none block px-5 py-4 cursor-pointer text-center transition-all duration-300 shadow-sm"
                        >
                          {{
                            !!presetsList.guidedInstruction.customAudioFileName
                              ? $t('settings.replaceAudio')
                              : $t('settings.selectAudio')
                          }}
                        </label>
                      </div>
                      <input
                        id="custom-audio"
                        type="file"
                        accept="audio/*"
                        class="hidden"
                        @change="setCustomAudio"
                      />
                      <span
                        class="whitespace-nowrap text-left overflow-hidden block text-xs pt-3 text-ellipsis text-white/60"
                        v-if="
                          !!presetsList.guidedInstruction.customAudioFileName
                        "
                        >{{
                          presetsList.guidedInstruction.customAudioFileName
                        }}</span
                      >
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <label
                  class="c-checkbox flex items-center gap-3 justify-between w-full"
                >
                  <span class="text-lg font-medium tracking-wide">{{
                    $t('settings.backgroundSounds')
                  }}</span>
                  <div
                    class="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      class="absolute w-6 h-6 opacity-0 cursor-pointer"
                      v-model="backgroundSoundCheck"
                      @change="toggleBackgroundSound"
                    />
                    <span
                      class="absolute w-full h-full transition-all duration-300 ease-in-out bg-white/10 rounded-full shadow-inner"
                    ></span>
                    <span
                      class="absolute left-0 w-6 h-6 transition-all duration-300 transform bg-white rounded-full shadow-lg"
                      :class="{
                        'translate-x-6 bg-[#43e97b]': backgroundSoundCheck,
                      }"
                    ></span>
                  </div>
                </label>
                <div v-if="backgroundSoundCheck" class="mt-5">
                  <div
                    v-for="(sound, index) in presetsList.backgroundSound.sound"
                    :key="index"
                    class="mb-5"
                  >
                    <label
                      class="flex items-center gap-3 cursor-pointer text-base"
                    >
                      <input
                        type="radio"
                        :value="index"
                        v-model="presetsList.backgroundSound.soundActive"
                        @change="selectBackgroundSound(index)"
                        class="hidden"
                      />
                      <span
                        class="w-5 h-5 rounded-full border-2 border-white/60 relative transition-all duration-200 flex items-center justify-center"
                        :class="{
                          'border-[#43e97b]':
                            presetsList.backgroundSound.soundActive === index,
                        }"
                      >
                        <span
                          class="absolute w-0 h-0 bg-[#43e97b] rounded-full transition-all duration-200"
                          :class="{
                            'w-3 h-3':
                              presetsList.backgroundSound.soundActive === index,
                          }"
                        ></span>
                      </span>
                      <span class="font-light tracking-wide">{{
                        $t(`backgroundSounds.${sound.soundTitle}`)
                      }}</span>
                    </label>
                  </div>
                </div>
              </li>

              <li>
                <label
                  class="c-checkbox flex items-center gap-3 justify-between w-full"
                >
                  <span class="text-lg font-medium tracking-wide">{{
                    $t('settings.intervalBell')
                  }}</span>
                  <div
                    class="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      class="absolute w-6 h-6 opacity-0 cursor-pointer"
                      v-model="presetsList.intervalBell"
                    />
                    <span
                      class="absolute w-full h-full transition-all duration-300 ease-in-out bg-white/10 rounded-full shadow-inner"
                    ></span>
                    <span
                      class="absolute left-0 w-6 h-6 transition-all duration-300 transform bg-white rounded-full shadow-lg"
                      :class="{
                        'translate-x-6 bg-[#43e97b]': presetsList.intervalBell,
                      }"
                    ></span>
                  </div>
                </label>
                <div v-if="presetsList.intervalBell" class="">
                  <p class="text-sm text-white/70">
                    {{
                      $t('settings.intervalBellDescription', {
                        time: Math.floor(presetsList.totalDurationInMins / 2),
                      })
                    }}
                  </p>
                </div>
              </li>

              <li>
                <label
                  class="c-checkbox flex items-center gap-3 justify-between w-full"
                >
                  <span class="text-lg font-medium tracking-wide">{{
                    $t('settings.endingBell')
                  }}</span>
                  <div
                    class="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      class="absolute w-6 h-6 opacity-0 cursor-pointer"
                      v-model="presetsList.endingBell.enabled"
                      @change="validateEndingBellTime"
                    />
                    <span
                      class="absolute w-full h-full transition-all duration-300 ease-in-out bg-white/10 rounded-full shadow-inner"
                    ></span>
                    <span
                      class="absolute left-0 w-6 h-6 transition-all duration-300 transform bg-white rounded-full shadow-lg"
                      :class="{
                        'translate-x-6 bg-[#43e97b]':
                          presetsList.endingBell.enabled,
                      }"
                    ></span>
                  </div>
                </label>
                <div v-if="presetsList.endingBell.enabled" class="mt-3">
                  <div class="flex items-center gap-3">
                    <label class="text-sm text-white/80 whitespace-nowrap">{{
                      $t('settings.ringAfter')
                    }}</label>
                    <div class="flex items-center gap-1">
                      <button
                        @click="decrementEndingBellTime"
                        class="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/30 rounded-l-md transition-colors"
                      >
                        <svg
                          class="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                      <input
                        type="number"
                        v-model.number="presetsList.endingBell.timeInMins"
                        min="1"
                        max="60"
                        class="w-12 px-1 py-1 -mx-1 h-8 text-center text-black text-sm border-t border-b border-white/30 bg-white/90 focus:bg-white focus:outline-none"
                        @input="validateEndingBellTime"
                        readonly
                      />
                      <button
                        @click="incrementEndingBellTime"
                        class="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/30 rounded-r-md transition-colors"
                      >
                        <svg
                          class="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <span class="text-sm text-white/80">{{
                      $t('settings.minutes')
                    }}</span>
                  </div>
                  <p class="text-xs text-white/60 mt-2">
                    {{
                      $t('settings.endingBellDescription', {
                        time: presetsList.endingBell.timeInMins,
                      })
                    }}
                  </p>
                </div>
              </li>

              <li>
                <div class="border-t border-white/10 pt-6">
                  <label class="text-lg font-medium tracking-wide block mb-4">
                    {{ $t('language.selectLanguage') }}
                  </label>
                  <div class="space-y-3">
                    <div
                      v-for="locale in availableLocales"
                      :key="locale.code"
                      class="flex items-center gap-3"
                    >
                      <label
                        class="flex items-center gap-3 cursor-pointer text-base flex-1"
                      >
                        <input
                          type="radio"
                          :value="locale.code"
                          v-model="selectedLanguage"
                          @change="switchLanguage(locale.code)"
                          class="hidden"
                        />
                        <span
                          class="w-5 h-5 rounded-full border-2 border-white/60 relative transition-all duration-200 flex items-center justify-center"
                          :class="{
                            'border-[#43e97b]':
                              selectedLanguage === locale.code,
                          }"
                        >
                          <span
                            class="absolute w-0 h-0 bg-[#43e97b] rounded-full transition-all duration-200"
                            :class="{
                              'w-3 h-3': selectedLanguage === locale.code,
                            }"
                          ></span>
                        </span>
                        <span class="font-light tracking-wide">{{
                          locale.name
                        }}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  </span>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  nextTick,
} from 'vue';

const props = defineProps({
  presetsList: {
    type: Object,
    required: true,
  },
});

const { proxy } = getCurrentInstance();
const { locale, locales, setLocale } = useI18n();

const selectedLanguage = ref(locale.value);
const availableLocales = computed(() => locales.value);

const settingsActive = ref(false);
const customAudioActive = ref(
  props.presetsList.guidedInstruction.languageActive ===
    props.presetsList.guidedInstruction.language.length - 1 ?? true
);
const guidedMeditationCheck = ref(
  props.presetsList.guidedInstruction.statusActive
);
const backgroundSoundCheck = ref(
  props.presetsList.backgroundSound.statusActive
);

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const toggleInstructionAudio = () => {
  props.presetsList.guidedInstruction.statusActive =
    !props.presetsList.guidedInstruction.statusActive;
  backgroundSoundCheck.value = false;
  props.presetsList.backgroundSound.statusActive = false;
};

const toggleBackgroundSound = () => {
  props.presetsList.backgroundSound.statusActive =
    !props.presetsList.backgroundSound.statusActive;
  guidedMeditationCheck.value = false;
  props.presetsList.guidedInstruction.statusActive = false;
};

const selectInstructionAudio = (index) => {
  let guidedInstruction = props.presetsList.guidedInstruction;
  customAudioActive.value =
    index == guidedInstruction.language.length - 1 ? true : false;
  guidedInstruction.language.forEach((elm, index) => {
    if (elm.hasOwnProperty('statusActive')) delete elm.statusActive;
  });
  guidedInstruction.language[index].statusActive = true;
  guidedInstruction.languageTitle = guidedInstruction.language[index].language;

  // If this is the custom audio option and we have custom audio data stored
  if (
    index == guidedInstruction.language.length - 1 &&
    guidedInstruction.customAudioData
  ) {
    guidedInstruction.activePath = guidedInstruction.customAudioData;
  } else {
    guidedInstruction.activePath = guidedInstruction.language[index].url;
  }

  // Save changes to localStorage
  saveToLocalStorage();

  nextTick();
};

const selectBackgroundSound = (index) => {
  let bgSound = props.presetsList.backgroundSound;
  bgSound.sound.forEach((elm, index) => {
    if (elm.hasOwnProperty('statusActive')) delete elm.statusActive;
  });
  bgSound.sound[index].statusActive = true;
  bgSound.soundTitle = bgSound.sound[index].soundTitle;
  bgSound.activePath = bgSound.sound[index].url;
  nextTick();
};

const setCustomAudio = (e) => {
  let files = e.target.files || e.dataTransfer.files;
  let guidedInstruction = props.presetsList.guidedInstruction;
  if (!files.length) return;
  let file = files[0],
    type = file.type,
    audio = document.createElement('audio');
  if (audio.canPlayType(type)) {
    // Create a unique ID for this audio file
    const audioId = 'custom-audio-' + new Date().getTime();

    // Create a blob URL for immediate use
    const blobUrl = URL.createObjectURL(file);

    // Store file metadata in presetsList (not the actual file)
    guidedInstruction.customAudioId = audioId;
    guidedInstruction.customAudioFileName = file.name;
    guidedInstruction.customAudioType = type;
    guidedInstruction.activePath = blobUrl; // For immediate playback
    guidedInstruction.languageTitle = file.name;

    // Store the file in IndexedDB
    storeAudioFile(audioId, file);

    // Save metadata to localStorage (not the actual file)
    saveToLocalStorage();

    // Force update to reflect changes immediately
    nextTick();
  } else {
    proxy.$toast.open({
      position: 'top',
      message: proxy.$t('settings.fileCannotBePlayed'),
      type: 'error',
    });
  }
};

const clearCustomAudio = () => {
  let guidedInstruction = props.presetsList.guidedInstruction;

  // If we have an audio ID, remove it from IndexedDB
  if (guidedInstruction.customAudioId) {
    removeAudioFile(guidedInstruction.customAudioId);
  }

  // Clear metadata
  guidedInstruction.customAudioId = null;
  guidedInstruction.customAudioFileName = null;
  guidedInstruction.customAudioType = null;

  // Reset to the default URL of the custom option (which is null)
  const customIndex = guidedInstruction.language.length - 1;
  guidedInstruction.activePath = guidedInstruction.language[customIndex].url;

  // Save changes to localStorage
  saveToLocalStorage();

  // Force update to reflect changes immediately
  nextTick();
};

const storeAudioFile = (id, file) => {
  // Open (or create) the IndexedDB database
  const request = indexedDB.open('MeditationTimerAudio', 1);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    // Create an object store if it doesn't exist
    if (!db.objectStoreNames.contains('audioFiles')) {
      db.createObjectStore('audioFiles', { keyPath: 'id' });
    }
  };

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(['audioFiles'], 'readwrite');
    const store = transaction.objectStore('audioFiles');

    // Store the file with its ID
    store.put({ id, file });
  };

  request.onerror = (event) => {
    console.error('IndexedDB error:', event.target.error);
    proxy.$toast.open({
      position: 'top',
      message: proxy.$t('settings.failedToSaveAudio'),
      type: 'error',
    });
  };
};

const removeAudioFile = (id) => {
  const request = indexedDB.open('MeditationTimerAudio', 1);

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(['audioFiles'], 'readwrite');
    const store = transaction.objectStore('audioFiles');

    // Delete the file with the given ID
    store.delete(id);
  };
};

const loadAudioFile = (id, callback) => {
  const request = indexedDB.open('MeditationTimerAudio', 1);

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(['audioFiles'], 'readonly');
    const store = transaction.objectStore('audioFiles');

    // Get the file with the given ID
    const getRequest = store.get(id);

    getRequest.onsuccess = (event) => {
      if (event.target.result) {
        const { file } = event.target.result;
        callback(file);
      } else {
        console.error('Audio file not found in IndexedDB');
        callback(null);
      }
    };

    getRequest.onerror = (event) => {
      console.error('Error loading audio file:', event.target.error);
      callback(null);
    };
  };

  request.onerror = (event) => {
    console.error('IndexedDB error:', event.target.error);
    callback(null);
  };
};

const validateEndingBellTime = () => {
  // Ensure ending bell time is valid (between 1 and 60)
  if (props.presetsList.endingBell.timeInMins < 1) {
    props.presetsList.endingBell.timeInMins = 1;
  } else if (props.presetsList.endingBell.timeInMins > 60) {
    props.presetsList.endingBell.timeInMins = 60;
  }
  saveToLocalStorage();
};

const incrementEndingBellTime = () => {
  if (props.presetsList.endingBell.timeInMins < 60) {
    props.presetsList.endingBell.timeInMins++;
    saveToLocalStorage();
  }
};

const decrementEndingBellTime = () => {
  if (props.presetsList.endingBell.timeInMins > 1) {
    props.presetsList.endingBell.timeInMins--;
    saveToLocalStorage();
  }
};

const saveToLocalStorage = () => {
  // Create a copy of presetsList without any blob URLs or large data
  const presetsToSave = JSON.parse(JSON.stringify(props.presetsList));

  // Save metadata to localStorage (not the actual file or blob URLs)
  localStorage.setItem('presetsList', JSON.stringify(presetsToSave));
};

const switchLanguage = (localeCode) => {
  setLocale(localeCode);
  selectedLanguage.value = localeCode;
};

const clickOutsideClose = (e) => {
  if (!proxy.$el.contains(e.target)) {
    settingsActive.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', clickOutsideClose);

  // If we have a custom audio ID and it's the active option, load the audio file
  if (
    props.presetsList.guidedInstruction.customAudioId &&
    props.presetsList.guidedInstruction.languageActive ===
      props.presetsList.guidedInstruction.language.length - 1
  ) {
    loadAudioFile(props.presetsList.guidedInstruction.customAudioId, (file) => {
      if (file) {
        // Create a blob URL for the file
        const blobUrl = URL.createObjectURL(file);
        props.presetsList.guidedInstruction.activePath = blobUrl;
        nextTick();
      }
    });
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('click', clickOutsideClose);
});
</script>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-from .drawer,
.drawer-leave-to .drawer {
  transform: translateX(100%);
}

.drawer {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  letter-spacing: 0.015em;
}

.drawer h2 {
  letter-spacing: 0.01em;
}
</style>
