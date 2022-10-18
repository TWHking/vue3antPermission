<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <!-- logo图片 -->
      <img src="@/assets/logo.png" alt="logo" class="left_menu_title" />
      <!-- 遍历菜单 -->
      <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <menu-list :menuList="gotMenulist" />
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0 16px">
        <div class="header">
          <div>
            <!-- 头像 -->
            <img class="header_block_img" :src="store.state.portrait" alt="头像">
            <!-- 菜单 -->
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>
                {{store.state.nickname}}
                <more-outlined />
              </a>
              <template #overlay>
                <a-menu @click="handleMenuClick">
                  <a-menu-item key="1">
                    <user-outlined />
                    个人中心
                  </a-menu-item>
                  <a-menu-item key="2">
                    <poweroff-outlined />
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content style="margin:16px;background-color: #fff;padding:16px;">
        <!-- 路由渲染位置 -->
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup>
import MenuList from '@/components/MenuComponent.vue'
import { computed, ref } from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import { Modal } from 'ant-design-vue';
const collapsed = ref(false)//菜单栏是否收起
const store = useStore()//获取store
const router = useRouter()//获取router
const openKeys = computed({
  get(){
    return store.getters.getOpenKeys
  },
  set(value){
    // console.log('openKeys', value);
    store.commit('setOpenKeys',value)
  }
})
const selectedKeys = computed({
  get(){
    return store.getters.getSelectedKeys
  },
  set(value){
    // console.log('selectedKeys', value);
    store.commit('setSelectedKeys',value)
  }
})
const gotMenulist = computed(()=>store.getters.gotMenulist)

const handleMenuClick = e => {
  switch(e.key){
    case '1':
      router.push('/userCenter')//前往个人中心
    break
    case '2':
      Modal.confirm({
        content: '确定要退出登录吗?',
        okText:"确认",
        cancelText:"取消",
        onOk() {
          router.push('/login')//前往个人中心
          setTimeout(()=>{
            window.location.reload()
          },500)
        }
      });
    break
  }
}

</script>

<style lang="scss">
  .left_menu_title{
    width: 30px;
    display: block;
    margin: 0 auto;
    padding: 20px 0;
  }
  .header{//顶部
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    >div{
      display: flex;
      align-items: center;
      .header_block_img{//头像
        width: 40px;
        height: 40px;
        margin-right: 10px;
        border-radius: 50%;
      }
    }
  }
</style>