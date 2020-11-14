<template>
  <div style="padding:10px 0">
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
      // title: '质量指标统计表',
      // addifo: '添加信息',
      // chooseDepartment: false,
      // chooseDate: false,
      // searchName: false,
      style: {
        height: '300px',
        width: '100%'
      },
      lineX: ['2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06', '2020-07'],
      info: [
        {
          name: '次数',
          type: 'line',
          data: [9, 4, 6, 12, 10, 16, 2]
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

