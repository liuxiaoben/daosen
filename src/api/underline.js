import request from '@/utils/request'

//媒体类型-根据pid获取媒体类型
export function listByPid(params) {
  return request({
    url: '/mediumType/listByPid',
    method: 'get',
    params
  })
}

export function country(params) {
  return request({
    url: '/dic/country',
    method: 'post',
    params
  })
}

export function privince(params) {
  return request({
    url: '/dic/privince',
    method: 'post',
    params
  })
}

export function city(params) {
  return request({
    url: '/dic/city',
    method: 'post',
    params
  })
}

export function distinct(params) {
  return request({
    url: '/dic/distinct',
    method: 'post',
    params
  })
}

