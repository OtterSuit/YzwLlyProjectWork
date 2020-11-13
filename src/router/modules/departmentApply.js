export default [
  {
    path: 'applyMain',
    name: 'DepartmentApplyMain',
    component: () => import('@/views/department/apply/index'),
    meta: { title: '申领管理', breadcrumb: false, activeMenu: '/apply/applyMain', permission: ['DepartmentApply'] }
  },
  {
    path: 'applyForm',
    name: 'DepartmentApplyForm',
    component: () => import('@/views/department/apply/form'),
    meta: { title: '物品申领', activeMenu: '/apply/applyMain', permission: ['DepartmentApply'] },
    hidden: true
  },
  {
    path: 'applyDetails',
    name: 'DepartmentApplyDetails',
    component: () => import('@/views/department/apply/details'),
    meta: { title: '申领详细', activeMenu: '/apply/applyMain', permission: ['DepartmentApply'] },
    hidden: true
  },
  {
    path: 'receive',
    name: 'receive',
    component: () => import('@/views/department/apply/receive'),
    meta: { title: '签收单', activeMenu: '/apply/applyMain', permission: ['DepartmentApply'] },
    hidden: true
  }
]

