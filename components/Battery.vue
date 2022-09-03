<template>
    <span class="battery-wrap">
        <span>{{ battPercent }}</span>
        <i class="battery"><span :style="{ width: battPercent }"></span></i>
    </span>
</template>

<script>
export default {
    data() {
        return {
            battPercent: ''
        };
    },
    methods: {
        readBattery(b) {
            let battery = b || battery;
            this.battPercent =
                parseFloat((battery.level * 100).toFixed(2)) + '%';
        },
        getBatteryLevels(b) {
            this.readBattery(b);
            setInterval(() => {
                this.readBattery(b);
            }, 5000);
        }
    },
    mounted() {
        navigator.battery
            ? this.getBatteryLevels(navigator.battery)
            : navigator.getBattery
            ? navigator.getBattery().then(this.getBatteryLevels)
            : '';
    }
};
</script>

<style lang="scss" scoped>
.battery-wrap {
    @extend %flexcenter;
    > span {
        font-size: 15px;
        margin-right: 8px;
    }
}
.battery {
    position: relative;
    border: 2px solid #fff;
    width: 35px;
    height: 20px;
    border-radius: 3px;
    > span,
    &:after {
        content: '';
        display: block;
        background: #fff;
        position: absolute;
    }
    > span {
        height: 16px;
        border: 2px solid #000;
        width: 0;
        top: 0;
        left: 0;
        transition: width 0.25s ease;
    }
    &:after {
        width: 3px;
        height: 10px;
        top: 50%;
        right: -5px;
        margin-top: -6px;
        border-radius: 0 3px 3px 0;
    }
}
</style>