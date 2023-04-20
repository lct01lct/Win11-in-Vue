import { h } from 'vue';
export default {
  actions: {
    cacheScheduler(scheduler) {
      this.scheduler = scheduler;

      return this;
    },

    updateCurrentShowComponent(components) {
      this.scheduler.addCurrentShowComponent(normalizeComponentsArray(components));
      // this.scheduler.currentShowComponent = normalizeComponentsArray(components);
    },

    // MARK：maybe remove
    installComponents(component) {
      this.scheduler.installComponents(component);
    },

    /**
     *  找到目标数据，给它的属性进行更改
     *  拿到currentShowTaskBar数据，更新数据将隐藏的数据进行修改
     * @param {*} uuid
     */
    syncHideComponentData(uuid, isRemove) {
      if (!isNum(uuid)) {
        throw new Error('RECEIVER PARAMS NOT A NUMBER');
      }
      console.log('Hide --> ', uuid);

      const targetComponent = catchTargetComponent(this.scheduler.currentShowComponent, uuid);

      if (!targetComponent.length) {
        console.warn("CAN'T FIND THE uuid OF COMPONENT, YOU SHOULD CHECK THE uuid FROM YOU PASS");
        return;
      }

      //// change property
      targetComponent[0].component.customZIndex = -1;
      targetComponent[0].isHide = isRemove ? false : !isRemove;
      if (isRemove) {
        targetComponent[0].component.isMount = false;
        const composeCurrentShowComponent = this.currentShowComponent.filter(
          (v) => v.uuid !== uuid
        );
        this.updateCurrentShowComponent(composeCurrentShowComponent);
      }

      // adjust component order call scheduler methods
      this.scheduler.adjustComponentTier();

      // sync currentShowComponent
      // NOTE: 我认为即使是最小化的组件也应该保存在currentShowComponent中
      //       这show，所代表的含义是是否存在节点
    },

    /**
     *  传入uuid，找到目标数据，更改属性：isMount、customZIndex
     *  调整层级顺序
     *  同步fixTaskBarComponent !!不需要!!
     *  同步currentShowComponent
     *
     * @param {*} uuid
     */
    syncShowComponentData(uuid) {
      if (!isNum(uuid)) {
        throw new Error('RECEIVER PARAMS NOT A NUMBER');
      }
      console.log('Show --> ', uuid);

      const targetComponent = catchTargetComponent(this.scheduler.components, uuid);

      if (!targetComponent.length) {
        console.warn("CAN'T FIND THE uuid OF COMPONENT, YOU SHOULD CHECK THE uuid FROM YOU PASS");
        return;
      }

      //// change property
      patchProperty(targetComponent[0], {
        isMount: true,
        customZIndex: uuid + 1,
      });

      // Sync currentShowComponent
      const currentShow = {
        uuid,
        component: targetComponent[0],
        order: Date.now(),
        isHide: false,
      };
      const composeCurrentShowComponent = [...this.currentShowComponent, currentShow];
      this.updateCurrentShowComponent(composeCurrentShowComponent);
    },

    toggleZIndexComponent(uuid) {
      const targetComponent = catchTargetComponent(this.scheduler.currentShowComponent, uuid);

      patchProperty(targetComponent[0], {
        isHide: false,
      });

      patchProperty(targetComponent[0].component, {
        customZIndex: uuid + 1,
      });
    },
  },
};

function normalizeComponentsArray(components) {
  return Array.isArray(components) ? components : [];
}

function catchTargetComponent(origin, uuid) {
  return normalizeComponentsArray(origin).filter((v) => v.uuid === uuid);
}

function isNum(v) {
  return typeof v === 'number';
}

function isObj(v) {
  return typeof v === 'object';
}

/* NO_PURE_ */
function patchProperty(origin, propList) {
  if (!isObj(propList)) {
    throw new Error('NOT A OBJ FOR THIS propList');
  }

  for (const k in propList) {
    const v = propList[k];
    if (k || v) {
      origin[k] = v;
    }
  }
}
