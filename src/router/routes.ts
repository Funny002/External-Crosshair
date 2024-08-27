import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [{
  path: '/',
  name: 'App',
  redirect: '/home',
  component: () => import('../layout/main.vue'),
  children: [{
    path: 'home',
    name: 'Home',
    component: () => import('@views/Home/index.vue'),
    meta: {
      title: '首页',
      icon: 'home',
      keepAlive: true,
    },
  }],
}];
