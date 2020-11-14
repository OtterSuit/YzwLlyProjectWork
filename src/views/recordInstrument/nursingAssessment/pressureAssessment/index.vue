<template>
  <div class="main">
    <table border="1" cellspacing="0" cellpadding="0">
      <tbody>
        <tr>
          <th rowspan="2">评估情况</th>
          <th>年龄</th>
          <th>体重</th>
          <th colspan="3">营养情况</th>
          <th colspan="3">浮肿</th>
          <th colspan="3">神智</th>
          <th colspan="2">体位</th>
          <th colspan="3">皮肤</th>
          <th colspan="4">感觉活动</th>
          <th>两便</th>
          <th colspan="2">其他</th>
          <th rowspan="3">得分</th>
          <th rowspan="3">护理措施</th>
          <th rowspan="3">签名</th>
        </tr>
        <tr>
          <td style="width:30px">≥70岁</td>
          <td style="width:30px">≥75kg</td>
          <td style="width:30px">全身消耗</td>
          <td style="width:30px">糖尿病</td>
          <td style="width:30px">低蛋白血症</td>
          <td style="width:30px">轻度</td>
          <td style="width:30px">中度</td>
          <td style="width:30px">重度</td>
          <td style="width:30px">淡漠</td>
          <td style="width:30px">躁动</td>
          <td style="width:30px">昏迷</td>
          <td style="width:30px">强迫体位</td>
          <td style="width:30px">绝对制动</td>
          <td style="width:30px">皮疹</td>
          <td style="width:30px">局部红肿</td>
          <td style="width:30px">其他严重皮肤病</td>
          <td style="width:30px">卧床</td>
          <td style="width:30px">感觉丧失</td>
          <td style="width:30px">肢体活动受限</td>
          <td style="width:30px">截瘫、偏瘫</td>
          <td style="width:30px">大便或小便失禁</td>
          <td style="width:30px">重要脏器衰竭</td>
          <td style="width:30px">带入压疮I/III</td>
        </tr>
        <tr>
          <td class="after">
            <span class="span-score">分值</span>
            <span class="span-date">日期</span>
          </td>
          <td>1</td>
          <td>2</td>
          <td>1</td>
          <td>1</td>
          <td>2</td>
          <td>0</td>
          <td>1</td>
          <td>2</td>
          <td>1</td>
          <td>1</td>
          <td>2</td>
          <td>2</td>
          <td>4</td>
          <td>1</td>
          <td>1</td>
          <td>2</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>2</td>
          <td>1</td>
          <td>4</td>
          <td>1/3</td>
        </tr>
        <tr v-for="item in form.record" :key="item.date">
          <td>{{ item.date }}</td>
          <td>{{ item.score1 }}</td>
          <td>{{ item.score2 }}</td>
          <td>{{ item.score3 }}</td>
          <td>{{ item.score4 }}</td>
          <td>{{ item.score5 }}</td>
          <td>{{ item.score6 }}</td>
          <td>{{ item.score7 }}</td>
          <td>{{ item.score8 }}</td>
          <td>{{ item.score9 }}</td>
          <td>{{ item.score10 }}</td>
          <td>{{ item.score11 }}</td>
          <td>{{ item.score12 }}</td>
          <td>{{ item.score13 }}</td>
          <td>{{ item.score14 }}</td>
          <td>{{ item.score15 }}</td>
          <td>{{ item.score16 }}</td>
          <td>{{ item.score17 }}</td>
          <td>{{ item.score18 }}</td>
          <td>{{ item.score19 }}</td>
          <td>{{ item.score20 }}</td>
          <td>{{ item.score21 }}</td>
          <td>{{ item.score22 }}</td>
          <td>{{ item.score23 }}</td>
          <td>{{ item.total }}</td>
          <td>{{ item.nurse }}</td>
          <td>{{ item.sign }}</td>
        </tr>
        <tr>
          <td colspan="27" class="textLeft" style="padding:10px;line-height:25px">备注：1、病人入院或转入2小时内评估。2、总分≥7分会有发生压疮的危险，告知患者与家属并签字，汇报护士长并签字，执行相关防护措施。3、高危压疮患者每周复评一次。4、病情变化及时复评。</td>
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
            score1: '/',
            score2: '/',
            score3: '/',
            score4: '/',
            score5: '/',
            score6: '/',
            score7: '/',
            score8: '/',
            score9: '/',
            score10: '/',
            score11: '/',
            score12: '/',
            score13: '/',
            score14: '/',
            score15: '/',
            score16: '/',
            score17: '/',
            score18: '/',
            score19: '/',
            score20: '/',
            score21: '/',
            score22: '/',
            score23: '/',
            total: '/',
            nurse: '/',
            sign: '/'
          }
        ]
      } else {
        this.form.status = '1'
        this.form.record = [
          {
            date: '2020-6-1',
            score1: '1',
            score2: '1',
            score3: '1',
            score4: '1',
            score5: '1',
            score6: '1',
            score7: '1',
            score8: '1',
            score9: '1',
            score10: '1',
            score11: '1',
            score12: '1',
            score13: '1',
            score14: '1',
            score15: '1',
            score16: '1',
            score17: '1',
            score18: '1',
            score19: '1',
            score20: '1',
            score21: '1',
            score22: '1',
            score23: '1',
            total: '24',
            nurse: '',
            sign: '郭秀兰'
          },
          {
            date: '2020-7-1',
            score1: '1',
            score2: '1',
            score3: '1',
            score4: '1',
            score5: '1',
            score6: '1',
            score7: '1',
            score8: '1',
            score9: '1',
            score10: '1',
            score11: '1',
            score12: '1',
            score13: '1',
            score14: '1',
            score15: '1',
            score16: '1',
            score17: '1',
            score18: '1',
            score19: '1',
            score20: '1',
            score21: '1',
            score22: '1',
            score23: '1',
            total: '24',
            nurse: '',
            sign: '郭秀兰'
          },
          {
            date: '2020-8-1',
            score1: '1',
            score2: '1',
            score3: '1',
            score4: '1',
            score5: '1',
            score6: '1',
            score7: '1',
            score8: '1',
            score9: '1',
            score10: '1',
            score11: '1',
            score12: '1',
            score13: '1',
            score14: '1',
            score15: '1',
            score16: '1',
            score17: '1',
            score18: '1',
            score19: '1',
            score20: '1',
            score21: '1',
            score22: '1',
            score23: '1',
            total: '24',
            nurse: '',
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
.textLeft {
  padding: 0 10px;
  text-align: left;
}
</style>
