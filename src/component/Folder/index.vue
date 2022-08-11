<template>
  <div class="FolderFullBox FullBox">
    <ToolBarVue>File Explorer</ToolBarVue>
    <FolderTopToolBar></FolderTopToolBar>
    <PathTool></PathTool>
    <main>
      <nav class="scroll">
        <DropDown :data="data"></DropDown>
      </nav>
      <div class="mainBody">
        <MainBody></MainBody>
        <!-- :updatePathContent="updatePathContent" -->
      </div>
    </main>
  </div>
</template>
<script setup>
  import ToolBarVue from '../ToolBar/index.vue';
  import FolderTopToolBar from './FolderTopToolBar.vue';
  import PathTool from './PathTool.vue';
  import DropDown from './DropDown/index.vue';
  import MainBody from './MainBody.vue';

  import Data from '@/data/folders-data';
  import Desc from '@/utils/desc';
  // 缓存下全部的文件结构
  import userStore from '@/store/userStore';
  const store = userStore();
  // create folder obj
  const data = (function () {
    const descs = [];
    Data.forEach((desc) => {
      descs.push(new Desc(desc));
    });
    return descs;
  })();
  // cache 全部的目录结构
  store.cacheCompletedFolder(data);
</script>

<style lang="scss" scoped>
  .FolderFullBox {
    background-color: #f0f4f9;

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
        width: 15em;
        height: 100%;
        overflow-y: scroll;
      }

      .mainBody {
        width: 100%;
        height: 100%;
        border-left: 0.1em solid #dddddd;
      }
    }
  }
</style>
