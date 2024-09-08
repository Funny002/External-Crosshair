<template>
  <Windows>
    <div class="Windows-content__side">
      <el-button @click.stop="onAddClick">
        <font-awesome name="plus"/>
        添加准星
      </el-button>
      <template v-for="menuItem of data.menuList">
        <el-button type="primary" :plain="menuItem.path !== activePath" @click.stop="onMenuItemClick(menuItem)">
          <font-awesome :name="menuItem.icon"/>
          <span>{{ menuItem.label }}</span>
        </el-button>
      </template>
      <!--<el-button type="primary" plain @click.stop="onListClick">-->
      <!--  <font-awesome name="bars"/>-->
      <!--  <span>准星列表</span>-->
      <!--</el-button>-->
    </div>
    <div class="Windows-content__body" ref="bodyRef">
      <router-view/>
    </div>
  </Windows>
</template>

<script lang="ts">export default { name: 'LayoutMain' };</script>
<script setup lang="ts">
import { FontAwesome } from '@components/FontAwesome';
import { Windows } from '@components/Windows';
import { ElMessage } from 'element-plus';
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

interface MenuItem {
  icon: string;
  path: string;
  label: string;
}

interface Store {
  menuList: MenuItem[];
}

const route = useRoute();
const router = useRouter();
const bodyRef = ref<HTMLElement | null>(null);
const activePath = computed(() => route.fullPath);

const data = reactive<Store>({
  menuList: [
    { icon: 'bars', label: '准星列表', path: '/aim' },
  ],
});

function onAddClick() {
  ElMessage.warning({
    message: '功能正在施工中，敬请等待更新...',
    grouping: true,
    offset: 50,
  });
}

function onMenuItemClick(item: MenuItem) {
  router.push({ path: item.path });
}
</script>

<style lang="scss" src="./LayoutMain.scss"></style>
