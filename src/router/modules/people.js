import store from '../../store'
export default [
  {
    path: 'myArchives',
    component: () => import('@/views/people/myArchives/index'),
    name: 'MyArchives',
    meta: { title: '个人档案' },
    beforeEnter: (to, from, next) => {
      store.dispatch('settings/changeTagsView', false)
      store.dispatch('tagsView/delAllViews')
      next()
    }
  },
  {
    path: 'archives',
    name: 'Archives',
    component: () => import('@/views/people/index'),
    meta: { title: '档案管理' },
    redirect: '/people/archives/archivesStatus',
    children: [
      {
        path: 'archivesStatus',
        name: 'archivesStatus',
        component: () => import('@/views/people/archives/status/index'),
        meta: { title: '档案管理', breadcrumb: false },
        beforeEnter: (to, from, next) => {
          store.dispatch('settings/changeTagsView', false)
          store.dispatch('tagsView/delAllViews')
          next()
        }
      },
      {
        path: 'archivesBasic',
        name: 'archivesBasic',
        component: () => import('@/views/people/archives/basic/index'),
        meta: { title: '档案信息', activeMenu: '/people/archives/archivesStatus' },
        hidden: true,
        beforeEnter: (to, from, next) => {
          store.dispatch('tagsView/setShowBack', true)
          store.dispatch('settings/changeTagsView', true)
          store.dispatch('tagsView/delAllViews')
          next()
        }
      }
    ]
  },
  {
    path: 'infoChange',
    name: 'InfoChange',
    component: () => import('@/views/people/infoChange/index'),
    meta: { title: '信息变动' },
    beforeEnter: (to, from, next) => {
      store.dispatch('settings/changeTagsView', false)
      store.dispatch('tagsView/delAllViews')
      next()
    }
  },
  {
    path: 'trainee',
    name: 'Trainee',
    component: () => import('@/views/people/index'),
    meta: { title: '实习生管理' },
    redirect: '/people/trainee/rotate',
    beforeEnter: (to, from, next) => {
      store.dispatch('tagsView/setShowBack', false)
      store.dispatch('settings/changeTagsView', true)
      store.dispatch('tagsView/addView', [
        // {
        //   title: '档案管理',
        //   path: '/people/trainee/traineeArchives'
        // },
        // {
        //   title: '排班管理',
        //   path: '/people/trainee/schedule'
        // },
        // {
        //   title: '请假统计',
        //   path: '/people/trainee/leave'
        // },
        {
          title: '轮转计划',
          path: '/people/trainee/rotate'
        },
        {
          title: '考核安排',
          path: '/people/trainee/rotateAssess'
        },
        {
          title: '评价科室',
          path: '/people/trainee/departmentEvaluation'
        },
        {
          title: '评价实习生',
          path: '/people/trainee/traineeEvaluation'
        }
      ])
      next()
    },
    children: [
      // {
      //   path: 'traineeArchives',
      //   name: 'traineeArchives',
      //   component: () => import('@/views/people/trainee/archives/index'),
      //   meta: { title: '档案管理' },
      //   hidden: true
      // },
      // {
      //   path: 'schedule',
      //   name: 'schedule',
      //   component: () => import('@/views/people/trainee/schedule/index'),
      //   meta: { title: '排班管理' },
      //   hidden: true
      // },
      // {
      //   path: 'leave',
      //   name: 'leave',
      //   component: () => import('@/views/people/trainee/leave/index'),
      //   meta: { title: '请假统计' },
      //   hidden: true
      // },
      {
        path: 'rotate',
        name: 'rotate',
        component: () => import('@/views/people/trainee/plan'),
        meta: { title: '轮转计划', activeMenu: '/people/trainee' },
        hidden: true
      },
      {
        path: 'rotateAssess',
        name: 'rotateAssess',
        component: () => import('@/views/people/trainee/assess'),
        meta: { title: '考核安排', activeMenu: '/people/trainee' },
        hidden: true
      },
      {
        path: 'departmentEvaluation',
        name: 'departmentEvaluation',
        component: () => import('@/views/people/trainee/evaluate1'),
        meta: { title: '评价科室', activeMenu: '/people/trainee' },
        hidden: true
      },
      {
        path: 'traineeEvaluation',
        name: 'traineeEvaluation',
        component: () => import('@/views/people/trainee/evaluate2'),
        meta: { title: '评价实习生', activeMenu: '/people/trainee' },
        hidden: true
      }
    ]
  },
  {
    path: 'advance',
    name: 'Advance',
    component: () => import('@/views/people/index'),
    meta: { title: '进修生管理' },
    redirect: '/people/advance/advanceRotate',
    beforeEnter: (to, from, next) => {
      store.dispatch('tagsView/setShowBack', false)
      store.dispatch('settings/changeTagsView', true)
      store.dispatch('tagsView/addView', [
        // {
        //   title: '档案管理',
        //   path: '/people/advance/advanceArchives'
        // },
        // {
        //   title: '排班管理',
        //   path: '/people/advance/advanceSchedule'
        // },
        // {
        //   title: '请假统计',
        //   path: '/people/advance/advanceLeave'
        // },
        {
          title: '轮转计划',
          path: '/people/advance/advanceRotate'
        },
        {
          title: '考核安排',
          path: '/people/advance/advanceAssess'
        },
        {
          title: '评价科室',
          path: '/people/advance/departmentAdvance'
        },
        {
          title: '评价进修生',
          path: '/people/advance/advanceEvaluation'
        }
      ])
      next()
    },
    children: [
      // {
      //   path: 'advanceArchives',
      //   name: 'advanceArchives',
      //   component: () => import('@/views/people/advance/archives/index'),
      //   meta: { title: '档案管理' },
      //   hidden: true
      // },
      // {
      //   path: 'advanceSchedule',
      //   name: 'advanceSchedule',
      //   component: () => import('@/views/people/advance/schedule/index'),
      //   meta: { title: '排班管理' },
      //   hidden: true
      // },
      // {
      //   path: 'advanceLeave',
      //   name: 'advanceLeave',
      //   component: () => import('@/views/people/advance/leave/index'),
      //   meta: { title: '请假统计' },
      //   hidden: true
      // },
      {
        path: 'advanceRotate',
        name: 'dvanceRotate',
        component: () => import('@/views/people/advance/plan'),
        meta: { title: '轮转计划', activeMenu: '/people/advance' },
        hidden: true
      },
      {
        path: 'advanceAssess',
        name: 'advanceAssess',
        component: () => import('@/views/people/advance/assess'),
        meta: { title: '考核安排', activeMenu: '/people/advance' },
        hidden: true
      },
      {
        path: 'departmentAdvance',
        name: 'departmentAdvance',
        component: () => import('@/views/people/advance/evaluate1'),
        meta: { title: '评价科室', activeMenu: '/people/advance' },
        hidden: true
      },
      {
        path: 'advanceEvaluation',
        name: 'advanceEvaluation',
        component: () => import('@/views/people/advance/evaluate2'),
        meta: { title: '评价进修生', activeMenu: '/people/advance' },
        hidden: true
      }
    ]
  },
  {
    path: 'credential',
    name: 'Credential',
    component: () => import('@/views/people/credential/index'),
    meta: { title: '护士证书' },
    beforeEnter: (to, from, next) => {
      store.dispatch('settings/changeTagsView', false)
      store.dispatch('tagsView/delAllViews')
      next()
    }
  },
  {
    path: 'performance',
    name: 'Performance',
    component: () => import('@/views/people/index'),
    meta: { title: '绩效管理' },
    redirect: '/people/performance/personal',
    beforeEnter: (to, from, next) => {
      // store.dispatch('tagsView/setShowBack', false)
      // store.dispatch('settings/changeTagsView', true)
      store.dispatch('tagsView/addView', [
        {
          title: '个人绩效',
          path: '/people/performance/personal'
        },
        {
          title: '绩效考核',
          path: '/people/performance/assess/assessMain'
        },
        {
          title: '护士长绩效',
          path: '/people/performance/headNursing/headNursingMain'
        },
        {
          title: '奖惩记录',
          path: '/people/performance/rewards'
        },
        {
          title: '惩罚记录',
          path: '/people/performance/punishment'
        }
      ])
      next()
    },
    children: [
      {
        path: 'personal',
        name: 'personal',
        component: () => import('@/views/people/performance/personal/index'),
        meta: { title: '个人绩效', activeMenu: '/people/performance' },
        hidden: true,
        beforeEnter: (to, from, next) => {
          store.dispatch('tagsView/setShowBack', false)
          store.dispatch('settings/changeTagsView', true)
          next()
        }
      },
      {
        path: 'assess',
        name: 'assess',
        component: () => import('@/views/people/index'),
        meta: { title: '绩效考核' },
        redirect: '/people/performance/assess/assessMain',
        hidden: true,
        children: [
          {
            path: 'assessMain',
            name: 'assessMain',
            component: () => import('@/views/people/performance/assess/index'),
            meta: { title: '绩效考核', breadcrumb: false, activeMenu: '/people/performance' },
            beforeEnter: (to, from, next) => {
              store.dispatch('tagsView/setShowBack', false)
              store.dispatch('settings/changeTagsView', true)
              next()
            }
          },
          {
            path: 'assessBasic/:id/:type',
            name: 'assessBasic',
            component: () => import('@/views/people/performance/assess/basic/index'),
            meta: { title: '考核详情', activeMenu: '/people/performance', activeTagsView: '/people/performance/assess/assessMain' },
            beforeEnter: (to, from, next) => {
              store.dispatch('tagsView/setShowBack', true)
              store.dispatch('settings/changeTagsView', true)
              next()
            }
          },
          {
            path: 'indicators',
            name: 'indicators',
            component: () => import('@/views/people/performance/assess/indicators/index'),
            meta: { title: '指标管理', activeMenu: '/people/performance', activeTagsView: '/people/performance/assess/assessMain' },
            beforeEnter: (to, from, next) => {
              store.dispatch('tagsView/setShowBack', true)
              store.dispatch('settings/changeTagsView', true)
              next()
            }
          }
        ]
      },
      {
        path: 'headNursing',
        name: 'headNursing',
        redirect: '/people/performance/headNursing/headNursingMain',
        component: () => import('@/views/people/index'),
        meta: { title: '护士长绩效' },
        hidden: true,
        children: [
          {
            path: 'headNursingMain',
            name: 'headNursingMain',
            component: () => import('@/views/people/performance/headNursing/index'),
            meta: { title: '护士长绩效', breadcrumb: false, activeMenu: '/people/performance' },
            beforeEnter: (to, from, next) => {
              store.dispatch('tagsView/setShowBack', false)
              store.dispatch('settings/changeTagsView', true)
              next()
            }
          },
          {
            path: 'headNursingDetails',
            name: 'headNursingDetails',
            component: () => import('@/views/people/performance/headNursing/detail/index'),
            meta: { title: '绩效详细', activeMenu: '/people/performance' },
            beforeEnter: (to, from, next) => {
              store.dispatch('tagsView/setShowBack', true)
              store.dispatch('settings/changeTagsView', true)
              next()
            }
          }
        ]
      },
      {
        path: 'rewards',
        name: 'rewards',
        component: () => import('@/views/people/performance/award/index'),
        meta: { title: '奖励记录', activeMenu: '/people/performance' },
        hidden: true,
        beforeEnter: (to, from, next) => {
          store.dispatch('tagsView/setShowBack', false)
          store.dispatch('settings/changeTagsView', true)
          next()
        }
      },
      {
        path: 'punishment',
        name: 'punishment',
        component: () => import('@/views/people/performance/punishment/index'),
        meta: { title: '惩罚记录', activeMenu: '/people/performance' },
        hidden: true,
        beforeEnter: (to, from, next) => {
          store.dispatch('tagsView/setShowBack', false)
          store.dispatch('settings/changeTagsView', true)
          next()
        }
      }
    ]
  },
  {
    path: 'hierarchy',
    name: 'Hierarchy',
    component: () => import('@/views/people/index'),
    meta: { title: '层级管理' },
    redirect: '/people/hierarchy/highQuality',
    beforeEnter: (to, from, next) => {
      store.dispatch('tagsView/setShowBack', false)
      store.dispatch('settings/changeTagsView', true)
      store.dispatch('tagsView/addView', [
        {
          title: '最高学历分析',
          path: '/people/hierarchy/highQuality'
        },
        {
          title: '年龄结构分析',
          path: '/people/hierarchy/age'
        },
        {
          title: '职称分析',
          path: '/people/hierarchy/hierarchyLevel'
        },
        {
          title: '层级结构分析',
          path: '/people/hierarchy/profession'
        },
        {
          title: '男女比例',
          path: '/people/hierarchy/boyAndGirl'
        },
        {
          title: '离职率',
          path: '/people/hierarchy/resign'
        },
        {
          title: '岗位分布',
          path: '/people/hierarchy/post'
        }
      ])
      next()
    },
    children: [
      {
        path: 'highQuality',
        name: 'highQuality',
        component: () => import('@/views/people/hierarchy/highQuality/index'),
        meta: { title: '最高学历分析', activeMenu: '/people/hierarchy' },
        hidden: true
      },
      {
        path: 'age',
        name: 'age',
        component: () => import('@/views/people/hierarchy/age/index'),
        meta: { title: '年龄结构分析', activeMenu: '/people/hierarchy' },
        hidden: true
      },
      {
        path: 'hierarchyLevel',
        name: 'hierarchyLevel',
        component: () => import('@/views/people/hierarchy/level/index'),
        meta: { title: '职称分析', activeMenu: '/people/hierarchy' },
        hidden: true
      },
      {
        path: 'profession',
        name: 'profession',
        component: () => import('@/views/people/hierarchy/profession/index'),
        meta: { title: '层级结构分析', activeMenu: '/people/hierarchy' },
        hidden: true
      },
      {
        path: 'boyAndGirl',
        name: 'boyAndGirl',
        component: () => import('@/views/people/hierarchy/boyAndGirl/index'),
        meta: { title: '男女比例', activeMenu: '/people/hierarchy' },
        hidden: true
      },
      {
        path: 'resign',
        name: 'resign',
        component: () => import('@/views/people/hierarchy/resign/index'),
        meta: { title: '离职率', activeMenu: '/people/hierarchy' },
        hidden: true
      },
      {
        path: 'post',
        name: 'post',
        component: () => import('@/views/people/hierarchy/post/index'),
        meta: { title: '岗位分布', activeMenu: '/people/hierarchy' },
        hidden: true
      }
    ]
  }
]
