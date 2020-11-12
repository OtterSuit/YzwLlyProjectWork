<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      title="借还管理"
      :content="content"
      placeholder="申请人/订单编号"
      :choose-date="true"
      :add-button="true"
      :choose-status="true"
      :choose-states="true"
      add-icon="el-icon-circle-plus-outline"
      addifo="借物申请"
      :status-options="statusOptions"
      :states-options="statesOptions"
      format="yyyy.MM.dd"
      :search-content="true"
      @contentChange="contentChange"
      @dateChange="dateChange"
      @statusChange="statusChange"
      @statesChange="statesChange"
      @addClick="applyClick"
    />
    <!-- 头部 end -->
    <!-- table -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column prop="orderNum" label="订单编号" />
      <el-table-column prop="applyType" label="类别" />
      <el-table-column prop="applyDepartment" label="申请科室" />
      <el-table-column prop="applicant" label="申请人" />
      <el-table-column prop="applyTime" label="申请时间" width="200" />
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div :class="stateColor(scope.row.state)">
            <i :class="stateIcon(scope.row.state)" />
            {{ state(scope.row.state) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-dropdown trigger="click" class="dropdown" @command="handleCommand">
            <span class="el-dropdown-link">
              <el-button
                size="mini"
                icon="el-icon-s-tools"
              >操作
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleDetails'
                }"
              >查看详细</el-dropdown-item>
              <el-dropdown-item
                v-if="scope.row.applyType==='借出'"
                :disabled="scope.row.state!=='2'"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleAgree'
                }"
              >同意</el-dropdown-item>
              <el-dropdown-item
                v-if="scope.row.applyType==='借出'"
                :disabled="scope.row.state!=='2'"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleDisagree'
                }"
              >不同意</el-dropdown-item>
              <el-dropdown-item
                :disabled="scope.row.state!=='4'"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleGoods'
                }"
              >确认收货</el-dropdown-item>
              <el-dropdown-item
                v-if="scope.row.applyType==='借入'"
                :disabled="scope.row.state!=='1'"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleReturn'
                }"
              >还物申请</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'

export default {
  components: {
    myfilters
  },
  data() {
    return {
      statesOptions: [
        {
          value: '全部状态',
          label: '全部状态'
        },
        {
          value: '已收货',
          label: '已收货'
        },
        {
          value: '未审核',
          label: '未审核'
        },
        {
          value: '已审核，待发货',
          label: '已审核，待发货'
        },
        {
          value: '已驳回',
          label: '已驳回'
        }
      ],
      statusOptions: [
        {
          value: '全部类别',
          label: '全部类别'
        },
        {
          value: '借入',
          label: '借入'
        },
        {
          value: '借出',
          label: '借出'
        }
      ],
      tableData: [
        {
          orderNum: '10001',
          applyType: '借入',
          applyDepartment: '儿二科',
          applicant: '张美华',
          applyTime: '2020.08.10 09:54:12',
          state: '1'
        },
        {
          orderNum: '10001',
          applyType: '借出',
          applyDepartment: '妇一科',
          applicant: '陈春兰',
          applyTime: '2020.08.10 09:54:12',
          state: '2'
        },
        {
          orderNum: '10001',
          applyType: '借入',
          applyDepartment: '儿保科',
          applicant: '李刚',
          applyTime: '2020.08.10 09:54:12',
          state: '2'
        },
        {
          orderNum: '10001',
          applyType: '借入',
          applyDepartment: '儿保科',
          applicant: '李刚',
          applyTime: '2020.08.10 09:54:12',
          state: '3'
        },
        {
          orderNum: '10001',
          applyType: '借入',
          applyDepartment: '儿保科',
          applicant: '李刚',
          applyTime: '2020.08.10 09:54:12',
          state: '4'
        },
        {
          orderNum: '10001',
          applyType: '借入',
          applyDepartment: '儿保科',
          applicant: '李刚',
          applyTime: '2020.08.10 09:54:12',
          state: '5'
        }
      ]
    }
  },
  computed: {
    // 计算tableData有几条数据
    content() {
      return '共' + this.tableData.length + '条数据'
    }
  },
  methods: {
    applyClick() {
      this.$router.push({
        name: 'Borrow'
      })
    },
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    handleDetails() {
      this.$router.push({
        name: 'borrowedForm'
      })
    },
    handleAgree(index, row) {
      row.state = '3'
      this.$message({
        message: '审核成功',
        type: 'success'
      })
    },
    handleDisagree(index, row) {
      row.state = '5'
      this.$message({
        message: '驳回成功',
        type: 'success'
      })
    },
    handleGoods() {
      this.$router.push({
        name: 'takeGoods'
      })
    },
    handleReturn() {
      this.$router.push({
        name: 'returnGoods'
      })
    },
    // 输入框改变
    contentChange(content) {
      console.log(content)
    },
    dateChange(date) {
      console.log(date)
    },
    statusChange(status) {
      console.log(status)
    },
    statesChange(states) {
      console.log(states)
    },
    // 状态标签文字
    state(state) {
      const stateMap = {
        '1': '已收货',
        '2': '未审核',
        '3': '已审核，待发货',
        '4': '已发货，待收货',
        '5': '已驳回'
      }
      return stateMap[state]
    },
    // 状态的icon
    stateIcon(state) {
      const stateMap = {
        '1': 'el-icon-success',
        '2': 'el-icon-time',
        '3': 'el-icon-time',
        '4': 'el-icon-time',
        '5': 'el-icon-warning'
      }
      return stateMap[state]
    },
    // 状态颜色
    stateColor(state) {
      const stateMap = {
        '1': 'success-color',
        '2': 'base-color',
        '3': 'goon-color',
        '4': 'goon-color',
        '5': 'error-color'
      }
      return stateMap[state]
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.second-row {
  color: #999;
}
</style>
