<template>
  <div>
    <settingsVue></settingsVue>
    <taskBarVue></taskBarVue>
    <Folder></Folder>
    <Edge></Edge>
  </div>
</template>

<script setup>
  import settingsVue from '@/component/setting/index.vue';
  import taskBarVue from '@/component/taskBar/taskBar.vue';
  import Folder from '@/component/Folder/index.vue'
  import Edge from '@/component/Edge/index.vue'
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }
</style>
