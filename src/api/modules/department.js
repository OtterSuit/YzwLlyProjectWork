import { api } from '../api.js'
// method格式统一用小写
export default {
  // 增加临时申请（购物车）
  carAddstaff(params) {
    return api({ url: '/ssd/v1.0/flow/shop/car', params, method: 'post' })
  },
  //  获取临时申请（购物车）详情
  carGetstaff(params) {
    return api({ url: `/ssd/v1.0/flow/shop/car/${params.id}`, params, method: 'get' })
  },
  // 修改购物车
  carRevisestaff(params) {
    return api({ url: `/ssd/v1.0/flow/shop/car/${params.id}`, params, method: 'put' })
  },
  // 删除临时申请（购物车）
  carDeletestaff(params) {
    return api({ url: `/ssd/v1.0/flow/shop/car/${params.id}`, params, method: 'delete' })
  },
  // 分页查询临时申请
  peoCarPage(params) {
    return api({ url: '/ssd/v1.0/flow/shop/car/s', params, method: 'get' })
  },
  // 常规申请
  toApplyGoods(params) {
    return api({ url: '/ssd/v1.0/flow/workorder/commonApply', params, method: 'post', paramsSerializer: true })
  },
  // 回收申请
  toApplyRecycle(params) {
    return api({ url: '/ssd/v1.0/flow/workorder/recycleApply', params, method: 'post', paramsSerializer: true })
  },
  // 获取工单详情
  toGetWorkorder(params) {
    return api({ url: `/ssd/v1.0/flow/workorder/${params.id}`, method: 'get' })
  },
  // 分页查询工单
  toShowPage(params) {
    return api({ url: '/ssd/v1.0/flow/workorder/s', params, method: 'get', paramsSerializer: true })
  },
  // 签收接口
  toReceiveGoods(params) {
    return api({ url: `/ssd/v1.0/flow/workorder/commonApply/receive/${params.id}`, params, method: 'put', paramsSerializer: true })
  },
  // 退回申请
  toApplyReturn(params) {
    return api({ url: '/ssd/v1.0/flow/workorder/returnApply', params, method: 'post', paramsSerializer: true })
  },
  // 分页查询工单包定义关联
  toShowPacketPage(params) {
    return api({ url: '/ssd/v1.0/flow/workorder/packet/s', params, method: 'get' })
  },
  // 分页查询工单包实例关联
  toShowPiPage(params) {
    return api({ url: '/ssd/v1.0/flow/workorder/pi/s', params, method: 'get', paramsSerializer: true })
  },
  // 分页查询工单物流
  toShowTracePage(params) {
    return api({ url: '/ssd/v1.0/flow/workorder/trace/s', params, method: 'get' })
  },
  // 取消常规申请
  toCancelApply(params) {
    return api({ url: `/ssd/v1.0/flow/workorder/commonApply/cancel/${params.id}`, params, method: 'post' })
  },
  // 科室取消回收申请接口
  toCancelRecycle(params) {
    return api({ url: '/ssd/v1.0/flow/workorder/recycleApplyCancel', params, method: 'post' })
  },
  // 科室取消退回申请接口
  toCancelReturn(params) {
    return api({ url: `/ssd/v1.0/flow/workorder/returnApplyCancel`, params, method: 'post' })
  }
}
