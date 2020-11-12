<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      :title="title"
      addifo="新增"
      add-icon="el-icon-circle-plus-outline"
      :add-button="true"
      :back-button="true"
      :search-content="true"
      placeholder="编码/名称"
      @addClick="addClick"
    />
    <!-- 头部end -->
    <!-- table -->
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column prop="No" label="编号" fixed />
      <el-table-column prop="code" label="编码" />
      <el-table-column prop="name" label="名称" />
      <el-table-column label="有效性">
        <template slot-scope="scope">
          <span>{{ scope.row.effective ? '✔' : '✖' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" />
      <el-table-column prop="pinyinCode" label="拼音码" />
      <el-table-column prop="wubingCode" label="五笔码" />
      <el-table-column prop="customCode" label="自定义码" />
      <el-table-column width="200">
        <template slot-scope="scope">
          <el-button
            slot="reference"
            size="mini"
            style="margin: 0 5px 0 0"
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
    <!-- table end -->
    <!-- 新增编辑弹窗 -->
    <el-dialog v-el-drag-dialog title="常数信息" :visible.sync="show" width="800px">
      <add-item :edit="edit" :cur-form="curForm" @addItem="addSubmit" @editItem="editSubmit" />
    </el-dialog>
    <!-- 新增编辑弹窗end -->
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import addItem from './addItem'

export default {
  components: { myfilters, addItem },
  data() {
    return {
      content: '',
      show: false,
      edit: false,
      editIndex: 0,
      tableData: [{
        name: '张三',
        code: '123',
        No: 'N2',
        effective: true,
        remark: '我是张三',
        pinyinCode: 'ZS',
        wubingCode: 'asd',
        customCode: 'asd'
      }, {
        name: '李四',
        code: '125',
        No: 'N2',
        effective: true,
        remark: '我是李四',
        pinyinCode: 'ZS',
        wubingCode: 'asd',
        customCode: 'asd'
      }],
      curForm: {},
      title: ''
    }
  },
  created() {
    this.title = this.$route.params.title
  },
  methods: {
    // 新增按钮
    addClick() {
      this.edit = false
      this.curForm = {
        name: '',
        code: '',
        No: '',
        effective: true,
        remark: '',
        pinyinCode: '',
        wubingCode: '',
        customCode: ''
      }
      this.show = true
    },
    // 新增弹窗确认按钮
    addSubmit(data) {
      this.tableData.push(data)
      this.show = false
    },
    // 编辑弹窗确认按钮
    editSubmit(data) {
      this.tableData.splice(this.editIndex, 1, data)
      this.show = false
      this.edit = false
    },
    // 编辑
    handleEdit(index, row) {
      this.curForm = JSON.parse(JSON.stringify(row))
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
</style>
