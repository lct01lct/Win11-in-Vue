<template>
  <div class="menu">
    <div
      class="titleHaveChildren"
      v-if="props.children.length !== 0"
      @click="toggleDropStatus"
      ref="titleRef"
    >
      {{ props.title }}
    </div>
    <div class="titleNoChildren" v-if="props.children.length === 0">{{ props.title }}</div>
    <div class="content" v-if="props.children.length !== 0">
      <DropListVue :children="children"></DropListVue>
    </div>
  </div>
</template>

<script setup>
  import DropListVue from './dropList';

  const props = defineProps(['title', 'type', 'children']);

  const that = getCurrentInstance();

  let titleRef;

  const children = reactive([]);

  onMounted(() => {
    titleRef = that.refs.titleRef;

    console.log(props);
  });

  const toggleDropStatus = () => {
    if (children.length) {
      children.splice(0, children.length);
    } else {
      children.splice(0, 0, ...props.children);
    }
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

        &::before {
          transform: rotate(90deg);
        }
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

        &::before {
          transform: rotate(90deg);
        }
      }
    }

    .content {
      margin-left: 15%;
      font-size: 12px;
    }
  }
</style>
