<template>
  <DropDownMenuVue
    v-for="item in props.children"
    :key="item"
    :name="item.name"
    :children="item.children ? item.children : []"
    :path="item.path ? item.path : undefined"
    :obj="item"
  ></DropDownMenuVue>
</template>

<script setup>
  import DropDownMenuVue from './DropDownMenu.vue';
  const props = defineProps(['children']);
  // console.log(props.children, 1111111111111);
</script>

<style></style>
