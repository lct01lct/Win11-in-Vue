export default {
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    toggleTheme(src) {
      this.themeSrc = src;
      localStorage.setItem('theme', src);
      document.querySelector(
        '#app'
      ).style.backgroundImage = `url(src/assets/img/setting/assetsImg/default/${src}.jpg)`;
    },
  },
};
