<script setup></script>
<script>
  import useFn from './useFn';
  export default {
    mixins: [useFn],
  };
</script>

<template>
  <div class="text-options-wrapper">
    <ul class="text-options-list">
      <li class="text-option-item" @click="fn">查看</li>
      <li class="text-option-item" @click="fn">排序方式</li>
      <li class="text-option-item" @click="fn">刷新</li>
      <li class="text-option-item" @click="fn">新建</li>
      <!-- <li class="text-option-item">以管理员身份打开</li>
        <li class="text-option-item">固定到开始屏幕</li>
        <li class="text-option-item">压缩为ZIP文件</li>
        <li class="text-option-item">复制文件地址</li>
        <li class="text-option-item">属性</li> -->
    </ul>
    <hr />
    <ul class="text-options-list">
      <li class="text-option-item" @click="fn">显示更多选项</li>
    </ul>
    <hr />
    <ul class="text-options-list">
      <!-- <li class="text-option-item">OneDirve</li> -->
      <li class="text-option-item" @click="fn">显示设置</li>
      <li class="text-option-item" @click="fn">个性化</li>
      <li class="text-option-item" @click="fn">Open in Windows Terminal</li>
      <li class="text-option-item" @click="fn">显示更多选项</li>
    </ul>
  </div>
</template>

<style scoped></style>
