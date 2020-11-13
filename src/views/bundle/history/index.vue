<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      title="历史记录"
      :content="content"
      placeholder="包名称/包编号"
      :choose-date="true"
      :search-content="true"
      @contentChange="contentChange"
      @dateChange="dateChange"
    />
    <!-- 头部 end -->
    <!-- table -->
    <el-table v-loading="listLoading" :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column prop="serialNumber" label="包编号" />
      <el-table-column prop="packetName" label="包名称" />
      <el-table-column prop="packetdCount" label="数量" />
      <el-table-column label="审核人/时间">
        <template slot-scope="scope">
          {{ scope.row.auditUser }}
          <br>
          <span class="second-row">{{ scope.row.auditTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="封包人/时间">
        <template slot-scope="scope">
          {{ scope.row.lastUser }}
          <br>
          <span class="second-row">{{ scope.row.lastTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <my-pagination :total="totalCount" methods="getSubPacketPage" :conditions="conditions" />
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import myPagination from '@/components/MyPagination'
import api from '@/api'

export default {
  components: {
    myfilters,
    myPagination
  },
  data() {
    return {
      tableData: [],
      ssd_packet_task_status: null,
      listLoading: false,
      conditions: {
        status: '4',
        keyword: null,
        startPacketTimeOneDay: null
      },
      totalCount: 0
    }
  },
  computed: {
    // 计算tableData有几条数据
    content() {
      return '共' + this.totalCount + '条数据'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      // 4: "封包完成"
      api.getSubPacketPage({ status: '4' }).then(response => {
        if (response.code === '200' && response.data.busiCode === '1') {
          console.log(response)
          this.tableData = response.data.records
          this.totalCount = response.data.totalCount
          this.ssd_packet_task_status = response.data.dictData.ssd_packet_task_status
          this.listLoading = false
        }
      })
    },
    // 输入框改变
    contentChange(content) {
      this.$set(this.conditions, 'keyword', content)
      this.selectChange()
    },
    // 时间改变
    dateChange(date) {
      this.$set(this.conditions, 'startPacketTimeOneDay', date)
      this.selectChange()
    },
    selectChange() {
      this.$set(this.conditions, 'pageNo', 1)
      this.listLoading = true
      api.getSubPacketPage(this.conditions).then(response => {
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
.second-row {
  color: #999;
}
</style>
