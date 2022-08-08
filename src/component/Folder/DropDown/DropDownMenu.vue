<template>
  <div class="menu">
    <div
      class="titleHaveChildren"
      v-if="props.children.length !== 0"
      @click="toggleDropStatus"
      :class="{ DropStatus: DropStatus }"
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
  import DropListVue from './DropList.vue';

  const props = defineProps(['title', 'type', 'children']);

  const children = reactive([]);

  const DropStatus = ref(false);

  const toggleDropStatus = () => {
    if (children.length) {
      children.splice(0, children.length);
      DropStatus.value = false;
    } else {
      children.splice(0, 0, ...props.children);
      DropStatus.value = true;
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
