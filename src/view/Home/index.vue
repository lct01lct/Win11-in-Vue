<template>
  <div class="all">
    <div class="main">
      <DeskTopIcon></DeskTopIcon>
      <settingsVue></settingsVue>
      <Folder></Folder>
      fff
      <Start></Start>
      <!-- <Edge></Edge> -->
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

  // import Edge from '@/component/Edge/index.vue';
  import DeskTopIcon from '@/component/DeskTopIcon';
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }
  .all {
    width: 100vw;
    height: 100vh;

    .main {
      // display: flex;
      // flex-direction: column;
      // justify-content: flex-start;
      // align-content: flex-start;
      // flex-wrap: wrap;
      height: calc(100% - 48px);
      width: 100%;
    }
    .bar {
      height: 48px;
      width: 100%;
    }
  }
</style>
