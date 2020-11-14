<template>
  <div v-loading="loading" style="padding:30px 30px 0">
    <div style="height:40px;line-height:40.8px">
      <span style="font-size:18px;">离职率</span>
    </div>
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
      :data="tableData"
      style="width: 100%;margin-top:10px"
      :cell-style="tableStyle"
      :header-cell-style="tableStyle"
      border
    >
      <el-table-column label="人员类别">
        <template slot-scope="scope">
          {{ gender[scope.row.gender] }}
        </template>
      </el-table-column>
      <el-table-column label="人数" prop="count" />
      <el-table-column label="比例" prop="proportion" />
    </el-table>
  </div>
</template>
<script>
import mPie from '@/components/echart/pie'
import api from '@/api'
import { gender } from '@/common/js/constants'
export default {
  components: {
    mPie
  },
  data() {
    return {
      gender: gender,
      opinion: {
        orient: 'vertical',
        textStyle: {
          color: '#8C8C8C'
        },
        right: '33%',
        top: 'center',
        data: []
      },
      data: [],
      center: ['43%', '50%'],
      radius: ['50%', '70%'],
      style: {
        height: '290px',
        width: '100%'
      },
      tableData: [],
      loading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      api.getPersonHierarchy({ analysisType: 6 }).then(response => {
        if (response.success) {
          console.log('离职率', response)
          this.tableData = response.resData.dismissions
          this.tableData.forEach(item => {
            this.data.push({ value: item.count, name: this.gender[item.gender] })
            this.opinion.data.push(this.gender[item.gender])
          })
          this.loading = false
        }
      })
    },
    tableStyle() {
      return {
        textAlign: 'center'
      }
    }
  }
}
</script>

