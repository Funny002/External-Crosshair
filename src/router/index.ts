import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

import { App } from 'vue';

export async function stoupRouter(app: App) {
  app.use(router);
  await router.isReady();
  return app;
}
