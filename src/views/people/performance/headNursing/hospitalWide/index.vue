<template>
  <div>
    <div class="date-select">
      <el-date-picker
        v-model="time"
        type="month"
        :clearable="false"
        placeholder="请选择日期"
      />
    </div>
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
      <el-table-column
        prop="month"
        label="月份"
      />
      <el-table-column
        prop="name"
        label="姓名"
      />
      <el-table-column
        prop="ward"
        label="科室病区"
      />
      <el-table-column
        prop="score"
        label="分值"
      />
      <el-table-column
        prop="evaluator"
        label="评核人"
      />
      <el-table-column>
        <template slot="header">
          <el-button
            size="mini"
            icon="el-icon-download"
            @click="handleDownload"
          >导出列表</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleShow(scope.$index, scope.row)"
          >
            <i class="el-icon-tickets" /> 查看详细
          </el-button>
        </template>
      </el-table-column>
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
      time: Date.now(),
      activeIcon: 'line',
      style: {
        height: '300px',
        width: '100%'
      },
      lineX: ['赵美丽', '郭秀兰', '史秀英', '吕秀英', '袁丽', '胡丽', '许静'],
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
          name: '赵美丽（护士长）',
          ward: '呼吸内科 一病区',
          score: '112',
          evaluator: '李春兰 （护理部 主任）'
        },
        {
          month: '7月',
          name: '郭秀兰（护士长）',
          ward: '呼吸内科 一病区',
          score: '112',
          evaluator: '李春兰 （护理部 主任）'
        },
        {
          month: '7月',
          name: '史秀英（护士长）',
          ward: '呼吸内科 一病区',
          score: '112',
          evaluator: '李春兰 （护理部 主任）'
        },
        {
          month: '7月',
          name: '吕秀英（护士长）',
          ward: '呼吸内科 一病区',
          score: '112',
          evaluator: '李春兰 （护理部 主任）'
        },
        {
          month: '7月',
          name: '袁丽（护士长）',
          ward: '呼吸内科 一病区',
          score: '112',
          evaluator: '李春兰 （护理部 主任）'
        },
        {
          month: '7月',
          name: '胡丽（护士长）',
          ward: '呼吸内科 一病区',
          score: '112',
          evaluator: '李春兰 （护理部 主任）'
        },
        {
          month: '7月',
          name: '许静（护士长）',
          ward: '呼吸内科 一病区',
          score: '112',
          evaluator: '李春兰 （护理部 主任）'
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
    handleShow(index, row) {
      this.$router.push({
        name: 'headNursingDetails'
      })
    },
    handleDownload() {
      import('@/vendor/Export2Excel').then(excel => {
        const header = ['姓名', '科室病区', '分值', '评估人']
        const filterVal = [
          'name',
          'ward',
          'score',
          'evaluator'
        ]
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header,
          data,
          filename: '护士长工作质量-全院对比'
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
.date-select {
  width: 16%;
  position: absolute;
  right: 30px;
  top: 122px;
}
</style>

