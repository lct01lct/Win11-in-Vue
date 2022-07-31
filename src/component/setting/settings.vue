<template>
  <div class="settingFullBox" v-show="IsShow">
    <ToolBarVue :modelValue="IsShow" @update:modelValue="updataFromToolBar" class="top">
      settings
    </ToolBarVue>
    <!-- 功能导航栏 -->
    <main>
      <div class="nav">
        <div class="accountMessage">
          <img src="@/assets/img/setting/defAccount.webp" alt="" />
          <div class="detailMessage">
            <span>BLUG Edge</span>
            <span>Local Account</span>
          </div>
        </div>
        <div class="searchInput">
          <input type="text" />
        </div>
        <div class="navList">
          <ul>
            <li v-for="item in navNameList" :key="item" @click="toggle(item)">
              <img :src="`src/assets/img/setting/${item}.webp`" alt="" />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
      <div class="mainBody">
        <h1>{{ title }}</h1>
        <mainSectionSlotVue :data="translateData">
          {{ data.Accounts }}
        </mainSectionSlotVue>
      </div>
    </main>
  </div>
</template>


<script setup>
import data from './settingData.json';
import ToolBarVue from '@/component/utils/ToolBar.vue';
import mainSectionSlotVue from '@/component/setting/mainSectionSlot.vue';
import { reactive } from 'vue';

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
 *      2. 设置页面的切换有路由实现 || 插槽实现
 */

// 是否显示
let IsShow = ref(true);

// 获取左侧nav栏的名字，为json数据的属性名称

let navNameList = [];

Object.keys(data).map((value) => {
  navNameList.push(value);
});

// main界面的标题名
let title = ref("System")

// 传递子组件的数据，显示item项
let translateData = reactive(data.System)

// 清空传递的数据，传递新的值
const changeData = (item) => {
  translateData.splice(0,translateData.length,...data[item])
}

// 切换界面
const toggle = (item) => {
  title.value = item
  changeData(item)
  console.log(translateData);
}

// 接收开关的function
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
  transition: 0.2s all ease-in;
  background-color: #f0f4f9;
  border-radius: 6px;
  box-shadow: 0 0 15px rgb(205, 204, 204);
  user-select: none;
  
  main {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: row;
    .nav {
      display: flex;
      flex-direction: column;
      width: 17em;
      height: 100%;
      .accountMessage {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        width: 92%;
        height: 5em;
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
        transition: 0.1s;
        img {
          width: 4em;
        }
        &:hover {
          background-color: #e9ecf1;
        }

        // 账户详细样式，头像，名字
        .detailMessage {
          margin-left: 10px;
          span:nth-child(1) {
            display: block;
            font-size: 0.8em;
            font-weight: 700;
          }
          span:nth-child(2) {
            display: block;
            font-size: 0.6em;
            font-weight: 500;
          }
        }
      }
      .searchInput {
        width: 16em;
        height: 2em;
        margin: 10px;
        input {
          width: 100%;
          height: 100%;
          border-left: 0;
          border-top: 0;
          border-right: 0;
          border-bottom: 2px solid #2a6bc3;
          border-radius: 3px;
          &:focus {
            outline: none;
          }
        }
      }
      .navList {
        height: 100%;
        overflow-y: scroll;
        ul {
          // height为0是因为navList会多出来
          height: 0;
          padding: 10px;
          padding-top: 0;
          list-style: none;
          li {
            display: flex;
            flex-direction: row;
            justify-content: start;
            align-items: center;
            height: 2em;
            border-radius: 5px;
            img {
              width: 1em;
              margin-left: 1em;
              margin-right: 1em;
            }

            &:hover{
              background-color: #e4e8ec;
            }
          }
        }
      }
      .navList::-webkit-scrollbar {
        width: 3px;
      }
      .navList::-webkit-scrollbar-thumb {
        height: 2em;
        border-radius: 5px;
        background-color: #777a7c; 
      }
    }
    .mainBody {
      display: flex;
      flex-direction: column;
      justify-content: start;
      width: 100%;
      height: 100%;
      margin-left: 1em;


      h1{
        margin: 0;
      }
    }
  }
}
</style>