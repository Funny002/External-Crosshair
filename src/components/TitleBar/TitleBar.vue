<template>
  <div id="TitleBar" class="TitleBar" :style="{'height': height}">
    <div class="TitleBar-content">
      <slot>Content</slot>
    </div>
    <div class="TitleBar-button">
      <slot name="button" :onWindowBtn="onWindowBtn">
        <button class="TitleBar-button__item" @click="onWindowBtn('minus')" title="缩小窗口">
          <font-awesome name="minus"/>
        </button>
        <button class="TitleBar-button__item is-close" @click="onWindowBtn('close')" title="关闭窗口">
          <font-awesome name="xmark"/>
        </button>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">export default { name: 'TitleBar' };</script>
<script setup lang="ts">
import { FontAwesome } from '@components/FontAwesome';
import { isNumber } from '@utils';
import { computed } from 'vue';

interface Props {
  height?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  height: 35,
});

const height = computed(() => {
  return isNumber(props.height) ? props.height + 'px' : props.height;
});

function onWindowBtn(type: 'minus' | 'close') {
  window.electronApi.window[type]();
}
</script>

<style lang="scss" src="./style.scss"></style>
