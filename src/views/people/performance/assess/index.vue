<template>
  <div style="padding:30px">
    <myfilters
      title="绩效考核"
      :choose-department="true"
      :choose-date="true"
      date-type="month"
      :date-clearable="false"
      @dateChange="dateChange"
      @departmentChange="departmentChange"
    >
      <template slot="extent2">
        <el-button
          @click="indicatorsClick"
        >
          <i class="el-icon-s-tools" />考核指标管理
        </el-button>
      </template>
    </myfilters>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column width="100">
        <template slot-scope="scope">
          <img class="pic_user" :src="scope.row.headIcon" alt="user">
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="realName"
      />
      <el-table-column
        label="工号"
        prop="jobNum"
      />
      <el-table-column
        label="职务"
      >
        <template slot-scope="scope">
          {{ jobPost[scope.row.jobPost] }}
        </template>
      </el-table-column>
      <el-table-column
        label="职员类别"
      >
        <template slot-scope="scope">
          {{ userType[scope.row.userType] }}
        </template>
      </el-table-column>
      <el-table-column
        label="绩效分值"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.state===1">{{ scope.row.performanceScore }}</div>
          <div v-else style="color:#999">暂未考核</div>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.state||scope.row.state===0" :class="performance[scope.row.state].color">
            <i :class="performance[scope.row.state].icon" />
            {{ performance[scope.row.state].name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="考核人"
        width="160"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.assessorName }}</span><br>
          <span style="color:#999">{{ scope.row.assessmentTime }}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.state===1"
            size="mini"
            @click="handleEdit(scope.$index, scope.row, 'details')"
          >
            <i class="iconfont icon-jurassic_curve" />查看
          </el-button>
          <el-button
            v-if="scope.row.state===0"
            size="mini"
            class="assess-button"
            @click="handleEdit(scope.$index, scope.row, 'appraisals')"
          >
            <i class="el-icon-edit-outline" />考核
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <my-pagination :total="total" methods="getPerformanceAppraisals" :conditions="conditions" />
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import api from '@/api'
import { performance, jobPost, userType } from '@/common/js/constants'
import MyPagination from '@/components/MyPagination'

export default {
  components: {
    myfilters, MyPagination
  },
  data() {
    return {
      userType,
      jobPost,
      performance,
      tableData: [],
      total: 0,
      listLoading: true,
      conditions: {

      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getPerformanceAppraisals(this.conditions).then(response => {
        if (response.success) {
          console.log('绩效考核列表', response)
          this.total = response.resData.totalItems
          this.tableData = response.resData.items
          this.listLoading = false
        }
      })
    },
    // 详细
    handleEdit(index, row, type) {
      this.$router.push({
        name: 'assessBasic',
        params: {
          id: row.id,
          type: type
        }
      })
    },
    // 绩效指标管理
    indicatorsClick() {
      this.$router.push({
        name: 'indicators'
      })
    },
    dateChange(date) {
      this.$set(this.conditions, 'date', date)
      this.$set(this.conditions, 'PageIndex', 1)
      this.fetchData()
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
.pic_user {
  height:42px;
  border-radius: 42px;
  border:1px solid rgba(216,216,216,1);
}
.icon-jurassic_curve {
  font-size: 12px;
}
.assess-button {
  color: rgba(64,158,255,1);
  border:1px solid rgba(64,158,255,1);
}
</style>
