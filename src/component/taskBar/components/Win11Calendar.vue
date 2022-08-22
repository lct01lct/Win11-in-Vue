<script setup>
  const selectedDay = ref('');
  watch(selectedDay, () => {
    console.log(selectedDay.value);
  });
</script>

<template>
  <div class="calendar-wrapper">
    <Calendar v-model="selectedDay"></Calendar>
  </div>
</template>

<style scoped>
  .calendar-wrapper {
    position: fixed;
    bottom: 55px;
    right: 8px;
    width: 394px;
    height: 505px;
    background: #eff0f0;
    border-radius: 6px;
  }
</style>
