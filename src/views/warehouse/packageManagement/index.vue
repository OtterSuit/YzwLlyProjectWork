<template>
  <div style="padding:30px">
    <!-- header -->
    <myfilters
      title="包管理"
      :content="content"
      :choose-states="true"
      :search-content="true"
      :add-button="true"
      button-type="success"
      :print-button="true"
      placeholder="包名称/包编号"
      addifo="入库"
      add-icon="el-icon-circle-plus-outline"
      @statesChange="statesChange"
      @contentChange="contentChange"
      @addClick="instorageClick"
      @printClick="printClick"
    >
      <template slot="tail-extent">
        <el-button type="goon" icon="el-icon-circle-plus-outline" @click="newpackageClick">创建新包</el-button>
      </template>
    </myfilters>
    <!-- header end -->
    <!-- table -->

    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        label="序号"
        type="index"
        width="100"
      />
      <el-table-column label="包编码" prop="packageCoding" />
      <el-table-column label="包名称" prop="packageName" width="300px" />
      <el-table-column label="总数量" prop="totalCount" />
      <el-table-column label="库存" prop="inventory" />
      <el-table-column label="下架" prop="offShelve" />
      <el-table-column label="出库" prop="outstorage" />\
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
                  action: 'packageShow'
                }"
              >查看</el-dropdown-item>
              <el-dropdown-item
                :disabled="checkInventory(scope.$index, scope.row)"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleOffShelve'
                }"
              >全部下架</el-dropdown-item>
              <el-dropdown-item
                :disabled="checkOffShelve(scope.$index, scope.row)"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleInventory'
                }"
              >全部上架</el-dropdown-item>
              <el-dropdown-item
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleInvalid'
                }"
              >作废</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- 下拉框结束 -->
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
                <el-table :data="printerData" style="width: 100%" class="hidden-table">
                  <el-table-column label="选择" align="center" width="100" />
                  <el-table-column label="包名称" width="200" />
                  <el-table-column label="数量" />
                </el-table>
                <!-- table header end -->
                <!-- scrollbar -->
                <el-scrollbar style="height:420px;background: #fff">
                  <!-- table body -->
                  <el-table :data="printerData" style="width: 100%" :show-header="false">
                    <el-table-column align="center" width="100">
                      <template slot-scope="scope">
                        <el-radio
                          v-model="packageName"
                          :label="scope.row.packageName"
                          class="hidden-radio"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column prop="packageName" width="200" />
                    <el-table-column prop="totalCount" />
                  </el-table>
                  <!-- table body end -->
                </el-scrollbar>
                <!-- scrollbar -->
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="dialog-main-box">
              <div class="box-title">选择标签模板</div>
              <!-- form -->
              <el-form ref="printForm" :model="printForm" label-width="80px">
                <el-row type="flex" justify="space-between">
                  <el-col :span="11">
                    <el-form-item label="打印数量">
                      <el-input v-model="printForm.totalCount" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="标签样式">
                      <el-select v-model="printForm.style" placeholder="请选择标签样式">
                        <el-option label="模板样式1" value="模板样式1" />
                        <el-option label="模板样式2" value="模板样式2" />
                        <el-option label="模板样式3" value="模板样式3" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <!-- form end -->
              <br>
              <!-- 标签预览 -->
              <el-row>
                <el-col :span="5">
                  <div class="label-title">标签预览</div>
                </el-col>
                <el-col :span="18">
                  <div class="label-box">
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <div class="label-box-title-top1">{{ printForm.packageName }}</div>
                        <div class="label-box-title-top2">{{ printForm.packageCoding }}</div>
                      </el-col>
                      <el-col :span="12">
                        <img class="label-box-img" src="@/assets/images/erwm.png">
                      </el-col>
                    </el-row>
                    <div class="label-box-bottom">
                      <div class="label-box-bottom-content">灭菌日期：{{ getDate() }}</div>
                      <div class="label-box-bottom-content">失效日期：{{ getEndDate() }}</div>
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
    <!-- 标签打印弹出框结束 -->
    <!-- 入库弹出框 -->
    <el-dialog v-el-drag-dialog :visible.sync="show" width="95%">
      <template slot="title">
        <span style="font-size:18px">{{ dialogTitle }}</span>
        <span class="tinytitle">请扫描需要{{ dialogTitle }}的器械包条码</span>
      </template>
      <div class="dialog-box">
        <!-- table header -->
        <el-table :data="dialogData" style="100%" class="hidden-table">
          <el-table-column label="序号" width="150px" />
          <el-table-column label="包编码" width="260px" />
          <el-table-column label="包名称" />
        </el-table>
        <!-- table header end -->
        <!-- scrollbar -->
        <el-scrollbar style="height:480px;background: #fff">
          <div style="width:390px; margin:15px 150px">
            <el-input v-model="dialogCoding" placeholder="请输入或扫描包编码" />
          </div>
          <!-- table body -->
          <el-table :data="dialogData" style="100%" :show-header="false">
            <el-table-column type="index" width="150px" />
            <el-table-column prop="packageCoding" width="260px" />
            <el-table-column prop="packageName" />
            <el-table-column width="100px">
              <template slot-scope="scope">
                <i
                  class="el-icon-delete base-color delete-icon"
                  @click="handleDelete(scope.$index,scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
          <!-- table body end -->
        </el-scrollbar>
        <!-- scrollbar end -->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="bgc" @click="show=false">取消</el-button>
        <el-button type="primary" @click="handleSign()">确定{{ dialogTitle }}</el-button>
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
      dialogTitle: '',
      printShow: false, // 标签打印弹出框
      show: false, // 入库弹出框
      row: [],
      packageName: '糖足包',
      printForm: {},
      dialogCoding: '', // 扫码输入编码
      // 入库数据
      dialogData: [
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        },
        {
          packageCoding: 10001,
          packageName: '糖足包 '
        }
      ],
      // table data
      tableData: [
        {
          packageCoding: 10001,
          packageName: '糖足包',
          totalCount: 50,
          inventory: 40,
          offShelve: 2,
          outstorage: 8,
          state: '1'
        },
        {
          packageCoding: 10001,
          packageName: '糖足包',
          totalCount: 50,
          inventory: 0,
          offShelve: 42,
          outstorage: 8,
          state: '2'
        },
        {
          packageCoding: 10002,
          packageName: '糖足剪',
          totalCount: 50,
          inventory: 50,
          offShelve: 0,
          outstorage: 0,
          state: '1'
        },
        {
          packageCoding: 10003,
          packageName: '脐穿包',
          totalCount: 50,
          inventory: 10,
          offShelve: 0,
          outstorage: 40,
          state: '1'
        },
        {
          packageCoding: 10004,
          packageName: '神一脑室引流包',
          totalCount: 50,
          inventory: 32,
          offShelve: 0,
          outstorage: 18,
          state: '1'
        },
        {
          packageCoding: 10005,
          packageName: '血透室缝合包',
          totalCount: 50,
          inventory: 45,
          offShelve: 0,
          outstorage: 5,
          state: '1'
        }
      ],
      // 标签打印数据
      printerData: ''
    }
  },
  computed: {
    // table data length
    content() {
      return '共' + this.tableData.length + '条数据'
    }
  },
  watch: {
    // 监测器械包选项改变
    packageName: {
      handler(newValue, oldValue) {
        this.tableData.forEach(element => {
          if (element.packageName === this.packageName) {
            this.printForm.totalCount = element.totalCount
            this.printForm.packageCoding = element.packageCoding
            this.printForm.packageName = element.packageName
          }
        })
      }
    }
  },
  methods: {
    // 获取当前时间
    getDate() {
      return format('yyyy.MM.dd')
    },
    // 获取结束时间
    getEndDate() {
      const nowDateObj = new Date()
      const nowTimeStem = nowDateObj.getTime()
      const endTimeStem = nowTimeStem + 24 * 60 * 60 * 1000 * 10
      const endDateObj = new Date(endTimeStem)
      let month = endDateObj.getMonth() + 1
      month = month > 9 ? month : '0' + month
      let day = endDateObj.getDate()
      day = day > 9 ? day : '0' + day
      const endDateStr = endDateObj.getFullYear() + '.' + month + '.' + day
      return endDateStr
    },
    // 状态标签文字
    state(state) {
      const stateMap = {
        '1': '正常',
        '2': '已作废'
      }
      return stateMap[state]
    },
    // 状态标签图标
    stateIcon(state) {
      const stateMap = {
        '1': '',
        '2': 'el-icon-warning'
      }
      return stateMap[state]
    },
    // 状态标签颜色
    stateColor(state) {
      const stateMap = {
        '1': '',
        '2': 'error-color'
      }
      return stateMap[state]
    },
    // 状态标签背景颜色
    stateBgColor(state) {
      const stateMap = {
        '1': '',
        '2': 'error-bg-color'
      }
      return stateMap[state]
    },
    // 控制表行的颜色
    tableRowClassName({ row, rowIndex }) {
      return this.stateBgColor(row.state)
    },
    // 入库按钮点击
    instorageClick(index, row) {
      this.row = row
      this.show = true
      this.dialogTitle = '入库'
    },
    // 控制下拉框点击
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    // 控制作废选择
    handleInvalid(index, row) {
      row.state = '2'
      this.$message({
        message: '作废成功',
        type: 'success'
      })
    },
    // 控制删除
    handleDelete(index, row) {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.dialogData.splice(index, 1)
    },
    // 控制弹出框提交
    handleSign() {
      this.$message({
        message: this.dialogTitle + '成功',
        type: 'success'
      })
      this.show = false
    },
    // 检查是否可上架
    checkInventory(index, row) {
      return row.inventory === 0 || row.state === '2'
    },
    // 检查是否可下架
    checkOffShelve(index, row) {
      return row.offShelve === 0 || row.state === '2'
    },
    // 全部上架
    handleInventory(index, row) {
      row.inventory += row.offShelve
      row.offShelve = 0
      this.$message({
        message: '上架成功',
        type: 'success'
      })
    },
    // 全部下架
    handleOffShelve(index, row) {
      row.offShelve += row.inventory
      row.inventory = 0
      this.$message({
        message: '下架成功',
        type: 'success'
      })
    },
    // 查看点击
    packageShow(index, row) {
      this.$router.push({ name: 'ShowPackage' })
    },
    // 确定打印点击
    printSubmit() {
      this.$message({
        message: '打印完成',
        type: 'success'
      })
      this.printShow = false
    },
    // 标签打印点击
    printClick() {
      this.printShow = true
      this.printerData = [...this.tableData]
      for (let i = 0; i < this.printerData.length; i++) {
        if (this.printerData[i].state === '2') {
          this.printerData.splice(i, 1)
          i--
        }
      }
      this.printForm = {
        style: '模板样式1',
        totalCount: 50,
        packageName: '糖足包',
        packageCoding: 10001
      }
    },
    // 创建新包点击
    newpackageClick() {
      this.$router.push({ name: 'NewPackage' })
    },
    statesChange(state) {
      console.log(state)
    },
    contentChange(content) {
      console.log(content)
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
::v-deep .el-table .cell {
  height: 30px;
  line-height: 30px;
}
::v-deep .el-table td{
  padding: 15px 0;
}
.dialog-box{
  margin: 20px;
  border:1px solid rgba(216,216,216,1);
}
::v-deep .hidden-table .el-table__body-wrapper {
  display: none;
}
.el-dropdown-menu__item {
  padding: 0 20px;
  text-align: left;
  width: 110px;
}
.tinytitle{
  font-size: 14px;
  color: #FF4C4C;
  margin-left:15px ;
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
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 16px;
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
    font-size: 26px;
    line-height: 40px;
    margin: 30px 0 20px 20px;
  }
  .label-box-title-top2 {
    font-size: 47px;
    line-height: 66px;
    margin-left: 20px;
  }
  .label-box-img {
    float: right;
    height: 200px;
    margin-top: 20px;
    margin-right: 20px;
    border: 1px solid rgba(155, 155, 155, 1);
  }
  .label-box-bottom {
    margin-top: 20px;
    height: 102px;
    padding-top: 9px;
    background: rgba(246, 246, 246, 1);
    .label-box-bottom-content {
      font-size: 24px;
      color: #666;
      text-align: center;
      line-height: 42px;
    }
  }
}
.delete-icon {
  font-size: 20px;
  cursor: pointer;
  margin-right: 20px;
}
.el-button--goon:focus,
.el-button--goon:hover {
  background: #48D1CC;
  border-color: #48D1CC;
  color: #fff;
}
.el-button--goon:active {
  background-color: #39adab;
  border-color: #39adab;
  color: #fff;
}
.el-button--goon {
  color: #fff;
  background-color: #40C9C6;
  border-color: #40C9C6;
}
</style>
