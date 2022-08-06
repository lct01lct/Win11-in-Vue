<template>
<<<<<<< HEAD
  <div>
=======
  <ContextMenu v-if="contextmenu" :position="position"></ContextMenu>
  <div class="root">
    <settingsVue></settingsVue>
>>>>>>> 3250c854acdd3a835cd91d2fef44de023657cb79
    <taskBarVue></taskBarVue>
    <settingsVue></settingsVue>
    <Folder></Folder>
    <Edge></Edge>
  </div>
</template>

<script setup>
  import settingsVue from '@/component/setting/index.vue';
  import taskBarVue from '@/component/taskBar/taskBar.vue';
<<<<<<< HEAD
  import Folder from '@/component/Folder/index.vue';
  import Edge from '@/component/Edge/index.vue';
=======
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
>>>>>>> 3250c854acdd3a835cd91d2fef44de023657cb79
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }
</style>
