import { defineAsyncComponent } from 'vue';

export const TitleBar = defineAsyncComponent(() => import('./TitleBar.vue'));

export default { TitleBar };
