export default {
  getters: {
    getToken() {
      return `Bearer ${this.name}`;
    },
  },
};
