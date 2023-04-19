<template>
  <div class="all" @contextmenu.prevent="showMainMenu($event)" @click="initDeskTop">
    <!-- <div class="main"> -->
    <!-- <Menu ref="menuRef"></Menu> -->
    <!-- <IconOverlayTip></IconOverlayTip> -->
    <!-- <SettingsVue></SettingsVue> -->
    <!-- <Folder></Folder> -->
    <!-- <Edge></Edge> -->
    <!-- <LeftPane></LeftPane> -->
    <!-- <DeskTopIcon></DeskTopIcon> -->
    <!-- <Terminal></Terminal> -->
    <!-- </div> -->
    <div class="bar">
      <TaskBarVue></TaskBarVue>
    </div>
    <Index />
  </div>
</template>

<script setup>
  import { scheduler } from '../../scheduler';
  import DeskTopIcon from '@/component/DeskTopIcon';
  import IconOverlayTip from './IconOvelayTip';
  import LeftPane from '@/component/LeftPane/LeftPane.vue';
  import Index from './index.jsx';
  import useCompScheduler from '@/store/componentScheduler';
  import TaskBarVue from '@/component/taskBar/taskBar.vue'
  

  import Menu from './Menu';
  const store = useCompScheduler();

  onMounted(() => {
    store.cacheScheduler(scheduler)
  }),
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // const initDeskTop = () => {
  //   menuStore.setMenuVisible(false);
  // };

  // const menuRef = ref(null);
  // const showMainMenu = (e) => {
  //   menuRef.value.setMenu(e, 'blank');
  // };

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
      position: absolute;
      bottom: 0;
      height: 48px;
      width: 100%;
    }
  }
</style>
