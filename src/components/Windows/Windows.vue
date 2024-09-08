<template>
  <div id="Windows" class="Windows">
    <title-bar class="Windows-titleBar" :height="titleBarHeight">
      External Crosshairs
    </title-bar>
    <div class="Windows-content" :style="{height:`calc(100vh - ${titleBarHeight})`}">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">export default { name: 'Windows' };</script>
<script setup lang="ts">
import { TitleBar } from '@components/TitleBar';
import { isNumber } from '@utils';
import { computed } from 'vue';

interface Props {
  titleBar?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  titleBar: 30,
});

const titleBarHeight = computed(() => {
  return isNumber(props.titleBar) ? props.titleBar + 'px' : props.titleBar;
});
</script>

<style lang="scss" src="./style.scss"></style>
