import { api } from '../api.js'
// method格式统一用小写
export default {
  // 新包入库
  newInStorage(params) {
    return api({ url: '/ssd/v1.0/storage/packet/new', params, method: 'post' })
  },
  // 批量入库
  AllInStorage(params) {
    return api({ url: '/ssd/v1.0/storage/packet/batchNewIn', params, method: 'post', paramsSerializer: true })
  },
  // 盘点包入库
  pandianInStorage(params) {
    return api({ url: '/ssd/v1.0/storage/packet/check', params, method: 'post' })
  },
  //  库存详情
  toGetpacketDetail(params) {
    return api({ url: `/ssd/v1.0/storage/packet/${params.id}`, params, method: 'get' })
  },
  // 获取包定义级别的汇总数据
  topacketDefine(params) {
    return api({ url: '/ssd/v1.0/storage/packetDefine/s', params, method: 'get' })
  },
  // 库存查询
  toStoragePage(params) {
    return api({ url: '/ssd/v1.0/storage/s', params, method: 'get' })
  },
  // 驳回申请工单
  toRejectApply(params) {
    return api({ url: `/ssd/v1.0/flow/workorder/commonApply/refuse/${params.id}`, params, method: 'put' })
  },
  // 常规申请发放接口
  toApplyDelivery(params) {
    return api({ url: `/ssd/v1.0/flow/workorder/commonApply/send/${params.id}`, params, method: 'post', paramsSerializer: true })
  },
  // 分页查询仓库出入库记录
  toWarehousePage(params) {
    return api({ url: '/ssd/v1.0/flow/warehouse/log/s', params, method: 'get' })
  },
  // 上架接口
  toPublish(params) {
    return api({ url: '/ssd/v1.0/storage/publish', params, method: 'post', paramsSerializer: true })
  },
  // 下架接口
  toNopublish(params) {
    return api({ url: '/ssd/v1.0/storage/nopublish', params, method: 'post', paramsSerializer: true })
  },
  // 打印封包标签
  toPrintPacket(params) {
    return api({ url: '/ssd/v1.0/storage/packet/print', params, method: 'post' })
  }
}
