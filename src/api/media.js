import request from '@/utils/request'

//获取媒体展示厅列表
export function mediaShowList(pageNum,pageSize,token,mtypeId) {
	  return request({
		    url: '/mediaRoom/list/'+pageNum+'/'+pageSize,
		    method: 'get',
		    params:{token,mtypeId}
	  })
}

//获取搜索媒体展示厅列表
export function searchMediaShowList(pageNum,pageSize,token,keywords) {
	  return request({
		    url: '/mediaRoom/search/'+pageNum+'/'+pageSize,
		    method: 'get',
		    params:{token,keywords}
	  })
}

//获取媒体类型
export function getType(uid,level) {
	  return request({
		    url: '/favorite/getType',
		    method: 'get',
		    params:{uid,level}
	  })
}

//通过父id获取媒体类型及统计数据
export function getTypeByPid(pid) {
	  return request({
		    url: '/mediaRoom/getTypeByPid',
		    method: 'get',
		    params:{pid}
	  })
}

//媒体简介
export function mediaDetail(mtypeId,token) {
	  return request({
		    url: '/mediaRoom/detail',
		    method: 'get',
		    params:{mtypeId	,token}
	  })
}
//媒体图片
export function mediaImage(mtypeId,token) {
	  return request({
		    url: '/mediaRoom/image',
		    method: 'get',
		    params:{mtypeId,token}
	  })
}
// 媒体属性
export function mediaAttribute(mtypeId,token) {
	  return request({
		    url: '/mediaRoom/attribute',
		    method: 'get',
		    params:{mtypeId,token}
	  })
}

// 媒体收藏
export function mediaCollect(mtypeId,token) {
	  return request({
		    url: '/mediaRoom/addFavorite',
		    method: 'get',
		    params:{mtypeId,token}
	  })
}

// 媒体取消收藏
export function mediaCancelCollect(favId,token) {
	  return request({
		    url: '/favorite/cancel',
		    method: 'post',
		    params:{favId,token}
	  })
}