export const state = () => ({
    presets: {
        durationInMins: 60,
        extraTime: 0,
        intervalBell: false,
        instructionAudio: false,
        instructionType: 0,
        customAudio: false,
        bell: 0
    },
    presetsList: {
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
    updatePresets(state, index) {
        state.presetsList.time.forEach((elm, index) => {
            if (elm.statusActive) delete elm.statusActive;
        });
        state.presetsList.time[index].statusActive = true;
    }
};
