import {
  addEvent,
  getStyles,
  pagePos,
  removeEvent,
  getViewportSize,
  cancelBubble,
  preventDefaultEvent,
} from './utils';
import { deskTopIconBaseWeight, deskTopIconBaseHeight } from '@/data/config';
import useStore from '@/view/Home/IconOvelayTip/store';

export default function (e, list, item) {
  const store = useStore();
  const stayPos = {};
  const originPosIdxList = [];
  const originPosIdx = item.posIdx;
  list.forEach((item) => {
    originPosIdxList.push(item.posIdx);
  });
  const _self = this;

  const mouseX = pagePos(e).X;
  const mouseY = pagePos(e).Y;

  const recordInElemX = mouseX - parseInt(getStyles(this, 'left'));
  const recordInElemY = mouseY - parseInt(getStyles(this, 'top'));

  // const elemWidth = parseInt(getStyles(this, 'width'));
  // const elemHeight = parseInt(getStyles(this, 'height'));

  // const viewWidth = getViewportSize().width;
  // const viewHeight = getViewportSize().height;

  addEvent(document, 'mousemove', mouseMove);
  addEvent(document, 'mouseup', mouseUp);

  function mouseMove(e) {
    const moveX = pagePos(e).X - recordInElemX;
    const moveY = pagePos(e).Y - recordInElemY;

    // const edgeX = viewWidth - elemWidth;
    // const edgeY = viewHeight - elemHeight;

    // if (moveX <= 0) {
    //   moveX = 0;
    // } else if (moveX >= edgeX) {
    //   moveX = edgeX - 1;
    // }
    // if (moveY <= 0) {
    //   moveY = 0;
    // } else if (moveY >= edgeY) {
    //   moveY = edgeY - 1;
    // }

    _self.style.left = moveX + 'px';
    _self.style.top = moveY + 'px';

    stayPos.x = moveX;
    stayPos.y = moveY;

    // 进入其他图标的领域，提示操作信息
    const mouseCurrentPosIdx = mouseEnterIconPosIdx(e);
    const overlayedIconPosIdx = isIconOverlay(originPosIdxList, mouseCurrentPosIdx, originPosIdx);
    if (overlayedIconPosIdx) {
      // 提示操作信息
      store.setTipIsVisible(true);

      const iconInfo = getIconInfoByPosIdx(list, overlayedIconPosIdx);

      store.setTipContent(`用${iconInfo.name}打开`);
    } else {
      // 关闭提示信息
      store.setTipIsVisible(false);
    }

    cancelBubble(e);
    preventDefaultEvent(e);
  }

  function mouseUp() {
    const xIdx = Math.round(stayPos.x / deskTopIconBaseWeight);
    const yIdx = Math.round(stayPos.y / deskTopIconBaseHeight);

    const currentPosIdx = xIdx * 8 + yIdx + 1; // posIdx 比实际渲染位置多一个单位距离
    item.posIdx = currentPosIdx;

    // 判断图标是否重叠
    if (isIconOverlay(originPosIdxList, currentPosIdx, originPosIdx)) {
      // 两个图标重叠，执行对应的操作
      // eslint-disable-next-line prettier/prettier, no-constant-condition
      if (false) {
        // 操作有效
        // todo
      } else {
        // 操作无效
        _self.style.left = computePosByPosIdx(originPosIdx - 1).xPos + 'px';
        _self.style.top = computePosByPosIdx(originPosIdx - 1).yPos + 'px';
        item.posIdx = originPosIdx;
      }
    } else {
      // 没重叠
      _self.style.left = computePosByPosIdx(currentPosIdx - 1).xPos + 'px';
      _self.style.top = computePosByPosIdx(currentPosIdx - 1).yPos + 'px';
    }

    removeEvent(document, 'mousemove', mouseMove);
    removeEvent(document, 'mouseup', mouseUp);
  }
}

// 根据 posIdx 计算元素位置
function computePosByPosIdx(posIdx) {
  return {
    xPos: (Math.floor(posIdx / 8) * 76.8).toFixed(1),
    yPos: (Math.floor(posIdx % 8) * 76.8).toFixed(1),
  };
}

// 判断 tar 是否重叠
function isIconOverlay(list, tar, origin) {
  const result = list[list.indexOf(tar)];
  return origin === result ? 0 : result;
}

// 进入其他图标领域
function mouseEnterIconPosIdx(e) {
  const mouseX = pagePos(e).X;
  const mouseY = pagePos(e).Y;

  return (
    Math.floor(mouseX / deskTopIconBaseWeight) * 8 + Math.floor(mouseY / deskTopIconBaseHeight) + 1
  );
}

// 根据 posIdx 找到对应图标的信息
function getIconInfoByPosIdx(list, posIdx) {
  return list.find((item) => item.posIdx === posIdx);
}
