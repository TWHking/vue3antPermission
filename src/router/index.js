import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login'//登录页面
import Home from '../views/Home'//首页
import UserCenter from '../views/Home/userCenter'//个人中心
import Layout from '../views/Layout'//布局
import NotFound from '../views/ErrorPage/404'//404

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

//动态路由
export const DynamicRoute = [
  {
    path:'/',
    name: 'index',
    component:Layout,
    redirect:'/home',//重定向到首页
    children:[
      {
        path:'home',
        name:'home',
        component:Home,
        meta:{
          menuName:"首页",
          icon:"home-outlined"
        }
      }
    ]
  },
  {//个人中心
    path:'/userCenter',
    name:'userCenter',
    component:UserCenter
  },
  {//通配,处理404
    path:'/:pathMatch(.*)*',
    name:'NotFound',
    component:NotFound
  }
]

const router = createRouter({ //创建路由
  history: createWebHashHistory(),
  routes
})

export default router
