import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './routes';
import { App } from 'vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export async function setupRouter(app: App) {
  app.use(router);
  await router.isReady();
  return app;
}
