import { setupRouter } from '../router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import AppView from './index.vue';
import { createApp } from 'vue';

async function bootstrap() {
  const app = createApp(AppView);
  app.use(ElementPlus);
  await setupRouter(app);
  app.mount('#app');

}

try {
  bootstrap().then(() => {
    console.log('App is running...');
  });
} catch (e) {
  console.log(e);
}
