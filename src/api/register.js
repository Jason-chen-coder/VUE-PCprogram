import axios from 'axios'
export function getCodeApi({ code, phone }){
      //发axios请求获取验证码
      return axios({
        url: process.env.VUE_APP_URL + "/sendsms",
        method: "POST",
        data: {
          code: code,
          phone: phone
        },
        //携带cookie跨域
        withCredentials: true
      })
}
export function apiregister({
  username,
  phone,
  email,
  avatar,
  password,
  rcode
}){
  return axios({
    url:process.env.VUE_APP_URL+"/register",
    method:"POST",
    data:{
      username,
      phone,
      email,
      avatar,
      password,
      rcode
    }
  })
}