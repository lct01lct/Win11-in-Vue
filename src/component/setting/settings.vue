<template>
  <div class="settingFullBox" v-show="IsShow">
    <ToolBarVue :modelValue="IsShow" @update:modelValue="updataFromToolBar" class="top">
      settings
    </ToolBarVue>
    <!-- 功能导航栏 -->
    <main>
      <div class="nav">
        <div class="accountMessage">
          <img src="@/assets/img/setting/defAccount.webp" alt="">
          <div class="detailMessage">
            <span>BLUG Edge</span>
            <span>Local Account</span>
          </div>
        </div>
        <div class="searchInput"></div>
        <div class="navList"></div>
      </div>
      <div class="mainBody">
        <div v-for="item in Accounts" :key="item">{{ item }}}</div>
      </div>
    </main>
  </div>
</template>


<script setup>
import { Accounts } from './settingData.json';
import ToolBarVue from '@/component/utils/ToolBar.vue';

/** 需求分析：
 *  1. Tab页初始打开占满屏幕，可拖动，并且右上角icon可以设置最小化或小屏或关闭
 *  2. 最大化和缩小最大化有动态过渡
 *  3. 宽度高度可以自己调节
 *  4. 页面布局：
 *      a. 顶部Tab功能按钮为一栏
 *      b. 左侧nav功能区
 *      c. 右侧标题栏
 *      d. Top显示区（并不是都有）
 *      e. 主要内容区
 *
 *  5. 难点：过渡、缩放、可拖动
 *
 *  实现：
 *      1. 主要内容由json文件留存
 */

// 是否显示
let IsShow = ref(true);

// 更改数据
const updataFromToolBar = (newValue) => {
  IsShow.value = newValue;
};
</script>

<style lang="scss" scoped>
.settingFullBox {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  transition: .2s all ease-in;
  main{
    display: flex;
    height: 100%;
    .nav {
      display: flex;
      flex-direction: column;
      width: 17em;
      height: 100%;
      background-color: blue;

      .accountMessage {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        width: 100%;
        height: 5em;
        padding: 10px;
        background-color: white;
        img{
          width: 4em;
        }

        // 账户详细样式，头像，名字
        .detailMessage{
          span:nth-child(1){
            display: block;
            font-size: 0.8em;
            font-weight: 700;
          }
          span:nth-child(2){
            display: block;
            font-size: 0.6em;
            font-weight: 500;
          }
        }
      }
      .searchInput{
        width: 20em;
        height: 2em;
        background-color: rgb(148, 117, 117);
      }
      .navList{
        width: 20em;
        height: 80%;
        background-color: rgb(83, 65, 65);
      }
    }
    .mainBody {
      width: 100%;
      height: 100%;
      background-color: red;
    }
  }
}
</style>