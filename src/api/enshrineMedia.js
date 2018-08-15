import request from '@/utils/request'
//获取媒体类型分类
export function  getType (uid,level){
	return request({
		 url:'/favorite/getType',
		 method:'post',
		 params:{uid,level}
	})
}
//通过父id获取媒体类型及统计数据
export function getTypeByPid(uid,pid){
    return request({
    	url:'/favorite/getTypeByPid',
    	method:'post',
    	params:{uid,pid}
    })
}
//根据媒体类型id 获取收藏的媒体列表
export function favList(token,uid,pageNum,pageSize,mediaType){
    return request({
    	url:'/favorite/favList/'+pageNum+'/'+pageSize,
    	method:'post',
    	params:{token,uid,mediaType}
    })
}
//按照关键字搜索
export function favSearch(token,uid,pageNum,pageSize,keywords){
     return request({
        url:'/favorite/favList/'+pageNum+'/'+pageSize,
        method:'post',
        params:{token,uid,keywords}
    })
}
//取消媒体
export function cancel(token,favId){
    return request({
        url:'/favorite/cancel',
        method:'post',
        params:{token,favId}
    })
}