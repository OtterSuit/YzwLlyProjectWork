export default [
  {
    path: 'orderManagement',
    name: 'OrderManagement',
    component: () => import('@/views/warehouse/index'),
    meta: { title: '订单管理', parent: 'Warehouse' },
    redirect: '/warehouse/orderManagement/orderMain',
    children: [
      {
        path: 'orderMain',
        name: 'OrderMain',
        component: () => import('@/views/warehouse/orderManagement/index'),
        meta: { title: '订单管理', breadcrumb: false, activeMenu: '/warehouse/orderManagement/orderMain', permission: ['Warehouse', 'OrderManagement'] }
      },
      {
        path: 'orderDetail',
        name: 'OrderDetail',
        component: () => import('@/views/warehouse/orderManagement/orderDetail'),
        meta: { title: '订单详细', activeMenu: '/warehouse/orderManagement/orderMain', permission: ['Warehouse', 'OrderManagement'] },
        hidden: true
      },
      {
        path: 'packageDetail',
        name: 'OrderPackageDetail',
        component: () => import('@/views/warehouse/packageManagement/showPackage'),
        meta: { title: '订单包详细', activeMenu: '/warehouse/orderManagement/orderMain', permission: ['Warehouse', 'OrderManagement'] },
        hidden: true
      },
      {
        path: 'delivery',
        name: 'Delivery',
        component: () => import('@/views/warehouse/orderManagement/delivery'),
        meta: { title: '发放单', activeMenu: '/warehouse/orderManagement/orderMain', permission: ['Warehouse', 'OrderManagement'] },
        hidden: true
      }
    ]
  },
  {
    path: 'packageManagement',
    name: 'PackageManagement',
    component: () => import('@/views/warehouse/index'),
    redirect: '/warehouse/packageManagement/managementMain',
    meta: { title: '包管理', activeMenu: '/warehouse/packageManagement/managementMain', parent: 'Warehouse' },
    children: [
      {
        path: 'managementMain',
        name: 'ManagementMain',
        component: () => import('@/views/warehouse/packageManagement/index'),
        meta: { title: '包管理', breadcrumb: false, activeMenu: '/warehouse/packageManagement/managementMain', permission: ['Warehouse', 'PackageManagement'] }
      },
      {
        path: 'newPackage',
        name: 'NewPackage',
        component: () => import('@/views/warehouse/packageManagement/newPackage'),
        meta: { title: '创建新包', activeMenu: '/warehouse/packageManagement/managementMain', permission: ['Warehouse', 'PackageManagement'] },
        hidden: true
      },
      {
        path: 'packageMain',
        name: 'PackageMain',
        component: () => import('@/views/warehouse/index'),
        meta: { title: '包详细', activeMenu: '/warehouse/packageManagement/managementMain' },
        redirect: '/warehouse/packageManagement/packageMain/showPackage',
        hidden: true,
        children: [
          {
            path: 'showPackage',
            name: 'ShowPackage',
            component: () => import('@/views/warehouse/packageManagement/showPackage'),
            meta: { title: '包详细', breadcrumb: false, activeMenu: '/warehouse/packageManagement/managementMain', permission: ['Warehouse', 'PackageManagement'] },
            hidden: true
          },
          {
            path: 'packageDetail',
            name: 'PackageDetail',
            component: () => import('@/views/warehouse/packageManagement/packageDetail'),
            meta: { title: '包明细', activeMenu: '/warehouse/packageManagement/managementMain', permission: ['Warehouse', 'PackageManagement'] },
            hidden: true
          }
        ]
      }
    ]
  }
  /* {
    path: 'equipment',
    name: 'Equipment',
    component: () => import('@/views/warehouse/index'),
    meta: { title: '器械管理' },
    redirect: '/warehouse/equipment/equipmentMain',
    hidden: true,
    children: [
      {
        path: 'equipmentMain',
        name: 'equipmentMain',
        component: () => import('@/views/warehouse/equipment/index'),
        meta: { title: '器械管理', breadcrumb: false, activeMenu: '/warehouse/equipment/equipmentMain' }
      },
      {
        path: 'equipmentDetail',
        name: 'equipmentDetail',
        component: () => import('@/views/warehouse/equipment/details'),
        meta: { title: '器械详情', activeMenu: '/warehouse/equipment/equipmentMain' },
        hidden: true
      }
    ]
  },
  {
    path: 'ioRecord',
    name: 'IoRecord',
    component: () => import('@/views/warehouse/iorecord/index'),
    meta: { title: '出/入库记录' },
    hidden: true
  },
  {
    path: 'inventoryRecord',
    name: 'InventoryRecord',
    component: () => import('@/views/warehouse/inventoryRecord/index'),
    meta: { title: '盘点记录' },
    hidden: true
  }*/
]

