<script setup>
  const isVisible = ref(false);
  const emits = defineEmits(['show', 'hide']);

  watch(isVisible, () => {
    if (isVisible.value) {
      emits('show');
    } else {
      emits('hide');
    }
  });

  document.addEventListener('click', function () {
    isVisible.value = false;
  });
</script>

<script>
  export default {
    name: 'Popover',
  };
</script>

<template>
  <div class="popover-cantainer" @click.stop>
    <transition name="popover-content-transition">
      <slot v-if="isVisible"></slot>
    </transition>
    <div @click="isVisible = !isVisible">
      <template v-if="$slots.reference">
        <slot name="reference"></slot>
      </template>
    </div>
  </div>
</template>

<style scoped>
  .popover-content-transition-enter-from,
  .popover-content-transition-leave-to {
    height: 500px !important;
    opacity: 0;
  }

  .popover-content-transition-enter-active {
    transition: height 0.05s ease-in, opacity 0.05s ease-in;
  }

  .popover-content-transition-leave-active {
    transition: height 0.05s ease-out, opacity 0.05s ease-out;
  }
</style>
