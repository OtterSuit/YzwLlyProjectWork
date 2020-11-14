<template>
  <div style="padding:30px">
    <myfilters
      ref="myfilters"
      title="三级质控要求"
      :add-button="true"
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
        prop="classify"
        label="分类"
      />
      <el-table-column
        prop="forPeople"
        label="针对人员"
      />
      <el-table-column
        prop="mainReq"
        label="主要要求"
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
    <el-dialog title="质控要求" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="分类">
                <el-input v-model="form.classify" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="针对人员">
                <el-input v-model="form.forPeople" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="主要要求">
                <el-input v-model="form.mainReq" />
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
          classify: '一级质控',
          forPeople: '责任护士',
          mainReq: '需要正确执行医嘱，按照规则制度和操作规程安全执行医嘱'
        }, {
          classify: '二级质控',
          forPeople: '高级责任护士、护士长',
          mainReq: '安全执行自己的医嘱同时指导各项制度规范落实，帮助低年资护士提高护理质量'
        }, {
          classify: '三级质控',
          forPeople: '护理部护士、护理部主任',
          mainReq: '建立及完善质量管理的系统，监督护理核心制度的落实，加强护士岗位培训，采取行政查房、专项调研等措施'
        }
      ],
      form: {
        classify: '',
        forPeople: '',
        mainReq: ''
      },
      oldForm: null,
      select: {
        department: '',
        time: null
      }
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
