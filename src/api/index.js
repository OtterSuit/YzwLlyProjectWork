import global from './modules/global.js' // 全局模块
import example from './modules/example.js'// 基础数据模块
import storage from './modules/storage.js' // 器械仓库
import disinfection from './modules/disinfection.js' // 清洗消毒
import assembly from './modules/assembly.js' // 装配任务
import bundle from './modules/bundle.js' // 封包任务
import department from './modules/department.js' // 科室器械
import recover from './modules/recover' // 回收任务
import images from './modules/images'
import video from './modules/video'
import antisepsis from './modules/antisepsis'
import systemSettings from './modules/systemSettings'
import trace from './modules/trace' // 追溯
import home from './modules/home' // 系统设置
import dashboard from './modules/dashboard'
// 其他模块的接口……

// 导出接口
export default {
  ...global,
  ...example,
  ...storage,
  ...disinfection,
  ...assembly,
  ...bundle,
  ...department,
  ...assembly,
  ...recover,
  ...images,
  ...video,
  ...antisepsis,
  ...systemSettings,
  ...trace,
  ...home,
  ...dashboard
}
