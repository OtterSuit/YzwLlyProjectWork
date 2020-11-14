<template>
  <div style="padding:30px">
    <!-- 添加表格上方过滤条件 -->
    <myfilters
      title="处分记录"
      :choose-department="true"
      :search-name="true"

      :add-button="true"
      @addClick="addClick"
    />
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="姓名"
      />
      <el-table-column
        prop="date"
        label="处分时间"
      />
      <el-table-column
        prop="detail"
        label="处分描述"
      />
      <el-table-column
        prop="level"
        label="处分等级"
      />
      <el-table-column
        prop="superior"
        label="直接上级"
      />
      <el-table-column
        prop="number"
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
    <!-- <div style="text-align:center;margin-top:10px;">
      <el-button type="primary" @click="addArchives">添加处分记录</el-button>
    </div> -->
    <el-dialog title="处分信息" :visible.sync="show" width="800px">
      <div class="dialog-main">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="姓名">
                <el-input v-model="form.name" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="处分时间">
                <el-date-picker
                  v-model="form.date"
                  type="date"
                  :clearable="false"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="处分描述">
                <el-input v-model="form.detail" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="处分等级">
                <el-input v-model="form.level" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="直接上级">
                <el-input v-model="form.superior" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="文件号">
                <el-input v-model="form.number" />
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
      tableData: [{
        name: '袁丽',
        date: '2020-7-1',
        detail: '工作懈怠',
        level: '1级',
        superior: '胡丽',
        number: '01'
      }, {
        name: '袁丽',
        date: '2020-7-1',
        detail: '早退',
        level: '2级',
        superior: '胡丽',
        number: '02'
      }, {
        name: '袁丽',
        date: '2020-7-1',
        detail: '迟到严重',
        level: '2级',
        superior: '胡丽',
        number: '03'
      }],
      form: {
        name: '',
        date: '',
        detail: '',
        level: '',
        superior: '',
        number: ''
      }
    }
  },
  methods: {
    addClick() {
      this.edit = false
      this.form = {
        name: '',
        date: '',
        detail: '',
        level: '',
        superior: '',
        number: ''
      }
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
