<template>
    <span class="settings text-2xl leading-none ml-6 cursor-pointer relative">
        <i @click="settingsActive = !settingsActive"
            class="inline-block align-top transition-all hover:rotate-45 duration-300">
            <svg class="icon icon-settings">
                <use xlink:href="#icon-settings"></use>
            </svg>
        </i>
        <Transition name="drawer">
            <div class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" v-if="settingsActive"
                @click.self="settingsActive = false">
                <div
                    class="drawer fixed top-0 right-0 bottom-0 w-full max-w-xs sm:max-w-sm bg-gradient-to-b from-[#1c1c2e] to-[#0f172a] shadow-2xl overflow-y-auto pb-10 transform transition-all duration-300 ease-in-out z-50 border-l border-white/5">
                    <div class="p-5 border-b border-white/10 flex items-center justify-between">
                        <h2 class="text-xl font-medium tracking-wide">Settings</h2>
                        <button @click="settingsActive = false"
                            class="text-white/60 hover:text-white transition-colors p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="p-5">
                        <ul class="m-0 p-0 list-none space-y-8">
                            <li>
                                <label class="c-checkbox flex items-center gap-3 justify-between w-full">
                                    <span class="text-lg font-medium tracking-wide">Guided Meditation</span>
                                    <div
                                        class="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                                        <input type="checkbox" class="absolute w-6 h-6 opacity-0 cursor-pointer"
                                            v-model="guidedMeditationCheck" @change="toggleInstructionAudio" />
                                        <span
                                            class="absolute w-full h-full transition-all duration-300 ease-in-out bg-white/10 rounded-full shadow-inner"></span>
                                        <span
                                            class="absolute left-0 w-6 h-6 transition-all duration-300 transform bg-white rounded-full shadow-lg"
                                            :class="{ 'translate-x-6 bg-[#43e97b]': guidedMeditationCheck }"></span>
                                    </div>
                                </label>
                                <div v-if="guidedMeditationCheck" class="mt-5">
                                    <div v-for="(instruction, index) in presetsList.guidedInstruction.language"
                                        :key="index" class="mb-5">
                                        <label class="flex items-center gap-3 cursor-pointer text-base">
                                            <input type="radio" :value="index"
                                                v-model="presetsList.guidedInstruction.languageActive"
                                                @change="selectInstructionAudio(index)" class="hidden" />
                                            <span
                                                class="w-5 h-5 rounded-full border-2 border-white/60 relative transition-all duration-200 flex items-center justify-center"
                                                :class="{ 'border-[#43e97b]': presetsList.guidedInstruction.languageActive === index }">
                                                <span
                                                    class="absolute w-0 h-0 bg-[#43e97b] rounded-full transition-all duration-200"
                                                    :class="{ 'w-3 h-3': presetsList.guidedInstruction.languageActive === index }"></span>
                                            </span>
                                            <span class="font-light tracking-wide">{{
                                                capitalizeFirstLetter(instruction.language) }} Audio</span>
                                        </label>
                                        <div class="mt-4 ml-7"
                                            v-if="customAudioActive && presetsList.guidedInstruction.language.length == index + 1">
                                            <label for="custom-audio"
                                                class="border border-white/40 rounded-lg text-sm leading-none bg-white/5 hover:bg-white/15 outline-none block px-5 py-3 cursor-pointer text-center transition-all duration-300 shadow-sm">Select
                                                Audio</label>
                                            <input id="custom-audio" type="file" accept="audio/*" class="hidden"
                                                @change="setCustomAudio" />
                                            <span
                                                class="whitespace-nowrap text-left overflow-hidden block text-xs pt-3 text-ellipsis text-white/60"
                                                v-if="!!presetsList.guidedInstruction.customAudioFileName">{{
                                                    presetsList.guidedInstruction.customAudioFileName }}</span>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <label class="c-checkbox flex items-center gap-3 justify-between w-full">
                                    <span class="text-lg font-medium tracking-wide">Background Sounds</span>
                                    <div
                                        class="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                                        <input type="checkbox" class="absolute w-6 h-6 opacity-0 cursor-pointer"
                                            v-model="backgroundSoundCheck" @change="toggleBackgroundSound" />
                                        <span
                                            class="absolute w-full h-full transition-all duration-300 ease-in-out bg-white/10 rounded-full shadow-inner"></span>
                                        <span
                                            class="absolute left-0 w-6 h-6 transition-all duration-300 transform bg-white rounded-full shadow-lg"
                                            :class="{ 'translate-x-6 bg-[#43e97b]': backgroundSoundCheck }"></span>
                                    </div>
                                </label>
                                <div v-if="backgroundSoundCheck" class="mt-5">
                                    <div v-for="(sound, index) in presetsList.backgroundSound.sound" :key="index"
                                        class="mb-5">
                                        <label class="flex items-center gap-3 cursor-pointer text-base">
                                            <input type="radio" :value="index"
                                                v-model="presetsList.backgroundSound.soundActive"
                                                @change="selectBackgroundSound(index)" class="hidden" />
                                            <span
                                                class="w-5 h-5 rounded-full border-2 border-white/60 relative transition-all duration-200 flex items-center justify-center"
                                                :class="{ 'border-[#43e97b]': presetsList.backgroundSound.soundActive === index }">
                                                <span
                                                    class="absolute w-0 h-0 bg-[#43e97b] rounded-full transition-all duration-200"
                                                    :class="{ 'w-3 h-3': presetsList.backgroundSound.soundActive === index }"></span>
                                            </span>
                                            <span class="font-light tracking-wide">{{ sound.soundTitle }}</span>
                                        </label>
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

