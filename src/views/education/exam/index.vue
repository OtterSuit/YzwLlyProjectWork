<template>
  <div style="padding:30px">
    <myfilters
      title="考试管理"
      :content="content"
      :add-button="true"
      addifo="新建考试计划"
      :search-content="true"
      placeholder="考试名称"
      @contentChange="contentChange"
      @addClick="addClick"
    />
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
      :cell-style="cellStyle"
    >
      <el-table-column
        label="序号"
        type="index"
        width="80"
      />
      <el-table-column
        label="考试名称"
        prop="examName"
        width="250"
      />
      <el-table-column
        label="考试类型"
        prop="examType"
        width="110"
      />
      <el-table-column
        label="考试时间"
        width="190"
      >
        <template slot-scope="scope">
          {{ scope.row.startTime }}至{{ scope.row.endTime }}
        </template>
      </el-table-column>
      <el-table-column
        label="参加人数"
        prop="participantNumber"
      />
      <el-table-column
        label="合格率"
        prop="passRate"
      />
      <el-table-column
        label="状态"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.state" :class="exam[scope.row.state].color">
            <i :class="exam[scope.row.state].icon" />
            {{ exam[scope.row.state].name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-dropdown v-if="scope.row.state===1" trigger="click" class="dropdown" @command="handleCommand">
            <span class="el-dropdown-link">
              <el-button
                size="mini"
                icon="el-icon-s-tools"
              >操作
              </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                class="success-color"
                icon="el-icon-circle-check"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleExecute'
                }"
              >执行</el-dropdown-item>
              <el-dropdown-item
                class="base-color"
                icon="el-icon-edit"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleEdit'
                }"
              >编辑</el-dropdown-item>
              <el-dropdown-item
                class="error-color"
                icon="el-icon-delete"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleDelete'
                }"
              >删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button
            v-if="scope.row.state!==1"
            size="mini"
            @click="handleDetails(scope.$index, scope.row)"
          >
            <i class="el-icon-tickets" /> 查看详细
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <my-pagination :total="total" methods="getEducationExams" :conditions="conditions" />
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import MyPagination from '@/components/MyPagination'
import api from '@/api'
import { exam } from '@/common/js/constants'

export default {
  components: {
    myfilters, MyPagination
  },
  inject: ['reload'],
  data() {
    return {
      exam,
      tableData: [],
      total: 0,
      listLoading: true,
      conditions: {
        examName: null
      }
    }
  },
  computed: {
    content() {
      return '共' + this.total + '条数据'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getEducationExams(this.conditions).then(response => {
        if (response.success) {
          console.log('考试管理', response)
          this.total = response.resData.totalItems
          this.tableData = response.resData.items
          this.listLoading = false
        }
      })
    },
    // 新建考试计划
    addClick() {
      this.$router.push({
        name: 'examAdd'
      })
    },
    // 下拉点击
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    // 查看详细
    handleDetails(index, row) {
      this.$router.push({
        name: 'specificMain',
        params: {
          id: row.id,
          title: row.examName
        }
      })
    },
    // 编辑
    handleEdit(index, row) {
      this.$router.push({
        name: 'examEdit',
        params: {
          id: row.id
        }
      })
    },
    // 删除
    handleDelete(index, row) {
      api.deleteEducationExams({ id: row.id }).then(response => {
        if (response.success) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.reload()
          // this.tableData.splice(index, 1)
        }
      })
    },
    // 执行
    handleExecute(index, row) {
      api.putEducationExamsExecute({ id: row.id }).then(response => {
        if (response.success) {
          row.state = 2
          this.$message({
            message: '执行成功',
            type: 'success'
          })
        }
      })
    },
    // 表格样式
    cellStyle({ columnIndex }) {
      if (columnIndex === 7) {
        return {
          textAlign: 'end'
        }
      }
    },
    // 头部搜索输入
    contentChange(content) {
      this.$set(this.conditions, 'examName', content)
      this.$set(this.conditions, 'PageIndex', 1)
      this.fetchData()
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
</style>
