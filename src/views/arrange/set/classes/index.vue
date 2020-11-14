<template>
  <div style="padding:30px">
    <!-- 添加表格上方过滤条件 -->
    <myfilters
      title="班次设置"
      :choose-department="true"
      @departmentChange="departmentChange"
    >
      <template #titleExtent>
        <span
          class="week-choose"
          :class="{active:conditions.weekOption===1}"
          @click="weekClick(1)"
        >本周</span>
        <span
          class="week-choose"
          :class="{active:conditions.weekOption===2}"
          @click="weekClick(2)"
        >下周</span>
      </template>
      <template #extent2>
        <el-button type="primary" icon="el-icon-edit" style="margin-left:5px" @click="refer">参考上周排班</el-button>
        <el-button type="primary" icon="el-icon-success" @click="onSubmit">提交</el-button>
      </template>
    </myfilters>
    <el-table
      ref="table"
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
      :cell-style="tableStyle"
      :header-cell-style="tableStyle"
      border
      row-key="userId"
    >
      <el-table-column label="姓名">
        <template slot-scope="scope">
          {{ scope.row.realName }}
          <el-tooltip v-if="scope.row.scheduleDemands.length!==0" class="item" effect="light" placement="bottom">
            <div slot="content" class="tooltip">
              <div class="tooltip-title">
                <span>排班需求</span>
              </div>
              <div v-for="(item,index) in scope.row.scheduleDemands" :key="index" class="require-box">
                <div class="tooltip-content">申请时间：{{ item.applicationDate }}</div>
                <div class="tooltip-content">申请班次：{{ applicationShift[item.applicationShift] }}</div>
                <i class="el-icon-circle-check tooltip-icon" @click="requrieClick(item,scope.row)" />
              </div>
            </div>
            <i class="iconfont icon-ziyuan" />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="工龄">
        <template slot-scope="scope">
          {{ scope.row.workYear }}年
        </template>
      </el-table-column>
      <el-table-column label="职员类别">
        <template slot-scope="scope">
          {{ userType[scope.row.userType] }}
        </template>
      </el-table-column>
      <el-table-column prop="hierarchy" label="层级" />
      <el-table-column label="分组">
        <template slot-scope="scope">
          <el-input v-model="scope.row.grouping" />
        </template>
      </el-table-column>
      <el-table-column v-for="item in weekDay" :key="item.date" width="100">
        <template slot="header">
          {{ item.name }}<br>
          {{ item.date }}
        </template>
        <template slot-scope="scope">
          <el-select v-model="scope.row[item.engName]" placeholder="">
            <el-option
              v-for="(val, key) in applicationShift"
              :key="val"
              :label="val"
              :value="+key"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="夜班数">
        <template slot-scope="scope">
          <el-input v-model="scope.row.nightShifts" />
        </template>
      </el-table-column>
      <el-table-column label="班时值">
        <template slot-scope="scope">
          <el-input v-model="scope.row.shiftHours" />
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
          <el-input v-model="scope.row.remarks" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import Sortable from 'sortablejs'
import api from '@/api'
import { applicationShift, userType } from '@/common/js/constants'

