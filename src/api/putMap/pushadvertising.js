import request from '@/utils/request'

//条件筛选
export function filterQuery(data) {
  return request({
    url: '/ad/listMapData',
    method: 'post',
    params: data
  })
}

//第三方数据搜索
export function thirdDataQuery(data) {
  return request({
    url: '/ad/listMapThirdData',
    method: 'post',
    params: data
  })
}

//广告投放 - 策略下拉列表
export function strategyList(params) {
  return request({
    url: '/strategy/select',
    method: 'get',
    params
  })
}

//获取我的服务公司
export function myServerComy(pageNum, pageSize, params) {
  return request({
    url: '/tenant/myBind/' + pageNum + '/' + pageSize,
    method: 'get',
    params
  })
}

//提交购物
export function addShopCart(params) {
  return request({
    url: '/order/add',
    method: 'post',
    params
  })
}

//修改
export function editShopCart(params) {
  return request({
    url: '/order/edit',
    method: 'post',
    params
  })
}

//获取订单类型
export function getOrderType(){
  return request({
      url: '/dic/orderType',
      method: 'get'
  })
}

export function orderData(params){
  return request({
      url: '/order/getEchoData',
      method: 'get',
      params
  })
}

