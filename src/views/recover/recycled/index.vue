<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      title="已完成"
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
    <!-- 头部 end -->
    <!-- table -->
    <el-table v-loading="listLoading" :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column prop="applyDeptName" label="申请科室" />
      <el-table-column label="任务类别">
        <template slot-scope="scope">
          {{ ssd_workorder_type [scope.row.workorderType] }}
          <el-tooltip v-if="scope.row.defect&&scope.row.defect.length!==0" class="item" effect="light" placement="bottom">
            <div slot="content">
              <div v-for="item in scope.row.defect" :key="item.package" class="tooltip-content">
                <span class="tooltip-title">{{ item.package }}</span>
                <span v-if="item.missing!==0" class="tooltip-text">缺失{{ item.missing }}件</span>
                <span v-if="item.damage!==0" class="tooltip-text">损坏{{ item.damage }}件</span>
              </div>
            </div>
            <i class="el-icon-warning" style="color:#F9944A" />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="单号" />
      <el-table-column prop="applyCount" label="包数量" />
      <el-table-column label="申请人/时间" width="170">
        <template slot-scope="scope">
          {{ scope.row.applyUserid }}<br>
          <span class="second-row">{{ scope.row.applyTime }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="下送人/时间" width="170">
        <template slot-scope="scope">
          {{ scope.row.deliveryName }}<br>
          <span class="second-row">{{ scope.row.deliveryTime }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="回收人/时间" width="170">
        <template slot-scope="scope">
          {{ scope.row.lastHandleUserid }}<br>
          <span class="second-row">{{ scope.row.endTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button
            slot="reference"
            size="mini"
            icon="el-icon-tickets"
            @click="handleShow(scope.$index, scope.row)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <my-pagination :total="totalCount" methods="toShowPage" :conditions="conditions" />
    <!-- table end -->
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
      ssd_workorder_type: null,
      tableData: [],
      totalCount: 0,
      conditions: { workorderTypes: null, currentStatus: '13' }
      // show: false
      // row: []
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
      // 分页查询工单(回收类型,已回收状态)
      api.toShowPage({ currentStatus: '13' }).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.ssd_workorder_status = response.data.dictData.ssd_workorder_status // 工单状态字典
          this.ssd_workorder_type = response.data.dictData.ssd_workorder_type // 工单类型字典
          delete this.ssd_workorder_type['1']
          this.tableData = response.data.records
          this.totalCount = response.data.totalCount
          this.listLoading = false
        }
      })
    },
    // 表格查看按钮
    handleShow(index, row) {
      this.$router.push(
        {
          path: '/recover/recycled/particulars',
          query: { id: row.id }
        }
      )
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
.dialog-main {
 padding: 30px 30px 50px;
}
.tooltip-content {
  height:24px;
  font-size:12px;
  color:rgba(102,102,102,1);
  line-height:24px;
  .tooltip-text {
    margin-right: 25px;
  }
  .tooltip-title {
    display: inline-block;
    width: 110px;
  }
}
</style>
