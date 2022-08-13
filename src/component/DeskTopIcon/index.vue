<template>
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
</style>
