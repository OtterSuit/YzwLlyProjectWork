const Mock = require('mockjs')

const data = Mock.mock({
  qualification: {
    id: '@id',
    recordDate: '@date',
    indate: '@date',
    code: /\d{9}/
  },
  execute: {
    id: '@id',
    recordDate: '@date',
    indate: '@date',
    code: /\d{9}/
  },
  midwife: {
    id: '@id',
    recordDate: '@date',
    indate: '@date',
    code: /\d{9}/
  },
  'other|1-3': [{
    id: '@id',
    'name|1': ['普通话等级证书', '营养师证', '计算机证'],
    recordDate: '@date',
    indate: '@date'
  }]
})

module.exports = [
  // 获取资格证书
  {
    url: '/vue-admin-template/people/getCredential',
    type: 'get',
    response: config => {
      const items = data
      return {
        code: 20000,
        data: {
          items: items
        }
      }
    }
  }
]
