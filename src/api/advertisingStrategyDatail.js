import request from '@/utils/request'

//广告策略 - 策略详情信息
export function strategyDatail (params) {
  return request({
    url: '/strategy/detail',
    method: 'get',
    params
  })
}
