<template>
  <div class="app-layout"  :style="{'--height-tabBar': height}">
    <div class="app-layout-tabBar" :class="`is-${props.platform}`">
      <div class="app-layout-tabBar__body">
        <slot name="tabBar"/>
      </div>
      <div class="app-layout-tabBar__button"/>
    </div>
    <div class="app-layout-body">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">export default { name: 'LayoutWindow' };</script>
<script setup lang="ts">
import { computed } from 'vue';
import { isNumber } from '@utils';

interface Props {
  platform?: 'win' | 'mac';
  height?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  height: 30,
  platform: 'win',
});

const height = computed(() => isNumber(props.height) ? props.height + 'px' : props.height);
</script>

<style lang="scss" src="./style.scss"></style>
