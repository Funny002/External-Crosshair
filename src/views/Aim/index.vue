<template>
  <div id="Aim" class="Aim">
    <template v-for="item of data.list">
      <div class="Aim-item" @click.stop="onAimItemClick(item)">
        <div class="Aim-item__label">{{ item.label }}</div>
        <div class="Aim-item__tags">
          <template v-for="tag of item.tags">
            <el-tag v-if="isString(tag)">{{ tag }}</el-tag>
            <el-tag v-else v-bind="tag">{{ tag.label }}</el-tag>
          </template>
        </div>
        <canvas-modules :uuid="item.name" background/>
      </div>
    </template>
  </div>
</template>

<script lang="ts"> export default { name: 'Aim' };</script>
<script lang="ts" setup>
import { CanvasModules } from '@components/CanvasModules';
import { useRouter } from 'vue-router';
import { isString } from '@utils';
import { reactive } from 'vue';

interface Store {
  list: AimItem[];
}

const router = useRouter();
const tag = { label: 'Canvas', effect: 'dark' };

const data = reactive<Store>({
  list: [
    { label: '瞄具', name: 'Aim', type: 'canvas', tags: [tag] },
    { label: '十字', name: 'Cross', type: 'canvas', tags: [tag] },
    { label: '点', name: 'Dot', type: 'canvas', tags: [tag] },
  ],
});

function onAimItemClick(item: AimItem) {
  router.push({ path: `/aim:${ item.name }`, name: 'AimItem', params: { uuid: item.name } });
}
</script>

<style lang="scss" src="./style.scss"></style>
