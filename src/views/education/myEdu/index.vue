<template>
  <div style="padding:30px">
    <myfilters
      title="我的培训"
      :content="content"
      :choose-date="true"
      date-type="year"
      format="yyyy年"
      value-format="yyyy"
      :search-content="true"
      placeholder="考试名称"
      @contentChange="contentChange"
      @dateChange="dateChange"
    />
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        label="序号"
        type="index"
        width="100"
      />
      <el-table-column
        label="考试名称"
        prop="examName"
        width="300"
      />
      <el-table-column
        label="考试类型"
        prop="examType"
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
        label="答题时间"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.state===4||scope.row.state===3">{{ scope.row.examTime }}</div>
          <div v-else>-</div>
        </template>
      </el-table-column>
      <el-table-column
        label="成绩"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.state===1&&checkStatus(scope.row.startTime)" :class="specific[5].color">
            <i :class="specific[5].icon" />
            {{ specific[5].name }}
          </div>
          <!-- 状态（1-未完成；2-缺考；3-待改卷；4-已完成） -->
          <div v-else-if="scope.row.state&&scope.row.state!==4" :class="specific[scope.row.state].color">
            <i :class="specific[scope.row.state].icon" />
            {{ specific[scope.row.state].name }}
          </div>
          <div v-else-if="scope.row.state===4">{{ scope.row.score }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="改卷人"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.state===4">{{ scope.row.graderName }}({{ jobPost[scope.row.graderJobPost] }})</div>
          <div v-else>-</div>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.state===4"
            size="mini"
            @click="handleEdit(scope.$index, scope.row, 'myEduMain')"
          >
            <i class="el-icon-tickets" /> 查看详细
          </el-button>
          <el-button
            v-if="scope.row.state===1&&!checkStatus(scope.row.startTime)"
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row, 'doExam')"
          >
            <i class="el-icon-tickets" /> 立即答题
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <my-pagination :total="total" methods="getEducationMyTrains" :conditions="conditions" />
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import MyPagination from '@/components/MyPagination'
import { specific, jobPost } from '@/common/js/constants'
import api from '@/api'
import { compareTime } from '@/utils/index'

export default {
  components: {
    myfilters, MyPagination
  },
  data() {
    return {
      jobPost,
      specific,
      tableData: [],
      total: 0,
      listLoading: true,
      conditions: {
        examName: null,
        year: null
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
      api.getEducationMyTrains(this.conditions).then(response => {
        if (response.success) {
          console.log('我的培训', response)
          this.total = response.resData.totalItems
          this.tableData = response.resData.items
          this.listLoading = false
        }
      })
    },
    checkStatus(time) {
      return compareTime(time, 0)
    },
    dateChange(date) {
      this.$set(this.conditions, 'year', date)
      this.$set(this.conditions, 'PageIndex', 1)
      this.fetchData()
    },
    contentChange(content) {
      this.$set(this.conditions, 'examName', content)
      this.$set(this.conditions, 'PageIndex', 1)
      this.fetchData()
    },
    // 详细
    handleEdit(index, row, box) {
      this.$router.push({
        name: box,
        params: {
          title: row.examName,
          id: row.id
        }
      })
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
</style>
