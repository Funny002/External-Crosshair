import { defineAsyncComponent } from 'vue';

export const AimOptions = defineAsyncComponent(() => import(`./src/index.vue`));

export default AimOptions;
