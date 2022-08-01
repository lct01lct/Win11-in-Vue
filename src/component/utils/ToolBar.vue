<template>
  <div class="topButton">
    <div class="title" @mousedown="moveBox">
      <slot></slot>
    </div>
    <div class="functionArea">
      <button @click="mini"><img src="@/assets/img/setting/minimize.png" /></button>
      <button @click="max"><img :src="`/src/assets/img/setting/${MaxOrMin}.png`" /></button>
      <button @click="close"><img src="@/assets/img/setting/close.png" /></button>
    </div>
    <!-- <div class="left" @mousedown="dragChangeSizeWidth"></div> -->
    <div class="right" @mousedown="dragChangeSizeWidth"></div>
    <!-- <div class="top" @mousedown="dragChangeSizeHeight"></div> -->
    <div class="bottom" @mousedown="dragChangeSizeHeight"></div>
  </div>
</template>


<script>
import { ref } from 'vue';

export default defineComponent({
  props:["root"],
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

    class ToolBar {
      constructor(Root) {
        this.root = document.querySelector(`${Root}`);
      }
      changeIcon(MaxOrMin) {
        let allTcon = ['maximize', 'maxmin'];
        MaxOrMin === allTcon[0] ? (MaxOrMin = allTcon[1]) : (MaxOrMin = allTcon[0]);
      }
      minOrClose(eventName, data) {
        context.emit(eventName, data);
      }

      changeStyle(width, height, left, top) {
        this.root.style.width = width;
        this.root.style.height = height;
        this.root.style.left = left;
        this.root.style.top = top;
      }

      // 切换最大化最小化
      max(MaxOrMin) {
        if (parent.style.width == '' || parent.style.width == '100vw') {
          this.changeStyle('60vw', '70vh', '20%', '15%');
        } else {
          this.changeStyle('100vw', '700vh', '0', '0');
        }
        // 变化图标
        this.changeIcon(MaxOrMin);
      }
      // 拖动元素
      // 实现思路大概是做mousedown和mouseup的事件
      moveBox(e) {
        // 初始鼠标按下时候的，在toolbar的位置
        let X = e.pageX - parent.offsetLeft;
        let Y = e.pageY - parent.offsetTop;

        // 移动监听事件
        const move = (e) => {
          this.root.style.top = e.pageY - Y + 'px';
          this.root.style.left = e.pageX - X + 'px';
        };
        // 添加监听和移除监听
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', () => {
          document.removeEventListener('mousemove', move);
        });
      }
      /**
       * 框的左右上下缩放
       * @param {*} e -> Event Object
       * 先给框的四周加上四个宽3px高100% 的div
       * 给四个div监听鼠标按下事件，即是触发缩放的边缘了
       * 监听滑动事件即开始缩放
       * 监听鼠标弹起事件即删除监听
       */
      dragChangeSize(flag) {
        const move = (e) => {
          if (flag == 'HEIGHT') {
            this.root.style.height = e.pageY - this.root.offsetTop + 'px';
          } else {
            this.root.style.width = e.pageX - this.root.offsetLeft + 'px';
          }
        };
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', () => {
          document.removeEventListener('mousemove', move);
        });
      }
    }

    // 最大化或者最小化图标
    let MaxOrMin = ref('maximize');

    let instance = new ToolBar(props.root)

    const moveBox = instance.moveBox()

    const mini = instance.minOrClose("update:modelValue",{type:"mini"})

    const max = instance.max(MaxOrMin.value)

    const close = instance.minOrClose("update:modelValue",{type:"close"})

    const dragChangeSizeWidth = instance.dragChangeSize("WIDTH")

    const dragChangeSizeHeight = instance.dragChangeSize("HEIGHT")

    return {
      MaxOrMin,
      mini,
      max,
      close,
      moveBox,
      dragChangeSizeHeight,
      dragChangeSizeWidth,
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

.left {
  position: absolute;
  left: 0;
  width: 3px;
  height: 100%;
  cursor: w-resize;
}
.top {
  position: absolute;
  top: 0;
  width: 100%;
  height: 3px;
  cursor: n-resize;
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
</style>
