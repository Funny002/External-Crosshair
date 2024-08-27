import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { App } from 'vue';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export async function stoupRouter(app: App) {
  app.use(router);
  await router.isReady();
  return app;
}
