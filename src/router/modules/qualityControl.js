import store from '../../store'
export default [
  {
    path: 'three',
    name: 'Three',
    component: () => import('@/views/qualityControl/index'),
    meta: { title: '三级质控' },
    redirect: '/qualityControl/three/qualityControl',
    beforeEnter: (to, from, next) => {
      store.dispatch('tagsView/setShowBack', false)
      store.dispatch('settings/changeTagsView', true)
      store.dispatch('tagsView/addView', [
        {
          title: '三级质控要求',
          path: '/qualityControl/three/qualityControl'
        },
        {
          title: '质量问题汇总',
          path: '/qualityControl/three/summaryQuality'
        },
        {
          title: '质量检查计划',
          path: '/qualityControl/three/otherQuality'
        }
      ])
      next()
    },
    children: [
      {
        path: 'qualityControl',
        name: 'qualityControl',
        component: () => import('@/views/qualityControl/three/qualityControl/index'),
        meta: { title: '三级质控要求', activeMenu: '/qualityControl/three' },
        hidden: true
      },
      {
        path: 'summaryQuality',
        name: 'summaryQuality',
        component: () => import('@/views/qualityControl/three/summaryQuality/index'),
        meta: { title: '质量问题汇总', activeMenu: '/qualityControl/three' },
        hidden: true
      },
      {
        path: 'otherQuality',
        name: 'otherQuality',
        component: () => import('@/views/qualityControl/three/otherQuality/index'),
        meta: { title: '质量检查计划', activeMenu: '/qualityControl/three' },
        hidden: true
      }
    ]
  },
  {
    path: 'sensitive',
    name: 'Sensitive',
    component: () => import('@/views/qualityControl/systematics/index'),
    meta: { title: '敏感指标统计' },
    beforeEnter: (to, from, next) => {
      store.dispatch('settings/changeTagsView', false)
      store.dispatch('tagsView/delAllViews')
      next()
    }
  },
  {
    path: 'forward',
    name: 'Forward',
    component: () => import('@/views/qualityControl/forward/index'),
    meta: { title: '前瞻性质量管理' },
    beforeEnter: (to, from, next) => {
      store.dispatch('settings/changeTagsView', false)
      store.dispatch('tagsView/delAllViews')
      next()
    }
  }
]
