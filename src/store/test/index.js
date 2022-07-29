import { defineStore } from 'pinia';

export default defineStore({
  id: 'test',
  state: () => {
    return {
      name: '张三',
    };
  },
});