export default {
  components: {
    myfilters
  },
  data() {
    return {
      userType: userType,
      applicationShift: applicationShift,
      weekDay: [
        {
          name: '星期一',
          engName: 'mondayShift'
        },
        {
          name: '星期二',
          engName: 'tuesdayShift'
        },
        {
          name: '星期三',
          engName: 'wednesdayShift'
        },
        {
          name: '星期四',
          engName: 'thursdayShift'
        },
        {
          name: '星期五',
          engName: 'fridayShift'
        },
        {
          name: '星期六',
          engName: 'saturdayShift'
        },
        {
          name: '星期日',
          engName: 'sundayShift'
        }
      ],
      tableData: [],
      conditions: {
        weekOption: 1,
        departmentId: null
      },
      listLoading: true
    }
  },
  created() {
    this.setDate()
    this.nextTick()
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getScheduleShifts(this.conditions).then(response => {
        if (response.success) {
          console.log('排班设置', response)
          this.tableData = response.resData
          this.listLoading = false
        }
      })
    },
    async nextTick() {
      this.$nextTick(() => {
        this.setSort()
      })
    },
    // 排班拖拉
    setSort() {
      const el = this.$refs.table.$el.querySelectorAll(
        '.el-table__body-wrapper > table > tbody'
      )[0]
      this.sortable = Sortable.create(el, {
        // ghostClass: 'sortable-row', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData('Text', '')
        },
        onEnd: ({ newIndex, oldIndex }) => {
          const currRow = this.tableData.splice(oldIndex, 1)[0]
          this.tableData.splice(newIndex, 0, currRow)
        }
      })
    },
    // 设置头部日期
    setDate() {
      const d = new Date()
      let start = Date.parse(d)
      let weekDay = d.getDay()
      while (weekDay !== 1) {
        weekDay -= 1
        start = start - 1 * 24 * 60 * 60 * 1000
      }
      if (this.conditions.weekOption === 2) {
        start = start + 7 * 24 * 60 * 60 * 1000
      }
      for (let i = 0; i < 7; i++) {
        const date = new Date(start)
        start += 1 * 24 * 60 * 60 * 1000
        const dd = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        this.$set(this.weekDay[i], 'date', dd)
      }
    },
    weekClick(num) {
      this.conditions.weekOption = num
      this.setDate()
      this.fetchData()
    },
    tableStyle() {
      return {
        textAlign: 'center'
      }
    },
    // 提交
    onSubmit() {
      this.tableData.forEach((item, index) => {
        item.sortCode = index + 1
      })
      api.postScheduleShifts(this.tableData, this.conditions.weekOption).then(response => {
        if (response.success) {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        }
      })
    },
    // 发送请求获取上周数据
    refer() {
      const tableData = JSON.parse(JSON.stringify(this.tableData))
      const conditions = {
        weekOption: 3,
        departmentId: this.conditions.departmentId
      }
      api.getScheduleShifts(conditions).then(response => {
        if (response.success) {
          this.tableData = response.resData
          tableData.forEach(v => {
            for (let i = 0; i < this.tableData.length; i++) {
              // console.log(1)
              const j = this.tableData[i]
              if (v.userId === j.userId) {
                j.scheduleDemands = v.scheduleDemands
                break
              }
            }
          })
        }
      })
    },
    // 需求采用
    requrieClick(item, row) {
      const d = new Date(item.applicationDate)
      const weekDay = d.getDay()
      // console.log(row[this.weekDay[weekDay].engName])
      row[this.weekDay[weekDay - 1].engName] = item.applicationShift
    },
    departmentChange(department) {
      this.$set(this.conditions, 'departmentId', department)
      this.$set(this.conditions, 'PageIndex', 1)
      this.fetchData()
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
::v-deep {
  .el-table .cell {
    padding: 0;
  }
  .el-table .el-input .el-input__inner {
    border-style: none;
    height: 60px;
    text-align: center;
    padding: 0 10px;
    transition: background-color 0.25s ease;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td .el-input__inner {
    background-color: #f5f7fa;
  }
  .el-input__suffix {
    display: none;
  }
  .el-table td {
    padding: 0;
  }
}
.tooltip {
  .tooltip-title {
    font-size: 16px;
    color: #666;
    margin-bottom: 10px;
  }
  .require-box {
    border-top: 1px solid #ccc;
    padding: 5px 0;
    position: relative;
    .tooltip-icon {
      font-size: 16px;
      color: #666;
      cursor: pointer;
      position: absolute;
      right: 0;
      bottom: 9px;
    }
    .tooltip-content {
      height: 24px;
      font-size: 12px;
      color: #777;
      line-height: 24px;
    }
  }
}
.week-choose {
  font-size: 12px;
  color: #666;
  cursor: pointer;
}
.week-choose.active {
  color: #409eff;
}
</style>
