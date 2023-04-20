import { h } from 'vue';
export class Scheduler {
  constructor(vNodes) {
    this.components = [];
    this.fixTaskBarComponent = [];
    this.currentShowComponent = []; // component + timeStamp
    this.size = 0;
    this.maxTrie = 1;

    this.Init(vNodes);
  }

  Init(vNodes) {
    this.handleComponent(vNodes);
    this.handlesAddFixTaskBarComponent();
    this.size = this.components.length;
  }

  handleComponent(vNodes) {
    for (const k in vNodes) {
      const { vNode, type, IsShowTaskBar, iconImg, appName, isMount, customZIndex } =
        formatInitComponent(h(vNodes[k]));

      this.components.push({
        uuid: this.size++,
        $$$refImpl: null,
        vNode,
        type,
        IsShowTaskBar,
        iconImg,
        appName,
        isMount,
        customZIndex,
        removeNode: null,
      });
    }
  }

  handlesAddFixTaskBarComponent() {
    this.components.forEach((type) => {
      if (type.IsShowTaskBar) {
        this.addFixTaskBarComponent(type);
      }
    });
  }

  addFixTaskBarComponent(components) {
    this.fixTaskBarComponent.push(components);
  }

  removeTaskBarComponent(uuid) {
    this.fixTaskBarComponent = this.fixTaskBarComponent.filter((v) => v.uuid != uuid);
  }

  installComponents(vNodeImpl) {
    vNodeImpl = h(vNodeImpl);
    if (!isVNodeType(vNodeImpl)) {
      throw new Error('RECEIVER PARAMS NOT A VIRTUAL NODE');
    }

    const { vNode, type, IsShowTaskBar, iconImg, appName, isMount, customZIndex } =
      formatInitComponent(vNodeImpl);

    const components = {
      uuid: this.size++,
      $$$refImpl: null,
      vNode,
      type,
      IsShowTaskBar,
      iconImg,
      appName,
      isMount,
      customZIndex,
      removeNode: null,
    };

    if (IsShowTaskBar) {
      this.addFixTaskBarComponent(components);
    }
    this.components.push(components);
  }

  uninstallComponents(uuid) {
    const isNum = typeof uuid === 'number';
    if (!isNum) {
      throw new Error('YOU MUST REMOVE COMPONENT BY uuid, THE uuid IS A Number');
    }

    const targetIdx = this.components.findIndex((v) => v.uuid === uuid);
    if (targetIdx === -1) {
      console.warn('THE uuid OF COMPONENT NOT EXIST');
      return;
    }

    const target = this.components[targetIdx];
    this.components.splice(targetIdx, 1);

    if (target.IsShowTaskBar) {
      this.fixTaskBarComponent.splice(targetIdx, 1);
    }
  }

  addCurrentShowComponent(components) {
    this.currentShowComponent = components;
  }

  // MARK: maybe remove
  updateComponents() {
    /**
     * 什么时候需要更新组件？ 更新某个属性还是更新整个元素
     * 一般是在最小化隐藏（层级）某个组件的时候，因为遍历的是currentShowComponent
     *    所以需要同步更改一下，可能后续会想到一个更好的解决方案，比如在UI层采取computed类实现
     */
  }

  adjustComponentTier(uuid) {
    /**
     *  遍历所有挂载的且层级大于0的元素
     *  给他们的$$$refImpl 进行zIndex排序
     *  难点：如何将影响降到最低
     */
    if (uuid) {
      /**
       * NOTE：表明此为拖动标题框
       * 不要做多内容重排，影响面比较大，直接调大层级即可
       */

      return;
    }

    /**
     *  一般为默认开启新App，需要调用该函数
     *  函数会返回一个目标层级，一般来说就是最大的层级
     *  除此之外还需要调整其他层级，需要对现阶段所有显示的组件重新排列层级
     *  同一时间只需要一个层级处于最上层
     */

    /**
     *  但是问题来了，遍历的对象是components还是currentShowComponent
     *  这会涉及到响应式的问题
     *  思考：什么东西需要考虑层级的问题？没有显示的组件需要考虑层级吗？
     *  显然不需要，因此遍历currentShowComponent
     */
  }

  judgeIsMaxTrie(customZIndex) {
    return customZIndex >= this.maxTrie;
  }
}

function isVNodeType(v) {
  return typeof v.type === 'object';
}

function formatInitComponent(vNode) {
  const type = vNode.type;
  const props = type.props || {};
  const IsShowTaskBar = props.IsShowTaskBar || false;
  const iconImg = props.iconImg || null;
  const appName = props.appName || null;
  const isMount = false;
  const customZIndex = -1;

  // BUG: 不能挂载props上的属性
  //      考虑到注册的都是app级应用，并不需要系统对他们传递props
  //      如果需要props，可以使用store或者依赖注入解决
  delete type.props;
  return {
    vNode,
    type,
    IsShowTaskBar,
    iconImg,
    appName,
    isMount,
    customZIndex,
  };
}
