<script setup>
  import { toolSize } from '@/data';
  import { hideBox, searchMaxZindex } from '@/utils';
  import { BindGlobalEvent, RemoveGlobalEvent, BindEvent } from '@/utils/bind.js';
  import { changeDomStyle } from '@/utils/domSet.js';
  import { getSrcSetting } from '../../utils/getSrc';
  import useCompScheduler from '@/store/componentScheduler';
  import { scheduler } from '../../scheduler';
  scheduler
  
  const store = useCompScheduler()
  const props = defineProps({
    color: {
      type: String,
      default: 'black',
    },
  });
  const refParent = ref(null);
  let parent;

  // 最大化或者最小化图标
  const MaxOrMin = ref('maxmin');
  // 更改图标
  const changeIcon = () => {
    const allTcon = ['maximize', 'maxmin'];
    const isFullScreen = parent.style.width === '100%' && parent.style.height === '100%';
    if (isFullScreen) {
      MaxOrMin.value = allTcon[0];
    } else {
      MaxOrMin.value = allTcon[1];
    }
  };

  let { viewSizeWidth, viewSizeHeight, top, left } = toolSize;
  // 拆分功能区
  const splitFlag = ref(false);

  console.log('我初始化了');

  onMounted(() => {
    parent = refParent.value.offsetParent;
    changeDomStyle(parent, {
      width: `${viewSizeWidth}px`,
      height: `${viewSizeHeight}px`,
      left: `${left}px`,
      top: `${top}px`,
    });
  });

  // 最小化
  const mini = () => {
    hideBox(true, parent, parent.classList[0]);
  };

  // 关闭
  const close = () => {
    // console.log(scheduler);

    scheduler.components.filter(v => v.isMount === true).forEach(item => {
      const parentScopeId = parent.__vnode.scopeId
      const curScopeId = item.$$$refImpl.__vnode.scopeId
      if(parentScopeId === curScopeId) {
        item.removeNode()
      }
    })
    
    // console.log(parent, store);
    // hideBox(false, parent, parent.classList[0]);
  };

  // 切换最大化最小化
  const max = () => {
    const width = parent.style.width;
    const isFullWidth = width === '' || width === '100%';
    let changeObj = {};

    if (isFullWidth) {
      // 默认最小化为用户自定义的宽度大小，位置
      changeObj = {
        width: `${viewSizeWidth}px`,
        height: `${viewSizeHeight}px`,
        left: `${left}px`,
        top: `${top}px`,
      };
    } else {
      changeObj = {
        width: '100%',
        height: '100%',
        left: '0',
        top: '0',
      };
    }

    changeDomStyle(parent, changeObj);
    changeIcon();
  };

  // 拖动元素
  const moveBox = (e) => {
    // 无论是否拖动，点击即会改变层级
    // 获取层级最大的元素，并并加一
    parent.style.zIndex = searchMaxZindex();

    // 初始鼠标按下时候的，在toolbar的位置
    const X = e.pageX - parent.offsetLeft;
    const Y = e.pageY - parent.offsetTop;

    parent.classList.add('notransition');

    // 移动监听事件
    const move = (e) => {
      const ofX = e.pageX - X;
      const ofY = e.pageY - Y;

      parent.style.top = ofY + 'px';
      parent.style.left = ofX + 'px';

      // 更新位置的数据
      left = ofX;
      top = ofY;
    };

    // 添加监听和移除监听
    BindGlobalEvent('mousemove', move);
    BindGlobalEvent('mouseup', () => {
      parent.classList.remove('notransition');
      RemoveGlobalEvent('mousemove', move);
    });
  };

  /**
   * 框的左右上下缩放
   * @param {*} e -> Event Object
   * 先给框的四周加上四个宽3px高100% 的div
   * 给四个div监听鼠标按下事件，即是触发缩放的边缘了
   * 监听滑动事件即开始缩放
   * 监听鼠标弹起事件即删除监听
   */
  const dragChangeSize = (flag) => {
    parent.classList.add('notransition');
    const move = (e) => {
      if (flag === 'HEIGHT') {
        const ofT = parent.offsetTop;
        parent.style.height = e.pageY - ofT + 'px';

        // 更新改变视窗的大小，并更新viewData的数据
        viewSizeHeight = e.pageY - ofT;
      } else {
        const ofL = parent.offsetLeft;

        parent.style.width = e.pageX - ofL + 'px';

        // 更新改变视窗的大小，并更新viewData的数据
        viewSizeWidth = e.pageX - ofL;
      }
    };

    BindGlobalEvent('mousemove', move);
    BindGlobalEvent('mouseup', () => {
      parent.classList.remove('notransition');
      document.removeEventListener('mousemove', move);
    });
  };

  // maxButton 的移入事件，target：显示split窗口
  const showSplit = async (e) => {
    const target = e.target;

    const flag = await new Promise((resolve) => {
      const timer = setTimeout(() => {
        resolve(true);
      }, 800);

      BindEvent(target, 'mouseleave', () => {
        clearTimeout(timer);
        resolve(false);
      });
    });
    if (flag) {
      splitFlag.value = true;
    }
  };

  // 监听分割窗的移除事件，立即关闭该窗口
  const closeSplit = () => {
    splitFlag.value = false;
  };

  // 拆分视窗
  const splitFunction = (flag) => {
    switch (flag) {
      case 'left': {
        changeDomStyle(parent, {
          width: '50vw',
          height: '100vh',
          left: 0,
          top: 0,
        });
        break;
      }
      case 'right': {
        changeDomStyle(parent, {
          width: '50vw',
          height: '100vh',
          left: `${document.body.clientWidth / 2}px`,
          top: 0,
        });
        break;
      }
      case 'top': {
        changeDomStyle(parent, {
          width: '100vw',
          height: '50vh',
          left: 0,
          top: 0,
        });
        break;
      }
      case 'bottom': {
        changeDomStyle(parent, {
          width: '100vw',
          height: '50vh',
          left: 0,
          top: `${window.screen.height / 2}px`,
        });
        break;
      }
    }
    changeIcon();
  };
