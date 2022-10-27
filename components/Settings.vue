<template>
    <span
        class="text-2xl leading-none ml-6 cursor-pointer"
        :class="{ active: settingsActive }"
    >
        <i
            @click="settingsActive = !settingsActive"
            class="inline-block align-top"
        >
            <svg class="icon icon-settings">
                <use xlink:href="#icon-settings"></use>
            </svg>
        </i>
        <Transition>
            <span
                class="s-dropdown absolute z-10 pt-4 cursor-default -right-3 top-full"
                v-if="settingsActive"
            >
                <span
                    class="s-dd block rounded-md p-4 text-sm bg-black border-1 border-black min-w-[240px]"
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
                                >
                                    <label class="c-checkbox radio">
                                        {{
                                            capitalizeFirstLetter(
                                                instruction.language
                                            )
                                        }}
                                        Audio
                                        <input
                                            type="radio"
                                            name="instruction-type"
                                            :checked="index == 0"
                                            @change="
                                                selectInstructionAudio(index)
                                            "
                                        />
                                        <span class="checkmark"></span>
                                    </label>
                                    <div
                                        class="c-audio relative pt-4 pr-1 pb-9"
                                        v-if="
                                            customAudioActive &&
                                            presetsList.guidedInstruction
                                                .language.length ==
                                                index + 1
                                        "
                                    >
                                        <label
                                            for="custom-audio"
                                            class="btn-custom"
                                            >Select Audio</label
                                        >
                                        <input
                                            id="custom-audio"
                                            type="file"
                                            accept="audio/*"
                                            @change="setCustomAudio"
                                        />
                                        <span
                                            class="whitespace-no-wrap overflow-hidden block text-xs pt-3 text-ellipsis max-w-[130px]"
                                            v-if="!!customAudioFileName"
                                            >{{ customAudioFileName }}</span
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
            customAudioActive: false,
            customAudioFileName: null,
            guidedMeditationCheck: false
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
            this.customAudioActive =
                index == this.presetsList.guidedInstruction.language.length - 1
                    ? true
                    : false;
            this.presetsList.guidedInstruction.language.forEach(
                (elm, index) => {
                    if (elm.hasOwnProperty('statusActive'))
                        delete elm.statusActive;
                }
            );
            this.presetsList.guidedInstruction.language[
                index
            ].statusActive = true;
            this.presetsList.guidedInstruction.activePath =
                this.presetsList.guidedInstruction.language[index].url;
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
                this.customAudioFileName = file.name;
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

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}
.v-enter-active {
    opacity: 1;
}
.v-enter-from,
.v-leave-to {
    opacity: 0;
}
.s-dropdown {
    &:after {
        content: '';
        position: absolute;
        margin: 0 0 -16px;
        bottom: 100%;
        right: 14px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 8px 7px 8px;
        border-color: transparent transparent #fff transparent;
    }
}
.settings {
    i {
        transition: transform 0.25s ease;
    }
    &.active {
        i {
            transform: rotate(20deg);
        }
    }
}
</style>
