<template>
  <div style="padding:30px 30px 0">
    <div style="height:40px;line-height:40.8px">
      <span style="font-size:18px;">人员构成统计</span>
    </div>
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
      <el-table-column label="职称">
        <template slot-scope="scope">
          {{ opinion.data[scope.$index] }}
        </template>
      </el-table-column>
      <el-table-column label="人数">
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
import mPie from '@/components/echart/pie'
export default {
  components: {
    mPie
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
        data: ['护士', '护师', '主管护师', '副主任护师', '主任护师']
      },
      data: [
        { value: 106, name: '护士' },
        { value: 70, name: '护师' },
        { value: 16, name: '主管护师' },
        { value: 6, name: '副主任护师' },
        { value: 2, name: '主任护师' }
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

