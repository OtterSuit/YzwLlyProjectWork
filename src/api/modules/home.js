import { api } from '../api.js'
// method格式统一用小写
export default {
  //  申领统计
  homeCommonApply(params) {
    return api({ url: '/ssd/v1.0/flow/workorder/commonApply/statictis', params, method: 'get' })
  },
  //  科室申领统计
  homeStatictisCategory(params) {
    return api({ url: '/ssd/v1.0/flow/workorder/commonApply/statictisCategory', params, method: 'get' })
  },
  //  退回统计
  homeReturn(params) {
    return api({ url: '/ssd/v1.0/flow/workorder/return/statictis', params, method: 'get' })
  },
  //  缺损统计
  homeLoseDamage(params) {
    return api({ url: '/ssd/v1.0/flow/workorder/loseDamage/statictis', params, method: 'get' })
  },
  //  实时发放统计（总回收和申请量统计）
  homeRecycleAndCommon(params) {
    return api({ url: '/ssd/v1.0/flow/workorder/recycleAndCommon/statictis', params, method: 'get' })
  },
  //  月度统计
  homeMonth(params) {
    return api({ url: '/ssd/v1.0/flow/workorder/pi/month/statictis', params, method: 'get' })
  }
}
