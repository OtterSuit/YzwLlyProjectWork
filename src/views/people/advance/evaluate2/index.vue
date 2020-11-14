<template>
  <div style="padding:30px">
    <el-form ref="form" :model="form">
      <table cellspacing="0" cellpadding="0">
        <thead>
          <tr style="height:50px;font-size:20px">
            <th colspan="8" class="top left">进修生考核表</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th class="left">姓名</th>
            <td><el-input v-model="form.name" /></td>
            <th>科室</th>
            <td><el-input v-model="form.department" /></td>
            <th>所在团队</th>
            <td><el-input v-model="form.team" /></td>
            <th>团队负责人</th>
            <td><el-input v-model="form.principal" /></td>
          </tr>
          <tr>
            <th class="left">轮转期</th>
            <td colspan="3"><el-input v-model="form.time" /></td>
            <th>轮转岗位</th>
            <td><el-input v-model="form.post" /></td>
            <th>带教老师姓名</th>
            <td><el-input v-model="form.teacher" /></td>
          </tr>
          <tr>
            <td colspan="8" class="left"><span>团队负责人评语</span>
              <el-input
                v-model="form.principalRemark"
                type="textarea"
                :autosize="{ minRows: 4}"
                resize="none"
              />
            </td>
          </tr>
          <tr>
            <td colspan="8" class="left">
              <span>带教老师评语</span>
              <el-input
                v-model="form.teacherRemark"
                :autosize="{ minRows: 4}"
                type="textarea"
                resize="none"
              />
            </td>
          </tr>
          <tr>
            <th class="left">带教老师签名</th>
            <td colspan="3"><el-input v-model="form.signature" /></td>
            <th>日期</th>
            <td colspan="3"><el-input v-model="form.date" /></td>
          </tr>
        </tbody>
      </table>
      <div class="btn">
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { postAdvanceEvaluate2 } from '@/api/people/advance'
export default {
  data() {
    return {
      form: {
        name: '',
        department: '',
        team: '',
        principal: '',
        time: '',
        post: '',
        teacher: '',
        principalRemark: '',
        teacherRemark: '',
        signature: '',
        date: ''
      }
    }
  },
  methods: {
    onSubmit() {
      postAdvanceEvaluate2().then(response => {
        if (response.code === 20000) {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        }
      })
    }
  }
}

</script>

<style lang="scss" type="text/scss" scoped>
table {
  margin: 0 auto;
  font-size: 14px;
}
tbody th {
  width: 100px;
}
thead th {
  background-color: #F5F7FA;
  color: #909399;
}
tbody {
  color: #606266;
}
span {
  font-weight: 700;
  height: 30px;
  line-height: 30px;
}
tr {
  height: 45px;
}
td {
  text-align: center;
  border-bottom: 1px solid #EBEEF5;
  border-right: 1px solid #EBEEF5;
}
th {
  border-bottom: 1px solid #EBEEF5;
  border-right: 1px solid #EBEEF5;
}
.btn {
  text-align: center;
  margin: 10px;
}
::v-deep .el-textarea textarea {
  border-style: none;
}
::v-deep .el-input input {
  border-style: none;
}
.top {
  border-top: 1px solid #EBEEF5;
}
.left {
  border-left: 1px solid #EBEEF5;
}
</style>

