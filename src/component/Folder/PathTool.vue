<template>
  <div class="pathTool">
    <span class="historyBtn" @click="backToParent">🔙</span>
    <span class="historyBtn" @click="goToChildren">🔜</span>
    <span class="historyBtn" @click="goToDesc">🔝</span>
    <div class="path">
      <img src="@/assets/img/setting/user-sm.png" alt="" />
      <input type="text" id="input" v-model.lazy.trim="inputPath" />
      <div class="path-content">
        <span v-for="item in path" :key="item">
          <i @click="goTarget(path, item)">{{ item }}</i>
          <div class="showOtherBrother" @click="showOtherBrother(path, item)">&gt;</div>
        </span>
      </div>
      <label for="input" class="clickLocation"></label>
    </div>
    <div class="search">
      <img src="@/assets/img/setting/search.png" alt="" />
      <input type="text" placeholder="search" @keydown.enter="searchStr($event)" />
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

  // import folderStore tool to change MainBody
  import {
    searchTargetFolderByPath,
    searchTargetFolderByStr,
    goChildren,
    backParent,
    goDesc,
  } from '@/utils/handleFolder.js';
  import folderStore from '@/store/folderStore';
  const store = folderStore();

  // 顶部的path
  // eslint-disable-next-line prefer-const
  let path = reactive([]);

  // 路径栏点击切换
  const goTarget = (full, item) => {
    // 比较笨的todo
    // 根据点击的切除路径，然后再次递归组件
    // eslint-disable-next-line prefer-const
    let tempArray = JSON.parse(JSON.stringify(full));
    tempArray.map((value, i) => {
      if (value === item) {
        const length = tempArray.length - i;
        tempArray.splice(i + 1, length);
      }
    });
    const result = searchTargetFolderByPath(tempArray);
    if (result) {
      store.changeCurrentFolder(result);
    }
  };

  const showOtherBrother = (full, item) => {
    // eslint-disable-next-line prefer-const
    let tempArray = JSON.parse(JSON.stringify(full));
    tempArray.map((value, i) => {
      if (value === item) {
        const length = tempArray.length - i;
        tempArray.splice(i + 1, length);
      }
    });
    console.log(tempArray);
    const result = searchTargetFolderByPath(tempArray);
    console.log(result);
  };

  // 监视路径变化
  watch(
    () => store.storeCurrentFolder,
    () => {
      path.splice(0, path.length, ...store.storeCurrentFolder.getPath());
    },
    { deep: true }
  );

  // 把路径做处理
  const inputPath = computed({
    get() {
      return path.join('/');
    },
    set(newValue) {
      path.splice(0, path.length, ...newValue.split('/'));
      goTargetPath();
    },
  });

  // 后退功能按键方法，调用文件的公用处理函数
  const backToParent = () => {
    backParent();
  };

  // 前进功能按键方法，调用文件的公用处理函数
  const goToChildren = () => {
    goChildren();
  };

  // 回到顶级磁盘功能按键方法，调用文件的公用处理函数
  const goToDesc = () => {
    const res = goDesc(path);
    store.changeCurrentFolder(...res);
  };

  // 按路径匹配功能按键方法，调用文件的公用处理函数
  const goTargetPath = () => {
    const result = searchTargetFolderByPath(path);
    if (result) {
      store.changeCurrentFolder(result);
    }
  };

  const searchStr = (e) => {
    // todo
    // 内容高亮
    // 需改变页面逻辑 -> folder主题显示由storeCurrentFolder.children
    //  -> 由一个数组承接 currentShowFolder  done
    const input = e.target.value;
    const res = searchTargetFolderByStr(input);

    // 切换高亮字体
    if (res.length) {
      store.setCurrentSearchStr(input.split(''));
    }
    store.changeCurrentShowFolder(res);
  };
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
        height: 100%;
        font-size: 0.8em;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        span {
          margin-left: 0.5em;
          height: 100%;
          flex-wrap: nowrap;
          overflow: hidden;
          display: flex;
          align-items: center;
          // padding: 4px;
          // &::after {
          //   content: '>';
          //   margin-left: 0.2em;
          // }
          i {
            display: flex;
            align-items: center;
            height: 100%;
            padding: 4px;
            &:hover {
              background-color: rgba($color: #000000, $alpha: 0.1);
            }
          }

          .showOtherBrother {
            position: relative;
            margin-left: 5px;
            font-style: normal;

            &:hover {
              transform: rotate(90deg);
            }
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
        width: 100%;
        border: 0;
        font-size: 0.8em;
        padding-left: 0.8em;
      }
    }
  }

  .clickLocation {
    flex-grow: 1;
    min-width: 1em;
    height: 100%;
  }
</style>
