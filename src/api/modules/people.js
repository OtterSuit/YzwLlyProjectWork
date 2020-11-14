import { api } from '../api.js'
// method格式统一用小写
export default {
  // 查看个人档案
  getArchives(params) {
    return api({ url: `/nursing/v1/personArchives/${params.id}`, params, method: 'get' })
  },
  // 新增个人档案
  putArchives(params) {
    return api({ url: '/nursing/v1/personArchives', params, method: 'put' })
  },
  // 修改个人档案
  postArchives(params) {
    return api({ url: '/nursing/v1/personArchives', params, method: 'post' })
  },
  // 删除个人档案
  deleteArchives(params) {
    return api({ url: `/nursing/v1/personArchives?infoType=${params.infoType}&userId=${params.userId}&id=${params.id}`, params, method: 'delete' })
  },
  // 获取档案管理列表
  getArchivesManage(params) {
    return api({ url: '/nursing/v1/archives', params, method: 'get' })
  },
  // 操作档案管理
  putArchivesManage(params) {
    return api({ url: `/nursing/v1/archives?id=${params.id}&operation=${params.operation}`, params, method: 'put', ContentType: 'json' })
  },
  // 新增岗位变动信息
  addPostChange(params) {
    return api({ url: '/nursing/v1/personPostChanges', params, method: 'post' })
  },
  // 编辑岗位变动信息
  editPostChange(params) {
    return api({ url: `/nursing/v1/personPostChanges/${params.id}`, params, method: 'put' })
  },
  // 删除岗位变动信息
  delPostChange(params) {
    return api({ url: `/nursing/v1/personPostChanges/${params.id}`, params, method: 'delete' })
  },
  // 获取岗位变动信息
  getPostChange(params) {
    return api({ url: '/nursing/v1/personPostChanges', params, method: 'get' })
  },
  // 新增护士证书
  addProfessional(params) {
    return api({ url: '/nursing/v1/professionalSkills', params, method: 'post' })
  },
  // 编辑护士证书
  editProfessional(params) {
    return api({ url: `/nursing/v1/professionalSkills/${params.id}`, params, method: 'put' })
  },
  // 删除护士证书
  delProfessional(params) {
    return api({ url: `/nursing/v1/professionalSkills/${params.id}`, params, method: 'delete' })
  },
  // 获取护士证书
  getProfessional(params) {
    return api({ url: '/nursing/v1/professionalSkills', params, method: 'get' })
  },
  // 最高学历分析/年龄结构分析/职称分析/层级结构分析/男女比例/离职率/岗位分布-查询。
  getPersonHierarchy(params) {
    return api({ url: '/nursing/v1/personHierarchy', params, method: 'get' })
  },
  /* 绩效管理-绩效考核 */
  // 分页查询
  getPerformanceAppraisals(params) {
    return api({ url: '/nursing/v1/performanceAppraisals', params, method: 'get' })
  },
  // 考核-提交考核
  postPerformanceAppraisals(params) {
    return api({ url: '/nursing/v1/performanceAppraisals', params, method: 'post' })
  },
  // 查看
  getPerformanceAppraisalsById(params) {
    return api({ url: `/nursing/v1/performanceAppraisals/${params.id}`, params, method: 'get' })
  },
  /* 绩效管理-奖励记录 */
  // 查
  getPersonAwards(params) {
    return api({ url: `/nursing/v1/personAwards`, params, method: 'get' })
  },
  // 增
  postPersonAwards(params) {
    return api({ url: `/nursing/v1/personAwards`, params, method: 'post' })
  },
  // 改
  putPersonAwards(params) {
    return api({ url: `/nursing/v1/personAwards/${params.id}`, params, method: 'put' })
  },
  // 删
  deletePersonAwards(params) {
    return api({ url: `/nursing/v1/personAwards/${params.id}`, params, method: 'delete' })
  }
}
