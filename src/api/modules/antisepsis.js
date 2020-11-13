import { api } from '../api.js'

export default {
  // 分页查询灭菌任务
  getLoadingPage(params) {
    return api({ url: '/ssd/v1.0/flow/sterilize/task/s', params, method: 'get', paramsSerializer: true })
  },
  // 获取灭菌任务详情
  getLoadingDetail(params) {
    return api({ url: `/ssd/v1.0/flow/sterilize/task/${params.id}`, params, method: 'get' })
  },
  // 灭菌包标签打印
  toPrintTag(params) {
    return api({ url: '/ssd/v1.0/flow/sterilize/batch/print', params, method: 'post' })
  },
  // 分页查询灭菌批次
  toShowAntisepsis(params) {
    return api({ url: '/ssd/v1.0/flow/sterilize/batch/s', params, method: 'get', paramsSerializer: true })
  },
  // 灭菌装载，选择灭菌设备，扫描包，进行装载
  toLoadingBox(params) {
    return api({ url: `/ssd/v1.0/flow/sterilize/batch/box/${params.boxId}`, params, method: 'post', paramsSerializer: true })
  },
  // 分页查询灭菌批次与包实例关联关系表
  toLoadingPacket(params) {
    return api({ url: '/ssd/v1.0/flow/sterilize/batch/instance/s', params, method: 'get' })
  },
  toDefinedLoadingPacket(params) {
    return api({ url: `/ssd/v1.0/flow/sterilize/batch/instance/statistics/${params.id}`, method: 'get' })
  },
  // 开始灭菌批次
  toStartAnti(params) {
    return api({ url: `/ssd/v1.0/flow/sterilize/batch/start/${params.id}`, params, method: 'get' })
  },
  // 结束灭菌批次
  toEndAnti(params) {
    return api({ url: `/ssd/v1.0/flow/sterilize/batch/end/${params.id}`, params, method: 'get' })
  },
  // 获取灭菌批次详情
  getQualityDetail(params) {
    return api({ url: `/ssd/v1.0/flow/sterilize/batch/${params.id}`, params, method: 'get' })
  },
  // 获取灭菌批次质量记录详情
  getQtDetail(params) {
    return api({ url: `/ssd/v1.0/flow/sterilize/batch/qt/${params.id}`, params, method: 'get' })
  },
  // 获取质量检测的图片信息
  getPdaImage(params) {
    return api({ url: `/ssd/v1.0/flow/sterilize/batch/qt/getImgeInfo/${params.id}`, params, method: 'get' })
  },
  // 增加灭菌批次质量记录
  toQtRecord(params) {
    return api({ url: '/ssd/v1.0/flow/sterilize/batch/qt', params, method: 'post' })
  }
}
