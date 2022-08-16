<template>
  <div class="folderContent" ref="folderWrapRef">
    <ul>
      <folderItemVue
        v-for="item in data"
        :key="item"
        :icon="item.children ? 'folder.png' : 'edge.png'"
        :size="item.size"
        :data="item"
        :usageRate="item.usageRate || undefined"
        :name="item.name"
        :extension="item.extension || undefined"
        :ref="folderItemRefs"
        :folderItemDoms="folderItemDoms"
        :fullyData="data"
      ></folderItemVue>
      <div v-if="data.length === 0">此文件夹为空！</div>
    </ul>
  </div>
</template>

<script setup>
  // import folderStore tool to change MainBody
  import folderItemVue from './folderItem.vue';
  import folderStore from '@/store/folderStore';
  import { searchTargetFolderByPath } from '@/utils/handleFolder';

  const store = folderStore();

  const folderItemDoms = [];
  const folderItemRefs = (e) => {
    folderItemDoms.push(e);
  };

  // eslint-disable-next-line prefer-const
  let data = reactive([]);
  // 默认显示desktop
  store.changeCurrentFolder(searchTargetFolderByPath(['C:', 'DeskTop']));

  watch(
    () => store.currentShowFolder,
    () => {
      data.splice(0, data.length, ...store.currentShowFolder);
    },
    { deep: true }
  );
</script>

<style lang="scss" scoped>
  .folderContent {
    width: 100%;
    height: 100%;
    ul {
      display: flex;
      justify-content: flex-start;
      align-content: flex-start;
      flex-flow: wrap;
      overflow-y: scroll;

      list-style: none;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 1em;
    }
  }
</style>
