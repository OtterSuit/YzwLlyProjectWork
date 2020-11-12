<template>
  <div>
    <div class="table" style="padding:30px">
      <!-- 头部 -->
      <myfilters
        :title="title"
        :add-button="true"
        :back-button="true"
        addifo="新增"
        add-icon="el-icon-circle-plus-outline"
        @addClick="addClick"
      />
      <!-- 头部end -->
      <!-- table -->
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column label="缩略图" align="center">
          <template>
            <img
              style="width: 70px;cursor:pointer"
              :src="url"
              @click="imgShow=true"
            >
          </template>
        </el-table-column>
        <el-table-column
          label="许可证状态"
          prop="status"
        />
        <el-table-column
          label="许可证类别"
          prop="LicenseCategory"
        />
        <el-table-column
          label="注册号"
          prop="registration"
        />
        <el-table-column
          label="注册日期"
          prop="registrationDate"
        />
        <el-table-column
          label="到期日期"
          prop="expireDate"
        />
        <el-table-column
          label="备注"
          prop="Mark"
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
    </div>
    <!-- 许可证图片上传弹窗 -->
    <el-dialog v-el-drag-dialog title="许可证信息" :visible.sync="editShow" width="800px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="90px">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="许可证状态">
                <el-input v-model="form.status" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="许可证类别">
                <el-input v-model="form.LicenseCategory" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="注册号">
                <el-input v-model="form.registration" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="注册日期">
                <el-date-picker
                  v-model="form.registrationDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="到期日期">
                <el-date-picker
                  v-model="form.expireDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="备注">
                <el-input v-model="form.Mark" />
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
          :file-list="fileList"
          :show-file-list="true"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          class="editor-slide-upload"
          action="https://httpbin.org/post"
          list-type="picture-card"
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
      v-show="imgShow"
      :on-close="viewerClose"
      :url-list="srcList"
    />
    <!-- 图片查看器end -->
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'

export default {
  components: {
    myfilters
  },
  data() {
    return {
      url: 'http://www.wisefly.cn/images/cover/new_002.png',
      srcList: [
        'http://www.wisefly.cn/images/cover/new_002.png'
      ],
      listObj: {},
      fileList: [],
      dialogVisible: false,
      imgShow: false,
      form: {
        status: '',
        LicenseCategory: '',
        registration: '',
        registrationDate: '',
        expireDate: '',
        Mark: ''
      },
      oldForm: {},
      edit: false,
      editIndex: 0,
      editShow: false,
      tableData: [
        {
          status: '已到期',
          LicenseCategory: '许可证类别',
          registration: '13465',
          registrationDate: '2020-5-9',
          expireDate: '2020-7-12',
          Mark: ''
        },
        {
          status: '未到期',
          LicenseCategory: '许可证类别',
          registration: '13465',
          registrationDate: '2020-7-15',
          expireDate: '2025-7-15',
          Mark: ''
        }
      ],
      title: ''
    }
  },
  created() {
    this.title = this.$route.params.title
  },
  methods: {
    // 操作下拉点击
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    // 图片查看器关闭
    viewerClose() {
      this.imgShow = false
    },
    // 上传
    handleUpload() {
      this.dialogVisible = true
    },
    // 删除
    handleDelete(index, row) {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.tableData.splice(index, 1)
    },
    // 新增
    addClick() {
      this.edit = false
      this.editShow = true
      this.form = {
        status: '',
        LicenseCategory: '',
        registration: '',
        registrationDate: '',
        expireDate: '',
        Mark: ''
      }
    },
    // 新增弹窗确认按钮
    addSubmit() {
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      this.tableData.push(this.form)
      this.editShow = false
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
      this.editShow = false
      if (JSON.stringify(this.form) === JSON.stringify(this.oldForm)) {
        this.$message('无信息修改')
        return
      }
      this.$message({
        message: '修改成功',
        type: 'success'
      })
      this.tableData.splice(this.editIndex, 1, this.form)
    },
    // 查看所有图片是否上传完毕
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    // 上传按钮
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message({
          message: '请等待所有图片上传完毕',
          type: 'warning'
        })
        return false
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    // 上传成功
    handleSuccess(response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.files.file
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    // 移除上传内容
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    // 上传的动作
    beforeUpload(file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.img-main {
  padding: 30px 20px;
}
</style>

