<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      :title="title"
      :add-button="true"
      :back-button="true"
      :search-content="true"
      placeholder="编码/名称"
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
      <el-table-column prop="num" label="编号" />
      <el-table-column prop="code" label="编码" />
      <el-table-column prop="name" label="名称" />
      <el-table-column label="有效性">
        <template slot-scope="scope">
          <span>{{ ssd_common_boolean[scope.row.validFlag] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="spellCode" label="拼音码" />
      <el-table-column prop="strokeCode" label="五笔码" />
      <el-table-column prop="customCode" label="自定义码" />
      <el-table-column prop="remark" label="备注" />
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
    <my-pagination :total="totalCount" methods="toconstantPage" :conditions="conditions" />
    <!-- 新增编辑弹窗 -->
    <el-dialog v-el-drag-dialog title="常数信息" :visible.sync="show" width="800px">
      <add-item :edit="edit" :cur-form="curForm" :ssd-common-boolean="ssd_common_boolean" @addItem="addSubmit" @editItem="editSubmit" />
    </el-dialog>
    <!-- 新增编辑弹窗end -->
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import myPagination from '@/components/MyPagination'
import addItem from './addItem'
import api from '@/api'

export default {
  components: { myfilters, addItem, myPagination },
  data() {
    return {
      listLoading: true,
      show: false,
      edit: false,
      editIndex: 0,
      tableData: [],
      curForm: {},
      id: '',
      ssd_common_boolean: null,
      totalCount: 0,
      conditions: {
        constantType: null
      }
    }
  },
  computed: {
    title() {
      return this.$route.query.title + '常数维护'
    }
  },
  created() {
    this.id = this.$route.query.id
    this.conditions.constantType = this.$route.query.id
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.toconstantPage({ constantType: this.$route.query.id }).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.totalCount = response.data.totalCount
          this.ssd_common_boolean = response.data.dictData.ssd_common_boolean
          this.tableData = response.data.records
          this.listLoading = false
        }
      })
    },
    // 新增按钮
    addClick() {
      this.edit = false
      this.curForm = {
        constantType: this.id
      }
      this.show = true
    },
    // 新增弹窗确认按钮
    addSubmit(data) {
      api.toAddconstant(data).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.tableData.push(response.data)
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        }
      })
      this.show = false
    },
    // 编辑弹窗确认按钮
    editSubmit(data) {
      api.toReviseconstant(data).then(response => {
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
      api.toDeleteconstant(row).then(response => {
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
      this.$set(this.conditions, 'keyword', content)
      this.$set(this.conditions, 'pageNo', 1)
      this.listLoading = true
      api
        .toconstantPage(this.conditions)
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
