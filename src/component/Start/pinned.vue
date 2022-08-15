<template>
  <div class="box">
    <!-- //头部的选择按钮 -->
    <div class="topNav">
      <p>固定的</p>
      <button class="elbutton" @click.stop="toAllApps">
        All apps
        <i class="el-icon--right"></i>
        >
      </button>
    </div>
    <!-- pinned列表 -->
    <div class="pinnedList">
      <div v-for="(item, index) in pinnedData" :key="index" @click.stop="openApp(item.name)">
        <img :src="`src/assets/img/icon/startIcon/${item.url}.png`" alt="" srcset="" />
        <p>{{ item.name }}</p>
      </div>
    </div>
    <!-- recommended列表 -->
    <div class="topNav"></div>
    <p>Recommended</p>
    <div class="recommend">
      <div class="item" v-for="(item, index) in recommendData" :key="index">
        <img :src="`src/assets/img/icon/startIcon/${item.url}.png`" alt="" srcset="" />
        <h3>{{ item.title }}</h3>
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  // import { emit } from 'process';
  // import { reactive } from 'vue';
  // import { useStore } from "vuex";
  // const store = useStore();
  import { defineEmits } from 'vue';
  import { pinnedData, recommendData } from './StartData.json';

  const emit = defineEmits(['changeTag']);
  const toAllApps = () => {
    emit('changeTag');
  };
  const openApp = (appName) => {
    console.log(`打开应用：${appName}`);
  };
</script>

<style lang="scss" scoped>
  .box {
    font-size: 12px;
    .topNav {
      font-size: 600;
      color: #666;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .elbutton {
      font-size: 12px;
      color: #333;
      padding: 5px 8px;
      border-radius: 3px;
      border: #b9ccef solid 1px;
      background: rgba(255, 255, 255, 0.9);
      .el-icon--right {
        margin-left: 3px;
      }
    }
  }
  .pinnedList {
    // width: 100%;
    padding: 20px 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    // align-content: space-between;
    // justify-content: space-between;
    margin-bottom: 10px;
    & > div {
      width: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 0;
      cursor: pointer;
      &:hover {
        background: rgb(255 255 255);
      }
      p {
        font-weight: 500;
        font-size: 0.5em;
        text-align: center;
        white-space: nowrap;
        color: #2f2f2f;
        // width: 24px;

        margin-top: 6px;
      }
    }
    img {
      width: 24px;
    }
  }
  .recommend {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 15px;
    .item {
      width: 40%;
      height: 45px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
      div {
        text-align: left;
        h3 {
          font-size: 12px;
          font-weight: 600;
          color: #555;
        }
        p {
          font-size: 10px;
          color: #666;
        }
      }
      img {
        height: 50%;
        margin-right: 16px;
      }
      &:hover {
        background: rgb(255, 255, 255);
      }
    }
  }
</style>
