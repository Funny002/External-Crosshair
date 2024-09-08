<template>
  <el-config-provider v-bind="elementConfig">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts">export default { name: 'App' };</script>

<script lang="ts" setup>
// @ts-ignore
import zh_CN from 'element-plus/dist/locale/zh-cn.mjs';
import { reactive } from 'vue';

const elementConfig = reactive({
  size: 'small',
  locale: zh_CN,
});
</script>

<style lang="scss" src="./style.scss"></style>
