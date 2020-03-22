import axios from "axios"
const instance  = axios.create({
    baseURL:process.env.VUE_APP_URL
})
import {gettoken} from "../utils/mytoken"
export function getUserInfo(){
    return instance({
        url:"/info",
        method:"GET",
        headers:{
            token:gettoken()
        }
    })
}
export function logoutApi(){
    return instance({
        url:"/logout",
        headers:{
            token:gettoken()
        }
    })
}

export function checkToken(token){
    return instance({
        url:"/info",
        method:"GET",
        headers:{
            token:token
        }
    })
}