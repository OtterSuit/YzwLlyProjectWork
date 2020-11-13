<template>
  <div class="packet-contaniner">
    <!-- 头部 -->
    <myfilters
      title="任务列表"
      :content="content"
      placeholder="包名称/包编号"
      :search-content="true"
      :print-button="true"
      @contentChange="contentChange"
      @printClick="print"
    />
    <!-- 头部 end -->
    <!-- table -->
    <el-table v-loading="listLoading" :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column prop="serialNumber" label="包编号" />
      <el-table-column prop="packetName" label="包名称" />
      <el-table-column prop="totalPacketCount" label="数量" width="100" />
      <el-table-column label="审核人/时间">
        <template slot-scope="scope">
          {{ scope.row.auditUser }}
          <br>
          <span class="second-row">{{ scope.row.auditTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div :class="stateColor(scope.row.status)">
            <i :class="stateIcon(scope.row.status)" />
            {{ state(scope.row) }}
          </div>
        </template>
      </el-table-column>
      <!-- 包内器械以及图片视频 -->
      <el-table-column align="right" width="80">
        <template slot-scope="scope">
          <el-button
            slot="reference"
            size="mini"
            type="primary"
            @click="handleShow(scope.$index, scope.row)"
          >封包</el-button>
        </template>
      </el-table-column>
      <!-- 封包动作 -->
      <el-table-column align="right" width="80">
        <template slot-scope="scope">
          <el-button
            slot="reference"
            size="mini"
            type="primary"
            icon="printer"
            @click="addClick(scope.$index, scope.row)"
          >验收</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <my-pagination :total="totalCount" methods="getSubPacketPage" :conditions="conditions" />
    <!-- 标签打印 -->
    <el-dialog title="器械包标签打印" :visible.sync="printShow" width="95%">
      <div class="dialog-main">
        <el-row :gutter="20">
          <!-- 器械包 -->
          <el-col :span="12">
            <div class="dialog-main-box">
              <div class="box-title">请选择器械包</div>
              <el-col :span="15">
                <el-input v-model="conditions.keyword" class="search-input" placeholder="物品名称/编码" @keyup.enter.native="contentChange(conditions.keyword)" />
                <el-button icon="el-icon-search" type="primary" @click="contentChange(conditions.keyword)">搜索</el-button>
              </el-col>
              <el-col :span="4">
                <my-pagination :background="true" :total="totalCount" methods="getSubPacketPage" :table-data="['$parent','$parent','$parent','$parent','tableData']" :conditions="conditions" />
              </el-col>
              <el-table :data="tableData" style="width: 100%" class="hidden-table">
                <el-table-column label="选择" align="center" width="100" />
                <el-table-column label="包名称" width="200" />
                <el-table-column label="数量" />
              </el-table>
              <el-scrollbar class="scrollbar">
                <el-table :data="tableData" style="width: 100%" :show-header="false">
                  <el-table-column align="center" width="100">
                    <template slot-scope="scope">
                      <el-radio
                        v-model="taskId"
                        :label="scope.row.id"
                        class="hidden-radio"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column prop="packetName" width="200" />
                  <el-table-column prop="totalPacketCount" />
                </el-table>
              </el-scrollbar>
            </div>
          </el-col>
          <!-- 标签表单 -->
          <el-col :span="12">
            <div class="dialog-main-box">
              <div class="box-title">选择标签模板</div>
              <el-form ref="form" :model="printForm" label-width="80px" :rules="rules">
                <el-row type="flex" justify="space-between">
                  <el-col :span="11">
                    <el-form-item label="打印数量" prop="totalPacketCount">
                      <el-input-number
                        ref="countInputs"
                        v-model="printForm.totalPacketCount"
                        controls-position="right"
                        :min="1"
                        :disabled="taskId===null"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="标签样式">
                      <el-select v-model="printForm.style" placeholder="请选择标签样式" :disabled="taskId===null">
                        <el-option label="模板样式1" :value="1" />
                        <el-option label="模板样式2" :value="2" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <el-row>
                <el-col :span="4">
                  <div class="label-title">标签预览</div>
                </el-col>
                <el-col :span="20">
                  <div v-show="printForm.style===1" class="label-main">
                    <div class="label-top">
                      <el-col :span="12">
                        <div class="packet-name">{{ printForm.packetName }}</div>
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
                        <div class="packet-name">{{ printForm.packetName }}</div>
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
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="bgc" @click="printShow=false">取消</el-button>
        <el-button type="primary" @click="printSubmit">确定打印</el-button>
      </div>
    </el-dialog>
    <!-- 标签打印结束 -->
    <!-- 验收弹窗 -->
    <el-dialog v-el-drag-dialog :visible.sync="show" width="95%">
      <template slot="title">
        <span style="font-size:18px">{{ dialogTitle }}</span>
        <span class="tinytitle">请扫描需要{{ dialogTitle }}的器械包条码</span>
      </template>
      <div class="dialog-box">
        <!-- table header -->
        <el-table :data="row.packet" style="100%" class="hidden-table">
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
                  @keyup.enter.native="getId()"
                  @input="checkInput"
                  @blur="getFocus"
                />
              </el-form-item>
            </el-form>
          </div>
          <!-- table body -->
          <el-table :data="row.packet" style="100%" :show-header="false">
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
    <!-- 验收弹窗结束 -->
    <!-- 封包弹窗 -->
    <el-dialog :visible.sync="packageShow" width="95%" class="package-dialog">
      <template slot="title">
        <el-row>
          <el-col class="inline-col">
            <div v-if="imgSrc===null" class="default-img">
              暂无图片
            </div>
            <img v-else class="dialog-title-img" :src="imgSrc" @click="imgShow=true">
          </el-col>
          <el-col class="inline-col">
            <el-row>
              <div class="dialog-title-top"><!-- {{ tableData[editIndex].packetName }} -->{{ row.packetName }}</div>
            </el-row>
            <el-row>
              <div class="dialog-title-bottom">包唯一码：<!-- {{ tableData[editIndex].serialNumber }} -->{{ row.serialNumber }}</div>
            </el-row>
            <el-row>
              <div class="dialog-title-bottom">器械数量：{{ instrumentNum(instrumentData) }}</div>
            </el-row>
          </el-col>
          <el-col class="inline-col">
            <el-row class="title-right-row">
              <el-col>
                <div class="right-row-num"><!-- {{ tableData[editIndex].totalPacketCount }} -->{{ row.totalPacketCount }}</div>
                <div class="right-row-content">任务数量</div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </template>
      <div class="dialog-main">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="dialog-main-box">
              <div class="box-title">
                <span>请清点器械并打包</span>
              </div>
              <div style="height:400px">
                <el-table v-loading="dialogLoading" :data="instrumentData" style="width: 100%" class="hidden-table">
                  <el-table-column label="序号" width="100" />
                  <el-table-column label="器械名称" />
                  <el-table-column label="数量" />
                </el-table>
                <el-scrollbar class="scrollbar">
                  <el-table :data="instrumentData" style="width: 100%" :show-header="false">
                    <el-table-column type="index" width="100" />
                    <el-table-column>
                      <template slot-scope="scope">
                        {{ scope.row.name }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="itemQuantity" />
                  </el-table>
                </el-scrollbar>
              </div>
            </div>
          </el-col>
          <el-col :span="12" class="dialog-right">
            <div class="dialog-main-box">
              <el-row>
                <el-col class="inline-col">
                  <div class="box-title" style="margin-right:35px">打包指引教程</div>
                </el-col>
                <el-col class="inline-col">
                  <el-tabs v-model="activeName" style="height:40px">
                    <el-tab-pane label="图片" name="imagesCourse" />
                    <el-tab-pane label="视频" name="videosCourse" />
                  </el-tabs>
                </el-col>
              </el-row>
              <transition v-loading="dialogLoading" name="fade-transform" mode="out-in">
                <component :is="isComponent" v-if="courseImg[activeName]!==null" :src="courseImg" />
                <div v-else class="defaultCourse">
                  暂无<span v-if="activeName==='imagesCourse'">图片</span><span v-else>视频</span>
                  <br>
                  请上传后再查看
                </div>
              </transition>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="packageShow=false">确定</el-button>
      </div>
    </el-dialog>
    <el-image-viewer v-show="imgShow" :on-close="viewerClose" :url-list="[imgSrc]" />
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import myPagination from '@/components/MyPagination'
import MyQrcode from '@/components/MyQrcode'
import APIconfig from '@/api/APIconfig'
// import { format } from '@/utils/index'
import packageImage from './packageImage'
import packageVideo from './packageVideo'
import api from '@/api'
export default {
  components: {
    myfilters,
    myPagination,
    packageImage,
    packageVideo,
    MyQrcode
  },
  data() {
    return {
      listLoading: true,
      rules: {
        id: [
          { required: true, message: '输入不能为空', trigger: ['change', 'blur'] }
        ],
        totalPacketCount: [
          { required: true, message: '输入不能为空', trigger: ['change', 'blur'] },
          { type: 'number', message: '请输入数字', trigger: ['change', 'blur'] }
        ]
      },
      dialogTitle: '验收',
      form: {},
      printForm: {},
      activeName: 'imagesCourse',
      // 打包教程类型
      componentsList: {
        imagesCourse: 'packageImage',
        videosCourse: 'packageVideo'
      },
      imgShow: false,
      imgSrc: null, // 弹窗header图
      courseImg: {}, // 图片教程图片
      editIndex: 0, // 查看中的行数的index
      instrumentData: [], // 器械数据
      tableData: [{}],
      taskId: null, // 打印编号
      printShow: false,
      packageShow: false,
      show: false,
      dialogData: [], // 弹窗框数据
      ssd_packet_task_status: '',
      row: '',
      conditions: {
        statuses: ['2', '3'],
        keyword: null
      },
      totalCount: 0,
      dialogLoading: true,
      buttonLoading: false
    }
  },
  computed: {
    // 计算tableData有几条数据
    content() {
      return '共' + this.totalCount + '条数据'
    },
    // 判断视频还是图片组件
    isComponent() {
      return this.componentsList[this.activeName]
    }
  },
  watch: {
    taskId: {
      handler(newValue, oldValue) {
        this.tableData.forEach(element => {
          if (element.id === this.taskId) {
            const style = this.printForm.style
            this.printForm = JSON.parse(JSON.stringify(element))
            this.$set(this.printForm, 'taskId', element.id)
            this.$set(this.printForm, 'style', style)
          }
        })
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // 获取数据 2: "等待封包"  3: "封包中"
      api.getSubPacketPage({ statuses: ['2', '3'] }).then(response => {
        this.listLoading = true
        if (response.code === '200' && response.data.busiCode === '1') {
          console.log(response)
          this.tableData = response.data.records
          this.totalCount = response.data.totalCount
          this.ssd_packet_task_status = response.data.dictData.ssd_packet_task_status
          if (this.tableData.length !== 0) {
            this.taskId = this.tableData[0].id
          }
          this.listLoading = false
        }
      })
    },
    // 状态标签文字
    state(row) {
      const stateMap = {
        // '1': '封包完成',
        '2': '等待封包',
        '3': '正在封包，已完成' + row.packetdCount + '包',
        '4': '封包完成'
      }
      return stateMap[row.status]
    },
    // 状态的icon
    stateIcon(state) {
      const stateMap = {
        // '1': 'el-icon-success',
        '2': 'el-icon-time',
        '3': 'icon-fengbao iconfont'
      }
      return stateMap[state]
    },
    // 状态颜色
    stateColor(state) {
      const stateMap = {
        // '1': 'success-color',
        '2': 'base-color',
        '3': 'green-color'
      }
      return stateMap[state]
    },
    // 验收
    addClick(index, row) {
      this.row = row
      this.show = true
      this.$nextTick((x) => {
        this.$refs.inInputs.focus()
      })
      // 初始化当前行的包
      if (this.row.packet === undefined) {
        this.row.packet = []
      }
    },
    // 确认验收
    handleSign() {
      this.dialogData = this.row.packet
      // 发放请求
      const instanceIds = [] // 包实例id
      this.dialogData.forEach(item => {
        instanceIds.push(item.id)
      })
      if (this.dialogData.length === 0) {
        return this.$message({
          message: '输入不能为空',
          type: 'warning'
        })
      }
      this.buttonLoading = true
      // 验收请求
      api.tobundleInStorage({ subTaskId: this.row.id, instanceIds: instanceIds }).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          // 判断是完成还是封包中
          if (this.isCompleted(this.row, this.dialogData.length)) {
            this.tableData.splice([this.tableData.indexOf(this.row)], 1)
          } else {
            this.row.status = '3' // 修改状态
            this.row.packetdCount += this.dialogData.length // 封包数量添加
          }
          this.$message({
            message: '验收成功',
            type: 'success'
          })
          this.buttonLoading = false
        }
      })
      this.show = false
    },
    // 判断是否完成
    isCompleted(row, count) {
      if (row.totalPacketCount - (row.packetdCount + count) === 0) {
        return true
      } else {
        return false
      }
    },
    // 控制删除
    handleDelete(index, row) {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.row.packet.splice(index, 1)
    },
    // 检查输入id 长度
    checkInput() {
      if (this.form.id.length >= 15) {
        this.getId()
      }
    },
    // 获得焦点
    getFocus() {
      this.$refs.inInputs.focus()
    },
    // 获取包实例信息
    getId() {
      console.log(this.row)
      this.$refs.form.validate(async valid => {
        if (valid) {
          const formObj = JSON.parse(JSON.stringify(this.form))
          this.form = {}
          formObj.id = formObj.id.trim() // 去除留空
          // 判断数量
          if (this.row.totalPacketCount - this.row.packetdCount <= this.row.packet.length) {
            return this.$message({
              message: '封包数量已完成',
              type: 'warning'
            })
          }
          // 判断是否输入
          for (let i = 0; i < this.row.packet.length; i++) {
            if (this.row.packet[i].id === formObj.id) {
              return this.$message({
                message: '该包已输入',
                type: 'warning'
              })
            }
          }
          // 查询该包的信息
          api.toInstancePacket(formObj).then(response => {
            if (response.code === '200' && response.data.busiCode === '1') {
              const data = response.data.records
              if (data.length === 0) {
                return this.$message({
                  message: '请输入正确的编号',
                  type: 'error'
                })
              } else if (this.row.packetDefineId !== data[0].defineId) {
                return this.$message({
                  message: '请输入相应包的编号',
                  type: 'error'
                })
              } else if (data[0].status !== '5') {
                return this.$message({
                  type: 'error',
                  message: '该包不处于此状态,请重试'
                })
              } else {
                this.row.packet.unshift(
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
    // 获取当天日期
    // getDate() {
    //   return format('yyyy.MM.dd')
    // },
    // // 获取结束日期
    // getEndDate() {
    //   const nowDateObj = new Date()
    //   const nowTimeStem = nowDateObj.getTime()
    //   const endTimeStem = nowTimeStem + 24 * 60 * 60 * 1000 * 10
    //   const endDateObj = new Date(endTimeStem)
    //   let month = endDateObj.getMonth() + 1
    //   month = month > 10 ? month : '0' + month
    //   let day = endDateObj.getDate()
    //   day = day > 10 ? day : '0' + day
    //   const endDateStr = endDateObj.getFullYear() + '.' + month + '.' + day
    //   return endDateStr
    // },
    // 初始化数据
    print() {
      this.printShow = true
      if (this.tableData.length !== 0) {
        this.printForm = JSON.parse(JSON.stringify(this.tableData[0]))
        this.$set(this.printForm, 'taskId', this.tableData[0].id)
        this.$set(this.printForm, 'style', 1)
        console.log(this.printForm)
      }
      this.$nextTick(x => {
        this.$refs.countInputs.focus()
      })
    },
    // 确认标签打印
    printSubmit() {
      // 无数据情况
      if (this.taskId === null) {
        return this.$message({
          type: 'error',
          message: '暂无数据打印'
        })
      }
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 获取封包的包实例
          api.toPrintPacket({ packetDefineId: this.printForm.packetDefineId, count: this.printForm.totalPacketCount }).then(response => {
            if (response.code === '200' && response.data.busiCode === '1') {
              // 打印数据
              const obj = {
                name: this.printForm.packetName,
                serialNumber: this.printForm.serialNumber,
                style: this.printForm.style,
                code: response.data.instanceIds
              }
              // 获得url
              const routeUrl = this.$router.resolve({
                path: '/print/packagePrint',
                query: {
                  title: '封包标签打印',
                  data: JSON.stringify(obj)
                }
              })
              window.open(routeUrl.href, '_blank')
              this.printShow = false
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '请正确输入'
          })
        }
      })
    },
    // 封包查看按钮
    handleShow(index, row) {
      this.packageShow = true
      this.row = row
      this.editIndex = index
      this.dialogLoading = true
      // 获取当前的定义包id
      api.topacketPage({ id: this.tableData[index].packetDefineId }).then(response => {
        console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.courseImg = response.data.records[0] // 传值给组件
          // 判断有无图片
          if (response.data.records[0].images !== null) {
            this.imgSrc = this.getImgSrc(response.data.records[0].images[0].url)
          } else {
            this.imgSrc = null
          }
          this.dialogLoading = false
        }
      })
      this.dialogLoading = true
      // 获取器械
      api.toconpacketdetailPage({ packetId: row.packetDefineId }).then(response => {
        console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.dialogLoading = false
          this.instrumentData = response.data.records
        }
      })
    },
    // 器械总数
    instrumentNum(instrument) {
      let num = 0
      instrument.forEach(i => {
        num += parseInt(i.itemQuantity)
      })
      return num
    },
    // 获取图片url
    getImgSrc(imageInfo) {
      return `${APIconfig.baseUrl}/${imageInfo}`
    },
    // 图片查看关闭
    viewerClose() {
      this.imgShow = false
    },
    // 输入框改变
    contentChange(content) {
      this.$set(this.conditions, 'keyword', content)
      this.selectChange()
    },
    selectChange() {
      this.$set(this.conditions, 'pageNo', 1)
      this.listLoading = true
      api.getSubPacketPage(this.conditions).then(response => {
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
.packet-contaniner{
  padding: 30px;
  min-height: calc(100vh - 50px);
}
.second-row {
  color: #999;
}
.green-color,
.green-color:hover {
  color: #40c9c6;
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
  .defaultCourse{
    padding: 20px 0;
    border: 1px dotted rgba(175, 179, 192, 1);
    color: rgba(153,153,153,0.7);
    text-align: center;
    font-size: 50px;
    line-height: 100px;
  }
  .scrollbar {
    height:350px;
    background: #fff;
  }
}
.dialog-title-top {
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 15px;
}
.dialog-title-bottom {
  color: #999;
  font-size: 14px;
  line-height: 19px;
  margin-bottom: 8px;
}
.inline-col {
  display: inline-block;
  width: auto;
}
.dialog-title-img {
  height: 90px;
  cursor: pointer;
  border-radius: 6px;
  margin-right: 20px;
}
.dialog-main {
  padding: 20px;
}
::v-deep .el-image-viewer__wrapper {
  z-index: 2002 !important;
}
::v-deep .hidden-radio .el-radio__label {
  display: none;
}
::v-deep .el-image-viewer__wrapper {
  z-index: 2501 !important;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}

::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
}
.label-title {
  font-size: 18px;
  color: #999;
}
::v-deep .unpacking-dialog,
::v-deep .package-dialog {
  .el-dialog__header {
    height: 130px;
    padding: 20px;
  }
  .title-right-row {
    height: 90px;
    width: 100px;
    padding-top: 13px;
    background: #ececec;
    border-radius: 6px;
    border: 1px solid #d8d8d8;
    margin-left: 150px;
  }
  .right-row-num,
  .right-row-content {
    text-align: center;
  }
  .right-row-num {
    font-size: 34px;
    line-height: 45px;
  }
  .right-row-content {
    font-size: 14px;
    color: #666;
    line-height: 19px;
  }
  .dialog-main-box {
    height: 480px;
  }
}
::v-deep .package-dialog {
  .el-tabs__nav-wrap::after,
  .el-tabs__active-bar {
    display: none;
  }
  .el-tabs__item {
    padding: 0 10px;
    line-height: 28px;
  }
}
::v-deep .hidden-radio .el-radio__label {
  display: none;
}
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
.default-img {
  padding:35px 20px;
  margin-right: 20px;
  text-align:center;
  border: 1px solid rgba(155, 155, 155, 1);
}
</style>
