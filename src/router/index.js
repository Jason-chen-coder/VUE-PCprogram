import Vue from 'vue'
//导入vue-router插件
import VueRouter from 'vue-router'
//导入login组件
import login from '../view/login/index.vue'
//导入 element-ui使用 组件
import Elementui from '../view/Elementui/index.vue'
import index from '../view/index/index.vue'

// 导入nprogress插件
import NProgress from "nprogress"
import "nprogress/nprogress.css"
//导入Vuex插件
import store from '../store/index'
//导入token的操作方法
import { gettoken } from "../utils/mytoken";
//导入获得用户信息接口
// import { checkToken } from "../api/index";
import { getUserInfo } from "../api/index";
import children from "./childRouter"
//注册vue-router插件
Vue.use(VueRouter);
//实例化路由
const router = new VueRouter({
    routes: [
        {
            path: "/",
            redirect: "/login"
        },
        {
            path: "/index",
            component: index,
            meta:{
                title:"首页",
                roles:["超级管理员","管理员","老师","学生"]
            },
            children: children
        },
        {
            path: "/login",
            component: login,
            meta:{
                title:"登录",
                roles:["超级管理员","管理员","老师","学生"]
            }
        },
        {
            path: "/Elementui",
            component: Elementui
        }
    ]
})
import {Message} from 'element-ui'
//使用导航守卫
//先试用前置守卫
router.beforeEach((to, from, next) => {
    var  title = to.meta.title
       //调用登录页保存到store中的数据token
     // console.log(store.state.token)
    // var storeToken =store.state.token
    if(title){
        document.title =title
    }else{
        document.title = "黑马面面"
    }
    NProgress.start();
    if (to.path !== "/login") {
        //切换页面先检查tokn是否为空
        if (!gettoken()) {
            // this.$router.push("/login");由于这里的this指的是router
            // router.push("/login")
            // next();
            Message.error("你还未登录,请登录")
            NProgress.done()
            next("/login")
        } else {
          //那token去获取用户信息
            getUserInfo()
                .then(res => {
                      // 判断token是否为真
                    if (res.data.code === 200) {
                        // console.log("token为真",res)
                        //先判断当前用户的状态status,如果被禁用则需要提示用户并跳转回页面
                        if(res.data.data.status===0){
                            Message.error("账号已被禁用,请联系管理员")
                            NProgress.done()
                        }else{
                         //现在将获得的用户信息保存到store里去
                        console.log("to的内容:",to)
                        // console.log("保存到vux中的数据:",res.data.data)
                        var role = res.data.data.role
                        store.commit("changeInfo",res.data.data)
                        console.log(role)
                            if(to.meta.roles.includes(role)){
                                // console.log("有访问该路由的权限")
                                next()
                            }else{
                                // console.log("没有访问该路由的权限")
                                Message.error('对不起你没有访问该页面的权限,请联系管理员')
                                NProgress.done()
                            }
                            // next()
                        }
                    } else if (res.data.code === 206) {
                        NProgress.done();
                        Message.error("token错误,请重新登录")
                        // router.push("/login");
                        // next();
                        next("/login")
                    }
                })
            // //发起axios登录请求判断token为真
            // checkToken(storeToken).then(res => {
            //         if (res.data.code === 200) {
            //             // window.console.log("登陆成功")
            //             // 通过store的token查询用户资料成功之后,将获得的资料保存起来
            //             window.console.log(res)
            //             next()
            //         } else if (res.data.code === 206) {
            //             NProgress.done();
            //             Message.error("token错误,请重新登录")
            //             // router.push("/login");
            //             // next();
            //             next("/login")
            //         }
            //     })
        }
    } else {
        console.log("去的页面是login页")
        next();
    }
})


router.afterEach((from, to) => {
    console.log(from)
    console.log(to)
    setTimeout(() => {
        NProgress.done()
    }, 500)

})
export default router