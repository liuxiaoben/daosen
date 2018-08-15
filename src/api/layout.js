import request from '@/utils/request'

//退出登录
export function exitLogon(token){
    return request({
    	url:'/user/loginOut',
    	method:'post',
    	params:{token}
    })
}