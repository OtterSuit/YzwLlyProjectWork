<template>
  <div style="padding:30px">
    <div style="height:40px;line-height:40.8px">
      <span style="font-size:18px;">床栏使用统计</span>
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
      <el-table-column label="使用床栏">
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
          <span v-show="scope.$index!==0">{{ proportion(info[0].data[scope.$index]) }}</span>
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
      lineX: ['跌倒人数', '使用床栏人数', '未使用床栏人数'],
      info: [
        {
          name: '人数',
          type: 'line',
          data: [24, 17, 7]
        }
      ]
    }
  },
  methods: {
    proportion(num) {
      return (num / this.info[0].data[0] * 100).toFixed(2) + '%'
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

