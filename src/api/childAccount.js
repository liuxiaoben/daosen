import request from '@/utils/request'

/**
 * 企业中心-子账号信息列表
 * @param  {[int]} eid 企业id
 * @param  {[string]} token 用户token
 * @return {[type]}       [description]
 */
export function accountSubUsers(params) {
  return request({
    url: '/account/subUser',
    method: 'post',
    params: params
  })
}

/**
 * 企业中心--获取子账号绑定的服务公司
 * @param  {accountId,token} params 
 * @return {[type]}        [description]
 */
export function tenantInfo(params, pageNum, pageSize) {
  return request({
    url: '/tenant/myBind/'+pageNum+'/'+pageSize,
    method: 'post',
    params: params
  })
}

/**
 * 企业中心--获取子账号的角色信息
 * @param  {token} params 用户token
 * @return {[type]}        [description]
 */
export function allRoles(params) {
  return request({
    url: '/account/role',
    method: 'post',
    params: params
  })
}

/**
 * 企业中心 -- 添加子账号
 * @param {[type]} params [description]
 */
export function addSubUser(params) {
  return request({
    url: '/account/addSubUser',
    method: 'post',
    params: params,
  })
}

/**
 * 企业中心---添加子账号手机号获得验证码
 * @param {phone} params 手机号码
 */
export function addSubAccoutCheckCode(params) {
  return request({
    url: '/account/addSubAccoutCheckCode',
    method: 'post',
    params: params,
  })
}

/**
 * 企业中心 -- 编辑子账号
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function updateSubUser(params) {
  return request({
    url: '/account/updateSubUser',
    method: 'post',
    params: params
  })
}

/**
 * 企业中心-修改子账号手机号获得验证码
 * @param  {phone} params 手机号
 * @return {[type]}        [description]
 */
export function updatePhoneCheckCode(params) {
  return request({
    url: '/account/updatePhoneCheckCode',
    method: 'post',
    params: params
  })
}

/**
 * 企业中心 -- 删除子账号
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function deleteSubUser(params) {
  return request({
    url: '/account/delSubUser',
    method: 'post',
    params: params
  })
}

/**
 * 企业中心-子账号启用
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function enableSubUser(params) {
  return request({
    url: '/account/enableSubUser',
    method: 'post',
    params: params
  })
}

/**
 * 企业中心-子账号禁用
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function disableSubUser(params) {
  return request({
    url: '/account/disableSubUser',
    method: 'post',
    params: params
  })
}

/**
 * 获取用户详情
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function detailSubUser(params) {
  return request({
    url: '/user/detail',
    method: 'post',
    params: params
  })
}

/**
 * 企业中心 -- 子账号日志动态
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function dynamicLog(params) {
  return request({
    url: '/account/dynamicLog',
    method: 'post',
    params: params
  })
}

/**
 * 广告主--文件上传(头像,资质认证)
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function ggzUpload(params, data) {
  return request({
    url: 'http://47.97.171.192:8080/dsyun/file/ggzUpload',
    method: 'put',
    headers: {'Content-Type': 'multipart/form-data'},
    params: params,
    data: data,
  })
}