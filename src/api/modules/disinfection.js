import { api } from '../api.js'

export default {
  // 分页查询清洗消毒任务，并返回任务的字典数据、清洗架名称，清洗程序名称
  getCleanTaskPage(params) {
    return api({ url: '/ssd/v1.0/flow/clean/task/s', params, method: 'get', paramsSerializer: true })
  },
  // 分页查询清洗维修报废记录
  getCleanErrorPage(params) {
    return api({ url: '/ssd/v1.0/flow/clean/error/record/s', params, method: 'get' })
  },
  // 设置清洗任务的清洗设备和清洗程序
  putCleanEquipmentAndProgram(params) {
    return api({ url: `/ssd/v1.0/flow/clean/task/${params.id}/equipmentAndProgram`, params, method: 'put' })
  },
  // 开始清洗消毒任务接口
  getCleanTaskStart(params) {
    return api({ url: `/ssd/v1.0/flow/clean/task/start/${params.id}`, params, method: 'get' })
  },
  // 分页查询清洗子任务
  getCleanTask(params) {
    return api({ url: '/ssd/v1.0/flow/clean/sub/task/s', params, method: 'get', paramsSerializer: true })
  },
  // 获取清洗子任务详情
  getCleanTaskDetail(params) {
    return api({ url: `/ssd/v1.0/flow/clean/sub/task/${params.id}`, params, method: 'get' })
  },
  // 开始清洗子任务接口
  toStartClean(params) {
    return api({ url: '/ssd/v1.0/flow/clean/sub/task/start', params, method: 'post', ContentType: 'json' })
  },
  // 完成清洗子任务的接口
  toEndClean(params) {
    return api({ url: `/ssd/v1.0/flow/clean/sub/task/end/${params.id}`, params, method: 'get' })
  },
  // 批量增加清洗维修报废记录
  toMaintainClean(params) {
    return api({ url: '/ssd/v1.0/flow/clean/error/record', params, method: 'post', ContentType: 'json' })
  },
  // 分页查询清洗任务与包实例关联关系
  toCleanSubPage(params) {
    return api({ url: '/ssd/v1.0/flow/clean/sub/task/rel/s', params, method: 'get' })
  },
  getSubSupplies(params) {
    return api({ url: `/ssd/v1.0/flow/clean/sub/task/rel/supplies/${params.id}`, params, method: 'get' })
  },
  // 获取清洗详情
  getCleanDetailPage(params) {
    return api({ url: `/ssd/v1.0/flow/clean/detail/s`, params, method: 'get' })
  },
  // 获取清洗详情
  getCleanDetail(params) {
    return api({ url: `/ssd/v1.0/flow/clean/detail/${params.id}`, params, method: 'get' })
  },
  // 提交清洗详情
  toCleanDetail(params) {
    return api({ url: '/ssd/v1.0/flow/clean/detail', params, method: 'post', ContentType: 'json' })
  }
}
