<template>
  <div style="padding:30px">
    <div class="top">
      示例患者信息
    </div>
    <el-table
      :data="tableData1"
      style="width: 100%"
      :cell-style="tableStyle"
      :header-cell-style="tableStyle"
      border
      @row-click="rowClick"
    >
      <el-table-column
        label="示例患者"
        prop="name"
      />
      <el-table-column
        label="性别"
        prop="gender"
      />
      <el-table-column
        label="年龄"
        prop="age"
      />
      <el-table-column
        label="科室"
        prop="department"
      />
      <el-table-column
        label="诊断"
        prop="diagnose"
      />
      <el-table-column
        label="床号"
        prop="bedNum"
      />
      <el-table-column
        label="住院号"
        prop="hospitalNum"
      />
      <el-table-column
        label="入院时间"
        prop="date"
      />
    </el-table>
    <div style="padding:30px 0">
      <myfilters
        ref="myfilters"
        title="患者信息"
        :choose-department="true"
        :search-button="true"
        :search-name="true"
        @searchClick="searchClick($event)"
      />
      <el-table
        :data="tableData"
        style="width: 100%"
        :cell-style="tableStyle"
        :header-cell-style="tableStyle"
        border
        @row-click="rowClick"
      >
        <el-table-column
          label="姓名"
          prop="name"
        />
        <el-table-column
          label="性别"
          prop="gender"
        />
        <el-table-column
          label="年龄"
          prop="age"
        />
        <el-table-column
          label="科室"
          prop="department"
        />
        <el-table-column
          label="诊断"
          prop="diagnose"
        />
        <el-table-column
          label="床号"
          prop="bedNum"
        />
        <el-table-column
          label="住院号"
          prop="hospitalNum"
        />
        <el-table-column
          label="入院时间"
          prop="date"
        />
      </el-table>
      <div style="text-align:center;margin-top:10px">
        <el-pagination
          class="page"
          :page-size="pageSize"
          :pager-count="5"
          layout="prev, pager, next"
          :total="total"
          @current-change="currentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import { getPatient } from '@/api/recordInstrument/nursingAssessment'

export default {
  components: {
    myfilters
  },
  data() {
    return {
      tableData: [],
      tableData1: [
        {
          name: 'xxx',
          gender: 'xxx',
          age: 'xxx',
          department: 'xxx',
          diagnose: 'xxx',
          bedNum: 'xxxxx',
          hospitalNum: 'xxxxx',
          date: 'xxxx-xx-xx',
          way: 'xxx',
          example: true
        }
      ],
      table: [],
      total: 100,
      pageSize: 20,
      form: {
        name: 'xxx',
        gender: 'xxx',
        age: 'xxx',
        department: 'xxx',
        diagnose: 'xxx',
        bedNum: 'xxxxx',
        hospitalNum: 'xxxxx',
        date: 'xxxx-xx-xx',
        way: 'xxx',
        example: true
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取数据
    fetchData() {
      getPatient().then(response => {
        this.table = response.data.items
        this.total = response.data.total
        this.tableData = this.table.slice(0, this.pageSize)
        this.form = this.tableData[0]
      })
    },
    tableStyle() {
      return {
        textAlign: 'center'
      }
    },
    rowClick(row) {
      this.$router.push({
        name: 'nursingRecords',
        params: {
          info: row
        }
      })
    },
    // 分页
    currentChange(page) {
      this.tableData = this.table.slice((page - 1) * this.pageSize, page * this.pageSize)
    },
    searchClick(select) {
      console.log(select)
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
.top {
  margin-bottom:10px;
  height: 40px;
  font-size: 18px;
  line-height: 40.8px;
}
</style>
