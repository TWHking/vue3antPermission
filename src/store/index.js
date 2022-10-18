import { createStore } from 'vuex'

export default createStore({
  state: {
    get token(){//获取token
      return localStorage.getItem('token')
    },
    set token(token){
      localStorage.setItem('token',token)//设置token
    },
    portrait:null,//头像
    nickname:null,//昵称
    permissionList:null,//权限路由
    permissionMenus:null,//菜单
    openKeys:[],//展开的菜单
    selectedKeys:[]//选中的菜单
  },
  getters: {
    gotPermission(state){//是否获取过权限
      return state.permissionList && state.permissionMenus
    },
    gotUserData(state){//是否获取用户数据
      return state.portrait && state.nickname
    },
    gotMenulist(state){//是否获取过权限
      return state.permissionMenus
    },
    getOpenKeys(state){//展开菜单
      return state.openKeys
    },
    getSelectedKeys(state){//选中菜单
      return state.selectedKeys
    }
  },
  mutations: {
    setToken(state,token){//保存token
      state.token = token
    },
    setPortrait(state,userData){//设置头像,昵称
      state.portrait = userData.portrait
      state.nickname = userData.nickname
    },
    setPermission(state,permissionList){//设置权限路由
      state.permissionList = permissionList
    },
    setMenu(state,permissionMenus){//设置菜单
      state.permissionMenus = permissionMenus
    },
    setOpenKeys(state,openKeys){//设置菜单展开
      state.openKeys = openKeys
    },
    setSelectedKeys(state,selectedKeys){//设置菜单选中
      state.selectedKeys = selectedKeys
    }
  },
  actions: {
  },
  modules: {
  }
})
