import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';//引入ant js
import 'ant-design-vue/dist/antd.css';//引入ant css
import '@/router/permission'//引入路由守卫
import * as Icons from '@ant-design/icons-vue' //引入图书库


const app = createApp(App)

// 注册图标组件
for (const i in Icons) {
  app.component(i, Icons[i])
}

app.use(Antd).use(store).use(router).mount('#app')
