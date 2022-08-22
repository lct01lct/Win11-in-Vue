const HContent = (content) => {
  return h(
    'div',
    {
      class: 'content',
    },
    content
  );
};

export const HConfrimContent = (content) => {
  return h(
    'div',
    {
      class: 'content-wrapper',
    },
    [HContent(content)]
  );
};

export const HPromptContent = (content, promptValue) => {
  return h(
    'div',
    {
      class: 'content-wrapper',
    },
    [
      HContent(content),
      h('input', {
        value: promptValue.value,
        onInput: (e) => {
          promptValue.value = e.target.value;
        },
        class: 'prompt-ipt',
      }),
    ]
  );
};
