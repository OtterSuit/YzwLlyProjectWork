<template>
  <div style="padding:30px">
    <myfilters
      title="出/入库管理"
      :content="content"
      :choose-status="true"
      :status-options="statusOptions"
      :search-content="true"
      placeholder="器械编号/名称"
    />
    <el-table ref="table" :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column label="编号" prop="code" />
      <el-table-column label="类别" prop="type" />
      <el-table-column label="名称" prop="name" />
      <el-table-column label="出/入库" prop="inAndOut" />
      <el-table-column label="数量" prop="number" />
      <el-table-column label="操作人" prop="operator" />
      <el-table-column label="操作时间" prop="saveDate" width="180" />
      <el-table-column label="操作标识" prop="identification" />
    </el-table>
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
          code: '10001',
          type: '常规器械',
          name: '有齿镊',
          inAndOut: '入库',
          number: '1000',
          operator: '张美美',
          saveDate: '2020.08.10 09:32:41',
          identification: '申购入库'
        },
        {
          code: '10001',
          type: '常规器械',
          name: '有齿镊',
          inAndOut: '出库',
          number: '500',
          operator: '张美美',
          saveDate: '2020.08.10 09:32:41',
          identification: '配包'
        },
        {
          code: '10001',
          type: '专科器械',
          name: '五官小直剪',
          inAndOut: '出库',
          number: '500',
          operator: '张美美',
          saveDate: '2020.08.10 09:32:41',
          identification: '配包'
        },
        {
          code: '10001',
          type: '一次性物资',
          name: '纱球',
          inAndOut: '入库',
          number: '1000',
          operator: '张美美',
          saveDate: '2020.08.10 09:32:41',
          identification: '申购入库'
        }
      ],
      statusOptions: [
        {
          value: '全部类别',
          label: '全部类别'
        },
        {
          value: '常规器械',
          label: '常规器械'
        },
        {
          value: '专科器械',
          label: '专科器械'
        },
        {
          value: '一次性物资',
          label: '一次性物资'
        }
      ]
    }
  },
  computed: {
    content() {
      return '共' + this.tableData.length + '条数据'
    }
  },
  methods: {
  }
}
</script>

