import request from '@/utils/request'

/**
 * 帮助中心 -- 搜索
 * @param  {[key: '',type: '4']} searchParams 
 */
export function search(searchParams) {
  return request({
    url: '/help/query',
    method: 'get',
    params: searchParams
  })
}

/**
 * 帮助中心 -- 帮助子分类
 * @param  {[pid: '',type: '4']} params 
 */
export function cateList(params) {
  console.log(params)
  return request({
    url: '/help/cateList',
    method: 'get',
    params: params
  })
}

/**
 * 帮助中心 -- 文档列表
 * @param  {[cateId: '',type: '4']} params 
 */
export function helpList(params) {
  console.log(params)
  return request({
    url: '/help/list',
    method: 'get',
    params: params
  })
}

/**
 * 帮助中心 -- 搜索信息详情
 * @param  {[hid: '']} params 
 */
export function helpDetail(params) {
  console.log(params)
  return request({
    url: '/help/detail',
    method: 'get',
    params: params
  })
}

/**
 * 帮助中心 - 获取四种大分类
 * @param  {type: '4'} params
 */
export function rootList(params) {
  console.log(params)
  return request({
    url: '/help/cate',
    method: 'get',
    params: params
  })
}
