<template>
  <div class="wrap" @click="toggleLogin">
    <span class="time" v-if="!isShow">{{ time }}</span>
    <div class="login-wrap" v-if="isShow">
      <div class="user-wrap">
        <div class="avatar-wrap">
          <img src="@/assets/img/setting/assetsImg/avatar/default.jpg" />
        </div>
        <div class="username">{{ loginForm.name }}</div>
      </div>
      <input type="password" class="password-ipt" v-model="loginForm.password" />
      <button class="login-btn" @click="goToHome">Sign In</button>
      <div class="error">{{ errMessage }}</div>
    </div>
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

  // 输入框的显示
  const isShow = ref(false);

  const time = computed(() => {
    return new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  });

  const toggleLogin = (e) => {
    e.target.classList.add('blur-wrap');
    isShow.value = true;
  };

  const goToHome = () => {
    // login(loginForm)
    //   .then((res) => {
    //     console.log(res);
    //     userStore.setToken(res.token);
    router.push({ name: 'Home' });
    // })
    // .catch((err) => {
    //   console.log(err);
    //   errMessage.value = err && err.message;
    // });
  };
</script>

<style lang="scss" scoped>
  .wrap {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.8s ease-in-out;
    background: url('@/assets/img/setting/assetsImg/default/dark.jpg');
    background-attachment: fixed;
    background-size: 100% 100%;
    transform: scale(1.1);
    animation: reverse slideOut 0.6s;

    .time {
      align-self: flex-start;
      margin-top: 5em;
      position: absolute;
      color: white;
      font-size: 2em;
      z-index: 9;
    }

    .login-wrap {
      position: absolute;
      z-index: 9;
      display: flex;
      flex-direction: column;
      align-items: center;
      animation: slideIn 1s;
      .user-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .username {
          color: white;
          font-size: 1.8em;
          margin: 0.8em;
        }
        .avatar-wrap {
          img {
            width: 10em;
            height: 10em;
            border-radius: 5em;
          }
        }
      }

      .login-btn {
        margin: 0.5em;
        padding: 0.2em 1em;
        border: 2px solid transparent;
        border-radius: 5px;
        background-color: rgba(237, 234, 234, 0.3);
        &:hover {
          border-color: #8e99f1;
        }
      }
    }
  }

  .wrap::before {
    content: '';
    width: 100%;
    height: 100%;
  }
  .blur-wrap::before {
    filter: blur(25px);
    backdrop-filter: blur(25px);
  }

  @keyframes slideOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(4em);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .error {
    color: red;
  }
</style>
