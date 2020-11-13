<template>
  <div class="completed-contaniner">
    <!-- header -->
    <myfilters
      title="已完成"
      :content="content"
      :choose-cleaning-box="true"
      :choose-cleaning-equipment="true"
      :search-content="true"
      placeholder="清洗人"
      :choose-date="true"
      @cleaningBoxChange="cleaningBoxChange"
      @cleaningEquipmentChange="cleaningEquipmentChange"
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
        width="100"
      />
      <el-table-column label="单号" prop="id" />
      <el-table-column label="清洗框/架">
        <template slot-scope="scope">
          <div>
            {{ scope.row.cleanboxName }} <br>
            <span class="second-row">
              {{ scope.row.cleanboxNum }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="清洗设备/程序">
        <template slot-scope="scope">
          <div>
            {{ scope.row.cleanEquipmentName }} <br>
            <span class="second-row">
              {{ scope.row.cleanProgramName }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="清洗人/时间">
        <template slot-scope="scope">
          <div>
            {{ scope.row.cleanUser }} <br>
            <span class="second-row">
              {{ scope.row.cleanStartTime }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="检查者/时间">
        <template slot-scope="scope">
          <div>
            {{ scope.row.assembleUser }}
            <br>
            <span class="second-row">{{ scope.row.assembleTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleShow(scope.$index, scope.row)"
          > <i class="el-icon-tickets" /> 查看详细
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <my-pagination :total="total" methods="getAssembleTaskPage" :conditions="conditions" />
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
                器械数量
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
                  <el-table-column width="80" prop="loseCount" />
                  <el-table-column width="80" prop="maintainCount" />
                  <el-table-column width="80" prop="scrapCount" />
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
              <el-scrollbar style="height:470px;">
                <!-- 循环所有清洗类型并检测是否被选择 -->
                <div v-for="(item,index) in form" :key="index" v-loading="dialogLoading" class="white-box">
                  <el-form :ref="item" :model="item" label-width="60px">
                    <el-row>
                      <el-col :span="5">
                        <div class="checkTitle">
                          <span class="groupTitle">{{ item.groupName }}</span>
                          <!-- <el-checkbox v-model="checkList" :label="item.groupName" @change="checkboxChange(item.groupName,index)" /> -->
                        </div>
                        <!-- <div
                          class="checkTitle"
                        >合计：{{ totalCount(item.items) }}</div> -->
                      </el-col>
                      <el-col :span="19">
                        <!-- 循环所有清洗类型的部位 -->
                        <div v-for="(t,i) in item.items" :key="i" style="margin-bottom:16px">
                          <el-row>
                            <el-col :span="5">
                              <div class="checkTitle">{{ t.name }}:</div>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="污渍">
                                {{ t.rustCount }}
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="锈渍">
                                {{ t.stainCount }}
                              </el-form-item>
                            </el-col>
                            <!-- 如果是有附着物的标志,则显示附着物 -->
                            <el-col v-if="t.isShowAttach===1" :span="6">
                              <el-form-item label="附着物">
                                {{ t.attachCount }}
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
        <el-button type="primary" @click="show=false">确定</el-button>
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
      tableData: [], // table data
      listLoading: true,
      dialogLoading: true,
      conditions: {
        status: '2',
        cleanboxId: null,
        cleanEquipmentId: null,
        cleanUserFuzzy: null,
        cleanStartTimeOneDay: null
      },
      total: 0,
      dialogData: null, // 弹出框器械数量的数据
      form: null, // 清洗质量记录表数据
      show: false,
      row: []
    }
  },
  computed: {
    // table data length
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
      // 2: "审核装配完成"
      api.getAssembleTaskPage({ status: '2' }).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.tableData = response.data.records
          this.ssd_assemble_task_status = response.data.dictData.ssd_assemble_task_status
          this.total = response.data.totalCount
          this.listLoading = false
        }
      })
    },
    // 控制弹出框
    handleShow(index, row) {
      this.row = row
      this.dialogLoading = true
      // 获取当前行的数据
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
    // 输入框输入改变
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
.completed-contaniner {
  padding: 30px;
  min-height: calc(100vh - 50px);
}
.search-button {
  width: 100%;
}
.filter {
  font-size: 12px;
  position: absolute;
  top: 4px;
  left: 80px;
  span {
    display: inline-block;
  }
  .label {
    color:rgba(158,174,195,1);
  }
  .content {
    color: #666;
    margin-right: 10px;
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
  color: rgba(0, 0, 0, 0.8);
}
.white-box:last-child {
  margin-bottom: 0;
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
  .groupTitle{
    font-size: 18px;
    display: inline-block;
    line-height: 40px;
    color: rgba(0, 0, 0, 1);
  }
}
::v-deep .formItemDisabled .el-form-item__label {
  color:black
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
</style>
