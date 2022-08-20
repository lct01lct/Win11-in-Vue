<template>
  <Popover dir="bottom">
    <div class="run">运行</div>
    <template #reference>
      <button ref="btnRef" class="ok">打开</button>
    </template>
  </Popover>
</template>

<script setup>
  // eslint-disable-next-line prefer-const
  let btnRef;
  const that = getCurrentInstance();
  onMounted(() => {
    btnRef = that.refs.btnRef;
  });
  setTimeout(() => {
    document.querySelector('.ok').click();
    console.log(document.querySelector('.ok'));
  }, 3000);
</script>

<style lang="scss" scoped>
  .run {
    width: 610px;
    height: 636px;
    border-radius: 3px;
    box-shadow: 1px 1px 2px rgba(34, 34, 34, 0.25);
    background-color: rgb(222 235 246);
    position: fixed;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
  }
</style>
