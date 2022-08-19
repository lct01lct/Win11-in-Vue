<template>
  <div class="all" @contextmenu.prevent="showMainMenu($event)" @click="initDeskTop">
    <div class="main">
      <Menu ref="menuRef"></Menu>
      <IconOverlayTip></IconOverlayTip>
      <SettingsVue></SettingsVue>
      <Folder></Folder>
      <Start></Start>
      <!-- <Edge></Edge> -->
      <DeskTopIcon></DeskTopIcon>
    </div>
    <div class="bar">
      <TaskBarVue></TaskBarVue>
    </div>
  </div>
</template>

<script setup>
  import SettingsVue from '@/component/setting/index.vue';
  import TaskBarVue from '@/component/taskBar/taskBar.vue';
  import Folder from '@/component/Folder/index.vue';
  import Start from '@/component/Start/index.vue';
  import Menu from './Menu';

  // import Edge from '@/component/Edge/index.vue';
  import DeskTopIcon from '@/component/DeskTopIcon';
  import { getUsers } from './api';
  import IconOverlayTip from './IconOvelayTip';
  import useMenuStore from './Menu/store/menuStore';

  getUsers();

  const menuStore = useMenuStore();

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  const initDeskTop = () => {
    menuStore.setMenuVisible(false);
  };

  const menuRef = ref(null);
  const showMainMenu = (e) => {
    menuRef.value.setMenu(e, 'blank');
  };
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
