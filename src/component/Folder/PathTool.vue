<template>
  <div class="pathTool">
    <span class="historyBtn" @click="backToParent">ð</span>
    <span class="historyBtn" @click="goToChildren">ð</span>
    <span class="historyBtn" @click="goToDesc">ð</span>
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
  /** éæ±åæ
   *  pathæ¡çå¾çæ¯å¯ä»¥å¨æååç
   *  è·¯å¾æ¡æ¯å¯ä»¥å¹éåå®¹ç
   *  åè¿åéæé®å¯ç¨
   *  pathæ¡å¯ä»¥æä½æä»¶å¤¹
   *
   *  é¢æµæ¥æ¶åæ°ï¼
   *    å½åæä»¶å¤¹è·¯å¾ï¼æ°ç»å½¢å¼
   *    è§¦åå½æ°ï¼
   *      åè¿ï¼åé
   *      æç´¢ï¼å¹¶å°åå®¹ä¼ éè³ç¶ç»ä»¶
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

  // é¡¶é¨çpath
  // eslint-disable-next-line prefer-const
  let path = reactive([]);

  // è·¯å¾æ ç¹å»åæ¢
  const goTarget = (full, item) => {
    // æ¯è¾ç¬¨çtodo
    // æ ¹æ®ç¹å»çåé¤è·¯å¾ï¼ç¶ååæ¬¡éå½ç»ä»¶
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

  // çè§è·¯å¾åå
  watch(
    () => store.storeCurrentFolder,
    () => {
      path.splice(0, path.length, ...store.storeCurrentFolder.getPath());
    },
    { deep: true }
  );

  // æè·¯å¾åå¤ç
  const inputPath = computed({
    get() {
      return path.join('/');
    },
    set(newValue) {
      path.splice(0, path.length, ...newValue.split('/'));
      goTargetPath();
    },
  });

  // åéåè½æé®æ¹æ³ï¼è°ç¨æä»¶çå¬ç¨å¤çå½æ°
  const backToParent = () => {
    backParent();
  };

  // åè¿åè½æé®æ¹æ³ï¼è°ç¨æä»¶çå¬ç¨å¤çå½æ°
  const goToChildren = () => {
    goChildren();
  };

  // åå°é¡¶çº§ç£çåè½æé®æ¹æ³ï¼è°ç¨æä»¶çå¬ç¨å¤çå½æ°
  const goToDesc = () => {
    const res = goDesc(path);
    store.changeCurrentFolder(...res);
  };

  // æè·¯å¾å¹éåè½æé®æ¹æ³ï¼è°ç¨æä»¶çå¬ç¨å¤çå½æ°
  const goTargetPath = () => {
    const result = searchTargetFolderByPath(path);
    if (result) {
      store.changeCurrentFolder(result);
    }
  };

  const searchStr = (e) => {
    // todo
    // åå®¹é«äº®
    // éæ¹åé¡µé¢é»è¾ -> folderä¸»é¢æ¾ç¤ºç±storeCurrentFolder.children
    //  -> ç±ä¸ä¸ªæ°ç»æ¿æ¥ currentShowFolder  done
    const input = e.target.value;
    const res = searchTargetFolderByStr(input);

    // åæ¢é«äº®å­ä½
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
