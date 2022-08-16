// 封装获取滚动距离函数
export function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      left: window.pageXOffset,
      top: window.pageYOffset,
    };
  } else {
    return {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop,
    };
  }
}

// 可视区域尺寸
export function getViewportSize() {
  if (window.innerWidth) {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  } else {
    if (document.compatMode === 'BackCompat') {
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight,
      };
    } else {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      };
    }
  }
}

// 页面尺寸
export function getScrollSize() {
  if (document.body.scrollWidth) {
    return {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight,
    };
  } else {
    return {
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
    };
  }
}

// 获取样式
export function getStyles(elem, prop) {
  if (window.getComputedStyle) {
    if (prop) {
      return window.getComputedStyle(elem, null)[prop];
    } else {
      return window.getComputedStyle(elem, null);
    }
  } else {
    if (prop) {
      return elem.currentStyle[prop];
    } else {
      return elem.currentStyle;
    }
  }
}

// 兼容性取消冒泡
export function cancelBubble(e) {
  e = e || window.event;
  if (e.stopPropagation) {
    e.stopPropagation();
  } else {
    e.cancelBubble = true;
  }
}

// 取消默认事件
export function preventDefaultEvent(e) {
  e = e || window.event;
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    e.returnValue = false;
  }
}

export // 兼容性解除事件绑定
function removeEvent(elem, type, fn) {
  if (elem.addEventListener) {
    elem.removeEventListener(type, fn, false);
  } else if (elem.attachEvent) {
    elem.deleteEvent(on + type, fn);
  } else {
    elem['on' + type] = null;
  }
}

// 兼容性监听事件
export function addEvent(el, type, fn) {
  if (el.addEventListener) {
    el.addEventListener(type, fn, false);
  } else if (el.attachEvent) {
    // IE8 以下写法，this指向为 window，且没有第三个参数
    el.attachEvent('on' + type, function () {
      fn.call(el);
    });
  } else {
    el['on' + type] = fn;
  }
}

// 兼容性 pageX/pageY
export function pagePos(e) {
  const sLeft = getScrollOffset().left;
  const sTop = getScrollOffset().top;
  // 文档偏移
  const cLeft = document.documentElement.clientLeft || 0;
  const cTop = document.documentElement.clientTop || 0;

  return {
    X: e.clientX + sLeft - cLeft,
    Y: e.clientY + sTop - cTop,
  };
}
