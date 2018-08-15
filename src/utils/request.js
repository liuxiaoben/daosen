import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import {search,cateList,helpList,helpDetail,rootList} from '@/api/help'
import { invoiceApplyStatus } from '@/api/financial'

//封装API前缀
// const myapiUrl = 'http://47.97.171.192:8088/'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if(config.url === '/help/cateList' 
    || config.url === '/help/cate' 
    || config.url === '/help/query' 
    || config.url === '/help/list' 
    || config.url === '/help/detail'
    || config.url === '/tenant/applyBind' 
    || config.url === '/dic/listOrderStatus' 
    || config.url === '/purpose/listTree' 
    || config.url === '/mediumType/listByPid' 
    || config.url === '/dic/country' 
    || config.url === '/dic/privince' 
    || config.url === '/dic/city' 
    || config.url === '/dic/distinct'
    || config.url === '/industry/listbypid'
    || config.url === '/thirdIndustry/listByPid' 
    || config.url === '/areasCircle/byareaid' 
    || config.url === '/areasLandmark/listByArea' 
    || config.url === '/mediumType/listByPid'
    || config.url === '/communityMap/getThirdDataByR'
    || config.url === '/communityMap/getAroundData'
    || config.url === '/dic/mediumTypeALL'
    || config.url === '/communityMap/getListByArea'
    || config.url === '/dic/invoiceApplyStatus'
    || config.url === '/dic/orderType'){
    config.baseURL= 'http://47.97.171.192:8090/xd'
    //config.baseURL= 'http://192.168.1.113:8090/xd'
  }
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
    const res = response.data
    if (res.msgCode !== '1000') {
     Message({
       message: res.msg,  //此位置改成msg，会有报错的提示
       type: 'error',
       duration: 5 * 1000
     })
     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
         confirmButtonText: '重新登录',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
         store.dispatch('FedLogOut').then(() => {
           location.reload()


         })
       })
      }
     return Promise.reject('error')
    } else {
      return response.data
      
   }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
