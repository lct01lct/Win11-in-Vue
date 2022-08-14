<template>
  <!-- <div class="deskTopFullBox" @mousedown="dragModalFrame"> -->
  <!-- <div class="modalFrame" ref="ModalFrameRef"></div> -->
  <div class="deskTopIcons">
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
</template>

<script setup>
  import { deskTopData } from '@/data';
  // import { getCurrentInstance, onMounted, reactive } from 'vue';
  // import { showBox } from '../../utils';
  // import DeskTop from '@/utils/OS/desktop';
  // import userStore from '@/store/userStore';

  // import { searchTargetFolderByPath } from '@/utils/handleFolder';

  // const that = getCurrentInstance();

  // const store = userStore();

  // // 图标的父div
  // let IconsRef;

  // // 收集所有的桌面图标
  // // 用处：用于切换选中的样式
  // let Refs;

  // // 模态拖动框
  // let ModalFrameRef;

  // onMounted(() => {
  //   Refs = that.refs.IconRefs;
  //   ModalFrameRef = that.refs.ModalFrameRef;
  //   IconsRef = that.refs.IconsRef;
  // });

  // const setWidth = (width, height) => {
  //   ModalFrameRef.style.width = width + 'px';
  //   ModalFrameRef.style.height = height + 'px';
  // };

  // // 判断元素是否属于该区域
  // const judgeContains = (parent) => {
  //   const childNode = Array.from(parent.children);
  //   const { left, right, top, bottom } = ModalFrameRef.getBoundingClientRect();
  //   const containsArray = [];
  //   childNode.map((value) => {
  //     const item = value.getBoundingClientRect();
  //     if (item.left > left && item.right < right && item.top > top && item.bottom < bottom) {
  //       containsArray.push(value);
  //     }
  //   });
  //   return containsArray;
  // };

  // // 模态框拖动
  // const dragModalFrame = (e) => {
  //   const X = e.pageX;
  //   const Y = e.pageY;
  //   Refs.map((value) => value.classList.remove('selected'));

  //   const move = (e) => {
  //     ModalFrameRef.style.left = X + 'px';
  //     ModalFrameRef.style.top = Y + 'px';
  //     setWidth(e.pageX - X, e.pageY - Y);
  //     judgeContains(IconsRef).map((value) => value.classList.add('selected'));
  //   };
  //   document.addEventListener('mousemove', move);
  //   document.addEventListener('mouseup', () => {
  //     setWidth(0, 0);
  //     document.removeEventListener('mousemove', move);
  //   });
  // };

  // // 呈现App
  // const clickApp = (e, item) => {
  //   const target = document.querySelector(`.${item.componentName}`);

  //   if (item.componentName === 'FolderFullBox') {
  //     // todo
  //     // 存储当前的文件夹
  //     store.changeCurrentFolder(item);
  //     console.log(item);
  //   }

  //   const targetIcon = e.target;

  //   showBox(target);

  //   // 排他清除样式
  //   Refs.map((value) => value.classList.remove('selected'));

  //   if (targetIcon.nodeName.toLowerCase() === 'div') {
  //     targetIcon.classList.add('selected');
  //   } else {
  //     targetIcon.parentElement.classList.add('selected');
  //   }
  // };

  // const getDesktopFolderData = searchTargetFolderByPath(['C:', 'DeskTop']);

  // // getDesktopFolderData.children.map((value, i) => {
  // //   value.posIdx = 100 + i;
  // //   value.componentName = 'FolderFullBox';
  // //   value.icon = 'explorer.png';
  // // });

  // // eslint-disable-next-line prefer-const
  // let DeskTopIconData = reactive(new DeskTop(deskTopData, getDesktopFolderData.children).appData);

  // // 监测文件结构变化
  // // 监测文件结构变化
  // // 监测文件结构变化
  // // 监测文件结构变化
  // // 监测文件结构变化
  // watch(
  //   () => store.storeCompletedFolder,
  //   (newValue) => {
  //     const getDesktopFolderData = searchTargetFolderByPath(['C:', 'DeskTop']);
  //     DeskTopIconData.splice(
  //       0,
  //       DeskTopIconData.length,
  //       ...new DeskTop(deskTopData, getDesktopFolderData.children).appData
  //     );
  //   },
  //   { deep: true }
  // );

  // const dragIcon = (e, item) => {
  //   // 目前被选中的元素，拖动的元素也是去拖动他
  //   const targetArray = Refs.filter((value) => {
  //     const classList = Array.from(value.classList);
  //     return classList.find((value) => value === 'selected');
  //   });

  //   const X = e.pageX;
  //   const Y = e.pageY;

  //   targetArray.map((value) => {
  //     value.fixedLeft = X - value.offsetLeft;
  //     value.fixedTop = Y - value.offsetTop;
  //   });
  //   let tempPos;
  //   const move = (e) => {
  //     console.log(targetArray);
  //     targetArray.map((value) => {
  //       value.classList.add('notransition');
  //       value.style.left = e.pageX - value.fixedLeft + 'px';
  //       value.style.top = e.pageY - value.fixedTop + 'px';
  //       value.tempPos = Math.floor(e.pageX / 76.8) * 8 + Math.floor(e.pageY / 76.8) + 1;
  //     });
  //   };
  //   document.addEventListener('mousemove', move);
  //   document.addEventListener('mouseup', () => {
  //     // console.log((targetArray[0].__vnode.key.posIdx = 100));
  //     // item.posIdx = tempPos;
  //     targetArray.map((value) => {
  //       // console.log(value.tempPos);
  //       // console.log(value.__vnode.key.posIdx, 1);
  //       value.__vnode.key.posIdx = value.tempPos;
  //     });
  //     document.removeEventListener('mousemove', move);
  //   });
  // };
  import DeskTop from '@/utils/OS/desktop';
  import IconItem from './IconItem';

  const DeskTopIconData = new DeskTop(deskTopData, [
    {
      name: 'Video',
      posIdx: 11,
      children: [
        {
          name: 'QQ Music',
          children: [
            {
              name: '周杰伦的专辑',
              children: [
                {
                  extension: 'mp4',
                  name: '青花瓷',
                  size: '100GB',
                },
                {
                  extension: 'mp4',
                  name: '一路向北',
                  size: '56KB',
                },
              ],
            },
          ],
        },
        {
          name: 'Cloud Music',
          children: [
            {
              name: '周杰伦的专辑',
              children: [
                {
                  extension: 'mp4',
                  name: '青花瓷',
                  size: '56KB',
                },
                {
                  extension: 'mp4',
                  name: '一路向北',
                  size: '56KB',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Music',
      posIdx: 10,
      children: [
        {
          name: 'QQ Music',
          children: [
            {
              name: '周杰伦的专辑',
              children: [
                {
                  extension: 'mp4',
                  name: '青花瓷',
                  size: '100GB',
                },
                {
                  extension: 'mp4',
                  name: '一路向北',
                  size: '56KB',
                },
              ],
            },
          ],
        },
        {
          name: 'Cloud Music',
          children: [
            {
              name: '周杰伦的专辑',
              children: [
                {
                  extension: 'mp4',
                  name: '青花瓷',
                  size: '56KB',
                },
                {
                  extension: 'mp4',
                  name: '一路向北',
                  size: '56KB',
                },
              ],
            },
          ],
        },
      ],
    },
  ]).appData;

  const deskTopIconDoms = [];
  const deskTopIconRefs = (e) => {
    deskTopIconDoms.push(e);
  };
</script>

<style lang="scss">
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
      z-index: 998;
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
