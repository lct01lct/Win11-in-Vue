export default {
  state() {
    return {
      token: localStorage.getItem('token'),
      username: '',
      themeSrc: localStorage.getItem('theme') || 'default',
    };
  },
  getters: {
    getToken: (state) => state.token || localStorage.getItem('token'),
    getTheme: (state) => state.themeSrc || localStorage.getItem('theme'),
    getUsername: (state) => state.username || 'Root',
  },
};
