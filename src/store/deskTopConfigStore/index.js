import { defineStore } from 'pinia';
import { getViewportSize } from '@/utils/ViewSize/utils';

export default defineStore('deskTopConfigStore', {
  state() {
    return {
      iconBaseWeight: 76.8,
      iconBaseHeight: 76.8,
      taskbarHeight: 48,
      currentSelected: [],
      isIconMenuVisible: false,
    };
  },
  getters: {
    maxIconCountY: (state) =>
      Math.floor((getViewportSize().height - state.taskbarHeight) / state.iconBaseWeight),

    maxIconCountX: Math.floor((state) => getViewportSize().weight / state.iconBaseHeight),

    deskTopViewSize: (state) => getViewportSize().height - state.taskbarHeight,
  },
  actions: {
    changeCurrentSelected(data) {
      this.currentSelected = [];
      if (Array.isArray(data)) {
        this.currentSelected = this.currentSelected.concat(data);
      } else {
        this.currentSelected.push(data);
      }
    },
  },
});
