<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      ref="myfilters"
      title="常数类别"
      :add-button="true"
      :search-content="true"
      placeholder="类别名称"
      addifo="新增"
      add-icon="el-icon-circle-plus-outline"
      @addClick="addClick"
    />
    <!-- 头部end -->
    <!-- table -->
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="classify"
        label="类别名称"
      />
      <el-table-column label="有效性">
        <template slot-scope="scope">
          <span>{{ scope.row.effective ? '✔' : '✖' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="describe"
        label="描述"
      />
      <el-table-column width="220">
        <template slot-scope="scope">
          <el-button
            size="mini"
            style="margin-right:5px"
            @click="handleDetails(scope.$index, scope.row, 'mbox')"
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
    <!-- 常数类别新增编辑弹窗 -->
    <el-dialog v-el-drag-dialog title="分类信息" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="分类级别">
                <el-input v-model="form.classify" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="有效性">
                <el-radio-group v-model="form.effective">
                  <el-radio :label="true">有效</el-radio>
                  <el-radio :label="false">无效</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="24">
              <el-form-item label="描述">
                <el-input v-model="form.describe" />
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
export default {
  components: {
    myfilters
  },
  data() {
    return {
      content: '',
      show: false,
      edit: false,
      editIndex: 0,
      tableData: [
        {
          classify: '清洗程序',
          describe: '',
          effective: true
        }, {
          classify: '清洗标记',
          describe: '',
          effective: true
        }, {
          classify: '灭菌方法',
          describe: '',
          effective: true
        }, {
          classify: '灭菌程序',
          describe: '',
          effective: true
        }, {
          classify: '灭菌锅',
          describe: '',
          effective: true
        }, {
          classify: '清洗架',
          describe: '',
          effective: true
        }, {
          classify: '清洗锅',
          describe: '',
          effective: true
        }, {
          classify: '灭菌架',
          describe: '',
          effective: true
        }, {
          classify: '灭菌框',
          describe: '',
          effective: true
        }, {
          classify: '条码类型',
          describe: '',
          effective: true
        }, {
          classify: '有效期',
          describe: '',
          effective: true
        }, {
          classify: '包装材料',
          describe: '',
          effective: true
        }, {
          classify: '回收类型',
          describe: '',
          effective: true
        }, {
          classify: '机洗时间',
          describe: '',
          effective: true
        }, {
          classify: '消毒时间',
          describe: '',
          effective: true
        }, {
          classify: '消毒浓度',
          describe: '',
          effective: true
        }
      ],
      form: {
        classify: '',
        describe: '',
        effective: ''
      },
      oldForm: null,
      select: {
        department: '',
        time: null
      },
      title: ''
    }
  },
  // created() {
  //   this.fetchData()
  // },
  methods: {
    // 操作下拉点击
    handleCommand({ index, row, action }) {
      this[action](index, row)
    },
    // 查看常数按钮
    handleDetails(index, row, box) {
      this.title = row.classify + '常数维护'
      this.$router.push({
        name: 'constantDetails',
        params: { title: this.title }
      })
    },
    // 新增按钮
    addClick() {
      this.edit = false
      this.form = {
        classify: '',
        describe: '',
        effectiveness: ''
      }
      this.show = true
    },
    // 新增弹窗确认按钮
    addSubmit() {
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      this.tableData.push(this.form)
      this.show = false
    },
    // 编辑弹窗确认按钮
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
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.tableData.splice(index, 1)
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
