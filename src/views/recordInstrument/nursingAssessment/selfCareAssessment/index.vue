<template>
  <div class="main">
    <table border="1" cellspacing="0" cellpadding="0">
      <tbody>
        <tr>
          <th rowspan="2">项目</th>
          <th rowspan="2">评估内容</th>
          <th rowspan="2">分值</th>
          <th colspan="6">评估时间及得分</th>
        </tr>
        <tr>
          <td style="width:100px">{{ tableData[0].date }}</td>
          <td style="width:100px">{{ tableData[1].date }}</td>
          <td style="width:100px">{{ tableData[2].date }}</td>
          <td style="width:100px">{{ tableData[3].date }}</td>
          <td style="width:100px">{{ tableData[4].date }}</td>
          <td style="width:100px">{{ tableData[5].date }}</td>
        </tr>
        <tr>
          <td rowspan="2">洗澡</td>
          <td class="textLeft">准备好洗澡水后，可自己独立完成洗澡过程</td>
          <td>5</td>
          <td rowspan="2">{{ tableData[0].score1 }}</td>
          <td rowspan="2">{{ tableData[1].score1 }}</td>
          <td rowspan="2">{{ tableData[2].score1 }}</td>
          <td rowspan="2">{{ tableData[3].score1 }}</td>
          <td rowspan="2">{{ tableData[4].score1 }}</td>
          <td rowspan="2">{{ tableData[5].score1 }}</td>
        </tr>
        <tr>
          <td class="textLeft">在洗澡过程中需他人帮助</td>
          <td>0</td>
        </tr>
        <tr>
          <td rowspan="2">修饰</td>
          <td class="textLeft">可自己独立完成</td>
          <td>5</td>
          <td rowspan="2">{{ tableData[0].score2 }}</td>
          <td rowspan="2">{{ tableData[1].score2 }}</td>
          <td rowspan="2">{{ tableData[2].score2 }}</td>
          <td rowspan="2">{{ tableData[3].score2 }}</td>
          <td rowspan="2">{{ tableData[4].score2 }}</td>
          <td rowspan="2">{{ tableData[5].score2 }}</td>
        </tr>
        <tr>
          <td class="textLeft">需他人帮助</td>
          <td>0</td>
        </tr>
        <tr>
          <td rowspan="3">进食</td>
          <td class="textLeft">可独立进食</td>
          <td>10</td>
          <td rowspan="3">{{ tableData[0].score3 }}</td>
          <td rowspan="3">{{ tableData[1].score3 }}</td>
          <td rowspan="3">{{ tableData[2].score3 }}</td>
          <td rowspan="3">{{ tableData[3].score3 }}</td>
          <td rowspan="3">{{ tableData[4].score3 }}</td>
          <td rowspan="3">{{ tableData[5].score3 }}</td>
        </tr>
        <tr>
          <td class="textLeft">需部分帮助</td>
          <td>5</td>
        </tr>
        <tr>
          <td class="textLeft">需极大帮助或完全依赖他人，或留置胃管</td>
          <td>0</td>
        </tr>
        <tr>
          <td rowspan="3">穿衣</td>
          <td class="textLeft">可独立完成</td>
          <td>10</td>
          <td rowspan="3">{{ tableData[0].score4 }}</td>
          <td rowspan="3">{{ tableData[1].score4 }}</td>
          <td rowspan="3">{{ tableData[2].score4 }}</td>
          <td rowspan="3">{{ tableData[3].score4 }}</td>
          <td rowspan="3">{{ tableData[4].score4 }}</td>
          <td rowspan="3">{{ tableData[5].score4 }}</td>
        </tr>
        <tr>
          <td class="textLeft">需部分帮助</td>
          <td>5</td>
        </tr>
        <tr>
          <td class="textLeft">需极大帮助或完全依赖他人</td>
          <td>0</td>
        </tr>
        <tr>
          <td rowspan="3">如厕</td>
          <td class="textLeft">可独立完成</td>
          <td>10</td>
          <td rowspan="3">{{ tableData[0].score5 }}</td>
          <td rowspan="3">{{ tableData[1].score5 }}</td>
          <td rowspan="3">{{ tableData[2].score5 }}</td>
          <td rowspan="3">{{ tableData[3].score5 }}</td>
          <td rowspan="3">{{ tableData[4].score5 }}</td>
          <td rowspan="3">{{ tableData[5].score5 }}</td>
        </tr>
        <tr>
          <td class="textLeft">需部分帮助</td>
          <td>5</td>
        </tr>
        <tr>
          <td class="textLeft">需极大帮助或完全依赖他人</td>
          <td>0</td>
        </tr>
        <tr>
          <td rowspan="3">控制大便</td>
          <td class="textLeft">可控制大便</td>
          <td>10</td>
          <td rowspan="3">{{ tableData[0].score6 }}</td>
          <td rowspan="3">{{ tableData[1].score6 }}</td>
          <td rowspan="3">{{ tableData[2].score6 }}</td>
          <td rowspan="3">{{ tableData[3].score6 }}</td>
          <td rowspan="3">{{ tableData[4].score6 }}</td>
          <td rowspan="3">{{ tableData[5].score6 }}</td>
        </tr>
        <tr>
          <td class="textLeft">偶尔失控，或需他人提示</td>
          <td>5</td>
        </tr>
        <tr>
          <td class="textLeft">完全失控</td>
          <td>0</td>
        </tr>
        <tr>
          <td rowspan="3">控制小便</td>
          <td class="textLeft">可控制小便</td>
          <td>10</td>
          <td rowspan="3">{{ tableData[0].score7 }}</td>
          <td rowspan="3">{{ tableData[1].score7 }}</td>
          <td rowspan="3">{{ tableData[2].score7 }}</td>
          <td rowspan="3">{{ tableData[3].score7 }}</td>
          <td rowspan="3">{{ tableData[4].score7 }}</td>
          <td rowspan="3">{{ tableData[5].score7 }}</td>
        </tr>
        <tr>
          <td class="textLeft">偶尔失控，或需他人提示</td>
          <td>5</td>
        </tr>
        <tr>
          <td class="textLeft">完全失控，或留置导尿管</td>
          <td>0</td>
        </tr>
        <tr>
          <td rowspan="3">上下楼梯</td>
          <td class="textLeft">可独立上下楼梯</td>
          <td>10</td>
          <td rowspan="3">{{ tableData[0].score7 }}</td>
          <td rowspan="3">{{ tableData[1].score7 }}</td>
          <td rowspan="3">{{ tableData[2].score7 }}</td>
          <td rowspan="3">{{ tableData[3].score7 }}</td>
          <td rowspan="3">{{ tableData[4].score7 }}</td>
          <td rowspan="3">{{ tableData[5].score7 }}</td>
        </tr>
        <tr>
          <td class="textLeft">需部分帮助</td>
          <td>5</td>
        </tr>
        <tr>
          <td class="textLeft">需极大帮助或完全依赖他人</td>
          <td>0</td>
        </tr>
        <tr>
          <td rowspan="4">床椅转移</td>
          <td class="textLeft">可独立完成</td>
          <td>15</td>
          <td rowspan="4">{{ tableData[0].score8 }}</td>
          <td rowspan="4">{{ tableData[1].score8 }}</td>
          <td rowspan="4">{{ tableData[2].score8 }}</td>
          <td rowspan="4">{{ tableData[3].score8 }}</td>
          <td rowspan="4">{{ tableData[4].score8 }}</td>
          <td rowspan="4">{{ tableData[5].score8 }}</td>
        </tr>
        <tr>
          <td class="textLeft">需部分帮助</td>
          <td>10</td>
        </tr>
        <tr>
          <td class="textLeft">需极大帮助</td>
          <td>5</td>
        </tr>
        <tr>
          <td class="textLeft">完全依赖他人</td>
          <td>0</td>
        </tr>
        <tr>
          <td rowspan="4">平地行走</td>
          <td class="textLeft">可独立在平地上行走45m</td>
          <td>15</td>
          <td rowspan="4">{{ tableData[0].score9 }}</td>
          <td rowspan="4">{{ tableData[1].score9 }}</td>
          <td rowspan="4">{{ tableData[2].score9 }}</td>
          <td rowspan="4">{{ tableData[3].score9 }}</td>
          <td rowspan="4">{{ tableData[4].score9 }}</td>
          <td rowspan="4">{{ tableData[5].score9 }}</td>
        </tr>
        <tr>
          <td class="textLeft">需部分帮助</td>
          <td>10</td>
        </tr>
        <tr>
          <td class="textLeft">需极大帮助</td>
          <td>5</td>
        </tr>
        <tr>
          <td class="textLeft">完全依赖他人</td>
          <td>0</td>
        </tr>
        <tr>
          <td colspan="3">评价总分</td>
          <td>{{ tableData[0].total }}</td>
          <td>{{ tableData[1].total }}</td>
          <td>{{ tableData[2].total }}</td>
          <td>{{ tableData[3].total }}</td>
          <td>{{ tableData[4].total }}</td>
          <td>{{ tableData[5].total }}</td>
        </tr>
        <tr>
          <td colspan="3">评估护士</td>
          <td>{{ tableData[0].nurse }}</td>
          <td>{{ tableData[1].nurse }}</td>
          <td>{{ tableData[2].nurse }}</td>
          <td>{{ tableData[3].nurse }}</td>
          <td>{{ tableData[4].nurse }}</td>
          <td>{{ tableData[5].nurse }}</td>
        </tr>
        <tr>
          <td colspan="9" class="textLeft" style="padding:10px;line-height:25px">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、说明：评分根据Barthel指数评定量表<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;进食：用合适的餐具将食物由容器送到口中，包括用筷子（勺子或叉子）取食物、对碗（碟）的把持、咀嚼、吞咽等过程。<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;修饰：包括洗脸、刷牙、梳头、刮脸等。<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;穿衣：包括穿脱衣服、系扣子、拉拉链、穿脱鞋袜、系鞋带等。<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如厕：包括去厕所、解开衣裤、擦净、整理衣裤、冲水等过程。<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、评估表应用时间选择：①入院（转科）当班；②患者自理能力发生变化时。<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、填写要求：①总分100分，无需依赖，无需他人照护；②总分61~99分，轻度依赖，少部分需他人照护；③总分41~60分，中度依赖，大部分需他人照护；④总分≤40分，重度依赖，全部需他人照护
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
            score1: '/',
            score2: '/',
            score3: '/',
            score4: '/',
            score5: '/',
            score6: '/',
            score7: '/',
            score8: '/',
            score9: '/',
            total: '/',
            nurse: '/'
          },
          {
            date: '/',
            score1: '/',
            score2: '/',
            score3: '/',
            score4: '/',
            score5: '/',
            score6: '/',
            score7: '/',
            score8: '/',
            score9: '/',
            total: '/',
            nurse: '/'
          },
          {
            date: '/',
            score1: '/',
            score2: '/',
            score3: '/',
            score4: '/',
            score5: '/',
            score6: '/',
            score7: '/',
            score8: '/',
            score9: '/',
            total: '/',
            nurse: '/'
          },
          {
            date: '/',
            score1: '/',
            score2: '/',
            score3: '/',
            score4: '/',
            score5: '/',
            score6: '/',
            score7: '/',
            score8: '/',
            score9: '/',
            total: '/',
            nurse: '/'
          },
          {
            date: '/',
            score1: '/',
            score2: '/',
            score3: '/',
            score4: '/',
            score5: '/',
            score6: '/',
            score7: '/',
            score8: '/',
            score9: '/',
            total: '/',
            nurse: '/'
          },
          {
            date: '/',
            score1: '/',
            score2: '/',
            score3: '/',
            score4: '/',
            score5: '/',
            score6: '/',
            score7: '/',
            score8: '/',
            score9: '/',
            total: '/',
            nurse: '/'
          }
        ]
      } else {
        this.form.status = '1'
        this.tableData = [
          {
            date: '2020-6-1',
            score1: '5',
            score2: '5',
            score3: '5',
            score4: '5',
            score5: '5',
            score6: '5',
            score7: '5',
            score8: '5',
            score9: '5',
            total: '45',
            nurse: '郭秀兰'
          },
          {
            date: '2020-7-1',
            score1: '5',
            score2: '5',
            score3: '5',
            score4: '5',
            score5: '5',
            score6: '5',
            score7: '5',
            score8: '5',
            score9: '5',
            total: '45',
            nurse: '郭秀兰'
          },
          {
            date: '2020-8-1',
            score1: '5',
            score2: '5',
            score3: '5',
            score4: '5',
            score5: '5',
            score6: '5',
            score7: '5',
            score8: '5',
            score9: '5',
            total: '45',
            nurse: '郭秀兰'
          },
          {
            date: '2020-9-1',
            score1: '5',
            score2: '5',
            score3: '5',
            score4: '5',
            score5: '5',
            score6: '5',
            score7: '5',
            score8: '5',
            score9: '5',
            total: '45',
            nurse: '郭秀兰'
          },
          {
            date: '2020-10-1',
            score1: '5',
            score2: '5',
            score3: '5',
            score4: '5',
            score5: '5',
            score6: '5',
            score7: '5',
            score8: '5',
            score9: '5',
            total: '45',
            nurse: '郭秀兰'
          },
          {
            date: '2020-11-1',
            score1: '5',
            score2: '5',
            score3: '5',
            score4: '5',
            score5: '5',
            score6: '5',
            score7: '5',
            score8: '5',
            score9: '5',
            total: '45',
            nurse: '郭秀兰'
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
.textLeft {
  padding: 0 10px;
  text-align: left;
}
</style>
