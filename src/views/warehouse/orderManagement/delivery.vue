<template>
  <div class="delivery-container">
    <!-- header -->
    <myfilters title="发放单" :back-button="true" />
    <!-- header end -->
    <div class="main-box">
      <!-- form -->
      <el-form ref="detailForm" :model="detailForm" label-width="100px">
        <div class="main-box-title">订单信息</div>
        <div class="tiny-form-item">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="订单编号">
                <span class="main-box-text">{{ detailForm.id }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="申请科室">
                <span class="main-box-text">{{ detailForm.applyDeptName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="申请人">
                <span class="main-box-text">{{ detailForm.applyUserid }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="订单状态">
                <span class="main-box-text">{{ detailForm.status }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="申请类别">
                <span class="main-box-text">
                  {{ detailForm.category }}
                  <span v-if="detailForm.urgentFlag===1" class="error-color">【加急】</span></span>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="申请数量">
                <span class="main-box-text">{{ detailForm.applyCount }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="申请时间">
                <span class="main-box-text">{{ detailForm.applyTime }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <!-- form end -->
      <!-- img -->
      <div class="erwm">
        <my-qrcode :text="id" />
      </div>
      <!-- img -->
    </div>
    <div class="main-box">
      <div class="main-box-title main-box-title-float">
        物品清单
        <el-button
          class="main-box-button"
          type="primary"
          icon="el-icon-circle-plus-outline"
          size="small"
          @click="delivery"
        >配货</el-button>
      </div>
      <!-- table -->
      <el-table v-loading="listLoading" :data="orderPackets" style="width: 100% ">
        <el-table-column label="序号" type="index" />
        <el-table-column label="编号" prop="serialNumber" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="数量" prop="packetCount" />
        <el-table-column label="状态">
          <template slot-scope="scope">
            <div v-if="scope.row.complete===0" class="base-color"><i class="el-icon-time" />待配货</div>
            <div v-else-if="scope.row.complete===scope.row.packetCount" class="success-color"><i class="el-icon-success" />配货完成</div>
            <div v-else class="goon-color"><i class="icon-fahuo iconfont" />正在配货，已完成{{ scope.row.complete }}包</div>
          </template>
        </el-table-column>
      </el-table>
      <!-- table end -->
    </div>
    <div class="main-box">
      <div class="main-box-title">发放信息</div>
      <div class="main-box-receive">
        <el-form ref="receiveForm" v-loading="listLoading" :model="receiveForm" label-width="80px" :rules="rules">
          <el-form-item label="申请科室" style="width:50%">
            <el-input v-model="detailForm.applyDeptName" disabled />
          </el-form-item>
          <el-form-item label="发放人" style="width:50%" prop="deliveryman">
            <el-input v-model="receiveForm.deliveryman" placeholder="请输入或扫描工牌" />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-button :loading="buttonLoading" type="primary" style="width:145px; height: 50px" @click="deliverySubmit()">确定发放</el-button>
    <!-- 配货弹出框 -->
    <el-dialog v-el-drag-dialog :visible.sync="deliveryShow" width="95%">
      <template slot="title">
        <span style="font-size:20px">{{ dialogTitle }}</span>
        <span class="tinytitle">请扫描需要{{ dialogTitle }}的器械包条码</span>
      </template>
      <div class="dialog-box">
        <!-- table header -->
        <el-table :data="packetInstanceIds" style="100%" class="hidden-table">
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
                  @input="checkInput"
                />
              </el-form-item>
            </el-form>
          </div>
          <!-- table -->
          <el-table :data="packetInstanceIds" style="100%" :show-header="false">
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
          <!-- table end -->
        </el-scrollbar>
        <!-- scrollbar end -->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="bgc" @click="deliveryShow=false">取消</el-button>
        <el-button type="primary" @click="handleSign()">确定{{ dialogTitle }}</el-button>
      </div>
    </el-dialog>
    <!-- 配货弹出框结束 -->
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import MyQrcode from '@/components/MyQrcode'
import api from '@/api'
export default {
  components: {
    myfilters,
    MyQrcode
  },
  data() {
    return {
      buttonLoading: false,
      rules: {
        deliveryman: [
          { required: true, message: '请输入发放人', trigger: ['change', 'blur'] }
        ],
        id: [
          { required: true, message: '输入不能为空', trigger: ['change', 'blur'] }
        ]
      },
      id: '', // 订单Id
      form: {},
      ssd_workorder_status: null, // 工单状态
      ssd_workorder_type: null, // 工单类型
      ssd_packet_category: null,
      listLoading: true, // 数据加载
      dialogTitle: '', // 弹出框标题
      deliveryShow: false, // 配货弹出框
      dialogCoding: '', // 扫码编码
      // 弹出框数据
      // dialogData: {}, // 包数据
      // 收获信息表
      receiveForm: {
        receiveDepartment: '',
        deliveryman: ''
      },
      // 订单信息表
      detailForm: {},
      // 物品清单数据
      orderPackets: [],
      packetInstanceIds: []
    }
  },
  created() {
    this.id = this.$route.query.id // 获取订单编号
    this.fetchData() // 获取数据
  },
  methods: {
    fetchData() {
      // 获取工单详情
      this.listLoading = true
      // 通过订单编号查询数据
      api.toGetWorkorder({ id: this.id }).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          // console.log(response)
          this.ssd_workorder_status =
            response.data.dictData.ssd_workorder_status // 工单状态字典
          this.ssd_workorder_type = response.data.dictData.ssd_workorder_type // 工单类型字典
          this.ssd_packet_category = response.data.dictData.ssd_packet_category // 获取包类型
          this.orderPackets = response.data.packetDefinePage.records // 订单包数据
          this.detailForm = response.data.workorderPage // 订单详细信息
          this.detailForm.status = this.ssd_workorder_status[this.detailForm.currentStatus]
          this.detailForm.category = this.ssd_packet_category[this.detailForm.workorderCategory]
          // 配货信息
          this.orderPackets.forEach(item => {
            this.$set(item, 'complete', 0)
          })
          this.listLoading = false
        }
      })
    },
    // 检查输入id长度
    checkInput() {
      if (this.form.id.length >= 15) {
        this.getId()
      }
    },
    // 扫码或输入编号
    getId() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const formObj = JSON.parse(JSON.stringify(this.form))
          this.form = {}
          formObj.id = formObj.id.trim() // 去除留空
          for (let i = 0; i < this.packetInstanceIds.length; i++) {
            // 判断该包是否已输入
            if (this.packetInstanceIds[i].id === formObj.id) {
              return this.$message({
                message: '该包已输入',
                type: 'warning'
              })
            }
          }
          // 配包
          api.toInstancePacket(formObj).then(response => {
            // console.log(response)
            if (response.code === '200' && response.data.busiCode === '1') {
              const data = response.data.records
              // 判断该包是否正确
              if (data.length === 0) {
                return this.$message({
                  message: '请输入正确的编号',
                  type: 'warning'
                })
              }
              let packetBool = false
              let packetObj = null
              this.orderPackets.forEach(item => {
                if (item.packetDefineId === data[0].defineId) {
                  packetBool = true
                  packetObj = item
                }
              })
              if (!packetBool) {
                return this.$message({
                  message: '不需要发放该类型的包',
                  type: 'warning'
                })
              }
              if (data[0].warehouseStatus === '5') {
                return this.$message({
                  message: '该包未入库',
                  type: 'warning'
                })
              }
              if (data[0].warehouseStatus === '4') {
                return this.$message({
                  message: '该包已出库',
                  type: 'warning'
                })
              }
              if (data[0].warehouseStatus === '3') {
                this.$message({
                  message: '该包已报废',
                  type: 'warning'
                })
                return
              }
              if (data[0].warehouseStatus === '2') {
                this.$message({
                  message: '该包已下架',
                  type: 'warning'
                })
                return
              }
              if (data[0].warehouseStatus === '6') {
                this.$message({
                  message: '该包尚未灭菌',
                  type: 'warning'
                })
                return
              }
              if (packetObj.complete === packetObj.packetCount) {
                this.$message({
                  message: '该类型的包已满足需求数量，不需要再进行配货',
                  type: 'warning'
                })
                return
              }
              packetObj.complete += 1
              // // 添加数据
              this.packetInstanceIds.unshift({
                id: data[0].id,
                packetDefineId: data[0].defineId,
                name: data[0].name
              })
            }
          })
        }
      })
    },
    // 控制删除
    handleDelete(index, row) {
      this.orderPackets.forEach(item => {
        if (item.packetDefineId === row.packetDefineId) {
          item.complete -= 1
          return
        }
      })
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.packetInstanceIds.splice(index, 1)
    },
    // 配货弹出框
    delivery() {
      this.dialogTitle = '配货'
      // this.row = row
      // this.editId = row.packetDefineId
      this.deliveryShow = true
      // console.log(this.$refs.inInputs)
      // 对焦
      this.$nextTick(x => {
        this.deliveryFocus()
      })
      // this.deliveryFocus()
    },
    deliveryFocus() {
      this.$refs.inInputs.focus()
    },
    // 控制弹出框提交
    handleSign() {
      this.$message({
        message: this.dialogTitle + '成功',
        type: 'success'
      })
      this.deliveryShow = false
    },
    // 确定发放提交
    deliverySubmit() {
      // 判断是否配货完成
      let deliveryBool = true
      this.orderPackets.forEach(item => {
        if (item.complete !== item.packetCount) {
          deliveryBool = false
          return
        }
      })
      if (!deliveryBool) {
        this.$message({
          message: '请确认是否配货完成',
          type: 'warning'
        })
        return
      }
      this.$refs.receiveForm.validate(async valid => {
        if (valid) {
          // 发放请求
          const packetInstanceIds = [] // 包实例id
          // 获取所有包实例id
          this.packetInstanceIds.forEach(item => {
            packetInstanceIds.push(item.id)
          })
          // 请求表单
          const delivery = {
            id: this.id,
            packetInstanceIds,
            sendUserid: this.receiveForm.deliveryman
          }
          // 发起请求
          this.buttonLoading = true
          api.toApplyDelivery(delivery).then(response => {
            if (response.code === '200' && response.data.busiCode === '1') {
              this.$router.go(-1)
              this.$message({
                message: '发放成功',
                type: 'success'
              })
              this.buttonLoading = false
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.delivery-container {
  padding: 30px;
  background-color: #f0f2f5;
  min-height: calc(100vh - 50px);
}
.tinytitle {
  font-size: 14px;
  color: #ff4c4c;
  margin-left: 15px;
}
::v-deep .tiny-form-item {
  .el-form-item {
    margin: 0;
    .el-form-item__label {
      color: #9eaec3;
      text-align: left;
      font-weight: normal;
    }
    .el-form-item__content {
      color: #000000;
      font-size: 14px;
    }
  }
}
::v-deep .main-box-receive {
  .el-form-item {
    margin: 15px;
    .el-form-item__label {
      text-align: left;
      font-weight: normal;
      color: #666666;
      font-size: 14px;
      padding: 0 14px 0 0;
    }
  }
}
.main-box {
  background: white;
  margin: 20px 0;
  padding: 30px;
  position: relative;

  .main-box-title {
    font-size: 18px;
    color: #999999;
    margin-bottom: 15px;
  }
  .erwm {
    position: absolute;
    top: 20px;
    right: 30px;
  }
}
.dialog-box {
  margin: 20px;
  border: 1px solid rgba(216, 216, 216, 1);
  .scrollbar {
    height:480px;
    background: #fff
  }
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
.delete-icon {
  font-size: 20px;
  cursor: pointer;
}
.main-box-title-float {
  height: 32px;
  line-height: 32px;
}
.main-box-button {
  float: right;
}
</style>

