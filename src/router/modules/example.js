export default [
  {
    path: 'goods',
    name: 'Goods',
    component: () => import('@/views/example/goods/index'),
    meta: {
      title: '物资字典维护',
      parent: 'Example', // 第二级路由的父级路由
      permission: ['Example', 'Goods'] // 进入该路由的权限
    }
  },
  {
    path: 'constant',
    name: 'Constant',
    component: () => import('@/views/example/index'),
    meta: { title: '常数维护', parent: 'Example' },
    redirect: '/example/constant/constantMain',
    children: [
      {
        path: 'constantMain',
        name: 'ConstantMain',
        component: () => import('@/views/example/constant/index'),
        meta: { title: '常数维护', breadcrumb: false, activeMenu: '/example/constant/constantMain', permission: ['Example', 'Constant'] }
      },
      {
        path: 'constantDetails',
        name: 'constantDetails',
        component: () => import('@/views/example/constant/maintenance'),
        meta: { title: '常数详细', activeMenu: '/example/constant/constantMain', permission: ['Example', 'Constant'] },
        hidden: true
      }
    ]
  },
  {
    path: 'company',
    name: 'Company',
    component: () => import('@/views/example/index'),
    meta: { title: '供货公司维护', parent: 'Example' },
    redirect: '/example/company/companyMain',
    children: [
      {
        path: 'companyMain',
        name: 'companyMain',
        component: () => import('@/views/example/company/index'),
        meta: { title: '供货公司维护', breadcrumb: false, activeMenu: '/example/company/companyMain', permission: ['Example', 'Company'] }
      },
      {
        path: 'license',
        name: 'license',
        component: () => import('@/views/example/company/license'),
        meta: { title: '许可证', activeMenu: '/example/company/companyMain', permission: ['Example', 'Company'] },
        hidden: true
      },
      {
        path: 'contract',
        name: 'contract',
        component: () => import('@/views/example/company/contract'),
        meta: { title: '合同', activeMenu: '/example/company/companyMain', permission: ['Example', 'Company'] },
        hidden: true
      }
    ]
  },
  {
    path: 'print',
    name: 'Print',
    component: () => import('@/views/example/print/index'),
    meta: { title: '条码打印', parent: 'Example', permission: ['Example', 'Print'] }
  },
  {
    path: 'package',
    name: 'Package',
    component: () => import('@/views/example/index'),
    meta: { title: '包信息维护', parent: 'Example' },
    redirect: '/example/package/packageMain',
    children: [
      {
        path: 'packageMain',
        name: 'packageMain',
        component: () => import('@/views/example/package/index'),
        meta: { title: '包信息维护', breadcrumb: false, activeMenu: '/example/package/packageMain', permission: ['Example', 'Package'] }
      },
      {
        path: 'packageDetails',
        name: 'packageDetails',
        component: () => import('@/views/example/package/particulars'),
        meta: { title: '包明细', activeMenu: '/example/package/packageMain', permission: ['Example', 'Package'] },
        hidden: true
      }
    ]
  }
]
