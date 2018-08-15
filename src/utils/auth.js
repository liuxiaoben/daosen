//这个里面是全局方法里，针对token保存在cookies里面的
//引入这个js-cookie这个功能模块
import Cookies from 'js-cookie'

//声明一个常量， 给到Admin-Token
const TokenKey = 'ggz-Token'


//导出3个方法，都是操作token的，只要在别的页面引入这个auth.js，那么就可以调用这下面的3个方法
export function getToken() {
  return Cookies.get(TokenKey)  //得到用户的token
}

export function setToken(token) { 
  return Cookies.set(TokenKey, token)  //设置token
}

export function removeToken() {
  return Cookies.remove(TokenKey) //清空token
}
