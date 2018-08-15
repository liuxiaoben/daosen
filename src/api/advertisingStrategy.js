import request from '@/utils/request'

//广告投放 - 策略 - 列表
export function policyList (params,pageNum,pageSize) {
    return request({
      url: '/strategy/list/'+ pageNum + '/' + pageSize,
      method: 'post',
      params
    })
}
//广告投放 - 策略 - 删除信息
export function delList (params) {
  return request({
    url: '/strategy/del/',
    method: 'get',
    params
  })
}
//广告投放-策略 -详情
export function details (params) {
  return request ({
    url:'/strategy/detail/',
    method:'get',
    params
  })
}

//广告投放-策略-编辑
export function editor (params) {
  return request ({
    url:'/strategy/edit/',
    method:'post',
    params
  })
}
