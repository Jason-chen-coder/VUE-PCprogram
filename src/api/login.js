import axios from 'axios'
var instance =  axios.create({
    baseURL:process.env.VUE_APP_URL,
    withCredentials:true
})
export  function loginapi({phone,password,code}){
    return instance({
        url:"/login",
        method:"POST",
        data:{
            phone,
            password,
            code
        }
    })
}