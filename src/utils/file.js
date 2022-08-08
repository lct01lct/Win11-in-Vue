class File {
  constructor(options) {
    this.init(options);
  }

  init(options) {
    this.setInfo(options);
  }

  getInfo() {}

  setInfo(info) {
    this.name = info.name;
    this.size = info.size;
    this.extension = info.extension;
  }
}

export default File;
