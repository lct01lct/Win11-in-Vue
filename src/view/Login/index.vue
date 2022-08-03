<template>
  <div class="login-wrap">
    <div class="user-wrap">
      <div class="avatar-wrap"></div>
      <div class="username">User</div>
    </div>
    <input type="password" class="password-ipt" v-model="loginForm.password" />
    <button class="login-btn" @click="login">登录</button>
    <div class="error">{{ errmessage }}</div>
  </div>
</template>

<script setup>
  import loginApi from './api/index';

  const loginForm = reactive({
    name: 'lct-user',
    password: '123456',
  });

  const errmessage = ref('');

  const login = () => {
    loginApi
      .login(loginForm)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        errmessage.value = err.message;
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
