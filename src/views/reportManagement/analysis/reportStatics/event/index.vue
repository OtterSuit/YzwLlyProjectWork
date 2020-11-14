<template>
  <div style="padding:10px 0 0">
    <m-pie
      class="echart"
      style="padding:0 20px"
      :echart-style="style"
      :opinion="opinion"
      :radius="radius"
      :center="center"
      :opinion-data="data"
    />
    <el-table
      :data="opinion.data"
      style="width: 100%;margin-top:10px"
      :cell-style="tableStyle"
      :header-cell-style="tableStyle"
      border
    >
      <el-table-column label="事件">
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
        right: '30%',
        top: 'center',
        data: ['患者跌倒', '患者压疮', '患者管道滑落']
      },
      data: [
        { value: 6, name: '患者跌倒' },
        { value: 8, name: '患者压疮' },
        { value: 2, name: '患者管道滑落' }
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

