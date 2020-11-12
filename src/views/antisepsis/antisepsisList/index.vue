<template>
  <div style="padding:30px">
    <!-- header -->
    <myfilters
      title="任务列表"
      :content="content"
      :search-content="true"
      :choose-date="true"
      :print-button="true"
      placeholder="包名称/包编号"
      @printClick="print"
      @contentChange="contentChange"
      @dateChange="dateChange"
    >
      <template slot="header-extent">
        <el-select v-model="equipment" placeholder="请选择灭菌设备" @change="equipmentChange(equipment)">
          <el-option
            v-for="item in equipmentOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
    </myfilters>
    <!-- header end -->
    <!-- table -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100px" />
      <el-table-column label="灭菌设备" prop="equipment" width="250px" />
      <el-table-column label="包数量" prop="count" width="150px" />
      <el-table-column label="装载人/时间">
        <template slot-scope="scope">
          <div>
            {{ scope.row.loadingPerson }}
            <br>
            <span class="second-row">{{ scope.row.loadingTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div :class="stateColor(scope.row.state)">
            <i :class="stateIcon(scope.row.state)" />
            {{ state(scope.row) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="150">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.state==='1'"
            icon="el-icon-tickets"
            size="mini"
            style="margin-right:5px"
            @click="handleShow(scope.$index, scope.row)"
          >质量监测</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <!-- 标签打印弹出框 -->
    <el-dialog title="器械包标签打印" :visible.sync="printShow" width="95%">
      <div class="dialog-main">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="dialog-main-box">
              <div class="box-title">请选择器械包</div>
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
                <el-scrollbar style="height:420px;background: #fff">
                  <!-- table body -->
                  <el-table :data="tableData" style="width: 100%" :show-header="false">
                    <el-table-column align="center" width="100">
                      <template slot-scope="scope">
                        <el-radio
                          v-model="equipmentName"
                          :label="scope.row.equipment"
                          class="hidden-radio"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column prop="equipment" align="center" />
                    <el-table-column prop="furnaceTime" align="center" width="150" />
                    <el-table-column prop="count" align="center" />
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
              <el-form ref="form" :model="form" label-width="80px">
                <el-row type="flex" justify="space-between">
                  <el-col :span="11">
                    <el-form-item label="打印数量">
                      <el-input v-model="form.count" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="标签样式">
                      <el-select v-model="form.style" placeholder="请选择标签样式">
                        <el-option label="模板样式1" value="模板样式1" />
                        <el-option label="模板样式2" value="模板样式2" />
                        <el-option label="模板样式3" value="模板样式3" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row type="flex" justify="space-between">
                  <el-col :span="11">
                    <el-form-item label="灭菌人">
                      <el-select v-model="form.antisepsisPerson" placeholder="请选择灭菌人">
                        <el-option label="李丽丽" value="李丽丽" />
                        <el-option label="张美丽" value="张美丽" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="有效天数">
                      <el-select v-model="form.validDay" placeholder="请选择有效天数">
                        <el-option label="30天" value="30" />
                        <el-option label="15天" value="15" />
                        <el-option label="7天" value="7" />
                        <el-option label="1天" value="1" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <!-- form end -->
              <!-- 标签预览 -->
              <el-row>
                <el-col :span="6">
                  <div class="label-title">标签预览</div>
                </el-col>
                <el-col :span="18">
                  <div class="label-box">
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <div class="label-box-title-top1">灭菌有效天数</div>
                        <div class="label-box-title-top3">{{ form.validDay }}<span>天</span></div>
                        <div class="label-box-title-top2">灭菌日期：{{ getDate() }}</div>
                        <div class="label-box-title-top2">失效日期：{{ getEndDate(form.validDay) }}</div>
                      </el-col>
                      <el-col :span="12">
                        <img class="label-box-img" src="@/assets/images/erwm.png">
                      </el-col>
                    </el-row>
                    <div class="label-box-bottom">
                      <el-row>
                        <div class="label-box-bottom-title">{{ equipmentName }}</div>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <div class="label-box-bottom-content">炉次: {{ showTime(form.furnaceTime) }}</div>
                        </el-col>
                        <el-col :span="12">
                          <div class="label-box-bottom-content">灭菌人: {{ form.antisepsisPerson }}</div>
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
        <el-button type="primary" @click="printSubmit">确定打印</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import { format } from '@/utils/index'

export default {
  components: {
    myfilters
  },
  data() {
    return {
      equipment: '请选择灭菌设备',
      equipmentName: '灭菌设备012',
      row: [],
      printShow: false, // 弹出框
      // table data
      tableData: [
        {
          equipment: '灭菌设备012',
          count: 20,
          loadingPerson: '赵美丽',
          loadingTime: '2020.08.10 09:45:32',
          state: '2',
          antisepsisTime: '',
          furnaceTime: 2
        },
        {
          equipment: '灭菌设备014',
          count: 20,
          loadingPerson: '赵美丽',
          loadingTime: '2020.08.10 09:45:32',
          state: '3',
          antisepsisTime: '00.37',
          furnaceTime: 6
        },
        {
          equipment: '灭菌设备010',
          count: 20,
          loadingPerson: '赵美丽',
          loadingTime: '2020.08.10 09:45:32',
          state: '1',
          antisepsisTime: '',
          furnaceTime: 6
        }
      ],
      // 设备选项
      equipmentOptions: [
        {
          value: '灭菌设备010',
          label: '灭菌设备010'
        },
        {
          value: '灭菌设备011',
          label: '灭菌设备011'
        },
        {
          value: '灭菌设备012',
          label: '灭菌设备012'
        },
        {
          value: '灭菌设备015',
          label: '灭菌设备015'
        },
        {
          value: '灭菌设备021',
          label: '灭菌设备021'
        },
        {
          value: '灭菌设备026',
          label: '灭菌设备026'
        },
        {
          value: '灭菌设备031',
          label: '灭菌设备031'
        }
      ],
      form: {}
    }
  },
  computed: {
    // table data length
    content() {
      return '共' + this.tableData.length + '条数据'
    }
  },
  watch: {
    // 检测灭菌设备选项改变
    equipmentName: {
      handler(newValue, oldValue) {
        this.tableData.forEach(element => {
          if (element.equipment === this.equipmentName) {
            this.form.count = element.count
            this.form.furnaceTime = element.furnaceTime
          }
        })
      }
    }
  },
  methods: {
    // 状态标签文字
    state(row) {
      const stateMap = {
        '1': '灭菌完成',
        '2': '等待灭菌',
        '3': '正在灭菌 ' + row.antisepsisTime
      }
      return stateMap[row.state]
    },
    // 状态标签图标
    stateIcon(state) {
      const stateMap = {
        '1': 'el-icon-success',
        '2': 'el-icon-time',
        '3': 'icon-miejun iconfont'
      }
      return stateMap[state]
    },
    // 状态标签颜色
    stateColor(state) {
      const stateMap = {
        '1': 'success-color',
        '2': 'base-color',
        '3': 'green-color'
      }
      return stateMap[state]
    },
    // 标签打印按钮点击
    print() {
      this.printShow = true
      this.form = {
        furnaceTime: 2,
        style: '模板样式1',
        count: 20,
        validDay: '30',
        antisepsisPerson: '李丽丽'
      }
    },
    // 输入框改变
    contentChange(content) {
      console.log(content)
    },
    // 确定打印
    printSubmit() {
      this.printShow = false
      this.$message({
        message: '打印成功',
        type: 'success'
      })
    },
    // 获得当前时间
    getDate() {
      return format('yyyy.MM.dd')
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
      const endDateStr = endDateObj.getFullYear() + '.' + month + '.' + day
      return endDateStr
    },
    // 显示炉次
    showTime(antisepsisTime) {
      return antisepsisTime > 9 ? antisepsisTime : '0' + antisepsisTime
    },
    // 设备选择改变
    equipmentChange(equipment) {
      console.log(equipment)
    },
    // 日期选择改变
    dateChange(date) {
      console.log(date)
    },
    // 质量检测点击
    handleShow(index, row) {
      this.$router.push('/antisepsis/qualityTest')
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.green-color,
.green-color:hover {
  color: #40c9c6;
}
::v-deep .hidden-table .el-table__body-wrapper {
  display: none;
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
}
::v-deep .hidden-radio .el-radio__label {
  display: none;
}
.label-title {
  font-size: 18px;
  color: #999;
}
.label-box {
  width: 464px;
  height: 344px;
  background-color: #fff;
  border-radius: 1px;
  color: black;
  border: 1px solid rgba(171, 171, 171, 1);
  .label-box-title-top1 {
    font-size:20px;
    line-height:26px;
    margin: 20px 0 0 20px;
  }
  .label-box-title-top2 {
    font-size:18px;
    line-height:24px;
    margin: 3px 0 0 20px;
  }
  .label-box-title-top3 {
    font-size: 80px;
    line-height: 106px;
    margin-left: 20px;
    span{
    position: relative;
    bottom: 10px;
    font-size:30px;
    line-height:40px;
    margin-left: 10px;
    }
  }
  .label-box-img {
    float: right;
    height: 180px;
    margin-top: 20px;
    margin-right: 20px;
    border: 1px solid rgba(155, 155, 155, 1);
  }
  .label-box-bottom {
    margin-top: 10px;
    height: 128px;
    padding-top: 9px;
    background: rgba(246, 246, 246, 1);
    .label-box-bottom-title {
      padding: 10px 0 0 20px;
      font-size:30px;
      line-height:42px;
    }
    .label-box-bottom-content {
      padding-top: 5px;
      font-size:26px;
      color: #666;
      padding-left: 20px;
      line-height: 42px;
    }
  }
}
</style>
