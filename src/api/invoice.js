import request from '@/utils/request'

//发票信息管理
export function templetList(token) {
  return request({
    url: '/invoice/templet/list',
    method: 'get',
    params: { token }
  })
}

//新增发票
export function addInvoice(incoiceInfo) {
  return request({
    url: '/invoice/templet/add',
    method: 'post',
    params: incoiceInfo
  })
}

//发票详情
export function invoiceDetail(params) {
  return request({
    url: '/invoice/templet/detail',
    method: 'get',
    params
  })
}

//发票编辑
export function editInvoice(params) {
  return request({
    url: '/invoice/templet/edit',
    method: 'post',
    params
  })
}

//发票删除
export function invoiceDelete(params) {
  return request({
    url: '/invoice/templet/remove',
    method: 'post',
    params
  })
}

//地址管理
export function addressList(token) {
  return request({
    url: '/invoice/address/list',
    method: 'get',
    params: { token }
  })
}

//地址详情
export function addressDetail(params) {
  return request({
    url: '/invoice/address/detail',
    method: 'get',
    params
  })
}

//发票地址编辑
export function addressEdit(params) {
  return request({
    url: '/invoice/address/edit',
    method: 'post',
    params
  })
}

// 新增发票邮寄地址
export function addAddress(addressInfo) {
  return request({
    url: '/invoice/address/add',
    method: 'post',
    params: addressInfo
  })
}

// 删除发票邮寄地址
export function deleteAddress(params) {
  return request({
    url: '/invoice/address/remove',
    method: 'post',
    params
  })
}

// 获得省份
export function getPrivince(token) {
  return request({
    url: '/dic/privince',
    method: 'post',
    params: { token }
  })
}

// 获得城市
export function getCity(privinceName) {
  return request({
    url: '/dic/city',
    method: 'post',
    params: privinceName
  })
}

// 获得区域
export function getDic(cityName) {
  return request({
    url: '/dic/distinct',
    method: 'post',
    params: cityName
  })
}

