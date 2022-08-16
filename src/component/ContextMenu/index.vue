<template>
  <div class="ContextMenu" ref="menuRef">
    <ul>
      <li>我</li>
      <li>是</li>
      <li>列</li>
      <li>表</li>
    </ul>
  </div>
</template>

<script setup>
  const props = defineProps(['position']);

  const that = getCurrentInstance();

  onMounted(() => {
    const Ref = that.refs.menuRef;
    Ref.style.top = `${props.position.y - Ref.clientHeight / 2}px`;
    Ref.style.left = `${props.position.x - Ref.clientWidth / 2}px`;
  });
</script>

<style lang="scss" scoped>
  .ContextMenu {
    position: absolute;
    width: 15em;
    height: 20em;
    // padding: 2em 1em;
    background-color: rgba(249, 249, 249, 0.9);
    border-radius: 1em;
    z-index: 99999;
    color: black;
  }
</style>
