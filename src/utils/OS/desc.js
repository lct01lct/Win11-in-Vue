import Folder from './folder';
import { divStorageUnit } from './convertUnit';

class Desc extends Folder {
  // options -> the folder data obj from folder-data.js
  constructor(options) {
    // super base class constructor
    super(options);
    // process of create this.path
    this.setPath();
    // process of create desc's usageRate
    this.setDescInfo(options);
  }

  // desc's message
  setDescInfo(options) {
    this.memory = options.memory;
    // get usageRate of memory
    this.setUsageRate();
  }

  // 获取占用率
  setUsageRate() {
    // call divStorageUnit with this.size, this.memory
    this.usageRate = divStorageUnit(this.size, this.memory);
  }

  setPath() {
    // this.path === C:\ or D:\
    this.path = `${this.name.match(/[A-Z]:/)[0]}\\`;
    delete this.parent;
  }
}

export default Desc;
