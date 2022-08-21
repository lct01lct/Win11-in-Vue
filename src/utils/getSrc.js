export const getSrcIconUI = (name) => {
  if (typeof name === 'undefined') return 'error.png';
  const path = `/src/assets/img/icon/ui/${name}`;
  const modules = import.meta.globEager(`/src/assets/img/icon/ui/*`);
  return modules[path]?.default;
};

export const getSrcIcon = (name) => {
  if (typeof name === 'undefined') return 'error.png';
  const path = `/src/assets/img/icon/${name}`;
  const modules = import.meta.globEager(`/src/assets/img/icon/*`);
  return modules[path]?.default;
};

export const getSrcSetting = (name) => {
  if (typeof name === 'undefined') return 'error.png';
  const path = `/src/assets/img/setting/${name}`;
  const modules = import.meta.globEager(`/src/assets/img/setting/*`);
  return modules[path]?.default;
};

export const getSrcSettingTheme = (name) => {
  if (typeof name === 'undefined') return 'error.png';
  const path = `/src/assets/img/setting/assetsImg/default/${name}`;
  const modules = import.meta.globEager(`/src/assets/img/setting/assetsImg/default/*`);
  return modules[path]?.default;
};

export const getSrcStartIcon = (name) => {
  if (typeof name === 'undefined') return 'error.png';
  const path = `/src/assets/img/icon/startIcon/${name}`;
  const modules = import.meta.globEager(`/src/assets/img/icon/startIcon/*`);
  return modules[path]?.default;
};

export const getSrcSearch = (name) => {
  if (typeof name === 'undefined') return 'error.png';
  const path = `/src/assets/img/search/${name}`;
  const modules = import.meta.globEager(`/src/assets/img/search/*`);
  return modules[path]?.default;
};

export const getSrcLeftPane = (name) => {
  if (typeof name === 'undefined') return 'error.png';
  const path = `/src/assets/img/leftPane/${name}`;
  const modules = import.meta.globEager(`/src/assets/img/leftPane/*`);
  return modules[path]?.default;
};
