<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      title="审核"
      :content="content"
      :choose-date="true"
      :choose-cleaning-box="true"
      placeholder="装配人"
      :search-content="true"
      @contentChange="contentChange"
      @dateChange="dateChange"
      @cleaningBoxChange="cleaningBoxChange"
    />
    <!-- 头部 end -->
    <!-- table -->
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column label="清洗框/架">
        <template slot-scope="scope">
          {{ scope.row.name }}<br>
          <span class="second-row">{{ scope.row.cleaningBoxCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="装配人/时间">
        <template slot-scope="scope">
          {{ scope.row.assembleUser }}<br>
          <span class="second-row">{{ scope.row.assembleTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="quantity" label="器械数量" />
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div :class="stateColor(scope.row.status)">
            <i :class="stateIcon(scope.row.status)" />
            {{ ssd_packet_task_status[scope.row.status] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status==='1'"
            slot="reference"
            size="mini"
            type="primary"
            @click="handleShow(scope.$index, scope.row)"
          >审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <my-pagination :total="totalCount" methods="getPacketTaskPage" :conditions="conditions" />
    <!-- 弹窗 -->
    <el-dialog :visible.sync="show" width="95%">
      <template slot="title">
        <span class="dialog-title">{{ tableData[editIndex]?tableData[editIndex].cleaningBox:'' }}</span>
        <span class="dialog-content">{{ tableData[editIndex]?tableData[editIndex].cleaningBoxCode:'' }}</span>
      </template>
      <div class="dialog-main">
        <el-row>
          <el-col>
            <div v-loading="dialogLoading" class="dialog-main-box">
              <div>
                <span class="box-title">请清点核对器械数量</span>
                <span class="box-title-right">共
                  <span>{{ instrumentNum() }}</span>
                  件器械</span>
              </div>
              <div style="height:470px">
                <el-table :data="instrumentData" style="width: 100%" class="hidden-table">
                  <el-table-column label="序号" width="100" />
                  <el-table-column label="器械名称" />
                  <el-table-column label="数量" />
                </el-table>
                <el-scrollbar class="scrollbar">
                  <el-table :data="instrumentData" style="width: 100%" :show-header="false">
                    <el-table-column type="index" width="100" />
                    <el-table-column prop="name" />
                    <el-table-column prop="quantity" />
                  </el-table>
                </el-scrollbar>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="bgc" @click="show=false">取消</el-button>
        <el-button type="primary" :loading="buttonLoading" @click="auditSubmit">审核通过</el-button>
      </div>
    </el-dialog>
    <!-- 弹窗end -->
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
      ssd_packet_task_status: '',
      tableData: [], // 表单数据
      instrumentData: [], // 器械数据
      show: false,
      editIndex: 0, // 编辑行编号
      totalCount: 0, // 总数
      listLoading: true, // 加载数据
      buttonLoading: false, // 按钮等待
      dialogLoading: true, // 加载弹窗数据
      conditions: {
        status: '1',
        cleanboxId: null,
        assembleUserFuzzy: null,
        assembleTimeOneDay: null
      }
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
    // 获取数据
    fetchData() {
      this.listLoading = true
      api.getPacketTaskPage({ status: '1' }).then(response => {
        console.log(response)
        this.totalCount = response.data.totalCount
        this.tableData = response.data.records
        this.ssd_packet_task_status = response.data.dictData.ssd_packet_task_status
        this.listLoading = false
      })
    },
    // 控制弹窗
    handleShow(index, row) {
      this.row = row
      this.show = true
      this.dialogLoading = true
      // 获取器械数据
      api.getPacketDetail({ id: row.id }).then(response => {
        console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.instrumentData = response.data.suppliesInfos
          this.dialogLoading = false
        }
      })
      this.editIndex = index
    },
    // 审核
    auditSubmit() {
      this.buttonLoading = true
      // 审核请求
      api.toPassAudit({ id: this.row.id }).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          this.$message({
            message: '审核成功',
            type: 'success'
          })
          this.tableData.splice(this.editIndex, 1)
          this.show = false
          this.buttonLoading = false
        }
      })
    },
    // 器械数量
    instrumentNum() {
      let num = 0
      this.instrumentData.forEach(element => {
        num += parseInt(element.quantity)
      })
      return num
    },
    // 状态的icon
    stateIcon(state) {
      const stateMap = {
        '1': 'el-icon-time',
        '2': 'el-icon-success'
      }
      return stateMap[state]
    },
    // 状态颜色
    stateColor(state) {
      const stateMap = {
        '1': 'base-color',
        '2': 'success-color'
      }
      return stateMap[state]
    },
    // 输入框改变
    contentChange(content) {
      this.$set(this.conditions, 'assembleUserFuzzy', content)
      this.selectChange()
    },
    // 时间改变
    dateChange(date) {
      this.$set(this.conditions, 'assembleTimeOneDay', date)
      this.selectChange()
    },
    // 清洗架改变
    cleaningBoxChange(box) {
      this.$set(this.conditions, 'cleanboxId', box)
      this.selectChange()
    },
    selectChange() {
      this.$set(this.conditions, 'pageNo', 1)
      this.listLoading = true
      api.getPacketTaskPage(this.conditions).then(response => {
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
  padding: 20px;
}
.dialog-main-box {
  height: 550px;
  background: rgba(246, 246, 246, 1);
  border: 1px dotted rgba(175, 179, 192, 1);
  padding: 20px 25px;
  .box-title {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 16px;
  }
  .scrollbar{
    height:420px;
    background: #fff
  }
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
.dialog-title {
  font-size:18px;
  line-height:24px;
  display: inline-block;
  margin-right: 16px;
}
.dialog-content {
  font-size:14px;
  color:#999;
  line-height:19px;
}
.box-title-right {
  float: right;
  font-size:14px;
  color:#666;
  line-height:19px;
  span {
    font-size:24px;
    color:black;
    line-height:31px;
    display: inline-block;
    margin: 0 10px;
  }
}
</style>
