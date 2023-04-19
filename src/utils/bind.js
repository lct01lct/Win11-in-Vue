export const BindGlobalEvent = (type, event) => {
  document.addEventListener(type, event, false);
};

export const RemoveGlobalEvent = (type, event) => {
  document.removeEventListener(type, event);
};

export const BindEvent = (el, type, event) => {
  el.addEventListener(type, event, false);
};

export const RemoveEvent = (el, type, event) => {
  el.removeEventListener(type, event);
};
