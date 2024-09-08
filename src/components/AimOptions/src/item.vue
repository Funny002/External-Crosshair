<template>
  <div class="AimOptions-item">
    <div class="AimOptions-item__label">
      <div>{{ props.item.label }}</div>
      <el-tooltip v-if="props.item.docs" :content="props.item.docs">
        <font-awesome name="circle-info"/>
      </el-tooltip>
    </div>
    <div class="AimOptions-item__body" :class="`is-${props.item.type}`">
      <template v-if="props.item.type ==='color'">
        <el-color-picker v-model="value" @change="onColorChange"/>
        <el-input v-model="value" readonly/>
      </template>
      <template v-else-if="props.item.type === 'number'">
        <el-slider v-model="value" :min="props.item.min" :max="props.item.max || 250" :step="props.item.step" show-input/>
      </template>
    </div>
  </div>
</template>

<script lang="ts">export default { name: 'AimOptionsItem' };</script>
<script setup lang="ts">
import { FontAwesome } from '@components/FontAwesome';
import { computed } from 'vue';

interface Props {
  modelValue?: any;
  item: CanvasModuleOptions;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => undefined,
  item: () => ({}),
});

const emits = defineEmits(['update:modelValue', 'change']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value: any) {
    emits('change', value);
    emits('update:modelValue', value);
  },
});

function onColorChange(color: string) {
  if (!color) value.value = '#000000';
}
</script>
