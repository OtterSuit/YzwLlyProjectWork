<template>
  <div>
    <div style="padding:30px">
      <!-- header -->
      <myfilters
        title="订单管理"
        :content="content"
        :choose-status="true"
        :choose-type="true"
        :search-content="true"
        :choose-date="true"
        :choose-department="true"
        placeholder="申请人/订单编号"
        date-placeholder="申请时间"
        :status-options="statusOptions"
        :type-options="ssd_packet_category"
        :options="departmentOptions"
        @statusChange="statusChange"
        @departmentChange="departmentChange"
        @typeChange="typeChange"
        @contentChange="contentChange"
        @dateChange="dateChange"
      />
      <!-- header end -->
      <!-- table -->
      <el-table
        v-loading="listLoading"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          type="index"
          width="100px"
        />
        <el-table-column label="订单编号" prop="id" width="200px" />
        <el-table-column label="申请类别">
          <template slot-scope="scope">
            <div>
              {{ ssd_packet_category[scope.row.workorderCategory] }}
              <span v-if="scope.row.urgentFlag===1" class="error-color">【加急】</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="申请科室" prop="applyDeptName" />
        <el-table-column label="申请人" prop="applyUserid" />
        <el-table-column label="申请时间" prop="applyTime" width="220px" />
        <el-table-column
          width="150px"
          label="状态"
        >
          <template slot-scope="scope">
            <div :class="stateColor(scope.row.currentStatus)">
              <i :class="stateIcon(scope.row.currentStatus)" />
              {{ ssd_workorder_status[scope.row.currentStatus] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="right">
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
                <!-- <el-dropdown-item
                  :disabled="scope.row.currentStatus!=='1'"
                  :command="{
                    index: scope.$index,
                    row: scope.row,
                    action: 'handleAgree'
                  }"
                >同意</el-dropdown-item> -->
                <el-dropdown-item
                  :disabled="scope.row.currentStatus!=='1'"
                  :command="{
                    index: scope.$index,
                    row: scope.row,
                    action: 'handleDisagree'
                  }"
                >不同意</el-dropdown-item>
                <el-dropdown-item
                  :disabled="scope.row.currentStatus!=='1'"
                  :command="{
                    index: scope.$index,
                    row: scope.row,
                    action: 'handleDelivery'
                  }"
                >发放</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- 下拉框结束 -->
          </template>
        </el-table-column>
      </el-table>
      <my-pagination :total="totalCount" methods="toShowPage" :conditions="conditions" />
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
                    您确定要驳回订单【{{ disagree.id }}】吗？
                  </div>
                  <div class="tiny-form-item">
                    <el-form-item label="订单编码">
                      {{ disagree.id }}
                    </el-form-item>
                    <el-form-item label="申请类别">
                      {{ disagree.category }}
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
          <el-button type="danger" :loading="buttonLoading" @click="disagreeSubmit">确定驳回</el-button>
        </div>
      </el-dialog>
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
      buttonLoading: false,
      listLoading: true,
      ssd_workorder_status: null,
      ssd_packet_category: null, // 包类型
      disagreeShow: false, // 驳回弹出框
      // table data
      tableData: [],
      disagree: {},
      totalCount: 0,
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
      ],
      conditions: {
        workorderType: '1',
        workorderCategory: null,
        currentStatus: '',
        keyword: null,
        applyTimeOneDay: null,
        applyDeptName: null
      },
      statusOptions: {
        1: '申请',
        10: '已取消',
        2: '发放中',
        3: '已验收',
        9: '已驳回'
      }
    }
  },
  computed: {
    // table data length
    content() {
      return '共' + this.totalCount + '条数据'
    }
  },
  created() {
    this.fetchData() // 获取数据
  },
  methods: {
    // 初始化表单数据
    fetchData() {
      this.listLoading = true
      // 分页查询工单(请求工单)
      api.toShowPage(this.conditions).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.ssd_workorder_status = response.data.dictData.ssd_workorder_status // 工单状态字典
          this.ssd_packet_category = response.data.dictData.ssd_packet_category // 获取包类型
          this.tableData = response.data.records
          this.totalCount = response.data.totalCount
          this.listLoading = false
        }
      })
    },
    // 状态标签图标
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
    // 状态标签颜色
    stateColor(state) {
      const stateMap = {
        '1': 'base-color',
        '2': 'goon-color',
        '3': 'success-color',
        '9': 'error-color',
        '10': 'base-color'
      }
      return stateMap[state]
    },
    // 控制命令
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    // 控制不同意
    handleDisagree(index, row) {
      this.row = row
      this.buttonLoading = false
      this.disagreeShow = true
      // 驳回数据
      this.disagree = {
        id: row.id,
        resultRadio: '1',
        resultText: '',
        category: this.ssd_packet_category[row.category]
      }
    },
    // 驳回请求数据类型
    radioResult(label) {
      const labelMap = {
        '1': '仓库缺货',
        '2': '提交错误',
        '3': this.disagree.resultText
      }
      return labelMap[label]
    },
    // 控制发放
    handleDelivery(index, row) {
      this.$router.push({
        name: 'Delivery',
        query: {
          id: row.id
        }
      })
    },
    // 控制查看详细
    detailShow(index, row) {
      this.$router.push({
        name: 'OrderDetail',
        query: {
          id: row.id
        }
      })
    },
    // 不同意提交
    disagreeSubmit() {
      // 驳回表单
      const disagreeForm = {
        id: this.disagree.id,
        remark: this.radioResult(this.disagree.resultRadio)
      }
      // 驳回请求
      this.buttonLoading = true
      api.toRejectApply(disagreeForm).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          this.disagreeShow = false
          this.row.currentStatus = '9'
          this.$message({
            message: '已驳回',
            type: 'success'
          })
        }
      })
    },
    statusChange(state) {
      this.$set(this.conditions, 'currentStatus', state)
      this.selectChange()
    },
    departmentChange(department) {
      this.$set(this.conditions, 'applyDeptName', department)
      this.selectChange()
    },
    typeChange(status) {
      this.$set(this.conditions, 'workorderCategory', status)
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
