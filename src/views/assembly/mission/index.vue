<template>
  <div class="mission-contaniner">
    <!-- header -->
    <myfilters
      title="任务列表"
      :content="content"
      :choose-cleaning-box="true"
      :choose-cleaning-equipment="true"
      :search-content="true"
      placeholder="清洗人"
      :choose-date="true"
      @cleaningBoxChange="cleaningBoxChange"
      @contentChange="contentChange"
      @dateChange="dateChange"
      @cleaningEquipmentChange="cleaningEquipmentChange"
    />
    <!-- header end -->
    <!-- table -->
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column label="清洗框/架">
        <template slot-scope="scope">
          <div>
            {{ scope.row.cleanboxName }}
            <br>
            <span class="second-row">{{ scope.row.cleanboxNum }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="清洗人/时间">
        <template slot-scope="scope">
          <div>
            {{ scope.row.cleanUser }}
            <br>
            <span class="second-row">{{ scope.row.cleanStartTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="清洗设备/程序">
        <template slot-scope="scope">
          <div>
            {{ scope.row.cleanEquipmentName }}
            <br>
            <span class="second-row">{{ scope.row.cleanProgramName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="审核状态">
        <template slot-scope="scope">
          <div :class="stateColor(scope.row.status)">
            <i :class="stateIcon(scope.row.status)" />
            {{ ssd_assemble_task_status[scope.row.status] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleShow(scope.$index, scope.row)"
          >审核装配</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <my-pagination :total="total" methods="getAssembleTaskPage" :conditions="conditions" />
    <!-- dialog -->
    <el-dialog :visible.sync="show" width="95%">
      <template slot="title">
        <span class="dialog-title">{{ row.cleaningFrame }}</span>
        <span class="dialog-content">{{ row.cleaningBox }}</span>
      </template>
      <div class="dialog-main">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="dialog-main-box">
              <div class="title">
                请清点核对器械数量
                <span class="dialog-mian-box-left">并将缺失/维修/报废的器械补齐</span>
              </div>
              <!-- table header -->
              <el-table :data="dialogData" style="width: 100%" class="hidden-table">
                <el-table-column label="序号" width="100" />
                <el-table-column label="器械名称" />
                <el-table-column label="应有数量" />
                <el-table-column label="缺失" width="80" />
                <el-table-column label="待维修" width="80" />
                <el-table-column label="报废" width="80" />
              </el-table>
              <!-- table header end -->
              <!-- scrollbar -->
              <el-scrollbar class="scrollbar">
                <!-- table -->
                <el-table v-loading="dialogLoading" :data="dialogData" style="width: 100%" :show-header="false">
                  <el-table-column type="index" width="100" />
                  <el-table-column prop="suppliesName" />
                  <el-table-column prop="totalCount" />
                  <!-- editFocus() 当点击时获取输入框的数据 -->
                  <el-table-column width="80">
                    <template slot-scope="scope">
                      <el-input v-model.number="scope.row.loseCount" size="small" @change="countChange(scope.row)" @focus="editFocus(scope.row)" />
                    </template>
                  </el-table-column>
                  <el-table-column width="80">
                    <template slot-scope="scope">
                      <el-input v-model.number="scope.row.maintainCount" size="small" @change="countChange(scope.row)" @focus="editFocus(scope.row)" />
                    </template>
                  </el-table-column>
                  <el-table-column width="80">
                    <template slot-scope="scope">
                      <el-input v-model.number="scope.row.scrapCount" size="small" @change="countChange(scope.row)" @focus="editFocus(scope.row)" />
                    </template>
                  </el-table-column>
                </el-table>
                <!-- table end -->
              </el-scrollbar>
              <!-- scrollbar end -->
            </div>
          </el-col>
          <el-col :span="12">
            <div class="dialog-main-box">
              <div class="title">
                清洗质量记录表
                <span class="dialog-mian-box-right">{{ row.id }}</span>
              </div>
              <!-- scrollbar -->
              <el-scrollbar class="scrollbar">
                <!-- 循环所有清洗类型并检测是否被选择 -->
                <div v-for="(item,index) in form" :key="index" v-loading="dialogLoading" class="white-box" :class="{isCheck:check(item.groupName)}">
                  <el-form :ref="item" :model="item" label-width="60px">
                    <el-row>
                      <el-col :span="5">
                        <!-- checkbox -->
                        <div class="checkTitle">
                          <el-checkbox v-model="checkList" :label="item.groupName" @change="checkboxChange(item.groupName,index)" />
                        </div>
                        <div
                          class="checkTitle"
                          style="margin:16px 0 0 25px"
                        >合计：{{ totalCount(item.items) }}</div>
                      </el-col>
                      <el-col :span="19">
                        <!-- 循环所有清洗类型的部位 -->
                        <div v-for="(t,i) in item.items" :key="i" style="margin-bottom:16px">
                          <el-row>
                            <el-col :span="4">
                              <div class="checkTitle">{{ t.name }}:</div>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="污渍" :class="{formItemDisabled:!check(item.groupName)}">
                                <el-input v-model.number="t.rustCount" size="mini" :disabled="!check(item.groupName)" />
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="锈渍" :class="{formItemDisabled:!check(item.groupName)}">
                                <el-input v-model.number="t.stainCount" size="mini" :disabled="!check(item.groupName)" />
                              </el-form-item>
                            </el-col>
                            <el-col v-if="t.isShowAttach===1" :span="6">
                              <el-form-item label="附着物" :class="{formItemDisabled:!check(item.groupName)}">
                                <el-input v-model.number="t.attachCount" size="mini" :disabled="!check(item.groupName)" />
                              </el-form-item>
                            </el-col>
                          </el-row>
                        </div>
                      </el-col>
                    </el-row>
                  </el-form>
                </div>
              </el-scrollbar>
              <!-- scrollbar end -->
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="bgc" @click="show=false">取消</el-button>
        <el-button type="primary" @click="signSubmit">确定</el-button>
      </div>
    </el-dialog>
    <!-- dialog end -->
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
      show: false, // dialog show
      row: [],
      tempRow: [], // 临时校验行
      checkList: [], // 被选中列表
      form: [], // 清洗质量表
      dialogData: [], // 器械表
      tableData: [], // index table data
      total: 0,
      listLoading: true,
      dialogLoading: true,
      buttonLoading: false,
      ssd_assemble_task_status: [],
      conditions: {
        status: '1',
        cleanboxId: null,
        cleanEquipmentId: null,
        cleanUserFuzzy: null,
        cleanStartTimeOneDay: null
      }
    }
  },
  computed: {
    // index table data count
    content() {
      return '共' + this.total + '条数据'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取数据
    fetchData() {
      this.listLoading = true
      api.getAssembleTaskPage({ status: '1' }).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          this.total = response.data.totalCount
          this.tableData = response.data.records
          this.listLoading = false
          this.ssd_assemble_task_status = response.data.dictData.ssd_assemble_task_status
        }
      })
    },
    // 判断输入是否合理
    countChange(row) {
      const reg = new RegExp('^[0-9]*$')
      if (row.totalCount - row.loseCount - row.scrapCount - row.maintainCount < 0) { // 输入数量应小于总数
        this.$message({
          message: '输入总数应小于应有总数',
          type: 'error'
        })
      } else if (row.loseCount < 0 || row.scrapCount < 0 || row.maintainCount < 0) { // 输入应大于0
        this.$message({
          message: '输入数字应大于0',
          type: 'error'
        })
      } else if (!reg.test(row.loseCount) || !reg.test(row.scrapCount) || !reg.test(row.maintainCount)) { // 输入应为数字
        this.$message({
          message: '请输入数字',
          type: 'error'
        })
      } else {
        return
      }
      this.$set(row, 'loseCount', this.tempRow.loseCount)
      this.$set(row, 'scrapCount', this.tempRow.scrapCount)
      this.$set(row, 'maintainCount', this.tempRow.maintainCount)
    },
    // 获取旧数据
    editFocus(row) {
      this.tempRow = JSON.parse(JSON.stringify(row))
    },
    // 状态标签图标
    stateIcon(state) {
      const stateMap = {
        '1': 'el-icon-time',
        '2': 'el-icon-success'
      }
      return stateMap[state]
    },
    // 状态标签颜色
    stateColor(state) {
      const stateMap = {
        '1': 'base-color',
        '2': 'success-color'
      }
      return stateMap[state]
    },
    // 控制弹出框
    handleShow(index, row) {
      this.row = row
      this.dialogLoading = true
      api.getAssembleDetail({ id: row.id }).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.dialogData = response.data.cleanInfos
          this.form = response.data.qtData
          this.dialogLoading = false
        }
      })
      this.show = true
    },
    // 检测dialog checkbox是否被选择
    check(item) {
      return this.checkList.includes(item)
    },
    // 如果点击checkbox,则清空数据
    checkboxChange(groupName, index) {
      if (!this.checkList.includes(groupName)) {
        this.form[index].items.forEach(item => {
          item.attachCount = 0
          item.rustCount = 0
          item.stainCount = 0
        })
      }
    },
    // 计算清洗类型合计
    totalCount(items) {
      let total = 0
      items.forEach(item => {
        total += parseInt(item.attachCount + item.rustCount + item.stainCount)
      })
      return total
    },
    // dialog submit
    signSubmit() {
      this.row.state = '1'
      this.buttonLoading = true
      api.toSubmitAssemble({ taskId: this.row.id, qtInfos: this.form, suppliesInfos: this.dialogData }).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          this.$message({
            message: '审核装配成功',
            type: 'success'
          })
          this.buttonLoading = false
          this.show = false
          this.tableData.splice(this.tableData.indexOf(this.row), 1)
        }
      })
    },
    // 清洗框/架选择改变
    cleaningBoxChange(box) {
      this.$set(this.conditions, 'cleanboxId', box)
      this.selectChange()
    },
    // 清洗设备选择改变
    cleaningEquipmentChange(equ) {
      this.$set(this.conditions, 'cleanEquipmentId', equ)
      this.selectChange()
    },
    // 清洗人输入框改变
    contentChange(content) {
      this.$set(this.conditions, 'cleanUserFuzzy', content)
      this.selectChange()
    },
    // 时间改变
    dateChange(date) {
      this.$set(this.conditions, 'cleanStartTimeOneDay', date)
      this.selectChange()
    },
    selectChange() {
      this.$set(this.conditions, 'pageNo', 1)
      this.listLoading = true
      api.getAssembleTaskPage(this.conditions).then(response => {
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
.mission-contaniner {
  padding: 30px;
  min-height: calc(100vh - 50px);
}
::v-deep .el-form-item__label {
  font-weight: normal;
  color: #666666;
}
::v-deep .el-checkbox__label {
  font-size: 18px;
  display: inline-block;
  line-height: 40px;
  color: rgba(0, 0, 0, 0.5);
}
::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #000;
}
::v-deep .el-checkbox__input {
  line-height: unset;
  vertical-align:unset;
}
.title {
  font-size: 18px;
  line-height:24px;
  height: 24px;
  margin-bottom: 16px;
  .dialog-mian-box-right {
    font-size: 14px;
    color: #666666;
    margin-left: 15px;
  }
  .dialog-mian-box-left {
    font-size: 14px;
    color: #ff4c4c;
    margin-left: 15px;
  }
}
.second-row {
  color: #999;
}
::v-deep .dialog-main-box {
  height: 550px;
  background: rgba(246, 246, 246, 1);
  border: 1px dotted rgba(175, 179, 192, 1);
  padding: 20px 25px;
  .box-title {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 16px;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .scrollbar{
    height:420px;
    background: #fff
  }
}
.white-box {
  padding: 20px;
  padding-bottom: 0;
  border-radius: 6px;
  margin-bottom: 20px;
  box-shadow:4px 4px 40px 0px rgba(0,0,0,0.05);
  background: #ffffff;
  color: rgba(0, 0, 0, 0.5);
}
.white-box:last-child {
  margin-bottom: 0;
}
.isCheck {
  color: #000000;
}
.dialog-main {
  padding: 20px;
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
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
.checkTitle {
  line-height: 40px;
}
::v-deep .formItemDisabled .el-form-item__label {
  color:rgba(102,102,102,.5);
}
</style>
