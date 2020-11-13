import { api } from '../api.js'

export default {
  // 分页查询封包任务
  getPacketTaskPage(params) {
    return api({ url: '/ssd/v1.0/flow/packet/task/s', params, method: 'get' })
  },
  // 根据封包任务id获取该封包任务的所有物资数据
  getPacketDetail(params) {
    return api({ url: `/ssd/v1.0/flow/packet/task/${params.id}/suppliesInfo`, params, method: 'get' })
  },
  // 获取封包任务详情
  getPacketTaskDetail(params) {
    return api({ url: `/ssd/v1.0/flow/packet/task/${params.id}`, params, method: 'get' })
  },
  // 封包任务审核接口
  toPassAudit(params) {
    return api({ url: `/ssd/v1.0/flow/packet/task/${params.id}/audit`, params, method: 'put' })
  },
  // 分页查询封包子任务
  getSubPacketPage(params) {
    return api({ url: '/ssd/v1.0/flow/packet/sub/task/s', params, method: 'get', paramsSerializer: true })
  },
  // 获取封包子任务详情
  getSubPacketDetail(params) {
    return api({ url: `/ssd/v1.0/flow/packet/sub/task/${params.id}`, params, method: 'get' })
  },
  // 打印封包标签。
  toPrintPacketTag(params) {
    return api({ url: '/ssd/v1.0/storage/packet/print/tag', params, method: 'post' })
  },
  // 封包子任务批量验证入库
  tobundleInStorage(params) {
    return api({ url: `/ssd/v1.0/flow/packet/sub/task/${params.subTaskId}/batchStorage`, params, method: 'post', paramsSerializer: true })
  }
}
