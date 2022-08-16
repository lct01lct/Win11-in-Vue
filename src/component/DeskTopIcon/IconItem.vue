<script setup>
  import drag from '@/utils/ViewSize/drag';
  import { getViewportSize } from '@/utils/ViewSize/utils';
  import useDeskTopConfigStore from '@/store/deskTopConfigStore/index';
  import { showBox } from '../../utils';
  import folderStore from '@/store/folderStore';

  const configStore = useDeskTopConfigStore();

  const { iconBaseWeight, iconBaseHeight, maxIconCountY } = configStore;

  const deskTopIconRef = ref(null);
  defineProps({
    icon: {
      type: String,
      default: 'explorer.png',
    },
    name: {
      type: String,
      default: '新建文件夹',
    },
    data: {
      type: Object,
      default: () => {},
    },
    deskTopIconDoms: {
      type: Array,
      default: () => [],
    },
    DeskTopIconData: {
      type: Array,
      default: () => [],
    },
  });
  const clickApp = (e, item) => {
    const target = document.querySelector(`.${item.componentName}`);

    if (item.componentName === 'FolderFullBox') {
      // todo
      const store = folderStore();
      store.changeCurrentFolder(item);
    }

    showBox(target);
  };

  // 判断鼠标点击哪个键位
  const dragIconOrOpenMenu = (e, dom, list, item) => {
    console.log(e, dom, list, item);
    if (e.button === 0) {
      // 左键
      drag.call(dom, e, list, item, {
        edgeWeight: getViewportSize().width,
        edgeHeight: getViewportSize().height,
      });
    } else if (e.button === 2) {
      // 右键
      console.log('菜单');
    }
  };
</script>

<template>
  <div
    ref="deskTopIconRef"
    class="deskTopIcon"
    @dblclick="clickApp($event, data)"
    :style="`
        top: ${((Math.floor(data.posIdx % maxIconCountY) - 1) * iconBaseWeight).toFixed(1) + 'px'};
        left: ${(Math.floor(data.posIdx / maxIconCountY) * iconBaseHeight).toFixed(1) + 'px'};
      `"
    @mousedown="dragIconOrOpenMenu($event, deskTopIconRef, DeskTopIconData, data)"
  >
    <img :src="`src/assets/img/icon/${icon}`" draggable="false" />
    <span>{{ name }}</span>
  </div>
</template>

<style scoped></style>
