<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      title="任务列表"
      :content="content"
      :choose-date="true"
      :choose-cleaning-box="true"
      placeholder="编码/回收人"
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
      <el-table-column prop="id" label="编码" />
      <el-table-column label="清洗框/架">
        <template slot-scope="scope">
          <div>
            {{ scope.row.cleanboxName }}
          </div>
          <div>
            {{ scope.row.cleanboxNum }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="lastUser" label="回收人" />
      <el-table-column prop="lastTime" label="回收时间" width="180" />
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div v-if="ssd_clean_task_status" :class="stateColor(scope.row.status)">
            <i :class="stateIcon(scope.row.status)" />
            {{ ssd_clean_task_status[scope.row.status] }}
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
            :loading="buttonLoading"
            @click="handleShow(scope.$index, scope.row)"
          >开始清洗</el-button>
          <el-button
            v-if="scope.row.status==='2'"
            slot="reference"
            size="mini"
            type="primary"
            :loading="buttonLoading"
            @click="handleCompeted(scope.$index, scope.row)"
          >清洗完成</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <my-pagination :total="totalCount" methods="getCleanTask" :conditions="conditions" :records="['data','page','records']" />
    <!-- 弹窗 -->
    <el-dialog v-el-drag-dialog title="清洗消毒" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <div class="dialog-cleaningBox dialog-content">{{ tableData[editIndex]?tableData[editIndex].name: '' }}</div>
        <div class="dialog-code dialog-content">{{ tableData[editIndex]?tableData[editIndex].code: '' }}</div>
        <el-form ref="form" :model="form" label-width="70px" :rules="rules">
          <el-row type="flex" justify="space-between">
            <el-col :span="18" :offset="3">
              <el-form-item label="清洗设备" prop="cleanEquipmentId">
                <el-select v-model="form.cleanEquipmentId" placeholder>
                  <el-option
                    v-for="(val, key) in CLEAN_POT"
                    :key="val"
                    :label="val"
                    :value="key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="18" :offset="3">
              <el-form-item label="清洗程序" prop="cleanProgramId">
                <el-select v-model="form.cleanProgramId" placeholder>
                  <el-option
                    v-for="(val, key) in CLEAN_PROGRAM"
                    :key="val"
                    :label="val"
                    :value="key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="bgc" @click="show=false">取消</el-button>
        <el-button type="primary" @click="cleanSubmit">确认</el-button>
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
      form: {},
      row: '',
      listLoading: true,
      buttonLoading: false,
      rules: {
        cleanEquipmentId: [
          { required: true, message: '请选择清洗设备', trigger: ['blur', 'change'] }
        ],
        cleanProgramId: [
          { required: true, message: '请选择清洗程序', trigger: ['blur', 'change'] }
        ]
      },
      editIndex: 0,
      show: false,
      tableData: [],
      ssd_clean_task_status: null,
      CLEAN_PROGRAM: null,
      CLEAN_POT: null,
      totalCount: 0,
      conditions: {
        statuses: [1, 2],
        cleanboxId: null,
        lastTimeOneDay: null,
        keyword: null
      }
    }
  },
  computed: {
    // 计算tableData有几条数据
    content() {
      return '共' + this.totalCount + '条数据'
    }
  },
  inject: ['reload'],
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getCleanTask({ statuses: [1, 2] }).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.ssd_clean_task_status = response.data.dictData.ssd_clean_task_status
          this.tableData = response.data.page.records
          this.totalCount = response.data.page.totalCount
          this.listLoading = false
        }
      })
      api.toconstanttypeBatch({
        constantCodes: [
          'CLEAN_PROGRAM',
          'CLEAN_POT'
        ]
      }).then(response => {
        this.CLEAN_PROGRAM = response.data.constantsDetail.CLEAN_PROGRAM
        this.CLEAN_POT = response.data.constantsDetail.CLEAN_POT
      })
    },
    // 清洗弹窗确认按钮
    cleanSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          api.toStartClean(this.form).then(response => {
            // console.log(response)
            this.buttonLoading = true
            if (response.code === '200' && response.data.busiCode === '1') {
              this.$message({
                message: '开始清洗',
                type: 'success'
              })
              // console.log(this.row)
              this.row.status = '2'
              this.reload()
            }
            this.buttonLoading = false
          })
          this.show = false
        } else {
          this.$message({
            message: '请按要求填写',
            type: 'warning'
          })
        }
      })
    },
    // 表格右侧清洗按钮
    handleShow(index, row) {
      this.editIndex = index
      this.row = row
      this.form = {
        cleanTaskId: row.cleanTaskId,
        cleanboxId: row.cleanboxId,
        id: row.id,
        cleanProgramId: null,
        cleanEquipmentId: null
      }
      this.show = true
    },
    handleCompeted(index, row) {
      api.toEndClean({ id: row.id }).then(response => {
        // console.log(response)
        this.buttonLoading = true
        if (response.code === '200' && response.data.busiCode === '1') {
          this.$message({
            message: '清洗完成',
            type: 'success'
          })
          this.tableData.splice(index, 1)
          this.reload()
        }
        this.buttonLoading = false
      })
    },
    // 状态标签文字
    state(state) {
      return this.ssd_clean_task_status[state]
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
      this.$set(this.conditions, 'keyword', content)
      this.selectChange()
    },
    // 时间改变
    dateChange(date) {
      this.$set(this.conditions, 'lastTimeOneDay', date)
      this.selectChange()
    },
    // 清洗框改变
    cleaningBoxChange(cleaningBox) {
      this.$set(this.conditions, 'cleanboxId', cleaningBox)
      this.selectChange()
    },
    selectChange() {
      this.$set(this.conditions, 'pageNo', 1)
      this.listLoading = true
      api.getCleanTask(this.conditions).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          this.tableData = response.data.page.records
          this.totalCount = response.data.page.totalCount
          this.listLoading = false
        }
      })
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
}
.dialog-content {
  text-align: center;
}
.dialog-cleaningBox {
  font-size: 24px;
  line-height: 31px;
  margin-top: 22px;
}
.dialog-code {
  font-size: 14px;
  color: rgba(153, 153, 153, 1);
  line-height: 19px;
  margin-top: 11px;
  margin-bottom: 58px;
}
.dialog-main {
  height: 420px;
}
</style>
