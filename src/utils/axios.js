import axios from 'axios'
import store from '../store'
import { message } from 'ant-design-vue'

//创建axios实例
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://xxxxxx' : '/api',//测试环境使用 /api
  timeout: 6000 //超时
})

// 请求拦截器
instance.interceptors.request.use((config) => {
  if (store.state.token) {//如果有token则在请求头添加token
    config.headers.Authorization = store.state.token
  }
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error);
})

// 响应拦截器
instance.interceptors.response.use((response) => {
  let responseData = response.data //获取响应数据
  let code = responseData.code //状态码
  if(code === 200){//正常
    return responseData.data
  }else if(code === 500){
    message.error(responseData.message)
  }else{
    message.error("请求出错")
  }
  return Promise.reject(responseData.message)
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
})

//get请求
export const getRequest = (url,params = {},headers = {}) => {
  return instance({
    method:"GET",
    url,
    params,
    headers
  })
}

//post请求
export const postRequest = (url,data = {},headers = {}) => {
  return instance({
    method:"POST",
    url,
    data,
    headers
  })
}