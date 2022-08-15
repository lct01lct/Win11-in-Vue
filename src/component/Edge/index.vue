<template>
  <div class="EdgeFullBox FullBox">
    <ToolBarVue></ToolBarVue>
    <main class="edge">
      <iframe
        src="https://cn.bing.com/"
        frameborder="0"
        sandbox="allow-forms allow-scripts allow-modals allow-top-navigation"
        referrerpolicy="no-referrer"
      ></iframe>
    </main>
  </div>
</template>

<script setup>
  import ToolBarVue from '@/component/ToolBar/index.vue';
  // onMounted(() => {
  //   document.domain = 'https://cn.bing.com/';
  // });
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
