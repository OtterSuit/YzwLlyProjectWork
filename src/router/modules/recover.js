export default [
  {
    path: 'recoverList',
    name: 'RecoverList',
    component: () => import('@/views/recover/index'),
    meta: { title: '回收任务', parent: 'Recover' },
    redirect: '/recover/recoverList/recoverListMain',
    children: [
      {
        path: 'recoverListMain',
        name: 'recoverListMain',
        component: () => import('@/views/recover/recoverList/index'),
        meta: { title: '回收任务', breadcrumb: false, activeMenu: '/recover/recoverList/recoverListMain', permission: ['Recover', 'RecoverList'] }
      },
      {
        path: 'particulars',
        name: 'recoverParticulars',
        component: () => import('@/views/recover/particulars/index'),
        meta: { title: '申请单详情', activeMenu: '/recover/recoverList/recoverListMain', permission: ['Recover', 'RecoverList'] },
        hidden: true
      }
    ]
  },
  {
    path: 'recycled',
    name: 'Recycled',
    component: () => import('@/views/recover/index'),
    meta: { title: '已完成', parent: 'Recover' },
    redirect: '/recover/recycled/recycledMain',
    children: [
      {
        path: 'recycledMain',
        name: 'recycledMain',
        component: () => import('@/views/recover/recycled/index'),
        meta: { title: '已完成', breadcrumb: false, activeMenu: '/recover/recycled/recycledMain', permission: ['Recover', 'Recycled'] }
      },
      {
        path: 'particulars',
        name: 'recycledParticulars',
        component: () => import('@/views/recover/particulars/index'),
        meta: { title: '申请单详情', activeMenu: '/recover/recycled/recycledMain', permission: ['Recover', 'Recycled'] },
        hidden: true
      }
    ]
  },
  {
    path: 'defect',
    name: 'Defect',
    component: () => import('@/views/recover/index'),
    meta: { title: '缺损记录', parent: 'Recover' },
    redirect: '/recover/defect/defectMain',
    children: [
      {
        path: 'defectMain',
        name: 'defectMain',
        component: () => import('@/views/recover/defect/index'),
        meta: { title: '缺损记录', breadcrumb: false, activeMenu: '/recover/defect/defectMain', permission: ['Recover', 'Defect'] }
      },
      {
        path: 'particulars',
        name: 'defectParticulars',
        component: () => import('@/views/recover/particulars/index'),
        meta: { title: '申请单详情', activeMenu: '/recover/defect/defectMain', permission: ['Recover', 'Defect'] },
        hidden: true
      }
    ]
  }
]

