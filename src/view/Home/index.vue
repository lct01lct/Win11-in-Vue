<template>
  <div class="all">
    <div class="main">
      <IconOverlayTip></IconOverlayTip>
      <settingsVue></settingsVue>
      <Folder></Folder>
      <Start></Start>
      <!-- <Edge></Edge> -->
      <DeskTopIcon></DeskTopIcon>
      <Run></Run>
      <Terminal></Terminal>
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
  import Start from '@/component/Start/index.vue';
  import Run from '@/component/Run';
  import Terminal from '@/component/Terminal';

  // import Edge from '@/component/Edge/index.vue';
  import DeskTopIcon from '@/component/DeskTopIcon';
  import { getUsers } from './api';
  import IconOverlayTip from './IconOvelayTip';
  getUsers();

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Control') {
      console.log('control');
    }
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
