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
    </ul>
    <hr />
    <ul class="text-options-list">
      <li class="text-option-item" @click="fn">显示更多选项</li>
    </ul>
    <hr />
    <ul class="text-options-list">
      <li class="text-option-item" @click="fn">显示设置</li>
      <li class="text-option-item" @click="fn">个性化</li>
      <li class="text-option-item" @click="fn">Open in Windows Terminal</li>
      <li class="text-option-item" @click="fn">显示更多选项</li>
    </ul>
  </div>
</template>

<style scoped></style>
