import MessageBoxComp from './MessageBox';

const fields = [
  'confrim', // 确认
  'prompt', // 输入框
];

const MessageBox = (options) => {
  const messageBoxApp = createApp(MessageBoxComp, options);

  return new Promise((resolve, reject) => {
    showMessageBox(messageBoxApp, { resolve, reject });
  });
};

fields.forEach((field) => {
  MessageBox[field] = (options) => {
    options.field = field;
    return MessageBox(options);
  };
});

const showMessageBox = (app, { resolve, reject }) => {
  const oMessageBox = document.createDocumentFragment();

  const vm = app.mount(oMessageBox);
  document.body.appendChild(oMessageBox);

  // 设置 vm 显示
  vm.setVisible(true);

  watch(vm.state, ({ clickBtnType: type }) => {
    switch (type) {
      case 'confrim':
        resolve(vm.promptValue && vm.promptValue);
        break;
      case 'cancel':
        reject();
        break;
      default:
        break;
    }

    hideMessageBox(app);
  });
};

const hideMessageBox = (app) => {
  app.unmount();
};

export default MessageBox;
