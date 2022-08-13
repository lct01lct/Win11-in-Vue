import { defineStore } from 'pinia';
import { getViewportSize } from '@/utils/ViewSize/utils';

export default defineStore('deskTopConfigStore', {
  state() {
    return {
      iconBaseWeight: 76.8,
      iconBaseHeight: 76.8,
      taskbarHeight: 48,
    };
  },
  getters: {
    maxIconCountX: (state) =>
      (getViewportSize().height - state.taskbarHeight) / state.iconBaseWeight,
    maxIconCountY: (state) => getViewportSize().weight / state.iconBaseHeight,
  },
});
