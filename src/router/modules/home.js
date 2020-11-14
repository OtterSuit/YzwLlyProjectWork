import store from '../../store'
export default [
  {
    path: 'home',
    name: 'Home',
    component: () => import('@/views/home/index'),
    meta: { title: '首页', icon: 'el-icon-s-home' },
    beforeEnter: (to, from, next) => {
      store.dispatch('settings/changeTagsView', false)
      next()
    }
  }
]
