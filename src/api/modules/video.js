import { api } from '../api.js'
import APIconfig from '@/api/APIconfig'

export default {
  // 上传的URL
  fileURL: `${APIconfig.baseUrl}/auth/v1/files`,
  // 分页查询图片信息
  toGetVideo(params) {
    return api({ url: '/ssd/v1.0/basic/video/s', params, method: 'get' })
  },
  // 增加图片信息
  toPostVideo(params) {
    return api({ url: '/ssd/v1.0/basic/video', params, method: 'post' })
  },
  deleteVideo(params) {
    return api({ url: `/ssd/v1.0/basic/video/${params.id}`, params, method: 'delete' })
  }
}
