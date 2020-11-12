<template>
  <div>
    <div style="padding:30px">
      <!-- header -->
      <myfilters
        title="订单管理"
        :content="content"
        :choose-states="true"
        :choose-status="true"
        :search-content="true"
        :choose-date="true"
        :choose-department="true"
        placeholder="申请人/订单编号"
        :states-options="statesOptions"
        :status-options="statusOptions"
        :options="departmentOptions"
        @statesChange="statesChange"
        @departmentChange="departmentChange"
        @statusChange="statusChange"
        @contentChange="contentChange"
        @dateChange="dateChange"
      />
      <!-- header end -->
      <!-- table -->
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          type="index"
          width="100px"
        />
        <el-table-column label="订单编号" prop="orderCoding" />
        <el-table-column label="申请类别" prop="applicationType" width="250px" />
        <el-table-column label="申请科室" prop="applicationDepartment" />
        <el-table-column label="申请人" prop="applicant" />
        <el-table-column label="申请时间" prop="applicationTime" width="220px" />
        <el-table-column
          width="150px"
          label="状态"
        >
          <template slot-scope="scope">
            <div :class="stateColor(scope.row.state)">
              <i :class="stateIcon(scope.row.state)" />
              {{ state(scope.row.state) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column width="150">
          <template slot-scope="scope">
            <!-- 下拉框 -->
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
                    action: 'detailShow'
                  }"
                >查看详细</el-dropdown-item>
                <el-dropdown-item
                  :disabled="scope.row.state!=='1'"
                  :command="{
                    index: scope.$index,
                    row: scope.row,
                    action: 'handleAgree'
                  }"
                >同意</el-dropdown-item>
                <el-dropdown-item
                  :disabled="scope.row.state!=='1'"
                  :command="{
                    index: scope.$index,
                    row: scope.row,
                    action: 'handleDisagree'
                  }"
                >不同意</el-dropdown-item>
                <el-dropdown-item
                  :disabled="scope.row.state!=='5'"
                  :command="{
                    index: scope.$index,
                    row: scope.row,
                    action: 'handleDelivery'
                  }"
                >发货</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- 下拉框结束 -->
          </template>
        </el-table-column>
      </el-table>
      <!-- table end -->
      <!-- 驳回弹出框 -->
      <el-dialog v-el-drag-dialog title="驳回申请" :visible.sync="disagreeShow" width="600px">
        <div class="disagree-main">
          <!-- form -->
          <el-form ref="disagree" :model="disagree" label-width="70px">
            <div class="warning-box">
              <el-row>
                <el-col :span="2" style="font-size:32px;color:red">
                  <i class="el-icon-warning" />
                </el-col>
                <el-col :span="22">
                  <div class="disagree-title">
                    您确定要驳回订单【{{ disagree.orderCoding }}】吗？
                  </div>
                  <div class="tiny-form-item">
                    <el-form-item label="订单编码">
                      {{ disagree.orderCoding }}
                    </el-form-item>
                    <el-form-item label="订单类型">
                      器械包申主表
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div style="margin: 10px 0">
              <el-row>
                <el-col :span="20" :offset="3">
                  <el-form-item label="驳回原因">
                    <el-radio v-model="disagree.resultRadio" label="1">仓库缺货</el-radio>
                    <br>
                    <el-radio v-model="disagree.resultRadio" label="2">提交错误</el-radio>
                    <el-row>
                      <el-col :span="4">
                        <el-radio v-model="disagree.resultRadio" label="3">其他</el-radio>
                      </el-col>
                      <el-col :span="16">
                        <el-input v-model="disagree.resultText" placeholder="请输入" :disabled="disagree.resultRadio!=='3'" />
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
          <!-- form end -->
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="bgc" @click="disagreeShow=false">取消</el-button>
          <el-button type="danger" @click="disagreeSubmit">确定驳回</el-button>
        </div>
      </el-dialog>
    </div>
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
      disagreeShow: false, // 驳回弹出框
      row: [],
      // table data
      tableData: [
        {
          orderCoding: '10001',
          applicationType: '器械包申请',
          applicationDepartment: '妇一科',
          applicant: '张美华',
          applicationTime: '2020.08.10 09:54:12',
          state: '3'
        },
        {
          orderCoding: '10001',
          applicationType: '一次性物品申领',
          applicationDepartment: '儿保科',
          applicant: '陈春兰',
          applicationTime: '2020.08.10 09:54:12',
          state: '1'
        },
        {
          orderCoding: '10001',
          applicationType: '器械包换物申请',
          applicationDepartment: '妇保科',
          applicant: '李刚',
          applicationTime: '2020.08.10 09:54:12',
          state: '1'
        },
        {
          orderCoding: '10001',
          applicationType: '消毒物品申请',
          applicationDepartment: '宫颈科',
          applicant: '刘玉玲',
          applicationTime: '2020.08.10 09:54:12',
          state: '2'
        },
        {
          orderCoding: '10001',
          applicationType: '外来器械包申请',
          applicationDepartment: '手术室',
          applicant: '李顺庭',
          applicationTime: '2020.08.10 09:54:12',
          state: '4'
        },
        {
          orderCoding: '10001',
          applicationType: '自定义器械包申请',
          applicationDepartment: '手术室',
          applicant: '李顺庭',
          applicationTime: '2020.08.10 09:54:12',
          state: '5'
        }
      ],
      disagree: {},
      statesOptions: [
        {
          value: '全部状态',
          label: '全部状态'
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
          value: '已审核，待配包',
          label: '已审核，待配包'
        },
        {
          value: '已配包，待发货',
          label: '已配包，待发货'
        }
      ],
      statusOptions: [
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
      departmentOptions: [
        {
          value: '全部科室',
          label: '全部科室'
        },
        {
          value: '妇一科',
          label: '妇一科'
        },
        {
          value: '儿保科',
          label: '儿保科'
        },
        {
          value: '妇保科',
          label: '妇保科'
        },
        {
          value: '宫颈科',
          label: '宫颈科'
        },
        {
          value: '手术室',
          label: '手术室'
        }
      ]
    }
  },
  computed: {
    // table data length
    content() {
      return '共' + this.tableData.length + '条数据'
    }
  },
  methods: {
    // 状态标签文字
    state(state) {
      const stateMap = {
        '1': '未审核',
        '2': '已驳回',
        '3': '已完成',
        '4': '已审核,待配包',
        '5': '已配包,待发货'
      }
      return stateMap[state]
    },
    // 状态标签图标
    stateIcon(state) {
      const stateMap = {
        '1': 'el-icon-time',
        '2': 'el-icon-warning',
        '3': 'el-icon-success',
        '4': 'el-icon-time',
        '5': 'el-icon-time'
      }
      return stateMap[state]
    },
    // 状态标签颜色
    stateColor(state) {
      const stateMap = {
        '1': 'base-color',
        '2': 'error-color',
        '3': 'success-color',
        '4': 'normal-color',
        '5': 'normal-color'
      }
      return stateMap[state]
    },
    // 控制命令
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    // 控制同意
    handleAgree(index, row) {
      row.state = '5'
      this.$message({
        message: '已审核',
        type: 'success'
      })
    },
    // 控制不同意
    handleDisagree(index, row) {
      this.row = row
      this.disagreeShow = true
      this.disagree = {
        orderCoding: row.orderCoding,
        resultRadio: '1',
        resultText: ''
      }
    },
    // 控制发货
    handleDelivery(index, row) {
      this.$router.push('/warehouse/orderManagement/delivery')
    },
    // 控制查看详细
    detailShow(index, row) {
      this.$router.push('/warehouse/orderManagement/orderDetail')
    },
    // 不同意提交
    disagreeSubmit() {
      this.disagreeShow = false
      this.row.state = '2'
      this.$message({
        message: '已驳回',
        type: 'success'
      })
    },
    statesChange(state) {
      console.log(state)
    },
    departmentChange(department) {
      console.log(department)
    },
    statusChange(status) {
      console.log(status)
    },
    contentChange(content) {
      console.log(content)
    },
    dateChange(date) {
      console.log(date)
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.warning-box{
  background: #FFF8F3;
  padding: 25px 25px 10px  25px;
}
.disagree-title{
  font-size: 16px;
  color: red;
}
::v-deep .tiny-form-item {
  .el-form-item{
    margin: 0;
    .el-form-item__label{
      float: left;
    color: #999999;
    font-size: 12px;
  }
  .el-form-item__content{
     color: #999999;
    font-size: 12px;
  }
  }
}
</style>
