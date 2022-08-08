<script setup>
  import { HConfrimContent, HPromptContent } from './h';

  const state = reactive({
    visible: false,
    clickBtnType: '',
  });

  const promptValue = ref('');

  const props = defineProps({
    title: {
      type: String,
      default: '标题',
    },
    content: {
      type: String,
      default: '内容',
    },
    showCancelBtn: {
      type: Boolean,
      default: false,
    },
    cancelBtnText: {
      type: String,
      default: '取消',
    },
    confirmBtnText: {
      type: String,
      default: '确定',
    },
    field: {
      type: String,
      default: 'confrim',
    },
  });

  const setVisible = (isVisible) => {
    state.visible = isVisible;
  };

  const cancelBtnClick = () => {
    state.clickBtnType = 'cancel';
    setVisible(false);
  };

  const confirmBtnClick = () => {
    state.clickBtnType = 'confrim';
    setVisible(false);
  };

  const ContentView = ({ field }) => {
    switch (field) {
      case 'confrim':
        return HConfrimContent(props.content);
      case 'prompt':
        return HPromptContent(props.content, promptValue);
      default:
        break;
    }
  };

  const hasError = ref(false);
  // 点击蒙层提示用户处理当前的盒子
  const modalClickHandle = () => {
    hasError.value = true;
  };

  defineExpose({
    setVisible,
    state,
    promptValue,
  });
</script>

<template>
  <transition name="message-box-fade">
    <div class="message-box" v-if="state.visible">
      <div class="message-box-modal-frame" @click="modalClickHandle">
        <div class="message-box-wrapper" :class="{ error: hasError }" @click.stop>
          <div class="title">
            {{ title }}
            <div class="message-box-closed" @click="cancelBtnClick">X</div>
          </div>
          <content-view :field="field"></content-view>
          <div class="btn-group">
            <button class="cancel-btn" v-if="showCancelBtn" @click="cancelBtnClick">
              {{ cancelBtnText }}
            </button>
            <button class="confirm-btn" @click="confirmBtnClick">{{ confirmBtnText }}</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
  .message-box-fade-enter-from,
  .message-box-fade-leave-to {
    opacity: 0;
  }

  .message-box-fade-enter-active {
    transition: opacity 0.2s ease-in;
  }

  .message-box-fade-leave-active {
    transition: opacity 0.2s ease-out;
  }

  // 蒙层
  .message-box-modal-frame {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background-color: #ededed;
  }

  .message-box-wrapper {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 200px;
    background-color: #fff;
    border: 1px solid #000;
    .title {
      height: 32px;
    }
    .content-wrapper {
      flex: 1;
    }
    .btn-group {
      height: 50px;
      button {
        float: right;
      }
    }
  }

  .message-box-closed {
    position: absolute;
    top: 0;
    right: 0;
  }

  .error {
    border: 1px solid red;
  }
</style>
