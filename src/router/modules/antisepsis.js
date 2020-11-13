export default [
  {
    path: 'loading',
    name: 'Loading',
    component: () => import('@/views/antisepsis/loading/index'),
    meta: { title: '装载', parent: 'Antisepsis', permission: ['Antisepsis', 'Loading'] }
  },
  {
    path: 'antisepsisList',
    name: 'AntisepsisList',
    component: () => import('@/views/antisepsis/index'),
    meta: { title: '任务列表', parent: 'Antisepsis' },
    redirect: { name: 'antisepsisListMain' },
    children: [
      {
        path: 'antisepsisListMain',
        name: 'antisepsisListMain',
        component: () => import('@/views/antisepsis/antisepsisList/index'),
        meta: { title: '任务列表', breadcrumb: false, activeMenu: '/antisepsis/antisepsisList/antisepsisListMain', permission: ['Antisepsis', 'AntisepsisList'] }
      },
      {
        path: 'qualityTest',
        name: 'QualityTest',
        component: () => import('@/views/antisepsis/antisepsisList/qualityTest'),
        meta: { title: '质量监测', activeMenu: '/antisepsis/antisepsisList/antisepsisListMain', permission: ['Antisepsis', 'AntisepsisList'] },
        hidden: true
      }
    ]
  },
  {
    path: 'history',
    name: 'AntisepsisHistory',
    component: () => import('@/views/antisepsis/index'),
    meta: { title: '历史记录', parent: 'Antisepsis' },
    redirect: { name: 'AntisepsisHistoryMain' },
    children: [
      {
        path: 'historyMain',
        name: 'AntisepsisHistoryMain',
        component: () => import('@/views/antisepsis/history/index'),
        meta: { title: '历史记录', breadcrumb: false, activeMenu: '/antisepsis/history/historyMain', permission: ['Antisepsis', 'AntisepsisHistory'] }
      },
      {
        path: 'detail',
        name: 'historyDetail',
        component: () => import('@/views/antisepsis/history/detail'),
        meta: { title: '灭菌详情', activeMenu: '/antisepsis/history/historyMain', permission: ['Antisepsis', 'AntisepsisHistory'] },
        hidden: true
      }
    ]
  }
]
