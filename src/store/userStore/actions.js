import { getSrcSettingTheme } from '../../utils/getSrc';
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
      document.querySelector('#app').style.backgroundImage = `url(${getSrcSettingTheme(
        `${src}.jpg`
      )})`;
    },
  },
};
