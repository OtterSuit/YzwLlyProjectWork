<template>
  <div style="padding:30px">
    <myfilters
      ref="myfilters"
      title="排班记录查询"
      :choose-date="true"
      :choose-department="true"
      date-type="week"
      :date-clearable="false"
      format="yyyy 第 WW 周"
      @dateChange="dateChange($event)"
      @departmentChange="departmentChange"
    />
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
      :cell-style="tableStyle"
      :header-cell-style="tableStyle"
      border
    >
      <el-table-column prop="realName" label="姓名" />
      <el-table-column label="工龄">
        <template slot-scope="scope">
          {{ scope.row.workYear }}年
        </template>
      </el-table-column>
      <el-table-column label="职员类别">
        <template slot-scope="scope">
          {{ userType[scope.row.userType] }}
        </template>
      </el-table-column>
      <el-table-column prop="hierarchy" label="层级" />
      <el-table-column prop="grouping" label="分组" />
      <el-table-column v-for="item in weekDay" :key="item.date" width="120">
        <template slot="header">
          {{ item.name }}
          <br>
          {{ item.date }}
        </template>
        <template slot-scope="scope">{{ applicationShift[scope.row[item.engName]] }}</template>
      </el-table-column>
      <el-table-column prop="nightShifts" label="夜班数" />
      <el-table-column prop="shiftHours" label="班时值" />
      <el-table-column prop="remarks" label="备注" />
    </el-table>
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import api from '@/api'
import { applicationShift, userType } from '@/common/js/constants'
export default {
  components: {
    myfilters
  },
  data() {
    return {
      userType: userType,
      applicationShift: applicationShift,
      weekDay: [
        {
          name: '星期一',
          engName: 'mondayShift'
        },
        {
          name: '星期二',
          engName: 'tuesdayShift'
        },
        {
          name: '星期三',
          engName: 'wednesdayShift'
        },
        {
          name: '星期四',
          engName: 'thursdayShift'
        },
        {
          name: '星期五',
          engName: 'fridayShift'
        },
        {
          name: '星期六',
          engName: 'saturdayShift'
        },
        {
          name: '星期日',
          engName: 'sundayShift'
        }
      ],
      tableData: [],
      conditions: {
        date: null,
        departmentId: null
      },
      listLoading: true
    }
  },
  created() {
    this.conditions.date = new Date()
    this.setDate()
    this.fetchData()
  },
  mounted() {
    this.$refs.myfilters.select.time = new Date()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getScheduleShiftsQuery(this.conditions).then(response => {
        if (response.success) {
          console.log('排班设置', response)
          this.tableData = response.resData
          this.listLoading = false
        }
      })
    },
    setDate(day) {
      const d = day || new Date()
      let start = Date.parse(d)
      let weekDay = d.getDay()
      while (weekDay !== 1) {
        weekDay -= 1
        start = start - 1 * 24 * 60 * 60 * 1000
      }
      for (let i = 0; i < 7; i++) {
        const date = new Date(start)
        start += 1 * 24 * 60 * 60 * 1000
        const dd =
          date.getFullYear() +
          '-' +
          (date.getMonth() + 1) +
          '-' +
          date.getDate()
        this.$set(this.weekDay[i], 'date', dd)
      }
    },
    tableStyle() {
      return {
        textAlign: 'center'
      }
    },
    dateChange(week) {
      this.$set(this.conditions, 'date', week)
      this.$set(this.conditions, 'PageIndex', 1)
      this.fetchData()
      this.setDate(week)
    },
    departmentChange(department) {
      this.$set(this.conditions, 'departmentId', department)
      this.$set(this.conditions, 'PageIndex', 1)
      this.fetchData()
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
</style>
