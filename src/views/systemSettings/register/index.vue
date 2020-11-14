<template>
  <div style="padding:30px">
    <!-- 添加表格上方过滤条件 -->
    <myfilters
      title="用户管理"
      :add-button="true"
      :search-content="true"
      :choose-department="true"
      placeholder="姓名/账号"
      @addClick="addClick"
    />
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="realName"
        label="姓名"
      />
      <el-table-column
        prop="department"
        label="科室"
      />
      <el-table-column
        prop="duty"
        label="岗位"
      />
      <el-table-column
        prop="role"
        label="权限角色"
      />
      <el-table-column
        prop="account"
        label="用户名"
      />
      <el-table-column
        prop="status"
        label="在职状态"
      />
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
    <my-pagination :total="total" methods="getAccountSetting" />
    <el-dialog title="账号信息" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.realName" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="科室" prop="name">
                <el-input v-model="form.department" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="岗位" prop="name">
                <el-select v-model="form.jobs" placeholder="">
                  <el-option label="护理部主任" value="护理部主任" />
                  <el-option label="护士长" value="护士长" />
                  <el-option label="护士" value="护士" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="权限角色" prop="name">
                <el-select v-model="form.role" placeholder="">
                  <el-option label="护理部主任" value="护理部主任" />
                  <el-option label="护士长" value="护士长" />
                  <el-option label="护士" value="护士" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" />
              </el-form-item>
            </el-col>
            <el-col v-if="edit" :span="11">
              <el-form-item label="在职状态">
                <el-select v-model="form.status" placeholder="">
                  <el-option label="在职" value="在职" />
                  <el-option label="离职" value="护士长" />
                </el-select>
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
import api from '@/api'
import myfilters from '@/components/myfilters'
import MyPagination from '@/components/MyPagination'
export default {
  components: {
    myfilters, MyPagination
  },
  data() {
    return {
      listLoading: true,
      total: 0,
      show: false,
      edit: false,
      editIndex: 0,
      tableData: [],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      form: {
        realName: '',
        departmentId: '',
        dutyId: '',
        roleId: '',
        account: ''
      },
      oldForm: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getAccountSetting().then(response => {
        if (response.success) {
          console.log('账号设置-列表:', response)
          this.listLoading = false
          this.tableData = response.resData.items
          this.tableData.forEach(item => {
            console.log(item.realName)
          })
          this.total = response.resData.totalItems
        }
      })
    },
    addClick() {
      this.edit = false
      this.form = {
        password: '111111'
      }
      this.show = true
    },
    addSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.table.push(this.form)
          this.total += 1
          this.show = false
        } else {
          this.$message({
            message: '请按要求填写',
            type: 'warning'
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
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.tableData.splice(this.editIndex, 1, this.form)
          this.show = false
          this.edit = false
        } else {
          this.$message({
            message: '请按要求填写',
            type: 'warning'
          })
        }
      })
    },
    handleEdit(index, row) {
      this.oldForm = JSON.parse(JSON.stringify(row))
      this.form = JSON.parse(JSON.stringify(row))
      this.edit = true
      this.editIndex = index
      this.show = true
    },
    handleDelete(index, row) {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.tableData.splice(index, 1)
    },
    tableStyle() {
      return {
        textAlign: 'center'
      }
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
