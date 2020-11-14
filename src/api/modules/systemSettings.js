import { api } from '../api.js'
// method格式统一用小写
export default {
  // 账号信息-列表
  getAccountSetting(params) {
    return api({ url: '/nursing/v1/accountSetting', params, method: 'get' })
  },
  // 账号信息-新增
  postAccountSetting(params) {
    return api({ url: '/nursing/v1/accountSetting', params, method: 'get' })
  },
  // 账号信息-编辑
  putAccountSetting(params) {
    return api({ url: `/nursing/v1/accountSetting/${params.id}`, params, method: 'put' })
  },
  // 账号信息-删除
  deleteAccountSetting(params) {
    return api({ url: `/nursing/v1/accountSetting/${params.id}`, params, method: 'delete' })
  },
  // 科室管理-列表
  getOrganizes(params) {
    return api({ url: '/auth/v1/organizes', params, method: 'get' })
  },
  // 科室管理-新增
  postOrganizes(params) {
    return api({ url: '/auth/v1/organizes', params, method: 'post' })
  },
  // 科室管理-编辑
  postOrganizesById(params) {
    return api({ url: `/auth/v1/organizes/${params.id}`, params, method: 'post' })
  },
  // 科室管理-删除
  deleteOrganizes(params) {
    return api({ url: `/auth/v1/organizes/${params.id}`, params, method: 'delete' })
  },
  // 岗位管理-列表
  getDutys(params) {
    return api({ url: '/auth/v1/dutys', params, method: 'get' })
  },
  // 岗位管理-新增
  postdutys(params) {
    return api({ url: '/auth/v1/dutys', params, method: 'post' })
  },
  // 岗位管理-编辑
  postdutysById(params) {
    return api({ url: `/auth/v1/dutys/${params.id}`, params, method: 'post' })
  },
  // 岗位管理-删除
  deletedutys(params) {
    return api({ url: `/auth/v1/dutys/${params.id}`, params, method: 'delete' })
  }
}
