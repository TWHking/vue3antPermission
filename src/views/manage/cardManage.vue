<template>
  <!-- 查询 -->
  <a-form
    layout="inline"
  >
    <a-form-item>
      <a-input allowClear v-model:value="formState.name" placeholder="请输入姓名" />
    </a-form-item>
    <a-form-item>
      <a-input allowClear v-model:value="formState.age" placeholder="请输入年龄" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="getData">查询</a-button>
    </a-form-item>
  </a-form>
  <!-- 表格 -->
  <a-table :dataSource="dataSource" :locale="locale"  :columns="columns" :loading="loading" bordered/>
</template>

<script setup>
import {getTableData} from '@/api/http' //获取表格数据
import {onBeforeMount, ref} from 'vue'
const formState = ref({//查询
  name:"",
  age:""
})
const loading = ref(false)//页面是否加载中
const columns = [//表头
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age'
  },
  {
    title: '工作',
    dataIndex: 'job'
  }
]
const dataSource = ref([])//表格数据
const getData = () => {
  // console.log("查询数据",formState.value)
  loading.value = true
  // dataSource.value = []//清空数据
  getTableData().then(res => {
    // console.log("表格数据",res)
    dataSource.value = dataSource.value.concat(res)
  }).finally(()=>{
    loading.value = false
  })
}
const locale = {//表格配置
  emptyText:"暂无数据"
}

onBeforeMount(()=>{//请求数据
  getData()
})
</script>

<style>
 .ant-form-inline .ant-form-item{
  margin-bottom: 16px;
 }
</style>