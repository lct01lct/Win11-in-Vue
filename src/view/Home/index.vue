<template>
  <div class="all">
    <div class="main">
<<<<<<< HEAD
=======
      <DeskTopIcon></DeskTopIcon>
      <IconOverlayTip></IconOverlayTip>
>>>>>>> 556e440f1f1addf7291b64515be17812a85d8fcf
      <settingsVue></settingsVue>
      <Folder></Folder>
      <!-- <Edge></Edge> -->
      <DeskTopIcon></DeskTopIcon>
    </div>
    <div class="bar">
      <taskBarVue></taskBarVue>
    </div>
  </div>
</template>

<script setup>
  import settingsVue from '@/component/setting/index.vue';
  import taskBarVue from '@/component/taskBar/taskBar.vue';
  import Folder from '@/component/Folder/index.vue';
  // import Edge from '@/component/Edge/index.vue';
  import DeskTopIcon from '@/component/DeskTopIcon';
<<<<<<< HEAD
  import { getUsers } from './api';
  getUsers();
=======
  import IconOverlayTip from './IconOvelayTip';
>>>>>>> 556e440f1f1addf7291b64515be17812a85d8fcf

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }
  .all {
    width: 100vw;
    height: 100vh;

    .main {
      height: calc(100% - 48px);
      width: 100%;
    }
    .bar {
      height: 48px;
      width: 100%;
    }
  }
</style>
