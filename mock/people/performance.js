const Mock = require('mockjs')
// 档案
const data = Mock.mock({
  'items|45': [
    {
      id: '@id',
      name: '@cname',
      workNum: /\d{9}/,
      'duty': '护士',
      'type|1': ['在职', '实习', '进修', '返聘'],
      'performance|1-20.2': 1,
      'status|1': ['1', '2'],
      'assess': '@cname',
      'assessDate': '@datetime',
      'ward|1': ['呼吸内科 一病区', '外科 二病区', '儿科 一病区', '男科 三病区', '妇科 一病区'],
      'office|1': ['护理（士）', '护理（师）', '主管护理（师）'],
      'seniority|1-30': 30,
      'A|1-20': 1,
      'P|1-20': 1,
      'N|1-20': 1,
      'responsible|1-20': 1,
      'advice|1-20': 1,
      'motor|1-20': 1,
      'job|1-10': 1,
      'nursing|1-10': 1,
      'document|1-10': 1,
      'theory|1-10': 1,
      'technology|1-10': 1,
      'business|1-10': 1,
      'onTime|1-10': 1,
      'leave|1-10': 1,
      'responsibility|1-10': 1,
      'instrument|1-10': 1,
      'attitude|1-10': 1,
      'smallError|1': ['无', '有'],
      'bigError|1': ['无', '有'],
      'add|1': ['无', '有']
    }]
})
module.exports = [
  // 获取绩效考核列表
  {
    url: '/vue-admin-template/people/getAssess',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
