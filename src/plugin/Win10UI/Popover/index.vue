<script setup>
  const isVisible = ref(false);
  const emits = defineEmits(['show', 'hide']);

  const setIsVisible = () => {
    isVisible.value = !isVisible.value;
  };

  watch(isVisible, () => {
    if (isVisible.value) {
      emits('show');
    } else {
      emits('hide');
    }
  });
</script>

<script>
  export default {
    name: 'Popover',
  };
</script>

<template>
  <div class="popover-cantainer">
    <transition name="popover-content-transition">
      <slot v-if="isVisible"></slot>
    </transition>
    <div @click="setIsVisible">
      <template v-if="$slots.reference">
        <slot name="reference"></slot>
      </template>
    </div>
  </div>
</template>

<style scoped>
  .popover-content-transition-enter-from,
  .popover-content-transition-leave-to {
    height: 400px !important;
    opacity: 0;
  }

  .popover-content-transition-enter-active {
    transition: height 0.1s ease-in, opacity 0.1s ease-in;
  }

  .popover-content-transition-leave-active {
    transition: height 0.1s ease-out, opacity 0.1s ease-out;
  }
</style>
