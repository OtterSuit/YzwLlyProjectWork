import router from './router'
import store from './store'
// import api from '@/api'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, removeToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
// import Cookies from 'js-cookie'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // 设置界面title
  document.title = getPageTitle(to.meta.title)

  // 验证token是否存在
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // 检验token合法性
      // const { errCode } = await api.checkToken({ token: hasToken })
      // if (errCode === '40004') {
      //   // token不合法
      //   removeToken()
      //   Message.error('权限失效，请重新登录')
      //   next(`/login`)
      //   return
      //   // next()
      // } else if (errCode === '40005') {
      //   // token超时，刷新
      //   const res = await api.refreshToken({ token: hasToken })
      //   if (res.errCode === '0') {
      //     removeToken()
      //     setToken(res.resData.accessToken)
      //     // next()
      //   } else {
      //     removeToken()
      //     Message.error('权限失效，请重新登录')
      //     next(`/login`)
      //     return
      //   }
      // }
      // 验证用户菜单menusList是否存在
      const menusList = store.getters.menusList
      if (menusList) {
        // 验证sidebar展示路由是否存在
        if (store.getters.sidebar_view.length === 0) {
          // 不存在则根据用户菜单menusList设置
          try {
            store.dispatch('permission/generateRoutes', JSON.parse(menusList))
            next({ ...to, replace: true })
          } catch (error) {
          // remove token and go to login page to re-login
            await store.dispatch('user/resetToken')
            Message.error(error || 'Has Error')
            next(`/login`)
            NProgress.done()
          }
        }
        // 查看跳转的路由是否需要权限
        if (to.meta.permission) {
          // 需要权限
          let permission_bool = true
          // 验证路由权限
          to.meta.permission.forEach(item => {
            if (!store.getters.router_permission[item]) {
              permission_bool = false
              return
            }
          })
          if (permission_bool) {
            // 路由权限通过
            next()
          } else {
            // 路由权限不通过，跳转404
            next({ path: '/404', replace: true })
          }
        } else {
          console.log(to)
          console.log(to.meta.permission)
          // 不需要权限
          next()
        }
      } else {
        // 不存在用户菜单
        removeToken()
        Message.error('权限失效，请重新登录')
        next(`/login`)
        return
      }
    }
  } else {
    // 不存在token
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
