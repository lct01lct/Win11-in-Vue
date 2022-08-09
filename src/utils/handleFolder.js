import userStore from '../store/userStore';
const store = userStore();

// 该文件作用：
// 处理pathTool中根据路径match对应结构的方法
// 考虑到终端也有可能会采用这个方法，所以方法写在utils中

/** 递归磁盘下的children，匹配目标文件夹或文件
 *
 * @param {*} targetDescArray 目标磁盘
 * @param {*} targetPath 路径栏的目标路径
 * @returns 返回目标proxy 或 false
 */
const recursive = (targetDescArray, targetPath) => {
  const targetArray = targetDescArray.children || undefined;
  if (targetArray) {
    for (let i = 0; i < targetArray.length; i++) {
      const target = targetArray[i];
      if (target.children) {
        const tempPath = target.getPath().toString();
        const path = targetPath.toString();
        if (tempPath === path) {
          return target;
        } else {
          return recursive(target, targetPath);
        }
      } else {
        const fileName = `${target.name}.${target.extension}`;
        const file = targetPath[targetPath.length - 1];
        if (fileName === file) {
          return target;
        }
      }
    }
  } else {
    return false;
  }
};

/** 调用recursive递归函数，返回目标文件夹信息
 *
 * @param {*} path 路径的全信息数组
 * @return proxy目标对象 或 false
 */
export const searchTargetFolderByPath = (path) => {
  // 全部的磁盘信息
  const desc = store.storeCompletedFolder;
  // 目标磁盘
  const targetDescArray = desc.filter((value) => value.getPath()[0] === path[0]);
  if (targetDescArray.length) {
    return recursive(...targetDescArray, path);
  } else {
    console.log('没数据！弹框提示！');
  }
};

/** 回到当前磁盘的磁盘根对象
 *
 * @param { array } path 当前的路径
 */
export const goDesc = (path) => {
  const desc = store.storeCompletedFolder;
  const targetTopDesc = desc.filter((value) => value.getPath()[0] === path[0]);
  store.changeCurrentFolder(...targetTopDesc);
};

/**
 *  考虑到backParent和goChildren应该都是为了服务文件夹，而终端大概用不上
 *  所以逻辑又改了回来
 *
 *  更改当前文件夹前，先将当前的记录压栈，为了goChildren出栈提供参考
 */
export const backParent = () => {
  const data = store.storeCurrentFolder;
  if (data.parent) {
    // 将当前页面压栈
    store.addLastFolder(data);
    // 向后倒退记录
    store.changeCurrentFolder(data.parent);
  }
};

/**
 *  根据记录栈，查找之前到达的文件夹
 */
export const goChildren = () => {
  const data = store.deleteLastFolder();
  if (data) {
    store.changeCurrentFolder(data);
  } else {
    console.log('记录栈清空了！');
  }
};
