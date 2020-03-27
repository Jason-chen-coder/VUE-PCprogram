//用来封装所有与学科相关的网站请求
import axios from "axios"
import { gettoken } from "../utils/mytoken"
const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true,
})
instance.interceptors.request.use(function (config) {
    // console.log("准备发起axios请求");
    //在发送请求之前将token设置到请求头中
    config.headers.token = gettoken()
    // console.log(config)
    return config
}, function (error) {
    // console.log(error)
    return error
})
instance.interceptors.response.use(function (response) {
    return response
}, function (error) {
    return Promise.reject(error)
})
export function getSubjectApi({ name, page, limit, rid, username, status }) {
    return instance({
        url: "/subject/list",
        // headers: {
        //     token: gettoken()
        // },
        params: {
            name: name,
            page: page,
            limit: limit,
            rid: rid,
            username: username,
            status: status
        }
    })
}


export function changeStatusApi(id) {
    return instance({
        url: "/subject/status",
        method: "POST",
        data: {
            id: id
        }
    })
}

export function addNewSubjectApi({ rid,
    name,
    short_name,
    intro,
    remark }) {
    return instance({
        url: "/subject/add",
        method: "POST",
        data: {
            rid,
            name,
            short_name,
            intro,
            remark
        }
    })
}

export function delSubjectApi(id) {
    return instance({
        url: "/subject/remove",
        method: "POST",
        data: {
            id: id
        }
    })
}

export function editSubjectApi({
    id,
    rid,
    name,
    short_name,
    intro,
    remark
}) {
    return instance({
        url: "/subject/edit",
        method: 'POST',
        data: {
            id,
            rid,
            name,
            short_name,
            intro,
            remark
        }
    })
}