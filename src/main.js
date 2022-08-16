import { createApp } from 'vue';
import App from './App.vue';
import stores from 'store';
import routers from '@/router';
import Win10UI from './plugin/Win10UI';
import initDirectives from './utils/directive';

import cloneDeep from 'lodash/cloneDeep'; // 导入某个功能的挂载方式

import 'style/index.scss';

const app = createApp(App);

app.config.globalProperties._cloneDeep = cloneDeep;

app.use(stores);
app.use(routers);
app.use(Win10UI);

initDirectives(app);

app.mount('#app');
