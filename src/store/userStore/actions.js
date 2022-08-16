export default {
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    setUsername(newName) {
      this.username = newName;
    },
    toggleTheme(src) {
      this.themeSrc = src;
      localStorage.setItem('theme', src);
      document.querySelector(
        '#app'
      ).style.backgroundImage = `url(src/assets/img/setting/assetsImg/default/${src}.jpg)`;
    },
    // changeCurrentFolder(CurrentFolder) {
    //   this.storeCurrentFolder = CurrentFolder;
    //   const length = this.currentShowFolder.length;
    //   const children = this.storeCurrentFolder.children;
    //   this.currentShowFolder.splice(0, length, ...children);
    // },
    // cacheCompletedFolder(Folders) {
    //   this.storeCompletedFolder = Folders;
    // },
    // addLastFolder(Folder) {
    //   this.lastFolder.push(Folder);
    // },
    // deleteLastFolder() {
    //   return this.lastFolder.pop();
    // },
    // changeCurrentShowFolder(newArray) {
    //   const length = this.currentShowFolder.length;
    //   this.currentShowFolder.splice(0, length, ...newArray);
    // },
  },
};
