import { stoupRouter } from './router';
import { createApp } from 'vue';
import App from './app.vue';

async function bootstrap() {
  const app = createApp(App);
  await stoupRouter(app);
  app.mount('#app');
}

bootstrap().then(() => {
  console.log('App is running...');
});
