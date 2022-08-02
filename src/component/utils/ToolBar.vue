<template>
  <div class="topButton" ref="Parent">
    <div class="title" @mousedown="moveBox">
      <slot></slot>
    </div>
    <div class="functionArea">
      <button @click="mini"><img src="@/assets/img/setting/minimize.png" /></button>
      <button @click="max" @mouseenter="showSplit">
        <img :src="`/src/assets/img/setting/${MaxOrMin}.png`" />
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

<script>
  import { getCurrentInstance, onMounted, ref } from 'vue';

  export default defineComponent({
    props: ['modelValue'],
    emits: ['update:modelValue'],
    setup(props, context) {
      /** ToolBar需求分析：
       *  1. Tab页初始打开占满屏幕，可拖动，并且右上角icon可以设置最小化或小屏或关闭
       *  4. 页面布局：
       *      a. 顶部Tab功能按钮为一栏
       *
       *  需要添加的监视：
       *  1. 长按拖动
       *  2. 最小化
       *  3. 最大化
       *  4. 关闭
       */

      // 最大化或者最小化图标
      const MaxOrMin = ref('maximize');

      const that = getCurrentInstance();

      // 获取该工具栏的父元素
      let parent;

      // 拆分功能区
      const splitFlag = ref(false);

      // 由于setup执行时机是早于beforeCreate的，所以此时还不能拿到模板
      // 所以在挂在之后获取
      onMounted(() => {
        parent = that.refs.Parent.parentElement;
      });

      // 最小化
      const mini = () => {
        context.emit('update:modelValue', { type: 'mini' });
      };

      // 关闭
      const close = () => {
        context.emit('update:modelValue', { type: 'close' });
      };

      // 更改图标
      const changeIcon = () => {
        const allTcon = ['maximize', 'maxmin'];
        // 如果当前图标是最大化的
        // 那么取反为最小化的
        // 否则赋为另一个值
        // MaxOrMin.value === allTcon[0]
        //   ? (MaxOrMin.value = allTcon[1])
        //   : (MaxOrMin.value = allTcon[0]);
        if(parent.style.width === "100vw" && parent.style.height === "100vh"){
          MaxOrMin.value = allTcon[0]
        }else{
          MaxOrMin.value = allTcon[1]
        }
      };

      // 切换最大化最小化
      const max = () => {
        if (parent.style.width === '' || parent.style.width === '100vw') {
          parent.style.width = '60vw';
          parent.style.height = '70vh';
          parent.style.left = '20%';
          parent.style.top = '15%';
        } else {
          parent.style.height = '100vh';
          parent.style.width = '100vw';
          parent.style.left = '0';
          parent.style.top = '0';
        }

        changeIcon();
      };

      // 拖动元素
      // 实现思路大概是做mousedown和mouseup的事件
      const moveBox = (e) => {
        // 初始鼠标按下时候的，在toolbar的位置
        const X = e.pageX - parent.offsetLeft;
        const Y = e.pageY - parent.offsetTop;

        // 移动监听事件
        const move = (e) => {
          parent.style.top = e.pageY - Y + 'px';
          parent.style.left = e.pageX - X + 'px';
        };
        // 添加监听和移除监听
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', () => {
          document.removeEventListener('mousemove', move);
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
        const move = (e) => {
          if (flag === 'HEIGHT') {
            parent.style.height = e.pageY - parent.offsetTop + 'px';
          } else {
            parent.style.width = e.pageX - parent.offsetLeft + 'px';
          }
        };
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', () => {
          document.removeEventListener('mousemove', move);
        });
      };

      const showSplit = async (e) => {
        const target = e.target;
        const flag = await new Promise((reslove) => {
          const timer = setTimeout(() => {
            reslove(true);
          }, 800);
          target.addEventListener('mouseleave', () => {
            clearTimeout(timer);
            reslove(false);
          });
        });
        if (flag) {
          splitFlag.value = true;
        }
      };

      const closeSplit = () => {
        splitFlag.value = false;
      };

      const splitFunction = (flag) => {
        switch (flag) {
          case 'left': {
            parent.style.width = '50vw';
            parent.style.height = '100vh';
            parent.style.left = 0;
            parent.style.top = 0;
            break;
          }
          case 'right': {
            parent.style.width = '50vw';
            parent.style.height = '100vh';
            parent.style.left = `${document.body.clientWidth / 2}px`;
            parent.style.top = 0;
            break;
          }
          case 'top': {
            parent.style.width = '100vw';
            parent.style.height = '50vh';
            parent.style.left = 0;
            parent.style.top = 0;
            break;
          }
          case 'bottom': {
            parent.style.width = '100vw';
            parent.style.height = '50vh';
            parent.style.left = 0;
            parent.style.top = `${window.screen.height / 2}px`;
            break;
          }
        }
        changeIcon()
      };

      return {
        MaxOrMin,
        splitFlag,
        mini,
        max,
        close,
        moveBox,
        dragChangeSize,
        showSplit,
        closeSplit,
        splitFunction,
      };
    },
  });
</script>

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

    button {
      width: 50px;
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

    .splitRight{
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &-top,&-bottom{
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
