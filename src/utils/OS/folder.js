import parseFileType from './pasreFIleType';
import File from './file';
import { addStorageUnit, showProperUnit } from './convertUnit';

class Folder {
  // options is
  constructor(options, parent) {
    // actual the options is accord with DESC's options
    // but i console this options it's log many message
    // this reason is call setFolders in init, it will 递归 this options
    this.children = [];
    // both the desc haven't parent so is undefined
    // and other parent is the result of 递归
    // 同一根目录parent一样
    this.parent = parent;
    this.init(options);

    if (options.posIdx) {
      this.posIdx = options.posIdx;
    }
  }

  init(options) {
    this.setInfo(options);
    // 传递的children内的子元素
    this.setFolders(options.children);
    this.computedSizeByChildren();
  }

  getInfo() {
    return {
      name: this.name,
      size: showProperUnit(this.size),
    };
  }

  computedSizeByChildren() {
    // computed this Folder's size
    this.size = this.children.reduce((initVal, item) => {
      if (item.size) {
        // return reducer's result
        return addStorageUnit(initVal, item.size);
      }
      return initVal;
    }, '0KB');
  }

  setInfo(info) {
    // 递归的各个文件夹的数据
    this.name = info.name;
    this.setPath();
  }

  changeName(newName) {
    this.name = newName;
  }

  // 目的是递归各个文件夹
  setFolders(list) {
    list.forEach((item) => {
      // parse file's type return extionsion or folder
      const type = parseFileType(item);
      // if type is folder ,it will 递归 folder class
      // or it type is extionsion ,it will new File
      this.children.push(type === 'folder' ? new Folder(item, this) : new File(item));
    });
  }

  getPath() {
    return parsePath(this.path);
  }

  setPath() {
    this.path = `${this.parent.path}${this.name}\\`;
  }

  addNewEmptyFolder(options) {
    if (options.children) {
      return new Error('改新建文件夹不为空');
    }
    options.name = options.name || '新建文件夹';

    // 文件名不合法
    this.children.push(new Folder(options));
  }

  addNewEmptyFile(options) {
    // todo
    // 超出磁盘内存报错
    // 改变children
    this.children.push(new Folder(options, this));
  }
}

export default Folder;

function parsePath(path) {
  return path.split('\\').filter((item) => item);
}
