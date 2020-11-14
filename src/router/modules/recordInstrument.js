import store from '../../store'
export default [
  {
    path: 'index',
    meta: { title: '记录文书' },
    redirect: '/recordInstrument/patient'
  },
  {
    path: 'patient',
    name: 'Patient',
    component: () => import('@/views/recordInstrument/patient'),
    meta: { title: '患者信息', activeMenu: '/recordInstrument/index' },
    hidden: true,
    beforeEnter: (to, from, next) => {
      store.dispatch('settings/changeTagsView', false)
      store.dispatch('tagsView/delAllViews')
      next()
    }
  },
  {
    path: 'patientDetails',
    name: 'patientDetails',
    component: () => import('@/views/recordInstrument/index'),
    meta: { title: '记录详细' },
    hidden: true,
    redirect: '/recordInstrument/patientDetails/nursingRecords',
    beforeEnter: (to, from, next) => {
      store.dispatch('tagsView/setShowBack', true)
      store.dispatch('settings/changeTagsView', true)
      store.dispatch('tagsView/addView', [
        {
          title: '护理记录',
          path: '/recordInstrument/patientDetails/nursingRecords'
        },
        {
          title: '护理评估',
          path: '/recordInstrument/patientDetails/nursingAssessment'
        },
        {
          title: '巡视记录',
          path: '/recordInstrument/patientDetails/inspectionRecord'
        },
        {
          title: '健康教育',
          path: '/recordInstrument/patientDetails/healthyEducation'
        }
      ])
      next()
    },
    children: [
      {
        path: 'nursingRecords',
        name: 'nursingRecords',
        component: () => import('@/views/recordInstrument/nursingRecords/index'),
        meta: { title: '护理记录', activeMenu: '/recordInstrument/index' },
        hidden: true
      },
      {
        path: 'nursingAssessment',
        name: 'nursingAssessment',
        component: () => import('@/views/recordInstrument/nursingAssessment/index'),
        meta: { title: '护理评估', activeMenu: '/recordInstrument/index' },
        hidden: true
      },
      {
        path: 'inspectionRecord',
        name: 'inspectionRecord',
        component: () => import('@/views/recordInstrument/inspectionRecord/index'),
        meta: { title: '巡视记录', activeMenu: '/recordInstrument/index' },
        hidden: true
      },
      {
        path: 'healthyEducation',
        name: 'healthyEducation',
        component: () => import('@/views/recordInstrument/healthyEducation/index'),
        meta: { title: '健康教育', activeMenu: '/recordInstrument/index' },
        hidden: true
      }
    ]
  }
]
