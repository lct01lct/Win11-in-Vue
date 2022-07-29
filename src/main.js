import { createApp } from 'vue';
import App from './App.vue';
import stores from 'store';
import routers from '@/router';

import 'style/index.scss';

const app = createApp(App);

app.use(stores);
app.use(routers);

app.mount('#app');