</script>
<template>
  <div class="topButton">
    <div class="title" :style="{ color: color }" @mousedown="moveBox" ref="refParent">
      <slot></slot>
    </div>
    <div class="functionArea">
      <button @click="mini"><img src="@/assets/img/setting/minimize.png" /></button>
      <button @click="max" @mouseenter="showSplit">
        <img :src="getSrcSetting(`${MaxOrMin}.png`)" />
      </button>
      <button @click="close"><img src="@/assets/img/setting/close.png" /></button>
    </div>
    <div class="right" @mousedown="dragChangeSize('WIDTH')"></div>
    <div class="bottom" @mousedown="dragChangeSize('HEIGHT')"></div>
    <div class="splitTool" v-if="splitFlag" @mouseleave="closeSplit">
      <div class="splitLeft">
        <span class="splitLeft-left" @click="splitFunction('left')"></span>
        <span class="splitLeft-right" @click="splitFunction('right')"></span>
      </div>
      <div class="splitRight">
        <span class="splitRight-top" @click="splitFunction('top')"></span>
        <span class="splitRight-bottom" @click="splitFunction('bottom')"></span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .topButton {
    display: flex;
    height: 30px;
    justify-content: space-between;
    user-select: none;
    .title {
      width: calc(100% - 150px);
      padding-left: 10px;
      line-height: 30px;
      font-size: 12px;
    }
    .functionArea {
      flex: 1;
      button {
        width: 33.33%;
        height: 100%;
        border: 0;
        background-color: transparent;
        &:hover {
          background-color: #d6d6d7;
        }
        &:nth-last-child(1):hover {
          background-color: red;
        }
      }
    }
  }

  img {
    width: 40%;
  }

  .right {
    position: absolute;
    right: 0;
    width: 3px;
    height: 100%;
    cursor: e-resize;
  }
  .bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 3px;
    cursor: s-resize;
  }
  .splitTool {
    position: absolute;
    right: 2em;
    top: 25px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 99;

    width: 10em;
    height: 5em;
    background-color: #2e2e2e;
    border-radius: 0.7em;

    .splitLeft,
    .splitRight {
      width: 40%;
      height: 80%;
    }
    .splitLeft {
      display: flex;
      justify-content: space-between;
      &-left,
      &-right {
        width: 45%;
        background-color: #505050;
      }
      &-left {
        border-radius: 4px 0 0 4px;
        &:hover {
          background-color: #b0c6cb;
        }
      }
      &-right {
        border-radius: 0 4px 4px 0;
        &:hover {
          background-color: #b0c6cb;
        }
      }
    }

    .splitRight {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &-top,
      &-bottom {
        width: 100%;
        height: 45%;
        background-color: #505050;
      }

      &-top {
        border-radius: 4px 4px 0 0;
        &:hover {
          background-color: #b0c6cb;
        }
      }
      &-bottom {
        border-radius: 0 0 4px 4px;
        &:hover {
          background-color: #b0c6cb;
        }
      }
    }
  }
</style>
