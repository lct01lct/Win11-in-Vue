<script setup>
  import ContextMenu from '@/component/ContextMenu/index.vue';

  const contextmenu = ref(false);
  const position = reactive({ x: 0, y: 0 });
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    position.x = e.x;
    position.y = e.y;
    contextmenu.value = true;
    setTimeout(() => {
      contextmenu.value = false;
    },2000)
  });
</script>

<template>
  <ContextMenu v-if="contextmenu" :position="position"></ContextMenu>
  <router-view></router-view>
</template>

<style lang="scss">
body{
  overflow: hidden;
}
#app{
  width: 100vw;
  height: 100vh;
  background: url('@/assets/img/setting/assetsImg/default/default.jpg');
  background-size: 100% 100%;
  background-attachment: fixed;
  overflow: hidden;
}
</style>
