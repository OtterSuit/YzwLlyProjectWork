<template>
  <div style="padding:0 30px">
    <!-- 添加表格上方过滤条件 -->
    <myfilters
      :title="page === 'outpatient' ? '患者使用登记（门诊）' : '患者使用登记（住院）'"
      addifo="添加信息"
      :daterange="page !== 'outpatient'"
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
      <el-table-column type="index" label="序号" fixed width="50" />
      <el-table-column prop="name" label="患者姓名" fixed />
      <el-table-column prop="barCode" label="包条码" />
      <el-table-column prop="department" label="门诊科室" />
      <el-table-column v-if="page === 'outpatient'" prop="unique" label="唯一号" />
      <el-table-column v-if="page === 'hospitalized'" prop="inHospitalNo" label="住院号" />
      <el-table-column prop="useTime" label="使用时间" />
      <el-table-column prop="doctor" label="医生" />
      <el-table-column prop="executeNurse" label="执行护士" />
      <el-table-column prop="reviewNurse" label="复查护士" />
      <el-table-column prop="operateRoom" label="手术间" />
      <el-table-column label="操作" width="160" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            style="margin-right: 10px;"
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
              type="danger"
            >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="人员信息" :visible.sync="show" width="800px">
      <add-item :edit="edit" :cur-form="curForm" :page="page" @addItem="addSubmit" @editItem="editSubmit" />
    </el-dialog>
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import addItem from './addItem'
import { parseTime } from '@/utils'

export default {
  components: { myfilters, addItem },
  props: {
    page: {
      type: String,
      default: 'outpatient' // outpatient是门诊，hospitalized是住院
    }
  },
  data() {
    return {
      show: false,
      edit: false,
      editIndex: 0,
      tableData: [{
        name: '张三',
        barCode: '123',
        department: 'N2',
        unique: '978967',
        inHospitalNo: '978967',
        useTime: '2020-02-02',
        doctor: '张三',
        executeNurse: 'N2',
        reviewNurse: '123',
        operateRoom: 'N2'
      }],
      curForm: {}
    }
  },
  methods: {
    addClick() {
      this.edit = false
      this.curForm = {
        name: '',
        barCode: '',
        department: '',
        unique: '',
        useTime: '',
        doctor: '',
        executeNurse: '',
        reviewNurse: '',
        operateRoom: '',
        inHospitalNo: ''
      }
      this.show = true
    },
    addSubmit(data) { // 添加信息
      const handle = {
        ...data,
        useTime: parseTime(data.useTime).substring(0, 10) // 处理时间格式
      }
      this.tableData.push(handle)
      this.show = false
    },
    editSubmit(data) {
      const handle = {
        ...data,
        useTime: parseTime(data.useTime).substring(0, 10)
      }
      this.tableData.splice(this.editIndex, 1, handle)
      this.show = false
      this.edit = false
    },
    handleEdit(index, row) {
      this.curForm = JSON.parse(JSON.stringify(row))
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
