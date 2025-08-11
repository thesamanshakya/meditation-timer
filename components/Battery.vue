<template>
  <span class="battery-wrap flex items-center">
    <span class="text-base mr-2">{{ battPercent }}</span>
    <i
      class="battery relative border-2 border-white w-9 h-5 rounded-sm after:w-[3px] after:h-[10px] after:top-1/2 after:-right-[5px] after:-mt-[5px] after:content-[''] after:block after:absolute after:bg-white after:rounded-tr-md after:rounded-br-md"
      ><span
        class="h-[17px] w-0 top-0 left-0 transition-all absolute bg-white"
        :style="{ width: battPercent }"
      ></span
    ></i>
  </span>
</template>
<script setup>
const battPercent = ref('');

const readBattery = (b) => {
  let battery = b || battery;
  battPercent.value = parseFloat((battery.level * 100).toFixed(2)) + '%';
};

const getBatteryLevels = (b) => {
  readBattery(b);
  setInterval(() => {
    readBattery(b);
  }, 5000);
};

onMounted(() => {
  navigator.battery
    ? getBatteryLevels(navigator.battery)
    : navigator.getBattery
    ? navigator.getBattery().then(getBatteryLevels)
    : '';
});
</script>
