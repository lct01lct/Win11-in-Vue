<script setup>
  import data from '@/data/folders-data';
  import Desc from '@/utils/desc';

  const descs = (function () {
    const descs = [];
    data.forEach((desc) => {
      descs.push(new Desc(desc));
    });
    return descs;
  })();

  console.log(descs[1].children[0]);
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss" scoped></style>
