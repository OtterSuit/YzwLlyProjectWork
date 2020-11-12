import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import example from './example'
import bundle from './bundle'
import antisepsis from './antisepsis'
import surgery from './surgery'
import recover from './recover'
import disinfection from './disinfection'
import statistics from './statistics'
import systemSettings from './systemSettings'
import assembly from './assembly'
import warehouse from './warehouse'
import department from './department'
import trace from './trace'
import report from './report'

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
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/goods',
    name: 'Example',
    meta: { title: '基础数据', icon: 'jichu' },
    children: [...example]
  },
  {
    path: '/recover',
    component: Layout,
    redirect: '/recover/recoverList/recoverListMain',
    name: 'Recover',
    meta: { title: '器械回收', icon: 'huishou' },
    children: [...recover]
  },

  {
    path: '/disinfection',
    component: Layout,
    redirect: '/disinfection/mission',
    name: 'Disinfection',
    meta: { title: '清洗消毒', icon: 'qingxi' },
    children: [...disinfection]
  },
  {
    path: '/assembly',
    component: Layout,
    redirect: '/assembly/mission',
    name: 'Assembly',
    meta: { title: '审核装配', icon: 'zhuangpei' },
    children: [...assembly]
  },
  {
    path: '/bundle',
    component: Layout,
    redirect: '/bundle/audit',
    name: 'Bundle',
    meta: { title: '审核封包', icon: 'fengbao' },
    children: [...bundle]
  },
  {
    path: '/antisepsis',
    component: Layout,
    redirect: '/antisepsis/loading',
    name: 'Antisepsis',
    meta: { title: ' 灭菌', icon: 'miejun' },
    children: [...antisepsis]
  },
  {
    path: '/grant',
    component: Layout,
    children: [
      {
        path: 'grant',
        name: 'Grant',
        component: () => import('@/views/grant/index'),
        meta: { title: '发货', icon: 'fahuo' }
      }
    ],
    hidden: true
  },
  {
    path: '/surgery',
    component: Layout,
    redirect: '/surgery/apply/applyMain',
    name: 'Tree',
    meta: { title: '手术器械', icon: 'shoushu' },
    children: [...surgery]
  },
  {
    path: '/department',
    component: Layout,
    redirect: '/department/apply/applyMain',
    name: 'Department',
    meta: { title: '科室器械', icon: 'keshi' },
    children: [...department]
  },
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/supply',
    name: 'Statistics',
    meta: { title: '外来器械', icon: 'wailai' },
    children: [...statistics],
    hidden: true
  },
  {
    path: '/warehouse',
    component: Layout,
    redirect: '/warehouse/orderManagement/orderMain',
    name: 'Warehouse',
    meta: { title: '器械仓库', icon: 'cangku' },
    children: [...warehouse]
  },
  {
    path: '/trace',
    component: Layout,
    redirect: '/trace/traceList/traceMain',
    name: 'Trace',
    meta: { title: '追溯管理', icon: 'zhuisu' },
    children: [...trace]
  },
  {
    path: '/report',
    name: 'Report',
    component: Layout,
    children: [... report],
    meta: { title: '统计报表', icon: 'baobiao' }
  },
  {
    path: '/systemSettings',
    name: 'systemSettings',
    component: Layout,
    redirect: '/systemSettings/myInfo',
    meta: { title: '系统设置', icon: 'lock' },
    hidden: true,
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
