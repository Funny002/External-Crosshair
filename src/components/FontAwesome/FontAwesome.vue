<template>
  <component class="font-awesome" :is="model" :style="{color: props.color, width: size, height: size}"/>
</template>

<script lang="ts">export default { name: 'FontAwesome' };</script>
<script lang="ts" setup>
import FontAwesomeIcons, { regular as RegularIcons } from './svgs';
import { isNumber } from '@utils';
import { computed } from 'vue';

interface Props {
  name: string;
  color?: string;
  regular?: boolean;
  size?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 16,
  regular: false,
  color: 'inherit',
});

const size = computed(() => {
  return isNumber(props.size) ? props.size + 'px' : props.size;
});

const model = computed(() => {
  const { name, regular } = props;
  return regular ? RegularIcons[name] : FontAwesomeIcons[name];
});
</script>

<style lang="css">
.font-awesome {
  color: initial;
  margin-right: 4px;
  text-align: center;
  fill: currentColor;
  display: inline-block;
}

.font-awesome > svg {
  height: 100%;
}
</style>
