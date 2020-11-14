<template>
  <div class="main">
    <table border="1" cellspacing="0" cellpadding="0">
      <tbody>
        <tr>
          <th style="width:100px">日期</th>
          <th>时间</th>
          <th style="width:80px">T（℃）</th>
          <th style="width:80px">P/HR<br>（次/min）</th>
          <th style="width:80px">P<br>（次/min）</th>
          <th style="width:80px">BP<br>（mmH/g）</th>
          <th style="width:80px">SPO<sub>2</sub><br>(%)</th>
          <th style="width:80px">体重<br>(kg)</th>
          <th style="width:80px">腹围<br>(cm)</th>
          <th style="width:80px">大便<br>(次数)</th>
          <th style="width:300px">记录描述</th>
          <th>护士签名</th>
        </tr>
        <tr v-for="item in form.record" :key="item.date">
          <td>{{ item.date }}</td>
          <td>{{ item.time }}</td>
          <td>{{ item.T }}</td>
          <td>{{ item.PHR }}</td>
          <td>{{ item.P }}</td>
          <td>{{ item.BP }}</td>
          <td>{{ item.SPO2 }}</td>
          <td>{{ item.weight }}</td>
          <td>{{ item.belly }}</td>
          <td>{{ item.big }}</td>
          <td>{{ item.detail }}</td>
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
      // tableData: [],
      form: {
        status: '1',
        record: []
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
        this.form.record = [
          {
            date: '/',
            time: '/',
            T: '/',
            PHR: '/',
            P: '/',
            BP: '/',
            SPO2: '/',
            weight: '/',
            belly: '/',
            big: '/',
            detail: '/',
            sign: '/'
          }
        ]
      } else {
        this.form.status = '1'
        this.form.record = [
          {
            date: '2020-06-01',
            time: '15:00',
            T: '36.5',
            PHR: '1',
            P: '1',
            BP: '1',
            SPO2: '1',
            weight: '150',
            belly: '100',
            big: '1',
            detail: '',
            sign: '史秀英'
          },
          {
            date: '2020-07-01',
            time: '15:00',
            T: '36.5',
            PHR: '1',
            P: '1',
            BP: '1',
            SPO2: '1',
            weight: '150',
            belly: '100',
            big: '1',
            detail: '',
            sign: '史秀英'
          },
          {
            date: '2020-08-01',
            time: '15:00',
            T: '36.5',
            PHR: '1',
            P: '1',
            BP: '1',
            SPO2: '1',
            weight: '150',
            belly: '100',
            big: '1',
            detail: '',
            sign: '史秀英'
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
.el-radio {
  margin-right: 15px;
}
.el-checkbox-group {
  display: inline;
}
.after {
  position: relative;
  width: 100px;
}
.after::after {
  content: '';
  width: 109px;
  height: 1px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #666;
  transform-origin: left top;
  transform: rotateZ(24deg);
}
.span-score {
  position: absolute;
  top: 5px;
  right: 10px;
}
.span-date {
  position: absolute;
  bottom: 5px;
  left: 10px;
}
</style>
