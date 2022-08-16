<script setup>
  const selectedDay = ref('');
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
    background: #fff;
  }
</style>
