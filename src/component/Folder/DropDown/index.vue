<!-- eslint-disable prefer-const -->
<template>
  <div class="LeftNavRoot">
    <DropDownMenuVue
      v-for="(item, i) in data"
      :key="item"
      :name="item.name"
      :children="item.children"
      :obj="props.obj[i]"
    ></DropDownMenuVue>
  </div>
</template>

<script setup>
  import DropDownMenuVue from './DropDownMenu.vue';

  /** 需求分析：
   *  为什么要把菜单栏单独拿出来？
   *   因为它是在存储文件夹的格式以及目录信息（以树的形式）
   *   同时dropdown的每个item子项，同时具备使主界面更新的功能
   *   至于是此组件发送请求接收数据还是主界面传递数据还没太想好
   *   初步的想法是传递数据：因为要实现更新数据并更新界面，父传子的形式
   *
   *   递归的结构：
   *    此为父组件，for循环菜单组件，也就是children下有对象的文件夹组件
   *    在menu文件夹组件中，会将children.length > 0 的数据传入List 组件
   *    在List组件中会再次递归菜单组件
   */

  const props = defineProps(['data', 'obj']);

  // eslint-disable-next-line prefer-const
  let data = reactive(props.data);
  // console.log(props.obj);
</script>

<style lang="scss" scoped>
  .LeftNavRoot {
    width: 100%;
    height: 100%;
  }
</style>
