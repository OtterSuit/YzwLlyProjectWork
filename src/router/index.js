import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import home from './modules/home'
import statistics from './modules/statistics'
import people from './modules/people'
import arrange from './modules/arrange'
import qualityControl from './modules/qualityControl'
import reportManagement from './modules/reportManagement'
import recordInstrument from './modules/recordInstrument'
import education from './modules/education'
import satisfaction from './modules/satisfaction'
import systemSettings from './modules/systemSettings'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/survey',
    component: () => import('@/views/satisfaction/survey/index'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [...home]
  },

  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/adverse/bad',
    name: 'Statistics',
    meta: { title: '数据统计', icon: 'el-icon-s-data' },
    children: [...statistics]
  },
  {
    path: '/people',
    component: Layout,
    redirect: '/people/myArchives',
    name: 'People',
    meta: {
      title: '人员管理',
      icon: 'peoples'
    },
    children: [...people]
  },

  {
    path: '/arrange',
    component: Layout,
    redirect: '/arrange/require/requireDemand',
    name: 'Arrange',
    meta: { title: '排班管理', icon: 'paiban' },
    children: [...arrange]
  },

  {
    path: '/qualityControl',
    component: Layout,
    redirect: '/qualityControl/three/qualityControl',
    name: 'QualityControl',
    meta: { title: '质量管理', icon: 'zhiliang' },
    hidden: false,
    children: [...qualityControl]
  },

  {
    path: '/reportManagement',
    component: Layout,
    redirect: '/reportManagement/report',
    name: 'ReportManagement',
    meta: { title: '不良事件', icon: 'shangbao' },
    children: [...reportManagement]
  },

  {
    path: '/recordInstrument',
    redirect: '/recordInstrument/index',
    name: 'RecordInstrument',
    meta: { title: '记录文书', icon: 'form' },
    component: Layout,
    children: [...recordInstrument]
  },

  {
    path: '/education',
    component: Layout,
    redirect: '/education/myEdu',
    name: 'Education',
    meta: { title: '教育培训', icon: 'jiaoyu' },
    children: [...education]
  },

  {
    path: '/satisfaction',
    name: 'Satisfaction',
    component: Layout,
    redirect: '/satisfaction/questionnaire',
    meta: { title: '满意度调查', icon: 'manyidu' },
    children: [...satisfaction]
  },

  {
    path: '/systemSettings',
    component: Layout,
    redirect: '/systemSettings/myInfo',
    name: 'systemSettings',
    meta: { title: '系统设置', icon: 'el-icon-s-tools' },
    children: [...systemSettings]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
