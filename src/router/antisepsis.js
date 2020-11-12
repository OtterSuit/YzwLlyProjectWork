export default [
  {
    path: 'loading',
    name: 'Loading',
    component: () => import('@/views/antisepsis/loading/index'),
    meta: { title: '装载' }
  },
  {
    path: 'antisepsisList',
    name: 'AntisepsisList',
    component: () => import('@/views/antisepsis/antisepsisList/index'),
    meta: { title: '任务列表' }
  },
  {
    path: 'qualityTest',
    name: 'QualityTest',
    component: () => import('@/views/antisepsis/antisepsisList/qualityTest'),
    meta: { title: '质量监测' },
    hidden: true
  },
  {
    path: 'history',
    name: 'AntisepsisHistory',
    component: () => import('@/views/antisepsis/index'),
    meta: { title: '历史记录' },
    redirect: { name: 'AntisepsisHistoryMain' },
    children: [
      {
        path: 'historyMain',
        name: 'AntisepsisHistoryMain',
        meta: { title: '历史记录', breadcrumb: false },
        component: () => import('@/views/antisepsis/history/index')
      },
      {
        path: 'detail',
        name: 'historyDetail',
        component: () => import('@/views/antisepsis/history/detail'),
        meta: { title: '灭菌详情' },
        hidden: true
      }
    ]
  }

]
