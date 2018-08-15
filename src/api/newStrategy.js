import request from '@/utils/request'

//目的选项
export function listTree () {
    return request({
      url: '/purpose/listTree',
      method: 'get',
    })
}

//智能组合接口
export function findAll () {
    return request({
      url: '/purposeGroup/findAll',
      method: 'get',
    })
}

//广告投放 - 策略 - 新增
export function newStrategy (params) {
    return request({
      url: '/strategy/add/',
      method: 'post',
      params
    })
}