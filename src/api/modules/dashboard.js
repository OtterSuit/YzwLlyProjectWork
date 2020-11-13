import { api } from '../api.js'

export default {
  // 分页查询封包任务
  getPageSsd(params) {
    return api({ url: '/ssd/v1.0/flow/welcome/page/ssd/s', params, method: 'get' })
  },
  getPageSss(params) {
    return api({ url: '/ssd/v1.0/flow/welcome/page/sss/s', params, method: 'get' })
  }
}
