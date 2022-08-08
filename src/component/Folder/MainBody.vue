<template>
  <div class="folderContent">
    <ul>
      <li v-for="item in data" :key="item" @dblclick="goToTargetPath(item.title)">
        <img :src="`src/assets/img/setting/${item.icon}`" />
        <span>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
  /** 需求分析：
   *  在这个文件夹结构中，Folder/index.vue作为index文件
   *  应该是负责整个页面的数据收发的
   *  pathTool、MainBody都是通过父向子组件传递进行的数据传输
   *
   *  此组件负责：
   *    文件夹图标的显示，名字的显示
   *    doubleClick跳转对应的文件夹，穿梭至指定文件夹深度
   */

  const data = reactive([
    {
      type: 'folder',
      title: '.config',
      icon: 'folder.png',
    },
    {
      type: 'folder',
      title: '.config',
      icon: 'folder.png',
    },
    {
      type: 'folder',
      title: '.config',
      icon: 'folder.png',
    },
    {
      type: 'folder',
      title: '.config',
      icon: 'folder.png',
    },
    {
      type: 'folder',
      title: '.config',
      icon: 'folder.png',
    },
    {
      type: 'user',
      title: 'night',
      icon: 'user.png',
    },
    {
      type: 'folder',
      title: '.config',
      icon: 'folder.png',
    },
    {
      type: 'folder',
      title: '.config',
      icon: 'folder.png',
    },
    {
      type: 'folder',
      title: '.config',
      icon: 'folder.png',
    },
    {
      type: 'folder',
      title: '.config',
      icon: 'folder.png',
    },
    {
      type: 'folder',
      title: '.config',
      icon: 'folder.png',
    },
    {
      type: 'user',
      title: 'night',
      icon: 'user.png',
    },
    {
      type: 'folder',
      title: '.config',
      icon: 'folder.png',
    },
    {
      type: 'folder',
      title: '.config',
      icon: 'folder.png',
    },
    {
      type: 'folder',
      title: '.config',
      icon: 'folder.png',
    },
    {
      type: 'folder',
      title: '.config',
      icon: 'folder.png',
    },
    {
      type: 'folder',
      title: '.config',
      icon: 'folder.png',
    },
    {
      type: 'user',
      title: 'night',
      icon: 'user.png',
    },
  ]);

  const goToTargetPath = (title) => {
    console.log(title);
  };
</script>

<style lang="scss" scoped>
  .folderContent {
    width: 100%;
    height: 100%;
    ul {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-flow: wrap;
      overflow-y: scroll;

      list-style: none;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 1em;

      li {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 7em;
        height: 7em;

        img {
          width: 6em;
          height: 6em;
        }

        span {
          font-size: 0.7em;
        }

        &:hover {
          background-color: #e1f3ff;
        }
      }
    }
  }
</style>
