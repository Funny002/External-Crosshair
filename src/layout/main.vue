<template>
  <window-layout id="Main" :height="30">
    <template #tabBar>
      External Crosshair
    </template>
    <router-view/>
  </window-layout>
</template>

<script lang="ts">export default { name: 'Main' };</script>
<script lang="ts" setup>
import { WindowLayout } from '@components/Layout';
</script>
