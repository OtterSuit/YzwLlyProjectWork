export default [
  {
    path: 'orderManagement',
    name: 'OrderManagement',
    component: () => import('@/views/warehouse/index'),
    meta: { title: '订单管理' },
    redirect: '/warehouse/orderManagement/orderMain',
    children: [
      {
        path: 'orderMain',
        name: 'OrderMain',
        component: () => import('@/views/warehouse/orderManagement/index'),
        meta: { title: '订单管理', breadcrumb: false }
      },
      {
        path: 'orderDetail',
        name: 'OrderDetail',
        component: () => import('@/views/warehouse/orderManagement/orderDetail'),
        meta: { title: '订单详细' },
        hidden: true
      },
      {
        path: 'packageDetail',
        name: 'OrderPackageDetail',
        component: () => import('@/views/warehouse/packageManagement/showPackage'),
        meta: { title: '订单包详细' },
        hidden: true
      },
      {
        path: 'delivery',
        name: 'Delivery',
        component: () => import('@/views/warehouse/orderManagement/delivery'),
        meta: { title: '发货单' },
        hidden: true
      }
    ]
  },
  {
    path: 'packageManagement',
    name: 'PackageManagement',
    component: () => import('@/views/warehouse/index'),
    redirect: '/warehouse/packageManagement/managementMain',
    meta: { title: '包管理' },
    children: [
      {
        path: 'managementMain',
        name: 'ManagementMain',
        component: () => import('@/views/warehouse/packageManagement/index'),
        meta: { title: '包管理', breadcrumb: false }
      },
      {
        path: 'newPackage',
        name: 'NewPackage',
        component: () => import('@/views/warehouse/packageManagement/newPackage'),
        meta: { title: '创建新包' },
        hidden: true
      },
      {
        path: 'packageMain',
        name: 'PackageMain',
        component: () => import('@/views/warehouse/index'),
        meta: { title: '糖足包' },
        redirect: '/warehouse/packageManagement/packageMain/showPackage',
        hidden: true,
        children: [
          {
            path: 'showPackage',
            name: 'ShowPackage',
            component: () => import('@/views/warehouse/packageManagement/showPackage'),
            meta: { title: '糖足包', breadcrumb: false },
            hidden: true
          },
          {
            path: 'packageDetail',
            name: 'PackageDetail',
            component: () => import('@/views/warehouse/packageManagement/packageDetail'),
            meta: { title: '包明细' },
            hidden: true
          }
        ]
      }
    ]
  },
  {
    path: 'equipment',
    name: 'Equipment',
    component: () => import('@/views/warehouse/index'),
    meta: { title: '器械管理' },
    redirect: '/warehouse/equipment/equipmentMain',
    children: [
      {
        path: 'equipmentMain',
        name: 'equipmentMain',
        component: () => import('@/views/warehouse/equipment/index'),
        meta: { title: '器械管理', breadcrumb: false }
      },
      {
        path: 'equipmentDetail',
        name: 'equipmentDetail',
        component: () => import('@/views/warehouse/equipment/details'),
        meta: { title: '器械详情' },
        hidden: true
      }
    ]
  },
  {
    path: 'ioRecord',
    name: 'IoRecord',
    component: () => import('@/views/warehouse/iorecord/index'),
    meta: { title: '出/入库记录' }
  },
  {
    path: 'inventoryRecord',
    name: 'InventoryRecord',
    component: () => import('@/views/warehouse/inventoryRecord/index'),
    meta: { title: '盘点记录' },
    hidden: true
  }

]

