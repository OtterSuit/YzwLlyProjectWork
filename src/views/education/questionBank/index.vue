<template>
  <div style="padding:30px">
    <myfilters
      title="题库管理"
      :content="content"
      :add-button="true"
      addifo="新建题库"
      :search-content="true"
      placeholder="题库名称"
      @contentChange="contentChange"
      @addClick="addClick"
    >
      <template #extent2>
        <el-button type="grey" icon="el-icon-download" style="margin-left:5px" @click="downloadTemplate">试题模板</el-button>
        <el-button type="goon" icon="el-icon-upload2" @click="importDialog=true">导入试题</el-button>
      </template>
    </myfilters>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        label="序号"
        type="index"
        width="100"
      />
      <el-table-column
        label="题库名称"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-input v-model="scope.row.name" maxlength="6" placeholder="请输入题库名称" />
            <i class="el-icon-circle-check table-edit" @click="editSubmit(scope.row)" />
          </div>
          <div v-else>
            {{ scope.row.name }}<i class="el-icon-edit-outline table-edit" @click="titleEdit(scope.row)" />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="单选题量"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.hasSingle" class="question-span" @click="qShow(scope.row,1)">{{ scope.row.singleCount }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        label="多选题量"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.hasMultiple" class="question-span" @click="qShow(scope.row,2)">{{ scope.row.multipleCount }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        label="问答题量"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.hasQA" class="question-span" @click="qShow(scope.row,3)">{{ scope.row.qaCount }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.hasSingle||scope.row.hasMultiple||scope.row.hasQA"
            size="mini"
            class="table-button"
            @click="handleAdd(scope.$index, scope.row)"
          >
            <i class="el-icon-circle-plus-outline" /> 添加试题
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <my-pagination :total="total" methods="getQuestionBanks" :conditions="conditions" />
    <el-dialog title="新增题库" :visible.sync="show" width="800px">
      <div class="dialog-main add-dialog">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-row type="flex">
            <el-col :span="24">
              <el-form-item label="题库名称" prop="name">
                <el-input
                  v-model="form.name"
                  maxlength="6"
                  placeholder="请输入题库名称"
                >
                  <span slot="suffix">6字符以内</span>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="24">
              <el-form-item label="考试项目" prop="has">
                <el-checkbox-group v-model="form.has">
                  <el-checkbox label="hasSingle">单选题</el-checkbox>
                  <el-checkbox label="hasMultiple">多选题</el-checkbox>
                  <el-checkbox label="hasQA">问答题</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="show=false">取消</el-button>
        <el-button type="primary" @click="addSubmit">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加试题" :visible.sync="add" width="800px">
      <div class="dialog-main add-dialog">
        <el-form ref="addform" :model="addform" label-width="80px" :rules="rules">
          <el-row type="flex">
            <el-col :span="24">
              <el-form-item label="试题类型" prop="itemType">
                <el-radio-group v-model="addform.itemType">
                  <div v-for="(val,key) in itemType" :key="key" class="question-type">
                    <el-radio v-if="addform[val.show]" :label="+key">{{ val.name }}</el-radio>
                  </div>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="24">
              <el-form-item label="题目" prop="itemName">
                <el-input
                  v-model="addform.itemName"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if="addform.itemType===1||addform.itemType===2">
            <el-row v-for="(item,inedx) in options" :key="inedx" type="flex" :gutter="20">
              <el-col :span="20">
                <el-form-item
                  :label="item.name"
                  :prop="item.model"
                  :rules="{
                    required: true, message: '请输入选项', trigger: 'blur'
                  }"
                >
                  <el-input
                    v-model="addform[item.model]"
                    placeholder="请输入"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-radio v-if="addform.itemType===1" v-model="addform.reference" :label="item.label">设为答案</el-radio>
                <el-checkbox v-if="addform.itemType===2" v-model="addform.reference" :label="item.label">设为答案</el-checkbox>
              </el-col>
            </el-row>
          </div>
          <div v-else-if="addform.itemType===3">
            <el-row>
              <el-col :span="24">
                <el-form-item label="参考答案" prop="reference">
                  <el-input
                    v-model="addform.reference"
                    placeholder="请输入"
                    :autosize="{ minRows: 10}"
                    resize="none"
                    type="textarea"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="add=false">取消</el-button>
        <el-button type="primary" @click="addQueSubmit">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="导入试题" :visible.sync="importDialog" width="800px">
      <div class="dialog-main import-dialog">
        <el-form ref="importform" :model="importform" label-width="80px" :rules="rules">
          <el-row type="flex">
            <el-col :span="24">
              <el-form-item label="题库" prop="id">
                <remote-select remote-placeholder="请输入题库名称" methods="getQuestionBanks" query-key="name" label="name" @remoteChange="remoteChange" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="24">
              <el-form-item label="试题文件">
                <el-upload
                  ref="upload"
                  :limit="1"
                  :show-file-list="true"
                  :file-list="fileList"
                  accept=".xlsx"
                  :headers="{Authorization:token}"
                  :on-success="handleSuccess"
                  :before-upload="beforeUpload"
                  class="avatar-uploader"
                  :action="action"
                  :auto-upload="false"
                  name="files"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">请下载试题模板，并根据模板要求填写上传</div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="importDialog=false">取消</el-button>
        <el-button type="primary" @click="importSubmit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import RemoteSelect from '@/components/RemoteSelect'
