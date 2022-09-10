export const state = () => ({
    presetsList: {
        isRunning: false,
        totalDurationInMins: 10,
        intervalBell: false,
        guidedInstruction: {
            statusActive: false,
            language: [
                {
                    language: 'english',
                    url: '~/assets/media/instructions/anapana/english.mp3',
                    statusActive: true
                },
                {
                    language: 'hindi',
                    url: '~/assets/media/instructions/anapana/hindi.mp3'
                },
                {
                    language: 'nepali',
                    url: '~/assets/media/instructions/anapana/nepali.mp3'
                },
                {
                    language: 'custom',
                    url: '~/assets/media/instructions/anapana/custom.mp3'
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
        bellSound: [
            {
                name: 'Gong 1',
                url: '~/assets/media/bell/gong-1.mp3',
                statusActive: true
            },
            {
                name: 'Gong 2',
                url: '~/assets/media/bell/gong-2.mp3'
            },
            {
                name: 'Gong 3',
                url: '~/assets/media/bell/gong-3.mp3'
            },
            {
                name: 'S.N Goenka',
                url: '~/assets/media/bell/sn-goenka.mp3'
            }
        ]
    }
});

export const mutations = {
    SELECT_TIME_LIST(state, index) {
        state.presetsList.time.forEach((elm, index) => {
            if (elm.hasOwnProperty('statusActive')) delete elm.statusActive;
        });
        state.presetsList.time[index].statusActive = true;
    },
    SELECT_BELL_LIST(state, index) {
        state.presetsList.bellSound.forEach((elm, index) => {
            if (elm.hasOwnProperty('statusActive')) delete elm.statusActive;
        });
        state.presetsList.bellSound[index].statusActive = true;
    },
    SELECT_TOTAL_DURATION(state, duration) {
        state.presetsList.totalDurationInMins = duration;
    },
    TOGGLE_INTERVAL_BELL(state) {
        state.presetsList.intervalBell = !state.presetsList.intervalBell;
    },
    ADD_EXTRA_DURATION(state, extraTime) {
        state.presetsList.totalDurationInMins += extraTime;
    },
    TOGGLE_INSTRUCTION_AUDIO(state) {
        state.presetsList.guidedInstruction.statusActive =
            !state.presetsList.guidedInstruction.statusActive;
    },
    SELECT_INSTRUCTION_AUDIO(state, index) {
        state.presetsList.guidedInstruction.language.forEach((elm, index) => {
            if (elm.hasOwnProperty('statusActive')) delete elm.statusActive;
        });
        state.presetsList.guidedInstruction.language[index].statusActive = true;
    }
};
