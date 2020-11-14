<template>
  <div style="padding:30px">
    <myfilters
      ref="myfilters"
      title="年假管理"
      :search-content="true"
      placeholder="请输入姓名"
      :choose-department="true"
      @departmentChange="departmentChange"
      @contentChange="contentChange"
    />
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="realName"
        label="姓名"
      />
      <el-table-column
        prop="jobNum"
        label="工号"
      />
      <el-table-column
        label="职务"
      >
        <template slot-scope="scope">
          {{ jobPost[scope.row.jobPost] }}
        </template>
      </el-table-column>
      <el-table-column
        label="年假剩余"
      >
        <template slot-scope="scope">
          {{ scope.row.leaveHours }}小时
        </template>
      </el-table-column>
    </el-table>
    <my-pagination :total="total" methods="getScheduleLeavesSaved" :conditions="conditions" />
  </div>
</template>

<script>
import { jobPost } from '@/common/js/constants'
import MyPagination from '@/components/MyPagination'
import api from '@/api'
import myfilters from '@/components/myfilters'
export default {
  components: {
    myfilters, MyPagination
  },
  data() {
    return {
      jobPost: jobPost,
      tableData: [],
      listLoading: true,
      total: 0,
      conditions: {
        departmentId: null,
        name: null
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getScheduleLeavesAnnual(this.conditions).then(response => {
        if (response.success) {
          console.log('年假管理:', response)
          this.tableData = response.resData.items
          // this.tableData = response.resData
          this.total = response.resData.totalItems
          this.listLoading = false
        }
      })
    },
    departmentChange(department) {
      this.$set(this.conditions, 'departmentId', department)
      this.$set(this.conditions, 'PageIndex', 1)
      this.fetchData()
    },
    contentChange(content) {
      this.$set(this.conditions, 'name', content)
      this.$set(this.conditions, 'PageIndex', 1)
      this.fetchData()
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
</style>
