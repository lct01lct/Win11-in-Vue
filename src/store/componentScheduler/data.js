// export default {
//   state() {
//     return {
//       components: [],
//       fixTaskBarComponent: [],
//       currentShowTaskBar: [],
//     };
//   },
// };

export default {
  state() {
    return {
      scheduler: null,
    };
  },
  getters: {
    components: (state) => state.scheduler.components || [],
    fixTaskBarComponent: (state) => state.scheduler.fixTaskBarComponent || [],
    currentShowComponent: (state) => state.scheduler.currentShowComponent || [],
  },
};
