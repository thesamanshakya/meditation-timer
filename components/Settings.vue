<template>
    <span class="settings text-2xl leading-none ml-6 cursor-pointer relative">
        <i
            @click="settingsActive = !settingsActive"
            class="inline-block align-top transition-all"
        >
            <svg class="icon icon-settings">
                <use xlink:href="#icon-settings"></use>
            </svg>
        </i>
        <Transition>
            <span
                class="s-dropdown absolute z-10 pt-4 cursor-default -right-3 top-full after:content-[''] after:absolute after:-mb-4 after:bottom-full after:right-[14px] after:w-0 after:h-0 after:border-8 after:border-transparent after:border-b-white"
                v-if="settingsActive"
            >
                <span
                    class="s-dd block rounded-md p-4 text-sm bg-black border border-white min-w-[240px]"
                >
                    <ul class="m-0 p-0 list-none -mb-3">
                        <li class="mb-4">
                            <label class="c-checkbox"
                                >Guided Meditation
                                <input
                                    type="checkbox"
                                    v-model="guidedMeditationCheck"
                                    @change="toggleInstructionAudio"
                                />
                                <span class="checkmark"></span>
                            </label>
                            <ul v-if="guidedMeditationCheck" class="pl-9 pt-4">
                                <li
                                    v-for="(instruction, index) in presetsList
                                        .guidedInstruction.language"
                                    :key="index"
                                    class="mb-4"
                                >
                                    <label class="c-checkbox">
                                        {{
                                            capitalizeFirstLetter(
                                                instruction.language
                                            )
                                        }}
                                        Audio
                                        <input
                                            type="radio"
                                            :value="index"
                                            v-model="
                                                presetsList.guidedInstruction
                                                    .languageActive
                                            "
                                            @change="
                                                selectInstructionAudio(index)
                                            "
                                        />
                                        <span class="checkmark"></span>
                                    </label>
                                    <div
                                        class="relative pt-4 pr-1 pb-1 before:w-6 before:h-6 before:absolute before:border-t before:border-r before:rounded-tr-md before:right-4 before:-top-2 before:content-['']"
                                        v-if="
                                            customAudioActive &&
                                            presetsList.guidedInstruction
                                                .language.length ==
                                                index + 1
                                        "
                                    >
                                        <label
                                            for="custom-audio"
                                            class="border-2 border-white rounded-[30px] text-sm leading-none text-white bg-transparent outline-none block px-3 py-3 cursor-pointer text-center -mb-[7px] hover:bg-white hover:text-black"
                                            >Select Audio</label
                                        >
                                        <input
                                            id="custom-audio"
                                            type="file"
                                            accept="audio/*"
                                            class="hidden"
                                            @change="setCustomAudio"
                                        />
                                        <span
                                            class="whitespace-no-wrap text-center overflow-hidden block text-xs pt-3 text-ellipsis max-w-[165px]"
                                            v-if="
                                                !!presetsList.guidedInstruction
                                                    .customAudioFileName
                                            "
                                            >{{
                                                presetsList.guidedInstruction
                                                    .customAudioFileName
                                            }}</span
                                        >
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </span>
            </span>
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
                this.presetsList.guidedInstruction.statusActive
        };
    },
    methods: {
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        toggleInstructionAudio() {
            this.presetsList.guidedInstruction.statusActive =
                !this.presetsList.guidedInstruction.statusActive;
        },
        selectInstructionAudio(index) {
            const preset = this.presetsList.guidedInstruction;
            this.customAudioActive =
                index == preset.language.length - 1 ? true : false;
            preset.language.forEach((elm, index) => {
                if (elm.hasOwnProperty('statusActive')) delete elm.statusActive;
            });
            preset.language[index].statusActive = true;
            preset.languageTitle = preset.language[index].language;
            preset.activePath = preset.language[index].url;
            this.$forceUpdate();
        },
        clickOutsideClose(e) {
            if (!this.$el.contains(e.target)) {
                this.settingsActive = false;
            }
        },
        setCustomAudio(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            let file = files[0],
                type = file.type,
                audio = document.createElement('audio');
            if (audio.canPlayType(type)) {
                this.presetsList.guidedInstruction.activePath =
                    URL.createObjectURL(file);
                this.presetsList.guidedInstruction.customAudioFileName =
                    file.name;
                this.presetsList.guidedInstruction.languageTitle = file.name;
            } else {
                this.$toast.open({
                    position: 'top',
                    message: 'Sorry, this file cannot be played!',
                    type: 'error'
                });
            }
        }
    },
    mounted() {
        document.addEventListener('click', this.clickOutsideClose);
    },
    destroyed() {
        document.removeEventListener('click', this.clickOutsideClose);
    }
};
</script>
