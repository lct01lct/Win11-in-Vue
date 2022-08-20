<template>
  <div class="box2">
    <!-- 头部栏 -->
    <div class="topNav">
      <p>All app</p>
      <button @click.stop="toPinned" class="elbutton">
        <i class="el-icon--left"></i>
        Back
      </button>
    </div>

    <!-- 按字母排序列表 -->
    <div class="tabList" v-if="!jump">
      <div class="scroll-item" :id="item.main" v-for="(item, index) in tabListData" :key="index">
        <h5 @click="showLetter">{{ item.mainList.length > 0 ? item.main : '' }}</h5>
        <div class="loopItem" v-for="(row, key) in item.mainList" :key="key">
          <img :src="`src/assets/img/icon/startIcon/${row.url}.png`" alt="" />
          <p>{{ row.name }}</p>
        </div>
      </div>
    </div>

    <!-- 跳出的字母 -->
    <div class="point" v-if="jump">
      <div
        :class="item.checked ? 'letters' : 'letter'"
        v-for="(item, index) in letterData"
        :key="index"
        @click="scrollToPosition(index)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script setup>
  // import { emit, ref } from 'process';
  // import { emit } from 'process';
  import { tabListData, letterData } from './StartData.json';
  const jump = ref(false);

  const emit = defineEmits(['changeTag']);

  const toPinned = () => {
    emit('changeTag');
  };
  // 遍历tabListData里面的应用开头的字母，找到字母表的字母，如果里面有应用的，标记
  const showLetter = () => {
    jump.value = true;
    for (let i = 0; i < tabListData.length; i++) {
      for (let j = 0; j < letterData.length; j++) {
        const tlDatta = tabListData[i];
        const letter = letterData[j];
        if (tlDatta.main === letter.name && tlDatta.mainList.length > 0) {
          letter.checked = true;
        }
      }
    }
  };

  function scrollToPosition(index) {
    console.log(`${index}提升到最高位置`);
  }
</script>

<style lang="scss" scoped>
  ::-webkit-scrollbar {
    width: 0;
  }
  .tabList {
    text-align: left;
    height: 515px;
    overflow: auto;
    h5 {
      width: 100%;
      // box-sizing: border-box;
      padding: 8px 0 8px 4px;
      font-size: 0.76em;
      font-weight: 400;
      cursor: pointer;
    }
    .loopItem {
      display: flex;
      align-items: center;
      padding: 8px 0 8px 30px;
      border-radius: 4px;
      img {
        width: 20px;
        height: 20px;
      }
      p {
        margin-left: 30px;
        line-height: 20px;
      }
      &:hover {
        background: rgb(255, 255, 255);
        border-radius: 3px;
      }
    }
  }
  .point {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    width: 160px;
    height: 280px;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-rows: repeat(7, minmax(0, 1fr));
    cursor: pointer;
    .letter {
      color: rgba(0, 0, 0, 0.36);
    }
    .letters {
      color: #010101;
    }
  }
  .box2 {
    font-size: 12px;
    .topNav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;
      color: #666;
      .elbutton {
        border: #b9ccef solid 1px;
        background: rgba(255, 255, 255, 0.9);
        padding: 5px 8px;
        border-radius: 3px;
        font-size: 12px;
        color: #333;
        .el-icon--right {
          margin-right: 3px;
        }
        &:hover {
          background: rgb(199 217 240 / 90%);
        }
      }
    }
  }
</style>
