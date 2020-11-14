<template>
  <div class="main">
    <el-table
      :data="form.record"
      style="width: 100%;margin-bottom:30px"
      :cell-style="tableStyle"
      :header-cell-style="headStyle"
      border
    >
      <el-table-column
        prop="date"
        label="日期"
      />
      <el-table-column
        prop="time"
        label="时间"
      />
      <el-table-column
        prop="one"
        label="I类导管"
      />
      <el-table-column
        prop="two"
        label="II类导管"
      />
      <el-table-column
        prop="three"
        label="III类导管"
      />
      <el-table-column
        prop="mind"
        label="意识"
      />
      <el-table-column
        prop="other"
        label="其他"
      />
      <el-table-column
        prop="score"
        label="得分"
      />
      <el-table-column
        prop="detail"
        label="备注"
      />
      <el-table-column
        prop="sign"
        label="签名"
      />
    </el-table>
    <table border="1" cellspacing="0" cellpadding="0">
      <tbody>
        <tr>
          <th rowspan="8">危险因素评估</th>
          <th>项目</th>
          <th>危险因素</th>
          <th style="width:100px">分值</th>
          <th style="width:100px">评分</th>
          <th style="width:100px">总分</th>
        </tr>
        <tr>
          <td>I类导管</td>
          <td class="textLeft">胸管、T管、口鼻插管、动脉置管、气管切开管、脑室引流管、关节腔引流</td>
          <td>3分</td>
          <td>{{ form.score1 }}</td>
          <td rowspan="7">{{ form.total }}</td>
        </tr>
        <tr>
          <td>II类导管</td>
          <td class="textLeft">双套管、深静脉置管、三腔管、造瘘管、一次性负压引流管</td>
          <td>2分</td>
          <td>{{ form.score2 }}</td>
        </tr>
        <tr>
          <td>III类导管</td>
          <td class="textLeft">导尿管、胃管、输液管、吸氧管</td>
          <td>2分</td>
          <td>{{ form.score3 }}</td>
        </tr>
        <tr>
          <td>意识</td>
          <td class="textLeft">轻度烦躁2分；意识不清2分；<br>中度烦躁3分；重度烦躁5分；</td>
          <td>2-5分</td>
          <td>{{ form.score4 }}</td>
        </tr>
        <tr>
          <td rowspan="3">其他</td>
          <td class="textLeft">幼儿</td>
          <td>5分</td>
          <td>{{ form.score5 }}</td>
        </tr>
        <tr>
          <td class="textLeft">呃逆、呛咳</td>
          <td>2分</td>
          <td>{{ form.score6 }}</td>
        </tr>
        <tr>
          <td class="textLeft">肥胖（颈部短）</td>
          <td>2分</td>
          <td>{{ form.score7 }}</td>
        </tr>
      </tbody>
    </table>
    <div class="topContent">评分≥13分，为管道滑脱高危人群，得分越高风险越大，需执行相关的防护措施</div>
    <table border="1" cellspacing="0" cellpadding="0">
      <tbody>
        <tr>
          <td style="padding:10px 20px">
            <div class="middle-top">
              <span>护理措施：
                <el-checkbox-group v-model="form.checkbox1">
                  <el-checkbox label="1" disabled>妥善固定各通道</el-checkbox>
                  <el-checkbox label="2" disabled style="margin-right:0">躁动的病人给以适当的约束</el-checkbox>
                  <span>（肢体约束情况：</span>
                  <el-checkbox label="3" disabled style="margin-right:5px">上肢</el-checkbox>
                  <el-checkbox label="4" disabled style="margin-right:5px">下肢</el-checkbox>
                  <el-checkbox label="5" disabled style="margin-right:5px">躯干</el-checkbox>
                  <span>）</span>
                  <el-checkbox label="6" disabled>镇静镇痛</el-checkbox>
                  <el-checkbox label="7" disabled>给予心理疏导和宣教，指导病人及家属保护好管道</el-checkbox>
                  <el-checkbox label="8" disabled>班班交接管道的位置、刻度</el-checkbox>
                </el-checkbox-group>
              </span>
            </div>
            <div class="middle-top">
              <span>其他措施：{{ form.other }}</span>
            </div>
            <div class="middle-bottom">
              <span>护士签名
                <span class="content" style="width:20%">{{ form.nurseSign }}</span>
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table border="1" cellspacing="0" cellpadding="0" style="margin-top:30px">
      <tbody>
        <tr>
          <td colspan="2" class="textLeft">住院期间是否发生管道滑脱：{{ form.detail1 }}</td>
          <td colspan="3" class="textLeft">是（是请填写以下内容）</td>
        </tr>
        <tr>
          <td class="textLeft">发生日期时间：{{ form.detail2 }}</td>
          <td class="textLeft">当班人姓名：{{ form.detail3 }}</td>
          <td class="textLeft">身份：{{ form.detail4 }}</td>
          <td class="textLeft">职称：{{ form.detail5 }}</td>
          <td class="textLeft">管道名称：{{ form.detail6 }}</td>
        </tr>
        <tr>
          <td colspan="5" class="textLeft">
            <div class="third-table-div">发生过程描述：{{ form.detail7 }}</div>
          </td>
        </tr>
        <tr>
          <td colspan="5" class="textLeft">
            <div class="third-table-div">科室处理及改进措施：{{ form.detail8 }}</div>
          </td>
        </tr>
        <tr>
          <td colspan="5" class="textLeft">
            <div class="third-table-div">护理部追踪评价：{{ form.detail9 }}</div>
            <div class="third-table-span">
              <span>评价日期：
                <span class="content" style="width:10%">{{ form.detail10 }}</span>
              </span>
              <span>签名：
                <span class="content" style="width:10%">{{ form.detail11 }}</span>
              </span>
            </div>
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
      // tableData: [],
      form: {}
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
        this.form = {
          score1: '/',
          score2: '/',
          score3: '/',
          score4: '/',
          score5: '/',
          score6: '/',
          score7: '/',
          total: '/',
          checkbox1: [],
          other: '/',
          nurseSign: '/',
          detail1: '/',
          detail2: '/',
          detail3: '/',
          detail4: '/',
          detail5: '/',
          detail6: '/',
          detail7: '/',
          detail8: '/',
          detail9: '/',
          detail10: '/',
          detail11: '/',
          record: [
            {
              date: '/',
              time: '/',
              one: '/',
              two: '/',
              three: '/',
              mind: '/',
              other: '/',
              score: '/',
              detail: '/',
              sign: '/'
            }
          ]
        }
      } else {
        this.form = {
          status: '1',
          score1: '2',
          score2: '2',
          score3: '2',
          score4: '2',
          score5: '2',
          score6: '2',
          score7: '2',
          total: '14',
          checkbox1: ['1', '3', '5'],
          other: '无',
          nurseSign: '郭秀兰',
          detail1: '是',
          detail2: '2020-7-1',
          detail3: '郭秀兰',
          detail4: '间谍',
          detail5: '护士长',
          detail6: '胸管',
          detail7: '患者如闪电一般拔掉管道',
          detail8: '约束患者肢体',
          detail9: '约束全身',
          detail10: '2020-9-1',
          detail11: '郭秀兰',
          record: [
            {
              date: '2020-7-1',
              time: '15：00',
              one: '胸管',
              two: '双套管',
              three: '导尿管',
              mind: '轻度烦躁',
              other: '幼儿',
              score: '14',
              detail: '什么冬梅',
              sign: '郭秀兰'
            },
            {
              date: '2020-8-1',
              time: '15：00',
              one: '胸管',
              two: '双套管',
              three: '导尿管',
              mind: '轻度烦躁',
              other: '幼儿',
              score: '14',
              detail: '马什么梅',
              sign: '郭秀兰'
            },
            {
              date: '2020-9-1',
              time: '15：00',
              one: '胸管',
              two: '双套管',
              three: '导尿管',
              mind: '轻度烦躁',
              other: '幼儿',
              score: '14',
              detail: '马冬什么',
              sign: '郭秀兰'
            }
          ]
        }
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
        textAlign: 'center',
        borderColor: '#787878'
      }
    },
    headStyle() {
      return {
        textAlign: 'center',
        color: '#606266',
        backgroundColor: '#fff',
        borderTop: '1px solid #787878',
        borderColor: '#787878'
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
.topContent {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 30px;
  color: #666;
  font-size: 14px;
}
.middle-top {
  text-align: left;
  line-height: 25px;
}
.middle-bottom {
  line-height: 25px;
  text-align: end;
}
.third-table-div {
  height: 100px;
  margin-top: 10px;
}
.third-table-span {
  text-align: end;
  margin-bottom: 10px;
}
::v-deep .el-table__body {
    border-left: 1px solid #787878;
}
::v-deep .el-table__header {
    border-left: 1px solid #787878;
}
::v-deep .el-table__body, ::v-deep .el-table__footer,::v-deep  .el-table__header{
  table-layout: auto;
}
::v-deep .el-table--border::after, .el-table--group::after {
  width: 0;
}
::v-deep .el-table--border, .el-table--group {
  border: 0;
}
::v-deep .el-table {
  margin-left: 3px;
}
::v-deep .el-table::before {
  height: 0;
}
</style>
