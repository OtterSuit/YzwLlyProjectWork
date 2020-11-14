import store from '../../store'
export default [
  {
    path: 'report',
    name: 'Report',
    component: () => import('@/views/reportManagement/report/index'),
    meta: { title: '上报记录' },
    beforeEnter: (to, from, next) => {
      store.dispatch('settings/changeTagsView', false)
      store.dispatch('tagsView/delAllViews')
      next()
    }
  },
  // {
  //   path: 'reportFill',
  //   name: 'ReportFill',
  //   component: () => import('@/views/reportManagement/report/form'),
  //   meta: { title: '上报记录' },
  //   hidden: true,
  //   beforeEnter: (to, from, next) => {
  //     store.dispatch('tagsView/setShowBack', true)
  //     store.dispatch('settings/changeTagsView', true)
  //     store.dispatch('tagsView/delAllViews')
  //     next()
  //   }
  // },
  {
    path: 'analysis',
    name: 'Analysis',
    component: () => import('@/views/reportManagement/analysis/reportStatics/index'),
    meta: { title: '事件分析' },
    // hidden: true,
    // redirect: '/reportManagement/analysis/reportStatics',
    beforeEnter: (to, from, next) => {
      store.dispatch('settings/changeTagsView', false)
      store.dispatch('tagsView/delAllViews')
      // store.dispatch('tagsView/addView', [
      //   {
      //     title: '上报统计图',
      //     path: '/reportManagement/analysis/reportStatics'
      //   },
      //   {
      //     title: '成因分析',
      //     path: '/reportManagement/analysis/causes'
      //   },
      //   {
      //     title: '改进措施',
      //     path: '/reportManagement/analysis/improvementMeasures'
      //   }
      // ])
      next()
    }
    // children: [
    //   {
    //     path: 'reportStatics',
    //     name: 'reportStatics',
    //     component: () => import('@/views/reportManagement/analysis/reportStatics/index'),
    //     meta: { title: '上报统计图', breadcrumb: false },
    //     hidden: true
    //   },
    //   {
    //     path: 'causes',
    //     name: 'causes',
    //     component: () => import('@/views/reportManagement/analysis/causes/index'),
    //     meta: { title: '成因分析' },
    //     hidden: true
    //   },
    //   {
    //     path: 'improvementMeasures',
    //     name: 'improvementMeasures',
    //     component: () => import('@/views/reportManagement/analysis/improvementMeasures/index'),
    //     meta: { title: '改进措施' },
    //     hidden: true
    //   }
    // ]
  }
]
