// 状态（1-未填写；2-未审核；3-被驳回；4-已审核
const archivesState = {
  1: { name: '未填写', icon: 'el-icon-time', color: 'base-color' },
  2: { name: '未审核', icon: 'el-icon-time', color: 'base-color' },
  3: { name: '被驳回', icon: 'el-icon-warning', color: 'error-color' },
  4: { name: '已审核', icon: 'el-icon-success', color: 'success-color' }
}

// 职位 1.护士 2.护士长 3.护理部主任
const jobPost = {
  1: '护士',
  2: '护士长',
  3: '护理部主任'
}
// 性别
const gender = {
  1: '男',
  0: '女'
}

// 职称 1.护理（士）2.护理（师）3.主管护理（师）
const jobTitleType = {
  1: '护理（士）',
  2: '护理（师）',
  3: '主管护理（师）'
}

// 用工形式 1.合同 2.临时工 3.非全日制用工
const hireWay = {
  1: '合同',
  2: '临时工',
  3: '非全日制用工'
}

//
const userType = {
  1: '在职人员',
  2: '实习生',
  3: '进修生'
}

// 学制 1.全日制 2.专升本 3.自考 4.网络教育
const schoolSys = {
  1: '全日制',
  2: '专升本',
  3: '自考',
  4: '网络教育'
}

// 学历 1.博士 2.硕士 4.本科 5.专科
const degree = {
  1: '博士',
  2: '硕士',
  4: '本科',
  5: '专科'
}
// 能力 1.精通 2.熟练 3.一般 4.较差
const ability = {
  1: '精通',
  2: '熟练',
  3: '一般',
  4: '较差'
}

// 人员管理-绩效管理-绩效考核 0-未考核；1-已考核
const performance = {
  0: { name: '未考核', icon: 'el-icon-time', color: 'base-color' },
  1: { name: '已考核', icon: 'el-icon-success', color: 'success-color' }
}

// 教育培训-考试管理-考试详细 1-未完成；2-缺考；3-待改卷；4-已完成
const specific = {
  1: { name: '未完成', icon: 'el-icon-time', color: 'base-color' },
  2: { name: '缺考', icon: 'el-icon-error', color: 'error-color' },
  3: { name: '待改卷', icon: 'el-icon-time', color: 'goon-color' },
  4: { name: '已完成', icon: 'el-icon-success', color: 'success-color' },
  5: { name: '待开始', icon: 'el-icon-time', color: 'warning-color' }
}
// 教育培训-考试管理 1-未执行 2-执行中 3-已结束
const exam = {
  1: { name: '未执行', icon: 'el-icon-warning', color: 'error-color' },
  2: { name: '执行中', icon: 'el-icon-time', color: 'warning-color' },
  3: { name: '已结束', icon: 'el-icon-success', color: 'success-color' }
}

// 满意度调查-调查对象  1-患者；2-医生；3-护士
const satisfaction = {
  1: '患者',
  2: '医生',
  3: '护士'
}
// 满意度调查-患者信息
const patientSituation = {
  1: '姓名',
  2: '性别',
  3: '年龄',
  4: '科室',
  5: '联系电话'
}
// 排班管理-班次
const applicationShift = {
  1: 'A班',
  2: 'P班',
  3: 'N班',
  4: '责任班',
  5: '医嘱班',
  6: '机动班',
  7: '休息',
  8: '请假'
}
// 排班管理-请假类型
const leaveType = {
  1: '病假',
  2: '婚假',
  3: '产假',
  4: '陪产假',
  5: '事假',
  6: '丧假',
  7: '其他'
}

export {
  gender,
  archivesState,
  jobPost,
  jobTitleType,
  hireWay,
  userType,
  schoolSys,
  degree,
  ability,
  performance,
  specific,
  exam,
  satisfaction,
  patientSituation,
  applicationShift,
  leaveType
}
