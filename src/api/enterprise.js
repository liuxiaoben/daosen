import request from '@/utils/request'

//获取广告主企业信息
export function enterpriseinformation(eid) {
  return request({
    url: '/enterprise/info',
    method: 'post',
    params: eid
  })
}

//获取子账号信息列表
export function subUserlist(params) {
  return request({
    url: '/account/subUser',
    method: 'post',
    params
  })
}

//获取银行卡信息列表
export function banklist(params) {
  return request({
    url: '/enterprise/bank',
    method: 'post',
    params
  })
}

//删除银行卡信息列表
export function delbank(params) {
  return request({
    url: '/enterprise/delBank',
    method: 'post',
    params
  })
}

//获取账号基本资料
export function UserDetail(params) {
  return request({
    url: '/user/detail',
    method: 'post',
    params
  })
}

//修改账号基本资料
export function updateUserDetail(params) {
  return request({
    url: '/account/updateUserDetail',
    method: 'post',
    params
  })
}

//获得省份
export function getprivince(token) {
  return request({
    url: '/dic/privince',
    method: 'post',
    params:"token"
  })
}

//获得城市
export function getcity(params) {
  return request({
    url: '/dic/city',
    method: 'post',
    params
  })
}

//获得区域
export function getdistinct(params) {
  return request({
    url: '/dic/distinct',
    method: 'post',
    params
  })
}

//广告主个人认证
export function privateAuthen(params) {
  return request({
    url: '/enterprise/privateAuthen',
    method: 'post',
    params
  })
}

//广告主企业认证
export function authen(params) {
  return request({
    url: '/enterprise/authen',
    method: 'post',
    params
  })
}

//获取企业资质认证信息
export function authorInfo(params) {
  return request({
    url: 'enterprise/authorInfoByEid',
    method: 'post',
    params
  })
}

//编辑银行卡
export function editBank(params) {
  return request({
    url: 'enterprise/editBank',
    method: 'post',
    params
  })
}

//添加银行卡
export function addBank(params) {
  return request({
    url: 'enterprise/addBank',
    method: 'post',
    params
  })
}