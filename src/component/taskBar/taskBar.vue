<template>
  <div>
    <!-- <startMenu></startMenu> -->
    <div class="taskbar fcs">
      <div class="tsleft">
        <div class="taskbarBtn" id="widget" @click.stop="showTasker(1)">
          <img src="../../assets/img/icon/widget.png" alt="" id="startMenuImg" />
        </div>
      </div>
      <div class="center fcc">
        <!-- 打开的方式不同，使用popover -->
        <Popover dir="bottom" v-for="item in bottomPop" :key="item">
          <!-- <Start></Start> -->
          <component :is="item.component"></component>
          <template #reference>
            <div id="taskMenu" class="taskbarBtn">
              <img :src="`src/assets/img/icon/${item.icon}`" :id="`${item.icon}Img`" />
            </div>
          </template>
        </Popover>
        <!-- 任务栏中间部分 @click="closeAllPanel"-->
        <div
          v-for="item in taskBar"
          :key="item"
          :id="item.name"
          class="taskbarBtn"
          @click="showTaskerbarPanel(item.name)"
        >
          <img :src="`src/assets/img/icon/${item.icon}`" :id="`${item.name}Img`" />
        </div>
      </div>
      <div class="tsright fcc">
        <div class="up fcc">^</div>
        <div class="wf" @click.stop="showTasker(4)">
          <ul class="fcc">
            <li><img src="../../assets/img/icon/ui/wifi.png" alt="" /></li>
            <li><img src="../../assets/img/icon/ui/audio3.png" alt="" /></li>
          </ul>
        </div>

        <Popover dir="bottom">
          <Win11Calendar></Win11Calendar>
          <template #reference>
            <div class="data fcc">
              <div class="systemTime">
                <div>{{ time }}</div>
                <div>{{ date }}</div>
              </div>
            </div>
          </template>
        </Popover>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { taskBarBottomPop, taskBarData } from '@/data';
  import { showBox, hideBox } from '@/utils';
  import Win11Calendar from './components/Win11Calendar';
  import Start from '../Start';
  import $bus from '@/utils/ViewSize/Bus.js';
  const count = ref(0);
  onMounted(() => {
    count.value = 1;
  });
  /** 需求分析：
   *  1. 点击底栏图标，图标有反应+相应板块显
   *  2.
   *  3.
   *  4. 页面布局：
   *      a. 左侧弹窗popup
   *      b. 右侧亮度、日期
   *      c. 中间功能图标
   *
   *
   *  5. 难点：
   *      a. 点击时图标缩小放大
   *      b. 板块关闭图标
   *      c.
   *
   *  实现：
   *      1.写Icon组件，点击有动效
   *      2.tabData.json写好每个图标的信息，传递到Icon组件渲染出来
   *      3.弹窗的显隐用opercity实现
   *      4.底栏点击icon，打算用事件总线发送事件，对应板块监听。
   */
  const taskBar = reactive(taskBarData);

  const bottomPop = reactive(taskBarBottomPop);
  // 时间数据
  const date = ref('0000/00/00');
  const time = ref('00:00');

  const fn = () => {
    const currentTime = new Date();
    time.value = currentTime.toLocaleTimeString().slice(0, 9); // 获取当前时间 上午11:29
    date.value = currentTime.toLocaleDateString(); // 获取当前日期，2021/12/1
  };
  fn();
  setInterval(fn, 1000);

  // setTimeout(() => {
  //   taskBar.push({
  //     icon: 'home.png',
  //     name: 'home',
  //   });
  // }, 3000);

  // 点击任务栏，传递name，DOM获取类名并赋予其层级为最高
  const showTaskerbarPanel = (e) => {
    // 目标组件
    const target = document.querySelector(`.${e}`);
    if (target.style.zIndex === '' || target.style.zIndex < 0) {
      showBox(target);
    } else {
      if (e === 'startMenu' || e === 'search' || e === 'widget') {
        return hideBox(false, target, e);
      }
      return hideBox(true, target, e);
    }
  };
  // 向Bus发送事件
  function showTasker(controlIndex) {
    $bus.emit('showOne', controlIndex);
  }
</script>

<style lang="scss" scoped>
  .taskbar {
    --bg1: rgba(243, 243, 243, 0.85);
    position: absolute;
    width: 100vw;
    height: 48px;
    background: var(--bg1);
    backdrop-filter: saturate(3) blur(20px);
    bottom: 0;
    user-select: none;
  }
  .tsleft {
    width: 212px;
  }
  .tsright > div {
    height: 48px;
    padding: 0 8px;
    &:hover {
      background: rgba(255, 255, 255, 0.8);
      transition: all 200ms ease-in-out;
    }
  }
  .fcs {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .fcc {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hvlight:hover {
    background: rgba(255, 255, 255, 0.8);
    transition: all 200ms ease-in-out;
  }

  .taskbarBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    line-height: 40px;
    transition: all 0.5s;
    text-align: center;
    &:hover {
      background: #fff;
      border-radius: 0.3em;
    }
    img {
      height: 24px;
      vertical-align: middle;
    }
  }
  .tsright {
    ul {
      padding: 0;
    }
    li {
      padding: 0 8px;
      list-style: none;
    }
    img {
      height: 20px;
      vertical-align: middle;
    }

    .systemTime {
      padding: 0 5px;
      font-size: 14px;
      text-align: center;
      margin-top: 10px;
    }
  }
</style>
