<template>
  <div class="pathTool">
    <span class="historyBtn">🔙</span>
    <span class="historyBtn">🔜</span>
    <span class="historyBtn">🔝</span>
    <div class="path">
      <img :src="`src/assets/img/setting/${headerIcon}`" alt="" />
      <input type="text" id="input" v-model.lazy.trim="inputPath" @keydown.enter="goTargetPath"/>
      <label for="input" class="path-content">
        <span v-for="item in mock" :key="item">{{ item }}</span>
      </label>
    </div>
    <div class="search">
      <img src="src/assets/img/setting/search.png" alt="" />
      <input type="text" placeholder="search" @keydown.enter="searchStr($event)"/>
    </div>
  </div>
</template>

<script setup>
/** 需求分析
   *  path框的图片是可以动态变化的
   *  路径框是可以匹配内容的
   *  前进后退按钮可用
   *  path框可以操作文件夹
   *
   *  预测接收参数：
   *    当前文件夹路径，数组形式
   *    触发函数：
   *      前进，后退
   *      搜索，并将内容传递至父组件
   */


  // const props = defineProps('pathArray')
  let headerIcon = ref('user-sm.png');
  let mock = reactive(['C:','img','setting','model']);
  let inputPath = computed({
    get(){
      return mock.join("/")
    },
    set(newValue){
      let newV = newValue.split("/")
      console.log(newV); 
    }
  })

  const goTargetPath = () => {
    console.log("ok，我去跳转！");
  }

  const searchStr = (e) => {
    console.log(e.target.value,"好了值我拿到了，我去search了");
  }
</script>

<style lang="scss" scoped>
  .pathTool {
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 0.5em 1.3em;
    background-color: #ffffff;
    .historyBtn {
      font-size: 1.4em;
      margin-right: 0.5em;
    }

    .path {
      display: flex;
      align-items: center;
      padding: 0 0 0 0.5em;
      width: 60%;
      height: 100%;
      border: 1px solid #dddddd;

      img {
        width: 1em;
        height: 1em;
      }
      #input {
        width: 0;
        outline: none;
        border: 0;
        font-size: 0.8em;
      }
      #input:focus {
        width: 100%;
      }
      #input:focus + .path-content {
        display: none;
      }
      &-content {
        display: flex;
        align-items: center;
        margin-left: 0.5em;
        font-size: 0.8em;
        span {
          margin-left: 0.5em;
          &::after {
            content: '>';
            margin-left: 0.5em;
          }
        }
      }
    }
    .search {
      display: flex;
      align-items: center;
      margin-left: 10px;
      padding: 0.6em 1em;
      flex: 1;
      height: 100%;
      border: 1px solid #dddddd;

      img {
        width: 0.8em;
        height: 0.8em;
      }
      input {
        outline: none;
        border: 0;
        font-size: 0.8em;
        padding-left: 0.8em;
      }
    }
  }
</style>
