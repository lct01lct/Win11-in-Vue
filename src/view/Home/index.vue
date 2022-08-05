<template>
<<<<<<< HEAD
  <div class="root">
    <settingsVue></settingsVue>
    <taskBarVue></taskBarVue>
=======
  <div>
    <settingsVue></settingsVue>
    <Folder></Folder>
>>>>>>> account
  </div>
</template>

<script setup>
  import settingsVue from '../../component/setting/settings.vue';
  import taskBarVue from '../../component/taskBar/taskBar.vue';
</script>

<style lang="scss" scoped>
  .root {
    background-image: url(@/assets/img/mainPage/win10.png);

    min-width: 100vw;
    min-height: 100vh;

    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  * {
    box-sizing: border-box;
  }
</style>
