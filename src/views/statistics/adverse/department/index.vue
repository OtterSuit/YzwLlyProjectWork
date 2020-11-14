<template>
  <div style="padding:30px 30px 0">
    <myfilters
      :choose-date="true"
      title="不良事件科室分布"
      date-type="month"
      style="margin-bottom:0"
    />
    <m-pie
      class="echart"
      style="padding:0 20px"
      :echart-style="style"
      :opinion="opinion"
      :radius="radius"
      :center="center"
      :opinion-data="data"
      label="{b}"
    />
    <el-table
      :data="opinion.data"
      style="width: 100%;margin-top:10px"
      :cell-style="tableStyle"
      :header-cell-style="tableStyle"
      border
    >
      <el-table-column label="科室">
        <template slot-scope="scope">
          {{ opinion.data[scope.$index] }}
        </template>
      </el-table-column>
      <el-table-column label="次数">
        <template slot-scope="scope">
          {{ data[scope.$index].value }}
        </template>
      </el-table-column>
      <el-table-column label="比例">
        <template slot-scope="scope">
          {{ proportion(data[scope.$index].value) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import myfilters from '@/components/myfilters'
import mPie from '@/components/echart/pie'
export default {
  components: {
    mPie,
    myfilters
  },
  data() {
    return {
      opinion: {
        orient: 'vertical',
        textStyle: {
          color: '#8C8C8C'
        },
        right: '33%',
        top: 'center',
        data: ['门诊室', '手术室', '供应室']
      },
      data: [
        { value: 64, name: '门诊室' },
        { value: 10, name: '手术室' },
        { value: 26, name: '供应室' }
      ],
      center: ['43%', '50%'],
      radius: ['50%', '70%'],
      style: {
        height: '290px',
        width: '100%'
      },
      total: 0
    }
  },
  created() {
    this.data.forEach(item => {
      this.total += item.value
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

