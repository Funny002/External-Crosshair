import { defineAsyncComponent } from 'vue';

export const CanvasModules = defineAsyncComponent(() => import('./src/index.vue'));

export default CanvasModules;

export * from './modules';
