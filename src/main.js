import { createApp } from 'vue';
import App from './App.vue';
import stores from 'store';
import routers from '@/router';
import Win10UI from './plugin/Win10UI';

import 'style/index.scss';

const app = createApp(App);

app.use(stores);
app.use(routers);
app.use(Win10UI);

app.mount('#app');
