<template>
  <div style="padding:30px">
    <!-- 添加表格上方过滤条件 -->
    <myfilters
      title="奖励记录"
      :choose-department="true"
      :search-name="true"
      :add-button="true"
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
        prop="awardTime"
        label="奖励时间"
      />
      <el-table-column
        prop="awardDescription"
        label="奖励描述"
      />
      <el-table-column
        prop="awardLevel"
        label="奖励等级"
      />
      <el-table-column
        prop="immediateSuperior"
        label="直接上级"
      />
      <el-table-column
        prop="documentNumber"
        label="文件号"
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
    <my-pagination :total="total" methods="getPersonAwards" :conditions="conditions" />
    <el-dialog title="奖励信息" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="姓名">
                <el-input v-model="form.realName" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="奖励时间">
                <el-date-picker
                  v-model="form.awardTime"
                  type="date"
                  :clearable="false"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="奖励描述">
                <el-input v-model="form.awardDescription" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="奖励等级">
                <el-input v-model="form.awardLevel" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="直接上级">
                <el-input v-model="form.immediateSuperior" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="文件号">
                <el-input v-model="form.documentNumber" />
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
import api from '@/api'
import MyPagination from '@/components/MyPagination'
export default {
  components: {
    myfilters, MyPagination
  },
  data() {
    return {
      show: false,
      edit: false,
      editIndex: 0,
      tableData: [],
      form: {},
      total: 0,
      conditions: {
        departmentId: null,
        name: null
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getPersonAwards(this.conditions).then(response => {
        if (response.success) {
          console.log('奖励记录', response)
          this.total = response.resData.totalItems
          this.tableData = response.resData.items
          this.listLoading = false
        }
      })
    },
    addClick() {
      this.edit = false
      this.form = {}
      this.show = true
    },
    addSubmit() {
      this.tableData.push(this.form)
      this.show = false
      this.$message({
        message: '添加成功',
        type: 'success'
      })
    },
    editSubmit() {
      this.tableData.splice(this.editIndex, 1, this.form)
      this.show = false
      this.$message({
        message: '编辑成功',
        type: 'success'
      })
    },
    handleEdit(index, row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.edit = true
      this.editIndex = index
      this.show = true
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1)
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    },
    searchClick(select) {
      console.log(select)
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
