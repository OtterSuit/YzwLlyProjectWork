<template>
  <div style="padding:30px">
    <div style="height:40px;line-height:40.8px">
      <span style="font-size:18px;">跌倒地点统计</span>
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
      <el-table-column label="跌倒地点">
        <template slot-scope="scope">
          {{ lineX[scope.$index] }}
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
      lineX: ['床边', '病床过道', '洗手间门口', '病区走廊'],
      info: [
        {
          name: '人数',
          type: 'line',
          data: [6, 3, 18, 7]
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

