import store from '../../store'
export default [
  {
    path: 'questionnaire',
    name: 'Questionnaire',
    component: () => import('@/views/satisfaction/index'),
    meta: { title: '满意度调查', breadcrumb: false },
    beforeEnter: (to, from, next) => {
      store.dispatch('settings/changeTagsView', false)
      store.dispatch('tagsView/delAllViews')
      next()
    }
  },
  {
    path: 'newQuestion',
    name: 'newQuestion',
    component: () => import('@/views/satisfaction/add/index'),
    meta: { title: '新建问卷' },
    redirect: '/satisfaction/newQuestion/step1',
    hidden: true,
    children: [
      {
        path: 'step1',
        name: 'step1',
        component: () => import('@/views/satisfaction/add/step1'),
        meta: { title: '第一步', activeMenu: '/satisfaction/questionnaire' },
        beforeEnter: (to, from, next) => {
          store.dispatch('settings/changeTagsView', false)
          store.dispatch('tagsView/delAllViews')
          next()
        }
      },
      {
        path: 'step2',
        name: 'step2',
        component: () => import('@/views/satisfaction/add/step2'),
        meta: { title: '第二步', activeMenu: '/satisfaction/questionnaire' },
        beforeEnter: (to, from, next) => {
          store.dispatch('settings/changeTagsView', false)
          store.dispatch('tagsView/delAllViews')
          next()
        }
      },
      {
        path: 'preview',
        name: 'preview',
        component: () => import('@/views/satisfaction/add/preview'),
        meta: { title: '预览问卷', activeMenu: '/satisfaction/questionnaire' },
        beforeEnter: (to, from, next) => {
          store.dispatch('tagsView/setShowBack', true)
          store.dispatch('settings/changeTagsView', true)
          store.dispatch('tagsView/delAllViews')
          next()
        }
      }
    ]
  },
  {
    path: 'quesAnalysis/:id',
    name: 'quesAnalysis',
    component: () => import('@/views/satisfaction/analysis/index'),
    meta: { title: '统计分析', activeMenu: '/satisfaction/questionnaire' },
    hidden: true,
    beforeEnter: (to, from, next) => {
      store.dispatch('tagsView/setShowBack', true)
      store.dispatch('settings/changeTagsView', true)
      store.dispatch('tagsView/delAllViews')
      next()
    }
  },
  {
    path: 'quesPreview/:id',
    name: 'quesPreview',
    component: () => import('@/views/satisfaction/preview/index'),
    meta: { title: '问卷预览', activeMenu: '/satisfaction/questionnaire' },
    hidden: true,
    beforeEnter: (to, from, next) => {
      store.dispatch('tagsView/setShowBack', true)
      store.dispatch('settings/changeTagsView', true)
      store.dispatch('tagsView/delAllViews')
      next()
    }
  }
]
