<template>
  <div>
    <settingsVue></settingsVue>
    <taskBarVue></taskBarVue>
    <Folder></Folder>
  </div>
</template>

<script setup>
  import settingsVue from '@/component/setting/index.vue';
  import taskBarVue from '@/component/taskBar/taskBar.vue';
  import Folder from '@/component/Folder/index.vue'
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }
</style>
