<template>
  <div class="FolderFullBox FullBox">
    <ToolBarVue @update:modelValue="changeIsShow">File Explorer</ToolBarVue>
    <FolderTopToolBar></FolderTopToolBar>
    <PathTool></PathTool>
    <main>
      <nav class="scroll">
        <DropDown></DropDown>
      </nav>
      <div class="mainBody">
        <MainBody></MainBody>
      </div>
    </main>
  </div>
</template>
<script setup>
  import ToolBarVue from '../ToolBar/index.vue';
  import FolderTopToolBar from './FolderTopToolBar/index.vue'
  import PathTool from './PathTool/index.vue'
  import DropDown from './DropDown/index.vue'
  import MainBody from './MainBody/index.vue'

  setTimeout(() => {
    let FolderFullBox = document.querySelector(".FolderFullBox")

    FolderFullBox.style.zIndex = 2;
    
  },4000)

</script>

<style lang="scss" scoped>
  .FolderFullBox {
    background-color: #f0f4f9;

    // 限制缩放的大小
    min-width: 700px;
    min-height: 400px;




    main{
      display: flex;
      width: 100%;
      height: calc(100% - 130px);
      border-radius: 0 0 6px 6px;
      background-color: #ffffff;




      nav{
        width: 15em;
        height: 100%;
        overflow-y: scroll;
      }

      .mainBody{
        width: 100%;
        height: 100%;
        border-left: .1em solid #dddddd;
      }
    }
  }
</style>
