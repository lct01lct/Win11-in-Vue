<script setup>
  import useStore from './store';
  import { pagePos, getViewportSize } from '@/utils/ViewSize/utils';
  import { DragFeatrue } from '@/utils/ViewSize/drag';

  const store = useStore();
  const deskTopTipRef = ref(null);

  document.addEventListener('mousemove', function (e) {
    if (store.tipIsVisible) {
      // deskTopTipRef.value.style.left = pagePos(e).X + 15 + 'px';
      // deskTopTipRef.value.style.top = pagePos(e).Y + 15 + 'px';
      DragFeatrue.prototype.move.call(
        {
          mouseX: pagePos(e).X + 15,
          mouseY: pagePos(e).Y + 15,
          elem: deskTopTipRef.value,
        },
        0,
        0,
        {
          edgeWeight: getViewportSize().width,
          edgeHeight: getViewportSize().height,
        }
      );
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
    top: -999px;
    left: -999px;
    padding: 2px;
    font-size: 14px;
    color: #0033cc;
    background-color: #fff;
    border: 1px solid #000;
  }
</style>
