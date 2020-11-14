import api from '@/api'
import Cookies from 'js-cookie'
// import { Message } from 'element-ui'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import { getUserId } from '@/api/people/archives'
// import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    menusList: '',
    expireTime: '',
    userInfo: null
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    setToken(token)
    state.token = token
  },
  SET_USER_INFO: (state, userInfo) => {
    Cookies.set('userInfo', userInfo)
    state.userInfo = userInfo
  },
  SET_MENUS_LIST: (state, menusList) => {
    Cookies.set('menusList', menusList)
    state.menusList = menusList
  },
  SET_EXPIER_TIME: (state, expireTime) => {
    Cookies.set('expireTime', expireTime)
    state.expireTime = expireTime
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    // const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      api.login(userInfo).then(response => {
        console.log(response)
        // 登陆失败
        if (response.success === false) {
          // Message.error(response.errMsg)
          resolve()
          return
        }
        const { resData } = response
        commit('SET_USER_INFO', {
          name: resData.realName,
          departmentId: resData.organizeId,
          userId: resData.userId,
          avatar: resData.headIcon
        })
        commit('SET_TOKEN', resData.accessToken) // 设置token
        commit('SET_EXPIER_TIME', resData.expireTime) // 设置token过期时间

        // 存取该用户对应的菜单
        const list = []
        resData.menusList.forEach(item => {
          list.push({
            enCode: item.enCode, // router的name字段
            layers: item.layers // router的层级
          })
        })
        commit('SET_MENUS_LIST', JSON.stringify(list)) // 转字符串存入cookies中

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      // resetRouter()
      dispatch('permission/resetPermission', null, { root: true })
      Cookies.remove('menusList')
      Cookies.remove('userInfo')
      Cookies.remove('expireTime')
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

