<template>
  <div style="padding:30px">
    <!-- header -->
    <myfilters
      title="任务列表"
      :content="content"
      :search-content="true"
      :add-button="true"
      addifo="开始装载"
      add-icon="el-icon-first-aid-kit"
      placeholder="包名称/包编号"
      @addClick="startLoading"
      @contentChange="contentChange"
    />
    <!-- header end -->
    <!-- table -->
    <el-table v-loading="listLoading" :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column label="包编号" prop="serialNumber" width="150" />
      <el-table-column label="包名称" prop="name" />
      <el-table-column label="数量" prop="packetInstanceCount" />
      <el-table-column label="封包人/时间">
        <template slot-scope="scope">
          <div>
            {{ scope.row.createUser }}
            <br>
            <span class="second-row">{{ scope.row.createTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="审核状态">
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
            icon="el-icon-tickets"
            size="mini"
            @click="handleShow(scope.$index, scope.row)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <my-pagination :total="totalCount" methods="getLoadingPage" :conditions="conditions" />
    <!-- 查看详细弹出框 -->
    <el-dialog :visible.sync="packageShow" width="95%">
      <template slot="title">
        <span class="dialog-title">{{ row.name }}</span>
        <span class="tiny-text">共{{ row.packetInstanceCount }}包</span>
      </template>
      <div class="dialog-main">
        <!-- table header -->
        <el-table :data="detailData" style="width: 100%" class="hidden-table">
          <el-table-column label="序号" width="150px" />
          <el-table-column label="包名称" width="250px" />
          <el-table-column label="包编码" width="250px" />
          <el-table-column label="选择灭菌设备" />
        </el-table>
        <!-- table header end -->
        <!-- scrollbar -->
        <el-scrollbar class="scrollbar">
          <!-- table body -->
          <el-table :data="detailData" style="width:100%" :show-header="false">
            <el-table-column type="index" width="150px" />
            <el-table-column prop="packetName" width="250px" />
            <el-table-column prop="packetInstanceId" width="250px" />
            <el-table-column width="250px">
              <template slot-scope="scope">
                <div v-if="scope.row.boxId!==null">
                  {{ scope.row.boxName }}
                </div>
                <div v-else>
                  <el-select v-model="scope.row.box" placeholder="请选择">
                    <el-option
                      v-for="(value,key) in equipmentOptions"
                      :key="key"
                      :label="value"
                      :value="key"
                    />
                  </el-select>
                </div>

              </template>
            </el-table-column>
            <el-table-column />
          </el-table>
          <!-- table body end -->
        </el-scrollbar>
        <!-- scrollbar end -->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="bgc" @click="packageShow=false">取消</el-button>
        <el-button
          type="primary"
          :loading="buttonLoading"
          @click="packageSubmit()"
        >确定装载</el-button>
      </div>
    </el-dialog>
    <!-- 查看详细弹出框结束 -->
    <!-- 开始装载弹出框 -->
    <el-dialog title="请选择灭菌设备" :visible.sync="equipmentShow" width="950px">
      <div class="dialog-main">
        <div style="height:500px;">
          <el-radio-group v-model="equipmentChoice">
            <el-radio
              v-for="(value,key) in equipmentOptions"
              :key="key"
              :label="key"
            >
              {{ value }}
            </el-radio>
          </el-radio-group>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="bgc" style="width: 100px" @click="equipmentShow=false">取消</el-button>
        <el-button
          type="primary"
          style="width: 150px"
          @click="equipmentSubmit()"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- 开始装载弹出框结束 -->
    <!-- 灭菌设备装载弹出框 -->
    <el-dialog :visible.sync="loadingShow" width="95%">
      <template slot="title">
        <span class="dialog-title">{{ equipmentOptions[equipmentChoice] }}</span>
        <span class="tiny-text" style="color: #FF4C4C">请扫描需要装载的器械包条码，完成后再扫码</span>
      </template>
      <div class="dialog-main">
        <!-- table header -->
        <el-table :data="dialogData" style="100%" class="hidden-table">
          <el-table-column label="序号" width="150px" />
          <el-table-column label="包编码" width="260px" />
          <el-table-column label="包名称" />
        </el-table>
        <!-- table header end -->
        <!-- scrollbar -->
        <el-scrollbar class="scrollbar">
          <!-- 全局样式 index.css -->
          <div class="dialog-packet">
            <el-form ref="form" :model="form" :rules="rules" @submit.native.prevent>
              <el-form-item prop="id">
                <el-input
                  ref="inInputs"
                  v-model.trim="form.id"
                  type="tel"
                  placeholder="请输入或扫描包编码"
                  @keyup.enter.native="getId()"
                  @input="checkInput"
                  @blur="getFocus"
                />
              </el-form-item>
            </el-form>
          </div>
          <!-- table body  -->
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
        <el-button type="bgc" @click="loadingShow=false">取消</el-button>
        <el-button
          type="primary"
          :loading="buttonLoading"
          @click="loadingSubmit()"
        >确定装载</el-button>
      </div>
    </el-dialog>
    <!-- 灭菌设备装载弹出框结束 -->
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
  inject: ['reload'], // 页面重载
  data() {
    return {
      listLoading: true,
      buttonLoading: false,
      row: [],
      packageShow: false, // 查看详细弹出框
      equipmentShow: false, // 灭菌设备弹出框
      loadingShow: false, // 灭菌设备装载弹出框
      rules: {
        id: [
          { required: true, message: '输入不能为空', trigger: ['change', 'blur'] }
        ]
      },
      form: {},
      equipmentChoice: '', // 灭菌设备选择
      // table data
      tableData: [],
      // 设备选择选项
      equipmentOptions: [],
      // 装载数据
      dialogData: [],
      detailData: null,
      ssd_sterilization_task_status: null,
      conditions: {
        status: '1',
        keyword: null
      },
      totalCount: 0
    }
  },
  computed: {
    // table data length
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
      api.getLoadingPage({ statuses: ['1', '2'] }).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.ssd_sterilization_task_status = response.data.dictData.ssd_sterilization_task_status
          this.tableData = response.data.records
          this.totalCount = response.data.totalCount
          this.listLoading = false
        }
      })
      // 获取灭菌设备
      api.toconstanttypeBatch({
        constantCodes: [
          'STERILIZE_BOX'
        ]
      }).then(response => {
        this.equipmentOptions = response.data.constantsDetail.STERILIZE_BOX
        this.equipmentChoice = Object.keys(this.equipmentOptions)[0]
      })
    },
    // 获得焦点
    getFocus() {
      this.$refs.inInputs.focus()
    },
    // 包输入
    getId() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const formObj = JSON.parse(JSON.stringify(this.form))
          this.form = {}
          formObj.id = formObj.id.trim() // 去除留空
          for (let i = 0; i < this.dialogData.length; i++) {
            if (this.dialogData[i].id === formObj.id) {
              return this.$message({
                message: '该包已输入',
                type: 'warning'
              })
            }
          }
          api.toInstancePacket(formObj).then(response => {
            if (response.code === '200' && response.data.busiCode === '1') {
              const data = response.data.records
              if (data.length === 0) {
                return this.$message({
                  message: '请输入正确的编号',
                  type: 'warning'
                })
              } else if (data[0].status !== '17') {
                return this.$message({
                  message: '该包不处于等待装载状态,请重试',
                  type: 'warning'
                })
              } else {
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
    // 状态标签文字
    state(state) {
      const stateMap = {
        '1': '装载完成',
        '2': '等待装载'
        // '3': '正在装载，已完成' + row.complete + '包'
      }
      return stateMap[state]
    },
    // 状态标签图标
    stateIcon(state) {
      const stateMap = {
        '1': 'el-icon-success',
        '2': 'el-icon-time',
        '3': 'icon-zhuangpei iconfont'
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
    // 查看装载任务
    handleShow(index, row) {
      this.row = row
      this.packageShow = true
      if (row.packet) {
        this.detailData = row.packet
        return
      }
      api.getLoadingDetail({ id: row.id }).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          this.detailData = response.data.list
          row.packet = JSON.parse(JSON.stringify(this.detailData))
        }
      })
    },
    // 查看弹出框确定装载
    packageSubmit() {
      const tempData = this.detailData.filter(item => {
        return item.box !== undefined
      })
      const formData = {}
      tempData.forEach(item => {
        formData[item.box] === undefined ? formData[item.box] = [item.packetInstanceId] : formData[item.box].push(item.packetInstanceId)
      })
      const formKeys = Object.keys(formData)
      for (const key in formData) {
        this.buttonLoading = true
        api.toLoadingBox({
          boxId: key,
          packetInstanceIds: formData[key]
        }).then(response => {
          if (response.code === '200' && response.data.busiCode === '1') {
            this.$message({
              message: `${this.equipmentOptions[key]} 装载成功`,
              type: 'success'
            })
            if (formKeys.indexOf(key) === formKeys.length - 1) {
              setTimeout(() => {
                this.buttonLoading = false
                this.packageShow = false
                this.reload()
              }, 1000)
            }
          }
        })
      }
    },
    // 开始装载弹出框确定
    checkInput() {
      if (this.form.id.length >= 15) {
        this.getId()
      }
    },
    // 选择灭菌设备
    equipmentSubmit() {
      this.equipmentShow = false
      this.loadingShow = true
      this.$nextTick(x => {
        this.$refs.inInputs.focus()
      })
    },
    // 开始装载按钮点击
    startLoading() {
      this.equipmentShow = true
    },
    // 删除图标点击
    handleDelete(index, row) {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.dialogData.splice(index, 1)
    },
    // 开始装载
    loadingSubmit() {
      // 装载为空
      if (this.dialogData.length === 0) {
        this.$message({
          message: '装载为空',
          type: 'warning'
        })
        return
      }
      const packetInstanceIds = [] // 包id
      // 全部装载的包
      this.dialogData.forEach(element => {
        packetInstanceIds.push(element.id)
      })
      this.buttonLoading = true
      api.toLoadingBox({
        boxId: this.equipmentChoice,
        packetInstanceIds: packetInstanceIds
      }).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          this.$message({
            message: '装载成功',
            type: 'success'
          })
          this.loadingShow = false
          this.buttonLoading = false
          this.reload()
        }
      })
    },
    // 输入框输入改变
    contentChange(content) {
      this.$set(this.conditions, 'keyword', content)
      this.selectChange()
    },
    selectChange() {
      this.$set(this.conditions, 'pageNo', 1)
      this.listLoading = true
      api.getLoadingPage(this.conditions).then(response => {
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
::v-deep .el-radio{
  margin: 30px;
  .el-radio__input.is-checked+.el-radio__label {
    background: #F0F9EB;
    color: #69C33E;
  }
  .el-radio__label {
    border-radius:3px;
    padding: 10px 28px;
    font-size: 18px;
    background: #F4F4F5;
  }
  .el-radio__input.is-checked .el-radio__inner {
    display: block;
  }
  .el-radio__inner {
    position: absolute;
    top: -22px;
    left: 3px;
    display: none;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #29C06D;
    background: #29C06D;
  }
  .el-radio__input.is-checked .el-radio__inner::after{
    background-color: #29C06D;
  }
}
.dialog-title{
  font-size:18px;
  line-height: 28px;
}
.tiny-text{
  font-size: 12px;
  color: #999999;
  padding-left: 15px;
}
.scrollbar{
  height:500px;
  background: #fff
}
.green-color,
.green-color:hover {
  color: #40c9c6;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
.delete-icon {
  font-size: 20px;
  cursor: pointer;
  margin-right: 20px;
}
</style>
