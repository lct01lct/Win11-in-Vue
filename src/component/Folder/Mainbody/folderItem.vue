<template>
  <li ref="folderItemRef" @dblclick="goToTargetPath(data)" :title="`大小：${size}`">
    <!-- ${usageRate ? `Rate: ${usageRate}` : ''} -->
    <img :src="getSrcSetting(icon)" />
    <div>
      <span @click.right="changeName($event, data)">
        <em
          v-for="i in name"
          :key="i"
          :class="{ highLight: store.currentSearchStr.find((value) => value === i) }"
        >
          {{ i }}
        </em>
      </span>
      <input type="text" :placeholder="`${name}${extension ? `.${extension}` : ''}`" />
    </div>
  </li>
</template>

<script setup>
  import folderStore from '@/store/folderStore';
  import { getSrcSetting } from '@/utils/getSrc';

  const folderItemRef = ref(null);

  defineProps({
    icon: {
      type: String,
      default: 'folder.png',
    },
    data: {
      type: Object,
      default: () => {},
    },
    size: {
      type: String,
      default: '0KB',
    },
    usageRate: {
      type: String,
      default: '0%',
    },
    name: {
      type: String,
      default: '新建文件夹',
    },
    extension: {
      type: String,
      default: '.',
    },
    folderItemDoms: {
      type: Array,
      default: () => [],
    },
    fullyData: {
      type: Array,
      default: () => [],
    },
  });

  const store = folderStore();

  // 接收emits，目的是更新
  const goToTargetPath = (item) => {
    if (item.children) {
      store.changeCurrentFolder(item);
    }
  };

  const changeName = (e, item) => {
    // 桌面不能改
    if (item.name === 'DeskTop' && item.getPath()[1] === 'DeskTop') {
      return;
    }
    const target = e.target.parentElement;
    const input = target.nextElementSibling;
    input.style.display = 'block';
    target.style.display = 'none';
    input.focus();

    // -------------------------------------
    // 上面，处理点击时候的样式更改，下面处理失去
    // 焦点后的对象更改
    // -------------------------------------

    input.addEventListener('blur', (e) => {
      input.style.display = 'none';
      target.style.display = 'block';
      const value = e.target.value;
      if (value) {
        // 输入内容不为空的情况下
        // 更改文件名字
        // 同时更新路径
        const res = item.changeName && item.changeName(value);

        // 名字重复，改失败
        if (!res) {
          return;
        }
        item.setPath && item.setPath();
        console.log('改了！', item);
        // todo
      }
    });
  };
</script>

<style lang="scss" scoped>
  li {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    width: 6em;
    height: 6em;

    img {
      width: 3em;
      height: 3em;
    }

    div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      span {
        font-size: 0.7em;
      }
    }

    &:hover {
      background-color: #e1f3ff;
    }
  }
  div {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input {
    display: none;
    width: 100%;
    height: 20px;
    outline: 0;
  }
  .highLight {
    font-weight: 700;
    color: rgb(236, 15, 15);
  }
</style>
