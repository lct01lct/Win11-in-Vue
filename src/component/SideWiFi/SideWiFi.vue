<template>
  <div class="sidePane">
    <div class="quickSettings">
      <div class="qkCont">
        <div
          class="qset-item"
          @click="selected(index)"
          v-for="(item, index) in WiFiData"
          :key="index"
        >
          <div class="quickIcon" :style="{ background: selectStat[index] != 0 ? '#0067c0' : '' }">
            <div :style="{ filter: selectStat[index] == 1 ? 'invert(1)' : '' }">
              <img width="16" :src="getSrcIconUI(`${item.url}.png`)" alt="" />
            </div>
          </div>
          <div class="qktext">{{ item.name }}</div>
        </div>
      </div>

      <div class="slineCont">
        <div class="mx-2">
          <img width="20" src="@/assets/img/icon/ui/brightness.png" alt="" />
        </div>
        <input class="Slider" type="range" min="10" max="100" value="100" />
      </div>
      <div class="slineCont">
        <div class="mx-2">
          <img width="20" src="@/assets/img/icon/ui/audio3.png" alt="" />
        </div>
        <input class="slider" type="range" min="0" max="100" value="100" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { WiFiData } from './WFData.json';
  import { getSrcIconUI } from '../../utils/getSrc';
  // import { ref } from 'vue'; // 先引入
  const selectStat = reactive(new Array(6).fill(0));
  // let selectStat0 = 1;
  function selected(index) {
    selectStat[index] = !selectStat[index];
    // selectStat0 = true;
    // console.log(selectStat[index]);
    // selectStat = [...selectStat];
    // selectStat.splice(1, 0);
    // that.ctx.$forceUpdate();
  }
</script>
<style lang="scss" scoped>
  .sidePane {
    position: absolute;
    bottom: 58px;
    right: 12px;
    width: 360px;
    border-radius: 0.5rem;
    background: #e9f2ff;
    padding: 1.25rem 1.25rem 2rem 1.25rem;
    overflow: hidden;
    z-index: -1;
  }
  .quickSettings {
    // background: #e9f2ff;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .qkCont {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .qset-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #2e2e2f;
    .quickIcon {
      &:hover {
        background: rgb(216 229 240 / 84%);
        // color: #e9f2ff;
      }
      width: 6rem;
      height: 3rem;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom-color: rgba(0, 0, 0, 0.2);
      background: #fffefecf;
      border: solid 0.1px rgba(17, 17, 17, 0.1);
      // transition: all 0.1s ease;
    }
    .qktext {
      font-size: 0.75em;
      margin: 0.5rem 0 1.33rem 0;
    }
  }
  .slineCont {
    width: 100%;
    display: flex;
    align-items: center;
    input {
      width: 100%;
      height: 5px;
      margin-left: 10px;
    }
  }
</style>
