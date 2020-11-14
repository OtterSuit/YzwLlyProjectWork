import request from '@/utils/request'

// 获取绩效考核列表
export function getAssess(params) {
  return request({
    url: '/vue-admin-template/people/getAssess',
    method: 'get',
    params
  })
}
