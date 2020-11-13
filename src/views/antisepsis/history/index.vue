<template>
  <div style="padding:30px">
    <!-- header -->
    <myfilters
      title="任务列表"
      :content="content"
      :search-content="true"
      :choose-date="true"
      add-icon="el-icon-printer"
      placeholder="装载人/灭菌人"
      @contentChange="contentChange"
      @dateChange="dateChange"
    >
      <template slot="header-extent">
        <el-col :span="6">
          <el-select v-model="equipment" placeholder="请选择灭菌设备" clearable @change="equipmentChange(equipment)">
            <el-option
              v-for="(item,key) in equipmentOptions"
              :key="key"
              :label="item"
              :value="key"
            />
          </el-select>
        </el-col>
      </template>
    </myfilters>
    <!-- header end -->
    <!-- table -->
    <el-table v-loading="listLoading" :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100px" />
      <el-table-column label="灭菌设备" prop="boxName" />
      <el-table-column label="包数量" prop="loadCount" align="center" />
      <el-table-column label="灭菌人/时间">
        <template slot-scope="scope">
          <div>
            {{ scope.row.sterilizeUser }}
            <br>
            <span class="second-row">{{ scope.row.sterilizeStartTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="灭菌程序" prop="sterilizeProgramId" />
      <el-table-column label="炉次" prop="batchNoDay" align="center" />
      <el-table-column label="灭菌质量" prop="quality">
        <template slot-scope="scope">
          <div :class="stateColor(scope.row.qtResult)">
            <i :class="stateIcon(scope.row.qtResult)" />
            {{ state(scope.row.qtResult) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-tickets"
            size="mini"
            @click="handleShow(scope.$index, scope.row)"
          >查看详细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <my-pagination :total="totalCount" methods="toShowAntisepsis" :conditions="conditions" :records="['data','page','records']" />
  </div>
</template>

<script>
import api from '@/api'
import myfilters from '@/components/myfilters'
import myPagination from '@/components/MyPagination'
export default {
  components: {
    myfilters, myPagination
  },
  data() {
    return {
      listLoading: true,
      equipment: '',
      row: [],
      // table data
      tableData: [],
      // 设备选择选项
      equipmentOptions: [],
      totalCount: 0,
      conditions: {
        status: 9,
        boxId: null,
        keyword: null,
        sterilizeStartTimeOneDay: null
      }
    }
  },
  computed: {
    // table data length
    content() {
      return '共' + this.totalCount + '条数据'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取数据
    fetchData() {
      this.listLoading = true
      api.toShowAntisepsis({ status: 9 }).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.tableData = response.data.page.records
          this.ssd_sterilization_task_status = response.data.dictData.ssd_sterilization_task_status
          this.totalCount = response.data.page.totalCount
          this.listLoading = false
        }
      })
      // 获取灭菌设备
      api.toconstanttypeBatch({
        constantCodes: [
          'STERILIZE_BOX'
        ]
      }).then(response => {
        this.equipmentOptions = response.data.constantsDetail.STERILIZE_BOX
      })
    },
    // 状态标签文字
    state(state) {
      const stateMap = {
        '1': '合格',
        '2': '不合格'
      }
      return stateMap[state]
    },
    stateIcon(state) {
      const stateMap = {
        '1': 'el-icon-success',
        '2': 'el-icon-error'
      }
      return stateMap[state]
    },
    // 状态标签图标
    stateColor(state) {
      const stateMap = {
        '1': 'success-color',
        '2': 'warning-color'
      }
      return stateMap[state]
    },
    // 查看详细按钮点击
    handleShow(index, row) {
      this.$router.push(
        {
          name: 'historyDetail',
          query: { id: row.id }
        }
      )
    },
    // 设备选择改变
    equipmentChange(equipment) {
      this.$set(this.conditions, 'boxId', equipment)
      this.selectChange()
    },
    // 输入框输入改变
    contentChange(content) {
      this.$set(this.conditions, 'keyword', content)
      this.selectChange()
    },
    // 日期选择改变
    dateChange(date) {
      this.$set(this.conditions, 'sterilizeStartTimeOneDay', date)
      this.selectChange()
    },
    selectChange() {
      this.$set(this.conditions, 'pageNo', 1)
      this.listLoading = true
      api.toShowAntisepsis(this.conditions).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          this.tableData = response.data.page.records
          this.totalCount = response.data.page.totalCount
          this.listLoading = false
        }
      })
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
