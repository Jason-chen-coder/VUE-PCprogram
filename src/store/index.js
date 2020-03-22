import Vue from "vue"
//导入 Vuex插件
import Vuex from "vuex"
//注册 vuex插件
Vue.use(Vuex)
//实例化一个store
const store = new Vuex.Store({
    state: {
        username:"",
        avatar:""
    },
    mutations:{
        changeInfo(state,userinfo){
            state.username = userinfo.username
            state.avatar =process.env.VUE_APP_URL + "/"+ userinfo.avatar
        }
    }
})
// 导出store
export default store 