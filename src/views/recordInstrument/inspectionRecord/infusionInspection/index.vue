<template>
  <div class="main">
    <table border="1" cellspacing="0" cellpadding="0">
      <thead>
        <tr>
          <th>日期</th>
          <th>液体及药品名称</th>
          <th>执行巡视时间</th>
          <th>滴数/分</th>
          <th>不良反应</th>
          <th>责任者签名</th>
        </tr>
      </thead>
      <tbody v-for="item in tableData" :key="item.date">
        <tr>
          <td rowspan="3">{{ item.date }}</td>
          <td rowspan="3">{{ item.drug }}</td>
          <td>{{ item.tour[0].time }}</td>
          <td>{{ item.tour[0].dropNum }}</td>
          <td>{{ item.tour[0].reaction }}</td>
          <td>{{ item.tour[0].sign }}</td>
        </tr>
        <tr>
          <td>{{ item.tour[1].time }}</td>
          <td>{{ item.tour[1].dropNum }}</td>
          <td>{{ item.tour[1].reaction }}</td>
          <td>{{ item.tour[1].sign }}</td>
        </tr>
        <tr>
          <td>{{ item.tour[2].time }}</td>
          <td>{{ item.tour[2].dropNum }}</td>
          <td>{{ item.tour[2].reaction }}</td>
          <td>{{ item.tour[2].sign }}</td>
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
            drug: '/',
            tour: [
              {
                time: '/',
                dropNum: '/',
                reaction: '/',
                sign: '/'
              },
              {
                time: '/',
                dropNum: '/',
                reaction: '/',
                sign: '/'
              },
              {
                time: '/',
                dropNum: '/',
                reaction: '/',
                sign: '/'
              }
            ]
          }
        ]
      } else {
        this.form.status = '1'
        this.tableData = [
          {
            date: '2020-6-1',
            drug: '蓝波球',
            tour: [
              {
                time: '8:00',
                dropNum: '1',
                reaction: '无',
                sign: '郭秀兰'
              },
              {
                time: '15:00',
                dropNum: '2',
                reaction: '有',
                sign: '郭秀兰'
              },
              {
                time: '20:00',
                dropNum: '3',
                reaction: '无',
                sign: '郭秀兰'
              }
            ]
          },
          {
            date: '2020-8-1',
            drug: '蓝波球',
            tour: [
              {
                time: '8:00',
                dropNum: '1',
                reaction: '无',
                sign: '郭秀兰'
              },
              {
                time: '15:00',
                dropNum: '2',
                reaction: '有',
                sign: '郭秀兰'
              },
              {
                time: '20:00',
                dropNum: '3',
                reaction: '无',
                sign: '郭秀兰'
              }
            ]
          },
          {
            date: '2020-9-1',
            drug: '蓝波球',
            tour: [
              {
                time: '8:00',
                dropNum: '1',
                reaction: '无',
                sign: '郭秀兰'
              },
              {
                time: '15:00',
                dropNum: '2',
                reaction: '有',
                sign: '郭秀兰'
              },
              {
                time: '20:00',
                dropNum: '3',
                reaction: '无',
                sign: '郭秀兰'
              }
            ]
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
