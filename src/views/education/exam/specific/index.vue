<template>
  <div style="padding:30px">
    <div class="table">
      <myfilters
        :title="title"
        :add-button="true"
        addifo="试卷详细"
        add-icon="el-icon-tickets"
        @addClick="detailShow"
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
          label="姓名"
          prop="name"
        />
        <el-table-column
          label="科室"
          prop="department"
        />
        <el-table-column
          label="考试时间"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.state===3||scope.row.state===4">{{ scope.row.examTime }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column
          label="成绩"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.state===4">{{ scope.row.score }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column
          label="改卷人"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.state===4">{{ scope.row.graderName }}({{ jobPost[scope.row.graderJobPost] }})</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.state" :class="specific[scope.row.state].color">
              <i :class="specific[scope.row.state].icon" />
              {{ specific[scope.row.state].name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.state===4"
              size="mini"
              @click="handleEdit(scope.$index, scope.row,'personExamMain')"
            >
              <i class="el-icon-tickets" /> 详细
            </el-button>
            <el-button
              v-if="scope.row.state===3"
              size="mini"
              @click="handleEdit(scope.$index, scope.row, 'correctPaper')"
            >
              <i class="el-icon-tickets" /> 改卷
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import myfilters from '@/components/myfilters'
import { specific, jobPost } from '@/common/js/constants'

export default {
  components: {
    myfilters
  },
  data() {
    return {
      specific,
      jobPost,
      row: {},
      data: {},
      tableData: [],
      title: '',
      listLoading: true
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch('tagsView/setBackName', '')
    next()
  },
  created() {
    this.title = this.$route.params.title
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getEducationDetails({ id: this.$route.params.id }).then(response => {
        if (response.success) {
          console.log('考试详细：', response)
          this.total = response.resData.totalItems
          this.tableData = response.resData.items
          this.listLoading = false
        }
      })
    },
    detailShow() {
      this.$router.push({
        name: 'examMain',
        params: {
          id: this.$route.params.id
        }
      })
    },
    // 详细
    handleEdit(index, row, name) {
      this.$router.push({
        name: name,
        params: {
          id: row.id,
          examId: this.$route.params.id
        }
      })
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
</style>
