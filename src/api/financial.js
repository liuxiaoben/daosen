import request from '@/utils/request'

// 交易明细
export function orderList(pageNum, pageSize, params) {
  return request({
    url: '/order/list/' + pageNum + '/' + pageSize,
    method: 'get',
    params
  })
}

// 交易详情
export function orderDetail(params) {
  return request({
    url: '/order/detail',
    method: 'get',
    params
  })
}

/*
 * 付款信息
 * params: {orderId:"订单id", token:"登录token"}*/
export function payInfo(params) {
  return request({
    url: '/order/payInfo',
    method: 'get',
    params
  })
}

/*
 * 已使用资源
 * params: {orderId:"订单id", token:"登录token"}*/
export function selectedMedium(params) {
  return request({
    url: '/order/selectedMedium',
    method: 'get',
    params
  })
}

/*
 * 发票信息
 * params: {orderId:"订单id", token:"登录token"}*/
export function invoiceInfo(params) {
  return request({
    url: '/order/invoiceInfo',
    method: 'get',
    params
  })
}

/*
 * 广告投放-订单-应付明细
 * params: {orderId:"订单id", token:"登录token"}*/
export function payList(pageNum, pageSize, params) {
  return request({
    url: '/finance/listPay/' + pageNum + '/' + pageSize,
    method: 'get',
    params
  })
}

/*
 * 广告投放-订单-付款列表
 * params: {orderId:"订单id", token:"登录token"}*/
export function paidList(pageNum, pageSize, params) {
  return request({
    url: '/finance/pay/list/' + pageNum + '/' + pageSize,
    method: 'get',
    params
  })
}

/**
 * 服务公司--已绑定服务公司下拉框
 * @param {*}
 */
export function myBindForSelect() {
  return request({
    url: '/tenant/myBindForSelect',
    method: 'get'
  })
}

/*
 * 广告主 -财务-付款申请确认
 * params: {orderApIds:"主键id （多个用逗号分割）}"*/
export function checkPayInfo(params) {
  return request({
    url: '/finance/pay/check',
    method: 'get',
    params
  })
}

/*
 * 广告主 -财务-添加订单付款
 * params: {payJson: {
 * orderId: '', money: '', payType: '', fullName: '', bankCode: '', bankName: '',
 * commonCode: '', isInvoiceFinish: '', remark: '', bankType: ''}}*/
export function addPayInfo(params) {
  return request({
    url: '/finance/pay/add',
    method: 'post',
    params
  })
}

/**
 * 财务管理-发票列表-获取状态
 */
export function invoiceApplyStatus() {
  return request({
    url: '/dic/invoiceApplyStatus',
    method: 'get'
  })
}

/**
 * 广告主-财务--发票索取列表
 * @param {*} {code: '订单编号'}
 */
export function askInvoiceList(pageNum, pageSize, params) {
  return request({
    url: '/finance/invoice/list/' + pageNum + '/' + pageSize,
    method: 'get',
    params
  })
}

/**
 * 财务管理-发票信息管理-发票列表
 * @param {*} {code: '发票编号', status: '状态'}
 */
export function invoiceList(pageNum, pageSize, params) {
  return request({
    url: '/finance/invoiceInfo/list/' + pageNum + '/' + pageSize,
    method: 'get',
    params
  })
}

/**
 * 广告主 -财务 - 发票列表的删除
 */
export function deleteInvoice() {
  return request({
    url: 'finance/invoice/del',
    method: 'get'
  })
}

/**
 * 广告主 -财务 - 发票列表的提交
 */
export function checkInvoice() {
  return request({
    url: 'finance/invoice/check',
    method: 'get'
  })
}

/**
 * 广告主 -财务 - 发票列表的作废
 */
export function cancelInvoice() {
  return request({
    url: 'finance/invoice/del',
    method: 'get'
  })
}

/**
 * 财务管理-发票信息管理-发票信息详情
 * @param {*} {tinvApplyId: '发票id'}
 */
export function detailInvoice(params) {
  return request({
    url: '/finance/invoice/detail',
    method: 'get',
    params
  })
}

/**
 * 广告主-财务--新增发票时候内容回显
 * @param {*} {orderId: '发票id'}
 */
export function invoiceShow(params) {
  return request({
    url: '/finance/invoice/show',
    method: 'get',
    params
  })
}

/**
 * 广告主 -财务 - 开票保存（铭客）
 * @param {*} {orderId: '订单id', infoId: '发票id', addId: '发票地址',
 * remark: '备注', invoiceJson: {
 *  {"orderApId":4,"money":8},{"orderApId":4,"money":8},
 * }}
 */
export function addInvoice(params) {
  return request({
    url: '/finance/invoice/add',
    method: 'post',
    params
  })
}

/**
 * 广告主 -财务 - 开票提交（铭客）
 * @param {*} {orderId: '订单id', infoId: '发票id', addId: '发票地址',
 * remark: '备注', invoiceJson: {
 *  {"orderApId":4,"money":8},{"orderApId":4,"money":8},
 * }}
 */
export function saveInvoice(params) {
  return request({
    url: 'finance/invoice/save',
    method: 'post',
    params
  })
}

/**
 * 财务管理-发票信息管理-获得发票地址列表
 * @param {*} {token: '登录信息'}
 */
export function addressList(params) {
  return request({
    url: '/invoice/address/list',
    method: 'post',
    params
  })
}

/**
 * 财务管理-发票信息管理-获得发票地址列表
 * @param {*} {token: '登录信息', addressId: '发票地址id'}
 */
export function detailAddress(params) {
  return request({
    url: '/invoice/address/detail',
    method: 'get',
    params
  })
}

/**
 * 服务公司 -财务-发票索取详情
 * @param {*} {orderId: '订单id'}
 */
export function payOrderDetail(params) {
  return request({
    url: '/finance/pay/detail',
    method: 'get',
    params
  })
}
