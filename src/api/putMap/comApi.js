import request from '@/utils/request'
/* 字典数据 */
// 获取省份
export function getPrivince(token) {
  return request({
    url: '/dic/privince',
    method: 'post',
    params: { token }
  })
}

// 获取城市
export function getCity(data) {
  return request({
    url: '/dic/city',
    method: 'post',
    params: data
  })
}

// 获取区域
export function getDic(data) {
  return request({
    url: '/dic/distinct',
    method: 'post',
    params: data
  })
}

//商圈
export function tradingArea(data) {
  return request({
    url: '/areasCircle/byareaid',
    method: 'get',
    params: data
  })
}


//地标
export function landmark(data) {
  return request({
    url: '/areasLandmark/listByArea',
    method: 'get',
    params: data
  })
}

//第三方行业
export function thirdBusiness(data) {
  return request({
    url: '/thirdIndustry/listByPid',
    method: 'get',
      params: data
  })
}

//行业
export function business(data) {
  return request({
    url: '/industry/listbypid',
    method: 'get',
      params: data
  })
}

//媒体类型
export function getMediaType(data){
  return request({
    url: '/mediumType/listByPid',
    method: 'get',
      params: data
  })
}

  //周边数据
export function aroundData(data) {
  return request({
    url: '/communityMap/getAroundData',
    method: 'post',
    params: data
  })
}

//行业饼图
export function businessData(data){
  return request({
    url: '/communityMap/getThirdDataByR',
    method: 'post',
	  params: data
  })
}

//获取所有媒体数据
export function getMediaTypeList(){
  return request({
      url: '/dic/mediumTypeALL',
      method: 'get'
  })
}

//偏好数据
export function aroundDataByArea(data) {
  return request({
      url: '/communityMap/getListByArea',
      method: 'post',
      params: data
  })
}

//获取用户企业信息
export function userEnterpriseInfo(data) {
  return request({
      url: '/enterprise/info',
      method: 'post',
      params: data
  })
}
