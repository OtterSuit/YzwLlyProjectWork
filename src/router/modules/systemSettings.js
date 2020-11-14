import store from '../../store'
export default [
  {
    path: 'myInfo',
    name: 'MyInfo',
    component: () => import('@/views/systemSettings/myInfo/index'),
    meta: { title: '我的信息' },
    hidden: true,
    beforeEnter: (to, from, next) => {
      store.dispatch('settings/changeTagsView', false)
      store.dispatch('tagsView/delAllViews')
      next()
    }
  },
  {
    path: 'modifyPwd',
    name: 'ModifyPwd',
    component: () => import('@/views/systemSettings/modifyPwd/index'),
    meta: { title: '密码修改' },
    hidden: true,
    beforeEnter: (to, from, next) => {
      store.dispatch('settings/changeTagsView', false)
      store.dispatch('tagsView/delAllViews')
      next()
    }
  },
  {
    path: 'myTodo',
    name: 'MyTodo',
    component: () => import('@/views/systemSettings/myTodo/index'),
    meta: { title: '我的待办' },
    hidden: true,
    beforeEnter: (to, from, next) => {
      store.dispatch('settings/changeTagsView', false)
      store.dispatch('tagsView/delAllViews')
      next()
    }
  },
  {
    path: 'department',
    name: 'Department',
    component: () => import('@/views/systemSettings/department/index'),
    meta: { title: '科室管理' },
    beforeEnter: (to, from, next) => {
      store.dispatch('settings/changeTagsView', false)
      store.dispatch('tagsView/delAllViews')
      next()
    }
  },
  {
    path: 'duty',
    name: 'Duty',
    component: () => import('@/views/systemSettings/duty/index'),
    meta: { title: '岗位管理' },
    beforeEnter: (to, from, next) => {
      store.dispatch('settings/changeTagsView', false)
      store.dispatch('tagsView/delAllViews')
      next()
    }
  },
  {
    path: 'purview',
    name: 'Purview',
    component: () => import('@/views/systemSettings/purview/index'),
    meta: { title: '权限管理' },
    beforeEnter: (to, from, next) => {
      store.dispatch('settings/changeTagsView', false)
      store.dispatch('tagsView/delAllViews')
      next()
    }
  },
  {
    path: 'register',
    name: 'Register',
    component: () => import('@/views/systemSettings/register/index'),
    meta: { title: '用户管理' },
    beforeEnter: (to, from, next) => {
      store.dispatch('settings/changeTagsView', false)
      store.dispatch('tagsView/delAllViews')
      next()
    }
  }
]
