<template>
  <DropDownMenuVue
    v-for="item in props.children"
    :key="item"
    :title="item.title"
    :type="item.type"
    :children="item.children"
  ></DropDownMenuVue>
</template>

<script setup>
  import DropDownMenuVue from './DropDownMenu.vue';
  const props = defineProps(['children']);
</script>

<style></style>
