<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="top box top1">
          <i class="iconfont icon-huishou top-icon" />
          <div class="top-title">器械回收</div>
          <div class="top-date">过去7日</div>
          <count-to
            :start-val="0"
            :end-val="top.instrument"
            :duration="3000"
            :autoplay="true"
            class="top-num"
          />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="top box top2">
          <i class="iconfont icon-tubiao- top-icon" />
          <div class="top-title">清洗消毒</div>
          <div class="top-date">过去7日</div>
          <count-to
            :start-val="0"
            :end-val="top.cleaning"
            :duration="3000"
            :autoplay="true"
            class="top-num"
          />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="top box top3">
          <i class="iconfont icon-zhuangpei top-icon" />
          <div class="top-title">审核装配</div>
          <div class="top-date">过去7日</div>
          <count-to
            :start-val="0"
            :end-val="top.assembly"
            :duration="3000"
            :autoplay="true"
            class="top-num"
          />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="top box top4">
          <i class="iconfont icon-fengbao top-icon" />
          <div class="top-title">审核封包</div>
          <div class="top-date">过去7日</div>
          <count-to
            :start-val="0"
            :end-val="top.packet"
            :duration="3000"
            :autoplay="true"
            class="top-num"
          />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="top box top5">
          <i class="iconfont icon-miejun top-icon" />
          <div class="top-title">灭菌</div>
          <div class="top-date">过去7日</div>
          <count-to
            :start-val="0"
            :end-val="top.sterilization"
            :duration="3000"
            :autoplay="true"
            class="top-num"
          />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="top box top6">
          <i class="iconfont icon-fahuo top-icon" />
          <div class="top-title">发货</div>
          <div class="top-date">过去7日</div>
          <count-to
            :start-val="0"
            :end-val="top.delivery"
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
          <span class="title">安全监控</span>
          <el-table
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column
              prop="packageName"
              label="包名称"
            />
            <el-table-column
              prop="packageCode"
              label="包条码"
            />
            <el-table-column
              prop="department"
              label="科室"
              width="120"
            />
            <el-table-column
              label="任务进度"
              width="200"
            >
              <template slot-scope="scope">
                <el-progress :text-inside="true" :stroke-width="22" :percentage="scope.row.progress" />
              </template>
            </el-table-column>
            <el-table-column
              prop="timeRemaining"
              label="剩余处理时间"
            />
          </el-table>
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

export default {
  components: {
    countTo,
    mLine,
    mPie
  },
  data() {
    return {
      tableData: [
        {
          packageName: '清创包',
          packageCode: 'QC234234',
          department: '手术室',
          progress: 30,
          timeRemaining: '00:15:32'
        },
        {
          packageName: '高水平消毒包',
          packageCode: 'GSP88213',
          department: '手术室',
          progress: 70,
          timeRemaining: '00:18:05'
        },
        {
          packageName: '高水平消毒包',
          packageCode: 'GSP99837',
          department: '口腔科',
          progress: 10,
          timeRemaining: '00:17:26'
        },
        {
          packageName: '清创包',
          packageCode: 'QC333532',
          department: '宫颈科',
          progress: 90,
          timeRemaining: '00:16:18'
        }
      ],
      activeIcon: 'line',
      top: {
        instrument: 2264,
        cleaning: 3268,
        assembly: 3132,
        packet: 1334,
        sterilization: 1039,
        delivery: 942
      },
      lineStyle: {
        height: '280px',
        width: '100%'
      },
      info: [{
        name: '发生次数',
        type: 'line',
        data: [18, 17, 38, 22, 10, 3],
        smooth: true,
        areaStyle: {
          color: 'rgba(64, 158, 255,.4)'
        }
      }],
      barX: ['产一科', '产三科', '手术室', '宫颈科', '儿二科', '妇保科'],
      opinion1: {
        textStyle: {
          color: '#8C8C8C'
        },
        left: 'auto',
        itemHeight: 9,
        icon: 'circle',
        data: ['总回收数量', '发放数量']
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
      data1: [
        { value: 5210, name: '总回收数量' },
        { value: 3712, name: '发放数量' }
      ],
      data2: [
        { value: 3962, name: '合格' },
        { value: 223, name: '报废' },
        { value: 414, name: '损耗' },
        { value: 46, name: '召回' }
      ],
      radius: ['50%', '70%'],
      style: {
        height: '270px',
        width: '100%'
      }
    }
  },
  methods: {
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
::v-deep .el-progress-bar__inner {
  text-align: left;
}
::v-deep .el-progress-bar__innerText {
  font-size: 10px;
}
::v-deep .el-progress-bar__outer {
  background:rgba(64,158,255,.1);
}
</style>
