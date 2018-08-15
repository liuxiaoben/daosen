import request from '@/utils/request'

//获取未绑定服务公司列表
export function tenantList(pageNum,pageSize,params) {
  return request({
    url: '/tenant/notBind/'+ pageNum + '/' + pageSize,
    method: 'get',
    params
  })
}

//获取未绑定服务公司列表
export function tenantBindList(pageNum,pageSize,params) {
  return request({
    url: '/tenant/myBind/'+ pageNum + '/' + pageSize,
    method: 'get',
    params
  })
}

//获取服务公司详情
export function tenantDetail(params) {
  return request({
    url: '/tenant/detail',
    method: 'post',
    params
  })
}

//获取服务公司服务状态
export function bindStatus(params) {
  return request({
    url: '/tenant/bindStatus',
    method: 'post',
    params
  })
}

//获取子账号信息列表
export function subUser(params) {
  return request({
    url: '/account/subUser',
    method: 'post',
    params
  })
}


//获取服务公司详情跟进人信息
export function getPeople(params) {
  return request({
    url: '/user/traceMan',
    method: 'post',
    params
  })
}

//获取服务公司详情资质信息
export function getAuthor(params) {
  return request({
    url: '/tenant/authInfo',
    method: 'post',
    params
  })
}

//申请绑定
export function applyBind(params) {
  return request({
    url: '/tenant/applyBind',
    method: 'post',
    params
  })
}

//服务公司结束/开启服务
export function changeService(params) {
  return request({
    url: '/tenant/applyBind',
    method: 'post',
    params
  })
}

