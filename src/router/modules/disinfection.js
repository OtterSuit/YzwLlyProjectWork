export default [
  {
    path: 'mission',
    name: 'Mission',
    component: () => import('@/views/disinfection/mission'),
    meta: { title: '任务列表', parent: 'Disinfection', permission: ['Disinfection', 'Mission'] }
  },
  {
    path: 'completed',
    name: 'Completed',
    component: () => import('@/views/disinfection/completed'),
    meta: { title: '已完成', parent: 'Disinfection', permission: ['Disinfection', 'Completed'] }
  },
  {
    path: 'maintenance',
    name: 'Maintenance',
    component: () => import('@/views/disinfection/maintenance'),
    meta: { title: '维修/报废', parent: 'Disinfection', permission: ['Disinfection', 'Maintenance'] }
  }
]

