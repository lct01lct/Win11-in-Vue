<template>
  <div>
    <div class="mid-size" v-if="imgInfo.size == 'm'">
      <img :src="`src/assets/img/leftPane/${imgInfo.url}.png`" alt="" />
    </div>
    <div class="long-size" v-if="imgInfo.size == 'l'">
      <img :src="`src/assets/img/leftPane/${imgInfo.url}.png`" alt="" />
    </div>
    <div class="mid-size flex-column" v-if="imgInfo.size == 's'">
      <div class="small-size">
        <img :src="`src/assets/img/leftPane/${imgInfo.url.smallImgList[0]}.png`" alt="" />
      </div>
      <div class="small-size">
        <img :src="`src/assets/img/leftPane/${imgInfo.url.smallImgList[1]}.png`" alt="" />
      </div>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    imgInfo: null,
  });
</script>
<style lang="scss" scoped>
  .mid-size {
    width: 337px;
    height: 345px;
  }
  .long-size {
    width: 697px;
    height: 345px;
  }
  .small-size {
    width: 337px;
    height: 165px;
  }
  img {
    width: 100%;
    border-radius: 10px;
    &:hover {
      // backdrop-filter: flur(10px);
      opacity: 0.6;
    }
  }
  .flex-column {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
  }
</style>
