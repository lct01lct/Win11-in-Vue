import MessageBox from './MessageBox';

const componentFile = import.meta.globEager('./**/index.vue');

const componentsPool = [];
for (const comp in componentFile) {
  componentsPool.push(componentFile[comp].default);
}

export default {
  install(app, options) {
    // 按需加载
    if (options && options.components) {
      options.components.forEach((compName) => {
        componentsPool.forEach((comp) => {
          if (compName === comp.name) {
            app.component(comp.name, comp);
          }
        });
      });
    } else {
      componentsPool.forEach((comp) => {
        app.component(comp.name, comp);
      });
    }
  },
};

export { MessageBox };
