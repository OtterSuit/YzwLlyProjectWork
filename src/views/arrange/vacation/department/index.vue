<template>
  <div style="padding:30px">
    <myfilters
      ref="myfilters"
      title="科室请假汇总"
      :choose-department="true"
      :choose-type="true"
      :type-options="leaveType"
      :search-content="true"
      placeholder="请输入姓名"
      @departmentChange="departmentChange"
      @typeChange="typeChange"
      @contentChange="contentChange"
    />
    <el-table
      ref="filterTable"
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="realName"
        label="姓名"
      />
      <el-table-column label="职员类别">
        <template slot-scope="scope">
          {{ userType[scope.row.userType] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="开始日期"
      />
      <el-table-column
        prop="endTime"
        label="结束日期"
      />
      <el-table-column
        prop="leaveHours"
        label="请假时长"
      />
      <el-table-column
        label="请假类型"
      >
        <template slot-scope="scope">
          {{ leaveType[scope.row.leaveType] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="leaveReason"
        label="请假事由"
      />
    </el-table>
    <my-pagination :total="total" methods="getScheduleLeavesDepartment" :conditions="conditions" />
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import MyPagination from '@/components/MyPagination'
import api from '@/api'
import { leaveType, userType } from '@/common/js/constants'
export default {
  components: {
    myfilters, MyPagination
  },
  data() {
    return {
      leaveType: leaveType,
      userType: userType,
      tableData: [],
      listLoading: true,
      total: 0,
      conditions: {
        departmentId: null,
        name: null,
        leaveType: null
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getScheduleLeavesDepartment(this.conditions).then(response => {
        if (response.success) {
          console.log('科室请假汇总:', response)
          this.tableData = response.resData.items
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
    typeChange(type) {
      this.$set(this.conditions, 'leaveType', type)
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
