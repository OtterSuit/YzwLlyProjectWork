<template>
  <div style="padding:30px">
    <div style="height:40px;line-height:40.8px">
      <span style="font-size:18px;">风险事项统计</span>
      <span style="font-size:12px;color:#999">本年度按月统计</span>
    </div>
    <m-bar
      style="margin-top:20px"
      :echart-style="style"
      :opinion-data="info"
      :opinion="info"
      :x="barX"
    />
    <el-table
      :data="info"
      style="width: 100%;margin-top:10px"
      :cell-style="tableStyle"
      :header-cell-style="tableStyle"
      border
    >
      <el-table-column
        prop="name"
        label="风险类型"
      />
      <el-table-column label="人数">
        <el-table-column
          v-for="(item,index) in barX"
          :key="item"
          :label="item"
        >
          <template slot-scope="scope">
            {{ info[scope.$index].data[index] }}
          </template>
        </el-table-column>
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
          name: '压疮',
          type: 'bar',
          data: [9, 4, 6, 12, 10, 16, 2]
        },
        {
          name: 'DVT',
          type: 'bar',
          data: [1, 5, 7, 8, 3, 2, 11]
        },
        {
          name: '导管滑脱',
          type: 'bar',
          data: [14, 9, 1, 13, 8, 9, 10]
        }
      ]
    }
  },
  created() {
    this.$store.dispatch('settings/changeTagsView', false)
  },
  methods: {
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

