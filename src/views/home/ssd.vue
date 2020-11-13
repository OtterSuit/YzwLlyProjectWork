<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="top box top1">
          <i class="iconfont icon-huishou top-icon" />
          <div class="top-title">器械回收</div>
          <div class="top-date">过去7日</div>
          <count-to
            :start-val="0"
            :end-val="top.recycleWorkorderCount"
            :duration="3000"
            :autoplay="true"
            class="top-num"
          />
        </div>
      </el-col>
      <el-col :span="5">
        <div class="top box top2">
          <i class="iconfont icon-tubiao- top-icon" />
          <div class="top-title">清洗消毒</div>
          <div class="top-date">过去7日</div>
          <count-to
            :start-val="0"
            :end-val="top.cleanSubTaskCount"
            :duration="3000"
            :autoplay="true"
            class="top-num"
          />
        </div>
      </el-col>
      <el-col :span="5">
        <div class="top box top3">
          <i class="iconfont icon-zhuangpei top-icon" />
          <div class="top-title">审核装配</div>
          <div class="top-date">过去7日</div>
          <count-to
            :start-val="0"
            :end-val="top.assembleTaskCount"
            :duration="3000"
            :autoplay="true"
            class="top-num"
          />
        </div>
      </el-col>
      <el-col :span="5">
        <div class="top box top4">
          <i class="iconfont icon-fengbao top-icon" />
          <div class="top-title">审核封包</div>
          <div class="top-date">过去7日</div>
          <count-to
            :start-val="0"
            :end-val="top.packetSubTaskCount"
            :duration="3000"
            :autoplay="true"
            class="top-num"
          />
        </div>
      </el-col>
      <el-col :span="5">
        <div class="top box top5">
          <i class="iconfont icon-miejun top-icon" />
          <div class="top-title">灭菌</div>
          <div class="top-date">过去7日</div>
          <count-to
            :start-val="0"
            :end-val="top.sterilizeTaskCount"
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
          <span
            class="content"
            style="font-size: 12px; color: #999"
          >本年度按月统计</span>
          <i
            class="el-icon-s-data echartsIcon"
            :class="{ activeIcon: activeIcon === 'bar' }"
            @click.prevent="activeIconChange('bar')"
          />
          <i
            class="iconfont icon-jurassic_curve echartsIcon"
            style="font-weight: 900"
            :class="{ activeIcon: activeIcon === 'line' }"
            @click.prevent="activeIconChange('line')"
          />
          <m-line :echart-style="lineStyle" :opinion-data="info" :x="barX" />
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
            :center="['50%', '60%']"
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
            <el-table-column label="发放量/包" />
            <el-table-column label="回收量/包" />
            <el-table-column label="退回量/包" />
            <el-table-column label="报废量/个" />
            <el-table-column label="损耗量/个" />
          </el-table>
          <el-scrollbar style="height:210px;background: #fff">
            <el-table :data="tableData" style="width: 100%" :show-header="false">
              <el-table-column prop="month" />
              <el-table-column prop="sendingCount" />
              <el-table-column prop="recycleCount" />
              <el-table-column prop="returnCount" />
              <el-table-column prop="scrapCount" />
              <el-table-column prop="maintainAndLoseCount" />
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
            :center="['50%', '60%']"
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
      tableData: [], // 月度统计
      activeIcon: 'line',
      top: {
        recycleWorkorderCount: 0,
        cleanSubTaskCount: 0,
        assembleTaskCount: 0,
        packetSubTaskCount: 0,
        sterilizeTaskCount: 0
      },
      lineStyle: {
        height: '280px',
        width: '100%'
      },
      info: [
        {
          name: '发生次数',
          type: 'line',
          data: [],
          smooth: true,
          areaStyle: {
            color: 'rgba(64, 158, 255,.4)'
          }
        }
      ],
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
      data1: [],
      data2: [],
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
      api.getPageSsd().then(response => {
        console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.top = response.data
          response.data.workorderCommonApplyList.forEach(item => {
            console.log(item)
            this.barX.push(item.applyDeptName)
            this.info[0].data.push(item.count)
          })
          this.data1 = [
            { value: response.data.workorderRecycleCount, name: '总回收数量' },
            { value: response.data.workorderSendingCount, name: '总申领量' }
          ]
          this.tableData = response.data.monthStatistics
          this.data2 = [
            { value: response.data.qualityTest.passCount, name: '合格' },
            { value: response.data.qualityTest.scrapCount, name: '报废' },
            { value: response.data.qualityTest.maintainAndLose, name: '损耗' },
            { value: response.data.qualityTest.returnCount, name: '召回' }
          ]
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
  padding: 20px;
  background-color: #f0f2f5;
  min-height: calc(100vh - 50px);
}
.top {
  height: 140px;
  color: #fff;
  .top-title {
    font-size: 18px;
    height: 24px;
    line-height: 24px;
    margin-bottom: 2px;
  }
  .top-date {
    font-size: 12px;
    height: 16px;
    line-height: 16px;
    margin-bottom: 20px;
  }
  .top-num {
    font-size: 30px;
    height: 40px;
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
  box-shadow: 0px 0px 9px 3px rgba(0, 0, 0, 0.05);
  background-color: #fff;
  border-radius: 6px;
  margin-bottom: 20px;
  position: relative;
  padding: 20px;
}
.top1 {
  background: linear-gradient(
    180deg,
    rgba(64, 158, 255, 1) 0%,
    rgba(143, 197, 253, 1) 100%
  );
}
.top2 {
  background: linear-gradient(
    180deg,
    rgba(249, 148, 74, 1) 0%,
    rgba(255, 189, 140, 1) 100%
  );
}
.top3 {
  background: linear-gradient(
    180deg,
    rgba(33, 187, 184, 1) 0%,
    rgba(111, 232, 229, 1) 100%
  );
}
.top4 {
  background: linear-gradient(
    180deg,
    rgba(41, 192, 109, 1) 0%,
    rgba(124, 215, 165, 1) 100%
  );
}
.top5 {
  background: linear-gradient(
    180deg,
    rgba(255, 118, 118, 1) 0%,
    rgba(255, 176, 176, 1) 100%
  );
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
  width: 40px;
  height: 28px;
  background: rgba(244, 244, 245, 1);
  border-radius: 0px 3px 3px 0px;
  border: 1px solid rgba(233, 233, 235, 1);
  text-align: center;
  line-height: 28px;
  color: #bfcbd9;
  font-size: 18px;
  cursor: pointer;
  // margin-right: 20px;
}
.activeIcon {
  background: rgba(236, 245, 255, 1);
  border: 1px solid rgba(217, 236, 255, 1);
  color: #409eff;
}
.title {
  font-size: 18px;
  display: inline-block;
  margin-bottom: 20px;
}
.content {
  font-size: 12px;
  color: #999;
}
::v-deep .el-col-5 {
  width: 20%;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
