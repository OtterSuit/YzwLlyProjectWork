export default [
  {
    path: 'myInfo',
    name: 'MyInfo',
    component: () => import('@/views/systemSettings/myInfo'),
    meta: { title: '我的信息', parent: 'systemSettings', permission: ['systemSettings', 'MyInfo'] }
  },
  {
    path: 'password',
    name: 'Password',
    component: () => import('@/views/systemSettings/password'),
    meta: { title: '修改密码', parent: 'systemSettings', permission: ['systemSettings', 'Password'] }
  },
  // {
  //   path: 'myTodo',
  //   name: 'MyTodo',
  //   component: () => import('@/views/systemSettings/myTodo'),
  //   meta: { title: '我的待办', parent: 'systemSettings', permission: ['systemSettings', 'MyTodo'] }
  // },
  {
    path: 'purview',
    name: 'Purview',
    component: () => import('@/views/systemSettings/purview'),
    meta: { title: '权限管理', parent: 'systemSettings', permission: ['systemSettings', 'Purview'] }
  },
  {
    path: 'register',
    name: 'systemSettingsRegister',
    component: () => import('@/views/systemSettings/register'),
    meta: { title: '账号设置', parent: 'systemSettings', permission: ['systemSettings', 'systemSettingsRegister'] }
  }
]
