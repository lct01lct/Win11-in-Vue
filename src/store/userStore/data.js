export default {
  state() {
    return {
      token: localStorage.getItem('token'),
      themeSrc: 'default',
      systemName: 'Windows',
      accountName: 'night',
    };
  },
  getters: {
    getToken: (state) => state.token || localStorage.getItem('token'),
  },
};
