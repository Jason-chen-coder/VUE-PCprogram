import Vue from 'vue'
//导入vue-router插件
import VueRouter from 'vue-router'
//导入login组件
import login from '../view/login/index.vue'
//导入 element-ui使用 组件
import Elementui from '../view/Elementui/index.vue'
//注册vue-router插件
Vue.use(VueRouter);
//实例化路由
const router =  new VueRouter({
   routes:[
       {
        path:"*",
        redirect:"/login"
       },
       {
           path:"/login",
           component:login
       },
       {
        path:"/Elementui",
        component:Elementui
    }
   ]
})

export default router