<template>
  <!-- 遍历菜单 -->
  <template v-for="(menu,index) in menuList" :key="menu.name">
    <a-sub-menu v-if="menu.children && menu.children.length > 0" :key="menu.name">
      <!-- 菜单图标和名称 -->
      <template #icon>
        <component :is="menu.meta.icon" />
      </template>
      <template #title>{{menu.meta.menuName}}</template>
      <!-- 递归 -->
      <MenuComponent :menuList="menu.children" />
    </a-sub-menu>
    <!-- 单个菜单 -->
    <a-menu-item v-else :key="menu.name" @click="selectItem(menu)">
      <template #icon>
        <component :is="menu.meta.icon" />
      </template>
      {{menu.meta.menuName}}
    </a-menu-item>
  </template>
</template>

<script setup>
import { ref } from 'vue'
import {useRouter} from 'vue-router'

const props = defineProps({
  menuList: {
    type: Array,
    require: true
  }
})
const router = useRouter()//获取路由
const selectItem = menu => {//点击菜单项
  router.push({name:menu.name})
}
const menuList = ref(props.menuList)//获取传过来的菜单

</script>