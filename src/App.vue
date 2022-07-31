<script setup>
<<<<<<< HEAD
=======
  import request from 'request';
  request({
    method: 'get',
    url: '/user',
    data: {
      name: 'zs',
    },
  })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
>>>>>>> 9eecc03d065d7807ffe9c01afaa4770cef7431d5
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss" scoped></style>
