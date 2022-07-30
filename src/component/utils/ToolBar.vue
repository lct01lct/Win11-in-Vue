<template>
  <div class="topButton" ref="Parent">
    <div class="title" @mousedown="startMove">
      <slot></slot>
    </div>
    <div class="functionArea">
      <button @click="mini"><img src="@/assets/img/setting/minimize.png" /></button>
      <button @click="max"><img :src="`/src/assets/img/setting/${MaxOrMin}.png`" /></button>
      <button @click="close"><img src="@/assets/img/setting/close.png" /></button>
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

    // 更改图标
    const changeIcon = () => {
      let allTcon = ['maximize', 'maxmin'];
      // 如果当前图标是最大化的
      // 那么取反为最小化的
      // 否则赋为另一个值
      MaxOrMin.value === allTcon[0] ? (MaxOrMin.value = allTcon[1]) : (MaxOrMin.value = allTcon[0]);
    };

    // 最大化或者最小化图标
    let MaxOrMin = ref('maximize');

    let that = getCurrentInstance();

    // 获取该工具栏的父元素
    let parent;

    // 由于setup执行时机是早于beforeCreate的，所以此时还不能拿到模板
    // 所以在挂在之后获取
    onMounted(() => {
      parent = that.refs.Parent.parentElement;
    });

    // 最小化
    const mini = () => {
      console.log('mini');
    };

    // 切换最大化最小化
    const max = () => {
      // 变化图标

      if (parent.style.width == '' || parent.style.width == '100vw') {
        parent.style.width = '70vw';
        parent.style.height = '70vh';
      } else {
        parent.style.width = '100vw';
        parent.style.height = '100vh';
      }

      changeIcon();
    };

    // 关闭
    const close = () => {
      context.emit('update:modelValue', false);
    };

    // 拖动元素
    // 实现思路大概是做mousedown和mouseup的事件
    const moveBox = () => {
      console.log('move');
    };

    // 移动开始
    const startMove = (e) => {};
    return {
      getCurrentInstance,
      onMounted,
      ref,
      props,
      context,
      changeIcon,
      MaxOrMin,
      that,
      parent,
      mini,
      max,
      close,
      moveBox,
      startMove,
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
</style>
