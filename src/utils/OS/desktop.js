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

    userFolderData.forEach((item, i) => {
      item.posIdx = 20 + i;
      item.componentName = 'FolderFullBox';
      item.icon = 'explorer.png';
      // console.log(item);
      this.appData.push(item);
    });
    sortByPosIdx(this.appData);
  }

  setEmptyPosIdx() {
    let currIdx = this.appData[0].posIdx;
    if (currIdx !== 1) {
      return (this.emptyPosIdx = 1);
    }

    for (let i = 0; i < this.appData.length; i++, currIdx++) {
      const idx = this.appData[i].posIdx;

      if (currIdx !== idx) {
        this.emptyPosIdx = this.appData[i - 1].posIdx + 1;
        break;
      }
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
