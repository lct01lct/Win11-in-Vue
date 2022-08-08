<template>
  <div class="folderContent">
    <ul>
      <li
        v-for="item in data"
        :key="item"
        @dblclick="goToTargetPath(item.path)"
        :title="`大小：${item.size} ${item.usageRate ? `Rate: ${item.usageRate}` : ''}`"
      >
        <img :src="`src/assets/img/setting/${item.children ? 'folder.png' : 'edge.png'}`" />
        <span>{{ `${item.name}${item.extension ? `.${item.extension}` : ''}` }}</span>
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
  const props = defineProps(['children']);
  const data = props.children;
  console.log(data);

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
      align-content: flex-start;
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
        justify-content: space-around;
        align-items: center;

        width: 6em;
        height: 6em;

        img {
          width: 3em;
          height: 3em;
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
