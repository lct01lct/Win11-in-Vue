export default {
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    toggleTheme(src) {
      this.themeSrc = src;
      localStorage.setItem('theme', src);
      document.querySelector(
        '#app'
      ).style.backgroundImage = `url(src/assets/img/setting/assetsImg/default/${src}.jpg)`;
    },
    changeCurrentFolder(CurrentFolder) {
      this.storeCurrentFolder = CurrentFolder;
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
  },
};
