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
    bottom: 48px;
    right: 0;
    width: 400px;
    height: 600px;
    background: #242624;
  }
</style>
