<script setup>
  import request from 'request';
  request({
    method: 'get',
    url: '/users',
    data: {
      name: 'zs',
    },
  })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss" scoped></style>
