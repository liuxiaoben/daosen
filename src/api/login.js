import request from '@/utils/request'

export function login(loginParams) {
  console.log(loginParams)
  return request({
    url: '/user/login',
    method: 'post',
    params: loginParams
  })
}

export function getInfo(user) {
  return request({
    url: '/user/detail',
    method: 'get',
    params: user
  })
}

export function logout(token) {
  return request({
    url: '/user/loginOut',
    method: 'post',
    params: token
  })
}
