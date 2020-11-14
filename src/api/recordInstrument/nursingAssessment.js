import request from '@/utils/request'

// 获取患者列表信息
export function getPatient(params) {
  return request({
    url: '/vue-admin-template/recordInstrument/getPatient',
    method: 'get',
    params
  })
}

// 获取入院评估列表信息
// export function getAdmissionAssessment(params) {
//   return request({
//     url: '/vue-admin-template/recordInstrument/getAdmissionAssessment',
//     method: 'get',
//     params
//   })
// }

// 获取跌倒评估风险评估列表信息
// export function getFallAssessment(params) {
//   return request({
//     url: '/vue-admin-template/recordInstrument/getFallAssessment',
//     method: 'get',
//     params
//   })
// }
