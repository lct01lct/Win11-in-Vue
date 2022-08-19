<template>
  <div class="Terminal FullBox">
    <ToolBar color="white">命令提示符</ToolBar>
    <main>
      <CommandItem v-for="item in itemArray" :key="item" :item="item" />
      <div class="inputArea">
        <span>{{ path.join('/') }}</span>
        <textarea
          @input="input"
          @keyup.enter="enter"
          v-model="textarea"
          @keyup.up="upRecord"
        ></textarea>
      </div>
    </main>
  </div>
</template>

<script setup>
  import ToolBar from '@/component/ToolBar';
  import CommandItem from './CommandItem';
  import folderStore from '@/store/folderStore';
  import { responseAction, setPath } from '@/utils/terminal';

  // 打印的信息
  // eslint-disable-next-line prefer-const
  let itemArray = reactive([]);

  // 路径信息
  // eslint-disable-next-line prefer-const
  let path = reactive(['C:', 'Users']);

  // 文本域
  // eslint-disable-next-line prefer-const
  let textarea = ref('');

  // 命令输入记录
  // eslint-disable-next-line prefer-const
  let record = [];

  setPath(path);

  const enter = (e) => {
    const flag = textarea.value.split('').slice(0, -1).join('');

    if (flag === '') {
      textarea.value = '';
      return;
    }

    // eslint-disable-next-line prefer-const
    let value = flag.split(' ');

    const actionOrigin = value.splice(0, 1)[0];

    // 如果是回退那么就不拆分
    const command = value.join(' ') === '../' ? '../' : value.join(' ').split('/');
    const res = responseAction(path, { actionOrigin, command }, itemArray);

    // 记录栈
    record.push(`${actionOrigin} ${typeof command === 'object' ? command.join('/') : command}`);

    textarea.value = '';
  };

  // 记录当前是record数组的第几个元素
  // eslint-disable-next-line prefer-const
  let count = ref(0);

  // 上翻上一个命令
  const upRecord = () => {
    if (count.value === record.length) {
      count.value = 0;
    }
    textarea.value = record[count.value++];
  };

  // 目的是更改大小
  const input = (e) => {
    const textarea = e.target;
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
</script>

<style lang="scss" scoped>
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    height: 2em;
    border-radius: 5px;
    background-color: #777a7c;
  }

  .Terminal {
    background-color: rgba($color: #0b0b0b, $alpha: 0.98);
    box-shadow: 0 0 5px black;
    z-index: 10;
    user-select: auto;

    main {
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: flex-start;
      color: white;
      overflow-y: scroll;
      padding: 10px;
      .inputArea {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;

        span {
          margin-right: 10px;
        }

        textarea {
          background-color: transparent;
          outline: none;
          border: 0;
          color: white;
          resize: none;
          flex: 1;
        }
        .ipcmd {
          background: inherit;
          color: inherit;
          font-family: inherit;
          padding-right: 100px;
          flex-wrap: wrap;
          position: relative;
          caret-color: transparent;
          margin: 0;

          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            width: 8px;
            height: 2px;
            background: #ccc;
            animation: blink 1s step-end infinite;
          }

          &:active,
          &:focus {
            outline: none;
            border: none;
            caret-color: #ccc;

            &::after {
              display: none;
            }
          }
        }
        @keyframes blink {
          from,
          to {
            background: transparent;
          }

          50% {
            background: #ccc;
          }
        }

        .noteText {
          background: inherit;
          color: var(--txt-col);
          font-family: inherit;
          font-size: 0.88em;
          resize: none;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          outline: none;
          border: none;
          padding: 4px 8px;

          &::selection {
            background: var(--clrPrm);
            color: var(--wintheme);
          }

          &:active,
          &:focus {
            outline: none;
            border: none;
          }
        }
      }
    }
  }
</style>
