export default [
  {
    path: 'packagePrint',
    name: 'packagePrint',
    component: () => import('@/views/print/packagePrint')
  },
  {
    path: 'personPrint',
    name: 'personPrint',
    component: () => import('@/views/print/personPrint')
  },
  {
    path: 'equipmentPrint',
    name: 'equipmentPrint',
    component: () => import('@/views/print/equipmentPrint')
  },
  {
    path: 'antiPrint',
    name: 'antiPrint',
    component: () => import('@/views/print/antiPrint')
  }
]
