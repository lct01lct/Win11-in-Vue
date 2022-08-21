<template>
  <div class="startMenu">
    <div class="content">
      <!-- <Pinned></Pinned> -->
      <transition mode="out-in">
        <component :is="componentTag" @changeTag="changeTag"></component>
      </transition>
    </div>
    <!-- 用户名&&电源 -->
    <div class="bottomMenu" @click="gotoLoginPage">
      <!-- 左侧头像和用户名 -->
      <div class="user">
        <img src="@/assets/img/icon/startIcon/user.png" alt="" />
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
  import router from '@/router';

  import $bus from '@/utils/ViewSize/Bus.js';
  const componentTag = shallowRef(Pinned);
  const changeTag = () => {
    componentTag.value = componentTag.value === markRaw(Pinned) ? markRaw(AllApp) : markRaw(Pinned);
  };

  const gotoLoginPage = () => {
    router.push('/');
  };
  const show = ref(0);

  $bus.on('showOne', (index) => {
    if (index === 2) {
      console.log(index);
      show.value = !show.value;
    } else {
      show.value = false;
    }
  });
</script>
<style lang="scss" scoped>
  .startMenu {
    // width: 610px;
    // height: 636px;
    // border-radius: 3px;
    // box-shadow: 1px 1px 2px rgba(34, 34, 34, 0.25);
    // background-color: rgb(222 235 246);
    // position: fixed;
    // bottom: 60px;
    // left: 50%;
    // transform: translateX(-50%);
    // z-index: 20;

    width: 610px;
    height: 636px;
    border-radius: 3px;
    box-shadow: 1px 1px 2px rgba(34, 34, 34, 0.25);
    background-color: rgb(222 235 246);
    position: fixed;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
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

  .v-enter-active,
  .v-leave-active {
    // transform: ;
    transition: 0.3s;
  }

  .v-enter-from {
    opacity: 1;
    transform: translateX(10%);
  }
  .v-leave-to {
    opacity: 0;
    transform: translateX(0);
  }
</style>
