<script setup>
  import userStore from './store/userStore';
  // import data from '@/data/folders-data';
  // import Desc from '@/utils/desc';

  const store = userStore();

  onMounted(() => {
    document.querySelector(
      '#app'
    ).style.backgroundImage = `url("src/assets/img/setting/assetsImg/default/${store.getTheme}.jpg")`;
  });

  // const descs = (function () {
  //   const descs = [];
  //   data.forEach((desc) => {
  //     descs.push(new Desc(desc));
  //   });
  //   return descs;
  // })();
  // console.log(descs[0].children[0].getPath());
  // console.log(descs);
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
