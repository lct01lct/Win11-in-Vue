<template>
  <div>
<!-- <startMenu></startMenu> -->
    <div class="taskbar fcs">
      <div class="tsleft"> 
        <div class="taskbarBtn " id="widget" @click.stop="showTaskerbarPanel('widget')">
        <img src="../../assets/img/icon/widget.png"  alt="" id="startMenuImg" />
      </div></div>
      <div class="center fcc">

 <!-- 任务栏中间部分 @click="closeAllPanel"-->
    
      <!-- 左抽屉按钮 -->
      <div class="taskbarBtn " id="startMenu" @click.stop="showTaskerbarPanel('StartMenu')">
        <img src="../../assets/img/icon/home.png"  alt="" id="startMenuImg" />
      </div>
      <!-- 搜索按钮 -->
      <div class="taskbarBtn " id="search" @click.stop="showTaskerbarPanel('Search')">
        <img src="../../assets/img/icon/search.png"  alt="" id="searchImg" />
      </div>
			<!-- 小工具 -->
			<div class="taskbarBtn " id="widget" @click.stop="showTaskerbarPanel('widget')">
        <img src="../../assets/img/icon/widget.png"  alt="" id="widgetImg" />
      </div>
			<!-- 控制面板 -->
			<div class="taskbarBtn " id="set" @click.stop="showTaskerbarPanel('settings')">
        <img src="../../assets/img/icon/settings.png"  alt="" id="setImg" />
      </div>
			<!-- 文件资源管理器 -->
			<div class="taskbarBtn " id="file" @click.stop="showTaskerbarPanel('file')">
        <img src="../../assets/img/icon/explorer.png"  alt="" id="fileImg" />
      </div>
			<!-- 浏览器 -->
			<div class="taskbarBtn " id="edge" @click.stop="showTaskerbarPanel('edge')">
        <img src="../../assets/img/icon/edge.png"  alt="" id="edgeImg" />
      </div>
			<!-- 应用商店 -->
			<div class="taskbarBtn " id="store" @click.stop="showTaskerbarPanel('store')">
        <img src="../../assets/img/icon/store.png"  alt="" id="storeImg" />
      </div>
  

      </div>
      <div class="tsright fcc">
          <div class="up fcc">^</div>
          <div class="wf">
            <ul class="fcc">
              <li><img src="../../assets/img/icon/ui/wifi.png" alt=""></li>
                          <li><img src="../../assets/img/icon/ui/audio3.png" alt=""></li>
<li><img src="" alt=""></li>
            </ul>
            </div>
          <div class="data">
                  <div class=" systemTime" @click="showDateBox"><span>{{time}}</span><span>{{date}}</span></div>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // import startMenu from '../startMenu/index.vue';
 
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
const showTaskerbarPanel = (e) =>{
  console.log('控制显隐',e);
}
 // 时间数据
    
    const date = ref('0000/00/00')
    const time = ref('00:00')

    const fn = () =>{
      let currentTime = new Date().getTime()
       
      let currentDate = new Date(currentTime);
      time.value =  currentTime;
      date.value = currentDate;
    }
    fn()
    setInterval(fn,1000)
</script>

<style lang="scss" scoped>
.taskbar{
  --bg1: rgba(243, 243, 243, 0.85);
    position: absolute;
    width: 100vw;
    height: 48px;
    background: var(--bg1);
    backdrop-filter: saturate(3) blur(20px);
    bottom: 0;
}
.tsright>div{
      height: 48px;
      padding: 0 8px;
&:hover {
    background: rgba(255, 255, 255, 0.8);
    transition: all 200ms ease-in-out;
}
}
.fcs{
   display: flex;
    align-items: center;
    justify-content: space-between;
}
.fcc{
   display: flex;
    align-items: center;
    justify-content: center;
}
.hvlight:hover {
    background: rgba(255, 255, 255, 0.8);
    transition: all 200ms ease-in-out;
}

.taskbarBtn {
  width: 40px;
  height: 40px;
  line-height: 40px;
  transition: all 0.5s;
  text-align: center;
  &:hover {
    background: #fff;
  }
  img {
    height: 24px;
    vertical-align: middle;
  }
}
.tsright{
  ul{padding:0;}
  li{
    padding: 0 8px;
list-style: none;
  }
   img {
    height: 20px;
    vertical-align: middle;
  }
   .systemTime{
    padding: 0 5px;
    font-size: 12px;
    display: grid;
    grid-template-rows: 50% 50%;
    align-items: center;
    justify-items: center;
  }
}
</style>