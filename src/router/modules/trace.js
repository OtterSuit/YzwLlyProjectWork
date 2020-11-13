export default [
  {
    path: 'traceMain',
    name: 'TraceMain',
    component: () => import('@/views/trace/index'),
    meta: { title: '追溯管理', breadcrumb: false, permission: ['Trace'] }
  },
  {
    path: 'traceDetails',
    name: 'TraceDetails',
    component: () => import('@/views/trace/details'),
    meta: { title: '追溯详情', permission: ['Trace'], activeMenu: '/trace/traceMain' },
    hidden: true
  }
]

