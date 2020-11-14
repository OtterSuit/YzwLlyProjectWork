<template>
  <div style="padding:30px">
    <myfilters
      title="科室管理"
      :add-button="true"
      :search-content="true"
      placeholder="科室名称/编码"
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
        label="科室名称"
      />
      <el-table-column
        prop="enCode"
        label="编码"
      />
      <el-table-column
        label="负责人"
      >
        <template slot-scope="{row}">
          {{ row.manager || '-' }}
        </template>
      </el-table-column>
      <el-table-column
        label="联系方式"
      >
        <template slot-scope="{row}">
          {{ row.telePhone || '-' }}
        </template>
      </el-table-column>
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
    <my-pagination :total="total" methods="getOrganizes" :conditions="conditions" />
    <el-dialog title="科室信息" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="科室名称" prop="fullName">
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
            <el-col :span="11">
              <el-form-item label="负责人">
                <el-input v-model="form.manager" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="联系方式">
                <el-input v-model="form.telePhone" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="24">
              <el-form-item label="备注">
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
import api from '@/api'
import myfilters from '@/components/myfilters'
import MyPagination from '@/components/MyPagination'
export default {
  components: {
    myfilters, MyPagination
  },
  inject: ['reload'],
  data() {
    return {
      listLoading: true,
      total: 0,
      show: false,
      edit: false,
      editIndex: 0,
      tableData: [],
      rules: {
        FullName: [
          { required: true, message: '请输入岗位名称', trigger: 'blur' }
        ],
        EnCode: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ]
      },
      form: {},
      oldForm: null,
      conditions: {
        Keywords: null
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getOrganizes(this.conditions).then(response => {
        if (response.success) {
          console.log('科室管理:', response)
          this.listLoading = false
          this.tableData = response.resData.items
          this.total = response.resData.totalItems
        }
      })
    },
    addClick() {
      this.edit = false
      this.form = {}
      this.show = true
    },
    addSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          api.postOrganizes(this.form).then(response => {
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
    editSubmit() {
      if (JSON.stringify(this.form) === JSON.stringify(this.oldForm)) {
        this.$message('无信息修改')
        this.show = false
        return
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          api.postOrganizesById(this.form).then(response => {
            if (response.success) {
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
      this.oldForm = JSON.parse(JSON.stringify(row))
      this.form = JSON.parse(JSON.stringify(row))
      this.edit = true
      this.editIndex = index
      this.show = true
    },
    handleDelete(index, row) {
      api.deleteOrganizes(this.form).then(response => {
        if (response.success) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.reload()
        }
      })
    },
    // 头部搜索输入
    contentChange(content) {
      this.$set(this.conditions, 'Keywords', content)
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
