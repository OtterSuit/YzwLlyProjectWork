<template>
  <div class="main">
    <table border="1" cellspacing="0" cellpadding="0">
      <tbody>
        <tr>
          <td colspan="10" style="padding:10px 0"><img src="@/assets/images/pain.png"></td>
        </tr>
        <tr>
          <th>评估日期</th>
          <th>疼痛类型</th>
          <th>疼痛部位</th>
          <th>疼痛性质</th>
          <th>疼痛原因</th>
          <th>程度分数</th>
          <th>患者影响</th>
          <th>通知医生</th>
          <th>护理措施</th>
          <th>护士签名</th>
        </tr>
        <tr v-for="item in tableData" :key="item.date">
          <td>{{ item.date }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.position }}</td>
          <td>{{ item.nature }}</td>
          <td>{{ item.reason }}</td>
          <td>{{ item.score }}</td>
          <td>{{ item.affect }}</td>
          <td>{{ item.doctor }}</td>
          <td>{{ item.nurse }}</td>
          <td>{{ item.sign }}</td>
        </tr>
        <tr>
          <td colspan="10" class="textLeft" style="padding:10px;line-height:25px">
            疼痛类型：①持续性 ②阵发性 ③间歇性 ④进行性加重 ⑤放射性 ⑥其他<br>
            疼痛部位：①切口 ②头颈部 ③腰背部 ④臀部 ⑤关节 ⑥上肢 ⑦下肢 ⑧其他<br>
            疼痛性质：①刀割样痛 ②绞痛 ③烧灼样痛 ④刺痛 ⑤压痛 ⑥胀痛 ⑦钝痛 ⑧其他<br>
            疼痛原因：①创伤 ②手术 ③功能锻炼 ④换药 ⑤其他<br>
            患者影响：①影响睡眠 ②翻转不安、无法入睡 ③烦躁、情绪低落、食欲低下 ④生活自理能力受限 ⑤其他<br>
            护理措施：①非药物治疗： A心理疏导 B冷敷 C牵引 D改变体位 E抬高患肢 F其他 <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;①药物治疗： A口服塞来昔布 B口服曲马多、布洛酚、芬必得等 C注射用氟比洛酚酯、特耐等 D注射用曲马多、盐酸哌替啶、强痛定等 E其他
          </td>
        </tr>
      </tbody>
    </table>
    <div class="operation">
      <el-popconfirm
        v-show="form.status==='1'"
        icon-color="green"
        title="确认通过吗"
        @onConfirm="handlePass"
      >
        <el-button
          slot="reference"
          class="success-color"
          icon="el-icon-success"
        >通过
        </el-button>
      </el-popconfirm>
      <el-popconfirm
        v-show="form.status==='1'"
        icon-color="red"
        title="确认驳回吗"
        @onConfirm="handleReject"
      >
        <el-button
          slot="reference"
          class="error-color"
          icon="el-icon-error"
        >驳回</el-button>
      </el-popconfirm>
      <el-popconfirm
        v-show="form.status==='2'||form.status==='3'"
        icon-color="red"
        title="确认删除吗"
        @onConfirm="handleDelete"
      >
        <el-button
          slot="reference"
          class="normal-color"
          icon="el-icon-delete"
        >删除</el-button>
      </el-popconfirm>
    </div>
  </div>
</template>

<script>
// import { getAdmissionAssessment } from '@/api/recordInstrument/nursingAssessment'

export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          id: '',
          name: '',
          gender: '',
          age: '',
          department: '',
          diagnose: '',
          bedNum: '',
          hospitalNum: '',
          date: '',
          occupation: '',
          culture: '',
          marriage: '',
          way: ''
        }
      }
    }
  },
  data() {
    return {
      tableData: [],
      form: {
        status: '1'
      }
    }
  },
  watch: {
    info: {
      handler: function(val, oldval) {
        this.changeData()
      },
      deep: true
    }
  },
  created() {
    this.changeData()
  },
  methods: {
    changeData() {
      if (this.info.example) {
        this.form.status = null
        this.tableData = [
          {
            date: '/',
            type: '/',
            position: '/',
            nature: '/',
            reason: '/',
            score: '/',
            affect: '/',
            doctor: '/',
            nurse: '/',
            sign: '/'
          }
        ]
      } else {
        this.form.status = '1'
        this.tableData = [
          {
            date: '2020-6-1',
            type: '持续性',
            position: '切口',
            nature: '绞痛',
            reason: '创伤',
            score: '9',
            affect: '影响睡眠',
            doctor: '夏洛',
            nurse: '心理辅导',
            sign: '郭秀兰'
          },
          {
            date: '2020-7-1',
            type: '持续性',
            position: '切口',
            nature: '绞痛',
            reason: '创伤',
            score: '9',
            affect: '影响睡眠',
            doctor: '夏洛',
            nurse: '心理辅导',
            sign: '郭秀兰'
          },
          {
            date: '2020-8-1',
            type: '持续性',
            position: '切口',
            nature: '绞痛',
            reason: '创伤',
            score: '9',
            affect: '影响睡眠',
            doctor: '夏洛',
            nurse: '心理辅导',
            sign: '郭秀兰'
          },
          {
            date: '2020-9-1',
            type: '持续性',
            position: '切口',
            nature: '绞痛',
            reason: '创伤',
            score: '9',
            affect: '影响睡眠',
            doctor: '夏洛',
            nurse: '心理辅导',
            sign: '郭秀兰'
          }
        ]
      }
    },
    handlePass(index, row) {
      this.form.status = '2'
      this.$message({
        message: '通过成功',
        type: 'success'
      })
    },
    handleReject(index, row) {
      this.$message({
        message: '驳回成功',
        type: 'success'
      })
      this.form.status = '3'
    },
    handleDelete(index, row) {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    },
    tableStyle() {
      return {
        textAlign: 'center'
      }
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.main {
  position: relative;
  .flex {
    text-align: left;
    padding-left: 10px;
    flex: 1;
    // line-height: 45px;
  }
  span {
    font-size: 14px;
    color: #666;
  }
  .content {
    display: inline-block;
    text-align: center;
    border-bottom: 1px solid #999;
  }
}
.operation {
  margin-top: 10px;
  text-align: center;
}
table {
  width: 100%;
  margin: 0 auto;
  font-size: 14px;
  border-color: #ccc;
}
tbody {
  color: #606266;
}
tr {
  height: 45px;
}
td {
  text-align: center;
}
.textLeft {
  padding: 0 10px;
  text-align: left;
}
.el-radio {
  margin-right: 15px;
}
.el-checkbox-group {
  display: inline;
}
</style>
