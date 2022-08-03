<template>
  <div class="pathTool">
    <span class="historyBtn">🔙</span>
    <span class="historyBtn">🔜</span>
    <span class="historyBtn">🔝</span>
    <div class="path">
        <img src="src/assets/img/setting/user-sm.png" alt="">
    </div>
    <div class="search">
        <img src="src/assets/img/setting/search.png" alt="">
    </div>

  </div>
</template>

<script setup>
/** 需求分析
 *  path框的图片是可以动态变化的
 *  路径框是可以匹配内容的
 *  前进后退按钮可用
 */
</script>

<style lang="scss" scoped>
  .pathTool {
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: .5em 1.3em;
    background-color: #ffffff;
    .historyBtn{
        font-size: 1.4em;
        margin-right: .5em;
    }

    .path{
        display: flex;
        align-items: center;
        padding: .6em .5em;
        width: 60%;
        height: 100%;
        border: 1px solid #dddddd;

        img{
            width: 1em;
            height: 1em;
        }
    }
    .search{
        display: flex;
        align-items: center;
        margin-left: 10px;
        padding: .6em .5em;
        flex: 1;
        height: 100%;
        border: 1px solid #dddddd;

        img{
            width: .8em;
            height: .8em;
        }
    }

  }
</style>
