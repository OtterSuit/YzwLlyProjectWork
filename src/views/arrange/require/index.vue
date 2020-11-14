<template>
  <div style="padding:30px">
    <!-- 添加表格上方过滤条件 -->
    <myfilters
      title="排班需求"
      :choose-department="true"
      :add-button="true"
      @addClick="addClick"
      @departmentChange="departmentChange"
    />
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
        width="100"
      />
      <el-table-column
        prop="applicant"
        label="申请人"
      />
      <el-table-column
        prop="applicationDate"
        label="申请日期"
      />
      <el-table-column
        label="申请班次"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.applicationShift">{{ applicationShift[scope.row.applicationShift] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="applicationReason"
        label="申请理由"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
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
    <my-pagination :total="total" methods="getScheduleDemand" :conditions="conditions" />
    <el-dialog title="排班需求" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="申请人">
                <el-input v-model="applicant" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="申请日期" prop="applicationDate">
                <el-date-picker
                  v-model="form.applicationDate"
                  type="date"
                  placeholder="选择日期"
                  :clearable="false"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="申请班次" prop="applicationShift">
                <el-select v-model="form.applicationShift" placeholder="">
                  <el-option
                    v-for="(val, key) in applicationShift"
                    :key="val"
                    :label="val"
                    :value="+key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="申请理由" prop="applicationReason">
                <el-input v-model="form.applicationReason" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSubmit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import MyPagination from '@/components/MyPagination'
import api from '@/api'
import { applicationShift } from '@/common/js/constants'
export default {
  components: {
    myfilters, MyPagination
  },
  inject: ['reload'],
  data() {
    return {
      applicationShift: applicationShift,
      rules: {
        applicationDate: [
          { required: true, message: '请选择申请日期', trigger: 'blur' }
        ],
        applicationShift: [
          { required: true, message: '请选择申请班次', trigger: 'blur' }
        ],
        applicationReason: [
          { required: true, message: '请输入申请理由', trigger: 'blur' }
        ]
      },
      show: false,
      tableData: [],
      form: {},
      conditions: {
        departmentId: null
      },
      applicant: null,
      total: 0,
      listLoading: true
    }
  },
  created() {
    this.applicant = this.$store.getters.userInfo.name
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getScheduleDemand(this.conditions).then(response => {
        if (response.success) {
          console.log('排班需求', response)
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
          api.postScheduleDemand(this.form).then(response => {
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
    // 删除
    handleDelete(index, row) {
      api.deleteScheduleDemand({ id: row.id }).then(response => {
        if (response.success) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.reload()
        }
      })
    },
    departmentChange(department) {
      this.$set(this.conditions, 'departmentId', department)
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
