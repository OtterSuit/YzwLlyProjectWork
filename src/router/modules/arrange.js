import store from '../../store'
export default [
  {
    path: 'require',
    component: () => import('@/views/arrange/require/index'),
    name: 'Require',
    meta: { title: '排班需求' },
    beforeEnter: (to, from, next) => {
      store.dispatch('settings/changeTagsView', false)
      store.dispatch('tagsView/delAllViews')
      next()
    }
  },
  {
    path: 'set',
    component: () => import('@/views/arrange/index'),
    name: 'Set',
    meta: { title: '排班设置' },
    redirect: '/arrange/set/classes',
    beforeEnter: (to, from, next) => {
      store.dispatch('tagsView/setShowBack', false)
      store.dispatch('settings/changeTagsView', true)
      store.dispatch('tagsView/addView', [
        {
          title: '班次设置',
          path: '/arrange/set/classes'
        },
        {
          title: '排班记录查询',
          path: '/arrange/set/record'
        }
      ])
      next()
    },
    children: [
      {
        path: 'classes',
        name: 'classes',
        component: () => import('@/views/arrange/set/classes/index'),
        meta: { title: '班次设置', activeMenu: '/arrange/set' },
        hidden: true
      },
      {
        path: 'record',
        name: 'record',
        component: () => import('@/views/arrange/set/record/index'),
        meta: { title: '排班记录查询', activeMenu: '/arrange/set' },
        hidden: true
      }
    ]
  },
  {
    path: 'vacation',
    component: () => import('@/views/arrange/index'),
    name: 'Vacation',
    meta: { title: '假期管理' },
    redirect: '/arrange/vacation/leaveReport',
    beforeEnter: (to, from, next) => {
      store.dispatch('tagsView/setShowBack', false)
      store.dispatch('settings/changeTagsView', true)
      store.dispatch('tagsView/addView', [
        {
          title: '请假申请',
          path: '/arrange/vacation/leaveReport'
        },
        {
          title: '存假管理',
          path: '/arrange/vacation/save'
        },
        {
          title: '年假管理',
          path: '/arrange/vacation/annual'
        },
        {
          title: '科室请假汇总',
          path: '/arrange/vacation/departmentStatistics'
        },
        {
          title: '个人请假汇总',
          path: '/arrange/vacation/personalStatistics'
        }
      ])
      next()
    },
    children: [
      {
        path: 'leaveReport',
        name: 'leaveReport',
        component: () => import('@/views/arrange/vacation/leave/index'),
        meta: { title: '请假申请', activeMenu: '/arrange/vacation' },
        hidden: true
      },
      {
        path: 'save',
        name: 'save',
        component: () => import('@/views/arrange/vacation/save/index'),
        meta: { title: '存假管理', activeMenu: '/arrange/vacation' },
        hidden: true
      },
      {
        path: 'annual',
        name: 'annual',
        component: () => import('@/views/arrange/vacation/annual/index'),
        meta: { title: '年假管理', activeMenu: '/arrange/vacation' },
        hidden: true
      },
      {
        path: 'departmentStatistics',
        name: 'departmentStatistics',
        component: () => import('@/views/arrange/vacation/department/index'),
        meta: { title: '科室请假汇总', activeMenu: '/arrange/vacation' },
        hidden: true
      },
      {
        path: 'personalStatistics',
        name: 'personalStatistics',
        component: () => import('@/views/arrange/vacation/personal/index'),
        meta: { title: '个人请假汇总', activeMenu: '/arrange/vacation' },
        hidden: true
      }
    ]
  }
]
