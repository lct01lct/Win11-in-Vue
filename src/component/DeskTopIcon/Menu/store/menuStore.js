import { defineStore } from 'pinia';

export default defineStore('menuStore', {
  state() {
    return {
      menuVisible: false,
    };
  },

  actions: {
    setMenuVisible(isVisible) {
      this.menuVisible = isVisible;
    },
  },
});
