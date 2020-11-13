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
      addifo="回收申请"
      :status-options="statusOptions"
      :search-content="true"
      @contentChange="contentChange"
      @dateChange="dateChange"
      @statusChange="statusChange"
      @addClick="applyClick"
    />
    <!-- 头部 end -->
    <!-- table -->
    <el-table v-loading="listLoading" :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column prop="id" label="订单编号" />
      <el-table-column prop="applyUserid" label="申请人" />
      <el-table-column prop="applyTime" label="申请时间" />
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div v-if="countingstatus.includes(scope.row.currentStatus)" :class="stateColor('5')">
            <i :class="stateIcon('5')" />
            {{ ssd_workorder_status['5'] }}
          </div>
          <div v-else :class="stateColor(scope.row.currentStatus)">
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
                :disabled="scope.row.currentStatus!=='4'"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleCancel'
                }"
              >取消申请</el-dropdown-item>
              <!-- <el-dropdown-item
                :disabled="scope.row.currentStatus!=='4'"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleGoods'
                }"
              >发放</el-dropdown-item> -->
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
      ssd_workorder_status: null,
      tableData: [],
      totalCount: 0,
      conditions: {
        workorderType: '2',
        currentStatus: null,
        currentStatuses: null,
        keyword: null,
        applyTimeOneDay: null
      },
      countingstatus: ['11', '12', '13'],
      statusOptions: {
        10: '已取消',
        4: '回收中',
        5: '已回收'
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
    fetchData() {
      this.listLoading = true
      // 显示申请的所有表单
      api.toShowPage({ workorderType: '2' }).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.ssd_workorder_status = response.data.dictData.ssd_workorder_status
          this.tableData = response.data.records
          this.totalCount = response.data.totalCount
          this.listLoading = false
        }
      })
    },
    applyClick() {
      this.$router.push({
        name: 'DepartmentRecyclingForm'
      })
    },
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    handleDetails(index, row) {
      this.$router.push({
        name: 'DepartmentRecyclingDetails',
        query: {
          id: row.id
        }
      })
    },
    handleCancel(index, row) {
      api.toCancelRecycle({ workorderId: row.id }).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          row.currentStatus = '10'
          this.$message({
            message: '取消申请成功',
            type: 'success'
          })
        }
      })
    },
    /* handleGoods(index, row) {
      this.$router.push({
        name: 'DepartmentDelivery',
        query: {
          id: row.id
        }
      })
    }, */
    // 状态标签文字
    // state(state) {
    //   const stateMap = {
    //     '1': '已签收',
    //     '2': '已申请，待发放',
    //     '3': '已发放，待签收',
    //     '4': '已回收，待清洗',
    //     '5': '已清洗，待灭菌',
    //     '6': '已灭菌，待发放',
    //     '7': '已取消'
    //   }
    //   return stateMap[state]
    // },
    // 状态的icon
    stateIcon(state) {
      const stateMap = {
        '4': 'iconfont icon-huishou',
        '5': 'el-icon-success',
        '10': 'el-icon-warning'
        /* '2': 'el-icon-time',
        '3': 'iconfont icon-fahuo',
        '1': 'iconfont icon-tubiao-',
        '6': 'iconfont icon-miejun', */
      }
      return stateMap[state]
    },
    // 状态颜色
    stateColor(state) {
      const stateMap = {
        '4': 'goon-color',
        '5': 'success-color',
        '10': 'base-color'
        /* '2': 'base-color',
        '1': 'goon-color',
        '6': 'goon-color',
        '7': 'base-color' */
      }
      return stateMap[state]
    },
    statusChange(state) {
      this.$set(this.conditions, 'currentStatus', null)
      this.$set(this.conditions, 'currentStatuses', null)
      if (state === '5') {
        this.$set(this.conditions, 'currentStatuses', ['5', '11', '12', '13'])
      } else {
        this.$set(this.conditions, 'currentStatus', state)
      }
      this.selectChange()
    },
    contentChange(content) {
      this.$set(this.conditions, 'keyword', content)
      this.selectChange()
    },
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
