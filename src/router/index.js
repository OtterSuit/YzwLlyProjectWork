import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import example from './modules/example'
import bundle from './modules/bundle'
import antisepsis from './modules/antisepsis'
import surgery from './modules/surgery'
import recover from './modules/recover'
import disinfection from './modules/disinfection'
import statistics from './modules/statistics'
import systemSettings from './modules/systemSettings'
import assembly from './modules/assembly'
import warehouse from './modules/warehouse'
// import department from './modules/department'
import departmentApply from './modules/departmentApply'
import departmentRecycling from './modules/departmentRecycling'
import departmentReturn from './modules/departmentReturn'
import trace from './modules/trace'
import report from './modules/report'
import labelPrint from './modules/labelPrint'

// 默认路由
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
    beforeEnter: (to, from, next) => {
      next(`/${store.getters.home}`) // 跳转路由通过vuex中设置
    },
    hidden: true
  },
  {
    path: '/print',
    name: 'labelPrint',
    component: () => import('@/views/print/index'),
    redirect: '/print/packagePrint',
    hidden: true,
    children: [...labelPrint]
  },
  {
    path: '/grant',
    component: Layout,
    children: [
      {
        path: 'grant',
        name: 'Grant',
        component: () => import('@/views/grant/index'),
        meta: { title: '发放', icon: 'icon-fahuo' }
      }
    ],
    hidden: true
  },
  {
    path: '/surgery',
    component: Layout,
    redirect: '/surgery/apply/applyMain',
    name: 'Tree',
    meta: { title: '手术器械', icon: 'icon-shoushubao' },
    children: [...surgery],
    hidden: true
  },
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/supply',
    name: 'Statistics',
    meta: { title: '外来器械', icon: 'icon-wailaiqixie' },
    children: [...statistics],
    hidden: true
  }
]

// 权限路由的一级
export const LayersOne = [
  {
    path: '/ssdHome',
    component: Layout,
    redirect: '/ssdHome/index',
    name: 'ssdHome',
    children: [{
      path: 'index',
      component: () => import('@/views/home/ssd'),
      meta: { title: '首页', icon: 'el-icon-s-home', permission: ['ssdHome'] }
    }]
  },
  {
    path: '/sssHome',
    component: Layout,
    redirect: '/sssHome/index',
    name: 'sssHome',
    children: [{
      path: 'index',
      component: () => import('@/views/home/sss'),
      meta: { title: '首页', icon: 'el-icon-s-home', permission: ['sssHome'] }
    }]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/goods',
    name: 'Example',
    meta: { title: '基础数据', icon: 'icon-jichushuju' },
    children: [...example]
  },
  {
    path: '/recover',
    component: Layout,
    redirect: '/recover/recoverList/recoverListMain',
    name: 'Recover',
    meta: { title: '器械回收', icon: 'icon-huishou' },
    children: [...recover]
  },
  {
    path: '/disinfection',
    component: Layout,
    redirect: '/disinfection/mission',
    name: 'Disinfection',
    meta: { title: '清洗消毒', icon: 'icon-tubiao-' },
    children: [...disinfection]
  },
  {
    path: '/assembly',
    component: Layout,
    redirect: '/assembly/mission',
    name: 'Assembly',
    meta: { title: '审核装配', icon: 'icon-zhuangpei' },
    children: [...assembly]
  },
  {
    path: '/bundle',
    component: Layout,
    redirect: '/bundle/audit',
    name: 'Bundle',
    meta: { title: '审核封包', icon: 'icon-fengbao' },
    children: [...bundle]
  },
  {
    path: '/antisepsis',
    component: Layout,
    redirect: '/antisepsis/loading',
    name: 'Antisepsis',
    meta: { title: '灭菌', icon: 'icon-miejun' },
    children: [...antisepsis]
  },
  // {
  //   path: '/department',
  //   component: Layout,
  //   redirect: '/department/apply/applyMain',
  //   name: 'Department',
  //   meta: { title: '科室器械', icon: 'icon-keshi' },
  //   children: []
  // },
  {
    path: '/warehouse',
    component: Layout,
    redirect: '/warehouse/orderManagement/orderMain',
    name: 'Warehouse',
    meta: { title: '器械仓库', icon: 'icon-cangku' },
    children: [...warehouse]
  },
  {
    path: '/trace',
    component: Layout,
    redirect: '/trace/traceMain',
    name: 'Trace',
    meta: { title: '追溯管理', icon: 'icon-zhuisu' },
    children: [...trace]
  },
  {
    path: '/report',
    name: 'Report',
    component: Layout,
    children: [...report],
    hidden: true,
    meta: { title: '统计报表', icon: 'icon-baobiao' }
  },
  {
    path: '/systemSettings',
    name: 'systemSettings',
    component: Layout,
    redirect: '/systemSettings/myInfo',
    meta: { title: '系统设置' },
    hidden: true,
    children: [...systemSettings]
  },
  {
    path: '/apply',
    name: 'DepartmentApply',
    component: Layout,
    meta: { title: '申领管理', icon: 'icon-keshi' },
    redirect: '/apply/applyMain',
    children: [...departmentApply]
  },
  {
    path: '/recycling',
    name: 'DepartmentRecycling',
    component: Layout,
    meta: { title: '回收管理', icon: 'icon-huishou' },
    redirect: '/recycling/recyclingMain',
    children: [...departmentRecycling]
  },
  {
    path: '/departmentReturn',
    name: 'departmentReturn',
    component: Layout,
    meta: { title: '退回管理', icon: 'icon-fahuo' },
    redirect: '/departmentReturn/departmentReturnMain',
    children: [...departmentReturn]
  }
]

// 权限路由的二级
export const LayersTwo = [
  ...example,
  ...recover,
  ...disinfection,
  ...assembly,
  ...bundle,
  ...antisepsis,
  ...warehouse,
  ...report,
  ...systemSettings]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes.concat(LayersOne, [{ path: '*', redirect: '/404', hidden: true }]) // 404页面要放在路由的最后
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
