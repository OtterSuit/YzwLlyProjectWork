<template>
  <div style="padding:30px">
    <div style="height:40px;line-height:40.8px">
      <span style="font-size:18px;">不良事件数量统计</span>
      <span style="font-size:12px;color:#999">本年度按月统计</span>
      <i class="el-icon-s-data echartsIcon" style="margin-right:30px" :class="{activeIcon:activeIcon==='bar'}" @click="activeIconChange('bar')" />
      <i class="iconfont icon-jurassic_curve echartsIcon" style="font-weight:900" :class="{activeIcon:activeIcon==='line'}" @click="activeIconChange('line')" />
    </div>
    <m-line
      :echart-style="style"
      :opinion-data="info"
      :x="lineX"
    />
    <el-table
      :data="lineX"
      style="width: 100%;margin-top:10px"
      :cell-style="tableStyle"
      :header-cell-style="tableStyle"
      border
    >
      <el-table-column label="月份">
        <template slot-scope="scope">
          {{ lineX[scope.$index] }}
        </template>
      </el-table-column>
      <el-table-column label="次数">
        <template slot-scope="scope">
          {{ info[0].data[scope.$index] }}
        </template>
      </el-table-column>
      <el-table-column label="比例">
        <template slot-scope="scope">
          {{ proportion(info[0].data[scope.$index]) }}
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
      activeIcon: 'line',
      style: {
        height: '300px',
        width: '100%'
      },
      lineX: ['2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06', '2020-07'],
      info: [{
        name: '发生次数',
        type: 'line',
        data: [8, 7, 18, 12, 5, 3, 9],
        smooth: true,
        areaStyle: {
          color: 'rgba(64, 158, 255,.4)'
        }
      }],
      total: 0
    }
  },
  created() {
    this.info[0].data.forEach(item => {
      this.total += item
    })
  },
  methods: {
    // 不良事件图形类型转换
    activeIconChange(icon) {
      if (this.activeIcon === icon) return
      this.activeIcon = icon
      this.info[0].type = icon
    },
    proportion(num) {
      return (num / this.total * 100).toFixed(2) + '%'
    },
    tableStyle() {
      return {
        textAlign: 'center'
      }
    }
  }
}
</script>
<style lang="scss"  scoped>
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
  // margin-right: 20px;
}
.activeIcon {
  background:rgba(236,245,255,1);
  border:1px solid rgba(217,236,255,1);
  color: #409eff;
}
</style>

