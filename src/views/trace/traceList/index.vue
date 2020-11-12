<template>
  <div style="padding:30px">
    <!-- header -->
    <myfilters
      title="包管理"
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
      <el-table-column label="包编码" prop="packageCoding" />
      <el-table-column label="包名称" prop="packageName" />
      <el-table-column label="总数量" prop="totalCount" />
      <el-table-column width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">查看详细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
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
      // table data
      tableData: [
        {
          packageCoding: 10001,
          packageName: '糖足包',
          totalCount: 50
        },
        {
          packageCoding: 10002,
          packageName: '糖足剪',
          totalCount: 50
        },
        {
          packageCoding: 10003,
          packageName: '脐穿包',
          totalCount: 50
        },
        {
          packageCoding: 10004,
          packageName: '神一脑室引流包',
          totalCount: 50
        },
        {
          packageCoding: 10005,
          packageName: '血透室缝合包',
          totalCount: 50
        }
      ]
    }
  },
  computed: {
    // table data length
    content() {
      return '共' + this.tableData.length + '条数据'
    }
  },
  methods: {
    // 查看详细
    handleDetail(index, row) {
      this.$router.push(
        {
          name: 'TraceDetails'
        })
    },
    // 输入框输入改变
    contentChange(content) {
      console.log(content)
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
::v-deep .el-table--enable-row-transition .el-table__body td{
    padding:20px 0
}
</style>
