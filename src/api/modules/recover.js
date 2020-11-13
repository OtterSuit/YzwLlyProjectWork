import { api } from '../api.js'
// method格式统一用小写
export default {
  // 供应室确定回收接口
  toConfirmRecycle(params) {
    return api({ url: '/ssd/v1.0/flow/workorder/recycleApply/confirm', params, method: 'post', ContentType: 'json' })
  },
  // 供应室确定回收接口
  toConfirmReturn(params) {
    return api({ url: '/ssd/v1.0/flow/workorder/returnApply/confirm', params, method: 'post', ContentType: 'json' })
  },
  // 分页查询包明细实例
  toInstanceDetail(params) {
    return api({ url: '/ssd/v1.0/flow/packet/detail/instance/s', params, method: 'get' })
  },
  // 分页查询包实例明细
  toInstancePacket(params) {
    return api({ url: '/ssd/v1.0/flow/packet/instance/s', params, method: 'get' })
  },
  // 获取包实例详情
  getInstanceById(params) {
    return api({ url: `/ssd/v1.0/flow/packet/instance/${params.id}`, params, method: 'get' })
  },
  // 修改包明细实例详情
  toReviseInstance(params) {
    return api({ url: `/ssd/v1.0/flow/packet/detail/instance/edit`, params, method: 'post', ContentType: 'json' })
  }
}
