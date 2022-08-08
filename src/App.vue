<script setup>
  // import { MessageBox } from '@/plugin/Win10UI';
  // const messageBoxClick = () => {
  //   MessageBox({
  //     showCancelBtn: true,
  //     confirmBtnText: '确定按钮文本',
  //     title: '标题',
  //     content: '内容区域',
  //   })
  //     .then(() => {
  //       console.log('resolve');
  //     })
  //     .catch(() => {
  //       console.log('reject');
  //     });
  // };

  // const confirmBoxClick = () => {
  //   MessageBox.confrim({
  //     showCancelBtn: true,
  //     cancelBtnText: '取消按钮文本',
  //     confirmBtnText: '确定按钮文本',
  //     title: '标题',
  //     content: '内容区域',
  //   })
  //     .then(() => {
  //       console.log('resolve');
  //     })
  //     .catch(() => {
  //       console.log('reject');
  //     });
  // };

  // const promptBoxClick = () => {
  //   MessageBox.prompt({
  //     showCancelBtn: true,
  //     cancelBtnText: '取消按钮文本',
  //     confirmBtnText: '确定按钮文本',
  //     title: '标题',
  //     content: '内容区域',
  //   })
  //     .then((value) => {
  //       console.log('resolve:' + value);
  //     })
  //     .catch(() => {
  //       console.log('reject');
  //     });
  // };
</script>

<template>
  <router-view></router-view>
  <!-- <button @click="messageBoxClick">1</button>
  <button @click="confirmBoxClick">2</button>
  <button @click="promptBoxClick">3</button> -->
</template>

<style lang="scss" scoped></style>
