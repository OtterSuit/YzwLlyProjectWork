<template>
  <div style="padding:30px 30px 0">
    <myfilters title="绩效考核指标管理" :add-button="true" :back-button="true" @addClick="addClick" />
    <el-table
      :data="tableData"
      style="width: 100%"
      :cell-style="tableStyle"
      :header-cell-style="tableStyle"
    >
      <el-table-column
        label="序号"
        type="index"
        width="50"
      />
      <el-table-column
        prop="type"
        label="绩效类别"
      />
      <el-table-column
        prop="name"
        label="指标名称"
      />
      <el-table-column
        prop="score"
        label="分值"
      />
      <el-table-column
        prop="coefficient"
        label="系数"
      />
      <el-table-column
        prop="formula"
        label="计算公式"
      />
      <el-table-column width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            class="table-button edit-button"
            @click="handleEdit(scope.$index, scope.row)"
          >
            <i class="el-icon-edit-outline" /> 编辑
          </el-button>
          <el-button
            class="table-button"
            size="mini"
            @click="handleDelete(scope.$index, scope.row)"
          >
            <i class="el-icon-delete" /> 删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      class="page"
      :page-size="pageSize"
      :pager-count="11"
      layout="prev, pager, next"
      :total="total"
      @current-change="currentChange"
    /> -->
    <el-dialog title="绩效考核指标" :visible.sync="show" width="800px">
      <div class="dialog-main" style="height:360px">
        <el-form ref="form" :model="form" label-width="70px">
          <el-row type="flex">
            <el-col :span="24">
              <el-form-item label="绩效类别">
                <el-radio-group v-model="form.type">
                  <el-radio label="工作量" border>工作量</el-radio>
                  <el-radio label="岗位" border>岗位</el-radio>
                </el-radio-group>
                <el-button class="type-button" @click="typeInput = !typeInput">
                  <i class="el-icon-circle-plus-outline" style="margin-right:1px" /> 新增类别
                </el-button>
                <el-input v-show="typeInput" v-model="form.type" placeholder="请输入" class="type-input" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="24">
              <el-form-item label="指标名称">
                <el-input
                  v-model="form.name"
                  maxlength="6"
                  placeholder="请输入"
                >
                  <span slot="suffix">6字符以内</span>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="分值">
                <el-input v-model="form.score" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="系数值">
                <el-input v-model="form.coefficient" placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="24">
              <el-form-item label="计算公式">
                <el-input v-model="form.formula" placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取消</el-button>
        <el-button v-show="!edit" type="primary" @click="addSubmit">保存</el-button>
        <el-button v-show="edit" type="primary" @click="editSubmit">保存</el-button>
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
      // currentPage: 1,
      // limit: 4,
      // total: 7,
      show: false,
      edit: false,
      typeInput: false,
      editIndex: 0,
      tableData: [
        {
          type: '工作量',
          name: '白班数',
          score: '5',
          coefficient: '0.5',
          formula: '指标数量x系数'
        },
        {
          type: '工作量',
          name: '夜班数',
          score: '5',
          coefficient: '0.5',
          formula: '指标数量x系数'
        },
        {
          type: '岗位',
          name: '工龄',
          score: '1',
          coefficient: '0.01',
          formula: '指标数量x系数'
        },
        {
          type: '岗位',
          name: '职称',
          score: '护士',
          coefficient: '1.00',
          formula: '无'
        },
        {
          type: '岗位',
          name: '职称',
          score: '护师',
          coefficient: '1.10',
          formula: '无'
        },
        {
          type: '工作质量',
          name: '岗位职责',
          score: '10',
          coefficient: '0.1',
          formula: '无'
        },
        {
          type: '工作质量',
          name: '基础护理',
          score: '10',
          coefficient: '0.1',
          formula: '无'
        },
        {
          type: '工作质量',
          name: '文书质量',
          score: '10',
          coefficient: '0.1',
          formula: '无'
        },
        {
          type: '工作质量',
          name: '理论知识',
          score: '10',
          coefficient: '0.1',
          formula: '无'
        }
      ],
      form: {
        type: '',
        name: '',
        score: '',
        coefficient: '',
        formula: ''
      },
      oldForm: null
    }
  },
  watch: {
    typeInput: {
      handler(newValue, oldValue) {
        if (this.typeInput) {
          this.form.type = ''
        }
      }
    },
    'form.type': {
      handler(newValue, oldValue) {
        if (this.form.type === '岗位' || this.form.type === '工作量') {
          this.typeInput = false
        }
      }
    }
  },
  // created() {
  //   this.fetchData()
  // },
  methods: {
    addClick() {
      this.typeInput = false
      this.edit = false
      this.form = {
        type: '',
        name: '',
        score: '',
        coefficient: '',
        formula: ''
      }
      this.show = true
    },
    addSubmit() {
      this.$message({
        message: '新增成功',
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
      if (row.type === '工作量' || row.type === '岗位') {
        this.typeInput = false
      } else {
        this.typeInput = true
      }
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
.top-button {
  width: 100%;
  height: 36px;
  padding: 0;
}
.table-button {
  display: none;
}
.type-button,.type-input {
  position: relative;
  top: 2px;
  margin: 0 5px;
}
.type-button{
  height: 40px;
}
.edit-button, .type-button{
  color: rgba(64,158,255,1);
  border:1px solid rgba(64,158,255,1);
}
.type-input {
  width: 136px;
}
::v-deep .el-table__row {
  height: 52.8px;
}
::v-deep .el-table__row:hover .cell {
  font-weight: 700;
}
::v-deep .el-table__row:hover .table-button {
  display: inline-block;
}
::v-deep .el-form-item__label {
  text-align: left;
  font-weight: normal;
}
::v-deep .el-input__suffix {
  right: 12px;
  color: #999;
  font-size: 12px;
}
::v-deep .el-radio.is-bordered{
  background:rgba(244,244,245,1);
  border-radius:3px;
  border:1px solid rgba(233,233,235,1);
  margin: 0 5px 0 0;
  .el-radio__label {
    color: #A5A7AC;
  }
}
::v-deep .el-radio__input{
  position: absolute;
  top: -5px;
  left: -4px;
  display: none;
}
::v-deep .el-radio__input.is-checked {
  display: block;
}
::v-deep .el-radio:focus:not(.is-focus):not(:active):not(.is-disabled) .el-radio__inner {
  box-shadow: none;
}
::v-deep .el-radio.is-bordered.is-checked {
  background:rgba(236,245,255,1);
  border-radius:3px;
  border:1px solid rgba(217,236,255,1);
  .el-radio__label {
    color: #47A1FF;
  }
}
</style>
