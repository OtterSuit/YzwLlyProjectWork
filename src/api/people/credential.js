import request from '@/utils/request'

// 获取证书信息
export function getCredential(params) {
  return request({
    url: '/vue-admin-template/people/getCredential',
    method: 'get',
    params
  })
}