<script>
export default {
    props: ['presetsList'],
    data() {
        return {
            settingsActive: false,
            customAudioActive:
                this.presetsList.guidedInstruction.languageActive ===
                this.presetsList.guidedInstruction.language.length - 1 ??
                true,
            guidedMeditationCheck:
                this.presetsList.guidedInstruction.statusActive,
            backgroundSoundCheck: this.presetsList.backgroundSound.statusActive
        };
    },
    methods: {
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        toggleInstructionAudio() {
            this.presetsList.guidedInstruction.statusActive =
                !this.presetsList.guidedInstruction.statusActive;
            this.backgroundSoundCheck = false;
            this.presetsList.backgroundSound.statusActive = false;
        },
        toggleBackgroundSound() {
            this.presetsList.backgroundSound.statusActive =
                !this.presetsList.backgroundSound.statusActive;
            this.guidedMeditationCheck = false;
            this.presetsList.guidedInstruction.statusActive = false;
        },
        selectInstructionAudio(index) {
            let guidedInstruction = this.presetsList.guidedInstruction;
            this.customAudioActive =
                index == guidedInstruction.language.length - 1 ? true : false;
            guidedInstruction.language.forEach((elm, index) => {
                if (elm.hasOwnProperty('statusActive')) delete elm.statusActive;
            });
            guidedInstruction.language[index].statusActive = true;
            guidedInstruction.languageTitle =
                guidedInstruction.language[index].language;
            guidedInstruction.activePath =
                guidedInstruction.language[index].url;
            this.$forceUpdate();
        },
        selectBackgroundSound(index) {
            let bgSound = this.presetsList.backgroundSound;
            bgSound.sound.forEach((elm, index) => {
                if (elm.hasOwnProperty('statusActive')) delete elm.statusActive;
            });
            bgSound.sound[index].statusActive = true;
            bgSound.soundTitle = bgSound.sound[index].soundTitle;
            bgSound.activePath = bgSound.sound[index].url;
            this.$forceUpdate();
        },
        setCustomAudio(e) {
            let files = e.target.files || e.dataTransfer.files;
            let guidedInstruction = this.presetsList.guidedInstruction;
            if (!files.length) return;
            let file = files[0],
                type = file.type,
                audio = document.createElement('audio');
            if (audio.canPlayType(type)) {
                guidedInstruction.activePath = URL.createObjectURL(file);
                guidedInstruction.customAudioFileName = file.name;
                guidedInstruction.languageTitle = file.name;
            } else {
                this.$toast.open({
                    position: 'top',
                    message: 'Sorry, this file cannot be played!',
                    type: 'error'
                });
            }
        },
        clickOutsideClose(e) {
            if (!this.$el.contains(e.target)) {
                this.settingsActive = false;
            }
        }
    },
    mounted() {
        document.addEventListener('click', this.clickOutsideClose);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.clickOutsideClose);
    }
};
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
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    letter-spacing: 0.015em;
}

.drawer h2 {
    letter-spacing: 0.01em;
}
</style>
