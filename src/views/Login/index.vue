<template>
  <div class="form">
    <a-form :model="formState" :labelCol="{span:4}" autocomplete="off" @finish="onFinish">
      <a-form-item label="账号">
        <a-input v-model:value="formState.username" />
      </a-form-item>
      <a-form-item label="密码">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset:4}">
        <a-button type="primary" html-type="submit" :loading="loading">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import {login} from '@/api/http'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
const formState = ref({//表单绑定数据
  username: '',
  password: ''
});
const loading = ref(false)//登录按钮loading
const store = useStore()//获取store
const router = useRouter()//获取路由器
const onFinish = values => {//验证表单后的登录
  loading.value = true
  login().then(res => {//登录成功后保存token
    console.log(res)
    store.commit('setToken',res.token)//保存token
    store.commit('setPortrait',res)//保存头像,昵称
    router.replace('/')
  }).finally(()=>{
    loading.value = false
  })
};
</script>

<style lang="scss" scoped>
.form {
  width: 700px;
  margin: 0 auto;
  padding-top: 50px;
}
</style>