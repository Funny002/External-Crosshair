import { defineAsyncComponent } from 'vue';

export const Windows = defineAsyncComponent(() => import('./Windows.vue'));

export default { Windows };
