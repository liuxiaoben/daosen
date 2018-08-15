import request from '@/utils/request'

//获取素材库列表
export function mlibList(token,pageNum,pageSize,name,beginTime) {
  return request({
    url: '/mlib/list/'+pageNum+'/'+pageSize,
    method: 'post',
    params: { token,name,beginTime }
  })
}
//获取素材详情
export function mlibDetail(token,materialId){
	return request({
		url:'/mlib/detail',
		method:'post',
		params:{token,materialId}
	})
}
//添加素材
export function mlibAdd(token,name,url){
	 return request({
	 	 url:'/mlib/add',
	 	 method:'post',
	 	 params:{token,name,url}
	 })
}
//编辑素材
export function mlibEdit(token,name,url,materialId){
   return request({
   	  url:'/mlib/edit',
   	  method:"post",
   	  params:{token,name,url,materialId}
   })

}
//删除素材
export function mlibDel(token,materialId){
   return request({
   	  url:'/mlib/del',
   	  method:"post",
   	  params:{token,materialId}
   })
}




