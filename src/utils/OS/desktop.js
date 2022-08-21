class DeskTop {
  constructor(baseData, userFolderData) {
    this.emptyPosIdx = 1; // 当前可以存放文件的空位置
    this.appData = []; // 记录所有 app 的数据
    this.init(baseData, userFolderData);
  }

  init(baseData, userFolderData) {
    this.setAppData(baseData, userFolderData);
    this.setEmptyPosIdx();
  }

  // 处理原始数据
  setAppData(baseData, userFolderData) {
    this.appData = this.appData.concat(baseData);
    this.setEmptyPosIdx();

    // userFolderData.forEach((item, i) => {});

    for (let i = 0; i < userFolderData.length; i++) {
      const item = userFolderData[i];
      item.posIdx = this.emptyPosIdx;
      item.componentName = 'FolderFullBox';
      item.icon = 'explorer.png';
      console.log(this.appData);
      this.appData.push(item);
      this.setEmptyPosIdx();
    }
  }

  setEmptyPosIdx() {
    sortByPosIdx(this.appData);
    let currIdx = this.appData[0].posIdx;
    if (currIdx !== 1) {
      this.emptyPosIdx = 1;
      return;
    }

    let idx;
    for (let i = 0; i < this.appData.length; i++, currIdx++) {
      idx = this.appData[i].posIdx;
      if (currIdx !== idx) {
        this.emptyPosIdx = this.appData[i - 1].posIdx + 1;

        break;
      }
    }

    if (currIdx > idx) {
      this.emptyPosIdx = currIdx;
    }
  }

  // 设置图标摆放排序
  setIconDefaultPos() {}
}

export default DeskTop;

// 根据 PosIdx 排序
function sortByPosIdx(appData) {
  const arr = appData;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j].posIdx > arr[j + 1].posIdx) {
        const temp = { ...arr[j + 1] };
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
}
