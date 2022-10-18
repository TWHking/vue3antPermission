import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css';
import { Button } from 'ant-design-vue';

Vue.use(Button);

Vue.prototype.hasBtn = function(permission){
  let array = store.getters.permissionList //权限列表
  if(array.includes(permission)){
    return true
  }
  return false
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
