import { api } from '../api.js'
import APIconfig from '@/api/APIconfig'

export default {
  // 上传的URL
  fileURL: `${APIconfig.baseUrl}/auth/v1/files`,
  // 分页查询图片信息
  toGetImage(params) {
    return api({ url: '/ssd/v1.0/basic/image/s', params, method: 'get' })
  },
  // 增加图片信息
  toPostImage(params) {
    return api({ url: '/ssd/v1.0/basic/image', params, method: 'post' })
  },
  deleteImage(params) {
    return api({ url: `/ssd/v1.0/basic/image/${params.id}`, params, method: 'delete' })
  }
}
