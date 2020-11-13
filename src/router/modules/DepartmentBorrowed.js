
// {
//   path: 'borrowed',
//   name: 'DepartmentBorrowed',
//   component: () => import('@/views/department/index'),
//   meta: { title: '借还管理' },
//   redirect: '/department/borrowed/borrowedMain',
//   hidden: true,
//   children: [
//     {
//       path: 'borrowedMain',
//       name: 'DepartmentBorrowedMain',
//       component: () => import('@/views/department/borrowed/index'),
//       meta: { title: '借还管理', breadcrumb: false, activeMenu: '/department/borrowed/borrowedMain' }
//     },
//     {
//       path: 'borrow',
//       name: 'DepartmentBorrow',
//       component: () => import('@/views/department/borrowed/borrow'),
//       meta: { title: '借物申请', activeMenu: '/department/borrowed/borrowedMain' },
//       hidden: true
//     },
//     {
//       path: 'takeGoods',
//       name: 'DepartmentTakeGoods',
//       component: () => import('@/views/department/borrowed/takeGoods'),
//       meta: { title: '确认回收', activeMenu: '/department/borrowed/borrowedMain' },
//       hidden: true
//     },
//     {
//       path: 'returnGoods',
//       name: 'DepartmentReturnGoods',
//       component: () => import('@/views/department/borrowed/returnGoods'),
//       meta: { title: '还物申请', activeMenu: '/department/borrowed/borrowedMain' },
//       hidden: true
//     },
//     {
//       path: 'borrowedForm',
//       name: 'DepartmentBorrowedForm',
//       component: () => import('@/views/department/borrowed/form'),
//       meta: { title: '借物详细' },
//       hidden: true
//     }
//   ]
// },
