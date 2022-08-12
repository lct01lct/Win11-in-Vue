<script setup>
  import useStore from './store';
  import { pagePos } from '@/utils/ViewSize/utils';

  const store = useStore();
  const deskTopTipRef = ref(null);

  document.addEventListener('mousemove', function (e) {
    if (store.tipIsVisible) {
      deskTopTipRef.value.style.left = pagePos(e).X + 15 + 'px';
      deskTopTipRef.value.style.top = pagePos(e).Y + 15 + 'px';
    }
  });
</script>

<template>
  <div class="deskTop-tip" v-if="store.tipIsVisible" ref="deskTopTipRef">
    {{ store.tipContent }}
  </div>
</template>

<style scoped>
  .deskTop-tip {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    padding: 2px;
    font-size: 14px;
    color: #0033cc;
    background-color: #fff;
    border: 1px solid #000;
  }
</style>
