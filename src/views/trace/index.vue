<template>
  <div style="padding:30px">
    <!-- header -->
    <myfilters
      title="追溯管理"
      :content="content"
      :search-content="true"
      placeholder="包名称/包编号"
      @contentChange="contentChange"
    />
    <!-- header end -->
    <!-- table -->
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        label="序号"
        type="index"
        width="100"
      />
      <el-table-column label="包编码" prop="id" />
      <el-table-column label="包名称" prop="name" />
      <el-table-column label="总数量" prop="totalCount" />
      <el-table-column width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">查看详细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
    <my-pagination :total="totalCount" methods="topacketDefine" :conditions="conditions" />
  </div>
</template>

<script>
import myfilters from '@/components/myfilters'
import myPagination from '@/components/MyPagination'
import api from '@/api'
export default {
  components: {
    myfilters, myPagination
  },
  data() {
    return {
      // table data
      tableData: [],
      conditions: {
        keyword: null
      },
      totalCount: 0
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
    fetchData() {
      api.toGetTraceList(this.conditions).then(response => {
        // console.log(response)
        if (response.code === '200' && response.data.busiCode === '1') {
          this.tableData = response.data.records
          this.totalCount = response.data.totalCount
        }
      })
    },
    // 查看详细
    handleDetail(index, row) {
      this.$router.push(
        {
          name: 'TraceDetails',
          query: {
            id: row.id
          }
        })
    },
    // 输入框输入改变
    contentChange(content) {
      this.$set(this.conditions, 'keyword', content)
      this.$set(this.conditions, 'pageNo', 1)
      this.fetchData()
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
::v-deep .el-table--enable-row-transition .el-table__body td{
    padding:20px 0
}
</style>
