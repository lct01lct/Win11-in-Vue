<template>
  <div class="login-wrap">
    <div class="user-wrap">
      <div class="avatar-wrap"></div>
      <div class="username">User</div>
    </div>
    <input type="password" class="password-ipt" v-model="loginForm.password" />
    <button class="login-btn" @click="goToHome">登录</button>
    <div class="error">{{ errMessage }}</div>
  </div>
</template>

<script setup>
  import { login } from './api';
  import useUserStore from 'store/userStore';
  import router from '@/router';
  const userStore = useUserStore();

  const loginForm = reactive({
    name: 'lct-user',
    password: '123456',
  });

  const errMessage = ref('');

  const goToHome = () => {
    login(loginForm)
      .then((res) => {
        userStore.setToken(res.token);
        router.push({ name: 'Home' });
      })
      .catch((err) => {
        console.log(err);
        errMessage.value = err && err.message;
      });
  };
</script>

<style lang="scss" scoped>
  .login-wrap {
    margin: 50px 500px;
  }
  .error {
    color: red;
  }
</style>
