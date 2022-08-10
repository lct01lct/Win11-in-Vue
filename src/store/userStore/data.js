export default {
  state() {
    return {
      token: localStorage.getItem('token'),
      themeSrc: localStorage.getItem('theme') || 'default',
      systemName: 'Windows',
      accountName: 'night',
      storeCurrentFolder: {},
      storeCompletedFolder: {},
      lastFolder: [],
    };
  },
  getters: {
    getToken: (state) => state.token || localStorage.getItem('token'),
    getTheme: (state) => state.themeSrc || localStorage.getItem('theme'),
  },
};
