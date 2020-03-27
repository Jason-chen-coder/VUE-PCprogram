//这里封装了用户界面的所有接口

import axios from 'axios'
import { gettoken } from "../utils/mytoken"
const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})

//请求拦截器
instance.interceptors.request.use((config) => {
    config.headers.token = gettoken()
    return config
}, (error) => {
    return Promise.reject(error)
})

//请求用户列表
export function getUserListApi({
    username,
    email,
    role_id,
    page,
    limit
}) {
    return instance({
        url: "/user/list",
        params: {
            username,
            email,
            role_id,
            page,
            limit
        }
    })
}

//修改用户状态
export function setStatusApi(id) {
    return instance({
        url: "/user/status",
        method: "POST",
        data: {
            id
        }
    })
}
//删除用户
export function removeUserApi(id) {
    return instance({
        url: "/user/remove",
        method: "POST",
        data: { id }
    })
}


//编辑用户
export function editUserApi({
    id,
    username,
    phone,
    email,
    avatar,
    password,
    remark,
    status,
    role_id
}) {
    return instance({
        url: "/user/edit",
        method: "POST",
        data: {
            id,
            username,
            phone,
            email,
            avatar,
            password,
            remark,
            status,
            role_id
        }
    })
}

//新增用户
export function addUserApi({
    username,
    email,
    phone,
    role_id,
    status,
    remark,
    avatar
}) {
    return instance({
        url: "/user/add",
        method: "POST",
        data: {
            username,
            email,
            phone,
            role_id,
            status,
            remark,
            avatar
        }
    })
}