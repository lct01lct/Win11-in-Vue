import { createRouter, createWebHistory } from 'vue-router';
import useUserStore from '@/store/userStore';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/view/Login'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/view/Home'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(function (to, from, next) {
  if (to.name === 'Login') {
    return next();
  }

  // 判断本地是否记录token值
  const store = useUserStore();
  const token = store.getToken;

  if (token) {
    // todo
    // 获取用户信息
    next();
  } else {
    next({ name: 'Login' });
  }
});

export default router;
