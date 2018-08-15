import request from '@/utils/request'

//广告投放-订单-详情基本信息
export function orderDetails(params){
    return request({
    	url:'/order/detail',
    	method:'get',
    	params
    })
}

//广告投放-订单-付款信息
export function payInformation(params){
    return request({
    	url:'/order/payInfo',
    	method:'get',
    	params
    })
}

//广告投放-订单-发票信息
export function invInformation(params){
    return request({
    	url:'/order/invoiceInfo',
    	method:'get',
    	params
    })
}

