import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/view/Login/index.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/view/Home/index.vue'),
  },
];

const routers = createRouter({
  history: createWebHistory(),
  routes,
});

export default routers;
