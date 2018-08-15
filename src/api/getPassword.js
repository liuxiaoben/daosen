import request from '@/utils/request'

export function getCodes(user){
    return request({
        url:'/user/forgotCheckCode',
        method:'post',
        params:user
    })
}

export function getPwd(user){
    return request({
        url:'/user/forgotPwd',
        method:'post',
        params:user
    })
}
