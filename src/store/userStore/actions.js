export default {
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    toggleTheme(src) {
      this.themeSrc = src;
    },
  },
};
