<template>
  <div class="Folder FullBox" v-if="isShow">
    <ToolBarVue @update:modelValue="changeIsShow">File Explorer</ToolBarVue>
  </div>
</template>
<script setup>
  import ToolBarVue from '../ToolBar/index.vue';

  const isShow = ref(true);

  const changeIsShow = ({ type } = item) => {
    if (type === 'mini') {
      isShow.value = false;
      setTimeout(() => {
        isShow.value = true;
      }, 3000);
    } else {
      isShow.value = false;
    }
  };
</script>

<style lang="scss" scoped>
//   .FullBox {
//   }
</style>
