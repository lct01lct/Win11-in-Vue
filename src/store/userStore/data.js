export default {
  state() {
    return {
      token: localStorage.getItem('token'),
    };
  },
  getters: {
    getToken: (state) => state.token || localStorage.getItem('token'),
  },
};
