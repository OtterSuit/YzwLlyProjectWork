<template>
  <div style="padding:30px">
    <!-- 添加表格上方过滤条件 -->
    <supplyFilter
      ref="supplyFilter"
      title="供应室按科室汇总查询报表"
      @refresh="refresh"
      @dateChange="dateChange"
    />
    <el-table
      id="exportTab"
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      :cell-style="tableStyle"
      :header-cell-style="headerStyle"
      border
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" fixed="left" width="50" />
      <el-table-column type="index" label="序号" /> -->
      <el-table-column class="hospital" label="(茂名市妇幼保健院)供应室按科室汇总回收数量查询报表">
        <el-table-column :label="`统计数据：` + time1 + ` 至 ` + time2">
          <el-table-column prop="department" fixed="left" width="140" label="科室" />
          <el-table-column prop="goods" label="供应室物品" />
          <el-table-column prop="instrument" label="器械类" />
          <el-table-column prop="ingredients" label="辅料类" />
          <el-table-column prop="operation" label="外来手术器械类" />
          <el-table-column prop="people" label="制表人" />
          <el-table-column prop="time" fixed="right" width="200" label="制表时间" />
        </el-table-column>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <!-- 取消多选按钮 -->
      <!-- <el-button type="primary" @click="toggleSelection()">取消选择</el-button> -->
      <el-button type="primary" @click="print()">打印</el-button>
      <el-button type="primary" @click="derive()">导出</el-button>
      <el-button type="primary" @click="detailDerive()">明细导出</el-button>
      <el-button type="primary" @click="detailPrint()">明细打印</el-button>
    </div>
  </div>
</template>

<script>
import supplyFilter from './components/supplyFilter'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  components: { supplyFilter },
  data() {
    return {
      time1: '',
      time2: '',
      // 点击刷新时，判断用户是否已经选择日期
      chooseDate: false,
      multipleSelection: [],
      tableData: [
        {
          department: '手术部',
          goods: '镊子',
          instrument: '起搏器',
          ingredients: '纱布',
          operation: '手术刀',
          people: '系统管理员',
          time: this.getNowFormatDate()
        },
        {
          department: '手术部',
          goods: '镊子',
          instrument: '起搏器',
          ingredients: '纱布',
          operation: '手术刀',
          people: '系统管理员',
          time: this.getNowFormatDate()
        },
        {
          department: '手术部',
          goods: '镊子',
          instrument: '起搏器',
          ingredients: '纱布',
          operation: '手术刀',
          people: '系统管理员',
          time: this.getNowFormatDate()
        }
      ]
    }
  },
  methods: {
    print() {
      // 打印所有选择的行
      console.log(this.$refs.multipleTable.selection)
    },
    derive() {
      console.log('导出')
      /* generate workbook object from table */
      var xlsxParam = { raw: true } // 导出的内容只做解析，不进行格式转换
      var wb = XLSX.utils.table_to_book(document.querySelector('#exportTab'), xlsxParam)

      /* get binary string as output */
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '审核情况表.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') {
          console.log(e, wbout)
        }
      }
      return wbout
    },
    detailDerive() {
      console.log('明细导出')
    },
    detailPrint() {
      console.log('明细打印')
    },
    // 获取当前时间，格式为:yyyy-mm-dd hh-MM-ss
    getNowFormatDate() {
      var date = new Date()
      var seperator1 = '-'
      var seperator2 = ':'
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      var hours = date.getHours()
      var minutes = date.getMinutes()
      var seconds = date.getSeconds()
      if (hours >= 0 && hours <= 9) {
        hours = '0' + hours
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = '0' + minutes
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = '0' + seconds
      }
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
            ' ' + hours + seperator2 + minutes + seperator2 + seconds
      return currentdate
    },
    dateChange() {
      console.log(1)
      this.chooseDate = true
    },
    refresh() {
      if (this.chooseDate === true) {
        console.log(this.$refs.supplyFilter.value1[0], this.$refs.supplyFilter.value1[1])
        this.time1 = this.$refs.supplyFilter.value1[0]
        this.time2 = this.$refs.supplyFilter.value1[1]
      } else {
        console.log('请选择时间')
      }
      console.log('刷新')
    },
    // // 将选择的日期转换为标准格式
    // getSterilizationDate(val) {
    //   this.form.sterilizationDate = val
    // },
    // // 将选择的日期转换为标准格式
    // getExpiryDate(val) {
    //   this.form.expiryDate = val
    // },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    tableStyle({ row, column, rowIndex, columnIndex }) {
      return {
        textAlign: 'center'
      }
    },
    headerStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return {
          textAlign: 'center',
          fontSize: '24px'
        }
      } else if (rowIndex === 1) {
        return {
          textAlign: 'center',
          fontSize: '20px'
        }
      } else if (rowIndex === 2) {
        return {
          textAlign: 'center'
        }
      }
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>

</style>
