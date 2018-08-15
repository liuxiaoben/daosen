import request from '@/utils/request'

//获取全部消息列表
export function messageList(pageNum,pageSize,token,status) {
	  return request({
		    url: '/msg/list/'+pageNum+'/'+pageSize,
		    method: 'get',
		    params:{token,status}
	  })
}

//批量修改消息状态
export function messageStatusChange(token,mids) {
	  return request({
		    url: '/msg/status',
		    method: 'get',
		    params:{token,mids}
	  })
}

//批量删除消息
export function messageDelete(token,mids) {
	  return request({
		    url: '/msg/del',
		    method: 'get',
		    params:{token,mids}
	  })
}

//获取消息数量
export function messageCount(token) {
	  return request({
		    url: '/msg/count',
		    method: 'get',
		    params:{token}
	  })
}