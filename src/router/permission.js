import router from './index'
import store from '@/store'
import { DynamicRoute } from './index'//获取动态路由
import {getUserData,getPermission} from '@/api/http'//获取权限的请求
import {filterRoutes,setDefaultRedirect} from '@/utils/filterRoutes'//过滤权限组成路由  设置路由重定向

//前置守卫
router.beforeEach(async (to,from)=>{
  if(store.state.token){//如果有token则判断是否设置过权限菜单
    if(to.name !== 'login'){//如果前往的是登录页面则重定向到首页
      if(!store.getters.gotPermission || !store.getters.gotUserData){//判断是否获取过权限和菜单
        let userData = await getUserData()//获取用户数据
        store.commit('setPortrait',userData)//保存头像,昵称
        let permission = await getPermission()//获取权限列表
        // console.log("权限列表",permission)
        let resultRoutes = filterRoutes(permission)
        // console.log("过滤后",resultRoutes)
        let resultDefault = setDefaultRedirect(resultRoutes)
        // console.log("设置默认重定向",resultDefault)
        DynamicRoute[0].children.push(...resultDefault)//把路由添加到动态路由里
        let menuList = DynamicRoute[0].children //获取菜单
        store.commit('setPermission',DynamicRoute)//保存路由
        store.commit('setMenu',menuList)//保存菜单
        DynamicRoute.forEach(route => {//遍历添加路由
          router.addRoute(route)
        })
        return {...to,replace:true} //跳转页面
      }
    }
  }else{//没有token则跳转登录
    if(to.name !== 'login'){
      console.log("去的是登录页面")
      return '/login'
    }
  }
})

//路由后置
router.afterEach((to,from)=>{
  let pathArray = to.fullPath.split('/')
  store.commit('setOpenKeys',pathArray)//设置默认展开菜单
  store.commit('setSelectedKeys',[to.name])//设置默认选中菜单
})