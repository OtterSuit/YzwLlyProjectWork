<template>
  <div>
    <div class="table" style="padding:30px">
      <!-- 头部 -->
      <myfilters
        title="许可证信息"
        :add-button="true"
        :back-button="true"
        @addClick="addClick"
      />
      <!-- 头部end -->
      <!-- table -->
      <el-table
        v-loading="listLoading"
        :data="tableData"
        style="width: 100%"
      >
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
        <el-table-column
          label="许可证名称"
          prop="name"
        />
        <el-table-column
          label="许可证状态"
        >
          <template slot-scope="scope">
            {{ ssd_company_licence_status[scope.row.status] }}
          </template>
        </el-table-column>
        <el-table-column
          label="许可证类别"
        >
          <template slot-scope="scope">
            {{ ssd_company_licence_type[scope.row.licenceType] }}
          </template>
        </el-table-column>
        <el-table-column
          label="注册号"
          prop="registerNumber"
        />
        <el-table-column
          label="注册日期"
          prop="registerDate"
        />
        <el-table-column
          label="到期日期"
          prop="expireDate"
        />
        <el-table-column
          label="备注"
          prop="remark"
        />
        <el-table-column>
          <template slot-scope="scope">
            <el-dropdown trigger="click" class="dropdown" @command="handleCommand">
              <span class="el-dropdown-link">
                <el-button
                  size="mini"
                  icon="el-icon-s-tools"
                >操作<i class="el-icon-arrow-down el-icon--right" />
                </el-button>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  icon="el-icon-upload2"
                  class="normal-color"
                  :command="{
                    index: scope.$index,
                    row: scope.row,
                    action: 'handleUpload'
                  }"
                >上传</el-dropdown-item>
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

          </template>
        </el-table-column>
      </el-table>
      <!-- table end -->
      <my-pagination :total="totalCount" methods="toLicencePage" :conditions="conditions" />
    </div>
    <!-- 许可证图片上传弹窗 -->
    <el-dialog v-el-drag-dialog title="许可证信息" :visible.sync="editShow" width="800px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="90px" :rules="rules">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="许可证名称" prop="name">
                <el-input v-model="form.name" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="许可证状态" prop="status">
                <el-select v-model="form.status" placeholder="">
                  <el-option
                    v-for="(val, key) in ssd_company_licence_status"
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
              <el-form-item label="许可证类别" prop="licenceType">
                <el-select v-model="form.licenceType" placeholder="">
                  <el-option
                    v-for="(val, key) in ssd_company_licence_type"
                    :key="val"
                    :label="val"
                    :value="key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="注册号" prop="registerNumber">
                <el-input v-model="form.registerNumber" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="注册日期" prop="registerDate">
                <el-date-picker
                  v-model="form.registerDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="到期日期" prop="expireDate">
                <el-date-picker
                  v-model="form.expireDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                />
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
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-show="!edit" type="primary" @click="addSubmit">确认</el-button>
        <el-button v-show="edit" type="primary" @click="editSubmit">确认</el-button>
        <el-button @click="editShow=false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 许可证图片上传弹窗end -->
    <!-- 许可证新增编辑弹窗 -->
    <el-dialog v-el-drag-dialog :visible.sync="dialogVisible" title="许可证图片" width="800px">
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
          <el-button size="small" type="primary">
            点击上传
          </el-button>
        </el-upload>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
    <!-- 许可证新增编辑弹窗end -->
    <!-- 图片查看器 -->
    <el-image-viewer
      v-if="imgShow"
      :on-close="viewerClose"
      :url-list="srcList"
    />
    <!-- 图片查看器end -->
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import myPagination from '@/components/MyPagination'
import api from '@/api'
import APIconfig from '@/api/APIconfig'
import { getToken } from '@/utils/auth'
const fileURL = api.fileURL

export default {
  components: {
    myfilters, myPagination
  },
  inject: ['reload'],
  data() {
    return {
      action: fileURL,
      listLoading: true,
      rules: {
        name: [
          { required: true, message: '请输入许可证名称', trigger: 'blur' }
        ],
        licenceType: [
          { required: true, message: '请选择许可证类别', trigger: 'blur' }
        ],
        expireDate: [
          { required: true, message: '请选择到期日期', trigger: 'blur' }
        ],
        registerDate: [
          { required: true, message: '请选择注册日期', trigger: 'blur' }
        ],
        registerNumber: [
          { required: true, message: '请输入注册号', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择许可证状态', trigger: 'blur' }
        ]
      },
      srcList: [],
      fileList: [],
      dialogVisible: false,
      imgShow: false,
      form: {},
      oldForm: {},
      edit: false,
      editIndex: 0,
      editShow: false,
      tableData: [],
      id: '',
      ssd_company_licence_status: null,
      ssd_company_licence_type: null,
      totalCount: 0,
      conditions: {
        companyId: null
      }
    }
  },
  computed: {
    token() {
      const token = getToken()
      return `Bearer ${token}`
    }
  },
  created() {
    this.id = this.$route.query.id
    this.conditions.companyId = this.$route.query.id
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.toLicencePage({ companyId: this.$route.query.id }).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.totalCount = response.data.totalCount
          this.ssd_company_licence_status = response.data.dictData.ssd_company_licence_status
          this.ssd_company_licence_type = response.data.dictData.ssd_company_licence_type
          this.tableData = response.data.records
          this.listLoading = false
        }
      })
    },
    // 操作下拉点击
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
    // 图片查看器关闭
    viewerClose() {
      this.imgShow = false
    },
    // 删除
    handleDelete(index, row) {
      api.toDeletelicence(row).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.tableData.splice(index, 1)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '删除失败，请重试',
            type: 'error'
          })
        }
      })
    },
    // 新增
    addClick() {
      this.edit = false
      this.editShow = true
      this.form = {
        companyId: this.id
      }
    },
    // 新增弹窗确认按钮
    addSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          api.toAddlicence(this.form).then(response => {
            // console.log(response)
            if (response.code === '200' && response.data.busiCode === '1') {
              this.tableData.push(response.data)
              this.$message({
                message: '添加成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '添加失败，请重试',
                type: 'error'
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
    // 编辑弹窗确认按钮
    editSubmit() {
      if (JSON.stringify(this.form) === JSON.stringify(this.oldForm)) {
        this.$message('无信息修改')
        this.editShow = false
        return
      }
      this.$refs.form.validate(async valid => {
        if (valid) {
          api.toReviselicence(this.form).then(response => {
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
    // 上传
    handleUpload(index, row) {
      this.form = {
        busiId: row.id,
        busiType: '4'
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
    // 上传按钮
    handleSubmit() {
      this.reload()
      this.dialogVisible = false
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
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.img-main {
  padding: 30px 20px;
}
::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
}
::v-deep {
  .is-uploading,
  .is-ready,
  .el-list-leave,
  .el-list-enter,
  .el-list-leave-active{
    display: none;
  }
}
</style>

