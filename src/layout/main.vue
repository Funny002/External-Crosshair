<template>
  <window-layout id="Main" :height="30">
    <template #tabBar>
      External Crosshair
    </template>
    <div class="main-side">
      <template v-for="item in data.menu">
        <el-button class="main-side__item" :icon="item.icon" @click="onMenuClick(item)">
          {{ item.name }}
        </el-button>
      </template>
    </div>
    <div class="main-body">
      <router-view/>
    </div>
  </window-layout>
</template>

<script lang="ts">export default { name: 'Main' };</script>
<script lang="ts" setup>
import { Aim, Setting } from '@element-plus/icons-vue';
import { WindowLayout } from '@components/Layout';
import { reactive, shallowRef } from 'vue';
import { ElButton } from 'element-plus';

interface MenuItem {
  icon?: any;
  name: string;
  path?: string;
}

interface Store {
  menu: MenuItem[];
}

const data = reactive<Store>({
  menu: [
    { icon: shallowRef(Aim), name: '准星' },
    { icon: shallowRef(Setting), name: '设置' },
  ],
});

function onMenuClick(item: MenuItem) {
  console.log(item);
}
</script>

<style lang="scss" src="./style.scss"></style>
