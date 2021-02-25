// js入口
import Vue from 'vue'

// mint-ui库
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

// mui库
import '../lib/mui/css/mui.min.css'
import '../lib/mui/css/icons-extra.css'


// 配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './route.js'

// 导入 根组件
import App from './components/App.vue'

const app = new Vue({
  el: '#app',
  render: (h) => h(App),
  router
});