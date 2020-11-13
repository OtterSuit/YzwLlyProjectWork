<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      title="缺损记录"
      :content="content"
      :choose-date="true"
      :choose-department="true"
      :choose-type="true"
      placeholder="包名称/唯一码"
      :search-content="true"
      :type-options="ssd_workorder_type"
      @contentChange="contentChange"
      @dateChange="dateChange"
      @typeChange="typeChange"
      @departmentChange="departmentChange"
    />
    <!-- 头部 end -->
    <!-- table -->
    <el-table v-loading="listLoading" :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column prop="applyDeptName" label="科室" />
      <el-table-column label="任务/单号">
        <template slot-scope="scope">
          {{ ssd_workorder_type[scope.row.workorderType] }}<br>
          <span class="second-row">{{ scope.row.workorderId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="包名称/唯一码">
        <template slot-scope="scope">
          {{ scope.row.name }}<br>
          <span class="second-row">{{ scope.row.packetInstanceId }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalLoseCount" label="缺失" />
      <el-table-column prop="totalDamageCount" label="损坏" />
      <el-table-column label="回收人/时间" width="170">
        <template slot-scope="scope">
          {{ scope.row.lastUser }}<br>
          <span class="second-row">{{ scope.row.lastTime }}</span>
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
    <my-pagination :total="totalCount" methods="toShowPiPage" :conditions="conditions" />
    <el-dialog title="物品详细" :visible.sync="detailShow" width="800px">
      <div class="dialog-main">
        <div class="dialog-main-box">
          <div style="height:450px">
            <el-table :data="detailData" style="width: 100%" class="hidden-table">
              <el-table-column label="序号" type="index" width="130" align="center" />
              <el-table-column label="名称" />
              <el-table-column label="缺失" />
              <el-table-column label="损坏" />
            </el-table>
            <el-scrollbar style="height:400px;background: #fff">
              <el-table :data="detailData" style="width: 100%" :show-header="false">
                <el-table-column type="index" width="130" align="center" />
                <el-table-column prop="name" />
                <el-table-column prop="loseCount" />
                <el-table-column prop="damageCount" />
              </el-table>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </el-dialog>
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
      totalCount: 0,
      ssd_workorder_type: null,
      conditions: {
        loseAndDamage: '1',
        workorderTypes: [2, 3],
        keyword: null,
        createTimeOneDay: null,
        applyDeptName: null
      },
      detailData: [],
      detailShow: false
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
      api.toShowPiPage({ loseAndDamage: '1', workorderTypes: [2, 3] }).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.ssd_workorder_type = response.data.dictData.ssd_workorder_type
          delete this.ssd_workorder_type['1']
          this.tableData = response.data.records
          this.totalCount = response.data.totalCount
          this.listLoading = false
        }
      })
    },
    // 表格查看按钮
    handleShow(index, row) {
      console.log(row)
      this.detailData = row.lostDamageList
      this.detailShow = true
    },
    // 输入框改变
    contentChange(content) {
      this.$set(this.conditions, 'keyword', content)
      this.selectChange()
    },
    // 时间改变
    dateChange(date) {
      this.$set(this.conditions, 'createTimeOneDay', date)
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
      api.toShowPiPage(this.conditions).then(response => {
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
.dialog-main-box {
  position: relative;
  height: 500px;
  background: rgba(246, 246, 246, 1);
  border: 1px dotted rgba(175, 179, 192, 1);
  padding: 20px 25px;
}
.dialog-main {
  padding: 20px;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
