<template>
  <div class="search-box">
    <div class="search-bar">
      <div class="search-icon"><img width="18" src="src/assets/img/icon/search.png" alt="" /></div>

      <input type="text" placeholder="Type here to search" value="" class="search-input" />
    </div>

    <div class="main-box">
      <div class="lasted">
        <h4>最近</h4>
        <div class="lasted-box">
          <div
            v-for="(item, index) in lastedData"
            :key="index"
            @click.stop="openApp(item.name)"
            class="lasted-item"
          >
            <!-- 借用start的icon -->
            <img :src="`src/assets/img/icon/startIcon/${item.url}.png`" alt="" srcset="" />
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
      <div class="today-box">
        <h4>今天</h4>
        <div class="t-top"><img src="src/assets/img/search/1.png" alt="" /></div>
        <div class="t-mid">
          <div class="t-d-item" v-for="(item, index) in todayData" :key="index">
            <img :src="`src/assets/img/search/${item.url}.png`" alt="" />
            <p>{{ item.desc }}</p>
          </div>
        </div>
        <div class="t-foot">
          <h4>热门搜索</h4>
          <div class="hot-box">
            <div class="hot-item">lol非活跃账户被删除</div>
            <div class="hot-item">lol非活跃账户被删除</div>
            <div class="hot-item">lol非活跃账户被删除</div>
            <div class="hot-item">lol非活跃账户被删除</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { lastedData, todayData } from './searchData.json';
  import { showBox } from '@/utils';
  /** 需求分析：
   *  1. 静态页面
   */

  const openApp = (name) => {
    const target = document.querySelector(`.${name}`);
    showBox(target, name);
  };
</script>

<style lang="scss" scoped>
  .search-box {
    width: 700px;
    height: 700px;
    padding: 30px;
    border-radius: 10px;
    background-color: aliceblue;
    position: fixed;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;

    .search-bar {
      height: 35px;
      border: solid 2px #1885e3;
      border-radius: 6px;
      background: #ffffff;
      display: flex;
      align-items: center;
      padding: 0 10px;
      width: 90%;
      .search-icon {
      }
      .search-input {
        width: 100%;
        background: #ffffff;
        border: none;
        outline: none;
        margin-left: 10px;
      }
    }
    .main-box {
      display: flex;
      width: 100%;
      height: calc(100% - 35px);
      .lasted {
        width: 245px;
        .lasted-box {
          padding: 13px 4px;
          .lasted-item {
            padding: 5px 10px;
            display: flex;
            align-items: center;
            margin: 5px 0;
            border-radius: 4px;
            img {
              width: 26px;
            }
            p {
              padding: 7px 16px;
              margin: 0;
            }
            &:hover {
              background-color: white;
            }
          }
        }
      }
    }
    .today-box {
      flex: 1;
      padding: 0 10px;
      .t-top {
        &:hover {
          opacity: 0.8;
        }
        height: 265px;
        overflow: hidden;
        border-radius: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .t-mid {
        display: flex;
        justify-content: space-between;
        margin: 20px 0px;
        .t-d-item {
          &:hover {
            opacity: 0.8;
          }
          background-color: #fffdfc;
          border-radius: 5px;
          height: 167px;

          img {
            border-radius: 5px 5px 0 0;

            width: 144px;
            height: 104px;
          }
          p {
            padding: 0 0 0 19px;
            font-size: 14px;
          }
        }
      }
      .t-foot {
        height: 100px;
        background-color: rgb(243 249 249 / 90%);
        overflow: hidden;
        h4 {
          font-size: 16px;
          margin: 9px 0 5px 9px;
        }
        .hot-box {
          display: flex;
          flex-wrap: wrap;

          height: 109px;
          border-radius: 8px;
          .hot-item {
            &:hover {
              border: 1px solid #0000004d;
            }
            margin: 10px;
            font-size: 16px;
            border-radius: 16px;
            padding: 5px 13px;
            background-color: white;
            border: 1px solid white;
          }
        }
      }
    }
  }
</style>
