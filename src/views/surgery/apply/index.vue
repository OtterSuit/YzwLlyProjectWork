<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      title="申领管理"
      :content="content"
      placeholder="申请人/订单编号"
      :choose-date="true"
      :add-button="true"
      :choose-type="true"
      :choose-status="true"
      addifo="物品申领"
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
          value: '已回收',
          label: '已回收'
        },
        {
          value: '未审核',
          label: '未审核'
        },
        {
          value: '已驳回',
          label: '已驳回'
        },
        {
          value: '已取消',
          label: '已取消'
        },
        {
          value: '已审核，待配包',
          label: '已审核，待配包'
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
          value: '一次性物品申领',
          label: '一次性物品申领'
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
          applyType: '器械包申请',
          applicant: '张美华',
          applyTime: '2020.08.10 09:54:12',
          state: '1'
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
          applyType: '器械包换物申请',
          applicant: '李刚',
          applyTime: '2020.08.10 09:54:12',
          state: '2'
        },
        {
          orderNum: '10001',
          applyType: '消毒物品申请',
          applicant: '刘玉玲',
          applyTime: '2020.08.10 09:54:12',
          state: '3'
        },
        {
          orderNum: '10001',
          applyType: '消毒物品申请',
          applicant: '刘玉玲',
          applyTime: '2020.08.10 09:54:12',
          state: '4'
        },
        {
          orderNum: '10001',
          applyType: '外来器械包申请',
          applicant: '李顺庭',
          applyTime: '2020.08.10 09:54:12',
          state: '5'
        },
        {
          orderNum: '10001',
          applyType: '自定义器械包申请',
          applicant: '李顺庭',
          applyTime: '2020.08.10 09:54:12',
          state: '5'
        },
        {
          orderNum: '10001',
          applyType: '自定义器械包申请',
          applicant: '李顺庭',
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
        name: 'applyDetails'
      })
    },
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    handleDetails() {
      this.$router.push({
        name: 'applyForm'
      })
    },
    handleCancel(index, row) {
      row.state = '4'
      this.$message({
        message: '取消申请成功',
        type: 'success'
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
        '1': '已回收',
        '2': '未审核',
        '3': '已驳回',
        '4': '已取消',
        '5': '已审核，待配包'
      }
      return stateMap[state]
    },
    // 状态的icon
    stateIcon(state) {
      const stateMap = {
        '1': 'el-icon-success',
        '2': 'el-icon-time',
        '3': 'el-icon-warning',
        '4': 'el-icon-warning',
        '5': 'el-icon-time'
      }
      return stateMap[state]
    },
    // 状态颜色
    stateColor(state) {
      const stateMap = {
        '1': 'success-color',
        '2': 'base-color',
        '3': 'error-color',
        '4': 'base-color',
        '5': 'goon-color'
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
