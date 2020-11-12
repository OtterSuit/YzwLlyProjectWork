export default [
  {
    path: 'recoverList',
    name: 'RecoverList',
    component: () => import('@/views/recover/index'),
    meta: { title: '回收任务' },
    redirect: '/recover/recoverList/recoverListMain',
    children: [
      {
        path: 'recoverListMain',
        name: 'recoverListMain',
        component: () => import('@/views/recover/recoverList/index'),
        meta: { title: '回收任务', breadcrumb: false }
      },
      {
        path: 'particulars',
        name: 'recoverParticulars',
        component: () => import('@/views/recover/particulars/index'),
        meta: { title: '申请单详情' },
        hidden: true
      }
    ]
  },
  {
    path: 'recycled',
    name: 'Recycled',
    component: () => import('@/views/recover/index'),
    meta: { title: '已回收' },
    redirect: '/recover/recycled/recycledMain',
    children: [
      {
        path: 'recycledMain',
        name: 'recycledMain',
        component: () => import('@/views/recover/recycled/index'),
        meta: { title: '已回收', breadcrumb: false }
      },
      {
        path: 'particulars',
        name: 'recycledParticulars',
        component: () => import('@/views/recover/particulars/index'),
        meta: { title: '申请单详情' },
        hidden: true
      }
    ]
  },
  {
    path: 'defect',
    name: 'Defect',
    component: () => import('@/views/recover/index'),
    meta: { title: '缺损记录' },
    redirect: '/recover/defect/defectMain',
    children: [
      {
        path: 'defectMain',
        name: 'defectMain',
        component: () => import('@/views/recover/defect/index'),
        meta: { title: '缺损记录', breadcrumb: false }
      },
      {
        path: 'particulars',
        name: 'defectParticulars',
        component: () => import('@/views/recover/particulars/index'),
        meta: { title: '申请单详情' },
        hidden: true
      }
    ]
  }
]

