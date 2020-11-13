export default [
  {
    path: 'recyclingMain',
    name: 'DepartmentRecyclingMain',
    component: () => import('@/views/department/recycling/index'),
    meta: { title: '回收管理', breadcrumb: false, activeMenu: '/recycling/recyclingMain', permission: ['DepartmentRecycling'] }
  },
  {
    path: 'recyclingForm',
    name: 'DepartmentRecyclingForm',
    component: () => import('@/views/department/recycling/form'),
    meta: { title: '回收申请', activeMenu: '/recycling/recyclingMain', permission: ['DepartmentRecycling'] },
    hidden: true
  },
  // {
  //   path: 'delivery',
  //   name: 'DepartmentDelivery',
  //   component: () => import('@/views/department/recycling/delivery'),
  //   meta: { title: '发放', activeMenu: '/recycling/recyclingMain', permission: ['DepartmentRecycling'] },
  //   hidden: true
  // },
  {
    path: 'recyclingDetails',
    name: 'DepartmentRecyclingDetails',
    component: () => import('@/views/department/recycling/details'),
    meta: { title: '回收详细', activeMenu: '/recycling/recyclingMain', permission: ['DepartmentRecycling'] },
    hidden: true
  }
]

