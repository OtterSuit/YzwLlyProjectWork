export default [
  {
    path: 'outpatient',
    name: 'Outpatient',
    component: () => import('@/views/use/outpatient/index'),
    meta: { title: '患者使用登记（门诊）' }
  },
  {
    path: 'hospitalized',
    name: 'Hospitalized',
    component: () => import('@/views/use/hospitalized/index'),
    meta: { title: '患者使用登记（住院）' }
  }
]
