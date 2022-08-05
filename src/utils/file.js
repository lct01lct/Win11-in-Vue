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
  }
}

export default File;
