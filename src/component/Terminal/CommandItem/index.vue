<template>
  <div>
    <div class="comment" v-if="item.comment">{{ item.comment }}</div>

    <div v-for="i in item.list" :key="i">
      {{ i }}
    </div>
    <span>- - - - - - - - - -</span>
  </div>
</template>

<script setup>
  defineProps({
    item: {
      type: Object,
      default: () => {},
    },
  });
</script>

<style lang="scss" scoped>
  div {
    display: flex;
    flex-direction: column;
  }
  span {
    width: 100%;
    height: 1em;
    margin-top: 5px;
    margin-bottom: 5px;
    font-weight: 700;
  }
  .comment {
    margin: 10px;
    max-width: 40%;
  }
</style>
