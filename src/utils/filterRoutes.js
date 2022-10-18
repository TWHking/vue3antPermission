//到处过滤权限菜单的方法

//过滤权限组合成路由
export function filterRoutes(routes){
  let routeArray = []
  routes.forEach(route => {//遍历路由数组
    let routeObj = {
      path:route.name,//路由路径
      name:route.name,//路由名称
      meta:{
        menuName:route.meta.menuName,//菜单名称
        icon:route.meta.icon,//菜单图标
      },
      component:()=>import(`@/views${route.path}`)//组件
    }
    if(route.children && route.children.length > 0){//如果有子路由且大于0则递归
      routeObj.children = filterRoutes(route.children)
    }
    routeArray.push(routeObj)//把处理好的了顺子添加到数组里
  })
  return routeArray //返回过滤后的路由
}

//设置默认路由重定向
export function setDefaultRedirect(routes){
  routes.forEach(route => {
    if(route.children && route.children.length>0){//如果有子路由且大于一个
      route.redirect = {name:route.children[0].name}//设置默认重定向到第一个子路由
      route.children = setDefaultRedirect(route.children)//递归设置
    }
  })
  return routes
}