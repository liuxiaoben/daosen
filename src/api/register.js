import request from '@/utils/request'

export function register(registerparams) {
  console.log(registerparams)
  return request({
    url: '/user/register',
    method: 'post',
    params: registerparams
  })
}

export function regCheckCode(userPhone) {
  console.log(userPhone)
  return request({
    url: '/user/regCheckCode',
    method: 'post',
    params: userPhone
  })
}

export function gt() {
  return request({
    url: '/gee/ap1?t=' + (new Date()).getTime(),
    method: 'get'
  })
}