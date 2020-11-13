export default [
  {
    path: 'departmentReturnMain',
    name: 'departmentReturnMain',
    component: () => import('@/views/department/return/index'),
    meta: { title: '退回管理', breadcrumb: false, activeMenu: '/departmentReturn/departmentReturnMain', permission: ['departmentReturn'] }
  },
  {
    path: 'departmentReturnForm',
    name: 'departmentReturnForm',
    component: () => import('@/views/department/return/form'),
    meta: { title: '退回申请', activeMenu: '/departmentReturn/departmentReturnMain', permission: ['departmentReturn'] },
    hidden: true
  },
  {
    path: 'departmentReturnDelivery',
    name: 'departmentReturnDelivery',
    component: () => import('@/views/department/return/delivery'),
    meta: { title: '发放', activeMenu: '/departmentReturn/departmentReturnMain', permission: ['departmentReturn'] },
    hidden: true
  },
  {
    path: 'departmentReturnDetails',
    name: 'departmentReturnDetails',
    component: () => import('@/views/department/return/details'),
    meta: { title: '退回详细', activeMenu: '/departmentReturn/departmentReturnMain', permission: ['departmentReturn'] },
    hidden: true
  }
]

