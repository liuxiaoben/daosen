import request from '@/utils/request'

//获取操作日志列表
export function systemLogList(pageNum,pageSize,token,objName,uname,startTime,endTime) {
	  return request({
		    url: '/log/list/'+pageNum+'/'+pageSize,
		    method: 'get',
		    params:{token,objName,uname,startTime,endTime}
	  })
}


