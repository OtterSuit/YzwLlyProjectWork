<template>
  <div style="padding:30px">
    <!-- header -->
    <myfilters
      :title="name"
      :content="content"
      :choose-status="true"
      :search-content="true"
      :status-options="status_options"
      :back-button="true"
      placeholder="入库人"
      @contentChange="contentChange"
      @statusChange="statusChange"
    >
      <template slot="header-extent">
        <el-col :span="4">
          <el-select v-model="identification" clearable placeholder="全部标识" @change="identificationChange">
            <!-- <el-option label="灭菌入库" value="灭菌入库" /> -->
            <el-option
              v-for="(val, key) in identification_options"
              :key="val"
              :label="val"
              :value="key"
            />
          </el-select>
        </el-col>
      </template>
      <template slot="extent">
        <el-dropdown trigger="click" style="margin:0 10px 0 5px" @command="handleCommand">
          <span class="el-dropdown-link">
            <el-button
              icon="el-icon-s-tools"
            >操作
              <i class="el-icon-arrow-down el-icon--right" />
            </el-button>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item
                :command="{
                  action: 'detailShow'
                }"
              >查看包明细
              </el-dropdown-item> -->
            <el-dropdown-item
              :command="{
                action: 'handleDialogOffShelve'
              }"
            >下架</el-dropdown-item>
            <el-dropdown-item
              :command="{
                action: 'handleDialogInventory'
              }"
            >上架</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </myfilters>
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
        width="100px"
      />
      <el-table-column label="包编码" prop="id" />
      <el-table-column label="入库标识">
        <template slot-scope="scope">
          <span>{{ ssd_warehouse_action[scope.row.action] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入库人" prop="createUser" />
      <el-table-column label="入库时间" prop="createTime" width="200px" />
      <el-table-column label="失效时间" prop="expectedTime" width="200px" />
      <el-table-column
        width="250px"
        label="状态"
      >
        <template slot-scope="scope">
          <div :class="stateColor(scope.row.warehouseStatus)">
            <i :class="stateIcon(scope.row.warehouseStatus)" />
            {{ ssd_warehouse_status[scope.row.warehouseStatus] }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <!-- 上/下架弹出框 -->
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
                  @input="checkInput"
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
                <!-- 删除图标 -->
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
        <el-button :loading="buttonLoading" type="primary" @click="handleSign()">确定{{ dialogTitle }}</el-button>
      </div>
    </el-dialog>
    <!-- 上/下架弹出框结束 -->
    <my-pagination :total="totalCount" methods="toStoragePage" :conditions="conditions" />
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
  inject: ['reload'], // 重载
  data() {
    return {
      buttonLoading: false,
      listLoading: true, // 数据加载
      id: '', // 实例包id
      name: '', // 标题
      dialogTitle: '', // 弹窗标题
      show: false, //  弹窗显示
      dialogData: [], // 弹窗数据
      identification: '', // 标识
      ssd_warehouse_status: null, // 消毒供应室状态
      ssd_warehouse_action: null, // 消毒供应室入库标识
      rules: {
        id: [
          { required: true, message: '输入不能为空', trigger: ['change', 'blur'] }
        ]
      },
      form: {}, // 入库表单
      // 表格数据
      tableData: [],
      totalCount: 0,
      conditions: {
        defineId: null,
        createUserFuzzy: null,
        action: null,
        warehouseStatus: null
      },
      identification_options: {
        1: '灭菌入库',
        2: '盘点入库',
        3: '新包入库'
      },
      status_options: {
        1: '上架',
        2: '下架',
        4: '出库',
        6: '等待灭菌'
      }
    }
  },
  computed: {
    // table data length
    content() {
      return '共' + this.totalCount + '条数据'
    }
  },
  created() {
    this.conditions.defineId = this.id = this.$route.query.id // 获取当前的ID
    this.conditions.defineId
    this.name = this.$route.query.name // 获取当前的包名称
    window.document.title = this.name + '  -  慧杨消毒供应室' // 修改标题
    this.fetchData()// 初始化获取表单数据
  },
  methods: {
    // 初始化获取表单数据
    fetchData() {
      this.listLoading = true
      // 获得当前定义包id的实例
      api.toStoragePage(this.conditions).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          // console.log(response)
          this.tableData = response.data.records
          this.ssd_warehouse_action = response.data.dictData.ssd_warehouse_action
          this.ssd_warehouse_status = response.data.dictData.ssd_warehouse_status
          this.totalCount = response.data.totalCount
          this.listLoading = false
        }
      })
    },
    // 检查id长度
    checkInput() {
      if (this.form.id.length >= 15) {
        this.getId()
      }
    },
    // 入库
    getId() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const formObj = JSON.parse(JSON.stringify(this.form))
          this.form = {}
          formObj.id = formObj.id.trim() // 去除留空
          // 判断该包是否已输入
          for (let i = 0; i < this.dialogData.length; i++) {
            if (this.dialogData[i].id === formObj.id) {
              this.$message({
                message: '该包已输入',
                type: 'warning'
              })
              return
            }
          }
          // 入库
          api.toInstancePacket(formObj).then(response => {
            // console.log(response)
            if (response.code === '200' && response.data.busiCode === '1') {
              const data = response.data.records
              // 检查是否存在该实例包
              if (data.length === 0) {
                this.$message({
                  message: '请输入正确的编号',
                  type: 'warning'
                })
                return
              } else {
                // 判断该实例包的类型是否属于该定义包的类型
                if (data[0].defineId !== this.id) {
                  this.$message({
                    message: '该包编码不属于该类型的包',
                    type: 'warning'
                  })
                  return
                }
                if (data[0].warehouseStatus === '4') {
                  this.$message({
                    message: '该包已出库',
                    type: 'warning'
                  })
                  return
                }
                if (data[0].warehouseStatus === '3') {
                  this.$message({
                    message: '该包已报废',
                    type: 'warning'
                  })
                  return
                }
                if (data[0].warehouseStatus === '6') {
                  this.$message({
                    message: '该包待灭菌',
                    type: 'warning'
                  })
                  return
                }
                if (this.dialogTitle === '上架' && data[0].warehouseStatus === '1') {
                  this.$message({
                    message: '该包已上架',
                    type: 'warning'
                  })
                  return
                }
                if (this.dialogTitle === '下架' && data[0].warehouseStatus === '2') {
                  this.$message({
                    message: '该包已下架',
                    type: 'warning'
                  })
                  return
                }
                // 在数据头部加入新数据
                this.dialogData.unshift(
                  {
                    id: data[0].id,
                    name: data[0].name
                  }
                )
              }
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
    // 状态标签图标
    stateIcon(state) {
      const stateMap = {
        '1': 'el-icon-success',
        '2': 'el-icon-warning',
        '3': 'el-icon-error',
        '4': 'icon-fahuo iconfont',
        '6': 'el-icon-time'
      }
      return stateMap[state]
    },
    // 状态标签颜色
    stateColor(state) {
      const stateMap = {
        '1': 'success-color',
        '2': 'warning-color',
        '3': 'error-color',
        '4': 'goon-color',
        '6': 'base-color'
      }
      return stateMap[state]
    },
    // 控制下拉框行为
    handleCommand({ action }) {
      this[action]()
    },
    // 控制删除图标
    handleDelete(index, row) {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.dialogData.splice(index, 1)
    },
    // 上架弹出框
    handleDialogInventory(index, row) {
      this.buttonLoading = false
      this.show = true
      if (this.dialogTitle !== '上架') {
        this.dialogData = []
      }
      this.dialogTitle = '上架'
      this.$nextTick((x) => {
        this.$refs.inInputs.focus()
      })
    },
    // 下架弹出框
    handleDialogOffShelve(index, row) {
      this.buttonLoading = false
      this.show = true
      if (this.dialogTitle !== '下架') {
        this.dialogData = []
      }
      this.dialogTitle = '下架'
      this.$nextTick((x) => {
        this.$refs.inInputs.focus()
      })
    },
    // 查看包明细
    // detailShow() {
    //   this.$router.push(
    //     {
    //       name: 'PackageDetail',
    //       query: {
    //         packetId: this.id,
    //         packetName: this.name
    //       }
    //     }
    //   )
    // },
    // 入库确定
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
      // 判断上or下架
      if (this.dialogTitle === '上架') {
        const publishIds = []
        this.dialogData.forEach(element => {
          publishIds.push(element.id)
        })
        api.toPublish({ publishIds }).then(response => {
          if (response.code === '200' && response.data.busiCode === '1') {
            this.$message({
              message: '上架成功',
              type: 'success'
            })
            this.reload() // 重新加载页面
          }
        })
      } else {
        const nopublishIds = []
        this.dialogData.forEach(element => {
          nopublishIds.push(element.id)
        })
        this.buttonLoading = true
        api.toNopublish({ nopublishIds }).then(response => {
          if (response.code === '200' && response.data.busiCode === '1') {
            this.buttonLoading = false
            this.$message({
              message: '下架成功',
              type: 'success'
            })
            this.reload() // 重新加载页面
            this.show = false
          }
        })
      }
    },
    deliveryFocus() {
      this.$refs.inInputs.focus()
    },
    // 状态选项改变
    statusChange(state) {
      this.$set(this.conditions, 'warehouseStatus', state)
      this.selectChange()
    },
    // 标识选项改变
    identificationChange(identification) {
      this.$set(this.conditions, 'action', identification)
      this.selectChange()
    },
    // 输入框改变
    contentChange(content) {
      this.$set(this.conditions, 'createUserFuzzy', content)
      this.selectChange()
    },
    // 日期改变
    dateChange(date) {
      console.log(date)
    },
    selectChange() {
      this.$set(this.conditions, 'pageNo', 1)
      this.listLoading = true
      api.toStoragePage(this.conditions).then(response => {
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
.dialog-box{
  margin: 20px;
  border:1px solid rgba(216,216,216,1);
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
.tinytitle{
  font-size: 14px;
  color: #FF4C4C;
  margin-left:15px ;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
.delete-icon {
  font-size: 24px;
  cursor: pointer;
  margin-right: 20px;
}
</style>
