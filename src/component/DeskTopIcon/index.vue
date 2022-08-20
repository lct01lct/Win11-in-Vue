<template>
  <div class="deskTopFullBox" @mousedown="dragModalFrame">
    <div class="modalFrame" ref="ModalFrameRef"></div>
    <div class="deskTopIcons" ref="IconsRef">
      <IconItem
        :icon="item.icon"
        :name="item.name"
        :data="item"
        v-for="(item, index) in DeskTopIconData"
        :key="index"
        :ref="deskTopIconRefs"
        :deskTopIconDoms="deskTopIconDoms"
        :DeskTopIconData="DeskTopIconData"
      ></IconItem>
    </div>
  </div>
</template>

<script setup>
  import { deskTopData } from '@/data';
  import { getCurrentInstance, onMounted, reactive } from 'vue';
  import DeskTop from '@/utils/OS/desktop';
  import folderStore from '@/store/folderStore';
  import deskTopConfigStore from '@/store/deskTopConfigStore';
  import { setWidth, judgeContains } from '@/utils/ViewSize/drag';
  import { searchTargetFolderByPath } from '@/utils/handleFolder';
  import IconItem from './IconItem';

  const store = folderStore();
  const deskTopStore = deskTopConfigStore();

  watch(
    () => store.storeCompletedFolder,
    (newValue) => {
      const getDesktopFolderData = searchTargetFolderByPath(['C:', 'DeskTop']);
      DeskTopIconData.splice(
        0,
        DeskTopIconData.length,
        ...new DeskTop(deskTopData, getDesktopFolderData.children).appData
      );
    },
    { deep: true }
  );

  const that = getCurrentInstance();

  // // 图标的父div
  let IconsRef;

  // // 收集所有的桌面图标
  // // 用处：用于切换选中的样式
  let Refs;

  // // 模态拖动框
  let ModalFrameRef;

  onMounted(() => {
    Refs = that.refs.IconRefs;
    ModalFrameRef = that.refs.ModalFrameRef;
    IconsRef = that.refs.IconsRef;
  });

  const deskTopIconDoms = [];
  const deskTopIconRefs = (e) => {
    deskTopIconDoms.push(e);
  };

  // 模态框拖动
  const dragModalFrame = (e) => {
    const target = e.target;
    // 点击的是图标不是桌面直接退出
    if (target.getAttribute('class') !== 'deskTopIcons') {
      return;
    }
    // 记录X、Y坐标
    const X = e.pageX;
    const Y = e.pageY;
    // 清除所有已选中的样式
    Array.from(IconsRef.children).map((value) => value.classList.remove('selected'));
    deskTopStore.changeCurrentSelected([]);

    const move = (e) => {
      // 改变模态框的大小
      ModalFrameRef.style.left = X + 'px';
      ModalFrameRef.style.top = Y + 'px';
      setWidth(e.pageX - X, e.pageY - Y, ModalFrameRef);

      // 当前被选中的元素
      const inContains = judgeContains(IconsRef, ModalFrameRef);
      inContains.map((value) => value.classList.add('selected'));

      // 存储状态
      deskTopStore.changeCurrentSelected(inContains);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', () => {
      setWidth(0, 0, ModalFrameRef);
      document.removeEventListener('mousemove', move);
    });
  };

  const getDesktopFolderData = searchTargetFolderByPath(['C:', 'DeskTop']);

  // eslint-disable-next-line prefer-const
  let DeskTopIconData = reactive(new DeskTop(deskTopData, getDesktopFolderData.children).appData);
</script>

<style lang="scss">
  .deskTopFullBox {
    width: 100%;
    height: 100%;
  }
  .deskTopIcons {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0.2em;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    user-select: none;

    .deskTopIcon {
      position: absolute;
      // z-index: 998;
      display: flex;
      width: 6em;
      height: 6em;
      margin: 0.5em;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      color: white;
      font-size: 0.8em;
      transition: 0.1s;
      border-radius: 0.2em;

      &:hover {
        background-color: rgba($color: #fffefe, $alpha: 0.2);
      }

      img {
        width: 2em;
        height: 2em;
      }

      span {
        text-align: center;
        width: 100%;
        font-size: 0.7em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .selected {
    // transition: 1s;
    border: 1px solid rgba(215, 212, 212, 0.6);
    background-color: rgba($color: #fffefe, $alpha: 0.2);
    img {
      transition: 0.2s;
      // transform: scale(0.7);
      animation: scale 0.3s;
    }
  }

  @keyframes scale {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.7);
    }
    100% {
      transform: scale(1);
    }
  }
  .modalFrame {
    position: absolute;
    width: 0;
    height: 0;
    background-color: rgba($color: #fffefe, $alpha: 0.3);
    border-radius: 5px;
  }
</style>
