<template>
  <div>
    <div class="top-icon">
      <i class="el-icon-s-data echartsIcon" style="margin-right:30px" :class="{activeIcon:activeIcon==='bar'}" @click="activeIconChange('bar')" />
      <i class="iconfont icon-jurassic_curve echartsIcon" style="font-weight:900" :class="{activeIcon:activeIcon==='line'}" @click="activeIconChange('line')" />
    </div>
    <m-line
      :echart-style="style"
      :opinion-data="info"
      :opinion="opinion"
      top="20%"
      :x="lineX"
    />
    <el-table
      :data="tableData"
      style="width: 100%;margin-top:40px"
      :cell-style="tableStyle"
      :header-cell-style="tableStyle"
      border
    >
      <el-button
        size="mini"
        icon="el-icon-download"
        @click="handleDownload"
      >导出列表</el-button>
      <el-table-column
        prop="month"
        label="月份"
        fixed
      />
      <el-table-column
        prop="score"
        label="总分数"
        fixed
      />
      <el-table-column>
        <template slot="header">
          工作量系数
          <el-tooltip class="item" effect="light" placement="bottom">
            <div slot="content">
              <div class="tooltip-content">
                <span>白班系数：0.5</span>
                <span>夜班系数：0.5</span>
              </div>
              <div class="tooltip-content">
                工作量系数=白班次数x白板系数+夜班次数x夜班系数
              </div>
            </div>
            <i class="iconfont icon-ziyuan" />
          </el-tooltip>
        </template>
        <el-table-column
          prop="A"
          label="A班次数"
          width="100"
        />
        <el-table-column
          prop="P"
          label="P班次数"
          width="100"
        />
        <el-table-column
          prop="N"
          label="N班次数"
          width="100"
        />
        <el-table-column
          prop="responsible"
          label="责任班次数"
          width="100"
        />
        <el-table-column
          prop="advice"
          label="医嘱班次数"
          width="100"
        />
        <el-table-column
          prop="motor"
          label="机动班次数"
          width="100"
        />
      </el-table-column>
      <el-table-column>
        <template slot="header">
          岗位系数
          <el-tooltip class="item" effect="light" placement="bottom">
            <div slot="content">
              <div class="tooltip-content">
                工龄系数：1年=0.01
              </div>
              <div class="tooltip-content">
                <span>职称系数：护士=1.00</span>
                <span>护师=1.10</span>
              </div>
            </div>
            <i class="iconfont icon-ziyuan" />
          </el-tooltip>
        </template>
        <el-table-column
          prop="service"
          label="工龄系数"
        />
        <el-table-column
          prop="duty"
          label="职称系数"
        />
      </el-table-column>
      <el-table-column>
        <template slot="header">
          工作质量系数
          <el-tooltip class="item" effect="light" placement="bottom">
            <div slot="content">
              <div class="tooltip-content">
                工作质量系数=各分项系数的总和
              </div>
              <div class="tooltip-content">
                满分0.8不含扣分项及加分项
              </div>
            </div>
            <i class="iconfont icon-ziyuan" />
          </el-tooltip>
        </template>
        <el-table-column
          prop="job"
          label="岗位职责"
        />
        <el-table-column
          prop="nursing"
          label="基础护理"
        />
        <el-table-column
          prop="document"
          label="文书质量"
        />
        <el-table-column
          prop="theory"
          label="理论考核"
        />
        <el-table-column
          prop="technology"
          label="技术考核"
        />
        <el-table-column
          prop="onTime"
          label="按时到岗"
        />
        <el-table-column
          prop="business"
          label="业务学习"
        />
        <el-table-column
          prop="leave"
          label="请假情况"
        />
        <el-table-column
          prop="responsibility"
          label="责任心"
        />
        <el-table-column
          prop="instrument"
          label="仪表仪态"
        />
        <el-table-column
          prop="attitude"
          label="服务态度"
        />
        <el-table-column
          prop="smallError"
          label="轻微错误"
        />
        <el-table-column
          prop="bigError"
          label="严重错误"
        />
        <el-table-column
          prop="add"
          label="加分项"
        />
      </el-table-column>
      <el-table-column
        prop="evaluator"
        label="评核人"
        width="200"
      />
    </el-table>
  </div>
