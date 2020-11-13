import { api } from '../api.js'

export default {
  // 分页查询装配任务
  getAssembleTaskPage(params) {
    return api({ url: '/ssd/v1.0/flow/assemble/task/s', params, method: 'get' })
  },
  // 清洗质量记录查询
  getAssembleQtInfosPage(params) {
    return api({ url: '/ssd/v1.0/flow/assemble/task/qtInfos', params, method: 'get' })
  },
  // flow/assemble/task
  getAssembleDetail(params) {
    return api({ url: `/ssd/v1.0/flow/assemble/task/${params.id}`, params, method: 'get' })
  },
  // 配置物资丢失维修报废和质检数据
  toSubmitAssemble(params) {
    return api({ url: '/ssd/v1.0/flow/assemble/task/addCleanInfoAndQt', params, method: 'post', ContentType: 'json' })
  },
  getQtRecord(params) {
    return api({ url: `/ssd/v1.0/flow/quality/record/s`, params, method: 'get' })
  }
}
