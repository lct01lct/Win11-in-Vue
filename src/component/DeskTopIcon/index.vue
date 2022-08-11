<template>
  <div class="deskTopIcons">
    <div
      class="deskTopIcon"
      v-for="item in DeskTopIconData"
      :key="item"
      @dblclick="clickApp($event, item)"
      :style="`
        top: ${((Math.floor(item.posIdx % 8) - 1) * 76.8).toFixed(1) + 'px'};
        left: ${(Math.floor(item.posIdx / 8) * 76.8).toFixed(1) + 'px'};
      `"
      @mousedown="dragIcon"
      ref="IconRefs"
    >
      <img :src="`src/assets/img/icon/${item.icon}`" draggable="false" />
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script setup>
  import { deskTopData } from '@/data';
  import { getCurrentInstance, onMounted } from 'vue';
  import { showBox } from '../../utils';
  import DeskTop from '@/utils/OS/desktop';

  const that = getCurrentInstance();

  // 收集所有的桌面图标
  // 用处：用于切换选中的样式
  let Refs;

  onMounted(() => {
    Refs = that.refs.IconRefs;
  });

  const clickApp = (e, item) => {
    const target = document.querySelector(`.${item.componentName}`);

    if (item.componentName === 'FolderFullBox') {
      // todo
      console.log(item);
    }

    const targetIcon = e.target;

    showBox(target);

    // 排他清除样式
    Refs.map((value) => value.classList.remove('selected'));

    if (targetIcon.nodeName.toLowerCase() === 'div') {
      targetIcon.classList.add('selected');
    } else {
      targetIcon.parentElement.classList.add('selected');
    }
  };

  const DeskTopIconData = new DeskTop(deskTopData, [
    {
      name: 'Music',
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

  console.log(DeskTopIconData);

  const dragIcon = () => {};
</script>

<style lang="scss" scoped>
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
</style>
