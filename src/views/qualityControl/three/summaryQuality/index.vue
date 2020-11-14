<template>
  <div style="padding:30px">
    <!-- 添加表格上方过滤条件 -->
    <myfilters
      ref="myfilters"
      title="质量问题汇总"
      :add-button="true"
      :choose-date="true"
      date-type="month"
      :choose-department="true"
      @addClick="addClick"
    />
    <el-table
      :data="tableData"
      style="width: 100%"
      :cell-style="tableStyle"
      :header-cell-style="tableStyle"
      border
    > <el-table-column
        prop="department"
        label="检查科室"
      />
      <el-table-column
        prop="time"
        label="发生时间"
        width="100"
      />
      <el-table-column
        prop="problem"
        label="存在问题"
        width="200"
      />
      <el-table-column
        prop="reason"
        label="原因分析"
        width="200"
      />
      <el-table-column
        prop="corrective"
        label="整改措施"
        width="200"
      />
      <el-table-column
        prop="prevention"
        label="预期目标"
      />
      <el-table-column
        prop="evaluation"
        label="效果评价"
        width="100"
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
    <el-dialog title="质量问题汇总" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="检查科室">
                <el-input v-model="form.department" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发生时间">
                <el-date-picker
                  v-model="form.time"
                  type="date"
                  :clearable="false"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="存在问题">
                <el-input v-model="form.problem" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="原因分析">
                <el-input v-model="form.reason" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="整改措施">
                <el-input v-model="form.corrective" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="预期目标">
                <el-input v-model="form.prevention" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="效果评价">
                <el-input v-model="form.evaluation" />
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
export default {
  components: {
    myfilters
  },
  data() {
    return {
      show: false,
      edit: false,
      editIndex: 0,
      tableData: [
        {
          department: '呼吸内科一病区',
          time: '2020-09-01',
          problem: '检查不到位',
          reason: '制定的流程没有按照流程办事',
          corrective: '每天抽查或者检查流程的执行情况并上报汇总',
          prevention: '检查的质量达到之前的好转',
          evaluation: '80分'
        }, {
          department: '肿瘤科一病区',
          time: '2020-10-01',
          problem: '仪容仪表不合格',
          reason: '检查不到位',
          corrective: '每天抽查或者检查流程的执行情况并上报汇总',
          prevention: '检查的质量达到之前的好转',
          evaluation: '80分'
        }, {
          department: '外科一病区',
          time: '2020-11-01',
          problem: '工作质量差',
          reason: '护士积极性低',
          corrective: '每天抽查或者检查流程的执行情况并上报汇总',
          prevention: '检查的质量达到之前的好转',
          evaluation: '80分'
        }
      ],
      form: {
        department: '',
        time: '',
        problem: '',
        reason: '',
        corrective: '',
        prevention: '',
        evaluation: ''
      },
      oldForm: null
    }
  },
  // created() {
  //   this.fetchData()
  // },
  methods: {
    addClick() {
      this.edit = false
      this.form = {
        department: '',
        time: '',
        problem: '',
        reason: '',
        corrective: '',
        prevention: '',
        evaluation: ''
      }
      this.show = true
    },
    addSubmit() {
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      this.tableData.push(this.form)
      this.show = false
    },
    editSubmit() {
      this.show = false
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
    handleEdit(index, row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.oldForm = JSON.parse(JSON.stringify(row))
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
</style>
