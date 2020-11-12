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
        meta: { title: '申领管理', breadcrumb: false }
      },
      {
        path: 'applyDetails',
        name: 'applyDetails',
        component: () => import('@/views/surgery/apply/details'),
        meta: { title: '物品申领' },
        hidden: true
      },
      {
        path: 'applyForm',
        name: 'applyForm',
        component: () => import('@/views/surgery/apply/form'),
        meta: { title: '申领详细' },
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
        meta: { title: '借还管理', breadcrumb: false }
      },
      {
        path: 'borrow',
        name: 'Borrow',
        component: () => import('@/views/surgery/borrowed/borrow'),
        meta: { title: '借物申请' },
        hidden: true
      },
      {
        path: 'takeGoods',
        name: 'takeGoods',
        component: () => import('@/views/surgery/borrowed/takeGoods'),
        meta: { title: '确认收货' },
        hidden: true
      },
      {
        path: 'returnGoods',
        name: 'returnGoods',
        component: () => import('@/views/surgery/borrowed/returnGoods'),
        meta: { title: '还物申请' },
        hidden: true
      },
      {
        path: 'borrowedForm',
        name: 'borrowedForm',
        component: () => import('@/views/surgery/borrowed/form'),
        meta: { title: '借物详细' },
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
        meta: { title: '回收管理', breadcrumb: false }
      },
      {
        path: 'recyclingForm',
        name: 'recyclingForm',
        component: () => import('@/views/surgery/recycling/form'),
        meta: { title: '回收申请' },
        hidden: true
      },
      {
        path: 'delivery',
        name: 'delivery',
        component: () => import('@/views/surgery/recycling/delivery'),
        meta: { title: '发货' },
        hidden: true
      },
      {
        path: 'recyclingDetails',
        name: 'recyclingDetails',
        component: () => import('@/views/surgery/recycling/details'),
        meta: { title: '回收详细' },
        hidden: true
      }
    ]
  },
  {
    path: 'return',
    name: 'return',
    component: () => import('@/views/surgery/index'),
    meta: { title: '退货管理' },
    redirect: '/surgery/return/returnMain',
    children: [
      {
        path: 'returnMain',
        name: 'returnMain',
        component: () => import('@/views/surgery/return/index'),
        meta: { title: '退货管理', breadcrumb: false }
      },
      {
        path: 'returnForm',
        name: 'returnForm',
        component: () => import('@/views/surgery/return/form'),
        meta: { title: '退货申请' },
        hidden: true
      },
      {
        path: 'returndelivery',
        name: 'returnDelivery',
        component: () => import('@/views/surgery/return/delivery'),
        meta: { title: '发货' },
        hidden: true
      },
      {
        path: 'returnDetails',
        name: 'returnDetails',
        component: () => import('@/views/surgery/return/details'),
        meta: { title: '退货详细' },
        hidden: true
      }
    ]
  }
]
