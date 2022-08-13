<script setup>
  const isVisible = ref(false);
  const emits = defineEmits(['show', 'hide']);

  const props = defineProps({
    dir: {
      type: String,
      default: 'bottom',
    },
  });

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
    <transition :name="'popover-content-transition-' + dir">
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
  /* bottom */
  .popover-content-transition-bottom-enter-from,
  .popover-content-transition-bottom-leave-to {
    height: 500px !important;
    opacity: 0;
  }

  .popover-content-transition-bottom-enter-active {
    transition: height 0.05s ease-in, opacity 0.05s ease-in;
  }

  .popover-content-transition-bottom-leave-active {
    transition: height 0.05s ease-out, opacity 0.05s ease-out;
  }

  /* left */
  .popover-content-transition-left-enter-from,
  .popover-content-transition-left-leave-to {
    width: 200px !important;
    opacity: 0;
  }

  .popover-content-transition-left-enter-active {
    transition: width 0.05s ease-in, opacity 0.05s ease-in;
  }

  .popover-content-transition-left-leave-active {
    transition: width 0.05s ease-out, opacity 0.05s ease-out;
  }
</style>
