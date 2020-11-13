<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="top box top1">
          <i class="iconfont icon-keshi top-icon" />
          <div class="top-title">申领统计</div>
          <div class="top-date">过去7日</div>
          <count-to
            :start-val="0"
            :end-val="top.applyStatistics"
            :duration="3000"
            :autoplay="true"
            class="top-num"
          />
        </div>
      </el-col>
      <el-col :span="5">
        <div class="top box top2">
          <i class="iconfont icon-zhuangpei top-icon" />
          <div class="top-title">借入统计</div>
          <div class="top-date">过去7日</div>
          <count-to
            :start-val="0"
            :end-val="top.borrowIn"
            :duration="3000"
            :autoplay="true"
            class="top-num"
          />
        </div>
      </el-col>
      <el-col :span="5">
        <div class="top box top3">
          <i class="iconfont icon-fengbao top-icon" />
          <div class="top-title">借出统计</div>
          <div class="top-date">过去7日</div>
          <count-to
            :start-val="0"
            :end-val="top.borrowOut"
            :duration="3000"
            :autoplay="true"
            class="top-num"
          />
        </div>
      </el-col>
      <el-col :span="5">
        <div class="top box top4">
          <i class="iconfont icon-fahuo top-icon" />
          <div class="top-title">退回统计</div>
          <div class="top-date">过去7日</div>
          <count-to
            :start-val="0"
            :end-val="top.returnStatistics"
            :duration="3000"
            :autoplay="true"
            class="top-num"
          />
        </div>
      </el-col>
      <el-col :span="5">
        <div class="top box top5">
          <i class="iconfont icon-jichushuju top-icon" />
          <div class="top-title">缺损统计</div>
          <div class="top-date">过去7日</div>
          <count-to
            :start-val="0"
            :end-val="top.loseDamageStatistics"
            :duration="3000"
            :autoplay="true"
            class="top-num"
          />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="middle box">
          <span class="title">科室申领统计</span>
          <span class="content" style="font-size:12px;color:#999">本年度按月统计</span>
          <i class="el-icon-s-data echartsIcon" :class="{activeIcon:activeIcon==='bar'}" @click.prevent="activeIconChange('bar')" />
          <i class="iconfont icon-jurassic_curve echartsIcon" style="font-weight:900" :class="{activeIcon:activeIcon==='line'}" @click.prevent="activeIconChange('line')" />
          <m-line
            :echart-style="lineStyle"
            :opinion-data="info"
            :x="barX"
          />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="middle box">
          <span class="title">实时发放统计</span>
          <m-pie
            class="echart"
            :echart-style="style"
            :opinion="opinion1"
            :radius="radius"
            :opinion-data="data1"
            :center="['50%','60%']"
            label="{c}"
          />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">

        <div class="bottom box">
          <span class="title">月度统计</span>
          <el-table :data="tableData" style="width: 100%" class="hidden-table">
            <el-table-column label="月度/月" />
            <el-table-column label="数量/包" />
            <el-table-column label="同比" />
            <el-table-column label="环比" />
          </el-table>
          <el-scrollbar style="height:210px;background: #fff">
            <el-table :data="tableData" style="width: 100%" :show-header="false">
              <el-table-column prop="month" />
              <el-table-column prop="packetCount" />
              <el-table-column prop="commonCompare" />
              <el-table-column prop="ringCompare" />
            </el-table>
          </el-scrollbar>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="bottom box">
          <span class="title">质量监控</span>
          <m-pie
            class="echart"
            :echart-style="style"
            :opinion="opinion2"
            :radius="radius"
            :opinion-data="data2"
            :center="['50%','60%']"
            label="{c}"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
import mPie from '@/components/echart/pie'
import mLine from '@/components/echart/line'
import api from '@/api'

