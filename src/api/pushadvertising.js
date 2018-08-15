import request from '@/utils/request'

//广告投放 - 策略下拉列表
export function listselect (params) {
    return request({
      url: '/strategy/select',
      method: 'get',
      params
    })
}

//获取我的服务公司
export function myBind(pageNum2,pageSize2,params) {
  return request({
    url: '/tenant/myBind/'+ pageNum2 + '/' + pageSize2,
    method: 'get',
    params
  })
}

//广告位信息搜索
export function aquery(pageNum3,pageSize3,params) {
  return request({
    url: '/ad/query/'+ pageNum3 + '/' + pageSize3,
    method: 'post',
    params
  })
}

//获取地图数据 
export function listMapData(params){
  return request({
    url: '/ad/listMapData',
    method: 'post',
    params
  })
}