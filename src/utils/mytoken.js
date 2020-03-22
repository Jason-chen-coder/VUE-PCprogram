//封装所有用来处理localstorage的方法
const TOKEN_KEY = "hmmm"
export function settoken(value){
    window.localStorage.setItem(TOKEN_KEY,value);
}
export function gettoken(){
    return window.localStorage.getItem(TOKEN_KEY)
}
export function removetoken(){
    window.localStorage.removeItem(TOKEN_KEY)
    
}