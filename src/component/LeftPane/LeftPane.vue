<template>
  <div class="left-pane" :style="{ left: show ? '18px' : '-840px' }">
    <div class="pane-top">
      <div class="title">
        {{ time }}
      </div>
      <!-- //搜索框 -->
      <div class="search-bar">
        <div class="search-icon">
          <img width="18" src="src/assets/img/icon/search.png" alt="" />
        </div>
        <input type="text" placeholder="搜索新闻" value="" class="search-input" />
      </div>
    </div>
    <div class="left-pane-content">
      <PaneItem
        v-for="(item, index) in imgInfoList"
        :key="index"
        :img-info="item"
        class="erery-item"
      ></PaneItem>
    </div>
  </div>
</template>
<script setup>
  /*
监听全局事件，showOne，传递相应 index ，比如这个index是1，我这个组件监听到了，就显示，如果不是1，就不显示 
*/
  import PaneItem from './PaneItem.vue';
  import { imgInfoList } from './imgInfo.json';
  import $bus from '@/utils/ViewSize/Bus.js';
  // import { ref, reactive } from 'vue';
  let currentTime = new Date();
  const time = ref('00:00');
  time.value = currentTime.toLocaleTimeString().slice(0, 7); // 获取当前时间 上午11:29
  const show = ref(0);
  $bus.on('showOne', (index) => {
    if (index === 1) {
      currentTime = new Date();
      time.value = currentTime.toLocaleTimeString().slice(0, 6);
      console.log(index);
      show.value = !show.value;
    } else {
      show.value = false;
    }
  });
</script>
<style lang="scss" scoped>
  .pane-top {
    width: 694px;
    margin: 22px 6px 10px 60px;
    .title {
      text-align: center;
      font-size: 25px;
      width: 100%;
      height: 70px;
      line-height: 61px;
      &::after {
        // contain: ' ';
        // background-color: #f25664;
        // //
        content: ' ';
        background-color: #f25664;
        background-image: url('src/assets/img/leftPane/userIcon.png');
        background-size: 100% 100%;
        right: 15px;
        top: 15px;
        width: 89px;
        height: 47px;
        position: absolute;
        border-radius: 6px;
      }
    }
    .search-bar {
      height: 40px;
      border-radius: 6px;
      background: #ffffff;
      display: flex;
      align-items: center;
      padding: 0 10px;
      width: 100%;
      .search-icon {
        margin-top: 4px;
      }
      .search-input {
        width: 100%;
        background: #ffffff;
        border: none;
        outline: none;
        margin-left: 10px;
      }
    }
  }
  .left-pane {
    position: absolute;
    top: 12px;
    bottom: 12px;
    width: 800px;
    height: 700px;
    z-index: 10;
    border-radius: 13px;
    backdrop-filter: blur(55px);
    transition: all 0.5s cubic-bezier(0.77, 0, 0.18, 1);

    overflow: hidden;
  }
  .left-pane-content {
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    padding: 10px 15px;
    justify-content: space-between;
    overflow-x: hidden;
    overflow-y: scroll;
    width: 725px;
    height: 648px;
    margin-left: 45px;
  }
  .erery-item {
    margin: 5px 0;
    filter: drop-shadow(1px 0px 4px #68787a);
  }
  // .left-pane-content::-webkit-scrollbar-button {
  //   background-color: rgb(108, 141, 249);
  // }
  /* 滚动条里面的滑块 */
  .left-pane-content::-webkit-scrollbar-thumb {
    background: #89f78b;
    border-radius: 10px;
  }
  /* 滚动条整体部分 */
  .left-pane-content::-webkit-scrollbar {
    /* Y轴滚动条宽度 */
    width: 3px;
    /* X轴滚动条高度 */
    height: 8px;
  }
  /* 外层轨道 */
  .left-pane-content::-webkit-scrollbar-track {
    background: #efefef;
    border-radius: 2px;
  }
  /*  内层轨道 */
  .left-pane-content::-webkit-scrollbar-track-piece {
    background-color: rgb(179, 179, 184);
  }
</style>
