import store from '../../store'
export default [
  {
    path: 'myEdu',
    name: 'MyEdu',
    component: () => import('@/views/education/index'),
    meta: { title: '我的培训' },
    redirect: '/education/myEdu/myEduTable',
    children: [
      {
        path: 'myEduTable',
        name: 'myEduTable',
        component: () => import('@/views/education/myEdu/index'),
        meta: { title: '我的培训', breadcrumb: false },
        beforeEnter: (to, from, next) => {
          store.dispatch('settings/changeTagsView', false)
          store.dispatch('tagsView/delAllViews')
          next()
        }
      },
      {
        path: 'myEduMain/:id',
        name: 'myEduMain',
        component: () => import('@/views/education/myEdu/exam'),
        meta: { title: '考试详细', activeMenu: '/education/myEdu/myEduTable' },
        hidden: true,
        beforeEnter: (to, from, next) => {
          store.dispatch('tagsView/setShowBack', true)
          store.dispatch('settings/changeTagsView', true)
          store.dispatch('tagsView/delAllViews')
          next()
        }
      },
      {
        path: 'doExam/:id',
        name: 'doExam',
        component: () => import('@/views/education/myEdu/doExam'),
        meta: { title: '进行考试', activeMenu: '/education/myEdu/myEduTable' },
        hidden: true,
        beforeEnter: (to, from, next) => {
          store.dispatch('settings/changeTagsView', false)
          store.dispatch('tagsView/delAllViews')
          next()
        }
      }
    ]
  },
  {
    path: 'continuing',
    name: 'Continuing',
    component: () => import('@/views/education/continuing'),
    meta: { title: '继续教育' },
    beforeEnter: (to, from, next) => {
      store.dispatch('settings/changeTagsView', false)
      store.dispatch('tagsView/delAllViews')
      next()
    }
  },
  {
    path: 'exam',
    name: 'Exam',
    component: () => import('@/views/education/index'),
    meta: { title: '考试管理' },
    redirect: '/education/exam/examTable',
    children: [
      {
        path: 'examTable',
        name: 'examTable',
        component: () => import('@/views/education/exam/index'),
        meta: { title: '考试管理', breadcrumb: false },
        beforeEnter: (to, from, next) => {
          store.dispatch('settings/changeTagsView', false)
          store.dispatch('tagsView/delAllViews')
          next()
        }
      },
      {
        path: 'examAdd',
        name: 'examAdd',
        component: () => import('@/views/education/exam/add'),
        meta: { title: '新建考试计划', activeMenu: '/education/exam/examTable' },
        hidden: true,
        beforeEnter: (to, from, next) => {
          store.dispatch('settings/changeTagsView', false)
          store.dispatch('tagsView/delAllViews')
          next()
        }
      },
      {
        path: 'examEdit/:id',
        name: 'examEdit',
        component: () => import('@/views/education/exam/edit'),
        meta: { title: '试卷编辑', activeMenu: '/education/exam/examTable' },
        hidden: true,
        beforeEnter: (to, from, next) => {
          store.dispatch('tagsView/setShowBack', true)
          store.dispatch('settings/changeTagsView', true)
          store.dispatch('tagsView/delAllViews')
          next()
        }
      },
      {
        path: 'specific',
        name: 'specific',
        component: () => import('@/views/education/index'),
        meta: { title: '考试详细' },
        redirect: 'noRedirect',
        hidden: true,
        children: [
          {
            path: 'specificMain/:id/:title',
            name: 'specificMain',
            meta: { title: '考试详细', breadcrumb: false, activeMenu: '/education/exam/examTable' },
            component: () => import('@/views/education/exam/specific/index'),
            beforeEnter: (to, from, next) => {
              store.dispatch('tagsView/setShowBack', true)
              store.dispatch('tagsView/setBackName', 'examTable')
              store.dispatch('settings/changeTagsView', true)
              store.dispatch('tagsView/delAllViews')
              next()
            }
          },
          {
            meta: { title: '试卷详细', activeMenu: '/education/exam/examTable' },
            path: 'examMain/:id',
            name: 'examMain',
            component: () => import('@/views/education/exam/specific/paper'),
            beforeEnter: (to, from, next) => {
              store.dispatch('tagsView/setShowBack', true)
              store.dispatch('settings/changeTagsView', true)
              store.dispatch('tagsView/delAllViews')
              next()
            }
          },
          {
            meta: { title: '试卷详细', activeMenu: '/education/exam/examTable' },
            path: 'personExamMain/:id',
            name: 'personExamMain',
            component: () => import('@/views/education/myEdu/exam'),
            beforeEnter: (to, from, next) => {
              store.dispatch('tagsView/setShowBack', true)
              store.dispatch('settings/changeTagsView', true)
              store.dispatch('tagsView/delAllViews')
              next()
            }
          },
          {
            meta: { title: '改卷', activeMenu: '/education/exam/examTable' },
            path: 'correctPaper/:id/:examId',
            name: 'correctPaper',
            component: () => import('@/views/education/exam/specific/correctPaper'),
            beforeEnter: (to, from, next) => {
              store.dispatch('tagsView/setShowBack', true)
              store.dispatch('settings/changeTagsView', true)
              store.dispatch('tagsView/delAllViews')
              next()
            }
          }
        ]
      }
    ]
  },
  {
    path: 'questionBank',
    name: 'QuestionBank',
    component: () => import('@/views/education/index'),
    meta: { title: '题库管理' },
    redirect: '/education/questionBank/questionMain',
    children: [
      {
        meta: { title: '题库管理', breadcrumb: false },
        path: 'questionMain',
        name: 'questionMain',
        component: () => import('@/views/education/questionBank/index'),
        beforeEnter: (to, from, next) => {
          store.dispatch('settings/changeTagsView', false)
          store.dispatch('tagsView/delAllViews')
          next()
        }
      },
      {
        meta: { title: '题库详情', activeMenu: '/education/questionBank/questionMain' },
        path: 'questionDetails/:id/:type/:title',
        name: 'questionDetails',
        hidden: true,
        component: () => import('@/views/education/questionBank/details'),
        beforeEnter: (to, from, next) => {
          store.dispatch('tagsView/setShowBack', true)
          store.dispatch('settings/changeTagsView', true)
          store.dispatch('tagsView/delAllViews')
          next()
        }
      }
    ]
  }
]
