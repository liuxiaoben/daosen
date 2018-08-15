import request from '@/utils/request'

//广告投放 - 订单 - 列表
export function orderlist (params,pageNum,pageSize) {
    return request({
      url: '/order/list/'+ pageNum + '/' + pageSize,
      method: 'get',
      params
    })
}

//广告投放 - 订单 - 获取订单状态
export function listOrderStatus (params) {
    return request({
      url: '/dic/listOrderStatus',
      method: 'get',
      params
    })
}

//广告投放 - 订单 - 策略下拉列表
export function listselect (params) {
    return request({
      url: '/strategy/select',
      method: 'get',
      params
    })
}

//获取我的服务公司
export function myBind(pageNum,pageSize,params) {
    return request({
      url: '/tenant/myBind/'+ pageNum + '/' + pageSize,
      method: 'get',
      params
    })
}

//删除广告订单
export function delOrder(params) {
  return request({
    url: '/order/del',
    method: 'get',
    params
  })
}

//广告投放-订单-提交订单
export function subOrders(params) {
  return request({
    url: '/order/submit',
    method: 'post',
    params
  })
}