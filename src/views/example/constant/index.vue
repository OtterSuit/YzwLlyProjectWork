<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      ref="myfilters"
      title="常数类别"
      :add-button="true"
      :search-content="true"
      placeholder="类别名称"
      @addClick="addClick"
      @contentChange="contentChange"
    />
    <!-- 头部end -->
    <!-- table -->
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
    >
      <!-- <el-table-column
        prop="code"
        label="类别编号"
      /> -->
      <el-table-column
        prop="name"
        label="类别名称"
      />
      <el-table-column label="有效性">
        <template slot-scope="scope">
          <span>{{ ssd_common_boolean[scope.row.validFlag] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="描述"
      />
      <el-table-column width="220">
        <template slot-scope="scope">
          <el-button
            size="mini"
            style="margin-right:5px"
            @click="handleDetails(scope.$index, scope.row)"
          >
            <i class="el-icon-tickets" /> 查看常数
          </el-button>
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
    <my-pagination :total="totalCount" methods="toconstanttypePage" :conditions="conditions" />
    <!-- 常数类别新增编辑弹窗 -->
    <el-dialog v-el-drag-dialog title="分类信息" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-row type="flex" justify="space-between">
            <el-col :span="9">
              <el-form-item label="类别编号" prop="name">
                <el-input v-model="form.code" />
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="类别名称" prop="name">
                <el-input v-model="form.name" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="9">
              <el-form-item label="有效性" prop="validFlag">
                <el-radio-group v-model="form.validFlag">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="描述">
                <el-input v-model="form.remark" />
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
    <!-- 常数类别新增编辑弹窗end -->
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import myPagination from '@/components/MyPagination'
import api from '@/api'
export default {
  components: {
    myfilters, myPagination
  },
  data() {
    return {
      listLoading: true,
      rules: {
        name: [
          { required: true, message: '请输入类别名称', trigger: 'blur' }
        ],
        validFlag: [
          { required: true, message: '请选择有效性', trigger: 'blur' }
        ]
      },
      content: '',
      show: false,
      edit: false,
      editIndex: 0,
      tableData: [],
      form: {},
      oldForm: null,
      ssd_common_boolean: null,
      totalCount: 0,
      conditions: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.toconstanttypePage().then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.totalCount = response.data.totalCount
          this.ssd_common_boolean = response.data.dictData.ssd_common_boolean
          this.tableData = response.data.records
          this.listLoading = false
        }
      })
    },
    // 操作下拉点击
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    // 查看常数按钮
    handleDetails(index, row) {
      this.$router.push({
        name: 'constantDetails',
        query: {
          id: row.id,
          title: row.name
        }
      })
    },
    // 新增按钮
    addClick() {
      this.edit = false
      this.form = {}
      this.show = true
    },
    // 新增弹窗确认按钮
    addSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          api.toAddconstanttype(this.form).then(response => {
            if (response.code === '200' && response.data.busiCode === '1') {
              this.tableData.push(response.data)
              this.$message({
                message: '添加成功',
                type: 'success'
              })
            }
          })
          this.show = false
        } else {
          this.$message({
            message: '请按要求填写',
            type: 'warning'
          })
        }
      })
    },
    // 编辑弹窗确认按钮
    editSubmit() {
      if (JSON.stringify(this.form) === JSON.stringify(this.oldForm)) {
        this.$message('无信息修改')
        this.show = false
        return
      }
      this.$refs.form.validate(async valid => {
        if (valid) {
          api.toReviseconstanttype(this.form).then(response => {
            // console.log(response)
            if (response.code === '200' && response.data.busiCode === '1') {
              this.tableData.splice(this.editIndex, 1, response.data)
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            }
          })
          this.show = false
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
      this.form = JSON.parse(JSON.stringify(row))
      this.oldForm = JSON.parse(JSON.stringify(row))
      this.edit = true
      this.editIndex = index
      this.show = true
    },
    // 删除
    handleDelete(index, row) {
      api.toDeleteconstanttype(row).then(response => {
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
    contentChange(content) {
      this.$set(this.conditions, 'name', content)
      this.$set(this.conditions, 'pageNo', 1)
      this.listLoading = true
      api
        .toconstanttypePage(this.conditions)
        .then(response => {
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
</style>
