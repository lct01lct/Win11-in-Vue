<template>
  <div class="FolderFullBox" v-show="isShow">
    <ToolBarVue @update:modelValue="changeIsShow">File Explorer</ToolBarVue>
    <FolderTopToolBar></FolderTopToolBar>
    <PathTool></PathTool>
    <main>
      <nav class="scroll">
        <DropDown></DropDown>
      </nav>
      <div class="mainBody">342</div>
    </main>
  </div>
</template>
<script setup>
  import ToolBarVue from '../ToolBar/index.vue';
  import FolderTopToolBar from './FolderTopToolBar/index.vue';
  import PathTool from './PathTool/index.vue';
  import DropDown from './DropDown/index.vue';

  const isShow = ref(true);

  const changeIsShow = ({ type } = item) => {
    if (type === 'mini') {
      isShow.value = false;
      setTimeout(() => {
        isShow.value = true;
      }, 3000);
    } else {
      isShow.value = false;
    }
  };
</script>

<style lang="scss" scoped>
  .FolderFullBox {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    transition: 0.2s ease-out;
    background-color: #f0f4f9;
    border-radius: 6px;
    box-shadow: 0 0 15px rgb(205, 204, 204);
    user-select: none;
    font-family: 'Cascadia Code';

    // 限制缩放的大小
    min-width: 700px;
    min-height: 400px;

    main {
      display: flex;
      width: 100%;
      height: calc(100% - 130px);
      border-radius: 0 0 6px 6px;
      background-color: #ffffff;

      nav {
        width: 13em;
        height: 100%;
        overflow-y: scroll;
      }
    }
  }
</style>
