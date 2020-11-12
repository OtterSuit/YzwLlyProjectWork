export default [
  {
    path: 'apply',
    name: 'DepartmentApply',
    component: () => import('@/views/department/index'),
    meta: { title: '申领管理' },
    redirect: '/department/apply/applyMain',
    children: [
      {
        path: 'applyMain',
        name: 'DepartmentApplyMain',
        component: () => import('@/views/department/apply/index'),
        meta: { title: '申领管理', breadcrumb: false }
      },
      {
        path: 'applyDetails',
        name: 'DepartmentApplyDetails',
        component: () => import('@/views/department/apply/details'),
        meta: { title: '物品申领' },
        hidden: true
      },
      {
        path: 'applyForm',
        name: 'DepartmentApplyForm',
        component: () => import('@/views/department/apply/form'),
        meta: { title: '申领详细' },
        hidden: true
      }
    ]
  },
  {
    path: 'borrowed',
    name: 'DepartmentBorrowed',
    component: () => import('@/views/department/index'),
    meta: { title: '借还管理' },
    redirect: '/department/borrowed/borrowedMain',
    children: [
      {
        path: 'borrowedMain',
        name: 'DepartmentBorrowedMain',
        component: () => import('@/views/department/borrowed/index'),
        meta: { title: '借还管理', breadcrumb: false }
      },
      {
        path: 'borrow',
        name: 'DepartmentBorrow',
        component: () => import('@/views/department/borrowed/borrow'),
        meta: { title: '借物申请' },
        hidden: true
      },
      {
        path: 'takeGoods',
        name: 'DepartmentTakeGoods',
        component: () => import('@/views/department/borrowed/takeGoods'),
        meta: { title: '确认收货' },
        hidden: true
      },
      {
        path: 'returnGoods',
        name: 'DepartmentReturnGoods',
        component: () => import('@/views/department/borrowed/returnGoods'),
        meta: { title: '还物申请' },
        hidden: true
      },
      {
        path: 'borrowedForm',
        name: 'DepartmentBorrowedForm',
        component: () => import('@/views/department/borrowed/form'),
        meta: { title: '借物详细' },
        hidden: true
      }
    ]
  },
  {
    path: 'recycling',
    name: 'DepartmentRecycling',
    component: () => import('@/views/department/index'),
    meta: { title: '回收管理' },
    redirect: '/department/recycling/recyclingMain',
    children: [
      {
        path: 'recyclingMain',
        name: 'DepartmentRecyclingMain',
        component: () => import('@/views/department/recycling/index'),
        meta: { title: '回收管理', breadcrumb: false }
      },
      {
        path: 'recyclingForm',
        name: 'DepartmentRecyclingForm',
        component: () => import('@/views/department/recycling/form'),
        meta: { title: '回收申请' },
        hidden: true
      },
      {
        path: 'delivery',
        name: 'DepartmentDelivery',
        component: () => import('@/views/department/recycling/delivery'),
        meta: { title: '发货' },
        hidden: true
      },
      {
        path: 'recyclingDetails',
        name: 'DepartmentRecyclingDetails',
        component: () => import('@/views/department/recycling/details'),
        meta: { title: '回收详细' },
        hidden: true
      }
    ]
  },
  {
    path: 'departmentReturn',
    name: 'departmentReturn',
    component: () => import('@/views/department/index'),
    meta: { title: '退货管理' },
    redirect: '/department/departmentReturn/departmentReturnMain',
    children: [
      {
        path: 'departmentReturnMain',
        name: 'departmentReturnMain',
        component: () => import('@/views/department/return/index'),
        meta: { title: '退货管理', breadcrumb: false }
      },
      {
        path: 'departmentReturnForm',
        name: 'departmentReturnForm',
        component: () => import('@/views/department/return/form'),
        meta: { title: '退货申请' },
        hidden: true
      },
      {
        path: 'departmentReturnDelivery',
        name: 'departmentReturnDelivery',
        component: () => import('@/views/department/return/delivery'),
        meta: { title: '发货' },
        hidden: true
      },
      {
        path: 'departmentReturnDetails',
        name: 'departmentReturnDetails',
        component: () => import('@/views/surgery/return/details'),
        meta: { title: '退货详细' },
        hidden: true
      }
    ]
  }
]

