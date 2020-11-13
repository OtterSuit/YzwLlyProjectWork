import { api } from '../api.js'
// method格式统一用小写
export default {
// 登录接口
  login(params) {
    return api({ url: '/auth/v1/login', params, method: 'post', ContentType: 'json' })
  },
  //   退出登录接口
  logout(params) {
    return api({ url: '/auth/v1/logout', params, method: 'post' })
  },
  // 检验token是否有效
  checkToken(params) {
    return api({ url: '/auth/v1/tokens/check', params, method: 'post', ContentType: 'json' })
  },
  // 刷新token
  refreshToken(params) {
    return api({ url: '/auth/v1/tokens/refresh', params, method: 'post', ContentType: 'json' })
  },
  // deleteFile(params) {
  //   return api({ url: `/auth/v1/files/${params.id}`, params, method: 'delete' })
  // },
  // 获取多个字典类型的所有字典数据
  toGetDict(params) {
    return api({ url: '/ssd/v1.0/basic/dict/s', params, method: 'get' })
  }
}
