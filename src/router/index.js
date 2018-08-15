import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/indexLayout/Layout'
import setSystem from '../views/set/index'     // 设置侧边栏
import enterpriseSide from '../views/enterprise/index'  // 企业中心侧边栏
import favoriteSide from '../views/favorite/index'      // 我的收藏夹侧边栏
import financial from '../views/financial/index'        // 财务管理侧边栏
import help from '../views/help/index'      // 帮助中心公用

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  //登录
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  //注册新账号
  { path: '/register', component: () => import('@/views/register/index'), hidden: true },
  //忘记密码
  { path: '/getPassword', component: () => import('@/views/getPassword/index'), hidden: true },
  //广告主注册
  { path: '/Adegister', component: () => import('@/views/register/Adegister/index'), hidden: true },
  //推荐注册
  { path: '/Recomgister', component: () => import('@/views/register/Recomgister/index'), hidden: true },
  //媒体展示厅
  { path: '/media', component: () => import('@/views/media/index'), hidden: true },
  //媒体展示详情
  { path: '/media/mediaDetail/:id', name: '/media/mediaDetail/', component: () => import('@/views/media/mediaDetail'), hidden: true },
  //404页面
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: 'index',
    hidden: true,
    children: [{
      path: 'index',
      component: () => import('@/views/index/index')
    },
    {
      //广告订单
      path: 'order',
      name: 'order',
      component: () => import('@/views/order/index'),
      meta: { title: 'Order', icon: 'order' }
    },
    {
      //投放广告
      path: 'pushadvertising',
      name: 'Pushadvertising',
      component: () => import('@/views/pushadvertising/index'),
      meta: { title: 'Pushadvertising', icon: 'pushadvertising'}
    },
    {
      //生成订单
      path: 'generatingorder',
      name: 'generatingorder',
      component: () => import('@/views/generatingorder/index'),
      meta: { title: 'generatingorder', icon: 'generatingorder'}
    },
    {
      //广告订单详情
      path: 'orderDetails',
      name: 'orderDetails',
      component: () => import('@/views/order/orderDetails/orderDetails'),
      meta: { title: 'OrderDetails', icon: 'orderDetails' }
    },
    {
      //广告订单详情
      path: 'editOrder',
      name: 'editOrder',
      component: () => import('@/views/order/editOrder/index'),
      meta: { title: 'editOrder', icon: 'editOrder' }
    },
    {
      //广告策略
      path: 'advertisingStrategy',
      name: 'AdvertisingStrategy',
      component: () => import('@/views/advertisingStrategy/index'),
      meta: { title: 'AdvertisingStrategy', icon: 'advertisingStrategy' }
    },

    {
      //新增广告策略
      path: 'newStrategy',
      name: 'NewStrategy',
      component: () => import('@/views/advertisingStrategy/newStrategy'),
      meta: { title: 'NewStrategy', icon: 'newStrategy' }
    },
    {
      path:"editorStrategyDatail",
      name:"editorStrategyDatail",
      component: () => import('@/views/advertisingStrategy/editorStrategyDatail'),
      meta: { title: 'EditorStrategyDatail', icon: 'editorStrategyDatail' }
    },

    {
      //广告策略详情
      path: 'advertisingStrategyDatail/',
      name: 'AdvertisingStrategyDatail',
      component: () => import('@/views/advertisingStrategy/advertisingStrategyDatail'),
      meta: { title: 'AdvertisingStrategyDatail', icon: 'advertisingStrategyDatail' }
    },

    {
      //广告效果
      path: 'advertising',
      name: 'Advertising',
      component: () => import('@/views/advertising/index'),
      meta: { title: 'Advertising', icon: 'advertising' }
    },
    {
      //运营统计
      path: 'operating',
      name: 'Operating',
      component: () => import('@/views/operating/index'),
      meta: { title: 'Operating', icon: 'operating' }
    },
    {
      //服务公司
      path: 'server',
      name: 'Server',
      component: () => import('@/views/server/index'),
      meta: { title: 'Server', icon: 'server' }
    },
    {
      //服务公司详情
      path: 'server/serverDetail/:tenantId',
      name: 'ServerDetail',
      component: () => import('@/views/server/serverDetail'),
      meta: { title: 'ServerDetail', icon: 'serverDetail' }
    },
    // {
    //   //媒体展示厅
    //   path: 'media',
    //   name: 'Media',
    //   component: () => import('@/views/media/index'),
    //   meta: { title: 'Media', icon: 'media' }
    // },
    // {
    //   //媒体展示详情
    //   path: 'media/mediaDetail/:id',
    //   name: 'MediaDetail',
    //   component: () => import('@/views/media/mediaDetail'),
    //   meta: { title: 'MediaDetail', icon: 'mediaDetail' }
    // },

    //企业信息
    {
      //企业信息
      path: 'enterprise',
      redirect: '/enterprise/info',
      component: enterpriseSide,
      children: [{
        //企业信息
        path: '/enterprise/info',
        name: 'Info',
        component: () => import('@/views/enterprise/enterpriseInfo/info'),
        meta: { title: 'Info', icon: 'info' }
      },
      {
        //点击认证
        path: '/enterprise/clickCertification',
        name: 'clickCertification',
        component: () => import('@/views/enterprise/enterpriseInfo/clickCertification'),
        meta: { title: 'clickCertification', icon: 'clickCertification' },
        children:[
          {
            //企业认证
            path: '/enterprise/enCertification',
            name: 'EnCertification',
            component: () => import('@/views/enterprise/enterpriseInfo/enCertification'),
            meta: { title: 'EnCertification', icon: 'enCertification' }
          },
          {
            //个人认证
            path: '/enterprise/perCertification',
            name: 'PerCertification',
            component: () => import('@/views/enterprise/enterpriseInfo/perCertification'),
            meta: { title: 'PerCertification', icon: 'perCertification' }
          },
        ]
      },




      {
        //认证状态
        path: '/enterprise/certificationState',
        name: 'certificationState',
        component: () => import('@/views/enterprise/enterpriseInfo/certificationState'),
        meta: { title: 'certificationState', icon: 'certificationState' }
      },
      {
        // 基本资料
        path: '/enterprise/data',
        name: 'Data',
        component: () => import('@/views/enterprise/basicInfo/data'),
        meta: { title: 'Data', icon: 'data' }
      },
      {
        // 修改手机号
        path: '/enterprise/amendMobile',
        name: 'AmendMobile',
        component: () => import('@/views/enterprise/basicInfo/amendMobile'),
        meta: { title: 'AmendMobile', icon: 'amendMobile' }
      },
      {
        // 密码修改
        path: '/enterprise/amendPassword',
        name: 'AmendPassword',
        component: () => import('@/views/enterprise/amendPassword'),
        meta: { title: 'AmendPassword', icon: 'amendPassword' }
      },
      {
        // 子账号管理
        path: '/enterprise/childAccount',
        name: 'ChildAccount',
        component: () => import('@/views/enterprise/account/childAccount'),
        meta: { title: 'ChildAccount', icon: 'childAccount' }
      },
      {
        // 子账号详情
        path: '/enterprise/accountDetail',
        name: 'AccountDetail',
        component: () => import('@/views/enterprise/account/accountDetail'),
        meta: { title: 'AccountDetail', icon: 'accountDetail' }
      },
      {
        // 子账号添加
        path: '/enterprise/addAccount',
        name: 'AddAccount',
        component: () => import('@/views/enterprise/account/addAccount'),
        meta: { title: 'AddAccount', icon: 'addAccount' }
      },
      {
        // 子账号修改
        path: '/enterprise/editAccount',
        name: 'EditAccount',
        component: () => import('@/views/enterprise/account/editAccount'),
        meta: { title: 'EditAccount', icon: 'editAccount' }
      },
      // {
      //   // 素材管理
      //   path: '/enterprise/material',
      //   name: 'Material',
      //   component: () => import('@/views/enterprise/material/material'),
      //   meta: { title: 'Material', icon: 'material' }
      // },
      // {
      //   // 素材详情
      //   path: '/enterprise/materialDetail/:materialID',
      //   name: 'MaterialDetail',
      //   component: () => import('@/views/enterprise/material/materialDetail'),
      //   meta: { title: 'MaterialDetail', icon: 'materialDetail' }
      // },
      // {
      //   // 素材添加
      //   path: '/enterprise/addMaterial',
      //   name: 'AddMaterial',
      //   component: () => import('@/views/enterprise/material/addMaterial'),
      //   meta: { title: 'AddMaterial', icon: 'addMaterial' }
      // },
      // {
      //   // 素材编辑
      //   path: '/enterprise/editMaterial/:materialID',
      //   name: 'editMaterial',
      //   component: () => import('@/views/enterprise/material/editMaterial'),
      //   meta: { title: 'editMaterial', icon: 'editMaterial' }
      // },
      // {
      //   // 收藏媒体
      //   path: '/enterprise/enshrineMedia',
      //   name: 'EnshrineMedia',
      //   component: () => import('@/views/enterprise/enshrineMedia'),
      //   meta: { title: 'EnshrineMedia', icon: 'enshrineMedia' }
      // }
    ]
    },

    {
        //  我的收藏夹（素材库  媒体库）
        path: '/favorite',
        redirect: '/favorite/material',
        component: favoriteSide,
        children: [
            {
              // 素材管理
              path: '/favorite/material',
              name: 'Material',
              component: () => import('@/views/favorite/material/material'),
              meta: { title: 'Material', icon: 'material' }
            },
            {
              // 素材详情
              path: '/favorite/materialDetail/:materialID',
              name: 'MaterialDetail',
              component: () => import('@/views/favorite/material/materialDetail'),
              meta: { title: 'MaterialDetail', icon: 'materialDetail' }
            },
            {
              // 素材添加
              path: '/favorite/addMaterial',
              name: 'AddMaterial',
              component: () => import('@/views/favorite/material/addMaterial'),
              meta: { title: 'AddMaterial', icon: 'addMaterial' }
            },
            {
              // 素材编辑
              path: '/favorite/editMaterial/:materialID',
              name: 'editMaterial',
              component: () => import('@/views/favorite/material/editMaterial'),
              meta: { title: 'editMaterial', icon: 'editMaterial' }
            },
            {
              // 收藏媒体
              path: '/favorite/enshrineMedia',
              name: 'EnshrineMedia',
              component: () => import('@/views/favorite/enshrineMedia'),
              meta: { title: 'EnshrineMedia', icon: 'enshrineMedia' }
            }
        ]
    },

    {
      //财务管理
      path: 'financial',
      redirect: '/financial/record',
      component: financial,
      children: [{
        // 交易记录
        path: '/financial/record',
        name: 'Record',
        component: () => import('@/views/financial/transactionRecords/record'),
        meta: { title: 'Record', icon: 'record' }
      },
      {
        // 交易记录详情
        path: '/financial/tradingDetail',
        name: 'TradingDetail',
        component: () => import('@/views/financial/transactionRecords/tradingDetail'),
        meta: { title: 'TradingDetail', icon: 'tradingDetail' }
      },
      {
        // 应付款
        path: '/financial/shouldPay',
        name: 'ShouldPay',
        component: () => import('@/views/financial/pay/shouldPay'),
        meta: { title: 'ShouldPay', icon: 'shouldPay' }
      },
      {
        // 应付款详情
        path: '/financial/paymentDetail',
        name: 'PaymentDetail',
        component: () => import('@/views/financial/pay/paymentDetail'),
        meta: { title: 'PaymentDetail', icon: 'paymentDetail' }
      },
      {
        // 发票管理
        path: '/invoice',
        name: 'Invoice',
        component: () => import('@/views/financial/invoice/index'),
        meta: { title: 'Invoice', icon: 'invoice' }
      },
      {
        // 申请开票
        path: '/invoice/invoiceFor',
        name: 'InvoiceFor',
        component: () => import('@/views/financial/invoice/invoiceFor'),
        meta: { title: 'InvoiceFor', icon: 'invoiceFor' }
      },
      {
        // 发票详情
        path: '/invoice/invoiceAskDetail',
        name: 'InvoiceAskDetail',
        component: () => import('@/views/financial/invoice/invoiceAskDetail'),
        meta: { title: 'InvoiceASkDetail', icon: 'invoiceAskDetail' }
      },
      {
        // 发票详情
        path: '/invoice/invoiceDetail/:templetId',
        name: 'InvoiceDetail',
        component: () => import('@/views/financial/invoice/invoiceDetail'),
        meta: { title: 'InvoiceDetail', icon: 'invoiceDetail' }
      },
      {
        // 新增发票
        path: '/invoice/addInvoice',
        name: 'AddInvoice',
        component: () => import('@/views/financial/invoice/addInvoice'),
        meta: { title: 'AddInvoice', icon: 'addInvoice' }
      },
      {
        // 编辑发票
        path: '/invoice/editInvoice/:templetId',
        name: 'EditInvoice',
        component: () => import('@/views/financial/invoice/editInvoice'),
        meta: { title: 'EditInvoice', icon: 'editInvoice' }
      },
      {
        // 新增地址
        path: '/invoice/addAddress',
        name: 'AddAddress',
        component: () => import('@/views/financial/invoice/addAddress'),
        meta: { title: 'AddAddress', icon: 'addAddress' }
      },
      {
        // 地址详情
        path: '/invoice/addressDetail/:addressId',
        name: 'AddressDetail',
        component: () => import('@/views/financial/invoice/addressDetail'),
        meta: { title: 'AddressDetail', icon: 'addressDetail' }
      },
      {
        // 地址编辑
        path: '/invoice/addressEdit/:addressId',
        name: 'AddressEdit',
        component: () => import('@/views/financial/invoice/addressEdit'),
        meta: { title: 'AddressEdit', icon: 'addressEdit' }
      },
      {
        // 优惠券
        path: '/coupons',
        name: 'Coupons',
        component: () => import('@/views/financial/coupons/index'),
        meta: { title: 'Coupons', icon: 'coupons' }
      },
      {
        // 优惠券详情
        path: '/coupons/couponsDetail',
        name: 'CouponsDetail',
        component: () => import('@/views/financial/coupons/couponsDetail'),
        meta: { title: 'CouponsDetail', icon: 'couponsDetail' }
      }]
    },
    {
      // 帮助中心
      path: 'help',
      redirect: '/help/helpGuide',
      component: help,
      children: [{
        // 帮助中心-流程指南
        path: '/help/helpGuide',
        name: 'HelpGuide',
        component: () => import('@/views/help/helpGuide'),
        meta: { title: 'HelpGuide', icon: 'helpGuide' }
      },
      {
        // 帮助中心-常见问题
        path: '/help/helpProblem',
        name: 'HelpProblem',
        component: () => import('@/views/help/helpProblem'),
        meta: { title: 'HelpProblem', icon: 'helpProblem' }
      },
      {
        // 帮助中心-联系晓道
        path: '/help/helpContact',
        name: 'HelpContact',
        component: () => import('@/views/help/helpContact'),
        meta: { title: 'HelpContact', icon: 'helpContact' }
      },
      {
        // 帮助中心-其他
        path: '/help/helpOther',
        name: 'HelpOther',
        component: () => import('@/views/help/helpOther'),
        meta: { title: 'HelpOther', icon: 'helpOther' }
      },
      {
        // 帮助中心-搜索结果
        path: '/help/helpResult',
        name: 'HelpResult',
        component: () => import('@/views/help/helpResult'),
        meta: { title: 'HelpResult', icon: 'helpResult' }
      }]
    },
    {
      //系统设置
      path: 'set',
      redirect: '/set/system',
      component: setSystem,
      children: [{
        path: '/set/system',
        name: 'System',
        component: () => import('@/views/set/system'),
        meta: { title: 'System', icon: 'system' }
      },
      {
        path: '/set/operationlog',
        name: 'Operationlog',
        component: () => import('@/views/set/operationlog'),
        meta: { title: 'Media', icon: 'media' }
      }]
    },
    {
      //消息中心
      path: 'message',
      redirect: '/message/list',
      component: () => import('@/views/message/siderBar'),
      children: [{
        path: '/message/list',
        name: 'List',
        component: () => import('@/views/message/list'),
        meta: { title: 'List', icon: 'list' }
      },
      {
        //已读消息
        path: '/message/read',
        name: 'Read',
        component: () => import('@/views/message/read'),
        meta: { title: 'Read', icon: 'read' }
      },
      {
        //未读消息
        path: '/message/unread',
        name: 'Unread',
        component: () => import('@/views/message/unread'),
        meta: { title: 'Unread', icon: 'unread' }
      }]
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

