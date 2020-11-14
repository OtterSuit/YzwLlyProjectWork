<template>
  <div style="padding:30px">
    <el-form ref="form" :model="form">
      <table cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th colspan="7" style="height:50px;font-size:20px" class="top left">评价表</th>
          </tr>
          <tr>
            <th style="width:200px" class="left">项目</th>
            <th style="width:300px">测试项目</th>
            <th colspan="5" style="width:500px">评分</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th rowspan="4" class="left">教学氛围 20分</th>
            <td>病区护士长重视实习教学</td>
            <td><el-radio v-model="form.radio.radio1" label="5">5分</el-radio></td>
            <td><el-radio v-model="form.radio.radio1" label="4">4分</el-radio></td>
            <td><el-radio v-model="form.radio.radio1" label="3">3分</el-radio></td>
            <td><el-radio v-model="form.radio.radio1" label="2">2分</el-radio></td>
            <td><el-radio v-model="form.radio.radio1" label="1">1分</el-radio></td>
          </tr>
          <tr>
            <td>带教组长重视实习教学</td>
            <td><el-radio v-model="form.radio.radio2" label="5">5分</el-radio></td>
            <td><el-radio v-model="form.radio.radio2" label="4">4分</el-radio></td>
            <td><el-radio v-model="form.radio.radio2" label="3">3分</el-radio></td>
            <td><el-radio v-model="form.radio.radio2" label="2">2分</el-radio></td>
            <td><el-radio v-model="form.radio.radio2" label="1">1分</el-radio></td>
          </tr>
          <tr>
            <td>带教老师重视实习教学</td>
            <td><el-radio v-model="form.radio.radio3" label="5">5分</el-radio></td>
            <td><el-radio v-model="form.radio.radio3" label="4">4分</el-radio></td>
            <td><el-radio v-model="form.radio.radio3" label="3">3分</el-radio></td>
            <td><el-radio v-model="form.radio.radio3" label="2">2分</el-radio></td>
            <td><el-radio v-model="form.radio.radio3" label="1">1分</el-radio></td>
          </tr>
          <tr>
            <td>科室整体教学氛围浓厚</td>
            <td><el-radio v-model="form.radio.radio4" label="5">5分</el-radio></td>
            <td><el-radio v-model="form.radio.radio4" label="4">4分</el-radio></td>
            <td><el-radio v-model="form.radio.radio4" label="3">3分</el-radio></td>
            <td><el-radio v-model="form.radio.radio4" label="2">2分</el-radio></td>
            <td><el-radio v-model="form.radio.radio4" label="1">1分</el-radio></td>
          </tr>
          <tr>
            <th rowspan="12" class="left">教学安排 60分</th>
            <td>组织清晰的入科介绍</td>
            <td><el-radio v-model="form.radio.radio5" label="5">5分</el-radio></td>
            <td><el-radio v-model="form.radio.radio5" label="4">4分</el-radio></td>
            <td><el-radio v-model="form.radio.radio5" label="3">3分</el-radio></td>
            <td><el-radio v-model="form.radio.radio5" label="2">2分</el-radio></td>
            <td><el-radio v-model="form.radio.radio5" label="1">1分</el-radio></td>
          </tr>
          <tr>
            <td>安排合适的带教老师</td>
            <td><el-radio v-model="form.radio.radio6" label="5">5分</el-radio></td>
            <td><el-radio v-model="form.radio.radio6" label="4">4分</el-radio></td>
            <td><el-radio v-model="form.radio.radio6" label="3">3分</el-radio></td>
            <td><el-radio v-model="form.radio.radio6" label="2">2分</el-radio></td>
            <td><el-radio v-model="form.radio.radio6" label="1">1分</el-radio></td>
          </tr>
          <tr>
            <td>制定详细的带教计划</td>
            <td><el-radio v-model="form.radio.radio7" label="5">5分</el-radio></td>
            <td><el-radio v-model="form.radio.radio7" label="4">4分</el-radio></td>
            <td><el-radio v-model="form.radio.radio7" label="3">3分</el-radio></td>
            <td><el-radio v-model="form.radio.radio7" label="2">2分</el-radio></td>
            <td><el-radio v-model="form.radio.radio7" label="1">1分</el-radio></td>
          </tr>
          <tr>
            <td>实施具体的教学路径</td>
            <td><el-radio v-model="form.radio.radio8" label="5">5分</el-radio></td>
            <td><el-radio v-model="form.radio.radio8" label="4">4分</el-radio></td>
            <td><el-radio v-model="form.radio.radio8" label="3">3分</el-radio></td>
            <td><el-radio v-model="form.radio.radio8" label="2">2分</el-radio></td>
            <td><el-radio v-model="form.radio.radio8" label="1">1分</el-radio></td>
          </tr>
          <tr>
            <td>组织规范的理论授课</td>
            <td><el-radio v-model="form.radio.radio9" label="5">5分</el-radio></td>
            <td><el-radio v-model="form.radio.radio9" label="4">4分</el-radio></td>
            <td><el-radio v-model="form.radio.radio9" label="3">3分</el-radio></td>
            <td><el-radio v-model="form.radio.radio9" label="2">2分</el-radio></td>
            <td><el-radio v-model="form.radio.radio9" label="1">1分</el-radio></td>
          </tr>
          <tr>
            <td>组织规范的教学查房</td>
            <td><el-radio v-model="form.radio.radio10" label="5">5分</el-radio></td>
            <td><el-radio v-model="form.radio.radio10" label="4">4分</el-radio></td>
            <td><el-radio v-model="form.radio.radio10" label="3">3分</el-radio></td>
            <td><el-radio v-model="form.radio.radio10" label="2">2分</el-radio></td>
            <td><el-radio v-model="form.radio.radio10" label="1">1分</el-radio></td>
          </tr>
          <tr>
            <td>组织规范的操作示范</td>
            <td><el-radio v-model="form.radio.radio11" label="5">5分</el-radio></td>
            <td><el-radio v-model="form.radio.radio11" label="4">4分</el-radio></td>
            <td><el-radio v-model="form.radio.radio11" label="3">3分</el-radio></td>
            <td><el-radio v-model="form.radio.radio11" label="2">2分</el-radio></td>
            <td><el-radio v-model="form.radio.radio11" label="1">1分</el-radio></td>
          </tr>
          <tr>
            <td>安排适量的技能训练</td>
            <td><el-radio v-model="form.radio.radio12" label="5">5分</el-radio></td>
            <td><el-radio v-model="form.radio.radio12" label="4">4分</el-radio></td>
            <td><el-radio v-model="form.radio.radio12" label="3">3分</el-radio></td>
            <td><el-radio v-model="form.radio.radio12" label="2">2分</el-radio></td>
            <td><el-radio v-model="form.radio.radio12" label="1">1分</el-radio></td>
          </tr>
          <tr>
            <td>组织实习护士讲课/查房</td>
            <td><el-radio v-model="form.radio.radio13" label="5">5分</el-radio></td>
            <td><el-radio v-model="form.radio.radio13" label="4">4分</el-radio></td>
            <td><el-radio v-model="form.radio.radio13" label="3">3分</el-radio></td>
            <td><el-radio v-model="form.radio.radio13" label="2">2分</el-radio></td>
            <td><el-radio v-model="form.radio.radio13" label="1">1分</el-radio></td>
          </tr>
          <tr>
            <td>组织理论考试</td>
            <td><el-radio v-model="form.radio.radio14" label="5">5分</el-radio></td>
            <td><el-radio v-model="form.radio.radio14" label="4">4分</el-radio></td>
            <td><el-radio v-model="form.radio.radio14" label="3">3分</el-radio></td>
            <td><el-radio v-model="form.radio.radio14" label="2">2分</el-radio></td>
            <td><el-radio v-model="form.radio.radio14" label="1">1分</el-radio></td>
          </tr>
          <tr>
            <td>组织技能考试</td>
            <td><el-radio v-model="form.radio.radio15" label="5">5分</el-radio></td>
            <td><el-radio v-model="form.radio.radio15" label="4">4分</el-radio></td>
            <td><el-radio v-model="form.radio.radio15" label="3">3分</el-radio></td>
            <td><el-radio v-model="form.radio.radio15" label="2">2分</el-radio></td>
            <td><el-radio v-model="form.radio.radio15" label="1">1分</el-radio></td>
          </tr>
          <tr>
            <td>组织学生意见座谈会</td>
            <td><el-radio v-model="form.radio.radio16" label="5">5分</el-radio></td>
            <td><el-radio v-model="form.radio.radio16" label="4">4分</el-radio></td>
            <td><el-radio v-model="form.radio.radio16" label="3">3分</el-radio></td>
            <td><el-radio v-model="form.radio.radio16" label="2">2分</el-radio></td>
            <td><el-radio v-model="form.radio.radio16" label="1">1分</el-radio></td>
          </tr>
          <tr>
            <th rowspan="4" class="left">教学效果 20分</th>
            <td>教学深度适宜循序渐进</td>
            <td><el-radio v-model="form.radio.radio17" label="5">5分</el-radio></td>
            <td><el-radio v-model="form.radio.radio17" label="4">4分</el-radio></td>
            <td><el-radio v-model="form.radio.radio17" label="3">3分</el-radio></td>
            <td><el-radio v-model="form.radio.radio17" label="2">2分</el-radio></td>
            <td><el-radio v-model="form.radio.radio17" label="1">1分</el-radio></td>
          </tr>
          <tr>
            <td>教学情况反馈准确及时</td>
            <td><el-radio v-model="form.radio.radio18" label="5">5分</el-radio></td>
            <td><el-radio v-model="form.radio.radio18" label="4">4分</el-radio></td>
            <td><el-radio v-model="form.radio.radio18" label="3">3分</el-radio></td>
            <td><el-radio v-model="form.radio.radio18" label="2">2分</el-radio></td>
            <td><el-radio v-model="form.radio.radio18" label="1">1分</el-radio></td>
          </tr>
          <tr>
            <td>师生沟通良好关系融洽</td>
            <td><el-radio v-model="form.radio.radio19" label="5">5分</el-radio></td>
            <td><el-radio v-model="form.radio.radio19" label="4">4分</el-radio></td>
            <td><el-radio v-model="form.radio.radio19" label="3">3分</el-radio></td>
            <td><el-radio v-model="form.radio.radio19" label="2">2分</el-radio></td>
            <td><el-radio v-model="form.radio.radio19" label="1">1分</el-radio></td>
          </tr>
          <tr>
            <td>教学路径完成效果良好</td>
            <td><el-radio v-model="form.radio.radio20" label="5">5分</el-radio></td>
            <td><el-radio v-model="form.radio.radio20" label="4">4分</el-radio></td>
            <td><el-radio v-model="form.radio.radio20" label="3">3分</el-radio></td>
            <td><el-radio v-model="form.radio.radio20" label="2">2分</el-radio></td>
            <td><el-radio v-model="form.radio.radio20" label="1">1分</el-radio></td>
          </tr>
          <tr>
            <th class="left">合计得分</th>
            <td colspan="6">{{ total }}分</td>
          </tr>
          <tr>
            <th class="left">建议及意见</th>
            <td colspan="6">
              <el-input
                v-model="form.textarea"
                type="textarea"
                resize="none"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="btn">
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { postTraineeEvaluate1 } from '@/api/people/trainee'
export default {
  data() {
    return {
      total: 0,
      form: {
        radio: {
          radio1: '0',
          radio2: '0',
          radio3: '0',
          radio4: '0',
          radio5: '0',
          radio6: '0',
          radio7: '0',
          radio8: '0',
          radio9: '0',
          radio10: '0',
          radio11: '0',
          radio12: '0',
          radio13: '0',
          radio14: '0',
          radio15: '0',
          radio16: '0',
          radio17: '0',
          radio18: '0',
          radio19: '0',
          radio20: '0'
        },
        textarea: ''
      }
    }
  },
  watch: {
    form: {
      handler(newVal, objVal) {
        const arr = Object.values(newVal.radio)
        this.total = 0
        arr.forEach(item => {
          this.total += parseInt(item)
        })
      },
      deep: true
    }
  },
  methods: {
    onSubmit() {
      postTraineeEvaluate1().then(response => {
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
thead th {
  background-color: #F5F7FA;
  color: #909399;
}
tbody {
  color: #606266;
}
tr {
  height: 45px;
}
th {
  border-bottom: 1px solid #EBEEF5;
  border-right: 1px solid #EBEEF5;
}
td {
  text-align: center;
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
.top {
  border-top: 1px solid #EBEEF5;
}
.left {
  border-left: 1px solid #EBEEF5;
}
</style>
