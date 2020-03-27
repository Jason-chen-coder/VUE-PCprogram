//这里写api接口文件的配置信息
import axios from 'axios'
import {gettoken} from "./mytoken"
const instance =axios.create({
    baseURL :process.env.VUE_APP_URL,
    withCredentials:true
})
//请求拦截器
instance.interceptors.request.use(function(config){
    config.headers.token = gettoken();
    return config
},function(error){
    return Promise.reject(error)
})
//响应拦截器
instance.interceptors.response.use(function(response){
    return response
},function(error){
    return Promise.reject(error)
})
//导出instance
export default instance