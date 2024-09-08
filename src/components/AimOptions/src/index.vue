<template>
  <div id="AimOptions" class="AimOptions">
    <aim-options-item v-for="item in props.list" :item="item" :modelValue="values[item.name]" @change="v => onChange(item.name, v)"/>
  </div>
</template>

<script lang="ts">export default { name: 'AimOptions' };</script>
<script setup lang="ts">
import AimOptionsItem from './item.vue';
import { computed, watch } from 'vue';

interface Props {
  list?: Array<CanvasModuleOptions>;
  modelValue?: Record<string, any>;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({}),
  list: () => ([]),
});

const values = computed(() => Object.assign({}, props.modelValue));

const emits = defineEmits(['update:modelValue', 'change']);

function onChange(name: string, value: any) {
  props.modelValue[name] = value;
  const newValue = Object.assign({}, props.modelValue);
  emits('update:modelValue', newValue);
  emits('change', newValue);
}
</script>

<style lang="scss" src="./style.scss"></style>
