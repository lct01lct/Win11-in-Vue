<script setup>
  // import ContextMenu from '@/component/ContextMenu/index.vue';
  import userStore from './store/userStore';
  import data from '@/data/folders-data';
  import Desc from '@/utils/desc';

  const store = userStore();

  const contextmenu = ref(false);
  const position = reactive({ x: 0, y: 0 });
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    position.x = e.x;
    position.y = e.y;
    contextmenu.value = true;
    setTimeout(() => {
      contextmenu.value = false;
    }, 2000);
  });

  onMounted(() => {
    document.querySelector(
      '#app'
    ).style.backgroundImage = `url("src/assets/img/setting/assetsImg/default/${store.getTheme}.jpg")`;
  });

  const descs = (function () {
    const descs = [];
    data.forEach((desc) => {
      descs.push(new Desc(desc));
    });
    return descs;
  })();

  console.log(descs);
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
    // background: url('@/assets/img/setting/assetsImg/default/default.jpg');
    background-size: 100% 100%;
    background-attachment: fixed;
    overflow: hidden;
    transition: 0.8s;
  }
</style>
