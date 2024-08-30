import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [{
  path: '/',
  name: 'App',
  redirect: '/aim',
  component: () => import('../layout/main.vue'),
  children: [{
    path: 'aim',
    name: 'Aim',
    component: () => import('@views/Aim/index.vue'),
    meta: {
      title: '首页',
      icon: 'home',
      keepAlive: true,
    },
  }],
}];
