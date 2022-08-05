<template>
  <ContextMenu v-if="contextmenu" :position="position"></ContextMenu>
  <div class="root">
    <settingsVue></settingsVue>
    <taskBarVue></taskBarVue>
  </div>
</template>

<script setup>
  import settingsVue from '@/component/setting/index.vue';
  import taskBarVue from '@/component/taskBar/taskBar.vue';
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
    }, 2000);
  });
</script>

<style lang="scss" scoped>
  .root {
    background-image: url(@/assets/img/mainPage/win10.png);

    min-width: 100vw;
    min-height: 100vh;

    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  * {
    box-sizing: border-box;
  }
</style>
