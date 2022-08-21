<script setup></script>
<script>
  import useFn from './useFn';
  export default {
    mixins: [useFn],
  };
</script>

<template>
  <ul class="icon-options-list">
    <li class="icon-option-item">
      <img src="src/assets/img/setting/cut.png" alt="" draggable="false" @click="fn" />
    </li>
    <li class="icon-option-item">
      <img src="src/assets/img/setting/copy.png" alt="" draggable="false" @click="fn" />
    </li>
    <li class="icon-option-item">
      <img src="src/assets/img/setting/paste.png" alt="" draggable="false" @click="fn" />
    </li>
    <li class="icon-option-item">
      <img src="src/assets/img/setting/rename.png" alt="" draggable="false" @click="fn" />
    </li>

    <li class="icon-option-item">
      <img src="src/assets/img/setting/cut.png" alt="" draggable="false" @click="fn" />
    </li>
    <li class="icon-option-item">
      <img src="src/assets/img/setting/cut.png" alt="" draggable="false" @click="fn" />
    </li>
  </ul>
  <div class="text-options-wrapper">
    <ul class="text-options-list">
      <li class="text-option-item" @click="fn">打开</li>
      <li class="text-option-item" @click="fn">以管理员身份打开</li>
      <li class="text-option-item" @click="fn">固定到开始屏幕</li>
      <li class="text-option-item" @click="fn">压缩为ZIP文件</li>
      <li class="text-option-item" @click="fn">复制文件地址</li>
      <li class="text-option-item" @click="fn">属性</li>
    </ul>
    <hr />
    <ul class="text-options-list">
      <li class="text-option-item" @click="fn">显示更多选项</li>
    </ul>
  </div>
</template>

<style scoped></style>