</template>
<script>
import mLine from '@/components/echart/line'
export default {
  components: {
    mLine
  },
  data() {
    return {
      activeIcon: 'line',
      style: {
        height: '300px',
        width: '100%'
      },
      lineX: ['2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06', '2020-07'],
      info: [
        {
          name: '环比',
          type: 'line',
          data: [12, 8, 2, 13, 5, 7, 14],
          smooth: true
        },
        {
          name: '同比',
          type: 'line',
          data: [6, 13, 6, 5, 6, 18, 8],
          smooth: true
        }
      ],
      opinion: {
        icon: 'path://M664.1 113c-3.8 0-7.6 0.2-11.3 0.5-36.3 3.1-68.9 20.6-96.9 52.1-28.4 32-52.5 79.4-71.4 140.8-32.4 105-66.1 182.6-100.3 230.6-25.5 35.8-50.2 54-73.4 54h-0.4c-38.8-0.4-84.8-51-129.3-142.7-37-76.2-59.4-153-59.7-153.8L64 313.4c1 3.4 24.3 83.1 63.7 164.3 56.8 117 118.1 176.6 182.1 177.3h1c43 0 83.8-26.7 121.2-79.3 38.2-53.7 75.1-137.5 109.5-249.3 29.3-94.9 68.3-145.1 116-149.1 21.3-1.8 45.6 5.2 72.2 20.9 24.5 14.4 50.3 35.8 76.8 63.5 49.6 51.9 87.7 111.9 100.1 137.6L960 370c-14.6-30.4-56.4-96.4-111.4-154-30.4-31.8-60.6-56.6-89.9-73.9-32.8-19.3-64.6-29.1-94.6-29.1z',
        data: ['环比', '同比'],
        left: '1%',
        top: '3%',
        itemHeight: 10,
        itemGap: 25
      },
      tableData: [
        {
          month: '7月',
          score: '14.33',
          A: '10',
          P: '8',
          N: '10',
          responsible: '5',
          advice: '5',
          motor: '5',
          service: '0.03',
          duty: '1.00',
          job: '0.1',
          nursing: '0.1',
          document: '0.1',
          theory: '0.1',
          technology: '0.1',
          onTime: '0.05',
          business: '0.05',
          leave: '0.05',
          responsibility: '0.05',
          instrument: '0.05',
          attitude: '0.05',
          smallError: '0',
          bigError: '0',
          add: '0',
          evaluator: '李丽丽（护士长）'
        },
        {
          month: '6月',
          score: '14.33',
          A: '10',
          P: '8',
          N: '10',
          responsible: '5',
          advice: '5',
          motor: '5',
          service: '0.03',
          duty: '1.00',
          job: '0.1',
          nursing: '0.1',
          document: '0.1',
          theory: '0.1',
          technology: '0.1',
          onTime: '0.05',
          business: '0.05',
          leave: '0.05',
          responsibility: '0.05',
          instrument: '0.05',
          attitude: '0.05',
          smallError: '0',
          bigError: '0',
          add: '0',
          evaluator: '李丽丽（护士长）'
        },
        {
          month: '5月',
          score: '14.33',
          A: '10',
          P: '8',
          N: '10',
          responsible: '5',
          advice: '5',
          motor: '5',
          service: '0.03',
          duty: '1.00',
          job: '0.1',
          nursing: '0.1',
          document: '0.1',
          theory: '0.1',
          technology: '0.1',
          onTime: '0.05',
          business: '0.05',
          leave: '0.05',
          responsibility: '0.05',
          instrument: '0.05',
          attitude: '0.05',
          smallError: '0',
          bigError: '0',
          add: '0',
          evaluator: '李丽丽（护士长）'
        },
        {
          month: '4月',
          score: '14.33',
          A: '10',
          P: '8',
          N: '10',
          responsible: '5',
          advice: '5',
          motor: '5',
          service: '0.03',
          duty: '1.00',
          job: '0.1',
          nursing: '0.1',
          document: '0.1',
          theory: '0.1',
          technology: '0.1',
          onTime: '0.05',
          business: '0.05',
          leave: '0.05',
          responsibility: '0.05',
          instrument: '0.05',
          attitude: '0.05',
          smallError: '0',
          bigError: '0',
          add: '0',
          evaluator: '李丽丽（护士长）'
        },
        {
          month: '3月',
          score: '14.33',
          A: '10',
          P: '8',
          N: '10',
          responsible: '5',
          advice: '5',
          motor: '5',
          service: '0.03',
          duty: '1.00',
          job: '0.1',
          nursing: '0.1',
          document: '0.1',
          theory: '0.1',
          technology: '0.1',
          onTime: '0.05',
          business: '0.05',
          leave: '0.05',
          responsibility: '0.05',
          instrument: '0.05',
          attitude: '0.05',
          smallError: '0',
          bigError: '0',
          add: '0',
          evaluator: '李丽丽（护士长）'
        },
        {
          month: '2月',
          score: '14.33',
          A: '10',
          P: '8',
          N: '10',
          responsible: '5',
          advice: '5',
          motor: '5',
          service: '0.03',
          duty: '1.00',
          job: '0.1',
          nursing: '0.1',
          document: '0.1',
          theory: '0.1',
          technology: '0.1',
          onTime: '0.05',
          business: '0.05',
          leave: '0.05',
          responsibility: '0.05',
          instrument: '0.05',
          attitude: '0.05',
          smallError: '0',
          bigError: '0',
          add: '0',
          evaluator: '李丽丽（护士长）'
        },
        {
          month: '1月',
          score: '14.33',
          A: '10',
          P: '8',
          N: '10',
          responsible: '5',
          advice: '5',
          motor: '5',
          service: '0.03',
          duty: '1.00',
          job: '0.1',
          nursing: '0.1',
          document: '0.1',
          theory: '0.1',
          technology: '0.1',
          onTime: '0.05',
          business: '0.05',
          leave: '0.05',
          responsibility: '0.05',
          instrument: '0.05',
          attitude: '0.05',
          smallError: '0',
          bigError: '0',
          add: '0',
          evaluator: '李丽丽（护士长）'
        }
      ]
    }
  },
  methods: {
    // 不良事件图形类型转换
    activeIconChange(icon) {
      if (this.activeIcon === icon) return
      this.activeIcon = icon
      this.info[0].type = icon
      this.info[1].type = icon
    },
    tableStyle() {
      return {
        textAlign: 'center'
      }
    },
    handleDownload() {
      import('@/vendor/Export2Excel').then(excel => {
        const multiHeader = [
          ['月份', '总分数', '工作量系数', '', '', '', '', '', '岗位系数', '', '工作质量系数', '', '', '', '', '', '', '', '', '', '', '', '', '', '评核人']
        ]
        const header = ['', '', 'A班次数', 'P班次数', 'N班次数', '责任班次数', '医嘱班次数', '机动班次数', '工龄系数', '职称系数', '岗位职责', '基础护理', '文书质量', '理论考核', '技术考核', '按时到岗', '业务学习', '请假情况', '责任心', '仪表仪态', '服务态度', '轻微错误', '严重错误', '加分项', '']
        const merges = ['A1:A2', 'B1:B2', 'C1:H1', 'I1:J1', 'K1:X1', 'Y1:Y2']
        const filterVal = [
          'month',
          'score',
          'A',
          'P',
          'N',
          'responsible',
          'advice',
          'motor',
          'service',
          'duty',
          'job',
          'nursing',
          'document',
          'theory',
          'technology',
          'onTime',
          'business',
          'leave',
          'responsibility',
          'instrument',
          'attitude',
          'smallError',
          'bigError',
          'add',
          'evaluator'
        ]
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          multiHeader,
          header,
          merges,
          data,
          filename: '个人绩效-月度对比'
        })
      })
    },
    formatJson(filterVal) {
      return this.tableData.map(v => filterVal.map(j => {
        return v[j]
      }))
    }
  }
}
</script>
<style lang="scss"  scoped>
.top-icon {
  position: absolute;
  right: 10px;
  z-index: 1;
}
.echartsIcon {
  margin-top: 6px;
  float: right;
  width:40px;
  height:28px;
  background:rgba(244,244,245,1);
  border-radius:0px 3px 3px 0px;
  border:1px solid rgba(233,233,235,1);
  text-align: center;
  line-height: 28px;
  color: #BFCBD9;
  font-size: 18px;
  cursor: pointer;
}
.activeIcon {
  background:rgba(236,245,255,1);
  border:1px solid rgba(217,236,255,1);
  color: #409eff;
}
.icon-ziyuan {
  font-weight: 500;
  vertical-align: middle;
}
.tooltip-content {
  height:24px;
  font-size:12px;
  color:rgba(102,102,102,1);
  line-height:24px;
  span {
    margin-right: 25px;
  }
}
::v-deep .cell {
  overflow: visible;
}
::v-deep .hidden-columns {
  z-index: 4;
  top: 0;
  right: 0;
  visibility: visible;
}
</style>
<style>
.el-tooltip__popper.is-light {
  background:rgba(255,255,255,1);
  box-shadow:4px 4px 20px 0px rgba(0,0,0,0.1);
  border:1px solid rgba(216,216,216,1);
  padding: 10px 20px;
}
.el-tooltip__popper .popper__arrow {
  border-width: 0;
}
</style>

