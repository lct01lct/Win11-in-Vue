export default {
  actions: {
    cacheScheduler(scheduler) {
      this.scheduler = scheduler;

      return this;
    },

    // cacheComponents(components) {
    //   normalizeComponentsArray(components).forEach((item) => {
    //     this.scheduler.components.push(item);
    //   });

    //   return this;
    // },

    // cacheFixTaskBar(components) {
    //   normalizeComponentsArray(components).forEach((item) => {
    //     this.scheduler.fixTaskBarComponent.push(item);
    //   });

    //   return this;
    // },

    updateCurrentShowComponent(components) {
      this.scheduler.currentShowComponent = normalizeComponentsArray(components);
    },

    /**
     *  找到目标数据，给它的属性进行更改
     *  拿到currentShowTaskBar数据，更新数据将隐藏的数据进行修改
     * @param {*} uuid
     */
    syncHideComponentData(uuid, isRemove) {},

    syncShowComponentData(uuid) {},
  },
};

function normalizeComponentsArray(components) {
  return Array.isArray(components) ? components : [];
}
