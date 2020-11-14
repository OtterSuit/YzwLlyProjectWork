import { api } from '../api.js'
export default {
  /* 排班需求*/
  // 排班需求列表
  getScheduleDemand(params) {
    return api({ url: '/nursing/v1/scheduleDemands', params, method: 'get' })
  },
  // 新增数据
  postScheduleDemand(params) {
    return api({ url: '/nursing/v1/scheduleDemands', params, method: 'post' })
  },
  // 删除数据
  deleteScheduleDemand(params) {
    return api({ url: `/nursing/v1/scheduleDemands/${params.id}`, params, method: 'delete' })
  },
  /* 排班设置*/
  // 班次设置-本周/下周/参考上周排班。
  getScheduleShifts(params) {
    return api({ url: '/nursing/v1/scheduleShifts', params, method: 'get' })
  },
  // 班次设置-本周/下周-提交。
  postScheduleShifts(params, weekOption) {
    return api({ url: `/nursing/v1/scheduleShifts?weekOption=${weekOption}`, params, method: 'post' })
  },
  // 排班记录查询
  getScheduleShiftsQuery(params) {
    return api({ url: `/nursing/v1/scheduleShifts/query`, params, method: 'get' })
  },
  /* 假期管理 */
  // 请假申请-存假剩余小时数
  getSavedHours(params) {
    return api({ url: `/nursing/v1/scheduleLeaves/applications/savedHours`, params, method: 'get' })
  },
  // 请假申请-提交
  postScheduleLeaves(params) {
    return api({ url: `/nursing/v1/scheduleLeaves/applications`, params, method: 'post' })
  },
  // 存假管理
  getScheduleLeavesSaved(params) {
    return api({ url: `/nursing/v1/scheduleLeaves/saved`, params, method: 'get' })
  },
  // 年假管理
  getScheduleLeavesAnnual(params) {
    return api({ url: `/nursing/v1/scheduleLeaves/annual`, params, method: 'get' })
  },
  // 科室请假统计
  getScheduleLeavesDepartment(params) {
    return api({ url: `/nursing/v1/scheduleLeaves/department`, params, method: 'get' })
  },
  // 个人请假统计
  getScheduleLeavesPersonal(params) {
    return api({ url: `/nursing/v1/scheduleLeaves/personal`, params, method: 'get' })
  }
}
