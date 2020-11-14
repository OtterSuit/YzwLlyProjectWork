<template>
  <div style="padding:30px">
    <!-- <h3>岗位变动</h3> -->
    <!-- 添加表格上方过滤条件 -->
    <myfilters
      ref="myfilters"
      title="岗位变动"
      :add-button="true"
      :search-name="true"
      :choose-department="true"
      @addClick="addClick"
      @departmentChange="departmentChange"
      @nameChange="nameChange"
    />
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="realName"
        label="姓名"
        width="100"
      />
      <el-table-column
        prop="jobNum"
        label="工号"
        width="150"
      />
      <el-table-column
        label="原岗位"
      >
        <template slot-scope="scope">
          {{ scope.row.originalDepartment }}
          <span class="second-row" style="margin-left:10px">{{ jobDict(scope.row.originalJobPost) }}</span><br>
          <span class="second-row">{{ scope.row.originalStartTime }}至{{ scope.row.originalEndTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="现岗位"
      >
        <template slot-scope="scope">
          {{ scope.row.currentDepartment }}
          <span class="second-row" style="margin-left:10px">{{ jobDict(scope.row.currentJobPost) }}</span><br>
          <span class="second-row">{{ scope.row.currentStartTime }}至今</span>
        </template>
      </el-table-column>
      <el-table-column
        label="预转出岗位"
      >
        <template slot-scope="scope">
          {{ scope.row.transferDepartment }}
          <span class="second-row" style="margin-left:10px">{{ jobDict(scope.row.transferJobPost) }}</span><br>
          <span class="second-row">{{ scope.row.transferTime }}</span>
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
    <!-- <div style="text-align:center;margin-top:10px">
      <el-pagination
        class="page"
        :page-size="pageSize"
        :pager-count="5"
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange"
      />
    </div> -->
    <my-pagination :total="total" methods="getPostChange" :conditions="conditions" />
    <el-dialog title="岗位变动信息" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="姓名" prop="realName">
                <el-input v-model="form.realName" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="工号" prop="jobNum">
                <el-input v-model.number="form.jobNum" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="原科室" prop="originalDepartmentId">
                <remote-select methods="getOrganizes" @remoteChange="remoteChange($event,'originalDepartmentId')" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="原岗位" prop="originalJobPost">
                <el-input v-model="form.originalJobPost" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="任职开始时间" prop="originalStartTime">
                <el-date-picker
                  v-model="form.originalStartTime"
                  :clearable="false"
                  type="date"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="任职结束时间" prop="originalEndTime">
                <el-date-picker
                  v-model="form.originalEndTime"
                  :clearable="false"
                  type="date"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="现科室" prop="currentDepartmentId">
                <remote-select methods="getOrganizes" @remoteChange="remoteChange($event,'currentDepartmentId')" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="现岗位" prop="currentJobPost">
                <el-input v-model="form.currentJobPost" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="任职开始时间" prop="currentStartTime">
                <el-date-picker
                  v-model="form.currentStartTime"
                  :clearable="false"
                  type="date"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="预转出科室" prop="transferDepartmentId">
                <remote-select methods="getOrganizes" @remoteChange="remoteChange($event,'transferDepartmentId')" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="预转出岗位" prop="transferJobPost">
                <el-input v-model="form.transferJobPost" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="预转出时间" prop="transferTime">
                <el-date-picker
                  v-model="form.transferTime"
                  :clearable="false"
                  type="date"
                  value-format="yyyy-MM-dd"
                />
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
  </div>
</template>

<script>
import RemoteSelect from '@/components/RemoteSelect'
import myfilters from '@/components/myfilters'
import MyPagination from '@/components/MyPagination'

import api from '@/api'
export default {
  components: {
    myfilters, MyPagination, RemoteSelect
  },
  data() {
    return {
      total: 100,
      pageSize: 20,
      show: false,
      edit: false,
      editIndex: 0,
      oldTable: [],
      tableData: [],
      table: [],
      form: {
        name: '',
        date: '',
        Odepartment: '',
        Ndepartment: '',
        Opost: '',
        Npost: '',
        certifier: '',
        phone: ''
      },
      oldForm: null,
      jobOptions: {
        1: '护士',
        2: '护士长',
        3: '护理部主任'
      },
      conditions: {
        departmentId: null,
        fullName: null
      },
      listLoading: true,
      rules: {
        realName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        jobNum: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        originalDepartmentId: [
          { required: true, message: '请输入原科室', trigger: 'blur' }
        ],
        originalJobPost: [
          { required: true, message: '请输入原岗位', trigger: 'blur' }
        ],
        originalStartTime: [
          { required: true, message: '请选择任职开始时间', trigger: 'blur' }
        ],
        originalEndTime: [
          { required: true, message: '请选择任职结束时间', trigger: 'blur' }
        ],
        currentDepartmentId: [
          { required: true, message: '请输入现科室', trigger: 'blur' }
        ],
        currentJobPost: [
          { required: true, message: '请输入现岗位', trigger: 'blur' }
        ],
        currentStartTime: [
          { required: true, message: '请选择任职开始时间', trigger: 'blur' }
        ],
        transferDepartmentId: [
          { required: true, message: '请输入预转出科室', trigger: 'blur' }
        ],
        transferJobPost: [
          { required: true, message: '请输入预转出岗位', trigger: 'blur' }
        ],
        transferTime: [
          { required: true, message: '请选择预转出时间', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getPostChange(this.conditions).then(response => {
        console.log(response)
        if (response.success) {
          this.total = response.resData.totalItems
          this.tableData = response.resData.items
          this.listLoading = false
        }
      })
    },
    // 题库名称模糊查询
    remoteChange(remote, str) {
      this.form[str] = remote
    },
    async getPostChange() {
      const res = api.getPostChange()
      console.log(res)
    },
    // 分页
    currentChange(page) {
      this.tableData = this.table.slice((page - 1) * this.pageSize, page * this.pageSize)
    },
    searchClick(select) {
      if (select.name === '') {
        this.table = JSON.parse(JSON.stringify(this.oldTable))
        this.total = this.oldTable.length
        this.tableData = this.table.slice(0, this.pageSize)
        return
      }
      const arr = []
      this.oldTable.forEach(item => {
        if (item.name === select.name) {
          arr.push(item)
        }
      })
      if (arr.length === 0) {
        this.$refs.myfilters.select.name = ''
        this.$message({
          message: '不存在用户',
          type: 'warning'
        })
      } else {
        this.total = arr.length
        this.table = arr
        this.tableData = this.table.slice(0, this.pageSize)
      }
    },
    addClick() {
      this.edit = false
      this.form = {}
      this.show = true
    },
    addSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          api.addPostChange(this.form).then(response => {
            if (response.success === true) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.oldTable.push(this.form)
              this.table.push(this.form)
              this.total += 1
              this.show = false
            }
          })
        }
      })
    },
    editSubmit() {
      if (JSON.stringify(this.form) === JSON.stringify(this.oldForm)) {
        this.$message('无信息修改')
        this.show = false
        return
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          api.editPostChange(this.form).then(response => {
            if (response.success === true) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.tableData.splice(this.editIndex, 1, this.form)
              this.show = false
            }
          })
        }
      })
    },
    handleEdit(index, row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.oldForm = JSON.parse(JSON.stringify(row))
      this.edit = true
      this.editIndex = index
      this.show = true
    },
    handleDelete(index, row) {
      api.delPostChange({ id: row.id }).then(response => {
        if (response.code === 20000) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.tableData.splice(index, 1)
        }
      })
    },
    jobDict(job) {
      return this.jobOptions[job]
    },
    departmentChange(department) {
      this.$set(this.conditions, 'departmentId', department)
      this.$set(this.conditions, 'PageIndex', 1)
      this.fetchData()
    },
    nameChange(content) {
      console.log(content)
      this.$set(this.conditions, 'Name', content)
      this.$set(this.conditions, 'PageIndex', 1)
      this.fetchData()
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
}
</style>
