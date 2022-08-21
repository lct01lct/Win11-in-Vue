<script setup>
  import { pagePos, getViewportSize } from '@/utils/ViewSize/utils';
  import { DragFeatrue } from '@/utils/ViewSize/drag';
  import useMenuStore from './store/menuStore';
  import DeskTopMenu from './DeskTopMenu.vue';
  import IconMenu from './IconMenu.vue';
  const menuStore = useMenuStore();

  const menuRef = ref(null);
  const menuVisible = computed(() => menuStore.menuVisible);
  const clickType = ref('');

  const setMenu = (e, type) => {
    if (!type) {
      return false;
    }
    clickType.value = type;
    menuStore.setMenuVisible(true);
    nextTick(() => {
      DragFeatrue.prototype.move.call(
        {
          mouseX: pagePos(e).X,
          mouseY: pagePos(e).Y,
          elem: menuRef.value,
        },
        0,
        0,
        {
          edgeWeight: getViewportSize().width,
          edgeHeight: getViewportSize().height,
        }
      );
    });
  };

  const hideMenu = () => {
    menuStore.setMenuVisible(false);
  };

  defineExpose({
    setMenu,
  });
</script>

<template>
  <div class="main-menu-wrapper" v-if="menuVisible" @click.stop ref="menuRef">
    <DeskTopMenu v-if="clickType === 'blank'" @hideMenu="hideMenu"></DeskTopMenu>
    <!-- <IconMenu v-if="clickType === 'blank'" @hideMenu="hideMenu"></IconMenu> -->
  </div>
</template>

<style lang="scss">
  .main-menu-wrapper {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 258px;
    // height: 336px;
    user-select: none;
    background-color: rgb(247, 247, 247);
    padding: 5px;
    border-radius: 5px;
    border: 3px solid #eee;

    .icon-options-list {
      display: flex;
      height: 40px;
      .icon-option-item {
        padding: 10px;
        img {
          width: 100%;
          height: 100%;
        }
        &:hover {
          background-color: #eeeeee;
        }
      }
    }

    .text-options-wrapper {
      flex: 1;
      .text-options-list {
        display: flex;
        flex-direction: column;
        .text-option-item {
          flex: 1;
          padding: 5px;
          &:hover {
            background-color: #eeeeee;
          }
        }
      }
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
