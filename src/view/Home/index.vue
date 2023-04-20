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
      <TaskBarVue :list="computeComponents"></TaskBarVue>
    </div>
    <Index :list="components.renderList"/>
  </div>
</template>

<script setup>
  import { Scheduler } from '../../scheduler/scheduler'
  import All from '../../scheduler/apps';
  import DeskTopIcon from '@/component/DeskTopIcon';
  import IconOverlayTip from './IconOvelayTip';
  import LeftPane from '@/component/LeftPane/LeftPane.vue';
  import Index from './index.jsx';
  import useCompScheduler from '@/store/componentScheduler';
  import TaskBarVue from '@/component/taskBar/taskBar.vue'
  import render from './renderQueue'
  

  import Menu from './Menu';
  const store = useCompScheduler();
  const components = reactive({
    renderList: [],
    origin: []
  })

  const computeComponents = computed(() => {
    return store.components.length && store.components
  })

  store.cacheScheduler(new Scheduler(All))

  watchEffect(() => {
    if(store.components.length) {
      const len = components.length
      components.renderList = render(store.components)
      components.origin.push(...store.components)
    }
  })



  watchEffect(() => {
    console.log(computeComponents.value);
  })


  setTimeout(() => {
    store.installComponents(LeftPane)
    
  }, 2000);


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
