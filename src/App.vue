<script setup>
  import userStore from '@/store/userStore';
  import { getSrcSettingTheme } from '@/utils/getSrc';

  const store = userStore();

  onMounted(() => {
    document.querySelector('#app').style.backgroundImage = `url(${getSrcSettingTheme(
      `${store.getTheme}.jpg`
    )})`;
  });
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
  body {
    overflow: hidden;
  }
  #app {
    width: 100vw;
    height: 100vh;
    background-size: 100% 100%;
    background-attachment: fixed;
    overflow: hidden;
    transition: 0.8s;
  }

</style>
