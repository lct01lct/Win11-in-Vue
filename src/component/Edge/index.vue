<template>
  <div class="EdgeFullBox FullBox">
    <ToolBarVue></ToolBarVue>
    <main>
      <iframe :src="src" frameborder="0"></iframe>
    </main>
  </div>
</template>

<script setup>
  import ToolBarVue from '@/component/ToolBar/index.vue';
  const src = ref('');
  onMounted(() => {
    src.value = 'https://cn.bing.com/';
  });
</script>

<style lang="scss" scoped>
  .EdgeFullBox {
    main {
      width: 100%;
      height: calc(100% - 30px);

      iframe {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
