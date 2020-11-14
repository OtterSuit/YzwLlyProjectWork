<template>
  <div style="padding:30px">
    <div style="height:40px;line-height:40.8px">
      <span style="font-size:18px;">教育培训参加人数统计</span>
      <span style="font-size:12px;color:#999">本年度按月统计</span>
    </div>
    <m-bar
      :echart-style="style"
      :opinion-data="info"
      :x="barX"
    />
    <el-table
      :data="barX"
      style="width: 100%;margin-top:10px"
      :cell-style="tableStyle"
      :header-cell-style="tableStyle"
      border
    >
      <el-table-column label="月份">
        <template slot-scope="scope">
          {{ barX[scope.$index] }}
        </template>
      </el-table-column>
      <el-table-column label="人数">
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
import mBar from '@/components/echart/bar'
export default {
  components: {
    mBar
  },
  data() {
    return {
      // title: '质量指标统计表',
      // addifo: '添加信息',
      // chooseDepartment: false,
      // chooseDate: false,
      // searchName: false,
      style: {
        height: '300px',
        width: '100%'
      },
      barX: ['2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06', '2020-07'],
      info: [
        {
          name: '人数',
          type: 'bar',
          data: [28, 24, 34, 38, 49, 21, 46]
        }
      ],
      total: 0
    }
  },
  created() {
    this.info[0].data.forEach(item => {
      this.total += item
    })
  },
  methods: {
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
// ::v-deep .el-input__inner {
//   width: 220px;
// }
</style>

