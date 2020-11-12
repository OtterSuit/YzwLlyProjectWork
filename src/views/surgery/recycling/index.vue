<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      title="回收管理"
      :content="content"
      placeholder="申请人/订单编号"
      :choose-date="true"
      :add-button="true"
      :choose-status="true"
      :choose-states="true"
      add-icon="el-icon-circle-plus-outline"
      addifo="回收申请"
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
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleGoods'
                }"
              >发货</el-dropdown-item>
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
          value: '已申请，待发货',
          label: '已申请，待发货'
        },
        {
          value: '已发货，待签收',
          label: '已发货，待签收'
        },
        {
          value: '已回收，待清洗',
          label: '已回收，待清洗'
        },
        {
          value: '已清洗，待灭菌',
          label: '已清洗，待灭菌'
        },
        {
          value: '已灭菌，待发货',
          label: '已灭菌，待发货'
        }
      ],
      statusOptions: [
        {
          value: '全部类别',
          label: '全部类别'
        },
        {
          value: '回收申请',
          label: '回收申请'
        },
        {
          value: '还物回收申请',
          label: '还物回收申请'
        }
      ],
      tableData: [
        {
          orderNum: '10001',
          applyType: '回收申请',
          applicant: '张美华',
          applyTime: '2020.08.10 09:54:12',
          state: '1'
        },
        {
          orderNum: '10001',
          applyType: '还物回收申请',
          applicant: '陈春兰',
          applyTime: '2020.08.10 09:54:12',
          state: '2'
        },
        {
          orderNum: '10001',
          applyType: '还物回收申请',
          applicant: '李刚',
          applyTime: '2020.08.10 09:54:12',
          state: '3'
        },
        {
          orderNum: '10001',
          applyType: '还物回收申请',
          applicant: '刘玉玲',
          applyTime: '2020.08.10 09:54:12',
          state: '4'
        },
        {
          orderNum: '10001',
          applyType: '还物回收申请',
          applicant: '刘玉玲',
          applyTime: '2020.08.10 09:54:12',
          state: '5'
        },
        {
          orderNum: '10001',
          applyType: '还物回收申请',
          applicant: '李顺庭',
          applyTime: '2020.08.10 09:54:12',
          state: '6'
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
        name: 'recyclingForm'
      })
    },
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    handleDetails() {
      this.$router.push({
        name: 'recyclingDetails'
      })
    },
    handleCancel(index, row) {
      row.state = '7'
      this.$message({
        message: '取消申请成功',
        type: 'success'
      })
    },
    handleGoods() {
      this.$router.push({
        name: 'delivery'
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
        '2': '已申请，待发货',
        '3': '已发货，待签收',
        '4': '已回收，待清洗',
        '5': '已清洗，待灭菌',
        '6': '已灭菌，待发货',
        '7': '已取消'
      }
      return stateMap[state]
    },
    // 状态的icon
    stateIcon(state) {
      const stateMap = {
        '1': 'el-icon-success',
        '2': 'el-icon-time',
        '3': 'iconfont icon-fahuo',
        '4': 'iconfont icon-huishou',
        '5': 'iconfont icon-tubiao-',
        '6': 'iconfont icon-miejun',
        '7': 'el-icon-time'
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
        '5': 'goon-color',
        '6': 'goon-color',
        '7': 'base-color'
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
