export default [
  {
    path: 'mission',
    name: 'AssemblyMission',
    component: () => import('@/views/assembly/mission/index'),
    meta: { title: '任务列表', parent: 'Assembly', permission: ['Assembly', 'AssemblyMission'] }
  },
  {
    path: 'completed',
    name: 'AssemblyComplete',
    component: () => import('@/views/assembly/index'),
    meta: { title: '已完成', parent: 'Assembly' },
    redirect: '/assembly/completed/completedMain',
    children: [
      {
        path: 'completedMain',
        name: 'completedMain',
        component: () => import('@/views/assembly/completed/index'),
        meta: { title: '已完成', breadcrumb: false, activeMenu: '/assembly/completed/completedMain', permission: ['Assembly', 'AssemblyComplete'] }
      },
      {
        path: 'record',
        name: 'completedRecord',
        component: () => import('@/views/assembly/record/index'),
        meta: { title: '详细', activeMenu: '/assembly/completed/completedMain', permission: ['Assembly', 'AssemblyComplete'] },
        hidden: true
      }
    ]
  },
  {
    path: 'qualityrecord',
    name: 'Qualityrecord',
    component: () => import('@/views/assembly/index'),
    meta: { title: '清洗质量记录表', parent: 'Assembly' },
    redirect: '/assembly/qualityrecord/qualityrecordMain',
    children: [
      {
        path: 'qualityrecordMain',
        name: 'qualityrecordMain',
        component: () => import('@/views/assembly/qualityrecord/index'),
        meta: { title: '清洗质量记录表', breadcrumb: false, activeMenu: '/assembly/qualityrecord/qualityrecordMain', permission: ['Assembly', 'Qualityrecord'] }
      },
      {
        path: 'record',
        name: 'qualityDetails',
        component: () => import('@/views/assembly/record/index'),
        meta: { title: '详细', activeMenu: '/assembly/qualityrecord/qualityrecordMain', permission: ['Assembly', 'Qualityrecord'] },
        hidden: true
      }
    ]
  }
]
