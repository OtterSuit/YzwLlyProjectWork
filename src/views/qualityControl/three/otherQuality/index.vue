<template>
  <div style="padding:30px">
    <!-- 添加表格上方过滤条件 -->
    <myfilters
      title="质量检查计划"
      :choose-department="true"
      :add-button="true"
      :choose-date="true"
      date-type="month"
      @addClick="addClick"
    />
    <el-table
      :data="tableData"
      style="width: 100%"
      :cell-style="tableStyle"
      :header-cell-style="tableStyle"
      border
    >
      <el-table-column
        prop="time"
        label="时间"
      />
      <el-table-column
        prop="mission"
        label="任务名称"
      />
      <el-table-column
        prop="Inspection"
        label="检查组"
      />
      <el-table-column
        prop="checkName"
        label="检查组名称"
      />
      <el-table-column
        prop="investigate"
        label="需调查科室"
      />
      <el-table-column
        prop="templateGroup"
        label="模板组"
        width="200"
      />
      <el-table-column
        prop="templateFile"
        label="危险患者管理评估表"
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
    <!-- <div style="text-align:center;margin-top:10px;">
      <el-button type="primary" @click="addArchives">添加质量计划</el-button>
    </div> -->
    <!-- <div style="text-align:center;margin-top:10px;">
      <el-button type="primary" @click="addArchives">添加培训安排信息</el-button>
    </div> -->
    <el-dialog title="质量计划" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="90px">
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="时间">
                <el-date-picker
                  v-model="form.time"
                  type="date"
                  :clearable="false"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="任务名称">
                <el-input v-model="form.mission" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="检查组">
                <el-input v-model="form.Inspection" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检查者姓名">
                <el-input v-model="form.checkName" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="需调查科室">
                <el-input v-model="form.investigate" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="模板组">
                <el-input v-model="form.templateGroup" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="模板文件">
                <el-input v-model="form.templateFile" />
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
          time: '2020-09-01',
          mission: '危重患者管理',
          Inspection: '危重患者管理组',
          checkName: '郭秀兰、王一鸣',
          investigate: '神经外科、ICU、心血管科...',
          templateGroup: '护理控制组',
          templateFile: '危重患者管理评估表'
        }, {
          time: '2020-09-05',
          mission: '危重患者管理',
          Inspection: '危重患者管理组',
          checkName: '郭秀兰、王一鸣',
          investigate: '神经外科、ICU、心血管科...',
          templateGroup: '护理控制组',
          templateFile: '危重患者管理评估表'
        }, {
          time: '2020-09-12',
          mission: '危重患者管理',
          Inspection: '危重患者管理组',
          checkName: '郭秀兰、王一鸣',
          investigate: '神经外科、ICU、心血管科...',
          templateGroup: '护理控制组',
          templateFile: '危重患者管理评估表'
        }
      ],
      form: {
        time: '',
        mission: '',
        Inspection: '',
        checkName: '',
        investigate: '',
        templateGroup: '',
        templateFile: ''
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
        time: '',
        place: '',
        content: '',
        teacher: '',
        people: '',
        status: ''
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
