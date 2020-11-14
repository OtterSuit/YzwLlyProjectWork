import axios from 'axios'
import qs from 'qs'
import APIconfig from '@/api/APIconfig'
import router from '../router'
import store from '../store'
// import Cookies from 'js-cookie'
import { getToken, getExpireTime, removeToken, setToken, setExpireTime } from '@/utils/auth'
import { compareTime } from '@/utils/index'
import { Message } from 'element-ui'

// 是否正在刷新的标志
let isTokenRefreshing = false
// 存储请求的数组
let subscribesArr = []
// 请求push到数组中
function subscribesArrRefresh(cb) {
  subscribesArr.push(cb)
}
// 用新token发起请求
function reloadSubscribesArr(newToken) {
  subscribesArr.map(cb => cb(newToken))
}

axios.defaults.timeout = 30000
axios.defaults.retry = 3
axios.defaults.retryDelay = 1000

// 定义全局变量clearRequest，在route.js中要用到
const clearRequest = {
  source: {
    token: null,
    cancel: null
  }
}
const CancelToken = axios.CancelToken
const source = CancelToken.source()
axios.interceptors.request.use(
  (config) => {
    // console.log(config)
    if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded; charset=UTF-8') {
      // config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
      config.transformRequest = [function(data, headers) {
        return qs.stringify(data, { arrayFormat: 'repeat' })
      }]
    }
    const id = config.params && config.params.id ? config.params.id : 0
    const excludes = [
      { url: '/auth/v1/login', method: 'post' },
      { url: '/auth/v1/tokens/refresh', method: 'post' },
      { url: '/nursing/v1/satisfaction/answer', method: 'post' },
      { url: `/nursing/v1/satisfaction/${id}`, method: 'get' }
    ]
    // whiteList.indexOf(to.path) !== -1
    config.cancelToken = clearRequest.source.token
    const excludesBool = excludes.some(items => {
      return config.url.includes(items.url) && items.method === config.method
    })
    if (excludesBool) {
      return config
    }
    // 判断token是否过期
    if (!compareTime(getExpireTime(), 60)) {
      // 判断token是否已经刷新过
      if (!isTokenRefreshing) {
        // debugger

        isTokenRefreshing = true
        // 请求刷新token
        api({ url: '/auth/v1/tokens/refresh', params: { token: getToken() }, method: 'post', ContentType: 'json' }).then(res => {
          isTokenRefreshing = false
          if (res.errCode === '0') {
            removeToken()
            setExpireTime(res.resData.expireTime)
            setToken(res.resData.accessToken)
            reloadSubscribesArr(res.resData.accessToken)
          } else {
            removeToken()
            Message.error('权限失效，请重新登录')
            router.push('/login')
            return
          }
        }).catch(err => {
          isTokenRefreshing = false
          Message.error(err)
          subscribesArr = []
          store.dispatch('user/logout')
          router.push('/login')
        })
      }
      const retry = new Promise((resolve, reject) => {
        subscribesArrRefresh((newToken) => {
          config.headers.Authorization = `Bearer ${newToken}`
          resolve(config)
        })
      })
      return retry
    } else {
      return config
    }
  },
  error => Promise.reject(error)
)
// 添加请求拦截器
// axios.interceptors.request.use(
//   (config) => {
//     console.log(config)
//     if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded; charset=UTF-8') {
//       // config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
//       config.transformRequest = [function(data, headers) {
//         return qs.stringify(data, { arrayFormat: 'repeat' })
//       }]
//     }
//     config.cancelToken = clearRequest.source.token
//     return config
//   },
//   error => Promise.reject(error)
// )
// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    // console.log(response)
    if (!response.data.success && response.data.resData !== -1) {
      Message.error(response.data.errMsg)
    }
    return response
  },
  error => Promise.reject(error)
)
export function api(data) {
  const { url, params, method } = data
  const token = getToken()
  let ContentType
  if (data.ContentType) {
    if (data.ContentType === 'json') {
      ContentType = 'application/json;charset=UTF-8'
    } else if (data.ContentType === 'form') {
      ContentType = 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  } else {
    if (method === 'put' || method === 'post') {
      ContentType = 'application/json;charset=UTF-8'
    } else {
      ContentType = 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }
  const newHeader = {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    // 'Content-Type': 'application/json;charset=UTF-8',
    'Content-Type': ContentType,
    Authorization: `Bearer ${token}`
  }
  let paramsSerializer = null
  if (data.paramsSerializer && data.paramsSerializer === true) {
    paramsSerializer = function(params) {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  }
  const baseUrl = url.includes('auth') ? APIconfig.baseUrl : APIconfig.otherUrl
  const backHost = sessionStorage.backHost || baseUrl
  const newApi = `${backHost}${url}`
  return axios(
    { method,
      url: newApi,
      cancelToken: source.token,
      timeout: 30000,
      data: params,
      params: method.toLocaleLowerCase() === 'get' ? params : {},
      headers: newHeader,
      paramsSerializer: paramsSerializer
    })
    .then(res => Promise.resolve(res.data))
    .catch((e) => {
      console.log(e)
    })
}
export { clearRequest }

