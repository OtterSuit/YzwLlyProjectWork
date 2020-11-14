import { api } from '../api.js'
import APIconfig from '../APIconfig'
// method格式统一用小写
export default {
  /* 题库管理 */
  // 查看题库列表
  getQuestionBanks(params) {
    return api({ url: '/nursing/v1/questionBanks', params, method: 'get' })
  },
  // 新增题库
  postQuestionBanks(params) {
    return api({ url: '/nursing/v1/questionBanks', params, method: 'post' })
  },
  // 修改题库名称
  putQuestionName(params) {
    return api({ url: `/nursing/v1/questionBanks/${params.id}/rename?name=${params.name}`, params, method: 'put' })
  },
  // 添加试题
  postQuestionDetails(params) {
    return api({ url: `/nursing/v1/questionBanks/${params.id}/details`, params, method: 'post' })
  },
  // 查看试题详情
  getQuestionDetails(params) {
    return api({ url: `/nursing/v1/questionBanks/${params.id}/details`, params, method: 'get' })
  },
  // 修改试题信息
  putQuestionDetails(params) {
    return api({ url: `/nursing/v1/questionBanks/details/${params.id}`, params, method: 'put' })
  },
  // 上传试题
  postImportQuestionBanks(id) {
    return `${APIconfig.otherUrl}/nursing/v1/questionBanks/${id}/details/import`
  },
  /* 继续教育 */
  // 分页查询继续教育
  getEducationContinues(params) {
    return api({ url: `/nursing/v1/educationContinues`, params, method: 'get' })
  },
  // 新增数据继续教育
  postEducationContinues(params) {
    return api({ url: `/nursing/v1/educationContinues`, params, method: 'post' })
  },
  // 修改继续教育
  putEducationContinues(params) {
    return api({ url: `/nursing/v1/educationContinues/${params.id}`, params, method: 'put' })
  },
  // 删除继续教育
  deleteEducationContinues(params) {
    return api({ url: `/nursing/v1/educationContinues/${params.id}`, params, method: 'delete' })
  },

  /* 我的培训 */
  // 我的培训-我的培训列表
  getEducationMyTrains(params) {
    return api({ url: `/nursing/v1/educationExams/myTrainings`, params, method: 'get' })
  },
  // 我的培训-立即答题
  postEducationAnswers(params, id) {
    return api({ url: `/nursing/v1/educationExams/details/${id}/answers`, params, method: 'post' })
  },
  // 我的培训-考试详细-查询。
  getEducationExamsDetails(params) {
    return api({ url: `/nursing/v1/educationExams/details/${params.id}/paper`, params, method: 'get' })
  },

  /* 我的培训 */
  // 考试管理-列表
  getEducationExams(params) {
    return api({ url: `/nursing/v1/educationExams`, params, method: 'get' })
  },
  // 考试管理-新建考试计划
  postEducation(params) {
    return api({ url: `/nursing/v1/educationExams`, params, method: 'post' })
  },
  // 考试管理-新建考试计划-护理部-科室人员
  getEducationPersons(params) {
    return api({ url: `/nursing/v1/educationExams/persons`, params, method: 'get' })
  },
  // 考试管理-考试详细
  getEducationDetails(params) {
    return api({ url: `/nursing/v1/educationExams/${params.id}/details`, params, method: 'get' })
  },
  // 考试管理-考试详细-试卷详细
  getEducationPapers(params) {
    return api({ url: `/nursing/v1/educationExams/${params.id}/paper`, params, method: 'get' })
  },
  // 考试管理-删除考试计划
  deleteEducationExams(params) {
    return api({ url: `/nursing/v1/educationExams/${params.id}`, params, method: 'delete' })
  },
  // 考试管理-考试详细-试卷详细-切换试题。
  getEducationExamsNewItem(params) {
    return api({ url: `/nursing/v1/educationExams/${params.id}/items/${params.itemId}/change`, params, method: 'get' })
  },
  // 考试管理-考试详细-改卷。
  putEducationDetails(params, id) {
    return api({ url: `/nursing/v1/educationExams/details/${id}/grade`, params, method: 'put' })
  },
  // 考试管理-修改试卷试题。
  putEducationExams(params, id) {
    return api({ url: `/nursing/v1/educationExams/${id}/items`, params, method: 'put' })
  },
  // 考试管理-执行。
  putEducationExamsExecute(params) {
    return api({ url: `/nursing/v1/educationExams/${params.id}/execute`, params, method: 'put' })
  }
}
