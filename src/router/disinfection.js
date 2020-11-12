export default [
  {
    path: 'mission',
    name: 'Mission',
    component: () => import('@/views/disinfection/mission'),
    meta: { title: '任务列表' }
  },
  {
    path: 'completed',
    name: 'Completed',
    component: () => import('@/views/disinfection/completed'),
    meta: { title: '已完成' }
  },
  {
    path: 'maintenance',
    name: 'Maintenance',
    component: () => import('@/views/disinfection/maintenance'),
    meta: { title: '维修/报废' }
  }
]

