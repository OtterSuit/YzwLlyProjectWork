const state = {
  visitedViews: [],
  showBack: false,
  backName: ''
}

const mutations = {
  ADD_VISITED_VIEW: (state, view) => {
    state.visitedViews = []
    view.forEach(element => {
      if (state.visitedViews.some(v => v.path === element.path)) return
      state.visitedViews.push(element)
    })
  },
  DEL_ALL_VISITED_VIEWS: state => {
    state.visitedViews = []
  },
  SET_SHOW_BACK: (state, view) => {
    state.showBack = view
  },
  SET_BACK_NAME: (state, view) => {
    state.backName = view
  }
}

const actions = {
  addView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  delAllViews({ commit }) {
    commit('DEL_ALL_VISITED_VIEWS')
  },
  setShowBack({ commit }, view) {
    commit('SET_SHOW_BACK', view)
  },
  setBackName({ commit }, view) {
    commit('SET_BACK_NAME', view)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
