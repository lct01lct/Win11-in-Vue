import folderStore from '../store/folderStore';
import { MessageBox } from '@/plugin/Win10UI';
const store = folderStore();

// 该文件作用：
// 处理pathTool中根据路径match对应结构的方法
// 考虑到终端也有可能会采用这个方法，所以方法写在utils中

/** 递归磁盘下的children，匹配目标文件夹或文件
 *
 * @param {*} targetDescArray 目标磁盘
 * @param {*} targetPath 路径栏的目标路径
 * @returns 返回目标proxy 或 false
 */
const recursiveByPath = (targetDescArray, targetPath) => {
  const targetArray = targetDescArray.children || [];
  if (targetArray.length) {
    for (let i = 0; i < targetArray.length; i++) {
      const target = targetArray[i];
      if (target.children) {
        const tempPath = target.getPath().toString();
        const path = targetPath.toString();
        if (tempPath === path) {
          return target;
        } else {
          if (recursiveByPath(target, targetPath)) {
            return recursiveByPath(target, targetPath);
          }
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

/** 另造轮子：由于不能复用之前的路径递归查找，所以还要再整一个用字符串的
 *
 * @param {object} targetDescArray 当前树的分支
 * @param {any} searchStr 搜索框的承接变量
 * @returns 符合的array
 */
const recursiveByStr = (targetDescArray, searchStr) => {
  const targetArray = targetDescArray.children || [];
  const res = [];
  if (targetArray.length) {
    for (let i = 0; i < targetArray.length; i++) {
      const target = targetArray[i];
      const reg = new RegExp(searchStr);
      if (reg.test(target.name)) {
        res.push(targetArray[i]);
      } else {
        const result = recursiveByStr(target, searchStr);
        if (result.length) {
          res.push(...result);
        }
      }
    }
    return res;
  } else {
    return [];
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
    const data = recursiveByPath(...targetDescArray, path);
    if (data) {
      return data;
    } else {
      MessageBox({
        confirmBtnText: '确定',
        title: '文件夹',
        content: '数据不存在！',
      });
    }
  } else {
    MessageBox({
      confirmBtnText: '确定',
      title: '文件夹',
      content: '磁盘不存在！',
    });
  }
};

export const searchTargetFolderByStr = (searchStr) => {
  const desc = store.storeCompletedFolder;
  const res = [];
  for (let i = 0; i < desc.length; i++) {
    const target = desc[i];
    res.push(...recursiveByStr(target, searchStr));
  }
  return res;
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
