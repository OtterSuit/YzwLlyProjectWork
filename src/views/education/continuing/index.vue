<template>
  <div style="padding:30px">
    <myfilters
      title="继续教育"
      :content="content"
      :add-button="true"
      :choose-type="true"
      :choose-date="true"
      :type-options="typeOptions"
      date-type="year"
      value-format="yyyy"
      format="yyyy年"
      @addClick="addClick"
      @dateChange="dateChange"
      @typeChange="typeChange"
    />
    <el-table v-loading="listLoading" :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column prop="educationType" label="教育类型">
        <template slot-scope="scope">
          <span v-if="scope.row.educationType===3">{{ scope.row.customTypeName }}</span>
          <span v-else>{{ typeOptions[scope.row.educationType] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="机构名称/专业" width="300">
        <template slot-scope="scope">{{ scope.row.organizationName }}：{{ scope.row.studyContent }}</template>
      </el-table-column>
      <el-table-column prop="studyTime" label="参与时间" />
      <el-table-column label="获取证书（图）">
        <template slot-scope="scope">
          <span v-if="scope.row.certificateUrl&&scope.row.certificateUrl!==''" class="picture-span" @click="imgClick(scope.$index,scope.row)">
            <i class="el-icon-picture picture" />查看证书
          </span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column width="200">
        <template slot-scope="scope">
          <el-button
            slot="reference"
            size="mini"
            icon="el-icon-edit-outline"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-popconfirm
            icon-color="red"
            title="确认删除吗"
            @onConfirm="handleDelete(scope.$index, scope.row)"
          >
            <el-button
              slot="reference"
              size="mini"
              icon="el-icon-delete"
            >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <my-pagination :total="total" methods="getEducationContinues" :conditions="conditions" />
    <el-dialog title="继续教育信息" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-row type="flex">
            <el-col :span="24">
              <el-form-item label="教育类型" prop="customTypeName">
                <el-radio-group v-model="form.educationType">
                  <el-radio v-for="(val, key) in typeOptions" :key="key" :label="+key" border>{{ val }}</el-radio>
                </el-radio-group>
                <el-input
                  v-show="form.educationType===3"
                  v-model="form.customTypeName"
                  placeholder="请输入"
                  class="type-input"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="24">
              <el-form-item label="机构名称" prop="organizationName">
                <el-input v-model="form.organizationName" placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="学习内容" prop="studyContent">
                <el-input v-model="form.studyContent" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="学习时间" prop="studyTime">
                <el-date-picker
                  v-model="form.studyTime"
                  type="date"
                  placeholder="请选择日期"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="24">
              <el-form-item label="上传证书">
                <upload-file :file-list="fileList" @handleSuccess="handleSuccess" @handleRemove="handleRemove" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-show="!edit" type="primary" @click="addSubmit">确认</el-button>
        <el-button v-show="edit" type="primary" @click="editSubmit">确认</el-button>
      </div>
    </el-dialog>
    <el-image-viewer v-if="imgShow" :on-close="viewerClose" :url-list="imageUrl" />
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import MyPagination from '@/components/MyPagination'
import UploadFile from '@/components/UploadFile'
import api from '@/api'
import APIconfig from '@/api/APIconfig'
import { notEmpty } from '@/utils'
export default {
  components: {
    myfilters, MyPagination, UploadFile
  },
  inject: ['reload'],
  data() {
    const validatePass = (rule, value, callback) => {
      if (!this.form.educationType) {
        callback(new Error('请选择教育类型'))
      } else if (this.form.educationType === 3 && !value) {
        callback(new Error('请输入其他类型名称'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        customTypeName: [
          { validator: validatePass, trigger: 'blur' }
        ],
        organizationName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        studyContent: [
          { required: true, message: '请输入学习内容', trigger: 'blur' }
        ],
        studyTime: [
          { required: true, message: '请选择学习时间', trigger: 'blur' }
        ]
      },
      imageUrl: [],
      fileList: [],
      imgShow: false,
      show: false,
      edit: false,
      editIndex: 0,
      typeOptions: {
        1: '专业进修',
        2: '学习培训',
        3: '其他类型'
      },
      tableData: [],
      form: {},
      oldForm: null,
      conditions: {
        educationType: null,
        studyTime: null
      },
      total: 0,
      listLoading: true
    }
  },
  computed: {
    content() {
      return '共' + this.total + '条数据'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getEducationContinues(this.conditions).then(response => {
        if (response.success) {
          console.log('查询继续教育', response)
          this.total = response.resData.totalItems
          this.tableData = response.resData.items
          this.listLoading = false
        }
      })
    },
    // 查看图片
    imgClick(index, row) {
      this.imageUrl = [this.imgSrc(row.certificateUrl)]
      this.imgShow = true
    },
    // 图片地址
    imgSrc(imageInfo) {
      return `${APIconfig.baseUrl}/${imageInfo}`
    },
    // 上传成功
    handleSuccess(response) {
      this.form.certificateUrl = response.resData[0].filePath
      this.fileList = [{
        url: this.imgSrc(this.form.certificateUrl)
      }]
    },
    // 移除上传内容
    handleRemove(file) {
      this.fileList = []
      this.form.certificateUrl = null
    },
    // 新增
    addClick() {
      this.edit = false
      this.form = {
        educationType: null,
        customTypeName: null,
        organizationName: null,
        studyContent: null,
        studyTime: null,
        certificateUrl: null
      }
      this.fileList = []
      this.show = true
    },
    // 新增确认
    addSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          api.postEducationContinues(this.form).then(response => {
            if (response.success) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.reload()
              this.show = false
            }
          })
        }
      })
    },
    // 编辑
    handleEdit(index, row) {
      this.fileList = []
      if (notEmpty(row.certificateUrl)) {
        this.fileList = [{
          url: this.imgSrc(row.certificateUrl)
        }]
      }
      this.form = JSON.parse(JSON.stringify(row))
      this.oldForm = JSON.parse(JSON.stringify(row))
      this.edit = true
      this.editIndex = index
      this.show = true
    },
    // 编辑确认
    editSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.show = false
          if (JSON.stringify(this.form) === JSON.stringify(this.oldForm)) {
            this.$message('无信息修改')
            return
          }
          if (this.form.educationType !== 3) {
            this.form.customTypeName = null
          }
          api.putEducationContinues(this.form).then(response => {
            if (response.success) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.tableData.splice(this.editIndex, 1, this.form)
            }
          })
        }
      })
    },
    // 删除
    handleDelete(index, row) {
      api.deleteEducationContinues({ id: row.id }).then(response => {
        if (response.success) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.reload()
        }
      })
    },
    // 头部类型筛选
    typeChange(type) {
      this.$set(this.conditions, 'educationType', type)
      this.$set(this.conditions, 'PageIndex', 1)
      this.fetchData()
    },
    // 头部日期筛选
    dateChange(date) {
      this.$set(this.conditions, 'year', date)
      this.$set(this.conditions, 'PageIndex', 1)
      this.fetchData()
    },
    viewerClose() {
      this.imgShow = false
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.picture-span {
  cursor: pointer;
}
.picture {
  margin-right: 5px;
}
::v-deep .el-radio.is-bordered {
  background: rgba(244, 244, 245, 1);
  border-radius: 3px;
  border: 1px solid rgba(233, 233, 235, 1);
  margin: 0 5px 0 0;
  .el-radio__label {
    color: #a5a7ac;
  }
}
::v-deep .el-radio__input {
  position: absolute;
  top: -5px;
  left: -4px;
  display: none;
}
::v-deep .el-radio__input.is-checked {
  display: block;
}
::v-deep
  .el-radio:focus:not(.is-focus):not(:active):not(.is-disabled)
  .el-radio__inner {
  box-shadow: none;
}
::v-deep .el-radio.is-bordered.is-checked {
  background: rgba(236, 245, 255, 1);
  border-radius: 3px;
  border: 1px solid rgba(217, 236, 255, 1);
  .el-radio__label {
    color: #47a1ff;
  }
}
::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
}
.type-input {
  width: 136px;
}
.type-input {
  position: relative;
  top: 2px;
  margin: 0 5px;
}
</style>
