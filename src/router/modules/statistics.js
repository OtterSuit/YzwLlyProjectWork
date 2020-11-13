export default [
  {
    path: 'supply',
    name: 'Supply',
    component: () => import('@/views/statistics/supply/index'),
    meta: { title: '供应室按科室汇总查询' }
  },
  {
    path: 'package',
    name: 'PackageRecover',
    component: () => import('@/views/statistics/package/index'),
    meta: { title: '包回收统计汇总表' }
  },
  {
    path: 'retrieve',
    name: 'Retrieve',
    component: () => import('@/views/statistics/retrieve/index'),
    meta: { title: '科室回收申请' }
  },
  {
    path: 'stock',
    name: 'Stock',
    component: () => import('@/views/statistics/stock/index'),
    meta: { title: '科室库存查询' }
  },
  {
    path: 'clean',
    name: 'Clean',
    component: () => import('@/views/statistics/clean/index'),
    meta: { title: '根据物品查询清洗标记' }
  },
  {
    path: 'sterilization',
    name: 'Sterilization',
    component: () => import('@/views/statistics/sterilization/index'),
    meta: { title: '灭菌确认未灭菌确认查询' }
  },
  {
    path: 'status',
    name: 'Status',
    component: () => import('@/views/statistics/status/index'),
    meta: { title: '每日包状态查询' }
  },
  {
    path: 'trace',
    name: 'statisticsTrace',
    component: () => import('@/views/statistics/trace/index'),
    meta: { title: '追溯查询' }
  }
]
