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
      return targetComponent[0].isHide;
    },

    /**
     *  传入uuid，找到目标数据，更改属性：isMount、customZIndex
     *  调整层级顺序
     *  同步fixTaskBarComponent !!不需要!!
     *  同步currentShowComponent
     *
     * @param {*} uuid
     */
    // MARK: 不能盲目调用，需要在此处进行最大层级判断，如果是就return，需要完善scheduler.judgeMaxTrie 和 adjustComponentTrie方法
    // MARK：此外如果是tabBar调用，多次点击其实是可以隐藏的
    syncShowComponentData(uuid, isTaskBar) {
      if (!isNum(uuid)) {
        throw new Error('RECEIVER PARAMS NOT A NUMBER');
      }
      console.log('Show --> ', uuid);

      const targetComponent = catchTargetComponent(this.scheduler.components, uuid);
      // const isExist = catchTargetComponent(this.currentShowComponent, uuid);
      // if (isExist.length) {
      //   console.warn('MAYBE HAVE SOME ERROR FOR THIS FUNCTION OF YOUR CALLED');
      //   return;
      // }

      if (!targetComponent.length) {
        console.warn("CAN'T FIND THE uuid OF COMPONENT, YOU SHOULD CHECK THE uuid FROM YOU PASS");
        return;
      }

      const target = targetComponent[0];
      const isShow = target['isMount'] && target['customZIndex'] > 0;

      //// change property
      if (isTaskBar && isShow) {
        patchProperty(target, {
          isMount: true,
          customZIndex: -1,
        });
      } else {
        patchProperty(target, {
          isMount: true,
          customZIndex: uuid + 1,
        });
      }

      // Sync currentShowComponent
      const currentShow = {
        uuid,
        component: target,
        order: Date.now(),
        isHide: isShow,
        isFixTaskBar: target['IsShowTaskBar'],
      };

      // NOTE: duplicate removal
      const composeCurrentShowComponent = this.currentShowComponent.filter((v) => v.uuid !== uuid);
      this.updateCurrentShowComponent([...composeCurrentShowComponent, currentShow]);

      return isShow;
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

/*#__NO_PURE_#*/
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
