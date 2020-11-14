import { api } from '../api.js'
import APIconfig from '../APIconfig'
// method格式统一用小写
export default {
  // 登录接口
  login(params) {
    return api({ url: '/auth/v1/login', params, method: 'post' })
  },
  // 修改密码
  postModifyPwd(params) {
    return api({ url: '/auth/v1/users/modifyPwd', params, method: 'post' })
  },
  // 上传的URL
  fileURL: `${APIconfig.baseUrl}/auth/v1/files`
}
