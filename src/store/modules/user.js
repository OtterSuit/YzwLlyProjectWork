import api from '@/api'
import Cookies from 'js-cookie'
import { Message } from 'element-ui'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    userId: '',
    avatar: '',
    menusList: '',
    expireTime: ''
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
  SET_NAME: (state, name) => {
    Cookies.set('name', name)
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    Cookies.set('avatar', avatar)
    state.avatar = avatar
  },
  SET_USERID: (state, userId) => {
    Cookies.set('userId', userId)
    state.userId = userId
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
          Message.error(response.errMsg)
          resolve()
          return
        }
        const { resData } = response
        if (resData.menusList.length === 0) {
          resolve()
          return Message.error('暂无权限,请联系管理员设置')
        }
        commit('SET_TOKEN', resData.accessToken) // 设置token
        commit('SET_NAME', resData.realName) // 设置用户名
        commit('SET_USERID', resData.account) // 设置用户id
        commit('SET_EXPIER_TIME', resData.expireTime) // 设置token过期时间

        // 获取用户头像
        api.peoGetstaff({ id: resData.account }).then(response => {
          commit('SET_AVATAR', response.data.imageInfo)
        })

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
      Cookies.remove('avatar')
      Cookies.remove('userId')
      Cookies.remove('name')
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

