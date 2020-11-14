<template>
  <div class="main">
    <table border="1" cellspacing="0" cellpadding="0">
      <thead>
        <tr>
          <th rowspan="2">日期</th>
          <th rowspan="2">时间</th>
          <th colspan="2">输液巡视</th>
          <th rowspan="2">卧位</th>
          <th rowspan="2">吸氧L/min</th>
          <th rowspan="2">心电监护</th>
          <th colspan="2">管道情况</th>
          <th rowspan="2" style="width:300px">病情变化</th>
          <th rowspan="2">签名</th>
        </tr>
        <tr>
          <th>通畅与否</th>
          <th>不良反应</th>
          <th>通畅与否</th>
          <th>引流液颜色</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.date">
          <td>{{ item.date }}</td>
          <td>{{ item.time }}</td>
          <td>{{ item.unblocked }}</td>
          <td>{{ item.reaction }}</td>
          <td>{{ item.decubitus }}</td>
          <td>{{ item.oxygen }}</td>
          <td>{{ item.ECG }}</td>
          <td>{{ item.pipeUnblocked }}</td>
          <td>{{ item.color }}</td>
          <td>{{ item.illnessChange }}</td>
          <td>{{ item.sign }}</td>
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
            time: '/',
            unblocked: '/',
            reaction: '/',
            decubitus: '/',
            oxygen: '/',
            ECG: '/',
            pipeUnblocked: '/',
            color: '/',
            illnessChange: '/',
            sign: '/'
          }
        ]
      } else {
        this.form.status = '1'
        this.tableData = [
          {
            date: '2020-9-1',
            time: '15:00',
            unblocked: '通畅',
            reaction: '无',
            decubitus: '平卧',
            oxygen: '1',
            ECG: '运行正常',
            pipeUnblocked: '通畅',
            color: '无色',
            illnessChange: '无',
            sign: '黑岛'
          },
          {
            date: '2020-10-1',
            time: '15:00',
            unblocked: '通畅',
            reaction: '无',
            decubitus: '平卧',
            oxygen: '1',
            ECG: '运行正常',
            pipeUnblocked: '通畅',
            color: '无色',
            illnessChange: '无',
            sign: '黑岛'
          },
          {
            date: '2020-11-1',
            time: '15:00',
            unblocked: '通畅',
            reaction: '无',
            decubitus: '平卧',
            oxygen: '1',
            ECG: '运行正常',
            pipeUnblocked: '通畅',
            color: '无色',
            illnessChange: '无',
            sign: '黑岛'
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
tbody, thead {
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