export default {
  components: {
    countTo,
    mLine,
    mPie
  },
  data() {
    return {
      ssd_workorder_category: null,
      tableData: [],
      activeIcon: 'line',
      top: {
        applyStatistics: 0,
        borrowIn: 0,
        borrowOut: 0,
        returnStatistics: 0,
        loseDamageStatistics: 0
      },
      lineStyle: {
        height: '280px',
        width: '100%'
      },
      info: [{
        name: '发生次数',
        type: 'line',
        data: [],
        smooth: true,
        areaStyle: {
          color: 'rgba(64, 158, 255,.4)'
        }
      }],
      barX: [],
      opinion1: {
        textStyle: {
          color: '#8C8C8C'
        },
        left: 'auto',
        itemHeight: 9,
        icon: 'circle',
        data: ['总回收数量', '总申领量']
      },
      opinion2: {
        left: 'auto',
        itemHeight: 9,
        textStyle: {
          color: '#8C8C8C'
        },
        icon: 'circle',
        data: ['合格', '报废', '损耗', '召回']
      },
      data1: [/*
        { value: null, name: '总回收数量' },
        { value: null, name: '总申领量' }
       */],
      data2: [/*
        { value: 3962, name: '合格' },
        { value: 223, name: '报废' },
        { value: 414, name: '损耗' },
        { value: 46, name: '召回' }
       */],
      radius: ['50%', '70%'],
      style: {
        height: '270px',
        width: '100%'
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      /* api.homeCommonApply().then(response => {
        console.log('申领统计', response)
      })
      api.homeStatictisCategory().then(response => {
        console.log('科室申领统计', response)
      })
      api.homeReturn().then(response => {
        console.log('退回统计', response)
      })
      api.homeLoseDamage().then(response => {
        console.log('缺损统计', response)
      })
      api.homeRecycleAndCommon().then(response => {
        console.log('实时发放统计（总回收和申请量统计）', response)
      })
      api.homeMonth().then(response => {
        console.log('月度统计', response)
      }) */
      api.getPageSss().then(response => {
        console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.ssd_workorder_category = response.data.dictData.ssd_workorder_category
          response.data.deptApplyStatistics.forEach(item => {
            this.barX.push(this.ssd_workorder_category[item.category])
            this.info[0].data.push(item.packetCount)
          })
          this.top = response.data
          this.data1 = [
            { value: response.data.recycleAndCommonStatistics.recycleCount, name: '总回收数量' },
            { value: response.data.recycleAndCommonStatistics.commonApplyCount, name: '总申领量' }
          ]
          this.data2 = [
            { value: response.data.qtMonitorStatistics.passCount, name: '合格' },
            { value: response.data.qtMonitorStatistics.scrapCount, name: '报废' },
            { value: response.data.qtMonitorStatistics.brokenCount, name: '损耗' },
            { value: response.data.qtMonitorStatistics.callBackCount, name: '召回' }
          ]
          this.tableData = response.data.monthStatistics
        }
      })
    },
    // 不良事件图形类型转换
    activeIconChange(icon) {
      if (this.activeIcon === icon) return
      this.activeIcon = icon
      this.info[0].type = icon
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding:20px;
  background-color:#F0F2F5;
  min-height: calc(100vh - 50px);
}
.top {
  height: 140px;
  color: #fff;
  .top-title{
    font-size: 18px;
    height:24px;
    line-height: 24px;
    margin-bottom: 2px;
  }
  .top-date {
    font-size: 12px;
    height:16px;
    line-height: 16px;
    margin-bottom: 20px;
  }
  .top-num {
    font-size: 30px;
    height:40px;
    line-height: 40px;
  }
}
.middle {
  height: 360px;
}
.bottom {
  height: 340px;
}
.box {
  box-shadow:0px 0px 9px 3px rgba(0,0,0,0.05);
  background-color: #fff;
  border-radius:6px;
  margin-bottom: 20px;
  position: relative;
  padding: 20px;
}
.top1 {
  background:linear-gradient(180deg,rgba(64,158,255,1) 0%,rgba(143,197,253,1) 100%);
}
.top2 {
  background:linear-gradient(180deg,rgba(249,148,74,1) 0%,rgba(255,189,140,1) 100%);
}
.top3 {
  background:linear-gradient(180deg,rgba(33,187,184,1) 0%,rgba(111,232,229,1) 100%);
}
.top4 {
  background:linear-gradient(180deg,rgba(41,192,109,1) 0%,rgba(124,215,165,1) 100%);
}
.top5 {
  background:linear-gradient(180deg,rgba(255,118,118,1) 0%,rgba(255,176,176,1) 100%);
}
.top6 {
  background:linear-gradient(180deg,rgba(27,172,193,1) 0%,rgba(118,218,228,1) 100%);
}
.top-icon {
  color: #fff;
  opacity: 0.1;
  font-size: 84px;
  position: absolute;
  bottom: 0px;
  right: 6px;
}
.echartsIcon {
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
  // margin-right: 20px;
}
.activeIcon {
  background:rgba(236,245,255,1);
  border:1px solid rgba(217,236,255,1);
  color: #409eff;
}
.title {
  font-size:18px;
  display: inline-block;
  margin-bottom: 20px;
}
.content {
  font-size:12px;
  color:#999;
}
::v-deep .el-col-5 {
  width:20%
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
