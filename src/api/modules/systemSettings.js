import { api } from '../api.js'
// method格式统一用小写
export default {
  //  增加人员
  peoAddstaff(params) {
    return api({ url: '/ssd/v1.0/basic/staff', params, method: 'post' })
  },
  //  获取人员详情
  peoGetstaff(params) {
    return api({ url: `/ssd/v1.0/basic/staff/${params.id}`, params, method: 'get' })
  },
  // 修改人员
  peoRevisestaff(params) {
    return api({ url: `/ssd/v1.0/basic/staff/${params.id}`, params, method: 'put' })
  },
  // 删除人员
  peoDeletestaff(params) {
    return api({ url: `/ssd/v1.0/basic/staff/${params.id}`, params, method: 'delete' })
  },
  // 分页查询人员
  peoStaffPage(params) {
    return api({ url: '/ssd/v1.0/basic/staff/s', params, method: 'get' })
  },
  //  获取科室
  toGetdepartment(params) {
    return api({ url: `/ssd/v1.0/basic/department/${params.id}`, params, method: 'get' })
  },
  // 分页查询科室
  todepartmentPage(params) {
    return api({ url: '/ssd/v1.0/basic/department/s', params, method: 'get' })
  },
  //  获取默认部门信息
  getDefaultDeptInfo(params) {
    return api({ url: '/ssd/v1.0/basic/defaultDeptInfo', params, method: 'get' })
  },
  // 分页查询账号（账号管理）
  getUserAccount(params) {
    return api({ url: '/auth/v1/users', params, method: 'get' })
  },
  // 新增账号
  addUserAccount(params) {
    return api({ url: '/auth/v1/users', params, method: 'post', ContentType: 'json' })
  },
  // 更新数据（账号管理）
  updataAccount(params) {
    return api({ url: `/auth/v1/users/${params.id}`, params, method: 'put', ContentType: 'json' })
  },
  // 删除账号
  deleteAccount(params) {
    return api({ url: `/auth/v1/users/${params.id}`, params, method: 'delete' })
  },
  // 根据id查询
  getUserDetail(params) {
    return api({ url: `/auth/v1/users/${params.id}`, params, method: 'get' })
  },
  getOrganizes(params) {
    return api({ url: '/auth/v1/organizes', params, method: 'get' })
  },
  //  获取角色
  getRoles(params) {
    return api({ url: '/auth/v1/roles', params, method: 'get' })
  },
  //  新增角色
  addRoles(params) {
    return api({ url: '/auth/v1/roles', params, method: 'post', ContentType: 'json' })
  },
  // 更新数据（角色管理）
  updataRoles(params) {
    return api({ url: `/auth/v1/roles/${params.id}`, params, method: 'post', ContentType: 'json' })
  },
  // 更新数据（角色管理）
  deleteRoles(params) {
    return api({ url: `/auth/v1/roles/${params.id}`, params, method: 'delete' })
  },
  // 获取用户权限树
  getRolesTree(params) {
    return api({ url: `/auth/v1/roleAuths/${params.roleId}`, method: 'get' })
  },
  // 保存用户权限
  saveRolesTree(params) {
    return api({ url: '/auth/v1/roleAuths', method: 'post', params, ContentType: 'json' })
  },
  // 重置密码
  resetPassword(params) {
    return api({ url: '/auth/v1/users/resetPwd', params, method: 'post' })
  },
  // 修改密码
  modifyPwd(params) {
    return api({ url: '/auth/v1/users/modifyPwd', params, method: 'post', ContentType: 'json' })
  }

}
