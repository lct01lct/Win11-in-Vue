import { defineStore } from 'pinia';

export default defineStore('terminalStore', {
  state() {
    return {
      currentFolder: Proxy,
    };
  },
  actions: {
    setCurrentFolder(folder) {
      this.currentFolder = folder;
    },
  },

  getters: {
    folder: (state) => state.currentFolder,
  },
});
