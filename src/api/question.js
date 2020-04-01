import axios from "axios"
const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true,
})
import { gettoken } from "../utils/mytoken"

// 设置请求拦截器
instance.interceptors.request.use((config) => {
    config.headers.token = gettoken()
    return config
}, (error) => {
    return Promise.reject(error)
})


//获取题目列表
export function getQuestionListAPI({
    title,
    subject,
    enterprise,
    type,
    step,
    username,
    status,
    difficulty,
    create_date,
    page,
    limit,
}) {
    return instance({
       url:"/question/list",
       method:"GET",
       params:{
        title,
        subject,
        enterprise,
        type,
        step,
        username,
        status,
        difficulty,
        create_date,
        page,
        limit,
       }
    })
}

//新增题目
export function addQuestionApi(form){
    return instance({
        url:"/question/add",
        method:"POST",
        data:form
    })
}

//获取题目信息
export function getQusetionApi(id){
    return instance({
        url:"/question/one",
        method:"POST",
        data:{
            id
        }
    })
}

//编辑题目
export function editQuestionApi(obj){
    return instance({
        url:"/question/edit",
        method:"POST",
        data:obj
    })
}

//禁用题目
export function changeStatusApi(id){
    return instance({
        url:"/question/edit",
        method:"POST",
        data:{id}
    })
}
//删除题目
export function delQuestionApi(id){
    return instance({
        url:"/question/remove",
        method:"POST",
        data:{id}
    })
}