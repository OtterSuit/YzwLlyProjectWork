<template>
  <div>
    <div class="table" style="padding:30px">
      <!-- 组件头部 -->
      <myfilters
        title="回收任务"
        :content="content"
        :choose-date="true"
        :choose-department="true"
        :choose-type="true"
        :type-options="ssd_workorder_type"
        placeholder="单号/申请人"
        :search-content="true"
        @contentChange="contentChange"
        @dateChange="dateChange"
        @typeChange="typeChange"
        @departmentChange="departmentChange"
      />
      <!-- 组件头部结束 -->
      <!-- table -->
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
          label="申请科室"
          prop="applyDeptName"
        />
        <el-table-column label="任务类别">
          <template slot-scope="scope">
            <span>{{ ssd_workorder_type[scope.row.workorderType] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="单号"
          prop="id"
        />
        <el-table-column
          label="包数量"
          prop="applyCount"
        />
        <el-table-column label="申请人/时间" width="170">
          <template slot-scope="scope">
            {{ scope.row.applyUserid }}<br>
            <span class="second-row">{{ scope.row.applyTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="当前状态">
          <template slot-scope="scope">
            <div :class="stateColor(scope.row.currentStatus)">
              <i :class="stateIcon(scope.row.currentStatus)" />
              {{ ssd_workorder_status[state(scope.row.currentStatus)] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              style="margin-right:5px"
              @click="handleDetails(scope.$index, scope.row)"
            >
              <i class="el-icon-tickets" /> 查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- table end -->
      <!-- 分页查询 -->
      <my-pagination :total="totalCount" methods="toShowPage" :conditions="conditions" />
    </div>
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import myPagination from '@/components/MyPagination'
import api from '@/api'

export default {
  components: {
    myfilters, myPagination
  },
  data() {
    return {
      listLoading: true, // 等待加载
      tableData: [], // 数据
      ssd_workorder_status: null, // 工单状态
      ssd_workorder_type: null, // 工单类型
      totalCount: 0, // 数据总量
      // 请求类型
      conditions: {
        workorderTypes: ['2', '3'],
        currentStatuses: ['4', '5', '6', '7', '12'],
        applyDeptName: null,
        applyTime: null
      }
    }
  },
  computed: {
    // 计算tableData有几条数据
    content() {
      return '共' + this.totalCount + '条数据'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取数据
    fetchData() {
      this.listLoading = true
      // 分页查询工单(回收单,回收中)
      api.toShowPage(this.conditions).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.ssd_workorder_status = response.data.dictData.ssd_workorder_status // 工单状态字典
          this.ssd_workorder_type = response.data.dictData.ssd_workorder_type // 工单类型字典
          delete this.ssd_workorder_type['1'] // 去除申请类型
          this.tableData = response.data.records // 获取数据
          this.totalCount = response.data.totalCount
          this.listLoading = false
        }
      })
    },
    // 查看详细
    handleDetails(index, row) {
      this.$router.push({
        path: '/recover/recoverList/particulars',
        query: { id: row.id }
      })
    },
    state(state) {
      if (state === '5' || state === '7') {
        return '11'
      }
      return state
    },
    // 状态标签图标
    stateIcon(state) {
      const stateMap = {
        '4': 'iconfont icon-huishou',
        '5': 'el-icon-success',
        '6': 'iconfont icon-huishou',
        '7': 'el-icon-success',
        '12': 'el-icon-time',
        '13': 'el-icon-time'
      }
      return stateMap[state]
    },
    // 状态颜色
    stateColor(state) {
      const stateMap = {
        '4': 'goon-color',
        '5': 'success-color',
        '6': 'goon-color',
        '7': 'success-color',
        '12': 'base-color',
        '13': 'goon-color'
      }
      return stateMap[state]
    },
    // 输入框改变
    contentChange(content) {
      this.$set(this.conditions, 'keyword', content)
      this.selectChange()
    },
    // 时间改变
    dateChange(date) {
      this.$set(this.conditions, 'applyTimeOneDay', date)
      this.selectChange()
    },
    // 类别改变
    typeChange(type) {
      this.$set(this.conditions, 'workorderTypes', type)
      this.selectChange()
    },
    // 科室改变
    departmentChange(depart) {
      this.$set(this.conditions, 'applyDeptName', depart)
      this.selectChange()
    },
    selectChange() {
      this.$set(this.conditions, 'pageNo', 1)
      this.listLoading = true
      api.toShowPage(this.conditions).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          this.tableData = response.data.records
          this.totalCount = response.data.totalCount
          this.listLoading = false
        }
      })
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.second-row {
  color: #999;
}
</style>
