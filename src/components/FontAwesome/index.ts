import { App, defineAsyncComponent } from 'vue';
import './svgs/index.ts';

export const FontAwesome = defineAsyncComponent(() => import('./FontAwesome.vue'));

export function setupFontAwesome(app: App) {
  app.component('FontAwesome', FontAwesome);
  return app;
}

export default FontAwesome;
