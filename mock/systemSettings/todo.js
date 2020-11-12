const Mock = require('mockjs')

// 代办信息
const todo = Mock.mock({
  'item|1-3': {
    '0': {
      title: '档案信息',
      description: '您的档案状态审核已通过',
      type: 'success'
    },
    '1': {
      title: '考试信息',
      description: '您的考试申请被拒绝,请重新填写申请',
      type: 'error'
    },
    '2': {
      title: '档案审核',
      description: '您有档案信息需要审核',
      type: 'warning'
    }
  },
  'items': function() {
    return Object.values(this.item)
  }
})

module.exports = [
  // 代办信息
  {
    url: '/vue-admin-template/todo/getTodo',
    type: 'get',
    response: config => {
      const items = todo.items
      return {
        code: 20000,
        data: {
          items: items,
          total: items.length
        }
      }
    }
  }
]
