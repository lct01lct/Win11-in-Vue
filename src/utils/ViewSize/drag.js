import {
  addEvent,
  getStyles,
  pagePos,
  removeEvent,
  cancelBubble,
  preventDefaultEvent,
  getViewportSize,
} from './utils';
import useTipStore from '@/view/Home/IconOvelayTip/store';
import useConfigStore from '@/store/deskTopConfigStore';

export default function (e, list, item, config) {
  const tipStore = useTipStore();
  const configStore = useConfigStore();
  let isInTaskbar = false;
  const stayPos = {};
  const originPosIdxList = [];
  const originPosIdx = item.posIdx;
  list.forEach((item) => {
    originPosIdxList.push(item.posIdx);
  }); // 初始化 originPosIndex
  const _self = this;

  const mouseX = pagePos(e).X;
  const mouseY = pagePos(e).Y;

  const recordInElemX = mouseX - parseInt(getStyles(this, 'left'));
  const recordInElemY = mouseY - parseInt(getStyles(this, 'top'));

  const elemWidth = parseInt(getStyles(this, 'width'));
  const elemHeight = parseInt(getStyles(this, 'height'));

  addEvent(document, 'mousemove', mouseMove);
  addEvent(document, 'mouseup', mouseUp);

  function mouseMove(e) {
    let moveX = pagePos(e).X - recordInElemX;
    let moveY = pagePos(e).Y - recordInElemY;

    const edgeX = config.edgeWeight - elemWidth;
    const edgeY = config.edgeHeight - elemHeight;

    if (moveX <= 0) {
      moveX = 0;
    } else if (moveX >= edgeX) {
      moveX = edgeX - 1;
    }
    if (moveY <= 0) {
      moveY = 0;
    } else if (moveY >= edgeY) {
      moveY = edgeY - 1;
    }

    _self.style.left = moveX + 'px';
    _self.style.top = moveY + 'px';

    stayPos.x = moveX;
    stayPos.y = moveY;

    // 进入其他图标的领域，提示操作信息
    const mouseCurrentPosIdx = mouseEnterIconPosIdx(e, {
      iconBaseWeight: configStore.iconBaseWeight,
      iconBaseHeight: configStore.iconBaseHeight,
    });

    const overlayedIconPosIdx = isIconOverlay(originPosIdxList, mouseCurrentPosIdx, originPosIdx);
    if (overlayedIconPosIdx) {
      // 提示操作信息
      const iconInfo = getIconInfoByPosIdx(list, overlayedIconPosIdx);

      tipStore.setTipIsVisible(true);
      tipStore.setTipContent(`用${iconInfo.name}打开`);
    } else {
      if (pagePos(e).Y > getViewportSize().height - configStore.taskbarHeight) {
        // 进入底边栏
        tipStore.setTipIsVisible(true);
        tipStore.setTipContent('固定到 任务栏');
        isInTaskbar = true;
      } else {
        // 关闭提示信息
        tipStore.setTipIsVisible(false);
      }
    }

    cancelBubble(e);
    preventDefaultEvent(e);
  }

  function mouseUp() {
    const xIdx = Math.round(stayPos.x / configStore.iconBaseWeight);
    const yIdx = Math.round(stayPos.y / configStore.iconBaseHeight);

    const currentPosIdx = xIdx * 9 + yIdx + 1; // posIdx 比实际渲染位置多一个单位距离
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
      if (isInTaskbar) {
        // 图标落在任务栏
        _self.style.left = computePosByPosIdx(originPosIdx - 1).xPos + 'px';
        _self.style.top = computePosByPosIdx(originPosIdx - 1).yPos + 'px';
      } else {
        _self.style.left = computePosByPosIdx(currentPosIdx - 1).xPos + 'px';
        _self.style.top = computePosByPosIdx(currentPosIdx - 1).yPos + 'px';
      }
    }

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
