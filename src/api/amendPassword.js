import request from '@/utils/request'

//企业中心-密码修改
export function modifyPassword(params){
    return request({
    	url:'/user/pwd',
    	method:'post',
    	params
    })
}