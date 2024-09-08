<template>
  <canvas ref="canvasRef" id="CanvasModules" class="CanvasModules"></canvas>
</template>

<script lang="ts">export default { name: 'CanvasModules' };</script>
<script setup lang="ts">
import backgroundSrc from '../image/background.jpg?url';
import { debounce, Storage } from '@utils';
import { setupModules } from '../modules';
import { onMounted, ref } from 'vue';

interface Props {
  uuid: string;
  background?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  background: false,
});

const module = setupModules(props.uuid);
const canvasRef = ref<HTMLCanvasElement>();

const options = ref<Record<string, any>>(Object.assign({}, module.defaults));

const initialize = debounce(function initialize() {
  const canvas = canvasRef.value;
  if (!canvas) return undefined;

  const { offsetWidth, offsetHeight } = canvas;
  canvas.height = offsetHeight * 2;
  canvas.width = offsetWidth * 2;

  if (props.background) {
    canvas.style.backgroundImage = `url("${ backgroundSrc }")`;
  }

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.clearRect(0, 0, offsetWidth, offsetHeight);
  ctx.translate(offsetWidth, offsetHeight);
  module.setup(ctx, Object.assign({}, options.value));
});

function refresh() {
  if (!props.uuid) return undefined;
  Storage.get(`AimConfig/${ props.uuid }.json`, 'values').then(res => {
    options.value = Object.assign({}, module.defaults, res);
    initialize();
  });
}

onMounted(() => {
  initialize();
  refresh();
});

defineExpose({ refresh });
</script>

<style lang="scss" src="./style.scss"></style>
