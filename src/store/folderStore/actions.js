export default {
  actions: {
    changeCurrentFolder(CurrentFolder) {
      this.storeCurrentFolder = CurrentFolder;
      const length = this.currentShowFolder.length;
      const children = this.storeCurrentFolder.children;
      this.currentShowFolder.splice(0, length, ...children);

      // 切换说明： 不再采用搜索模式 -> 所以清除需要高亮的内容
      const len = this.currentSearchStr.length;
      this.currentSearchStr.splice(0, len);
    },
    cacheCompletedFolder(Folders) {
      this.storeCompletedFolder = Folders;
    },
    addLastFolder(Folder) {
      this.lastFolder.push(Folder);
    },
    deleteLastFolder() {
      return this.lastFolder.pop();
    },
    changeCurrentShowFolder(newArray) {
      const length = this.currentShowFolder.length;
      this.currentShowFolder.splice(0, length, ...newArray);
    },
    setCurrentSearchStr(currentStr) {
      const length = this.currentSearchStr.length;
      this.currentSearchStr.splice(0, length, ...currentStr);
    },
  },
};
