<template>
  <div class="folderContent">
    <ul>
      <li
        v-for="item in data"
        :key="item"
        @dblclick="goToTargetPath(item)"
        :title="`大小：${item.size} ${item.usageRate ? `Rate: ${item.usageRate}` : ''}`"
      >
        <img :src="`src/assets/img/setting/${item.children ? 'folder.png' : 'edge.png'}`" />
        <div>
          <span @click.right="changeName($event, item)">
            {{ `${item.name}${item.extension ? `.${item.extension}` : ''}` }}
          </span>
          <input
            type="text"
            :placeholder="`${item.name}${item.extension ? `.${item.extension}` : ''}`"
          />
        </div>
      </li>
      <div v-if="data.length === 0">此文件夹为空！</div>
    </ul>
  </div>
</template>

<script setup>
  /** 需求分析：
   *  在这个文件夹结构中，Folder/index.vue作为index文件
   *  应该是负责整个页面的数据收发的
   *  pathTool、MainBody都是通过父向子组件传递进行的数据传输
   *
   *  此组件负责：
   *    文件夹图标的显示，名字的显示
   *    doubleClick跳转对应的文件夹，穿梭至指定文件夹深度
   */
  // import userstore tool to change MainBody
  import userStore from '@/store/userStore';
  const store = userStore();

  // eslint-disable-next-line prefer-const
  let data = reactive([]);

  watch(
    () => store.storeCurrentFolder,
    () => {
      data.splice(0, data.length, ...store.storeCurrentFolder.children);
    },
    { deep: true }
  );

  // 接收emits，目的是更新
  const goToTargetPath = (item) => {
    if (item.children) {
      store.changeCurrentFolder(item);
      data.splice(0, data.length, ...item.children);
    }
  };

  const changeName = (e, item) => {
    const target = e.target;
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
        item.changeName && item.changeName(value);
        item.setPath && item.setPath();
        console.log('改了！', item);
        // todo
      }
    });
  };
</script>

<style lang="scss" scoped>
  .folderContent {
    width: 100%;
    height: 100%;
    ul {
      display: flex;
      justify-content: flex-start;
      align-content: flex-start;
      flex-flow: wrap;
      overflow-y: scroll;

      list-style: none;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 1em;

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

        span {
          font-size: 0.7em;
        }

        &:hover {
          background-color: #e1f3ff;
        }
      }
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
</style>
