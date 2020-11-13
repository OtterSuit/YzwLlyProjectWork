import { api } from '../api.js'
// method格式统一用小写
export default {
  //  增加公司
  toAddcompany(params) {
    return api({ url: '/ssd/v1.0/basic/company', params, method: 'post' })
  },
  //  获取公司的基本信息
  toGetcompany(params) {
    return api({ url: `/ssd/v1.0/basic/company/${params.id}`, params, method: 'get' })
  },
  // 修改公司
  toRevisecompany(params) {
    return api({ url: `/ssd/v1.0/basic/company/${params.id}`, params, method: 'put' })
  },
  // 删除公司
  toDeletecompany(params) {
    return api({ url: `/ssd/v1.0/basic/company/${params.id}`, params, method: 'delete' })
  },
  // 分页查询公司
  toCompanyPage(params) {
    return api({ url: '/ssd/v1.0/basic/company/s', params, method: 'get' })
  },
  //  增加公司合同
  toAddcontract(params) {
    return api({ url: '/ssd/v1.0/basic/contract', params, method: 'post' })
  },
  //  获取公司合同的基本信息
  toGetcontract(params) {
    return api({ url: `/ssd/v1.0/basic/contract/${params.id}`, params, method: 'get' })
  },
  // 修改公司合同
  toRevisecontract(params) {
    return api({ url: `/ssd/v1.0/basic/contract/${params.id}`, params, method: 'put' })
  },
  // 删除公司合同
  toDeletecontract(params) {
    return api({ url: `/ssd/v1.0/basic/contract/${params.id}`, params, method: 'delete' })
  },
  // 分页查询公司合同
  toContractPage(params) {
    return api({ url: '/ssd/v1.0/basic/contract/s', params, method: 'get' })
  },
  //  增加公司许可证
  toAddlicence(params) {
    return api({ url: '/ssd/v1.0/basic/licence', params, method: 'post' })
  },
  //  获取公司许可证的基本信息
  toGetlicence(params) {
    return api({ url: `/ssd/v1.0/basic/licence/${params.id}`, params, method: 'get' })
  },
  // 修改公司许可证
  toReviselicence(params) {
    return api({ url: `/ssd/v1.0/basic/licence/${params.id}`, params, method: 'put' })
  },
  // 删除公司许可证
  toDeletelicence(params) {
    return api({ url: `/ssd/v1.0/basic/licence/${params.id}`, params, method: 'delete' })
  },
  // 分页查询公司许可证
  toLicencePage(params) {
    return api({ url: '/ssd/v1.0/basic/licence/s', params, method: 'get' })
  },
  //  增加常数
  toAddconstant(params) {
    return api({ url: '/ssd/v1.0/basic/constant', params, method: 'post' })
  },
  //  获取常数
  toGetconstant(params) {
    return api({ url: `/ssd/v1.0/basic/constant/${params.id}`, params, method: 'get' })
  },
  // 修改常数
  toReviseconstant(params) {
    return api({ url: `/ssd/v1.0/basic/constant/${params.id}`, params, method: 'put' })
  },
  // 删除常数
  toDeleteconstant(params) {
    return api({ url: `/ssd/v1.0/basic/constant/${params.id}`, params, method: 'delete' })
  },
  // 分页查询常数
  toconstantPage(params) {
    return api({ url: '/ssd/v1.0/basic/constant/s', params, method: 'get' })
  },
  //  增加常数分类
  toAddconstanttype(params) {
    return api({ url: '/ssd/v1.0/basic/constant/type', params, method: 'post' })
  },
  //  获取常数分类
  toGetconstanttype(params) {
    return api({ url: `/ssd/v1.0/basic/constant/type/${params.id}`, params, method: 'get' })
  },
  // 修改常数分类
  toReviseconstanttype(params) {
    return api({ url: `/ssd/v1.0/basic/constant/type/${params.id}`, params, method: 'put' })
  },
  // 删除常数分类
  toDeleteconstanttype(params) {
    return api({ url: `/ssd/v1.0/basic/constant/type/${params.id}`, params, method: 'delete' })
  },
  // 批量获取常数分类详情，包含该类别下的所有字典数据
  toconstanttypeBatch(params) {
    return api({ url: '/ssd/v1.0/basic/constant/type/batch', params, method: 'get', paramsSerializer: true })
  },
  // 分页查询常数分类
  toconstanttypePage(params) {
    return api({ url: '/ssd/v1.0/basic/constant/type/s', params, method: 'get' })
  },
  //  增加消毒包明细
  toAddpacketdetail(params) {
    return api({ url: '/ssd/v1.0/basic/packet/detail', params, method: 'post' })
  },
  //  获取消毒包明细
  toGetpacketdetail(params) {
    return api({ url: `/ssd/v1.0/basic/packet/detail/${params.id}`, params, method: 'get' })
  },
  // 修改消毒包明细
  toRevisepacketdetail(params) {
    return api({ url: `/ssd/v1.0/basic/packet/detail/${params.id}`, params, method: 'put' })
  },
  // 删除消毒包明细
  toDeletepacketdetail(params) {
    return api({ url: `/ssd/v1.0/basic/packet/detail/${params.id}`, params, method: 'delete' })
  },
  // 批量添加消毒包明细（可一次性添加整个包明细记录），返回记录ID组
  toAddpacketBatch(params) {
    return api({ url: '/ssd/v1.0/basic/packet/detail/batch', params, method: 'post', ContentType: 'json' })
  },
  // 分页查询消毒包明细
  toconpacketdetailPage(params) {
    return api({ url: '/ssd/v1.0/basic/packet/detail/s', params, method: 'get' })
  },
  //  增加物资
  toAddsuppliesl(params) {
    return api({ url: '/ssd/v1.0/basic/supplies', params, method: 'post' })
  },
  //  获取物资
  toGetsupplies(params) {
    return api({ url: `/ssd/v1.0/basic/supplies/${params.id}`, params, method: 'get' })
  },
  // 修改物资
  toRevisupplies(params) {
    return api({ url: `/ssd/v1.0/basic/supplies/${params.id}`, params, method: 'put' })
  },
  // 删除物资
  toDeletesupplies(params) {
    return api({ url: `/ssd/v1.0/basic/supplies/${params.id}`, params, method: 'delete' })
  },
  // 分页查询物资
  toconsuppliesPage(params) {
    return api({ url: '/ssd/v1.0/basic/supplies/s', params, method: 'get' })
  },
  //  增加物资分类
  toAddsuppliesltype(params) {
    return api({ url: '/ssd/v1.0/basic/supplies/type', params, method: 'post' })
  },
  //  获取物资分类
  toGetsuppliestype(params) {
    return api({ url: `/ssd/v1.0/basic/supplies/type/${params.id}`, params, method: 'get' })
  },
  // 修改物资分类
  toRevisuppliestype(params) {
    return api({ url: `/ssd/v1.0/basic/supplies/type/${params.id}`, params, method: 'put' })
  },
  // 删除物资分类
  toDeletesuppliestype(params) {
    return api({ url: `/ssd/v1.0/basic/supplies/type/${params.id}`, params, method: 'delete' })
  },
  // 分页查询物资分类
  toconsuppliestypePage(params) {
    return api({ url: '/ssd/v1.0/basic/supplies/type/s', params, method: 'get' })
  },
  // 查询所有的物资分类，并返回树结构
  toconsuppliestree(params) {
    return api({ url: '/ssd/v1.0/basic/supplies/type/treeInfos', params, method: 'get' })
  },
  // 按名称查询物资分类，并返回树结构
  toconsuppliestreeName(params) {
    return api({ url: `/ssd/v1.0/basic/supplies/type/treeInfos/${params.name}`, params, method: 'get' })
  },
  //  增加包属性
  toAddpackett(params) {
    return api({ url: '/ssd/v1.0/basic/packet', params, method: 'post' })
  },
  //  获取包属性
  toGetpacket(params) {
    return api({ url: `/ssd/v1.0/basic/packet/${params.id}`, params, method: 'get' })
  },
  // 修改包属性
  toRevisepacket(params) {
    return api({ url: `/ssd/v1.0/basic/packet/${params.id}`, params, method: 'put' })
  },
  // 删除包属性
  toDeletepacket(params) {
    return api({ url: `/ssd/v1.0/basic/packet/${params.id}`, params, method: 'delete' })
  },
  // 分页查询包属性
  topacketPage(params) {
    return api({ url: '/ssd/v1.0/basic/packet/s', params, method: 'get' })
  },
  // 获取某个字典类型的所有字典数据
  toGetdict(params) {
    return api({ url: `/ssd/v1.0/basic/dict/${params.defineCode}`, params, method: 'delete' })
  },
  // 获取多个字典类型的所有字典数据
  todictPage(params) {
    return api({ url: '/ssd/v1.0/basic/dict/s', params, method: 'get' })
  }
}
