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
      :type-options="ssd_packet_category"
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
    <el-table v-loading="listLoading" :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column prop="id" label="订单编号" />
      <el-table-column label="申请类别">
        <template slot-scope="scope">
          <div>{{ ssd_packet_category[scope.row.workorderCategory] }}
            <span v-if="scope.row.urgentFlag===1" class="error-color">【加急】</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="applyUserid" label="申请人" />
      <el-table-column prop="applyTime" label="申请时间" />
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div :class="stateColor(scope.row.currentStatus)">
            <i :class="stateIcon(scope.row.currentStatus)" />
            {{ ssd_workorder_status[scope.row.currentStatus] }}
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
                :disabled="scope.row.currentStatus!=='1'"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleCancel'
                }"
              >取消申请</el-dropdown-item>
              <el-dropdown-item
                :disabled="scope.row.currentStatus!=='2'"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleReceive'
                }"
              >签收</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <my-pagination :total="totalCount" methods="toShowPage" :conditions="conditions" />
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
      listLoading: true,
      tableData: [],
      ssd_packet_category: null, // 包类型
      ssd_workorder_status: null, // 订单状态
      ssd_workorder_type: null, // 订单类型
      totalCount: 0,
      conditions: {
        workorderType: '1',
        workorderCategory: null,
        currentStatus: '',
        keyword: null,
        applyTimeOneDay: null
      },
      statusOptions: {
        1: '申请',
        2: '发放中',
        3: '已验收',
        9: '已驳回',
        10: '已取消'
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
    this.fetchData() // 获取 数据
  },
  methods: {
    // 获取数据
    fetchData() {
      this.listLoading = true
      // 显示申请的所有表单
      api.toShowPage(this.conditions).then(response => {
        console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.ssd_workorder_status = response.data.dictData.ssd_workorder_status // 获取工单状态
          this.ssd_workorder_type = response.data.dictData.ssd_workorder_type // 获取工单类型
          this.ssd_packet_category = response.data.dictData.ssd_packet_category // 获取包类型
          this.tableData = response.data.records // 获取表单数据
          this.totalCount = response.data.totalCount // 获取表单数据个数
          this.listLoading = false
        }
      })
    },
    // 申请按钮
    applyClick() {
      this.$router.push({
        name: 'DepartmentApplyForm'
      })
    },
    // 收货按钮
    handleReceive(index, row) {
      this.$router.push({
        name: 'receive',
        query: {
          id: row.id
        }
      })
      // const packetInstanceIds = [] // 收货数据id
      // api.toGetWorkorder({ id: row.id }).then(response => {
      //   if (response.code === '200' && response.data.busiCode === '1') {
      //     console.log(response)
      //     const instancePage = response.data.packetInstancePage.records // 获取该订单的实例包数据
      //     instancePage.forEach(item => {
      //       packetInstanceIds.push(item.packetInstanceId)
      //     })
      //     // 发送收货请求
      //     api.toReceiveGoods({
      //       id: row.id,
      //       packetInstanceIds: packetInstanceIds,
      //       receiveUserid: 'admin'
      //     }).then(response => {
      //       console.log(response)
      //     })
      //   }
      // })
    },
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    // 查看详细
    handleDetails(index, row) {
      this.$router.push({
        name: 'DepartmentApplyDetails',
        query: {
          id: row.id
        }
      })
    },
    // 取消申请
    handleCancel(index, row) {
      api.toCancelApply({ id: row.id }).then(response => {
        console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          row.currentStatus = '10'
          this.$message({
            message: '取消申请成功',
            type: 'success'
          })
        }
      })
    },
    // 状态更改
    statusChange(state) {
      this.$set(this.conditions, 'currentStatus', state)
      this.selectChange()
    },
    // 申请类型更改
    typeChange(status) {
      this.$set(this.conditions, 'workorderCategory', status)
      this.selectChange()
    },
    // 输入框更改
    contentChange(content) {
      this.$set(this.conditions, 'keyword', content)
      this.selectChange()
    },
    // 日期更改
    dateChange(date) {
      this.$set(this.conditions, 'applyTimeOneDay', date)
      this.selectChange()
    },
    selectChange() {
      this.listLoading = true
      this.$set(this.conditions, 'pageNo', 1)
      api.toShowPage(this.conditions).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          this.tableData = response.data.records
          this.totalCount = response.data.totalCount
          this.listLoading = false
        }
      })
    },
    // 状态的icon
    stateIcon(state) {
      const stateMap = {
        '1': 'el-icon-time',
        '2': 'el-icon-time',
        '3': 'el-icon-success',
        '9': 'el-icon-warning',
        '10': 'el-icon-warning'
      }
      return stateMap[state]
    },
    // 状态颜色
    stateColor(state) {
      const stateMap = {
        '1': 'base-color',
        '2': 'goon-color',
        '3': 'success-color',
        '9': 'error-color',
        '10': 'base-color'
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
