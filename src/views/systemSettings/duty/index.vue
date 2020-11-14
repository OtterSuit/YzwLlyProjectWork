<template>
  <div style="padding:30px">
    <myfilters
      title="岗位管理"
      :add-button="true"
      :search-content="true"
      placeholder="岗位名称/编码"
      @addClick="addClick"
      @contentChange="contentChange"
    />
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="fullName"
        label="岗位名称"
      />
      <el-table-column
        prop="enCode"
        label="编码"
      />
      <el-table-column
        label="备注"
      >
        <template slot-scope="{row}">
          {{ row.description || '-' }}
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
    <my-pagination :total="total" methods="getDutys" />
    <el-dialog title="岗位信息" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="名称" prop="fullName">
                <el-input v-model="form.fullName" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="编码" prop="enCode">
                <el-input v-model="form.enCode" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="24">
              <el-form-item label="备注" prop="description">
                <el-input v-model="form.description" />
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
import myfilters from '@/components/myfilters'
import MyPagination from '@/components/MyPagination'
import api from '@/api'
export default {
  components: {
    myfilters, MyPagination
  },
  inject: ['reload'],
  data() {
    return {
      rules: {
        applicant: [
          { required: true, message: '请输入申请人', trigger: 'blur' }
        ],
        applicationDate: [
          { required: true, message: '请选择申请日期', trigger: 'blur' }
        ],
        applicationClass: [
          { required: true, message: '请选择申请班次', trigger: 'blur' }
        ],
        applicationReason: [
          { required: true, message: '请输入申请理由', trigger: 'blur' }
        ]
      },
      edit: false,
      editIndex: 0,
      oldForm: null,
      show: false,
      tableData: [],
      form: {},
      conditions: {
        departmentId: null
      },
      total: 0,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getDutys(this.conditions).then(response => {
        if (response.success) {
          console.log('岗位管理', response)
          this.total = response.resData.totalItems
          this.tableData = response.resData.items
          this.listLoading = false
        }
      })
    },
    // 新增
    addClick() {
      this.form = {}
      this.show = true
    },
    // 新增确认
    addSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          api.postdutys(this.form).then(response => {
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
          api.putScheduleNeeds(this.form).then(response => {
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
      api.deleteScheduleNeeds({ id: row.id }).then(response => {
        if (response.success) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.reload()
        }
      })
    },
    contentChange() {

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
