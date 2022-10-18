import { getRequest,postRequest } from "@/utils/axios"

//登录接口
export const login = (params = {}) => getRequest('/login',params)
// 获取用户信息
export const getUserData = (params = {}) => getRequest('/user',params)
// 获取表格数据
export const getTableData = (params = {}) => getRequest('/tableData',params)
//获取权限菜单接口
export const getPermission = (data = {}) => postRequest('/permission',data)
