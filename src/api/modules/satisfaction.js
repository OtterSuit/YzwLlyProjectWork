import { api } from '../api.js'
export default {
  // 问卷调查列表
  getSatisfaction(params) {
    return api({ url: '/nursing/v1/satisfaction', params, method: 'get' })
  },
  // 新建问卷
  postSatisfaction(params) {
    return api({ url: '/nursing/v1/satisfaction', params, method: 'post' })
  },
  // 预览问卷
  getSatisfactionById(params) {
    return api({ url: `/nursing/v1/satisfaction/${params.id}`, params, method: 'get' })
  },
  // 终止调查
  putSatisfactionById(params) {
    return api({ url: `/nursing/v1/satisfaction/${params.id}`, params, method: 'put' })
  },
  // 问卷调查-操作-删除
  deleteSatisfaction(params) {
    return api({ url: `/nursing/v1/satisfaction/${params.id}`, params, method: 'delete' })
  },
  // 提交答卷
  postSatisfactionAnswer(params) {
    return api({ url: '/nursing/v1/satisfaction/answer', params, method: 'post' })
  },
  // 统计分析
  getSatisfactionAnswer(params) {
    return api({ url: `/nursing/v1/satisfaction/analysis/${params.id}`, params, method: 'get' })
  }
}
