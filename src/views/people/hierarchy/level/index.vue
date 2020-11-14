<template>
  <div v-loading="loading" style="padding:30px">
    <div style="height:40px;line-height:40.8px">
      <span style="font-size:18px;">职称分析</span>
    </div>
    <m-bar
      :echart-style="style"
      :opinion-data="info"
      :x="barX"
    />
    <el-table
      :data="tableData"
      style="width: 100%;margin-top:10px"
      :cell-style="tableStyle"
      :header-cell-style="tableStyle"
      border
    >
      <el-table-column label="职称">
        <template slot-scope="scope">
          {{ jobTitleType[scope.row.jobTitleType] }}
        </template>
      </el-table-column>
      <el-table-column label="人数" prop="count" />
      <el-table-column label="比例" prop="proportion" />
    </el-table>
  </div>
</template>
<script>
import mBar from '@/components/echart/bar'
import { jobTitleType } from '@/common/js/constants'
import api from '@/api'
export default {
  components: {
    mBar
  },
  data() {
    return {
      jobTitleType: jobTitleType,
      style: {
        height: '300px',
        width: '100%'
      },
      barX: [],
      info: [
        {
          name: '人数',
          type: 'bar',
          data: []
        }
      ],
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
      api.getPersonHierarchy({ analysisType: 3 }).then(response => {
        if (response.success) {
          console.log('职称分析', response)
          this.tableData = response.resData.titles
          this.tableData.forEach(item => {
            this.barX.push(this.jobTitleType[item.jobTitleType])
            this.info[0].data.push(item.count)
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

