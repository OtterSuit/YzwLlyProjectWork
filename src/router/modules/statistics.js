import store from '../../store'
export default [
  {
    path: 'adverse',
    component: () => import('@/views/statistics/adverse'),
    name: 'Adverse',
    meta: { title: '不良事件' },
    redirect: '/statistics/adverse/bad',
    beforeEnter: (to, from, next) => {
      store.dispatch('settings/changeTagsView', true)
      store.dispatch('tagsView/setShowBack', false)
      store.dispatch('tagsView/addView', [
        {
          title: '数量统计',
          path: '/statistics/adverse/bad'
        },
        {
          title: '科室分布',
          path: '/statistics/adverse/department'
        },
        {
          title: '分级分布',
          path: '/statistics/adverse/level'
        },
        {
          title: '发生地点',
          path: '/statistics/adverse/place'
        },
        {
          title: '发生时间',
          path: '/statistics/adverse/occurTime'
        }
      ])
      next()
    },
    children: [
      {
        path: 'bad',
        name: 'bad',
        component: () => import('@/views/statistics/adverse/bad/index'),
        meta: { title: '数量统计', activeMenu: '/statistics/adverse' },
        hidden: true
      },
      {
        path: 'department',
        name: 'department',
        component: () => import('@/views/statistics/adverse/department/index'),
        meta: { title: '科室分布', activeMenu: '/statistics/adverse' },
        hidden: true
      },
      {
        path: 'level',
        name: 'level',
        component: () => import('@/views/statistics/adverse/level/index'),
        meta: { title: '分级分布', activeMenu: '/statistics/adverse' },
        hidden: true
      },
      {
        path: 'place',
        name: 'place',
        component: () => import('@/views/statistics/adverse/place/index'),
        meta: { title: '发生地点', activeMenu: '/statistics/adverse' },
        hidden: true
      },
      {
        path: 'occurTime',
        name: 'occurTime',
        component: () => import('@/views/statistics/adverse/occurTime/index'),
        meta: { title: '发生时间', activeMenu: '/statistics/adverse' },
        hidden: true
      }
    ]
  },
  {
    path: 'risk',
    component: () => import('@/views/statistics/risk'),
    name: 'Risk',
    meta: { title: '风险事项' },
    beforeEnter: (to, from, next) => {
      store.dispatch('settings/changeTagsView', false)
      store.dispatch('tagsView/delAllViews')
      next()
    }
  },
  {
    path: 'fall',
    component: () => import('@/views/statistics/fall'),
    name: 'Fall',
    redirect: '/statistics/fall/month',
    meta: { title: '跌倒专项' },
    beforeEnter: (to, from, next) => {
      store.dispatch('tagsView/setShowBack', false)
      store.dispatch('settings/changeTagsView', true)
      store.dispatch('tagsView/addView', [
        {
          title: '每月发生数量',
          path: '/statistics/fall/month'
        },
        {
          title: '每月病区数量',
          path: '/statistics/fall/ward'
        },
        {
          title: '患者类型',
          path: '/statistics/fall/patient'
        },
        {
          title: '跌倒地点',
          path: '/statistics/fall/fallPlace'
        },
        {
          title: '床栏使用',
          path: '/statistics/fall/rail'
        },
        {
          title: '跌倒程度',
          path: '/statistics/fall/degree'
        }
      ])
      next()
    },
    children: [
      {
        path: 'month',
        name: 'month',
        component: () => import('@/views/statistics/fall/month/index'),
        meta: { title: '每月发生数量', activeMenu: '/statistics/fall' },
        hidden: true
      },
      {
        path: 'ward',
        name: 'ward',
        component: () => import('@/views/statistics/fall/ward/index'),
        meta: { title: '每月病区数量', activeMenu: '/statistics/fall' },
        hidden: true
      },
      {
        path: 'patient',
        name: 'patient',
        component: () => import('@/views/statistics/fall/patient/index'),
        meta: { title: '患者类型', activeMenu: '/statistics/fall' },
        hidden: true
      },
      {
        path: 'fallPlace',
        name: 'fallPlace',
        component: () => import('@/views/statistics/fall/place/index'),
        meta: { title: '跌倒地点', activeMenu: '/statistics/fall' },
        hidden: true
      },
      {
        path: 'rail',
        name: 'rail',
        component: () => import('@/views/statistics/fall/rail/index'),
        meta: { title: '床栏使用', activeMenu: '/statistics/fall' },
        hidden: true
      },
      {
        path: 'degree',
        name: 'degree',
        component: () => import('@/views/statistics/fall/degree/index'),
        meta: { title: '跌倒程度', activeMenu: '/statistics/fall' },
        hidden: true
      }
    ]
  },
  {
    path: 'quality',
    component: () => import('@/views/statistics/quality'),
    name: 'Quality',
    meta: { title: '质量指标' },
    beforeEnter: (to, from, next) => {
      store.dispatch('settings/changeTagsView', false)
      store.dispatch('tagsView/delAllViews')
      next()
    }
  },
  {
    path: 'personnel',
    component: () => import('@/views/statistics/personnel'),
    name: 'Personnel',
    meta: { title: '人员构成' },
    beforeEnter: (to, from, next) => {
      store.dispatch('settings/changeTagsView', false)
      store.dispatch('tagsView/delAllViews')
      next()
    }
  },
  {
    path: 'educationJoin',
    component: () => import('@/views/statistics/educationJoin'),
    name: 'EducationJoin',
    meta: { title: '教育培训' },
    beforeEnter: (to, from, next) => {
      store.dispatch('settings/changeTagsView', false)
      store.dispatch('tagsView/delAllViews')
      next()
    }
  },
  {
    path: 'satisfactionLook',
    component: () => import('@/views/statistics/satisfactionLook'),
    name: 'SatisfactionLook',
    meta: { title: '满意度调查' },
    beforeEnter: (to, from, next) => {
      store.dispatch('settings/changeTagsView', false)
      store.dispatch('tagsView/delAllViews')
      next()
    }
  }
]