import myfilters from '@/components/myfilters'
import MyPagination from '@/components/MyPagination'
import api from '@/api'
import { getToken } from '@/utils/auth'

export default {
  components: {
    myfilters, MyPagination, RemoteSelect
  },
  inject: ['reload'],
  data() {
    return {
      action: '',
      importform: {
        id: null
      },
      total: 0,
      rules: {
        name: [
          { required: true, message: '请输入题库名称', trigger: 'blur' }
        ],
        has: [
          { type: 'array', required: true, message: '请至少选择一种考试项目', trigger: 'change' }
        ],
        itemType: [
          { required: true, message: '请选择试题类型', trigger: 'blur' }
        ],
        itemName: [
          { required: true, message: '请输入题目', trigger: 'blur' }
        ],
        reference: [
          { required: true, message: '请输入参考答案', trigger: 'blur' }
        ],
        id: [
          { required: true, message: '请输入题库名称', trigger: 'blur' }
        ]
      },
      listLoading: true,
      fileList: [],
      importDialog: false,
      tableData: [],
      itemType: {
        1: { name: '单选题', show: 'hasSingle', count: 'singleCount' },
        2: { name: '多选题', show: 'hasMultiple', count: 'multipleCount' },
        3: { name: '问答题', show: 'hasQA', count: 'qaCount' }
      },
      options: [
        {
          name: '选项A',
          model: 'optionA',
          label: 'A'
        },
        {
          name: '选项B',
          model: 'optionB',
          label: 'B'
        },
        {
          name: '选项C',
          model: 'optionC',
          label: 'C'
        },
        {
          name: '选项D',
          model: 'optionD',
          label: 'D'
        }
      ],
      form: {},
      addform: {},
      title: '',
      show: false,
      add: false,
      addIndex: 0,
      conditions: {
        name: null
      }
    }
  },
  computed: {
    content() {
      return '共' + this.total + '条数据'
    },
    token() {
      const token = getToken()
      return `Bearer ${token}`
    }
  },
  watch: {
    'addform.itemType': {
      handler(val) {
        this.addform.reference = null
        if (val === 2) {
          this.addform.reference = []
        }
        if (val === 1) {
          this.addform.reference = 'A'
        }
      }
    },
    'importform.id': {
      handler(val) {
        this.action = api.postImportQuestionBanks(val)
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getQuestionBanks(this.conditions).then(response => {
        if (response.success) {
          console.log('查看题库列表', response)
          this.total = response.resData.totalItems
          this.tableData = response.resData.items
          this.listLoading = false
        }
      })
    },
    // 修改标题
    titleEdit(row) {
      this.$set(row, 'edit', true)
    },
    // 确认修改标题
    editSubmit(row) {
      const params = {
        id: row.id,
        name: row.name
      }
      api.putQuestionName(params).then(response => {
        if (response.success) {
          row.edit = false
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
        }
      })
    },
    // 新增题库
    addClick() {
      this.show = true
      this.form = {
        name: '',
        singleCount: 0,
        multipleCount: 0,
        qaCount: 0,
        has: []
      }
    },
    // 新增题库确认
    addSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.hasSingle = this.form.has.includes('hasSingle')
          this.form.hasMultiple = this.form.has.includes('hasMultiple')
          this.form.hasQA = this.form.has.includes('hasQA')
          api.postQuestionBanks(this.form).then(response => {
            if (response.success) {
              this.reload()
              this.$message({
                message: '新建题库成功',
                type: 'success'
              })
              this.show = false
            }
          })
        }
      })
    },
    // 添加试题
    handleAdd(index, row) {
      this.add = true
      this.addIndex = index
      this.addform = {
        id: row.id,
        itemType: null,
        itemName: null,
        optionA: null,
        optionB: null,
        optionC: null,
        optionD: null,
        reference: null,
        hasSingle: row.hasSingle,
        hasMultiple: row.hasMultiple,
        hasQA: row.hasQA
      }
    },
    // 添加试题确认
    addQueSubmit() {
      this.$refs.addform.validate((valid) => {
        if (valid) {
          if (this.addform.itemType === 2) {
            if (this.addform.reference.length < 2) {
              this.$message({
                message: '多选题答案数量必须大于1',
                type: 'warning'
              })
              return
            } else {
              this.addform.reference = this.addform.reference.join('')
            }
          }
          this.add = false
          api.postQuestionDetails(this.addform).then(response => {
            if (response.success) {
              const count = this.itemType[this.addform.itemType].count
              this.tableData[this.addIndex][count] += 1
              this.$message({
                message: '添加试题成功',
                type: 'success'
              })
            }
          })
        }
      })
    },
    // 头部搜索输入
    contentChange(content) {
      this.$set(this.conditions, 'name', content)
      this.$set(this.conditions, 'PageIndex', 1)
      this.fetchData()
    },
    // 试题模板
    downloadTemplate() {
      import('@/vendor/Export2Excel').then(excel => {
        const style = {
          border: {
            top: {
              style: 'thin'
            },
            bottom: {
              style: 'thin'
            },
            left: {
              style: 'thin'
            },
            right: {
              style: 'thin'
            }
          },
          alignment: {
            // horizontal: "center",
            vertical: 'center'
          }
        }
        const styleRight = {
          font: {
            color: { rgb: 'ff0000' }
          },
          border: {
            left: {
              style: 'thin'
            }
          },
          alignment: {
            // horizontal: "center",
            vertical: 'center'
          }
        }
        const header = ['试题类型', '题目', '选项A', '选项B', '选项C', '选项D', '答案', '填写规则：1.试题类型：1-单选题 2-多选题 3-问答题']
        excel.export_json_to_excel({
          header,
          data: [
            ['1', '题目（必填）', '选项A（必填）', '选项B（必填）', ' 选项C（必填）', '选项D（必填）', '答案（必填），例：A', '                    2.选项A-D：单选题、多选题选项A-D必填，问答题不填'],
            ['2', '题目（必填）', '选项A（必填）', '选项B（必填）', ' 选项C（必填）', '选项D（必填）', '答案（必填），例：ABCD', '                    3.单选题答案：填A/B/C/D（大写）'],
            ['3', '题目（必填）', '（非必填）', '（非必填）', '（非必填）', '（非必填）', '答案（必填）', '                    4.多选题答案：将答案拼接起来，如ABC（大写）'],
            ['', '', '', '', '', '', '', '                    5.导入时请删除样例']
          ],
          filename: '题库管理-试题导入模板',
          style: {
            '!cols': [{ wch: 30 }, { wch: 30 }, { wch: 30 }, { wch: 30 }, { wch: 30 }, { wch: 30 }, { wch: 30 }, { wch: 50 }],
            A1: style,
            B1: style,
            C1: style,
            D1: style,
            E1: style,
            F1: style,
            G1: style,
            H1: styleRight,
            H2: styleRight,
            H3: styleRight,
            H4: styleRight,
            H5: styleRight
          },
          color: 'ff0000'
        })
      })
    },
    // 题库名称模糊查询
    remoteChange(remote) {
      this.importform.id = remote
    },
    // 导入试题确定
    importSubmit() {
      this.$refs.importform.validate((valid) => {
        if (valid) {
          this.$refs.upload.submit()
        }
      })
      // this.importDialog = false
      // api.postImportQuestionBanks(this.importform).then(response => {
      //   console.log(response)
      //   if (response.success) {
      //     this.$message({
      //       message: '导入成功',
      //       type: 'success'
      //     })
      //     this.reload()
      //   }
      // })
    },
    // 上传前
    beforeUpload(file) {
      console.log(file)
      const typeCheck = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      if (!typeCheck) {
        this.$message.error('仅支持xlsx格式文件')
        return new Promise((resolve, reject) => {
          reject(false)
        })
      }
    },
    // 上传成功
    handleSuccess(response, file) {
      if (!response.success) {
        this.fileList = []
        return this.$message.error(response.errMsg)
      }
      this.importDialog = false
      this.importform = {}
      this.fileList = []
    },
    // 题目查看
    qShow(row, type) {
      this.$router.push({
        name: 'questionDetails',
        params: {
          id: row.id,
          type: type,
          title: row.name
        }
      })
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.table-button,.cancel-button {
  color: rgba(64,158,255,1);
  border:1px solid rgba(64,158,255,1);
}
.table-edit {
  display: none;
  cursor: pointer;
}
::v-deep .el-table__row:hover .cell {
  color: #409EFF;
}
::v-deep .el-table__row:hover .table-edit {
  display: inline-block;
}
::v-deep .el-table__row {
  height: 55.2px;
}
.question-span {
  cursor: pointer;
}
::v-deep .cell .el-input{
  width: 80%;
}
 ::v-deep .cell .el-input__inner {
    height: 30px;
  }
::v-deep .el-table th, .el-table tr{
  height: 55px;
}
::v-deep .el-input__suffix {
  right: 12px;
  color: #999;
  font-size: 12px;
}
.add-dialog {
  height: 220px;
}
::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
}
::v-deep .add-dialog {
  height: 420px;
  .el-col-4 {
    line-height: 40px;
  }
}
.question-type {
  display: inline-block;
  margin-right: 10px;
}
::v-deep .el-textarea__inner {
  padding: 7px 15px;
}
::v-deep .el-upload__tip {
  margin-bottom: 0;
  line-height: 20px;
}
.import-dialog {
  height: 240px;
}
</style>
