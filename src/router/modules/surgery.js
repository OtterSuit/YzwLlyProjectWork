export default [
  {
    path: 'apply',
    name: 'apply',
    component: () => import('@/views/surgery/index'),
    meta: { title: '申领管理' },
    redirect: '/surgery/apply/applyMain',
    children: [
      {
        path: 'applyMain',
        name: 'applyMain',
        component: () => import('@/views/surgery/apply/index'),
        meta: { title: '申领管理', breadcrumb: false, activeMenu: '/surgery/apply/applyMain' }
      },
      {
        path: 'applyDetails',
        name: 'applyDetails',
        component: () => import('@/views/surgery/apply/details'),
        meta: { title: '物品申领', activeMenu: '/surgery/apply/applyMain' },
        hidden: true
      },
      {
        path: 'applyForm',
        name: 'applyForm',
        component: () => import('@/views/surgery/apply/form'),
        meta: { title: '申领详细', activeMenu: '/surgery/apply/applyMain' },
        hidden: true
      }
    ]
  },
  {
    path: 'borrowed',
    name: 'borrowed',
    component: () => import('@/views/surgery/index'),
    meta: { title: '借还管理' },
    redirect: '/surgery/borrowed/borrowedMain',
    children: [
      {
        path: 'borrowedMain',
        name: 'borrowedMain',
        component: () => import('@/views/surgery/borrowed/index'),
        meta: { title: '借还管理', breadcrumb: false, activeMenu: '/surgery/borrowed/borrowedMain' }
      },
      {
        path: 'borrow',
        name: 'Borrow',
        component: () => import('@/views/surgery/borrowed/borrow'),
        meta: { title: '借物申请', activeMenu: '/surgery/borrowed/borrowedMain' },
        hidden: true
      },
      {
        path: 'takeGoods',
        name: 'takeGoods',
        component: () => import('@/views/surgery/borrowed/takeGoods'),
        meta: { title: '确认回收', activeMenu: '/surgery/borrowed/borrowedMain' },
        hidden: true
      },
      {
        path: 'returnGoods',
        name: 'returnGoods',
        component: () => import('@/views/surgery/borrowed/returnGoods'),
        meta: { title: '还物申请', activeMenu: '/surgery/borrowed/borrowedMain' },
        hidden: true
      },
      {
        path: 'borrowedForm',
        name: 'borrowedForm',
        component: () => import('@/views/surgery/borrowed/form'),
        meta: { title: '借物详细', activeMenu: '/surgery/borrowed/borrowedMain' },
        hidden: true
      }
    ]
  },
  {
    path: 'recycling',
    name: 'recycling',
    component: () => import('@/views/surgery/index'),
    meta: { title: '回收管理' },
    redirect: '/surgery/recycling/recyclingMain',
    children: [
      {
        path: 'recyclingMain',
        name: 'recyclingMain',
        component: () => import('@/views/surgery/recycling/index'),
        meta: { title: '回收管理', breadcrumb: false, activeMenu: '/surgery/recycling/recyclingMain' }
      },
      {
        path: 'recyclingForm',
        name: 'recyclingForm',
        component: () => import('@/views/surgery/recycling/form'),
        meta: { title: '回收申请', activeMenu: '/surgery/recycling/recyclingMain' },
        hidden: true
      },
      {
        path: 'delivery',
        name: 'delivery',
        component: () => import('@/views/surgery/recycling/delivery'),
        meta: { title: '发放', activeMenu: '/surgery/recycling/recyclingMain' },
        hidden: true
      },
      {
        path: 'recyclingDetails',
        name: 'recyclingDetails',
        component: () => import('@/views/surgery/recycling/details'),
        meta: { title: '回收详细', activeMenu: '/surgery/recycling/recyclingMain' },
        hidden: true
      }
    ]
  },
  {
    path: 'return',
    name: 'return',
    component: () => import('@/views/surgery/index'),
    meta: { title: '退回管理' },
    redirect: '/surgery/return/returnMain',
    children: [
      {
        path: 'returnMain',
        name: 'returnMain',
        component: () => import('@/views/surgery/return/index'),
        meta: { title: '退回管理', breadcrumb: false, activeMenu: '/surgery/return/returnMain' }
      },
      {
        path: 'returnForm',
        name: 'returnForm',
        component: () => import('@/views/surgery/return/form'),
        meta: { title: '退回申请', activeMenu: '/surgery/return/returnMain' },
        hidden: true
      },
      {
        path: 'returndelivery',
        name: 'returnDelivery',
        component: () => import('@/views/surgery/return/delivery'),
        meta: { title: '发放', activeMenu: '/surgery/return/returnMain' },
        hidden: true
      },
      {
        path: 'returnDetails',
        name: 'returnDetails',
        component: () => import('@/views/surgery/return/details'),
        meta: { title: '退回详细', activeMenu: '/surgery/return/returnMain' },
        hidden: true
      }
    ]
  }
]
