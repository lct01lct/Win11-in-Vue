<script setup>
  defineProps({
    icon: {
      type: String,
      default: 'explorer.png',
    },
    name: {
      type: String,
      default: '新建文件夹',
    },
    data: {
      type: Object,
      default: () => {},
    },
  });
</script>

<template>
  <img :src="`src/assets/img/icon/${icon}`" draggable="false" />
  <span>{{ name }}</span>
</template>

<style scoped></style>
