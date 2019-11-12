import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/reset.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import moment from 'moment'//导入文件 

//创建bus
let bus =new Vue()
Vue.prototype.$bus=bus

Vue.prototype.$moment = moment;//赋值使用
//echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//引入本地存储工具函数
import local from "./utils/local"

//路由守卫
router.beforeEach((to,from,next)=>{
  //从本地存储获取token
  let token = local.get("token")

  if(token){
    //如果有token 证明是登录成功的
    next()//放行

  }else{
    //如果token不存在，证明是非法登录
    //如果去登录界面。放行
    if(to.path==="/login"){
      next()
    }else{
      //去其他页面，直接跳转到界面
      next("/login")
    }
  }
})


import './assets/fonts/iconfont.css'
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
