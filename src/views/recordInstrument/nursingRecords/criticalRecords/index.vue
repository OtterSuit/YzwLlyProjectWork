<template>
  <div class="main">
    <el-table
      :data="form.record"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      :cell-style="tableStyle"
      :header-cell-style="headStyle"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="110"
      />
      <el-table-column
        prop="time"
        label="时间"
      />
      <el-table-column
        prop="GCS"
        label="意识GCS评分"
      />
      <el-table-column
        prop="eye"
        label="瞳孔"
      />
      <el-table-column
        prop="CVP"
        label="CVP"
      />
      <el-table-column prop="oxygen">
        <template slot="header">
          吸氧<br>L/min
        </template>
      </el-table-column>
      <el-table-column prop="BP">
        <template slot="header">
          BP<br>(mmHg)
        </template>
      </el-table-column>
      <el-table-column
        prop="airCut"
        label="气切深度（cm）"
      />
      <el-table-column label="机械通气">
        <el-table-column
          prop="breathe"
          label="呼吸机模式"
          width="100"
        />
        <el-table-column
          prop="VT"
          label="VT"
        />
        <el-table-column prop="O2">
          <template slot="header">
            O<sub>2</sub>
          </template>
        </el-table-column>
        <el-table-column
          prop="Ti"
          label="Ti"
        />
        <el-table-column
          prop="RR"
          label="RR"
        />
        <el-table-column
          prop="PEEP"
          label="PEEP"
        />
      </el-table-column>
      <el-table-column
        prop="vein"
        label="静脉置管"
      />
      <el-table-column
        prop="belly"
        label="腹围"
      />
      <el-table-column
        prop="lying"
        label="卧位"
      />
      <el-table-column
        prop="skin"
        label="皮肤情况"
      />
      <el-table-column
        prop="sugar"
        label="血糖"
      />
      <el-table-column
        prop="detail"
        label="病情记录"
        width="300"
      />
      <el-table-column label="入量">
        <el-table-column
          prop="enter"
          label="名称"
        />
        <el-table-column
          prop="enterMl"
          label="数量（ml）"
          width="100"
        />
      </el-table-column>
      <el-table-column
        prop="enterTotal"
        label="总入量"
      />
      <el-table-column label="出量">
        <el-table-column
          prop="leave"
          label="名称"
        />
        <el-table-column
          prop="leaveMl"
          label="数量（ml）"
          width="100"
        />
      </el-table-column>
      <el-table-column
        prop="leaveTotal"
        label="总出量"
      />
      <el-table-column label="引流管1">
        <el-table-column
          prop="one"
          label="名称"
        />
        <el-table-column
          prop="oneCharacter"
          label="引流液性状"
          width="100"
        />
      </el-table-column>
      <el-table-column label="引流管2">
        <el-table-column
          prop="two"
          label="名称"
        />
        <el-table-column
          prop="twoCharacter"
          label="引流液性状"
          width="100"
        />
      </el-table-column>
      <el-table-column label="引流管3">
        <el-table-column
          prop="three"
          label="名称"
        />
        <el-table-column
          prop="threeCharacter"
          label="引流液性状"
          width="100"
        />
      </el-table-column>
      <el-table-column
        prop="sign"
        label="护士签名"
      />
    </el-table>
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
      operation: ['阑尾切除术', '胆囊切除术', '胆囊造口术', '水遁水龙弹之术', '螺旋丸'],
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
            id: 1,
            date: '/',
            time: '/',
            GCS: '/',
            eye: '/',
            CVP: '/',
            oxygen: '/',
            BP: '/',
            airCut: '/',
            breathe: '/',
            VT: '/',
            O2: '/',
            Ti: '/',
            RR: '/',
            PEEP: '/',
            vein: '/',
            belly: '/',
            lying: '/',
            skin: '/',
            sugar: '/',
            detail: '/',
            enter: '/',
            enterMl: '/',
            enterTotal: '/',
            leave: '/',
            leaveMl: '/',
            leaveTotal: '/',
            one: '/',
            oneCharacter: '/',
            two: '/',
            twoCharacter: '/',
            three: '/',
            threeCharacter: '/',
            sign: '/'
          }
        ]
      } else {
        this.form.status = '1'
        this.form.record = [
          {
            id: 1,
            date: '2020-6-1',
            time: '15:00',
            GCS: '0',
            eye: '1',
            CVP: '1',
            oxygen: '1',
            BP: '1',
            airCut: '1',
            breathe: '1',
            VT: '1',
            O2: '1',
            Ti: '1',
            RR: '1',
            PEEP: '1',
            vein: '1',
            belly: '100',
            lying: '1',
            skin: '1',
            sugar: '1',
            detail: '666',
            enter: '输液',
            enterMl: '1',
            enterTotal: '2',
            leave: '尿液',
            leaveMl: '3',
            leaveTotal: '2',
            one: '1',
            oneCharacter: '粘稠状',
            two: '2',
            twoCharacter: '粘稠状',
            three: '3',
            threeCharacter: '粘稠状',
            sign: '史秀英',

            children: [{
              id: 11,
              enter: '盐水',
              enterMl: '1',
              leave: '汗水',
              leaveMl: '1',
              one: '11',
              oneCharacter: '粘稠状',
              two: '22',
              twoCharacter: '粘稠状',
              three: '33',
              threeCharacter: '粘稠状'
            }, {
              id: 12,
              leave: '尿液',
              leaveMl: '2',
              one: '1',
              oneCharacter: '粘稠状',
              two: '2',
              twoCharacter: '粘稠状'
            }]
          },
          {
            id: 2,
            date: '2020-6-1',
            time: '15:00',
            GCS: '0',
            eye: '1',
            CVP: '1',
            oxygen: '1',
            BP: '1',
            airCut: '1',
            breathe: '1',
            VT: '1',
            O2: '1',
            Ti: '1',
            RR: '1',
            PEEP: '1',
            vein: '1',
            belly: '100',
            lying: '1',
            skin: '1',
            sugar: '1',
            detail: '666',
            enter: '输液',
            enterMl: '1',
            enterTotal: '2',
            leave: '尿液',
            leaveMl: '3',
            leaveTotal: '2',
            one: '1',
            oneCharacter: '粘稠状',
            two: '2',
            twoCharacter: '粘稠状',
            three: '3',
            threeCharacter: '粘稠状',
            sign: '史秀英',

            children: [{
              id: 21,
              enter: '盐水',
              enterMl: '1',
              leave: '汗水',
              leaveMl: '1',
              one: '11',
              oneCharacter: '粘稠状',
              two: '22',
              twoCharacter: '粘稠状',
              three: '33',
              threeCharacter: '粘稠状'
            }, {
              id: 22,
              leave: '尿液',
              leaveMl: '2',
              one: '1',
              oneCharacter: '粘稠状',
              two: '2',
              twoCharacter: '粘稠状'
            }]
          },
          {
            id: 3,
            date: '2020-6-1',
            time: '15:00',
            GCS: '0',
            eye: '1',
            CVP: '1',
            oxygen: '1',
            BP: '1',
            airCut: '1',
            breathe: '1',
            VT: '1',
            O2: '1',
            Ti: '1',
            RR: '1',
            PEEP: '1',
            vein: '1',
            belly: '100',
            lying: '1',
            skin: '1',
            sugar: '1',
            detail: '666',
            enter: '输液',
            enterMl: '1',
            enterTotal: '2',
            leave: '尿液',
            leaveMl: '3',
            leaveTotal: '2',
            one: '1',
            oneCharacter: '粘稠状',
            two: '2',
            twoCharacter: '粘稠状',
            three: '3',
            threeCharacter: '粘稠状',
            sign: '史秀英',

            children: [{
              id: 31,
              enter: '盐水',
              enterMl: '1',
              leave: '汗水',
              leaveMl: '1',
              one: '11',
              oneCharacter: '粘稠状',
              two: '22',
              twoCharacter: '粘稠状',
              three: '33',
              threeCharacter: '粘稠状'
            }, {
              id: 32,
              leave: '尿液',
              leaveMl: '2',
              one: '1',
              oneCharacter: '粘稠状',
              two: '2',
              twoCharacter: '粘稠状'
            }]
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
        textAlign: 'center',
        borderColor: '#787878'
      }
    },
    headStyle() {
      return {
        textAlign: 'center',
        color: '#606266',
        borderTop: '1px solid #787878',
        backgroundColor: '#fff',
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
