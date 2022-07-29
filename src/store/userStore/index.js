import { defineStore } from 'pinia';

const options = import.meta.globEager('./*.js');
const store = {};

for (const item in options) {
  Object.assign(store, options[item].default);
}

export default defineStore('userStore', store);
