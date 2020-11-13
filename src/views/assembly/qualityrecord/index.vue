<template>
  <div class="record-contaniner">
    <!-- header -->
    <myfilters
      title="清洗资料记录表"
      :content="content"
      :choose-cleaning-box="true"
      :search-content="true"
      placeholder="单号/检查者"
      :choose-date="true"
      @cleaningBoxChange="cleaningBoxChange"
      @contentChange="contentChange"
      @dateChange="dateChange"
    >
      <template slot="extent">
        <el-button
          type="grey"
          style="margin-left:5px"
          icon="el-icon-download"
          :loading="buttonLoading"
          @click="exportClick"
        >月度汇总表</el-button>
      </template>
    </myfilters>
    <!-- header end -->
    <!-- table -->
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column label="单号" prop="id" />
      <el-table-column label="检查者/时间">
        <template slot-scope="scope">
          <div>
            {{ scope.row.assembleUser }}
            <br>
            <span class="second-row">{{ scope.row.assembleTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="清洗框/架">
        <template slot-scope="scope">
          <div>
            {{ scope.row.cleanboxName }}
            <br>
            <span class="second-row">{{ scope.row.cleaningBox }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="清洗人/时间">
        <template slot-scope="scope">
          <div>
            {{ scope.row.cleanUser }}
            <br>
            <span class="second-row">{{ scope.row.cleanTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="不合格数量" prop="unqualifiedCount" align="center" />
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleDetails(scope.row.id, scope.row)"
          >
            <i class="el-icon-tickets" /> 查看详细
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <my-pagination :total="totalCount" methods="getAssembleQtInfosPage" :conditions="conditions" />
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import myPagination from '@/components/MyPagination'
import api from '@/api'
import { format } from '@/utils'
export default {
  components: {
    myfilters, myPagination
  },
  data() {
    return {
      row: [],
      title: '',
      // table data
      tableData: [],
      listLoading: true,
      buttonLoading: false,
      totalCount: 0,
      conditions: {
        cleanboxId: null,
        assembleTimeOneDay: null,
        keyword: null
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
      // 获取清洗质量表数据
      api.getAssembleQtInfosPage().then(response => {
        console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.totalCount = response.data.totalCount
          this.tableData = response.data.records
          this.listLoading = false
        }
      })
    },
    // 输出记录表点击
    exportClick() {
      let exportData = []
      this.buttonLoading = true
      api.getAssembleQtInfosPage({ assembleTimeOneMonth: format('yyyy-MM'), pageSize: 5000, assembleTime: 'ASC' }).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          exportData = response.data.records
          console.log(exportData)
          import('@/vendor/Export2Excel').then(excel => {
            const multiHeader = [
              ['器械清洗质量记录表', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
              ['日期', '管腔类', '', '', '', '', '', '', '窥类', '', '', '', '', '', '', '刮匙', '', '', '', '', '剪刀', '', '', '', '', '钳类', '', '', '', '', '镊子', '', '', '', '', '', '', '检查者签名'],
              ['', '盲端开口', '', '', '管腔内', '', '', '合计', '螺钉', '', '嘴部', '', '凹位', '', '合计', '匙圈', '', '表面', '', '合计', '轴节', '', '刃面', '', '合计', '轴节', '', '齿槽', '', '合计', '齿槽', '', '缝隙', '', '表面', '', '合计', '']
            ]
            const header = ['', '污渍', '锈渍', '附着物', '污渍', '锈渍', '附着物', '', '污渍', '锈渍', '污渍', '锈渍', '污渍', '锈渍', '', '污渍', '锈渍', '污渍', '锈渍', '', '污渍', '锈渍', '污渍', '锈渍', '', '污渍', '锈渍', '污渍', '锈渍', '', '污渍', '锈渍', '污渍', '锈渍', '污渍', '锈渍', '', '']
            const filterVal = [
              'index',
              'number',
              'checker',
              'checkTime',
              'cleaningBox',
              'cleaningFrame',
              'cleaner',
              'cleaningTime',
              'unqualifiedQuantity'
            ]
            const merges = ['A1:AL1', 'A2:A4', 'B2:H2', 'I2:O2', 'P2:T2', 'U2:Y2', 'Z2:AD2', 'AE2:AK2', 'AL2:AL4', 'B3:D3', 'E3:G3', 'I3:J3', 'K3:L3', 'M3:N3', 'P3:Q3', 'R3:S3', 'U3:V3', 'W3:X3', 'Z3:AA3', 'AB3:AC3', 'AE3:AF3', 'AG3:AH3', 'AI3:AJ3']
            const data = this.formatJson(filterVal, exportData)
            console.log(data)
            excel.export_json_to_excel({
              multiHeader,
              header,
              merges,
              data,
              filename: format('yyyy-MM') + '器械清洗质量记录表'
            })
            this.buttonLoading = false
          })
        }
      })
    },
    // 格式化数据
    formatJson(filterVal, exportData) {
      const arr = []
      exportData.forEach(v => {
        const row = []
        row.push(v.assembleTime)
        const recordData = JSON.parse(v.recordJson)
        recordData.forEach(i => {
          let total = 0
          i.items.forEach(j => {
            row.push(j.stainCount)
            row.push(j.rustCount)
            j.isShowAttach === 1 ? row.push(j.attachCount) : ''
            total += (j.stainCount + j.rustCount + j.attachCount)
          })
          row.push(total)
        })
        row.push(v.assembleUser)
        arr.push(row)
      })
      return arr
    },
    // 查看详细
    handleDetails(index, row) {
      this.$router.push({
        path: '/assembly/qualityrecord/record',
        query: {
          id: row.id
        }
      })
    },
    // 输入框改变
    contentChange(content) {
      this.$set(this.conditions, 'keyword', content)
      this.selectChange()
    },
    // 日期选择改变
    dateChange(date) {
      this.$set(this.conditions, 'assembleTimeOneDay', date)
      this.selectChange()
    },
    // 清洗框/架选择改变
    cleaningBoxChange(box) {
      this.$set(this.conditions, 'cleanboxId', box)
      this.selectChange()
    },
    selectChange() {
      this.$set(this.conditions, 'pageNo', 1)
      this.listLoading = true
      api.getAssembleQtInfosPage(this.conditions).then(response => {
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
.record-contaniner {
  padding: 30px;
  min-height: calc(100vh - 50px);
}
.second-row {
  color: #999;
}
</style>
