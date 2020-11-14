<template>
  <div style="padding:30px">
    <!-- <el-date-picker
      v-model="month"
      type="month"
      :clearable="false"
      @change="dateChange"
    /> -->
    <!-- 添加表格上方过滤条件 -->
    <myfilters
      title="个人请假汇总"
      :choose-date="true"
      date-type="month"
      @dateChange="dateChange($event)"
    />
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
    >
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
import MyPagination from '@/components/MyPagination'
import api from '@/api'
import { leaveType } from '@/common/js/constants'
import myfilters from '@/components/myfilters'
export default {
  components: {
    myfilters, MyPagination
  },
  data() {
    return {
      leaveType: leaveType,
      tableData: [],
      listLoading: true,
      total: 0,
      conditions: {
        date: null
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getScheduleLeavesPersonal(this.conditions).then(response => {
        if (response.success) {
          console.log('个人请假汇总:', response)
          this.tableData = response.resData.items
          this.total = response.resData.totalItems
          this.listLoading = false
        }
      })
    },
    dateChange(date) {
      this.$set(this.conditions, 'date', date)
      this.$set(this.conditions, 'PageIndex', 1)
      this.fetchData()
    }
  }
}
</script>
