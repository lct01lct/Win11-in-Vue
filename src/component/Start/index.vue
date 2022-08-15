<template>
  <div class="container">
    <div class="content">
      <!-- <Pinned></Pinned> -->
      <component :is="componentTag" @changeTag="changeTag"></component>
    </div>
    <!-- 用户名&&电源 -->
    <div class="bottomMenu">
      <!-- 左侧头像和用户名 -->
      <div class="user">
        <img src="src/assets/img/icon/startIcon/user.png" alt="" />
        <p>username</p>
      </div>
      <!-- 右侧电源按钮 -->
      <i class="shutdown"></i>
    </div>
  </div>
</template>
<script setup>
  import { markRaw, shallowRef } from 'vue';
  import AllApp from './allApp.vue';
  import Pinned from './pinned.vue';
  const componentTag = shallowRef(Pinned);
  const changeTag = () => {
    componentTag.value = componentTag.value === markRaw(Pinned) ? markRaw(AllApp) : markRaw(Pinned);
  };
</script>
<style lang="scss" scoped>
  .container {
    width: 610px;
    height: 636px;
    border-radius: 3px;
    box-shadow: 1px 1px 2px rgba(34, 34, 34, 0.25);
    background-color: rgb(222 235 246);
    position: absolute;
    top: 89px;
    left: 300px;
    height: 684px;
    .content {
      background-color: #ddeaf54f;
      box-sizing: border-box;
      // height: calc(100% - 54px);
      padding: 30px 48px;
    }
    .bottomMenu {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 54px;
      background: rgba(175, 175, 175, 0.1);
      padding: 0 48px;
    }
  }
  .bottomMenu {
    .user {
      border-top: #d8d9da solid;
      height: 100%;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      img {
        width: 40px;
        border-radius: 50%;
      }
    }
    .shutdown {
      margin-right: 60px;
      width: 22px;
      height: 22px;
      background-image: url('../../assets/img/icon/ui/power.png');
      background-repeat: no-repeat;
      background-size: 90%;
      cursor: pointer;
      filter: invert(1);
    }
  }
</style>
