import { searchTargetFolderByPath } from '../handleFolder';
import terminalStore from './store';
// import folderStore from '../../store/folderStore';

import Folder from '../OS/folder';
// 需要实现的功能：
//  1. 判别出命令的类型 类型怕判别
//      需要进行判别的命令 -> [cd dir md cls del ]
//  2. 能够对判别出的命令做出对应的反应
//  3. 需要的 -> 渲染输出内容的数组 、

const store = terminalStore();
// const useFolderStore

const commandArray = [
  { action: 'CD', msg: '切换至目标路径' },
  { action: 'DIR', msg: '搜索当前文件夹下已存文件' },
  { action: 'CLS', msg: '清空屏幕内容' },
  { action: 'HELP', msg: '帮助列表' },
  { action: 'MD', msg: '创建文件夹' },
  { action: 'DEL', msg: '删除文件夹' },
];

// 同步文件夹路径
export const setPath = (path) => {
  store.setCurrentFolder(searchTargetFolderByPath(path));
};

const parseAction = (path, action, command, itemArray) => {
  switch (action) {
    case 'cd':
      return handleCD(path, command, itemArray);
    case 'dir':
      return handleDir(path, itemArray);
    case 'cls':
      return handleCls(itemArray);
    case 'help':
      return handleHelp(itemArray);
    case 'md':
      return handleMD(command, itemArray);
    case 'del':
      return handleDEL(command, itemArray);
    default:
      return handleDefault(itemArray, {
        comment: `${action}不是内部或外部命令，也不是可运行的程序
      或批处理文件。`,
        list: ['键入Help以获取更多帮助'],
      });
  }
};

export const responseAction = (path, input, itemArray) => {
  // 命令集 、 行为
  // eslint-disable-next-line prefer-const
  let { actionOrigin, command } = input;

  const action = actionOrigin.toLocaleLowerCase() || undefined;

  // 如果是形如C: D: 就是切换磁盘直接切
  if (/^[a-zA-Z]{1}:/.test(action)) {
    return handleToggleDesc(actionOrigin.toLocaleUpperCase(), path, itemArray);
  }

  const res = parseAction(path, action, command, itemArray);
  return res;
};

export const handleToggleDesc = (Desc, path, itemArray) => {
  const targetDesc = Array.of(Desc);

  const target = searchTargetFolderByPath(targetDesc);

  if (!target) {
    return itemArray.push({
      comment: `${Desc} 磁盘不存在`,
    });
  }
  itemArray.push({
    comment: `${Desc} 磁盘切换`,
  });

  store.setCurrentFolder(target);

  path.splice(0, path.length, targetDesc);
};

export const handleCD = (path, command, itemArray) => {
  // 回退上个文件夹
  if (command === '../') {
    // 同时更改路径
    // 能够找到父亲，切换
    if (store.folder.parent) {
      itemArray.push({ list: [`${path.join('/')}> cd ${command}`] });
      path.splice(-1, 1);
      store.setCurrentFolder(store.folder.parent);
    } else {
      itemArray.push({ comment: 'Have Reached The Bottom' });
    }
  } else {
    // 留存上次输入的记录
    itemArray.push({ list: [`${path.join('/')}> cd ${command.join('/')}`] });

    // eslint-disable-next-line prefer-const
    command.map((value) => {
      handleCdArray(path, value, store.folder, itemArray);
    });
  }
};

export const handleDir = (path, itemArray) => {
  // eslint-disable-next-line prefer-const
  let nameArray = ['<DIR >  ../'];

  // push进文件信息
  store.folder.children.map((value) => {
    if (value instanceof Folder) {
      nameArray.push(`<DIR >  ${value.name}`);
    } else {
      nameArray.push(`<FILE>  ${value.name}`);
    }
  });

  itemArray.push({
    list: nameArray,
    comment: `驱动器 ${path.join('/')} 中的卷是 Windows-SSD 所占据空间大小 ${store.folder.size}`,
  });
};

export const handleCls = (itemArray) => {
  const length = itemArray.length;
  itemArray.splice(0, length);
};

export const handleHelp = (itemArray) => {
  // eslint-disable-next-line prefer-const
  let array = [];
  commandArray.map((value) => {
    array.push(`${value.action.padEnd(8, '.')} - - - - ${value.msg}`);
  });

  itemArray.push({
    list: array,
  });
};

export const handleMD = (command, itemArray) => {
  const branchFolder = store.currentFolder;
  branchFolder.addNewEmptyFolder({
    name: command.join(''),
    memory: '0KB',
    children: [],
  });

  itemArray.push({
    list: [`Folder's Name: ${command.join('')}`, `Folder's size: 0 B`],
    comment: `Create New Folder In Path: ${branchFolder.getPath().join('/')}`,
  });
};

export const handleDEL = (command, itemArray) => {
  const branch = store.currentFolder;
  if (!branch.children.length) {
    return itemArray.push({
      comment: '当前路径下没有可删除的文件夹',
    });
  }
  branch.children.map((value, i, array) => {
    if (value.name === command.join('')) {
      array.splice(i, 1);
    }
  });

  itemArray.push({
    comment: `Folder -> "${command.join('')}" have deleted`,
  });
};

export const handleDefault = (itemArray, content) => {
  itemArray.push(content);
};

function handleCdArray(path, command, folder, itemArray) {
  const filter = folder.children.filter((value) => value.name === command)[0];

  // 筛选结果为空，所以不存在该文件夹
  if (!filter) {
    return handleDefault(itemArray, {
      comment: `该文件 ${command} 不存在于该文件夹中。`,
    });
  }

  // 如果不为空，但是对象不是文件夹，那么也不能
  if (!(filter instanceof Folder)) {
    return itemArray.push({
      comment: `不能进入该文件夹，因为它是一个文件`,
    });
  }

  store.setCurrentFolder(filter);

  path.push(command);
}

export const handleTabCommand = (path, command) => {
  const current = searchTargetFolderByPath(path);

  // eslint-disable-next-line prefer-const
  let array = [];

  if (!current.children.length) {
    return array;
  }

  const reg = new RegExp(command[0]);

  current.children.map((value) => {
    if (reg.test(value.name)) {
      array.push(value.name);
    }
  });

  return array;
};
