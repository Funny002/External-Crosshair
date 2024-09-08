<template>
  <div style="border-bottom: 1px solid #e5e5e5; padding: 5px; background-color: #fff; display: flex; align-items: center;">
    <el-button text @click.stop="router.back">
      <font-awesome name="angle-left"/>
      <span>返回</span>
    </el-button>
    <div style="display: flex; align-items: center; margin-left: auto;">
      <el-switch v-model="data.status" :active-value="true" :inactive-value="false" @change="onSwitchChange"></el-switch>
      <span style="padding: 0 10px 0 4px;">启动</span>
    </div>
  </div>
  <div id="AimItem" class="AimItem">
    <div class="AimItem__canvas">
      <canvas-modules ref="canvasModulesRef" :uuid="uuid" background/>
    </div>
    <div class="AimItem__options">
      <AimOptions :list="module.options || []" v-model="data.values" @change="onChange"/>
    </div>
  </div>
</template>

<script lang="ts">export default { name: 'AimItem' };</script>
<script lang="ts" setup>
import { CanvasModules, setupModules } from '@components/CanvasModules';
import { FontAwesome } from '@components/FontAwesome';
import { AimOptions } from '@components/AimOptions';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
import { debounce, Storage } from '@utils';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();
const uuid = route.params.uuid;
const module = setupModules(uuid);
const canvasModulesRef = ref<typeof CanvasModules>();

const data = reactive({
  status: false,
  values: Object.assign({}, module.defaults),
});

const refreshStatus = debounce(function refreshStatus() {
  window.electronApi.canvas.status(uuid).then(res => {
    data.status = res;
  });
});

onMounted(() => {
  refreshStatus();
  // 配置
  Storage.get(`AimConfig/${ uuid }.json`, 'values').then(res => {
    data.values = Object.assign({}, module.defaults, res);
  });
});

function onChange() {
  const newValue = Object.assign({}, data.values);
  Storage.set(`AimConfig/${ uuid }.json`, 'values', newValue).then(() => {
    window.electronApi.canvas.refresh.send(uuid); // 通知其他窗口刷新
    canvasModulesRef.value?.refresh();
  });
}

function onSwitchChange(status: boolean) {
  if (!uuid) return ElMessage.error('未知标识 key');
  const type = status ? 'show' : 'hide';
  window.electronApi.canvas[type](uuid);
}
</script>

<style lang="scss" src="./style.scss"></style>
