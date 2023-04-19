import { h } from 'vue';
export class Scheduler {
  constructor(vNodes) {
    this.components = [];
    this.fixTaskBarComponent = [];
    this.currentShowComponent = [];
    this.size = 0;
    this.maxTrie = 1;

    this.Init(vNodes);
  }

  Init(vNodes) {
    this.handleComponent(vNodes);
    this.handlesFixTaskBarComponent();
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

  handlesFixTaskBarComponent() {
    this.components.forEach((type) => {
      if (type.IsShowTaskBar) {
        this.fixTaskBarComponent.push(type);
      }
    });
  }

  installComponents(vNodeImpl) {
    vNodeImpl = h(vNodeImpl);
    if (!isVNodeType(vNodeImpl)) {
      throw new Error('RECEIVER PARAMS NOT A VIRTUAL NODE');
    }

    const { vNode, type, IsShowTaskBar, iconImg, appName, isMount, customZIndex } =
      formatInitComponent(vNodeImpl);

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

  adjustComponentTier() {
    /**
     *  遍历所有挂载的且层级大于0的元素
     *  给他们的$$$refImpl 进行zIndex排序
     */
  }

  judgeIsMaxTrie() {}
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
