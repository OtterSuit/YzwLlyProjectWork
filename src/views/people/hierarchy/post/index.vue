<template>
  <div style="padding:30px 30px 0">
    <div style="height:40px;line-height:40.8px">
      <span style="font-size:18px;">岗位分布</span>
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
      <el-table-column label="岗位">
        <template slot-scope="scope">
          {{ jobPost[scope.row.jobPost] }}
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
import { jobPost } from '@/common/js/constants'
export default {
  components: {
    mPie
  },
  data() {
    return {
      jobPost: jobPost,
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
      api.getPersonHierarchy({ analysisType: 7 }).then(response => {
        if (response.success) {
          console.log('岗位分布', response)
          this.tableData = response.resData.posts
          this.tableData.forEach(item => {
            this.data.push({ value: item.count, name: this.jobPost[item.jobPost] })
            this.opinion.data.push(this.jobPost[item.jobPost])
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
