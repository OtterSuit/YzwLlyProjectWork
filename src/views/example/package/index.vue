<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      title="包信息维护"
      :add-button="true"
      :search-content="true"
      placeholder="包名称/编号"
      @addClick="addClick"
      @contentChange="contentChange"
    />
    <!-- 头部end -->
    <!-- table -->
    <el-table v-loading="listLoading" :data="tableData" style="width: 100%">
      <!-- 详细 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="拼音码">
              <span>{{ props.row.spellCode }}</span>
            </el-form-item>
            <el-form-item label="五笔码">
              <span>{{ props.row.strokeCode }}</span>
            </el-form-item>
            <el-form-item label="自定义码">
              <span>{{ props.row.customCode }}</span>
            </el-form-item>
            <el-form-item label="规格">
              <span>{{ ssd_specification[props.row.spec] }}</span>
            </el-form-item>
            <el-form-item label="计量单位">
              <span>{{ ssd_measure_unit[props.row.measureUnit] }}</span>
            </el-form-item>
            <el-form-item label="包装材料">
              <span>{{ props.row.packMaterial }}</span>
            </el-form-item>
            <el-form-item label="附加费用">
              <span>{{ props.row.surcharge }}</span>
            </el-form-item>
            <el-form-item label="清洗程序">
              <span>{{ CLEAN_PROGRAM[props.row.cleanPro] }}</span>
            </el-form-item>
            <el-form-item label="灭菌程序">
              <span>{{ STERILIZE_PROGRAM[props.row.sterilizePro] }}</span>
            </el-form-item>
            <el-form-item label="灭菌方法">
              <span>{{ STERILIZE_METHOD[props.row.sterilizeMethod] }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- 详细end -->
      <el-table-column label="缩略图" align="center">
        <template slot-scope="scope">
          <img
            v-if="scope.row.images"
            style="width: 70px;cursor:pointer"
            :src="imgSrc(scope.row.images[0].url)"
            @click="imgClick(scope.$index,scope.row)"
          >
        </template>
      </el-table-column>
      <el-table-column label="包编号" prop="serialNumber" />
      <el-table-column label="包名称" prop="name" />
      <el-table-column label="所属类别">
        <template slot-scope="scope">{{ ssd_packet_category[scope.row.category] }}</template>
      </el-table-column>
      <el-table-column label="是否打包">
        <template slot-scope="scope">{{ ssd_common_boolean[scope.row.packFlag] }}</template>
      </el-table-column>
      <el-table-column label="是否清洗">
        <template slot-scope="scope">{{ ssd_common_boolean[scope.row.cleanFlag] }}</template>
      </el-table-column>
      <el-table-column label="是否灭菌">
        <template slot-scope="scope">{{ ssd_common_boolean[scope.row.sterilizeFlag] }}</template>
      </el-table-column>
      <el-table-column label="有效天数" prop="validDay">
        <template slot-scope="scope">{{ VALID_PERIOD[scope.row.validDay] }}</template>
      </el-table-column>
      <el-table-column label="标签大小" prop="tagSize">
        <template slot-scope="scope">{{ BARCODE_TYPE[scope.row.tagSize] }}</template>
      </el-table-column>
      <el-table-column label="备注" prop="remark" width="180" />
      <el-table-column width="240">
        <template slot-scope="scope">
          <el-dropdown trigger="click" class="dropdown" @command="handleCommand">
            <span class="el-dropdown-link">
              <el-button size="mini" icon="el-icon-s-tools">
                操作
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                icon="el-icon-tickets"
                class="normal-color"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleDetails'
                }"
              >明细</el-dropdown-item>
              <el-dropdown-item
                icon="el-icon-edit-outline"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleEdit'
                }"
              >编辑</el-dropdown-item>
              <el-dropdown-item
                class="error-color"
                icon="el-icon-delete"
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleDelete'
                }"
              >删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown trigger="click" class="dropdown" @command="handleCommand">
            <span class="el-dropdown-link">
              <el-button size="mini" icon="el-icon-upload2">
                上传
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handleUpload'
                }"
              >包图片</el-dropdown-item>
              <el-dropdown-item
                :command="{
                  index: scope.$index,
                  row: scope.row,
                  action: 'handlePackage'
                }"
              >封包教程</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <my-pagination :total="totalCount" methods="topacketPage" :conditions="conditions" />
    <!-- table end -->
    <!-- 新增包弹窗 -->
    <el-dialog v-el-drag-dialog title="包信息" :visible.sync="editShow" width="800px">
      <div class="dialog-main">
        <el-scrollbar>
          <el-form
            ref="form"
            :model="form"
            label-width="90px"
            class="scrollbar-form"
            :rules="rules"
          >
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-form-item label="包编号" prop="serialNumber">
                  <el-input v-model="form.serialNumber" />
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="包名称" prop="name">
                  <el-input v-model="form.name" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-form-item label="包所属类别" prop="category">
                  <el-select v-model="form.category" placeholder>
                    <el-option
                      v-for="(val, key) in ssd_packet_category"
                      :key="val"
                      :label="val"
                      :value="key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="是否打包" prop="packFlag">
                  <el-radio-group v-model="form.packFlag">
                    <el-radio
                      v-for="(val, key) in ssd_common_boolean"
                      :key="val"
                      :label="key"
                    >{{ val }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-form-item label="是否清洗" prop="cleanFlag">
                  <el-radio-group v-model="form.cleanFlag">
                    <el-radio
                      v-for="(val, key) in ssd_common_boolean"
                      :key="val"
                      :label="key"
                    >{{ val }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="是否灭菌" prop="sterilizeFlag">
                  <el-radio-group v-model="form.sterilizeFlag">
                    <el-radio
                      v-for="(val, key) in ssd_common_boolean"
                      :key="val"
                      :label="key"
                    >{{ val }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-form-item label="有效天数" prop="validDay">
                  <el-select v-model="form.validDay" placeholder>
                    <el-option
                      v-for="(val, key) in VALID_PERIOD"
                      :key="val"
                      :label="val"
                      :value="key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="标签大小" prop="tagSize">
                  <el-select v-model="form.tagSize" placeholder>
                    <el-option
                      v-for="(val, key) in BARCODE_TYPE"
                      :key="val"
                      :label="val"
                      :value="key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-form-item label="拼音码">
                  <el-input v-model="form.spellCode" />
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="五笔码">
                  <el-input v-model="form.strokeCode" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-form-item label="自定义码">
                  <el-input v-model="form.customCode" />
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="规格">
                  <el-select v-model="form.spec" placeholder>
                    <el-option
                      v-for="(val, key) in ssd_specification"
                      :key="val"
                      :label="val"
                      :value="key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-form-item label="计量单位">
                  <el-select v-model="form.measureUnit" placeholder>
                    <el-option
                      v-for="(val, key) in ssd_measure_unit"
                      :key="val"
                      :label="val"
                      :value="key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="包装材料">
                  <el-input v-model="form.packMaterial" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-form-item label="附加费用">
                  <el-input v-model="form.surcharge" />
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="清洗程序">
                  <el-select v-model="form.cleanPro" placeholder>
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
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-form-item label="灭菌程序">
                  <el-select v-model="form.sterilizePro" placeholder>
                    <el-option
                      v-for="(val, key) in STERILIZE_PROGRAM"
                      :key="val"
                      :label="val"
                      :value="key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="灭菌方法">
                  <el-select v-model="form.sterilizeMethod" placeholder>
                    <el-option
                      v-for="(val, key) in STERILIZE_METHOD"
                      :key="val"
                      :label="val"
                      :value="key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注">
                  <el-input v-model="form.remark" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-show="!edit" type="primary" @click="addSubmit">确认</el-button>
        <el-button v-show="edit" type="primary" @click="editSubmit">确认</el-button>
        <el-button type="bgc" @click="editShow=false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 新增包弹窗end -->
    <!-- 上传图片弹窗 -->
    <el-dialog v-el-drag-dialog :visible.sync="dialogVisible" title="包图片" width="800px">
      <div class="dialog-main img-main">
        <el-upload
          :multiple="true"
          :show-file-list="true"
          accept=".jpg, .jpeg, .png, .gif"
          :headers="{Authorization:token}"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList"
          :before-upload="beforeUpload"
          class="editor-slide-upload"
          :action="action"
          list-type="picture-card"
          name="files"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
    <!-- 上传图片弹窗end -->
    <!-- 上传图片弹窗 -->
    <el-dialog v-el-drag-dialog :visible.sync="packageVisible" title="封包指引教程" width="800px">
      <div class="dialog-main package-main">
        <div class="dialog-main-box">
          <el-tabs v-model="activeName" style="height:40px" @tab-click="tabsChange">
            <el-tab-pane label="图片教程" name="packageImage" />
            <el-tab-pane label="视频教程" name="packageVideo" />
          </el-tabs>
          <transition name="fade-transform" mode="out-in">
            <component :is="isComponent" style="margin-top:10px" :file-list="fileList" :form="form" @formChange="formChange" />
          </transition>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="packageVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
    <!-- 上传图片弹窗end -->
    <!-- 图片查看器 -->
    <el-image-viewer v-if="imgShow" :on-close="viewerClose" :url-list="srcList" />
    <!-- 图片查看器end -->
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import myPagination from '@/components/MyPagination'
import api from '@/api'
import APIconfig from '@/api/APIconfig'
import { getToken } from '@/utils/auth'
import packageImage from './packageImage'
import packageVideo from './packageVideo'
const fileURL = api.fileURL

export default {
  components: {
    myfilters,
    myPagination,
    packageImage,
    packageVideo
  },
  inject: ['reload'],
  data() {
    return {
      action: fileURL,
      listLoading: true,
      rules: {
        name: [{ required: true, message: '请输入包名称', trigger: 'blur' }],
        category: [
          { required: true, message: '请选择包所属类别', trigger: 'blur' }
        ],
        cleanFlag: [
          { required: true, message: '请选择是否清洗', trigger: 'blur' }
        ],
        packFlag: [
          { required: true, message: '请选择是否打包', trigger: 'blur' }
        ],
        serialNumber: [
          { required: true, message: '请输入消毒包编号', trigger: 'blur' }
        ],
        sterilizeFlag: [
          { required: true, message: '请选择是否灭菌', trigger: 'blur' }
        ],
        tagSize: [
          { required: true, message: '请选择标签大小', trigger: 'blur' }
        ],
        validDay: [
          { required: true, message: '请输入有效天数', trigger: 'blur' }
        ]
      },
      srcList: [],
      fileList: [],
      dialogVisible: false,
      tableData: [],
      form: {},
      oldForm: {},
      edit: false,
      editIndex: 0,
      editShow: false,
      imgShow: false,
      ssd_common_boolean: null,
      ssd_measure_unit: null,
      ssd_packet_category: null,
      ssd_specification: null,
      CLEAN_PROGRAM: null,
      STERILIZE_METHOD: null,
      STERILIZE_PROGRAM: null,
      VALID_PERIOD: null,
      BARCODE_TYPE: null,
      totalCount: 0,
      conditions: {},
      packageVisible: false,
      // 打包教程类型
      componentsList: {
        packageImage: 'packageImage',
        packageVideo: 'packageVideo'
      },
      activeName: 'packageImage',
      row: null
    }
  },
  computed: {
    token() {
      const token = getToken()
      return `Bearer ${token}`
    },
    // 判断视频还是图片组件
    isComponent() {
      return this.componentsList[this.activeName]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.topacketPage().then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.totalCount = response.data.totalCount
          this.ssd_common_boolean = response.data.dictData.ssd_common_boolean
          this.ssd_measure_unit = response.data.dictData.ssd_measure_unit
          this.ssd_packet_category = response.data.dictData.ssd_packet_category
          this.ssd_specification = response.data.dictData.ssd_specification
          this.tableData = response.data.records
          this.listLoading = false
        }
      })
      api
        .toconstanttypeBatch({
          constantCodes: [
            'CLEAN_PROGRAM',
            'STERILIZE_METHOD',
            'STERILIZE_PROGRAM',
            'VALID_PERIOD',
            'BARCODE_TYPE'
          ]
        })
        .then(response => {
          // console.log(response)
          if (response.code === '200' && response.data.busiCode === '1') {
            this.CLEAN_PROGRAM = response.data.constantsDetail.CLEAN_PROGRAM
            this.STERILIZE_METHOD =
              response.data.constantsDetail.STERILIZE_METHOD
            this.STERILIZE_PROGRAM =
              response.data.constantsDetail.STERILIZE_PROGRAM
            this.VALID_PERIOD = response.data.constantsDetail.VALID_PERIOD
            this.BARCODE_TYPE = response.data.constantsDetail.BARCODE_TYPE
          }
        })
    },
    // 图片查看器关闭
    viewerClose() {
      this.imgShow = false
    },
    // 操作下拉的点击
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    imgSrc(imageInfo) {
      return `${APIconfig.baseUrl}/${imageInfo}`
    },
    imgClick(index, row) {
      this.srcList = []
      row.images.forEach(item => {
        this.srcList.push(this.imgSrc(item.url))
      })
      this.imgShow = true
    },
    // 上传
    handleUpload(index, row) {
      this.form = {
        busiId: row.id,
        busiType: '2'
      }
      this.fileList = []
      if (row.images) {
        row.images.forEach((item, index) => {
          const img = {
            uid: item.id,
            url: this.imgSrc(item.url)
          }
          this.fileList.push(img)
        })
      }
      this.dialogVisible = true
    },
    tabsChange() {
      this.getTabsInfo(this.row)
    },
    handlePackage(index, row) {
      this.row = row
      this.getTabsInfo(row)
      this.packageVisible = true
    },
    getTabsInfo(row) {
      if (this.activeName === 'packageImage') {
        this.form = {
          busiId: row.id,
          busiType: '6'
        }
        this.fileList = []
        if (row.imagesCourse) {
          row.imagesCourse.forEach((item, index) => {
            const img = {
              uid: item.id,
              url: this.imgSrc(item.url)
            }
            this.fileList.push(img)
          })
        }
      } else {
        this.form = {
          busiId: row.id,
          busiType: '7'
        }
        // this.fileList = row.videosCourse
        this.fileList = []
        this.fileList.push(row.videosCourse)
        // this.fileList.push('/upload/20201016/2020101615420408467432.mp4')
        console.log(this.fileList)
      }
    },
    // 上传弹窗确认按钮
    handleSubmit() {
      this.reload()
      this.dialogVisible = false
    },
    formChange(form) {
      this.form = form
    },
    // 上传成功
    handleSuccess(response, file) {
      if (!response.success) {
        return this.$message.error(response.errMsg)
      }
      this.form.imageInfo = response.resData[0].filePath
      api.toPostImage(this.form).then(res => {
        file.uid = res.data.id
        if (res.code === '200' && res.data.busiCode === '1') {
          // this.fileList.push(res.data)
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        }
      })
    },
    // 移除上传内容
    handleRemove(file) {
      api.deleteImage({ id: file.uid }).then(res => {
        if (res.code === '200' && res.data.busiCode === '1') {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    // 上传的动作
    beforeUpload(file) {
      const typeCheck = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!typeCheck) {
        this.$message.error('上传图片只支持 JPG 或PNG 格式!')
        return new Promise((resolve, reject) => {
          reject(false)
        })
      }
    },
    // 查看明细
    handleDetails(index, row, box) {
      this.$router.push({
        name: 'packageDetails',
        query: {
          packetId: row.id
        }
      })
    },
    // 删除
    handleDelete(index, row) {
      api.toDeletepacket(row).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.tableData.splice(index, 1)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    // 新增
    addClick() {
      this.edit = false
      this.editShow = true
      this.form = {}
    },
    // 新增弹窗确认按钮
    addSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          api.toAddpackett(this.form).then(response => {
            if (response.code === '200' && response.data.busiCode === '1') {
              this.tableData.push(response.data)
              this.$message({
                message: '添加成功',
                type: 'success'
              })
            }
          })
          this.editShow = false
        } else {
          this.$message({
            message: '请按要求填写',
            type: 'warning'
          })
        }
      })
    },
    // 编辑
    handleEdit(index, row) {
      this.edit = true
      this.editShow = true
      this.form = JSON.parse(JSON.stringify(row))
      this.oldForm = JSON.parse(JSON.stringify(row))
      this.editIndex = index
    },
    // 编辑确认
    editSubmit() {
      if (JSON.stringify(this.form) === JSON.stringify(this.oldForm)) {
        this.$message('无信息修改')
        this.editShow = false
        return
      }
      this.$refs.form.validate(async valid => {
        if (valid) {
          api.toRevisepacket(this.form).then(response => {
            // console.log(response)
            if (response.code === '200' && response.data.busiCode === '1') {
              this.tableData.splice(this.editIndex, 1, response.data)
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            }
          })
          this.editShow = false
        } else {
          this.$message({
            message: '请按要求填写',
            type: 'warning'
          })
        }
      })
    },
    contentChange(content) {
      this.$set(this.conditions, 'keyword', content)
      this.$set(this.conditions, 'pageNo', 1)
      this.listLoading = true
      api.topacketPage(this.conditions).then(response => {
        // console.log(response)
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
::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
}
::v-deep .demo-table-expand .el-form-item__label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 25%;
}
.dialog-main {
  padding: 0;
}
.package-main,
.img-main {
  padding: 20px 20px;
  .dialog-main-box {
    position: relative;
    background: rgba(246, 246, 246, 1);
    border: 1px dotted rgba(175, 179, 192, 1);
    padding: 20px 25px;
  }
}
::v-deep {
  .is-uploading,
  .is-ready,
  .el-list-leave,
  .el-list-enter,
  .el-list-leave-active {
    display: none;
  }
}
.dropdown {
  margin-right: 5px;
}
::v-deep .package-main {
  .el-tabs__nav-wrap::after {
    display: none;
  }
  .el-tabs__item {
    font-size: 18px;
  }
  .el-tabs__active-bar {
    height: 3px;
  }
  .children-code {
    float: right;
    color: #AFB3C0;
  }
}
</style>
