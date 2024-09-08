import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [{
  path: '/',
  name: 'App',
  redirect: '/aim',
  component: () => import('@layouts/LayoutMain.vue'),
  children: [
    { path: 'aim', name: 'Aim', component: () => import('@views/Aim/index.vue') },
    { path: 'aim/:uuid', name: 'AimItem', component: () => import('@views/AimItem/index.vue') },
  ],
}, {
  name: 'Canvas',
  path: '/canvas/:uuid',
  component: () => import('@views/Canvas/index.vue'),
}];
