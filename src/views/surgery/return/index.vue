<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      title="退回管理"
      :content="content"
      placeholder="申请人/订单编号"
      :choose-date="true"
      :add-button="true"
      :choose-type="true"
      :choose-status="true"
      addifo="退回申请"
      :type-options="typeOptions"
      :status-options="statusOptions"
      :search-content="true"
      @contentChange="contentChange"
      @dateChange="dateChange"
      @typeChange="typeChange"
      @statusChange="statusChange"
      @addClick="applyClick"
    />
    <!-- 头部 end -->
    <!-- table -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column prop="orderNum" label="订单编号" width="110" />
      <el-table-column prop="applyType" label="申请类别" />
      <el-table-column prop="applicant" label="申请人" />
      <el-table-column prop="applyTime" label="申请时间" />
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
                :disabled="scope.row.state!=='2'"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleCancel'
                }"
              >取消申请</el-dropdown-item>
              <el-dropdown-item
                :disabled="scope.row.state!=='3'"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleGoods'
                }"
              >发放</el-dropdown-item>
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
      statusOptions: [
        {
          value: '全部状态',
          label: '全部状态'
        },
        {
          value: '已收获',
          label: '已收获'
        },
        {
          value: '已发放，待签收',
          label: '已发放，待签收'
        },
        {
          value: '已申请，待审核',
          label: '已申请，待审核'
        },
        {
          value: '已审核，待发放',
          label: '已审核，待发放'
        },
        {
          value: '已取消',
          label: '已取消'
        },
        {
          value: '已驳回',
          label: '已驳回'
        }
      ],
      typeOptions: [
        {
          value: '全部类别',
          label: '全部类别'
        },
        {
          value: '器械包申请',
          label: '器械包申请'
        },
        {
          value: '一次性物品申请',
          label: '一次性物品申请'
        },
        {
          value: '器械包换物申请',
          label: '器械包换物申请'
        },
        {
          value: '消毒物品申请',
          label: '消毒物品申请'
        },
        {
          value: '外来器械包申请',
          label: '外来器械包申请'
        },
        {
          value: '自定义器械包申请',
          label: '自定义器械包申请'
        }
      ],
      tableData: [
        {
          orderNum: '10001',
          applyType: '外来器械包申请',
          applicant: '刘玉玲',
          applyTime: '2020.08.10 09:54:12',
          state: '6'
        },
        {
          orderNum: '10001',
          applyType: '一次性物品申领',
          applicant: '陈春兰',
          applyTime: '2020.08.10 09:54:12',
          state: '2'
        },
        {
          orderNum: '10001',
          applyType: '自定义器械包申请',
          applicant: '刘玉玲',
          applyTime: '2020.08.10 09:54:12',
          state: '5'
        },
        {
          orderNum: '10001',
          applyType: '器械包换物申请',
          applicant: '李刚',
          applyTime: '2020.08.10 09:54:12',
          state: '3'
        },
        {
          orderNum: '10001',
          applyType: '器械包申请',
          applicant: '张美华',
          applyTime: '2020.08.10 09:54:12',
          state: '1'
        },
        {
          orderNum: '10001',
          applyType: '外来器械包申请',
          applicant: '刘玉玲',
          applyTime: '2020.08.10 09:54:12',
          state: '4'
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
        name: 'returnForm'
      })
    },
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    handleDetails() {
      this.$router.push({
        name: 'returnDetails'
      })
    },
    handleCancel(index, row) {
      row.state = '4'
      this.$message({
        message: '取消申请成功',
        type: 'success'
      })
    },
    handleGoods() {
      this.$router.push({
        name: 'returnDelivery'
      })
    },
    // 输入框改变
    contentChange(content) {
      console.log(content)
    },
    dateChange(date) {
      console.log(date)
    },
    typeChange(status) {
      console.log(status)
    },
    statusChange(states) {
      console.log(states)
    },
    // 状态标签文字
    state(state) {
      const stateMap = {
        '1': '已发放，待签收',
        '2': '已申请，待审核',
        '3': '已审核，待发放',
        '4': '已取消',
        '5': '已驳回',
        '6': '已回收'
      }
      return stateMap[state]
    },
    // 状态的icon
    stateIcon(state) {
      const stateMap = {
        '1': 'iconfont icon-fahuo',
        '2': 'el-icon-time',
        '3': 'iconfont icon-fahuo',
        '4': 'el-icon-warning',
        '5': 'el-icon-warning',
        '6': 'el-icon-success'
      }
      return stateMap[state]
    },
    // 状态颜色
    stateColor(state) {
      const stateMap = {
        '1': 'goon-color',
        '2': 'base-color',
        '3': 'goon-color',
        '4': 'base-color',
        '5': 'error-color',
        '6': 'success-color'
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
.iconfont {
  font-size: 14px;
}
</style>
