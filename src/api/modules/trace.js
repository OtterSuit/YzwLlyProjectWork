import { api } from '../api.js'
// method格式统一用小写
export default {
  // 供应室确定回收接口
  /* toConfirmRecycle(params) {
    return api({ url: '/ssd/v1.0/basic/packet/s', params, method: 'post', ContentType: 'json' })
  } */
  toGetTraceList(params) {
    return api({ url: '/ssd/v1.0/flow/packet/trace/packetDefineSum', params, method: 'get' })
  },
  toGetTraceDetail(params) {
    return api({ url: `/ssd/v1.0/flow/packet/trace//packetInstance/${params.defineId}`, params, method: 'get' })
  },
  toGetTrace(params) {
    return api({ url: '/ssd/v1.0/flow/packet/trace/s', params, method: 'get' })
  }
}
