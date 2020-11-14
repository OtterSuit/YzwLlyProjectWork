import global from './modules/global' // 全局模块
import systemSettings from './modules/systemSettings' // 系统设置
import education from './modules/education' // 教育培训
import satisfaction from './modules/satisfaction' // 满意度调查
import arrange from './modules/arrange' // 排班管理
import people from './modules/people' // 人员模块
// 其他模块的接口……

// 导出接口
export default {
  ...global,
  ...systemSettings,
  ...education,
  ...people,
  ...satisfaction,
  ...arrange
}
