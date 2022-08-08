<template>
  <div class="menu">
    <!-- <div
      class="titleHaveChildren"
      @click="toggleDropStatus(props.name)"
      :class="{ DropStatus: DropStatus }"
      v-if="childLength !== 0"
    >
      {{ props.extension }}
      {{ props.name }}
    </div>
    <div
      class="titleNoChildren"
      v-if="props.path && childLength === 0"
      @click="goToTargetFolder(props.name)"
    >
      {{ props.name }}
    </div>
    <div class="content" v-if="children.length !== 0">
      <DropListVue :children="children"></DropListVue>
    </div> -->
    <div
      class="titleHaveChildren"
      @click="toggleDropStatus(props.name)"
      :class="{ DropStatus: DropStatus }"
      v-if="childLength !== 0"
    >
      {{ props.extension }}
      {{ props.name }}
    </div>
    <div
      class="titleNoChildren"
      v-if="props.path && childLength === 0"
      @click="goToTargetFolder(props.name)"
    >
      {{ props.name }}
    </div>
    <div class="content" v-if="children.length !== 0">
      <DropListVue :children="children"></DropListVue>
    </div>
  </div>
</template>

<script setup>
  import DropListVue from './DropList.vue';
  const props = defineProps(['name', 'children', 'path', 'obj']);

  // props.chilldren.length
  const childLength = props.children.length;

  // -----------------------------------------------

  // inject 接受父组件的回调函数：
  // target： 传递当前的文件夹情况
  const updateFileStatus = inject('updateFileStatus');
  // 每次挂载都进行更新
  updateFileStatus(props.obj);
  console.log(props.children, 11);

  // ------------------------------------------------

  const children = reactive([]);

  const DropStatus = ref(false);

  const toggleDropStatus = (name) => {
    if (children.length) {
      children.splice(0, children.length);
      DropStatus.value = false;
    } else {
      children.splice(0, 0, ...props.obj.children);
      DropStatus.value = true;
    }
    console.log(name);
  };

  const goToTargetFolder = (e) => {
    console.log(e);
  };
</script>

<style lang="scss" scoped>
  .menu {
    width: 90%;
    .titleHaveChildren {
      display: flex;
      align-items: center;
      font-size: 12px;
      height: 2em;
      padding-left: 0.5em;
      margin-left: 0.2em;
      border-radius: 0.2em;

      &::before {
        content: '>';
        color: #999;
        margin-right: 0.8em;
      }

      &:hover {
        background-color: #e3e3e3;
      }
    }

    .titleNoChildren {
      display: flex;
      align-items: center;
      font-size: 12px;
      height: 2em;
      padding-left: 0.5em;
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
    &::before {
      content: '<';
      transform: rotate(90deg);
    }
  }
</style>
