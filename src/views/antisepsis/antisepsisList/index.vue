<template>
  <div style="padding:30px">
    <!-- header -->
    <myfilters
      title="任务列表"
      :content="content"
      :search-content="true"
      :choose-date="true"
      :print-button="true"
      placeholder="装载人"
      @printClick="print"
      @contentChange="contentChange"
      @dateChange="dateChange"
    >
      <template slot="header-extent">
        <el-col :span="6">
          <el-select v-model="equipment" placeholder="请选择灭菌设备" clearable @change="equipmentChange(equipment)">
            <el-option
              v-for="(item,key) in equipmentOptions"
              :key="key"
              :label="item"
              :value="key"
            />
          </el-select>
        </el-col>
      </template>
    </myfilters>
    <!-- header end -->
    <!-- table -->
    <el-table v-loading="listLoading" :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100px" />
      <el-table-column label="灭菌设备" prop="boxName" />
      <el-table-column label="炉号" prop="code" />
      <el-table-column label="炉次" prop="batchNoDay" />
      <el-table-column label="包数量" prop="loadCount" />
      <el-table-column label="装载人/时间">
        <template slot-scope="scope">
          <div>
            {{ scope.row.loadUser }}
            <br>
            <span class="second-row">{{ scope.row.loadEndTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div :class="stateColor(scope.row.status)">
            <i :class="stateIcon(scope.row.status)" />
            {{ ssd_sterilization_task_status[scope.row.status] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status==='4' && scope.row.expectedTime!==null"
            type="primary"
            icon="el-icon-tickets"
            size="mini"
            @click="startAnti(scope.$index, scope.row)"
          >开始灭菌</el-button>
          <el-button
            v-if="scope.row.status==='5'"
            :loading="buttonLoading"
            type="primary"
            icon="el-icon-tickets"
            size="mini"
            @click="endAnti(scope.$index, scope.row)"
          >结束灭菌</el-button>
          <el-button
            v-if="scope.row.status==='6'"
            icon="el-icon-tickets"
            size="mini"
            @click="handleShow(scope.$index, scope.row)"
          >质量监测</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <my-pagination :total="totalCount" methods="toShowAntisepsis" :conditions="conditions" :records="['data','page','records']" />
    <!-- 标签打印弹出框 -->
    <el-dialog title="器械包标签打印" :visible.sync="printShow" width="95%">
      <div class="dialog-main">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="dialog-main-box">
              <div class="box-title">请选择灭菌任务</div>
              <div style="height:470px">
                <!-- table header -->
                <el-table :data="tableData" style="width: 100%" class="hidden-table">
                  <el-table-column label="选择" align="center" width="100" />
                  <el-table-column label="包灭菌设备" align="center" />
                  <el-table-column label="炉次" align="center" width="150" />
                  <el-table-column label="包数量" align="center" />
                </el-table>
                <!-- table header end -->
                <!-- scrollbar -->
                <el-scrollbar class="scrollbar">
                  <!-- table body -->
                  <el-table :data="tableData" style="width: 100%" :show-header="false">
                    <el-table-column align="center" width="100">
                      <template slot-scope="scope">
                        <el-radio
                          v-model="id"
                          :label="scope.row.id"
                          class="hidden-radio"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column prop="boxName" align="center" />
                    <el-table-column prop="batchNoDay" align="center" width="150" />
                    <el-table-column prop="loadCount" align="center" />
                  </el-table>
                  <!-- table body end -->
                </el-scrollbar>
                <!-- scrollbar end -->
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="dialog-main-box">
              <div class="box-title">设置标签</div>
              <!-- form -->
              <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <el-row type="flex" justify="space-between">
                  <el-col :span="11">
                    <el-form-item
                      label="打印数量"
                      prop="loadCount"
                    >
                      <el-input-number
                        v-model="form.loadCount"
                        controls-position="right"
                        :min="1"
                        :disabled="id===null"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="有效天数">
                      <el-select v-model="form.validNum" placeholder="请选择有效天数">
                        <el-option
                          v-for="(value,key) in validDayOptions"
                          :key="key"
                          :label="value"
                          :value="key"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <!-- form end -->
              <!-- 标签预览 -->
              <el-row>
                <el-col :span="7">
                  <div class="label-title">标签预览</div>
                </el-col>
                <el-col :span="17">
                  <div class="label-box">
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <div class="label-box-title-top1">灭菌有效天数</div>
                        <div class="label-box-title-top3">{{ form.validNum }}<span>天</span></div>
                        <div class="label-box-title-top2">灭菌日期：{{ getDate() }}</div>
                        <div class="label-box-title-top2">失效日期：{{ getEndDate(form.validNum) }}</div>
                      </el-col>
                      <el-col :span="12">
                        <MyQrcode text="灭菌标签打印" class="erwm-img" :size="180" />
                      </el-col>
                    </el-row>
                    <div class="label-box-bottom">
                      <el-row>
                        <div class="label-box-bottom-title">{{ form.boxName }}</div>
                      </el-row>
                      <el-row>
                        <el-col :span="9">
                          <div class="label-box-bottom-content">炉次: {{ form.batchNoDay }}</div>
                        </el-col>
                        <el-col :span="14">
                          <div class="label-box-bottom-content">灭菌人: {{ name }}</div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <!-- 标签预览结束 -->
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="bgc" @click="printShow=false">取消</el-button>
        <el-button type="primary" :loading="buttonLoading" @click="printSubmit">确定打印</el-button>
      </div>
    </el-dialog>
    <!-- 开始灭菌弹窗 -->
    <el-dialog v-el-drag-dialog title="开始灭菌" :visible.sync="dialogShow" width="800px">
      <div class="dialog-main">
        <div class="dialog-antiBox dialog-content">{{ row.boxName }}</div>
        <div class="dialog-code dialog-content">{{ row.code }}</div>
        <el-form ref="programForm" :model="programForm" label-width="70px" :rules="rules">
          <el-row type="flex" justify="space-between">
            <el-col :span="18" :offset="3">
              <el-form-item label="灭菌程序" prop="antiProgram">
                <el-select v-model="programForm.antiProgram" placeholder>
                  <el-option
                    v-for="(val, key) in STERILIZE_PROGRAM"
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
        <el-button type="bgc" @click="dialogShow=false">取消</el-button>
        <el-button type="primary" :loading="buttonLoading" @click="antiSubmit">确认</el-button>
      </div>
    </el-dialog>
    <!-- 开始灭菌弹窗 -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex' // 获取vuex的name
import myfilters from '@/components/myfilters'
import myPagination from '@/components/MyPagination'
import MyQrcode from '@/components/MyQrcode'
import { format } from '@/utils/index'
import api from '@/api'

export default {
  components: {
    myfilters, MyQrcode, myPagination
  },

  data() {
    return {
      listLoading: true,
      buttonLoading: false,
      printShow: false, // 弹出框
      id: null, // 记录radio选择
      row: [],
      equipment: '', // 记录选择的灭菌设备
      rules: {
        antiProgram: [
          { required: true, message: '请选择灭菌程序', trigger: ['blur', 'change'] }
        ],
        loadCount: [
          { required: true, message: '请输入打印数量' },
          { type: 'number', message: '请输入数字' }
        ]
      },
      tableData: [], // table data
      ssd_sterilization_task_status: [],
      form: { }, // 打印表单
      // 设备选项
      equipmentOptions: [], // 设备选项
      validDayOptions: {}, // 有效天数
      totalCount: 0,
      conditions: {
        statuses: ['4', '5', '6'],
        keyword: null,
        boxId: null,
        loadStartTimeOneDay: null
      },
      printIndex: null, // 要打印的index
      programForm: { antiProgram: null }, // 灭菌设备选择提交
      dialogShow: false, // dialog show
      STERILIZE_PROGRAM: null
    }
  },
  computed: {
    // 总数据量
    content() {
      return '共' + this.totalCount + '条数据'
    },
    // 获取vuex里的name
    ...mapGetters([
      'name'
    ])
  },
  watch: {
    // 检测灭菌设备选项改变
    id: {
      handler(newValue, oldValue) {
        let printIndex = 0
        this.tableData.forEach(element => {
          if (element.id === this.id) {
            this.form.id = this.id
            this.printIndex = printIndex
            this.form = JSON.parse(JSON.stringify(this.tableData[printIndex]))
            this.$set(this.form, 'validNum', Object.keys(this.validDayOptions)[0])
          }
          printIndex++
        })
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取数据
    fetchData() {
      // 获取有效天数和消毒设备
      api.toconstanttypeBatch({
        constantCodes: [
          'STERILIZE_BOX',
          'VALID_PERIOD',
          'STERILIZE_PROGRAM'
        ]
      }).then(response => {
        this.equipmentOptions = response.data.constantsDetail.STERILIZE_BOX // 获取设备选项
        // 筛选有效天数,读取数字
        Object.values(response.data.constantsDetail.VALID_PERIOD).forEach(item => {
          this.validDayOptions[item.replace(/[^0-9]/ig, '')] = item
        })
        this.STERILIZE_PROGRAM = response.data.constantsDetail.STERILIZE_PROGRAM // 灭菌程序
      })
      this.listLoading = true
      // 4: "等待灭菌"  5: "灭菌中"  6: "灭菌结束"
      api.toShowAntisepsis({ statuses: ['4', '5', '6'] }).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.ssd_sterilization_task_status = response.data.dictData.ssd_sterilization_task_status // 获取任务状态
          this.tableData = response.data.page.records
          this.totalCount = response.data.page.totalCount
          // 如果没有数据,则标签打印也没有选项
          if (this.tableData.length !== 0) {
            this.id = this.tableData[0].id
          }
          this.listLoading = false
        }
      })
    },
    // 状态标签图标
    stateIcon(state) {
      const stateMap = {
        '4': 'el-icon-time',
        '5': 'icon-miejun iconfont',
        '6': 'el-icon-success'
      }
      return stateMap[state]
    },
    // 状态标签颜色
    stateColor(state) {
      const stateMap = {
        '4': 'base-color',
        '5': 'green-color',
        '6': 'success-color'
      }
      return stateMap[state]
    },
    // 开始灭菌->选择设备
    startAnti(index, row) {
      this.dialogShow = true
      this.row = row
    },
    // 开始灭菌提交
    antiSubmit() {
      this.$refs.programForm.validate(async valid => {
        if (valid) {
          // 如果有同种设备在灭菌,则阻止这次灭菌
          if (this.checkStart()) {
            this.dialogShow = false
            return this.$message({
              message: '灭菌设备正在灭菌,请待会重试',
              type: 'warning'
            })
          }
          this.buttonLoading = true
          // 开始灭菌
          api.toStartAnti({ id: this.row.id, programId: this.programForm.antiProgram }).then(response => {
            if (response.code === '200' && response.data.busiCode === '1') {
              this.row.status = '5'
              this.$message({
                message: '开始灭菌',
                type: 'success'
              })
              this.dialogShow = false
              this.buttonLoading = false
            }
          })
        } else {
          this.$message({
            message: '请按要求填写',
            type: 'warning'
          })
        }
      })
    },
    // 检测是否可以开始灭菌
    checkStart() {
      for (const item of this.tableData) {
        if (item.boxId === this.row.boxId && item.status === '5') {
          return true
        }
      }
      return false
    },
    // 结束灭菌
    endAnti(index, row) {
      this.buttonLoading = true
      // 结束灭菌
      api.toEndAnti({ id: row.id }).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          row.status = '6'
          this.$message({
            message: '结束灭菌',
            type: 'success'
          })
          this.buttonLoading = false
        }
      })
    },
    // 标签打印按钮点击
    print() {
      this.printShow = true
      // 如果没有数据,则不初始化打印表单
      if (this.tableData.length !== 0) {
        this.form = JSON.parse(JSON.stringify(this.tableData[0]))
      }
      this.$set(this.form, 'validNum', Object.keys(this.validDayOptions)[0])
    },
    // 确定打印
    printSubmit() {
      // 如果没有数据,则阻止打印
      if (this.id === null) {
        return this.$message({
          message: '暂无数据打印',
          type: 'error'
        })
      }
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 打印表单
          const printForm = {
            id: this.id,
            expectedTime: this.getEndDate(this.form.validNum),
            validNum: parseInt(this.form.validNum)
          }
          this.buttonLoading = true

          api.toPrintTag(printForm).then(response => {
            if (response.code === '200' && response.data.busiCode === '1') {
              // 标签内容
              const obj = {
                count: parseInt(this.form.loadCount),
                expectedTime: this.getEndDate(this.form.validNum),
                validNum: parseInt(this.form.validNum),
                equipment: this.form.boxName,
                batchNoDay: this.form.batchNoDay,
                antisepsisPerson: this.form.antisepsisPerson,
                id: this.form.id,
                name: this.name
              }
              const routeUrl = this.$router.resolve({
                path: '/print/antiPrint',
                query: {
                  title: '灭菌标签打印',
                  data: JSON.stringify(obj)
                }
              })
              window.open(routeUrl.href, '_blank')
              // 设置失效时间,即告知可以开始灭菌
              this.$set(this.tableData[this.printIndex], 'expectedTime', printForm.expectedTime)
              this.buttonLoading = false
              this.printShow = false
            }
          })
        } else {
          this.$message({
            message: '请按照要求填写',
            type: 'warning'
          })
        }
      })
    },
    // 获得当前时间
    getDate() {
      return format('yyyy-MM-dd')
    },
    // 获得结束时间
    getEndDate(validDay) {
      const nowDateObj = new Date()
      const nowTimeStem = nowDateObj.getTime()
      const endTimeStem = nowTimeStem + 24 * 60 * 60 * 1000 * validDay
      const endDateObj = new Date(endTimeStem)
      let month = endDateObj.getMonth() + 1
      month = month > 9 ? month : '0' + month
      let day = endDateObj.getDate()
      day = day > 9 ? day : '0' + day
      const endDateStr = endDateObj.getFullYear() + '-' + month + '-' + day
      return endDateStr
    },
    // 质量检测点击
    handleShow(index, row) {
      this.$router.push({
        name: 'QualityTest',
        query: { id: row.id }
      })
    },
    // 显示炉次
    showTime(antisepsisTime) {
      return antisepsisTime > 9 ? antisepsisTime : '0' + antisepsisTime
    },
    // 设备选择改变
    equipmentChange(equipment) {
      this.$set(this.conditions, 'boxId', equipment)
      this.selectChange()
    },
    // 输入框改变
    contentChange(content) {
      this.$set(this.conditions, 'keyword', content)
      this.selectChange()
    },
    // 日期选择改变
    dateChange(date) {
      this.$set(this.conditions, 'loadStartTimeOneDay', date)
      this.selectChange()
    },
    selectChange() {
      this.$set(this.conditions, 'pageNo', 1)
      this.listLoading = true
      api.toShowAntisepsis(this.conditions).then(response => {
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
.green-color,
.green-color:hover {
  color: #40c9c6;
}

::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
.dialog-main-box {
  position: relative;
  height: 550px;
  background: rgba(246, 246, 246, 1);
  border: 1px dotted rgba(175, 179, 192, 1);
  padding: 20px 25px;
  .box-title {
    color: #000000;
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 20px;
  }
  .scrollbar {
    height:420px;
    background: #fff
  }
}
::v-deep .hidden-radio .el-radio__label {
  display: none;
}
.label-title {
  font-size: 18px;
  color: #999;
}
.label-box {
  width: 29vw;
  background-color: #fff;
  border-radius: 1px;
  color: black;
  border: 1px solid rgba(171, 171, 171, 1);
  .label-box-title-top1 {
    font-size:1.3vw;
    line-height:26px;
    margin: 20px 0 0 20px;
  }
  .label-box-title-top2 {
    font-size:1.1vw;
    line-height:24px;
    margin: 3px 0 0 20px;
  }
  .label-box-title-top3 {
    font-size: 5.2vw;
    line-height: 7vw;
    margin-left: 20px;
    span{
    position: relative;
    bottom: 10px;
    font-size:30px;
    line-height:40px;
    margin-left: 10px;
    }
  }
  .erwm-img {
    margin-top: 20px;
    padding: 10px;
    float: left;
    height: 200px;
    border: 1px solid rgba(155, 155, 155, 1);
  }
  .label-box-bottom {
    height: 128px;
    padding-top: 9px;
    background: #f6f6f6;
    .label-box-bottom-title {
      padding: 10px 0 0 20px;
      font-size:2vw;
      line-height:42px;
    }
    .label-box-bottom-content {
      padding-top: 5px;
      font-size:1.6vw;
      color: #666;
      padding-left: 20px;
      line-height: 42px;
    }
  }
}
::v-deep.dialog-main{
  padding: 30px 20px;
}
.dialog-content {
  text-align: center;
}
.dialog-antiBox {
  font-size: 24px;
  line-height: 31px;
  margin-top: 22px;
}
.dialog-code {
  font-size: 14px;
  color: rgba(153, 153, 153, 1);
  line-height: 19px;
  margin-top: 11px;
  margin-bottom: 40px;
}
</style>
