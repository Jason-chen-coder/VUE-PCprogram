//导入axios
import axios from 'axios'
import {gettoken} from '../utils/mytoken'
//创建实例
const instance = axios.create({
    baseURL:process.env.VUE_APP_URL,
    withCredentials:true
})
// 设置请求拦截器
instance.interceptors.request.use((config) => {
    config.headers.token = gettoken()
    return config
}, (error) => {
    return Promise.reject(error)
})

//获取面板数据
export function getTitleChartApi(){
    return instance({
        url:"/data/title",
        method:"POST"
    })
}
//获取企业题目数据
export function getEntChartApi(){
    return instance({
        url:"/data/statistics",
        method:"POST"
    })
}
//获取城市题目数据
export function getCitytApi(){
    return instance({
        url:"/data/hot_cities",
        method:"POST"
    })
}