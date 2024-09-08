<template>
  <canvas-modules ref="canvasRef" :uuid="route.params.uuid"/>
</template>

<script setup lang="ts">
import { CanvasModules } from '@components/CanvasModules';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();
const canvasRef = ref<InstanceType<typeof CanvasModules>>();

// 监听刷新
window.electronApi.canvas.refresh.on(() => {
  canvasRef.value?.refresh();
});
</script>
