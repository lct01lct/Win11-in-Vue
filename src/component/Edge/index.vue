<template>
  <div class="EdgeFullBox FullBox">
    <ToolBarVue></ToolBarVue>
    <main class="edge">
      <!-- <iframe
        src="https://cn.bing.com/"
        frameborder="0"
        sandbox="allow-forms allow-scripts allow-modals allow-top-navigation"
        referrerpolicy="no-referrer"
      ></iframe> -->
    </main>
  </div>
</template>

<script></script>

<script setup>
  import ToolBarVue from '@/component/ToolBar/index.vue';
  defineProps({
    IsShowTaskBar: true,
    appName: 'edge',
    iconImg: '/src/assets/img/icon/edge.png',
  });

  const url =
    'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0892cf3187b742d68aad4a0efc9c384d~tplv-k3u1fbpfcp-zoom-crop-mark:1512:1512:1512:851.awebp?';
  const getUrl = () =>
    new Promise((resolve, reject) => {
      const url =
        'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0892cf3187b742d68aad4a0efc9c384d~tplv-k3u1fbpfcp-zoom-crop-mark:1512:1512:1512:851.awebp?';
      const img = new Image();
      img.onload = () => {
        resolve(img);
      };

      img.reject = () => {
        reject(1);
      };
      img.src = url;
    });
  let ur = reactive();
  getUrl().then((res) => {
    ur = res;
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
