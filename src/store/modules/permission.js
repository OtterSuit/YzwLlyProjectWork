import { LayersOne, LayersTwo, constantRoutes } from '@/router'

// 获取sidebar所展示的路由
function filterAsyncRoutes(menusList, LayersOneIndex, state) {
  const res = []
  // 循环遍历登陆时用户存取的menusList
  menusList.forEach(item => {
    // 存取path为'/'时跳转的路由
    if (item.enCode === 'ssdHome' || item.enCode === 'sssHome') {
      state.home = item.enCode
    }
    // 存取路由权限
    state.router_permission[item.enCode] = true
    // 一级路由添加至res中
    if (item.layers === 1) {
      if (typeof LayersOne[LayersOneIndex[item.enCode]] !== 'undefined') {
        res.push(LayersOne[LayersOneIndex[item.enCode]])
      }
      // 二级路由添加至父级的children中
    } else if (item.layers === 2) {
      LayersTwo.forEach(element => {
        if (element.name === item.enCode) {
          LayersOne[LayersOneIndex[element.meta.parent]].children.push(element)
          return
        }
      })
    }
  })

  return res
}

// 清空一级路由下的子路由
function emptyChild() {
  // 排除sidebar中只存在一级的路由
  const exclude = ['ssdHome', 'sssHome', 'Trace', 'DepartmentApply', 'DepartmentRecycling', 'departmentReturn']
  LayersOne.forEach(itme => {
    if (!exclude.includes(itme.name)) {
      // console.log(i)
      itme.children = []
    }
  })
}

const getDefaultState = (LayersOneIndex) => {
  return {
    routes: [],
    LayersOneIndex: LayersOneIndex || {},
    home: '',
    router_permission: {}
  }
}

const state = getDefaultState()

const mutations = {
  // 设置sidebar展示的路由
  SET_ROUTES: (state, routes) => {
    state.routes = constantRoutes.concat(routes)
  },
  // 设置一级路由name字段对应的索引值
  SET_INDEX: (state, LayersOneIndex) => {
    state.LayersOneIndex = LayersOneIndex
  },
  // 重置权限state
  RESET_PERMISSION: (state) => {
    Object.assign(state, getDefaultState(state.LayersOneIndex))
  }
}

const actions = {
  generateRoutes({ commit, state }, menusList) {
    // 设置一级路由name字段对应的索引值
    if (Object.keys(state.LayersOneIndex).length === 0) {
      const oneIndex = {}
      LayersOne.forEach((item, index) => {
        oneIndex[item.name] = index
      })
      commit('SET_INDEX', oneIndex)
    }
    return new Promise(resolve => {
      // 清空一级路由下的子路由
      emptyChild()
      // 获取sidebar所展示的路由
      const accessedRoutes = filterAsyncRoutes(menusList, state.LayersOneIndex, state)
      // 将sidebar展示的路由存入state中
      commit('SET_ROUTES', accessedRoutes)
      resolve()
    })
  },
  // 重置权限
  resetPermission({ commit }) {
    commit('RESET_PERMISSION')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
