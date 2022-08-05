import Folder from './folder';
import { divStorageUnit } from './convertUnit';

class Desc extends Folder {
  constructor(options) {
    super(options);
    this.setPath();
    this.setDescInfo(options);
  }

  setDescInfo(options) {
    this.memory = options.memory;
    this.setUsageRate();
  }

  // 获取占用率
  setUsageRate() {
    this.usageRate = divStorageUnit(this.size, this.memory);
  }

  setPath() {
    this.path = `${this.name.match(/[A-Z]:/)[0]}\\`;
    delete this.parent;
  }
}

export default Desc;
