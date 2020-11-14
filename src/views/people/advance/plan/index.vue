<template>
  <div style="padding:30px">
    <!-- <div style="text-align:center">
      <h3 style="color:#666">轮换计划一览表</h3>
    </div> -->
    <!-- 添加表格上方过滤条件 -->
    <myfilters
      title="进修生轮转计划一览表"
    />
    <el-table
      :data="tableData"
      style="width: 100%"
      :cell-style="tableStyle"
      :header-cell-style="tableStyle"
    >
      <el-table-column
        prop="name"
        label="姓名"
        fixed
      />
      <el-table-column label="一病区">
        <el-table-column
          prop="department[0].startTime"
          label="开始时间"
          width="120"
        />
        <el-table-column
          prop="department[0].endTime"
          label="结束时间"
          width="120"
        />
        <el-table-column
          prop="department[0].teacher"
          label="带教老师"
        />
      </el-table-column>
      <el-table-column label="二病区">
        <el-table-column
          prop="department[1].startTime"
          label="开始时间"
          width="120"
        />
        <el-table-column
          prop="department[1].endTime"
          label="结束时间"
          width="120"
        />
        <el-table-column
          prop="department[1].teacher"
          label="带教老师"
        />
      </el-table-column>
      <el-table-column label="康复病区">
        <el-table-column
          prop="department[2].startTime"
          label="开始时间"
          width="120"
        />
        <el-table-column
          prop="department[2].endTime"
          label="结束时间"
          width="120"
        />
        <el-table-column
          prop="department[2].teacher"
          label="带教老师"
        />
      </el-table-column>
      <el-table-column label="门诊护理部">
        <el-table-column
          prop="department[3].startTime"
          label="开始时间"
          width="120"
        />
        <el-table-column
          prop="department[3].endTime"
          label="结束时间"
          width="120"
        />
        <el-table-column
          prop="department[3].teacher"
          label="带教老师"
        />
      </el-table-column>
      <el-table-column label="手术室">
        <el-table-column
          prop="department[4].startTime"
          label="开始时间"
          width="120"
        />
        <el-table-column
          prop="department[4].endTime"
          label="结束时间"
          width="120"
        />
        <el-table-column
          prop="department[4].teacher"
          label="带教老师"
        />
      </el-table-column>
      <el-table-column
        prop="status"
        label="说明"
      />
    </el-table>
  </div>
</template>
<script>
import myfilters from '@/components/myfilters'
import { getAdvancePlan } from '@/api/people/advance'
export default {
  components: {
    myfilters
  },
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getAdvancePlan().then(response => {
        this.tableData = response.data.items
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
