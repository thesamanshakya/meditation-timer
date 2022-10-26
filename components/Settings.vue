<template>
    <span class="settings" :class="{ active: settingsActive }">
        <i @click="settingsActive = !settingsActive">
            <svg class="icon icon-settings">
                <use xlink:href="#icon-settings"></use>
            </svg>
        </i>
        <Transition>
            <span class="s-dropdown" v-if="settingsActive">
                <span class="s-dd">
                    <ul>
                        <li>
                            <label class="c-checkbox"
                                >Guided Meditation
                                <input
                                    type="checkbox"
                                    v-model="guidedMeditationCheck"
                                    @change="toggleInstructionAudio"
                                />
                                <span class="checkmark"></span>
                            </label>
                            <ul v-if="guidedMeditationCheck">
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
                                        class="c-audio"
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
                                        <span class="current-audio" v-if="!!customAudioFileName">{{
                                            customAudioFileName
                                        }}</span>
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
    position: absolute;
    right: -10px;
    top: 100%;
    z-index: 10;
    padding-top: 15px;
    // display: none;
    cursor: default;
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
    ul {
        @extend %listreset;
        margin-bottom: -14px;
        li {
            margin-bottom: 17px;
        }
        ul {
            padding-left: 35px;
            padding-top: 15px;
        }
    }
}
.s-dd {
    display: block;
    background: #000;
    border: 1px solid #fff;
    border-radius: 7px;
    padding: 17px;
    font-size: 14px;
    line-height: 20px;
    // min-width: 225px;
    min-width: 240px;
}
.settings {
    font-size: 23px;
    line-height: 1;
    margin-left: 25px;
    cursor: pointer;
    i {
        display: inline-block;
        vertical-align: top;
        transition: transform 0.25s ease;
    }
    &.active {
        i {
            transform: rotate(20deg);
        }
    }
}
</style>
