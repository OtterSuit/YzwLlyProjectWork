export default [
  {
    path: 'traceList',
    name: 'TraceList',
    component: () => import('@/views/trace/index'),
    meta: { title: '追溯列表' },
    redirect: '/trace/traceList/traceMain',
    hidden: true,
    children: [
      {
        path: 'traceMain',
        name: 'TraceMain',
        component: () => import('@/views/trace/traceList/index'),
        meta: { title: '追溯列表', breadcrumb: false }
      },
      {
        path: 'traceDetails',
        name: 'TraceDetails',
        component: () => import('@/views/trace/traceList/details.vue'),
        meta: { title: '追溯详情' },
        hidden: true
      }
    ]
  }
]

