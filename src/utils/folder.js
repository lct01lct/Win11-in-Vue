import parseFileType from './pasreFIleType';
import File from './file';
import { addStorageUnit, showProperUnit } from './convertUnit';

class Folder {
  constructor(options, parent) {
    this.children = [];
    this.parent = parent;
    this.init(options);
  }

  init(options) {
    this.setInfo(options);
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
    this.size = this.children.reduce((initVal, item) => {
      if (item.size) {
        return addStorageUnit(initVal, item.size);
      }
      return initVal;
    }, '0KB');
  }

  setInfo(info) {
    this.name = info.name;
    this.setPath();
  }

  setFolders(list) {
    list.forEach((item) => {
      const type = parseFileType(item);
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
  }
}

export default Folder;

function parsePath(path) {
  return path.split('\\').filter((item) => item);
}
