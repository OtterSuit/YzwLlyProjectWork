<template>
  <div style="padding:30px">
    <myfilters
      :choose-date="true"
      title="每月病区数量统计"
      date-type="month"
      style="margin-bottom:0"
      @dateChange="dateChange($event)"
    />
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
      <el-table-column label="科室">
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
import myfilters from '@/components/myfilters'
export default {
  components: {
    mLine, myfilters
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
      lineX: ['胸外科', '麻醉科', '骨一科', '儿科', '妇科', '男科', '耳鼻咽喉科'],
      info: [
        {
          name: '人数',
          type: 'line',
          data: [7, 5, 11, 18, 3, 1, 16]
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
    dateChange(date) {
      console.log(date)
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
// ::v-deep .el-input__inner {
//   width: 220px;
// }
</style>

