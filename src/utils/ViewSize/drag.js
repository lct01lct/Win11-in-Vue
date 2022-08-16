import {
  addEvent,
  getStyles,
  pagePos,
  removeEvent,
  cancelBubble,
  preventDefaultEvent,
} from './utils';
import useTipStore from '@/view/Home/IconOvelayTip/store';
import useConfigStore from '@/store/deskTopConfigStore';

export class DragFeatrue {
  /** 拖拽动画特性
   *
   * @param {Object} e 鼠标事件
   * @param {Object} elem 被拖拽的对象
   */
  constructor(e, elem, list, item) {
    this.e = e;
    this.elem = elem;
    this.stayPos = {}; // 记录当前停留的位置
    this.originPosIdxList = [];
    list && this.init(list); // 初始化 originPosIndex
    if (item) {
      this.item = item;
      this.originPosIdx = item.posIdx;
    }

    this.mouseX = pagePos(e).X;
    this.mouseY = pagePos(e).Y;

    // 记录鼠标在在被拖拽对象的位置
    this.recordInElemX = this.mouseX - parseInt(getStyles(elem, 'left'));
    this.recordInElemY = this.mouseY - parseInt(getStyles(elem, 'top'));
  }

  init(list) {
    list.forEach((item) => {
      this.originPosIdxList.push(item.posIdx);
    });
  }

  // 移动
  move(recordInElemX, recordInElemY, config) {
    this.moveX = this.mouseX - recordInElemX;
    this.moveY = this.mouseY - recordInElemY;

    this.elemWidth = parseInt(getStyles(this.elem, 'width'));
    this.elemHeight = parseInt(getStyles(this.elem, 'height'));

    const edgeX = config.edgeWeight - this.elemWidth;
    const edgeY = config.edgeHeight - this.elemHeight;

    if (this.moveX <= 0) {
      this.moveX = 0;
    } else if (this.moveX >= edgeX) {
      this.moveX = edgeX - 1;
    }
    if (this.moveY <= 0) {
      this.moveY = 0;
    } else if (this.moveY >= edgeY) {
      this.moveY = edgeY - 1;
    }
    this.elem.style.left = this.moveX + 'px';
    this.elem.style.top = this.moveY + 'px';
    this.elem.style.zIndex = '999';
    // console.log(this);
    if (this.end) {
      // this.elem.style.zIndex = '1';
      this.end();
    }

    return this;
  }

  overlay(configStore, list, tipStore, isInTaskbar) {
    this.stayPos.x = this.moveX;
    this.stayPos.y = this.moveY;

    // 进入其他图标的领域，提示操作信息
    const mouseCurrentPosIdx = mouseEnterIconPosIdx(this.e, {
      iconBaseWeight: configStore.iconBaseWeight,
      iconBaseHeight: configStore.iconBaseHeight,
    });

    const overlayedIconPosIdx = isIconOverlay(
      this.originPosIdxList,
      mouseCurrentPosIdx,
      this.originPosIdx
    );
    if (overlayedIconPosIdx) {
      // 提示操作信息
      const iconInfo = getIconInfoByPosIdx(list, overlayedIconPosIdx);

      tipStore.setTipIsVisible(true);
      tipStore.setTipContent(`用${iconInfo.name}打开`);
    } else {
      if (this.mouseY > configStore.deskTopViewSize) {
        // 进入底边栏
        tipStore.setTipIsVisible(true);
        tipStore.setTipContent('固定到 任务栏');
        isInTaskbar = true;
      } else {
        // 关闭提示信息
        tipStore.setTipIsVisible(false);
      }
    }
  }

