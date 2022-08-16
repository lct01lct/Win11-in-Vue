import { defineStore } from 'pinia';

// 自动导入
const options = import.meta.globEager('./*.js');
const store = {};

for (const item in options) {
  Object.assign(store, options[item].default);
}

export default defineStore('folderStore', store);
