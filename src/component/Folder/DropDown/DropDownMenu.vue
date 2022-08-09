<template>
  <div class="menu">
    <div
      class="titleHaveChildren"
      :class="{ DropStatus: DropStatus }"
      v-if="data.children && data.children.length !== 0"
      @click="goToTargetFolder(data)"
    >
      <span @click="toggleDropStatus">&gt;</span>
      {{ data.name }}
    </div>
    <div
      class="titleNoChildren"
      v-if="data.path && data.children.length === 0"
      @click="goToTargetFolder(data)"
    >
      {{ data.name }}
    </div>
    <div class="content" v-if="children.length !== 0">
      <DropDownMenu v-for="item1 in children" :key="item1" :data="item1"></DropDownMenu>
    </div>
  </div>
</template>

<script setup>
  import userStore from '@/store/userStore';
  const props = defineProps(['data']);

  // props.chilldren.length
  const data = props.data;
  // -----------------------------------------------

  // inject 接受父组件的回调函数：
  // target： 传递当前的文件夹情况

  // ------------------------------------------------

  // eslint-disable-next-line prefer-const
  let children = reactive([]);

  const DropStatus = ref(false);

  const toggleDropStatus = () => {
    if (children.length) {
      children.splice(0, children.length);
      DropStatus.value = false;
    } else {
      children.splice(0, 0, ...props.data.children);
      DropStatus.value = true;
    }
  };

  // the userStore's instance
  // the target is store the CurrentFolder
  const store = userStore();
  const goToTargetFolder = (DATA) => {
    store.changeCurrentFolder(DATA);
  };
</script>

<style lang="scss" scoped>
  .menu {
    width: 95%;
    margin-left: 2%;
    white-space: nowrap;
    overflow: hidden;
    .titleHaveChildren {
      display: flex;
      align-items: center;
      font-size: 12px;
      height: 2em;
      width: 100%;
      padding-left: 0.5em;
      margin-left: 0.2em;
      border-radius: 0.2em;

      // &::before {
      //   content: '>';
      //   color: #999;
      //   margin-right: 0.8em;
      // }

      &:hover {
        background-color: #e3e3e3;
      }
    }

    span {
      font-size: 1.3em;
      margin-right: 5px;
    }

    .titleNoChildren {
      display: flex;
      align-items: center;
      font-size: 12px;
      height: 2em;
      margin-left: 0.2em;
      border-radius: 0.2em;

      &:hover {
        background-color: #e3e3e3;
      }
    }

    .content {
      padding-left: 10%;
      font-size: 12px;
    }
  }

  .DropStatus {
    span {
      transform: rotate(90deg);
    }
  }
</style>
