import { defineStore } from 'pinia';

export default defineStore('deskTopTipStore', {
  state() {
    return {
      tipIsVisible: false,
      tipContent: '',
    };
  },
  actions: {
    setTipIsVisible(isVisible) {
      this.tipIsVisible = isVisible;
    },
    setTipContent(content) {
      this.tipContent = content;
    },
  },
});