  stop(configStore, stayPos, isInTaskbar, tipStore) {
    const stopMaxHeight = (configStore.maxIconCountY - 1) * configStore.iconBaseHeight;
    // 桌面视图为值小于菜单栏
    if (stayPos.y >= stopMaxHeight) {
      // 如果进入菜单栏及空白位置，则回到初始位置
      stayPos.y = computePosByPosIdx(this.originPosIdx - 1).yPos;
      stayPos.x = computePosByPosIdx(this.originPosIdx - 1).xPos;
    }
    const xIdx = Math.round(stayPos.x / configStore.iconBaseWeight);
    const yIdx = Math.round(stayPos.y / configStore.iconBaseHeight);

    const currentPosIdx = xIdx * configStore.maxIconCountY + yIdx + 1; // posIdx 比实际渲染位置多一个单位距离

    this.item.posIdx = currentPosIdx;

    // 判断图标是否重叠
    if (isIconOverlay(this.originPosIdxList, currentPosIdx, this.originPosIdx)) {
      // 两个图标重叠，执行对应的操作
      // eslint-disable-next-line prettier/prettier, no-constant-condition
      if (false) {
        // 操作有效
        // todo
      } else {
        // 操作无效
        this.setPosSizeByPosIdx(this.originPosIdx);
        this.item.posIdx = this.originPosIdx;
      }
    } else {
      // 没重叠
      if (isInTaskbar) {
        // 图标落在任务栏
        this.setPosSizeByPosIdx(this.originPosIdx);
      } else {
        this.setPosSizeByPosIdx(currentPosIdx);
      }
    }
    this.elem.style.zIndex = '1';
    // 图标停靠之后，关闭信息提示框
    tipStore.setTipIsVisible(false);
  }

  setPosSizeByPosIdx(posIdx) {
    this.elem.style.left = computePosByPosIdx(posIdx - 1).xPos + 'px';
    this.elem.style.top = computePosByPosIdx(posIdx - 1).yPos + 'px';
  }

  end() {
    cancelBubble(this.e);
    preventDefaultEvent(this.e);
  }

  // 设置边界
  setEdge() {
    return this;
  }
}

export default function (e, list, item, config) {
  const tipStore = useTipStore();
  const configStore = useConfigStore();
  const isInTaskbar = false;
  const stayPos = {};
  const _self = this;

  const dragF = new DragFeatrue(e, this, list, item);
  const recordInElemX = dragF.recordInElemX;
  const recordInElemY = dragF.recordInElemY;

  let moveDragF = null;

  addEvent(document, 'mousemove', mouseMove);
  addEvent(document, 'mouseup', mouseUp);

  function mouseMove(e) {
    const currentDragF = new DragFeatrue(e, _self, list, item);

    currentDragF
      .move(recordInElemX, recordInElemY, {
        edgeWeight: config.edgeWeight,
        edgeHeight: config.edgeHeight,
      })
      .overlay(configStore, list, tipStore, isInTaskbar);

    stayPos.x = currentDragF.stayPos.x;
    stayPos.y = currentDragF.stayPos.y;

    moveDragF = currentDragF;
  }

  function mouseUp() {
    moveDragF && moveDragF.stop(configStore, stayPos, isInTaskbar, tipStore);

    removeEvent(document, 'mousemove', mouseMove);
    removeEvent(document, 'mouseup', mouseUp);
  }
}

// 根据 posIdx 计算元素位置
function computePosByPosIdx(posIdx) {
  return {
    xPos: (Math.floor(posIdx / 9) * 76.9).toFixed(1),
    yPos: (Math.floor(posIdx % 9) * 76.9).toFixed(1),
  };
}

// 判断 tar 是否重叠
function isIconOverlay(list, tar, origin) {
  const index = list.indexOf(tar);

  if (index <= -1) {
    return 0;
  }

  const result = list[list.indexOf(tar)];

  return origin === result ? 0 : result;
}

// 进入其他图标领域
function mouseEnterIconPosIdx(e, config) {
  const mouseX = pagePos(e).X;
  const mouseY = pagePos(e).Y;

  return (
    Math.floor(mouseX / config.iconBaseWeight) * 9 + Math.floor(mouseY / config.iconBaseHeight) + 1
  );
}

// 根据 posIdx 找到对应图标的信息
function getIconInfoByPosIdx(list, posIdx) {
  return list.find((item) => item.posIdx === posIdx);
}

// 设置宽高
export const setWidth = (width, height, Modal) => {
  Modal.style.width = width + 'px';
  Modal.style.height = height + 'px';
};

// 判断元素是否属于该区域
export const judgeContains = (parent, Modal) => {
  const childNode = Array.from(parent.children);
  const { left, right, top, bottom } = Modal.getBoundingClientRect();
  const containsArray = [];
  childNode.map((value) => {
    const item = value.getBoundingClientRect();
    if (item.left > left && item.right < right && item.top > top && item.bottom < bottom) {
      containsArray.push(value);
    }
  });
  return containsArray;
};
