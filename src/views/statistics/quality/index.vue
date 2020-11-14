<template>
  <div style="padding:30px">
    <myfilters
      :choose-date="true"
      title="质量指标统计"
      date-type="month"
      @dateChange="dateChange($event)"
    />
    <el-table
      :data="tableData"
      style="width: 100%"
      :cell-style="tableStyle"
      :header-cell-style="tableStyle"
      border
    >
      <el-table-column
        prop="word"
        label="病区"
      />
      <el-table-column
        prop="bed"
        label="床护比"
      />
      <el-table-column
        prop="nurse"
        label="护患比"
      />
    </el-table>
  </div>
</template>
<script>
import myfilters from '@/components/myfilters'
export default {
  components: {
    myfilters
  },
  data() {
    return {
      tableData: [
        {
          word: '急诊病区',
          bed: '1:0.2',
          nurse: '1:26'
        },
        {
          word: '儿科病区',
          bed: '1:0.3',
          nurse: '1:26'
        },
        {
          word: '中医病区',
          bed: '1:0.3',
          nurse: '1:24'
        },
        {
          word: '妇产科病区',
          bed: '1:0.3',
          nurse: '1:22'
        }
      ]
    }
  },
  methods: {
    tableStyle() {
      return {
        textAlign: 'center'
      }
    },
    dateChange(date) {
      console.log(date)
    }
  }
}
</script>
<style lang="scss"  scoped>
// ::v-deep .el-input__inner {
//   width: 220px;
// }
</style>

