<template>
  <div style="padding:30px">
    <!-- header -->
    <myfilters
      title="包管理"
      :content="content"
      :search-content="true"
      :add-button="true"
      button-type="success"
      :print-button="true"
      placeholder="包名称/包编号"
      addifo="新包入库"
      @contentChange="contentChange"
      @addClick="instorageClick"
      @printClick="printClick"
    >
      <!-- <template slot="tail-extent">
        <el-button type="goon" icon="el-icon-circle-plus-outline" @click="newpackageClick">创建新包</el-button>
      </template>-->
    </myfilters>
    <!-- header end -->
    <!-- table -->
    <el-table v-loading="listLoading" :data="tableData" style="width: 100%">
      <!-- :row-class-name="tableRowClassName" -->
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column label="包编码" prop="code" width="200px" />
      <el-table-column label="包名称" prop="name" width="200px" />
      <el-table-column label="总数量" prop="totalCount" />
      <el-table-column label="库存">
        <template slot-scope="scope">{{ storageCount(scope.$index,scope.row) }}</template>
      </el-table-column>
      <el-table-column label="上架" prop="publishCount" />
      <el-table-column label="下架" prop="nopublishCount" />
      <el-table-column label="待灭菌" prop="waitSterilizeCount" />
      <el-table-column label="出库" prop="outCount" />
      <el-table-column align="right">
        <template slot-scope="scope">
          <!-- 下拉框 -->
          <el-dropdown trigger="click" class="dropdown" @command="handleCommand">
            <span class="el-dropdown-link">
              <el-button size="mini" icon="el-icon-s-tools">
                操作
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
              <!-- <el-dropdown-item
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleInvalid'
                }"
              >作废</el-dropdown-item>-->
            </el-dropdown-menu>
          </el-dropdown>
          <!-- 下拉框结束 -->
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <!-- 底部分页 -->
    <my-pagination :total="totalCount" methods="topacketDefine" :conditions="conditions" />
    <!-- 底部分页结束 -->
    <!-- 标签打印弹出框 -->
    <el-dialog title="器械包标签打印" :visible.sync="printShow" width="95%">
      <div class="dialog-main">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="dialog-main-box">
              <div class="box-title">请选择器械包</div>
              <el-row>
                <el-col :span="11">
                  <el-input v-model="packetConditions.keyword" class="search-input" placeholder="物品名称/编码" @keyup.enter.native="packetChange" />
                  <el-button icon="el-icon-search" type="primary" @click="packetChange">搜索</el-button>
                </el-col>
                <el-col :span="11">
                  <my-pagination :background="true" :total="printCount" methods="topacketPage" :table-data="['$parent','$parent','$parent','$parent','$parent','printerData']" :page-size="7" :conditions="packetConditions" />
                </el-col>
              </el-row>
              <div>
                <!-- table header -->
                <el-table :data="printerData" style="width: 100%" class="hidden-table">
                  <el-table-column label="选择" width="100" align="center" />
                  <el-table-column label="包编码" />
                  <el-table-column label="包名称" />
                  <!-- <el-table-column label="数量" /> -->
                </el-table>
                <!-- table header end -->
                <!-- scrollbar -->
                <el-scrollbar style="height:378px;background: #fff">
                  <!-- table body -->
                  <el-table :data="printerData" style="width: 100%" :show-header="false">
                    <el-table-column width="100" align="center">
                      <template slot-scope="scope">
                        <el-radio v-model="name" :label="scope.row.name" class="hidden-radio" />
                      </template>
                    </el-table-column>
                    <el-table-column prop="serialNumber" />
                    <el-table-column prop="name" />
                    <!-- <el-table-column prop="totalCount" /> -->
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
              <el-form ref="printForm" :model="printForm" label-width="80px" :rules="rules">
                <el-row type="flex" justify="space-between">
                  <el-col :span="11">
                    <el-form-item label="打印数量" prop="totalCount">
                      <el-input-number
                        ref="countInputs"
                        v-model="printForm.totalCount"
                        controls-position="right"
                        :min="1"
                        @blur="getFocus"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="标签样式">
                      <el-select v-model="printForm.style" placeholder="请选择标签样式">
                        <el-option label="模板样式1" :value="1" />
                        <el-option label="模板样式2" :value="2" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <!-- form end -->
              <br>
              <!-- 标签预览 -->
              <el-row>
                <el-col :span="4">
                  <div class="label-title">标签预览</div>
                </el-col>
                <el-col :span="20">
                  <div v-show="printForm.style===1" class="label-main">
                    <div class="label-top">
                      <el-col :span="12">
                        <div class="packet-name">{{ printForm.name }}</div>
                        <div class="packet-code">{{ printForm.serialNumber }}</div>
                      </el-col>
                      <el-col :span="12" class="img-col">
                        <MyQrcode text="标签模板样式1" class="erwm-img" :size="180" />
                        <!-- <img :src="erwmURL" class="erwm-img"> -->
                      </el-col>
                    </div>
                    <div class="label-bottom">
                      <div class="packet-bottom">封包人： 示例姓名</div>
                      <div class="packet-bottom">封包日期: 2020.01.01</div>
                    </div>
                  </div>
                  <div v-show="printForm.style===2" class="label-main">
                    <div class="label-top">
                      <el-col :span="12" class="img-col">
                        <MyQrcode text="标签模板样式2" class="erwm-img" :size="180" />
                        <!-- <img :src="erwmURL" class="erwm-img"> -->
                      </el-col>
                      <el-col :span="12">
                        <div class="packet-name">{{ printForm.name }}</div>
                        <div class="packet-code">{{ printForm.serialNumber }}</div>
                      </el-col>
                    </div>
                    <div class="label-bottom">
                      <div class="packet-bottom">封包人： 示例姓名</div>
                      <div class="packet-bottom">封包日期: 2020.01.01</div>
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
        <el-scrollbar class="scrollbar">
          <div class="dialog-packet">
            <el-form ref="form" :model="form" :rules="rules" @submit.native.prevent>
              <el-form-item prop="id">
                <el-input
                  ref="inInputs"
                  v-model.trim="form.id"
                  type="tel"
                  placeholder="请输入或扫描包编码"
                  @blur="deliveryFocus"
                  @keyup.enter.native="getId()"
                  @input="checkLength"
                />
              </el-form-item>
            </el-form>
          </div>
          <!-- table body -->
          <el-table :data="dialogData" style="100%" :show-header="false">
            <el-table-column type="index" width="150px" />
            <el-table-column prop="id" width="260px" />
            <el-table-column prop="name" />
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
        <el-button type="primary" :loading="buttonLoading" @click="handleSign()">确定{{ dialogTitle }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import MyQrcode from '@/components/MyQrcode'
import myPagination from '@/components/MyPagination'
import { format } from '@/utils/index'
import api from '@/api'

export default {
  components: {
    myfilters,
    myPagination,
    MyQrcode
  },
  inject: ['reload'], // 重载
  data() {
    return {
      buttonLoading: false,
      listLoading: true, // 等待加载
      ssd_warehouse_status: '', // 消毒供应室包状态
      form: {},
      rules: {
        id: [{ required: true, message: '输入不能为空', trigger: ['change', 'blur'] }],
        totalCount: [
          { required: true, message: '输入不能为空', trigger: ['change', 'blur'] },
          { type: 'number', message: '请输入数字', trigger: ['change', 'blur'] }
        ]
      },
      dialogTitle: '', // 入库标题
      printShow: false, // 标签打印弹出框
      show: false, // 入库弹出框
      row: [],
      name: '', // 头部组件标题
      printForm: {}, // 标签打印数据
      dialogData: [], // 入库数据
      tableData: [], // 主页数据
      printerData: '', // 标签打印包数据
      totalCount: 0, // tableData数据长度
      conditions: {
        keyword: null
      },
      printCount: 0,
      packetSearch: null,
      packetConditions: {
        pageSize: 7,
        keyword: null
      }
      // qrcodeData: null
    }
  },
  computed: {
    // table data length
    content() {
      return '共' + this.totalCount + '条数据'
    }
  },
  watch: {
    // 监测器械包选项改变
    name: {
      handler(newValue, oldValue) {
        this.printerData.forEach(element => {
          if (element.name === this.name) {
            this.printForm.serialNumber = element.serialNumber
            this.printForm.name = element.name
            this.printForm.id = element.id
          }
        })
      }
    }
  },
  created() {
    this.fetchData() // 获取表单数据
  },
  methods: {
    // 初始化表单数据
    fetchData() {
      this.listLoading = true
      api.topacketDefine(this.conditions).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.totalCount = response.data.totalCount
          this.tableData = response.data.records
          this.listLoading = false
        }
      })
      api.topacketPage(this.packetConditions).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.printerData = response.data.records
          this.printCount = response.data.totalCount
          this.name = this.printerData[0].name
          this.printForm = {
            style: 1,
            totalCount: 0,
            name: this.printerData[0].name,
            serialNumber: this.printerData[0].serialNumber,
            id: this.printerData[0].id
          }
        }
      })
    },
    // 计算总数量
    storageCount(index, row) {
      return row.waitSterilizeCount + row.publishCount + row.nopublishCount
    },
    // 入库
    getId() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const formObj = JSON.parse(JSON.stringify(this.form))
          this.form = {}
          formObj.id = formObj.id.trim() // 去除留空
          // 检查该包是否已扫描
          for (let i = 0; i < this.dialogData.length; i++) {
            if (this.dialogData[i].id === formObj.id) {
              this.$message({
                message: '该包已输入',
                type: 'warning'
              })
              // this.form = {}
              return
            }
          }
          // 入库动作
          api.toInstancePacket(formObj).then(response => {
            if (response.code === '200' && response.data.busiCode === '1') {
              const data = response.data.records
              // 检查是否存在该实例包
              if (data.length === 0) {
                this.$message({
                  message: '请输入正确的编号',
                  type: 'warning'
                })
                // 清空表格
                // this.form = {}
                return
              } else {
                if (data[0].status !== '5') {
                  this.$message({
                    message: '该包已入库',
                    type: 'warning'
                  })
                  return
                }
                // 在数据头部加入新数据
                this.dialogData.unshift({
                  id: data[0].id,
                  name: data[0].name
                })
              }
              // this.form = {} // 清空表格
            }
            // console.log(response)
          })
        } else {
          this.$message({
            message: '请按要求填写',
            type: 'warning'
          })
        }
      })
    },
    // 长度大于等于15自动触发表单提交
    checkLength() {
      if (this.form.id.length >= 15) {
        this.getId()
      }
    },
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
    // state(state) {
    //   const stateMap = {
    //     '1': '正常',
    //     '2': '已作废'
    //   }
    //   return stateMap[state]
    // },
    // 状态标签图标
    // stateIcon(state) {
    //   const stateMap = {
    //     '1': '',
    //     '2': 'el-icon-warning'
    //   }
    //   return stateMap[state]
    // },
    // // 状态标签颜色
    // stateColor(state) {
    //   const stateMap = {
    //     '1': '',
    //     '2': 'error-color'
    //   }
    //   return stateMap[state]
    // },
    // // 状态标签背景颜色
    // stateBgColor(state) {
    //   const stateMap = {
    //     '1': '',
    //     '2': 'error-bg-color'
    //   }
    //   return stateMap[state]
    // },
    // 控制表行的颜色
    // tableRowClassName({ row, rowIndex }) {
    //   return this.stateBgColor(row.state)
    // },
    // 入库按钮点击
    instorageClick(index, row) {
      this.row = row
      this.show = true
      this.buttonLoading = false
      this.dialogTitle = '入库'
      // 弹框自动触发对焦
      this.$nextTick(x => {
        this.$refs.inInputs.focus()
      })
    },
    // 控制下拉框点击
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    // 控制作废选择
    // handleInvalid(index, row) {
    //   row.state = '2'
    //   this.$message({
    //     message: '作废成功',
    //     type: 'success'
    //   })
    // },
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
      console.log(this.dialogData)
      // 判断入库包个数是否为空
      if (this.dialogData.length === 0) {
        this.$message({
          message: '当前数据为空',
          type: 'warning'
        })
        return
      }
      const instanceIds = []
      this.dialogData.forEach(element => {
        instanceIds.push(element.id)
      })
      this.buttonLoading = true
      api.AllInStorage({ instanceIds }).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.buttonLoading = false
          this.$message({
            message: this.dialogTitle + '成功',
            type: 'success'
          })
          this.reload()
          this.show = false
        }
      })
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
      // 判断是否已经全部上架了
      if (row.nopublishCount === 0) {
        this.$message({
          message: '已全部上架',
          type: 'warning'
        })
        return
      }
      const publishIds = [] // 上架包实例ID
      // 上架请求
      api
        .toStoragePage({ defineId: row.id, warehouseStatus: '2' })
        .then(response => {
          if (response.code === '200' && response.data.busiCode === '1') {
            const tempData = response.data.records
            // 获取所有未上架的实例包id
            tempData.forEach(element => {
              publishIds.push(element.id)
            })
            // 发送请求,将所有未上架的id的包上架
            api.toPublish({ publishIds }).then(response => {
              if (response.code === '200' && response.data.busiCode === '1') {
                row.publishCount += row.nopublishCount
                row.nopublishCount = 0
                this.$message({
                  message: '上架成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '已全部上架',
                  type: 'warning'
                })
              }
            })
          }
        })
    },
    // 全部下架
    handleOffShelve(index, row) {
      // 判断是否已经全部下架了
      if (row.publishCount === 0) {
        this.$message({
          message: '已全部下架',
          type: 'warning'
        })
        return
      }
      const nopublishIds = [] // 下架包实例id
      // 下架请求
      api
        .toStoragePage({ defineId: row.id, warehouseStatus: '1' })
        .then(response => {
          console.log(response.data.records)
          if (response.code === '200' && response.data.busiCode === '1') {
            const tempData = response.data.records
            // 获取所有未下架的实例包id
            tempData.forEach(element => {
              nopublishIds.push(element.id)
            })
            // 发送请求,将所有未下架的id的包上架
            api.toNopublish({ nopublishIds }).then(response => {
              console.log(response)
              if (response.code === '200' && response.data.busiCode === '1') {
                row.nopublishCount += row.publishCount
                row.publishCount = 0
                this.$message({
                  message: '下架成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '已全部下架',
                  type: 'warning'
                })
              }
            })
          }
        })
    },
    // 查看点击
    packageShow(index, row) {
      this.$router.push({
        name: 'ShowPackage',
        query: {
          id: row.id,
          name: row.name
        }
      })
    },
    // 确定打印点击
    printSubmit() {
      // console.log(document.getElementById('printStyle'))
      this.$refs.printForm.validate(async valid => {
        if (valid) {
          const request = {
            packetDefineId: this.printForm.id,
            count: this.printForm.totalCount
          }
          api.toPrintPacket(request).then(response => {
            // this.qrcodeData = response.data.instanceIds
            const obj = {
              name: this.printForm.name,
              serialNumber: this.printForm.serialNumber,
              style: this.printForm.style,
              code: response.data.instanceIds
            }
            const routeUrl = this.$router.resolve({
              path: '/print/packagePrint',
              query: {
                title: '封包标签打印',
                data: JSON.stringify(obj)
              }
            })
            window.open(routeUrl.href, '_blank')
          })
          this.printShow = false
        } else {
          this.$message({
            type: 'error',
            message: '请正确输入打印内容'
          })
        }
      })
    },
    // 标签打印点击
    printClick() {
      this.printShow = true
      // this.$nextTick(x => {
      //   this.$refs.countInputs.focus()
      // })
      /* for (let i = 0; i < this.printerData.length; i++) {
        if (this.printerData[i].state === '2') {
          this.printerData.splice(i, 1)
          i--
        }
      } */
    },
    packetChange() {
      this.$set(this.packetConditions, 'pageNo', 1)
      // this.goodsLoading = true
      api
        .topacketPage(this.packetConditions)
        .then(response => {
          // console.log(response)
          this.printCount = response.data.totalCount
          this.printerData = response.data.records
          // this.goods.forEach(item => {
          //   const obj = {
          //     packetId: this.$route.query.packetId,
          //     itemId: item.id,
          //     name: item.name,
          //     itemCode: item.itemCode,
          //     itemQuantity: null
          //   }
          //   this.goodsData.push(obj)
          // })
          // this.goodsLoading = false
        })
    },
    // 创建新包点击
    /* newpackageClick() {
      this.$router.push({ name: 'NewPackage' })
    }, */
    getFocus() {
      this.$refs.countInputs.focus()
    },
    deliveryFocus() {
      this.$refs.inInputs.focus()
    },
    contentChange(content) {
      this.$set(this.conditions, 'keyword', content)
      this.$set(this.conditions, 'pageNo', 1)
      this.fetchData()
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
::v-deep .el-table td {
  padding: 15px 0;
}
.dialog-box {
  margin: 20px;
  border: 1px solid rgba(216, 216, 216, 1);
  .scrollbar {
    height:480px;
    background: #fff
  }
}
.el-dropdown-menu__item {
  padding: 0 20px;
  text-align: left;
  width: 110px;
}
.tinytitle {
  font-size: 14px;
  color: #ff4c4c;
  margin-left: 15px;
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
.delete-icon {
  font-size: 20px;
  cursor: pointer;
  margin-right: 20px;
}
.el-button--goon:focus,
.el-button--goon:hover {
  background: #48d1cc;
  border-color: #48d1cc;
  color: #fff;
}
.el-button--goon:active {
  background-color: #39adab;
  border-color: #39adab;
  color: #fff;
}
.el-button--goon {
  color: #fff;
  background-color: #40c9c6;
  border-color: #40c9c6;
}
.label-main {
  width: 472px;
  height: 394px;
  border: 1px solid #ababab;
  .label-top {
    background-color: #fff;
    padding: 20px;
    height: 247px;
  }
  .label-bottom {
    height: 145px;
    padding: 20px;
    background-color: #f6f6f6;
  }
  .erwm-img {
    padding: 10px;
    float: left;
    height: 200px;
    border: 1px solid rgba(155, 155, 155, 1);
  }
  .packet-name {
    font-size: 30px;
    line-height: 40px;
    margin-bottom: 20px;
  }
  .packet-code {
    font-size: 40px;
    line-height: 66px;
  }
  .packet-bottom {
    font-size: 30px;
    color: #666;
    line-height: 42px;
    margin-bottom: 10px;
  }
}
.search-input {
  width: 60%;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
