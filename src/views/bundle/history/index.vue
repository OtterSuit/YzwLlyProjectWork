<template>
  <div style="padding:30px">
    <!-- 头部 -->
    <myfilters
      title="历史记录"
      :content="content"
      placeholder="包名称/包编号/审核人/封包人"
      :choose-date="true"
      format="yyyy.MM.dd"
      :search-content="true"
      @contentChange="contentChange"
      @dateChange="dateChange"
    />
    <!-- 头部 end -->
    <!-- table -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column prop="packageNum" label="包编号" />
      <el-table-column prop="packageName" label="包名称" />
      <el-table-column prop="number" label="数量" />
      <el-table-column label="审核人/时间">
        <template slot-scope="scope">
          {{ scope.row.auditPerson }}
          <br>
          <span class="second-row">{{ scope.row.auditTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="封包人/时间">
        <template slot-scope="scope">
          {{ scope.row.packagePerson }}
          <br>
          <span class="second-row">{{ scope.row.packageTime }}</span>
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
      tableData: [
        {
          packageNum: '1001',
          packageName: '糖足包',
          number: 12,
          auditPerson: '赵美丽',
          auditTime: '2020.08.10 09:52:38',
          packagePerson: '赵美丽',
          packageTime: '2020.08.10 09:45:32'
        },
        {
          packageNum: '10003',
          packageName: '脐穿包',
          number: 16,
          auditPerson: '赵美丽',
          auditTime: '2020.08.10 09:52:38',
          packagePerson: '赵美丽',
          packageTime: '2020.08.10 09:45:32'
        },
        {
          packageNum: '10004',
          packageName: '神一脑室引流包',
          number: 6,
          auditPerson: '赵美丽',
          auditTime: '2020.08.10 09:52:38',
          packagePerson: '赵美丽',
          packageTime: '2020.08.10 09:45:32'
        },
        {
          packageNum: '10005',
          packageName: '血透室缝合包',
          number: 10,
          auditPerson: '赵美丽',
          auditTime: '2020.08.10 09:52:38',
          packagePerson: '赵美丽',
          packageTime: '2020.08.10 09:45:32'
        },
        {
          packageNum: '20010-001',
          packageName: '外来器械包(拆1)',
          number: 1,
          auditPerson: '赵美丽',
          auditTime: '2020.08.10 09:52:38',
          packagePerson: '赵美丽',
          packageTime: '2020.08.10 09:45:32'
        },
        {
          packageNum: '20010-002',
          packageName: '外来器械包(拆2)',
          number: 1,
          auditPerson: '赵美丽',
          auditTime: '2020.08.10 09:52:38',
          packagePerson: '赵美丽',
          packageTime: '2020.08.10 09:45:32'
        }
      ]
    }
  },
  computed: {
    // 计算tableData有几条数据
    content() {
      return '共' + this.tableData.length + '条数据'
    }
  },
  methods: {
    // 输入框改变
    contentChange(content) {
      console.log(content)
    },
    dateChange(date) {
      console.log(date)
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
.second-row {
  color: #999;
}
</style>
